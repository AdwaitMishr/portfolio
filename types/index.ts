// Project types
export interface Project {
    id: string;
    title: string;
    description: string;
    longDescription: string;
    image: string;
    tags: string[];
    githubUrl: string;
    liveUrl: string;
}

// Coding profile types
export interface UserProfile {
    platform: "leetcode" | "codeforces";
    username: string;
    rating: number;
    maxRating: number;
    rank: string;
    avatar?: string;
}

export interface SubmissionStats {
    platform: "leetcode" | "codeforces";
    easy: number;
    medium: number;
    hard: number;
    total: number;
}

export interface ContributionDay {
    date: string;
    count: number;
    level: 0 | 1 | 2 | 3 | 4;
}

// Spotify types
export interface SpotifyTrack {
    title: string;
    artist: string;
    albumArt: string;
    isPlaying: boolean;
    progress?: number;
    duration?: number;
}

// Skills types
export interface Skill {
    name: string;
    icon: string;
    category: "frontend" | "backend" | "tools" | "languages";
    proficiency: number; // 0-100
}
