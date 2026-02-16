"use client";

import { useEffect, useState } from "react";

interface SpotifyData {
    isPlaying: boolean;
    title?: string;
    artist?: string;
    albumImageUrl?: string;
    songUrl?: string;
}

export function SpotifyVinyl() {
    const [data, setData] = useState<SpotifyData>({ isPlaying: false });

    useEffect(() => {
        const fetchNowPlaying = async () => {
            try {
                const res = await fetch("/api/spotify");
                const json = await res.json();
                setData(json);
            } catch {
                setData({ isPlaying: false });
            }
        };

        fetchNowPlaying();
        const interval = setInterval(fetchNowPlaying, 30000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex items-center gap-4">
            {/* Vinyl record */}
            <a
                href={data.songUrl ?? "https://open.spotify.com"}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative shrink-0"
                aria-label={data.isPlaying ? `Playing: ${data.title}` : "Spotify"}
            >
                <div
                    className={`
            relative w-[72px] h-[72px] rounded-full
            bg-gradient-to-br from-zinc-900 to-zinc-800
            dark:from-zinc-800 dark:to-zinc-700
            shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]
            ${data.isPlaying ? "animate-[spin_3s_linear_infinite]" : ""}
            group-hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12)]
            transition-shadow
          `}
                >
                    {/* Grooves — concentric rings */}
                    <div className="absolute inset-[6px] rounded-full border border-white/[0.04]" />
                    <div className="absolute inset-[10px] rounded-full border border-white/[0.03]" />
                    <div className="absolute inset-[14px] rounded-full border border-white/[0.04]" />
                    <div className="absolute inset-[18px] rounded-full border border-white/[0.03]" />

                    {/* Album art center / label */}
                    <div className="absolute inset-[20px] rounded-full overflow-hidden border border-white/[0.08]">
                        {data.albumImageUrl ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                                src={data.albumImageUrl}
                                alt=""
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full bg-zinc-700 flex items-center justify-center">
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    className="w-4 h-4 text-zinc-500"
                                >
                                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
                                </svg>
                            </div>
                        )}
                    </div>

                    {/* Spindle hole */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-[6px] h-[6px] rounded-full bg-zinc-900 dark:bg-zinc-600 border border-white/[0.1]" />
                    </div>
                </div>

                {/* Tonearm — only visible when playing */}
                {data.isPlaying && (
                    <div
                        className="absolute -top-1 -right-1 w-[2px] h-[22px] bg-zinc-400 dark:bg-zinc-500 rounded-full origin-top rotate-[25deg] opacity-60"
                    />
                )}
            </a>

            {/* Track info */}
            <div className="min-w-0">
                <p className="text-[11px] uppercase tracking-widest text-muted-foreground/60 mb-1">
                    {data.isPlaying ? "Now playing" : data.title ? "Last played" : "Spotify"}
                </p>
                {data.title ? (
                    <>
                        <p className="text-sm font-medium text-primary truncate max-w-[180px]">
                            {data.title}
                        </p>
                        <p className="text-xs text-muted-foreground truncate max-w-[180px]">
                            {data.artist}
                        </p>
                    </>
                ) : (
                    <p className="text-xs text-muted-foreground">Not playing</p>
                )}
            </div>
        </div>
    );
}
