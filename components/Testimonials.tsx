"use client";

import { useEffect, useRef, useState } from "react";

declare global {
    interface Window {
        YT: any;
        onYouTubeIframeAPIReady: () => void;
    }
}

const testimonials = [
    {
        youtubeId: "awn-LTZVRhs",
        quote: "The entire team was friendly, professional and made every moment feel effortless. Your preparation, punctuality and guidance made the experience truly enjoyable, and we’d genuinely recommend Eleven11Films.",
        name: "Parag & Gauri",
        role: "Couple",
    },
    {
        youtubeId: "kzErK8yogJo",
        quote: "As a former photographer, I truly appreciate how calm, patient and creative the Eleven11Films team is. Your professionalism, energy and speed made the entire experience effortless.",
        name: "Sunny & Asmita",
        role: "Couple",
    },
    {
        youtubeId: "hu5YhiBzDJA",
        quote: "From our very first shoot, we felt completely comfortable and guided like friends. The dedication and trust you showed in capturing our emotions made the entire experience unforgettable.",
        name: "Ganesh & Dimple",
        role: "Couple",
    },
];

/**
 * Loads the YouTube IFrame API script exactly once, no matter how many
 * TestimonialCard instances ask for it. Safe to call repeatedly.
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

const TestimonialCard = ({
    testimonial,
    isPlaying,
    onPlay,
    onStop,
}: {
    testimonial: typeof testimonials[0];
    isPlaying: boolean;
    onPlay: (youtubeId: string) => void;
    onStop: () => void;
}) => {
    const playerRef = useRef<any>(null);
    const playerReadyRef = useRef(false);
    const containerId = `yt-player-testimonial-${testimonial.youtubeId}`;

    // The ONLY place responsible for stopping/destroying the player.
    // Safe to call any number of times, from any lifecycle path.
    const cleanupPlayer = () => {
        const player = playerRef.current;

        if (!player) return;

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

            playerRef.current = new window.YT.Player(containerId, {
                videoId: testimonial.youtubeId,
                width: "100%",
                height: "100%",
                playerVars: {
                    autoplay: 1,
                    playsinline: 1,
                    rel: 0,
                },
                events: {
                    onReady: () => {
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
        <div className="relative w-full aspect-[4/5] overflow-hidden rounded-t-2xl">

            {isPlaying ? (
                <>
                    <div className="absolute inset-0 w-full h-full [&>iframe]:absolute [&>iframe]:inset-0 [&>iframe]:!w-full [&>iframe]:!h-full">
                        <div id={containerId} className="w-full h-full" />
                    </div>

                    <button
                        type="button"
                        onClick={handleStop}
                        aria-label="Close video"
                        className="absolute top-2.5 right-2.5 z-10 w-6 h-6 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
                    >
                        <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M6 6l12 12M18 6L6 18" />
                        </svg>
                    </button>
                </>
            ) : (
                <button
                    type="button"
                    onClick={() => onPlay(testimonial.youtubeId)}
                    aria-label={`Play ${testimonial.name} testimonial`}
                    className="group absolute inset-0 w-full h-full text-left cursor-pointer"
                >
                    {/* YouTube thumbnail */}
                    <img
                        src={`https://img.youtube.com/vi/${testimonial.youtubeId}/maxresdefault.jpg`}
                        alt={testimonial.name}
                        className="absolute inset-0 w-full h-full object-cover"
                    />

                    {/* Subtle overlay for the play button to sit on */}
                    <div className="absolute inset-0 bg-black/10 group-hover: transition-colors duration-300" />

                    {/* Custom play button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-11 h-11 rounded-full bg-white/90 group-hover:bg-white flex items-center justify-center shadow-sm transition-colors duration-300">
                            <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#7B1C2E] fill-[#7B1C2E] ml-0.5">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        </div>
                    </div>
                </button>
            )}
        </div>
    );
};

export default function Testimonials() {
    const [playingId, setPlayingId] = useState<string | null>(null);

    return (
        <section className="bg-[#f0ebe3] py-1 md:py-1 px-5 sm:px-8">

            {/* ── HEADER ── */}
            <div className="text-center mb-3 md:mb-4">
                <p className="font-manrope text-[11px] md:text-xs tracking-[0.3em] uppercase text-[#7B1C2E] mb-1.5">
                    Testimonials
                </p>

                <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl text-gray-900 tracking-wide">
                    Kind Words
                </h2>

                {/* Decorative divider */}
                <div className="flex items-center justify-center gap-2 mt-3 mb-3">
                    <span className="h-px w-10 sm:w-14 bg-[#7B1C2E]/40" />
                    <svg
                        viewBox="0 0 16 16"
                        className="w-2.5 h-2.5 text-[#7B1C2E]"
                        fill="currentColor"
                    >
                        <path d="M8 0 L10 6 L16 8 L10 10 L8 16 L6 10 L0 8 L6 6 Z" />
                    </svg>
                    <span className="h-px w-10 sm:w-14 bg-[#7B1C2E]/40" />
                </div>

                <p className="font-manrope text-xs sm:text-sm text-gray-600">
                    Real stories. Real people. Real moments captured with love.
                </p>
            </div>

            {/* ── TESTIMONIAL CARDS ── */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 max-w-[1050px] mx-auto shadow-xs">
                {testimonials.map((testimonial) => (
                    <div
                        key={testimonial.youtubeId}
                        className="flex flex-col bg-[#f0ebe3] border border-[#7B1C2E]/15 rounded-2xl overflow-hidden"
                    >
                        <TestimonialCard
                            testimonial={testimonial}
                            isPlaying={playingId === testimonial.youtubeId}
                            onPlay={setPlayingId}
                            onStop={() => setPlayingId(null)}
                        />

                        {/* Content */}
                        <div className="flex flex-col items-center text-center px-4 sm:px-5 py-4 sm:py-5">

                            {/* Quotation mark */}
                            <svg
                                viewBox="0 0 32 24"
                                className="w-5 h-5 text-[#7B1C2E] mb-2"
                                fill="currentColor"
                            >
                                <path d="M0 24V14.4C0 6.4 4.8 1.2 12.8 0l1.6 3.6C9.2 5.2 6.8 8 6.8 12h6.4v12H0Zm18.4 0V14.4c0-8 4.8-13.2 12.8-14.4L32.8 3.6C27.6 5.2 25.2 8 25.2 12h6.4v12H18.4Z" />
                            </svg>

                            <p className="font-manrope text-xs sm:text-sm text-gray-700 leading-relaxed">
                                &ldquo;{testimonial.quote}&rdquo;
                            </p>

                            <span className="w-full h-px bg-[#7B1C2E]/15 my-3" />

                            <p className="font-manrope text-xs tracking-[0.15em] uppercase text-[#7B1C2E] font-semibold">
                                {testimonial.name}
                            </p>
                            <p className="font-manrope text-[10px] tracking-[0.15em] uppercase text-gray-400 mt-0.5">
                                {testimonial.role}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

        </section>
    );
}