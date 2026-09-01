"use client";

import { useEffect, useRef, useState } from "react";

interface CoupleAudioPlayerProps {
    audioSrc: string;
    title?: string;
    coupleName?: string;
}

const WAVE_BAR_HEIGHTS = [5, 10, 7, 12, 8, 11, 6];

export default function CoupleAudioPlayer({ audioSrc }: CoupleAudioPlayerProps) {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        audio.volume = 0.6;

        const handlePlay = () => setIsPlaying(true);
        const handlePause = () => setIsPlaying(false);

        audio.addEventListener("play", handlePlay);
        audio.addEventListener("pause", handlePause);

        // Intentionally no audio.play() here — Couples pages start paused.
        // Playback is entirely user-initiated via the button below.

        return () => {
            audio.removeEventListener("play", handlePlay);
            audio.removeEventListener("pause", handlePause);

            audio.pause();
        };
    }, []);

    const toggle = async () => {
        const audio = audioRef.current;
        if (!audio) return;

        try {
            if (audio.paused) {
                await audio.play();
            } else {
                audio.pause();
            }
        } catch {
            setIsPlaying(false);
        }
    };

    return (
        <>
            <audio ref={audioRef} src={audioSrc} loop preload="metadata" />

            <button
                onClick={toggle}
                aria-label={isPlaying ? "Pause audio" : "Play audio"}
                aria-pressed={isPlaying}
                className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 sm:gap-3 bg-[#f0ebe3] border border-[#5b0625]/25 rounded-full px-3.5 py-2 sm:px-4 sm:py-2.5 hover:opacity-90 active:scale-95 transition-all duration-200"
            >
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="w-4.5 h-4.5 sm:w-6 sm:h-6 text-[#5b0625] shrink-0"
                >
                    <path d="M9 18V5l12-2v13" />
                    <circle cx="6" cy="18" r="3" />
                    <circle cx="18" cy="16" r="3" />
                </svg>

                <div
                    className={`flex items-end gap-[2px] h-3.5 sm:h-4 ${!isPlaying ? "opacity-30" : ""}`}
                >
                    {WAVE_BAR_HEIGHTS.map((h, i) => (
                        <span
                            key={i}
                            className={`couple-wave-bar block w-[2px] bg-[#5b0625] rounded-full ${isPlaying ? "couple-wave-bar--animating" : ""}`}
                            style={
                                {
                                    height: `${h}px`,
                                    "--wave-delay": `${i * 0.12}s`,
                                } as React.CSSProperties
                            }
                        />
                    ))}
                </div>
            </button>

            <style>{`
                .couple-wave-bar {
                    animation-name: none;
                }
                .couple-wave-bar--animating {
                    animation-name: coupleWaveBar;
                    animation-duration: 1.2s;
                    animation-timing-function: ease-in-out;
                    animation-iteration-count: infinite;
                    animation-delay: var(--wave-delay, 0s);
                }
                @keyframes coupleWaveBar {
                    0%, 100% { transform: scaleY(1); }
                    50% { transform: scaleY(1.8); }
                }
            `}</style>
        </>
    );
}