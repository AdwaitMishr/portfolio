import { UserProfile, SubmissionStats, ContributionDay } from "@/types";

export const leetcodeProfile: UserProfile = {
    platform: "leetcode",
    username: "monke_dev",
    rating: 1847,
    maxRating: 1923,
    rank: "Knight",
};

export const codeforcesProfile: UserProfile = {
    platform: "codeforces",
    username: "monke_dev",
    rating: 1456,
    maxRating: 1532,
    rank: "Specialist",
};

export const leetcodeStats: SubmissionStats = {
    platform: "leetcode",
    easy: 156,
    medium: 234,
    hard: 67,
    total: 457,
};

export const codeforcesStats: SubmissionStats = {
    platform: "codeforces",
    easy: 89,
    medium: 145,
    hard: 34,
    total: 268,
};

// Generate mock contribution data for last 365 days
export function generateContributionData(): ContributionDay[] {
    const data: ContributionDay[] = [];
    const today = new Date();

    for (let i = 364; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);

        // Random contribution count with some patterns
        const dayOfWeek = date.getDay();
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
        const baseChance = isWeekend ? 0.3 : 0.7;

        let count = 0;
        if (Math.random() < baseChance) {
            count = Math.floor(Math.random() * 12) + 1;
        }

        let level: 0 | 1 | 2 | 3 | 4 = 0;
        if (count > 0) level = 1;
        if (count > 3) level = 2;
        if (count > 6) level = 3;
        if (count > 9) level = 4;

        data.push({
            date: date.toISOString().split("T")[0],
            count,
            level,
        });
    }

    return data;
}

export const contributionData = generateContributionData();
