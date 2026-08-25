"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const socialLinks = [
    {
        href: "https://www.instagram.com/eleven11films/",
        src: "/instagram.png",
        label: "Instagram",
    },
    {
        href: "https://www.youtube.com/@Eleven11_film",
        src: "/youtube.png",
        label: "YouTube",
    },
    {
        href: "https://www.facebook.com/profile.php?id=61567440545491",
        src: "/facebook.png",
        label: "Facebook",
    },
];

function HeroAudioPlayer() {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        audio.volume = 0.6;
        audio.loop = true;

        const handlePlay = () => setIsPlaying(true);
        const handlePause = () => setIsPlaying(false);
        const handleEnded = () => setIsPlaying(false);

        audio.addEventListener("play", handlePlay);
        audio.addEventListener("pause", handlePause);
        audio.addEventListener("ended", handleEnded);

        // Attempt autoplay once when Hero mounts.
        audio.play().catch(() => {
            setIsPlaying(false);
        });

        return () => {
            audio.removeEventListener("play", handlePlay);
            audio.removeEventListener("pause", handlePause);
            audio.removeEventListener("ended", handleEnded);

            audio.pause();
            audio.currentTime = 0;
        };
    }, []);

    const toggleAudio = async () => {
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

    const barCount = 8;

    return (
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-30">
            <audio ref={audioRef} src="/audio/hero.mp3" loop preload="auto" />

            <button
                type="button"
                onClick={toggleAudio}
                aria-label={isPlaying ? "Pause music" : "Play music"}
                className="group relative flex items-center justify-center gap-[3px] bg-transparent border border-white/40 w-[90px] h-[32px] sm:w-[105px] sm:h-[34px] px-2 rounded-full transition-transform duration-300 hover:scale-105 focus:outline-none focus-visible:ring-1 focus-visible:ring-white/40"
            >
                {!isPlaying && (
                    <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-2 h-2 text-white/60 mr-1 shrink-0 transition-colors duration-300 group-hover:text-white/90"
                    >
                        <path d="M8 5v14l11-7z" />
                    </svg>
                )}

                {Array.from({ length: barCount }).map((_, i) => (
                    <span
                        key={i}
                        className={`wave-bar wave-bar-${i} ${isPlaying ? "playing" : "paused"}`}
                    />
                ))}
            </button>

            <style>{`
                .wave-bar {
                    display: inline-block;
                    width: 2.5px;
                    border-radius: 9999px;
                    background: #ffffff;
                    transform-origin: center;
                    animation-duration: 1.15s;
                    animation-timing-function: ease-in-out;
                    animation-iteration-count: infinite;
                    animation-play-state: paused;
                }

                .wave-bar-0 { height: 8px;  animation-name: audioWave0; animation-delay: 0s; }
                .wave-bar-1 { height: 14px; animation-name: audioWave1; animation-delay: 0.12s; }
                .wave-bar-2 { height: 20px; animation-name: audioWave2; animation-delay: 0.24s; }
                .wave-bar-3 { height: 12px; animation-name: audioWave3; animation-delay: 0.36s; }
                .wave-bar-4 { height: 18px; animation-name: audioWave4; animation-delay: 0.48s; }
                .wave-bar-5 { height: 12px; animation-name: audioWave5; animation-delay: 0.36s; }
                .wave-bar-6 { height: 20px; animation-name: audioWave6; animation-delay: 0.24s; }
                .wave-bar-7 { height: 14px; animation-name: audioWave7; animation-delay: 0.12s; }

                .wave-bar.playing {
                    animation-play-state: running;
                    opacity: 0.9;
                }

                .wave-bar.paused {
                    animation-play-state: paused;
                    opacity: 0.4;
                    transform: scaleY(0.55);
                }

                @keyframes audioWave0 { 0%, 100% { transform: scaleY(0.45); } 50% { transform: scaleY(0.75); } }
                @keyframes audioWave1 { 0%, 100% { transform: scaleY(0.45); } 50% { transform: scaleY(1); } }
                @keyframes audioWave2 { 0%, 100% { transform: scaleY(0.4);  } 50% { transform: scaleY(0.65); } }
                @keyframes audioWave3 { 0%, 100% { transform: scaleY(0.45); } 50% { transform: scaleY(0.9); } }
                @keyframes audioWave4 { 0%, 100% { transform: scaleY(0.4);  } 50% { transform: scaleY(0.6); } }
                @keyframes audioWave5 { 0%, 100% { transform: scaleY(0.45); } 50% { transform: scaleY(0.9); } }
                @keyframes audioWave6 { 0%, 100% { transform: scaleY(0.4);  } 50% { transform: scaleY(0.65); } }
                @keyframes audioWave7 { 0%, 100% { transform: scaleY(0.45); } 50% { transform: scaleY(1); } }
            `}</style>
        </div>
    );
}

