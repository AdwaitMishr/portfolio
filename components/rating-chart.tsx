"use client";
import { color, motion } from "framer-motion"
import { UserProfile, SubmissionStats } from "@/types";

interface RatingChartProps{
    profile: UserProfile;
}

interface ProblemStats{
    stats: SubmissionStats;
}

export function  RatingChart({ profile }:RatingChartProps) {
    const progress = (profile.rating / profile.maxRating) * 100;
    return(
        <div className="flex items-center gap-4">
            <div className="relative w-24 h-24">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle 
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="8"
                    className="text-secondary"
                    />
                    <motion.circle 
                     cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="8"
                    strokeLinecap="round"
                    className="text-chart-1"
                    strokeDasharray={`${progress * 2.51} 251`}
                    initial={{ strokeDasharray: "0 251" }}
                    animate={{ strokeDasharray: `${progress * 2.51} 251` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-xl font-bold text-primary">{profile.rating}</span>
                    <span className="text-xs text-muted-foreground">Rating</span>
                </div>
            </div>
            <div className="flex-1">
                <div className="text-sm text-muted-foreground mb-1">
                    Max Rating: <span className="text-primary font-medium">{profile.maxRating}</span>
                </div>
                <div className="text-sm text-muted-foreground">
                    Rank: <span className="text-chart-1 font-medium">{profile.rank}</span>
                </div>
            </div>
        </div>
    );
}

export function ProblemStats({stats}: ProblemStats) {
    const problems =[
        {label: "Easy", count: stats.easy, color: "bg-chart-2", textColor: "text-chart-2"},
        {label: "Medium", count: stats.medium, color: "bg-chart-3", textColor: "text-chart-3"},
        {label: "Hard", count: stats.hard, color: "bg-chart-5", textColor: "text-chart-5"}
    ];

    const maxCount = Math.max(stats.easy, stats.medium, stats.hard);
    return(
        <div className="space-y-3">
            {problems.map((problem) => (
                <div key={problem.label} className="flex items-center gap-3">
                    <span className={`text-sm font-medium w-16 ${problem.textColor}`}>
                        {problem.label}
                    </span>
                    <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                        <motion.div
                            className={`h-full ${problem.color} rounded-full`}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${(problem.count / maxCount) * 100}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                        />
                    </div>
                    <span className="text-sm text-muted-foreground w-10 text-right">
                        {problem.count}
                    </span>
                </div>
            ))}
            <div className="pt-2 border-t border-border">
                <span className="text-sm text-muted-foreground">
                    Total Solved: <span className="text-primary font-medium">{stats.total}</span>
                </span>
            </div>
        </div>
    );
}