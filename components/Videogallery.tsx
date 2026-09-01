"use client";

import { useEffect, useRef, useState } from "react";

declare global {
    interface Window {
        YT: any;
        onYouTubeIframeAPIReady: () => void;
    }
}

const couples = [
    {
        slug: "parag-gauri",
        // name: "PARAG&GUARI",
        location: null,
        youtubeId: "BVXcW5_H6lI",
        // brand: "Eleven11 Films",
        brandColor: "text-white/70",
    },
    {
        slug: "alisha-rahul",
        // name: "ALISHA&RAHUL",
        location: null,
        youtubeId: "Vg6AP_Mh_Ko",
        // brand: "Eleven11 Films",
        brandColor: "text-white/70",
    },
    {
        slug: "saloni-sid",
        // name: "SALONI&SID",
        location: null,
        youtubeId: "Vq_MrDivJtE",
        // brand: "Eleven11 Films",
        brandColor: "text-white/70",
    },
    {
        slug: "zina-zain",
        // name: "ZINA&ZAIN",
        location: null,
        youtubeId: "YeUOlpvgZ8w",
        // brand: "Eleven11 Films",
        brandColor: "text-white/70",
    },
];

/**
 * Loads the YouTube IFrame API script exactly once, no matter how many
 * CoupleCard instances ask for it. Safe to call repeatedly.
 */
let youtubeApiPromise: Promise<void> | null = null;
function loadYouTubeApi(): Promise<void> {
    if (youtubeApiPromise) return youtubeApiPromise;

    youtubeApiPromise = new Promise((resolve) => {
        if (window.YT && window.YT.Player) {
            resolve();
            return;
        }

        const existingCallback = window.onYouTubeIframeAPIReady;
        window.onYouTubeIframeAPIReady = () => {
            if (typeof existingCallback === "function") existingCallback();
            resolve();
        };

        // Only inject the script tag once, even if this function is
        // somehow entered again before the promise settles.
        if (!document.getElementById("youtube-iframe-api")) {
            const tag = document.createElement("script");
            tag.id = "youtube-iframe-api";
            tag.src = "https://www.youtube.com/iframe_api";
            document.head.appendChild(tag);
        }
    });

    return youtubeApiPromise;
}