export default function Hero() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
            {/* =====================================================
                HERO
            ====================================================== */}
            <div className="relative w-full overflow-hidden">

                {/* =================================================
                    MOBILE HERO
                    2160 × 2700 = 4:5 natural aspect ratio.
                ================================================== */}
                <div className="relative block md:hidden w-full aspect-[4/5] overflow-hidden">
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                        className="absolute top-0 left-0 w-full h-full object-cover"
                    >
                        <source src="/videos/mobilehero.mp4" type="video/mp4" />
                    </video>

                    {/* Mobile Navbar overlays video */}
                    <nav className="absolute top-0 left-0 w-full flex items-center justify-between px-4 sm:px-6 py-4 z-20">
                        <Link href="/" className="flex items-center shrink-0">
                            <Image
                                src="/images/eleven11logo.png"
                                alt="Eleven11 Films"
                                width={390}
                                height={95}
                                className="h-[50px] sm:h-[60px] w-auto max-w-[160px] sm:max-w-[190px] object-contain drop-shadow-md"
                                priority
                            />
                        </Link>

                        <button
                            onClick={() => setMenuOpen(true)}
                            aria-label="Open menu"
                            className="w-10 h-10 flex items-center justify-center shrink-0"
                        >
                            <Image
                                src="/images/menu.png"
                                alt="Open menu"
                                width={34}
                                height={34}
                                className="w-[30px] h-[30px] sm:w-[34px] sm:h-[34px] object-contain drop-shadow-md"
                            />
                        </button>
                    </nav>
                </div>

                {/* =================================================
                    DESKTOP HERO
                ================================================== */}
                <div className="hidden md:block relative w-full h-screen overflow-hidden">
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                        className="absolute inset-0 w-full h-full object-cover object-center z-0"
                    >
                        <source src="/videos/hero.mp4" type="video/mp4" />
                    </video>

                    {/* Desktop Navbar */}
                    <div className="absolute top-0 left-0 w-full min-h-[100px] lg:min-h-[120px] xl:min-h-[130px] flex items-center justify-between gap-8 px-6 md:px-8 lg:px-12 xl:px-16 py-4 z-20">
                        <Link href="/" className="flex items-center shrink-0 min-w-0">
                            <Image
                                src="/images/eleven11logo.png"
                                alt="Eleven11 Films"
                                width={450}
                                height={110}
                                className="h-[50px] lg:h-[55px] xl:h-[60px] w-auto max-w-[160px] lg:max-w-[190px] xl:max-w-[280px] object-contain drop-shadow-md"
                                priority
                            />
                        </Link>

                        <nav className="flex items-center justify-end gap-4 lg:gap-6 xl:gap-8 shrink min-w-0">
                            {socialLinks.map((s) => (
                                <a
                                    key={s.label}
                                    href={s.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={s.label}
                                    className="flex items-center justify-center shrink-0 hover:opacity-70 transition-opacity"
                                >
                                    <Image
                                        src={s.src}
                                        alt={s.label}
                                        width={30}
                                        height={30}
                                        className="w-[26px] h-[26px] lg:w-[30px] lg:h-[30px] xl:w-[32px] xl:h-[32px] object-contain"
                                    />
                                </a>
                            ))}

                            <Link
                                href="/contact"
                                className="relative overflow-hidden rounded-full border-2 text-white font-serif tracking-wide text-xs lg:text-sm px-4 lg:px-5 xl:px-6 py-2 lg:py-2.5 whitespace-nowrap shrink-0 transition-colors duration-300 group"
                            >
                                <span
                                    className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out rounded-full"
                                />
                                <span className="relative z-10 text-white">
                                    Get in Touch
                                </span>
                            </Link>
                        </nav>
                    </div>
                </div>

                {/* =================================================
                    AUDIO PLAYER — single shared instance, overlays
                    whichever hero (mobile or desktop) is visible.
                ================================================== */}
                <HeroAudioPlayer />
            </div>

            {/* =====================================================
                MOBILE MENU BACKDROP
            ====================================================== */}
            <div
                className={`fixed inset-0 z-40 bg-black/40 md:hidden transition-opacity duration-300 ${
                    menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`}
                onClick={() => setMenuOpen(false)}
            />

            {/* =====================================================
                MOBILE MENU
            ====================================================== */}
            <div
                className={`fixed top-0 left-0 z-50 flex flex-col bg-white md:hidden transition-transform duration-300 ease-in-out ${
                    menuOpen ? "translate-y-0" : "-translate-y-full"
                }`}
                style={{ width: "100vw", height: "50dvh" }}
            >
                {/* Top bar */}
                <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-100 shrink-0">
                    <Link href="/" onClick={() => setMenuOpen(false)} className="flex items-center shrink-0">
                        <Image
                            src="/images/eleven11logo.png"
                            alt="Eleven11 Films"
                            width={290}
                            height={70}
                            className="h-[38px] w-auto max-w-[140px] object-contain"
                        />
                    </Link>

                    <button
                        onClick={() => setMenuOpen(false)}
                        aria-label="Close menu"
                        className="w-8 h-8 flex items-center justify-center shrink-0"
                    >
                        <Image
                            src="/images/cross.png"
                            alt="Close menu"
                            width={22}
                            height={22}
                            className="w-[20px] h-[20px] object-contain"
                        />
                    </button>
                </div>

                {/* Social links */}
                <div className="flex-1 flex flex-col items-center justify-center gap-4 sm:gap-5 px-4 overflow-y-auto">
                    {socialLinks.map((s) => (
                        <a
                            key={s.label}
                            href={s.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 hover:opacity-60 transition-opacity"
                            onClick={() => setMenuOpen(false)}
                        >
                            <Image
                                src={s.src}
                                alt={s.label}
                                width={22}
                                height={22}
                                className="w-[22px] h-[22px] shrink-0 object-contain"
                            />
                            <span className="font-serif text-sm sm:text-base text-gray-800 tracking-wide w-28 sm:w-32">
                                {s.label}
                            </span>
                        </a>
                    ))}
                </div>

                {/* Get In Touch */}
                <div className="shrink-0 px-4 sm:px-6 py-4 sm:py-5">
                    <Link
                        href="/contact"
                        onClick={() => setMenuOpen(false)}
                        className="block w-full bg-gray-900 text-white font-serif tracking-widest text-xs py-3 rounded-lg text-center hover:bg-gray-700 transition-colors duration-300"
                    >
                        Get In Touch
                    </Link>
                </div>
            </div>
        </>
    );
}