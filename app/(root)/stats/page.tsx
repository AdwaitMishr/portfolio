"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Code2, GitBranch, Loader2 } from "lucide-react";
import { RatingChart, ProblemStats } from "@/components/rating-chart";
import { ContributionDay, UserProfile, SubmissionStats } from "@/types";
import { SiLeetcode, SiCodeforces } from "react-icons/si";

type HeatmapType = "cp" | "dev";

function Heatmap({ data, color }: { data: ContributionDay[]; color: "green" | "blue" }) {
 
    const weeks: ContributionDay[][] = [];
    let currentWeek: ContributionDay[] = [];
    data.forEach((day, index) => {
        currentWeek.push(day);
        if (currentWeek.length === 7 || index === data.length - 1) {
            weeks.push(currentWeek);
            currentWeek = [];
        }
    });

    const getLevelColor = (level: number) => {
        if (color === "green") {
            switch (level) {
                case 0: return "bg-secondary";
                case 1: return "bg-emerald-900/50";
                case 2: return "bg-emerald-700/60";
                case 3: return "bg-emerald-500/70";
                case 4: return "bg-emerald-400";
                default: return "bg-secondary";
            }
        } else {
            switch (level) {
                case 0: return "bg-secondary";
                case 1: return "bg-blue-900/50";
                case 2: return "bg-blue-700/60";
                case 3: return "bg-blue-500/70";
                case 4: return "bg-blue-400";
                default: return "bg-secondary";
            }
        }
    };

    return (
        <div className="overflow-x-auto pb-2">
            <div className="flex gap-0.5 min-w-max">
                <div className="flex flex-col gap-0.5 text-xs text-muted-foreground mr-2 justify-around">
                    <span>Mon</span>
                    <span>Wed</span>
                    <span>Fri</span>
                </div>
                <div className="flex gap-0.5">
                    {weeks.map((week, weekIndex) => (
                        <div key={weekIndex} className="flex flex-col gap-0.5">
                            {week.map((day) => (
                                <div
                                    key={day.date}
                                    className={`w-2.5 h-2.5 rounded-sm ${getLevelColor(day.level)}`}
                                    title={`${day.date}: ${day.count} contributions`}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default function CodingPage() {
    const [activeHeatmap, setActiveHeatmap] = useState<HeatmapType>("cp");
    const [loading, setLoading] = useState(true);
    
    const [data, setData] = useState<{
        leetcodeProfile: UserProfile | null,
        codeforcesProfile: UserProfile | null,
        leetcodeStats: SubmissionStats | null,
        codeforcesStats: SubmissionStats | null,
        cpHeatmap: ContributionDay[],
        devHeatmap: ContributionDay[]
    }>({
        leetcodeProfile: null,
        codeforcesProfile: null,
        leetcodeStats: null,
        codeforcesStats: null,
        cpHeatmap: [],
        devHeatmap: []
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/coding-stats');
                const json = await res.json();
                
                if (json.leetcode && json.codeforces) {
                    setData({
                        leetcodeProfile: json.leetcode.profile,
                        leetcodeStats: json.leetcode.stats,
                        codeforcesProfile: json.codeforces.profile,
                        codeforcesStats: json.codeforces.stats,
                        cpHeatmap: json.heatmaps.cp,
                        devHeatmap: json.heatmaps.dev
                    });
                }
            } catch (error) {
                console.error("Failed to fetch coding stats", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <main className="min-h-screen bg-background flex items-center justify-center">
                <Loader2 className="animate-spin text-primary" size={32} />
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-background text-foreground">
            <div className="max-w-3xl mx-auto px-4 py-12">
                {/* Heatmap Toggle */}
                <div className="p-6 rounded-xl bg-card border border-border mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-medium text-primary flex items-center gap-2">
                            {activeHeatmap === "cp" ? (
                                <><Code2 size={18} /> CP Submissions</>
                            ) : (
                                <><GitBranch size={18} /> GitHub Contributions</>
                            )}
                        </h3>
                        <div className="flex gap-1 p-1 rounded-lg bg-secondary">
                            <button
                                onMouseEnter={() => setActiveHeatmap("cp")}
                                onClick={() => setActiveHeatmap("cp")}
                                className={`px-3 py-1 rounded text-sm transition-all ${activeHeatmap === "cp"
                                        ? "bg-emerald-600 text-white"
                                        : "text-muted-foreground"
                                    }`}
                            >
                                CP
                            </button>
                            <button
                                onMouseEnter={() => setActiveHeatmap("dev")}
                                onClick={() => setActiveHeatmap("dev")}
                                className={`px-3 py-1 rounded text-sm transition-all ${activeHeatmap === "dev"
                                        ? "bg-blue-600 text-white"
                                        : "text-muted-foreground"
                                    }`}
                            >
                                Dev
                            </button>
                        </div>
                    </div>
                    <motion.div
                        key={activeHeatmap}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Heatmap
                            data={activeHeatmap === "cp" ? data.cpHeatmap : data.devHeatmap}
                            color={activeHeatmap === "cp" ? "green" : "blue"}
                        />
                    </motion.div>
                </div>

                {/* Platform Stats */}
                <div className="grid gap-6 md:grid-cols-2">
                    {/* LeetCode */}
                    {data.leetcodeProfile && data.leetcodeStats && (
                        <div className="p-6 rounded-xl bg-card border border-border">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-8 h-8 rounded  flex items-center justify-center">
                                    <SiLeetcode size={50}/>
                                </div>
                                <div>
                                    <h3 className="font-medium text-primary">LeetCode</h3>
                                    <p className="text-xs text-muted-foreground">@{data.leetcodeProfile.username}</p>
                                </div>
                            </div>
                            <RatingChart profile={data.leetcodeProfile} />
                            <div className="mt-4">
                                <ProblemStats stats={data.leetcodeStats} />
                            </div>
                        </div>
                    )}

                    {/* Codeforces */}
                    {data.codeforcesProfile && data.codeforcesStats && (
                        <div className="p-6 rounded-xl bg-card border border-border">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-8 h-8 rounded  flex items-center justify-center">
                                    <SiCodeforces size={50} />
                                </div>
                                <div>
                                    <h3 className="font-medium text-primary">Codeforces</h3>
                                    <p className="text-xs text-muted-foreground">@{data.codeforcesProfile.username}</p>
                                </div>
                            </div>
                            <RatingChart profile={data.codeforcesProfile} />
                            <div className="mt-4">
                                <ProblemStats stats={data.codeforcesStats} />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}