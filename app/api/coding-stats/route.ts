import { NextResponse } from "next/server";

const LEETCODE_USERNAME = "eclipse-monke";
const CF_USERNAME = "monke7";

// 1. Helper to fetch LeetCode Data (Combined Query)
async function fetchLeetCode() {
  const query = `
    query getUserData($username: String!) {
      # 1. Solved Stats & Heatmap
      matchedUser(username: $username) {
        submitStats: submitStatsGlobal {
          acSubmissionNum {
            difficulty
            count
          }
        }
        submissionCalendar
      }
      # 2. Contest Rating & Global Rank
      userContestRanking(username: $username) {
        rating
        globalRanking
        topPercentage
        totalParticipants
        attendedContestsCount
      }
    }
  `;

  try {
    const res = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Referer": "https://leetcode.com" 
      },
      body: JSON.stringify({
        query,
        variables: { username: LEETCODE_USERNAME },
      }),
      next: { revalidate: 3600 }, // Cache on server for 1 hour
    });
    
    const json = await res.json();
    
    if (json.errors) {
      console.error("LeetCode GraphQL Errors:", json.errors);
      return null;
    }

    const data = json.data;
    const userStats = data.matchedUser;
    const contestStats = data.userContestRanking;

    const stats = {
      easy: userStats.submitStats.acSubmissionNum.find((s: any) => s.difficulty === "Easy")?.count || 0,
      medium: userStats.submitStats.acSubmissionNum.find((s: any) => s.difficulty === "Medium")?.count || 0,
      hard: userStats.submitStats.acSubmissionNum.find((s: any) => s.difficulty === "Hard")?.count || 0,
    };

    const calendar = JSON.parse(userStats.submissionCalendar || "{}");
    const heatmapData = Object.entries(calendar).map(([timestamp, count]: any) => {
      return {
        date: new Date(parseInt(timestamp) * 1000).toISOString().split("T")[0],
        count: count,
        level: count > 0 ? Math.min(4, Math.ceil(count / 2)) : 0,
      };
    });

    return {
      profile: {
        platform: "leetcode",
        username: LEETCODE_USERNAME,
        rating: contestStats ? Math.round(contestStats.rating) : 0, 
        maxRating: contestStats ? Math.round(contestStats.rating) : 0, 
        rank: contestStats 
          ? `Top ${contestStats.topPercentage}% (#${contestStats.globalRanking})` 
          : "Unranked",
      },
      stats: {
        platform: "leetcode",
        ...stats,
        total: stats.easy + stats.medium + stats.hard,
      },
      heatmap: heatmapData,
    };
  } catch (e) {
    console.error("LeetCode Fetch Error", e);
    return null;
  }
}

// 2. Helper to fetch Codeforces Data
async function fetchCodeforces() {
  try {
    const [infoRes, subRes] = await Promise.all([
        fetch(`https://codeforces.com/api/user.info?handles=${CF_USERNAME}`, { next: { revalidate: 3600 } }),
        fetch(`https://codeforces.com/api/user.status?handle=${CF_USERNAME}`, { next: { revalidate: 3600 } })
    ]);

    const infoData = await infoRes.json();
    const subData = await subRes.json();

    if (infoData.status !== "OK" || subData.status !== "OK") {
        console.error("Codeforces API Error");
        return null;
    }

    const user = infoData.result[0];
    
    let easy = 0, medium = 0, hard = 0;
    const solvedHashes = new Set(); 
    
    const submissionsByDate: Record<string, number> = {};

    subData.result.forEach((sub: any) => {
      if (sub.verdict === "OK") {
        const hash = sub.problem.contestId + sub.problem.index;
        if (!solvedHashes.has(hash)) {
            solvedHashes.add(hash);
            const rating = sub.problem.rating || 0;
            if (rating > 0 && rating <= 1000) easy++;
            else if (rating > 1100 && rating <= 1500) medium++;
            else if (rating > 1500) hard++;
        }

        const date = new Date(sub.creationTimeSeconds * 1000).toISOString().split("T")[0];
        submissionsByDate[date] = (submissionsByDate[date] || 0) + 1;
      }
    });

    const heatmapData = Object.entries(submissionsByDate).map(([date, count]) => ({
      date,
      count,
      level: count > 0 ? Math.min(4, Math.ceil(count / 2)) : 0,
    }));

    return {
      profile: {
        platform: "codeforces",
        username: CF_USERNAME,
        rating: user.rating || 0,
        maxRating: user.maxRating || 0,
        rank: user.rank || "Unrated",
      },
      stats: {
        platform: "codeforces",
        easy,
        medium,
        hard,
        total: easy + medium + hard,
      },
      heatmap: heatmapData,
    };
  } catch (e) {
    console.error("Codeforces Fetch Error", e);
    return null;
  }
}

// 3. Helper to fetch GitHub Data
async function fetchGitHub() {
  const query = `
    query {
      viewer {
        contributionsCollection {
          contributionCalendar {
            weeks {
              contributionDays {
                date
                contributionCount
                contributionLevel
              }
            }
          }
        }
      }
    }
  `;

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",      
      headers: {
        "Authorization": `Bearer ${process.env.GITHUB_TOKEN}`,
        "Content-Type": "application/json",
      },
      next: { revalidate: 3600 },
      body: JSON.stringify({ query }),
    });
    const data = await res.json();
    
    if (data.errors) {
        console.error("GitHub API Errors", data.errors);
        return [];
    }

    const calendar = data.data.viewer.contributionsCollection.contributionCalendar.weeks;
    const heatmapData: any[] = [];
    
    calendar.forEach((week: any) => {
      week.contributionDays.forEach((day: any) => {
        let level = 0;
        if (day.contributionCount > 0) level = 1;
        if (day.contributionCount > 3) level = 2;
        if (day.contributionCount > 6) level = 3;
        if (day.contributionCount > 9) level = 4;
        
        heatmapData.push({
          date: day.date,
          count: day.contributionCount,
          level: level,
        });
      });
    });

    return heatmapData;
  } catch (e) {
    console.error("GitHub Fetch Error", e);
    return [];
  }
}

export async function GET() {
  const [leetcode, codeforces, github] = await Promise.all([
    fetchLeetCode(),
    fetchCodeforces(),
    fetchGitHub(),
  ]);

  const combinedMap: Record<string, number> = {};
  
  // Merge LeetCode + Codeforces for CP Heatmap
  [...(leetcode?.heatmap || []), ...(codeforces?.heatmap || [])].forEach((day: any) => {
    combinedMap[day.date] = (combinedMap[day.date] || 0) + day.count;
  });

  const cpHeatmap = [];
  const today = new Date();
  for (let i = 364; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split("T")[0];
      const count = combinedMap[dateStr] || 0;
      
      let level = 0;
      if (count > 0) level = 1;
      if (count > 2) level = 2;
      if (count > 5) level = 3;
      if (count > 8) level = 4;

      cpHeatmap.push({ date: dateStr, count, level });
  }

  const ghMap: Record<string, any> = {};
  github.forEach((day: any) => ghMap[day.date] = day);
  
  const ghHeatmap = [];
  for (let i = 364; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split("T")[0];
      const dayData = ghMap[dateStr];
      ghHeatmap.push({ 
          date: dateStr, 
          count: dayData?.count || 0, 
          level: dayData?.level || 0 
      });
  }
  return NextResponse.json(
    {
      leetcode,
      codeforces,
      heatmaps: {
        cp: cpHeatmap,
        dev: ghHeatmap,
      }
    },
    {
      status: 200,
      headers: {
        // Cache in browser for 1 hour
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=59"
      }
    }
  );
}