const CoupleCard = ({
    couple,
    isPlaying,
    onPlay,
    onStop,
}: {
    couple: typeof couples[0];
    isPlaying: boolean;
    onPlay: (slug: string) => void;
    onStop: () => void;
}) => {
    const playerRef = useRef<any>(null);
    const playerReadyRef = useRef(false);
    const containerId = `yt-player-${couple.slug}`;

    // The ONLY place responsible for stopping/destroying the player.
    // Safe to call any number of times, from any lifecycle path.
    const cleanupPlayer = () => {
        const player = playerRef.current;

        if (!player) return;

        console.log("Cleaning up YouTube player:", couple.youtubeId);

        try {
            if (playerReadyRef.current && typeof player.stopVideo === "function") {
                player.stopVideo();
            }

            if (typeof player.destroy === "function") {
                player.destroy();
            }
        } catch (error) {
            console.error("Error cleaning up YouTube player:", error);
        }

        playerRef.current = null;
        playerReadyRef.current = false;
    };

    useEffect(() => {
        if (!isPlaying) return;

        // Guard against double-invocation in React Strict Mode / re-renders:
        // never create a second player while one already exists for this card.
        if (playerRef.current) return;

        let cancelled = false;

        loadYouTubeApi().then(() => {
            // If the effect was cleaned up (card no longer playing, close
            // clicked before the API finished loading, or component
            // unmounted) before this resolved, don't create a player.
            if (cancelled || playerRef.current) return;

            console.log("Creating YouTube player:", couple.youtubeId);

            playerRef.current = new window.YT.Player(containerId, {
                videoId: couple.youtubeId,
                width: "100%",
                height: "100%",
                playerVars: {
                    autoplay: 1,
                    playsinline: 1,
                    rel: 0,
                },
                events: {
                    onReady: () => {
                        console.log("YouTube player ready:", couple.youtubeId);
                        playerReadyRef.current = true;
                    },
                },
            });
        });

        return () => {
            cancelled = true;
            cleanupPlayer();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isPlaying]);

    const handleStop = () => {
        cleanupPlayer();
        onStop();
    };

    return (
        <div className="block group relative w-full overflow-hidden aspect-video" >

            {isPlaying ? (
                <>
                    <div className="absolute inset-0 w-full h-full [&>iframe]:absolute [&>iframe]:inset-0 [&>iframe]:!w-full [&>iframe]:!h-full">
                        <div id={containerId} className="w-full h-full" />
                    </div>

                    <button
                        type="button"
                        onClick={handleStop}
                        className="absolute top-4 right-4 z-10 bg-black/60 hover:bg-black/80 text-white px-3 py-2 text-xs uppercase tracking-widest transition-colors"
                    >
                        Close
                    </button>
                </>
            ) : (
                <button
                    type="button"
                    onClick={() => onPlay(couple.slug)}
                    className="absolute inset-0 w-full h-full text-left cursor-pointer"
                >
                    {/* YouTube thumbnail */}
                    <img
                        src={`https://img.youtube.com/vi/${couple.youtubeId}/maxresdefault.jpg`}
                        // alt={couple.name}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />

                    {/* Dark gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/60" />

                    {/* Brand name - top center */}
                    <div className="absolute top-5 left-0 right-0 flex justify-center">
                        <span
                            className={`${couple.brandColor} text-[10px] tracking-[0.35em] uppercase font-light`}
                            style={{ fontFamily: "'Cormorant Garamond', serif" }}
                        >
                            {/* {couple.brand} */}
                        </span>
                    </div>

                    {/* Play button - center (hover) */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-15 h-15 flex items-center justify-center">
                            <svg className="w-15 h-15 text-white fill-white ml-1" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        </div>
                    </div>

                    {/* Always-visible play icon (subtle) */}
                    <div className="absolute inset-0 flex items-center justify-center group-hover:opacity-0 transition-opacity duration-300">
                        <div className="w-15 h-15 flex items-center justify-center">
                            <svg className="w-15 h-15 text-white fill-white ml-0.5" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        </div>
                    </div>

                    {/* Couple name + location - bottom left */}
                    {/* <div className="absolute bottom-6 left-6 right-6">
                        {couple.location && (
                            <p
                                className="text-rose-400 text-[10px] tracking-[0.3em] uppercase mb-1"
                                style={{ fontFamily: "'Cormorant Garamond', serif" }}
                            >
                                {couple.brand}
                            </p>
                        )}
                        <h2
                            className="text-white leading-none"
                            style={{
                                fontFamily: "'Cormorant Garamond', serif",
                                fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                                fontWeight: 300,
                                letterSpacing: "0.02em",
                            }}
                        >
                            {couple.name}
                        </h2>
                        {couple.location && (
                            <p
                                className="text-white/80 text-sm mt-1 italic"
                                style={{ fontFamily: "'Cormorant Garamond', serif" }}
                            >
                                {couple.location}
                            </p>
                        )}
                    </div> */}
                </button>
            )}
        </div>
    );
};

export default function Videogallery() {
    const [playingSlug, setPlayingSlug] = useState<string | null>(null);

    return (
        <section className="min-h-screen bg-[#f0ebe3] pt-10 pb-16 px-4">

            {/* Intro Text */}
            <div className="max-w-3xl mx-auto text-center mb-14 px-4">
                <p className="text-gray-800  font-manrope text-[14px] leading-relaxed ">
                    We’re drawn to couples who bring a little bit of themselves into everything they do. The way they celebrate, the people they surround themselves with, the traditions they keep, and the ones they choose to make their own.
                    Because a wedding shouldn’t feel like a version of someone else’s. It should feel like the two of you, surrounded by the people who matter most.
                    Here are a few of the celebrations we’ve had the privilege of being a part of.
                </p>
                <p className="text-gray-800  font-manrope text-[14px] leading-relaxed ">

                    Here are a few of the celebrations we’ve had the privilege of being a part of.
                </p>

            </div>

            {/* ── Responsive grid: 1 column on mobile, 2 on desktop ── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-3 gap-y-3 md:gap-y-3 max-w-[1390px] mx-auto">
                {couples.map((couple) => (
                    <CoupleCard
                        key={couple.slug}
                        couple={couple}
                        isPlaying={playingSlug === couple.slug}
                        onPlay={setPlayingSlug}
                        onStop={() => setPlayingSlug(null)}
                    />
                ))}
            </div>

        </section>
    );
}