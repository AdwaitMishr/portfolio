import { UserProfile, SubmissionStats, ContributionDay } from "@/types";

// --- GitHub Fetcher ---
export async function getGitHubData(username: string) {
  const token = process.env.GITHUB_TOKEN;
  
  if (!token) {
    console.warn("GITHUB_TOKEN is missing. Returning empty data.");
    return [];
  }

  const query = `
    query($userName:String!) {
      user(login: $userName){
        contributionsCollection {
          contributionCalendar {
            weeks {
              contributionDays {
                contributionCount
                date
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
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables: { userName: username },
      }),
      next: { revalidate: 3600 },
    });

    const json = await res.json();
    const weeks = json.data?.user?.contributionsCollection?.contributionCalendar?.weeks;

    if (!weeks) return [];

    const contributions: ContributionDay[] = [];
    weeks.forEach((week: any) => {
      week.contributionDays.forEach((day: any) => {
        const count = day.contributionCount;
        // Calculate level based on count (similar to GitHub's own logic)
        let level: 0 | 1 | 2 | 3 | 4 = 0;
        if (count > 0) level = 1;
        if (count > 3) level = 2;
        if (count > 6) level = 3;
        if (count > 10) level = 4;

        contributions.push({
          date: day.date,
          count,
          level,
        });
      });
    });

    // Return only the last 365 days
    return contributions.slice(-365);
  } catch (error) {
    console.error("Error fetching GitHub data:", error);
    return [];
  }
}

// --- LeetCode Fetcher ---
export async function getLeetCodeData(username: string) {
  const query = `
    query getUserProfile($username: String!) {
      matchedUser(username: $username) {
        username
        submitStats: submitStatsGlobal {
          acSubmissionNum {
            difficulty
            count
          }
        }
        submissionCalendar
      }
      userContestRanking(username: $username) {
        rating
        globalRanking
      }
    }
  `;

  try {
    const res = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Referer": "https://leetcode.com",
      },
      body: JSON.stringify({ query, variables: { username } }),
      next: { revalidate: 3600 },
    });

    const json = await res.json();
    const user = json.data?.matchedUser;
    const ranking = json.data?.userContestRanking;

    if (!user) return null;

    const profile: UserProfile = {
      platform: "leetcode",
      username: user.username,
      rating: ranking ? Math.round(ranking.rating) : 0,
      maxRating: 0, 
      rank: ranking ? `Global #${ranking.globalRanking}` : "Unranked",
    };

    const stats: SubmissionStats = {
      platform: "leetcode",
      easy: user.submitStats.acSubmissionNum.find((s: any) => s.difficulty === "Easy")?.count || 0,
      medium: user.submitStats.acSubmissionNum.find((s: any) => s.difficulty === "Medium")?.count || 0,
      hard: user.submitStats.acSubmissionNum.find((s: any) => s.difficulty === "Hard")?.count || 0,
      total: user.submitStats.acSubmissionNum.find((s: any) => s.difficulty === "All")?.count || 0,
    };

    // Parse Calendar string "{\"123456\": 1}" -> Array
    const calendar = JSON.parse(user.submissionCalendar || "{}");
    const contributions: ContributionDay[] = Object.entries(calendar).map(([ts, count]) => {
        const c = count as number;
        return {
            date: new Date(parseInt(ts) * 1000).toISOString().split('T')[0],
            count: c,
            level: c > 5 ? 4 : c > 3 ? 3 : c > 1 ? 2 : 1,
        };
    });

    return { profile, stats, contributions };
  } catch (error) {
    console.error("Error fetching LeetCode data:", error);
    return null;
  }
}

// --- Codeforces Fetcher ---
export async function getCodeforcesData(username: string) {
  try {
    const userRes = await fetch(`https://codeforces.com/api/user.info?handles=${username}`, { next: { revalidate: 3600 } });
    const userData = await userRes.json();
    
    // Fetch Submissions for difficulty stats
    const subRes = await fetch(`https://codeforces.com/api/user.status?handle=${username}`, { next: { revalidate: 3600 } });
    const subData = await subRes.json();

    if (userData.status !== "OK" || subData.status !== "OK") return null;

    const user = userData.result[0];
    
    // Calculate difficulty stats
    let easy = 0, medium = 0, hard = 0;
    const solved = new Set<string>();
    
    subData.result.forEach((sub: any) => {
        if (sub.verdict === "OK" && !solved.has(sub.problem.name)) {
            solved.add(sub.problem.name);
            const r = sub.problem.rating || 0;
            if (r < 1200) easy++;
            else if (r < 1600) medium++;
            else hard++;
        }
    });

    return {
      profile: {
        platform: "codeforces",
        username: user.handle,
        rating: user.rating,
        maxRating: user.maxRating,
        rank: user.rank,
      } as UserProfile,
      stats: {
        platform: "codeforces",
        easy,
        medium,
        hard,
        total: solved.size,
      } as SubmissionStats
    };
  } catch (error) {
    console.error("Codeforces Error:", error);
    return null;
  }
}