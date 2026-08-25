"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Footer from "@/components/Footer";

const socialLinks = [
    { href: "https://www.instagram.com/eleven11films/", src: "/instagram.png", label: "Instagram" },
    { href: "https://www.youtube.com/@Eleven11_film", src: "/youtube.png", label: "YouTube" },
    { href: "https://www.facebook.com/profile.php?id=61567440545491", src: "/facebook.png", label: "Facebook" },
];

const credits = [
    { label: "Wedding Planned by", handle: "@directionsgroup" },
    { label: "Makeup and Hair", handle: "@meerasakhrani" },
    { label: "Stylist", handle: "@annychoibrides" },
    { label: "Bridal Outfit", handle: "@daniellefrankelstudio" },
    { label: "Creative Director", handle: "@lxemoments" },
    { label: "Production", handle: "@alvinprodplus" },
    { label: "Flowers", handle: "@thishumidhouse" },
];

type GalleryItem =
    | { kind: "single"; src: string; w: number; h: number; label?: string }
    | { kind: "collage"; src: string; w: number; h: number }
    | { kind: "caption"; text: string };

const galleryItems: GalleryItem[] = [
    { kind: "single", src: "/images/suyansh/IMG_8292.JPG", w: 360, h: 440 },
    { kind: "collage", src: "/images/suyansh/IMG_8464.JPG", w: 360, h: 420 },
    { kind: "single", src: "/images/suyansh/IMG_8478.JPG", w: 340, h: 420 },

    { kind: "collage", src: "/images/suyansh/IMG_8398.JPG", w: 360, h: 300 },
    { kind: "single", src: "/images/suyansh/IMG_8316.JPG", w: 320, h: 400 },
    { kind: "single", src: "/images/suyansh/IMG_8494.JPG", w: 350, h: 430 },
    { kind: "single", src: "/images/suyansh/IMG_8432.JPG", w: 300, h: 380 },

    { kind: "single", src: "/images/suyansh/IMG_8470.JPG", w: 340, h: 420 },
    { kind: "single", src: "/images/suyansh/IMG_8446.JPG", w: 310, h: 390 },
    { kind: "single", src: "/images/suyansh/IMG_8461.JPG", w: 350, h: 440 },
    { kind: "single", src: "/images/suyansh/IMG_8508.JPG", w: 360, h: 450 },
];

function AudioPlayer() {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [playing, setPlaying] = useState(false);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;
        audio.volume = 0.6;
        audio.play().then(() => setPlaying(true)).catch(() => { });
    }, []);

    const toggle = () => {
        const audio = audioRef.current;
        if (!audio) return;
        if (playing) { audio.pause(); setPlaying(false); }
        else { audio.play(); setPlaying(true); }
    };

    const waveBars = [8, 14, 10, 16, 8];

    return (
        <>
            <audio ref={audioRef} src="/audio/song.mp3" loop />

            <div className="fixed bottom-4 sm:bottom-7 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 sm:gap-4 bg-[#f0ebe3]/85 backdrop-blur-md border border-[#c8b8a8]/30 px-3.5 sm:px-6 py-2.5 sm:py-3 rounded-full shadow-xl w-[90vw] max-w-[300px] sm:w-auto sm:max-w-none sm:min-w-[260px]">
                <button
                    onClick={toggle}
                    className="w-8 h-8 sm:w-9 sm:h-9 shrink-0 rounded-full border border-red-400 text-red-400 flex items-center justify-center text-xs sm:text-sm hover:bg-red-400 hover:text-white transition-all duration-300"
                >
                    {playing ? "⏸" : "▶"}
                </button>

                <div className="flex flex-col gap-0.5 min-w-0">
                    <span className="text-[11px] sm:text-xs italic text-[#5a4a3a] tracking-wide truncate max-w-[140px] sm:max-w-[190px]">
                        Où tu ne m&apos;attendais pas
                    </span>

                    <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-[#a89080] truncate">
                        Isabelle Adjani
                    </span>
                </div>

                <div className={`flex items-center gap-[3px] h-5 shrink-0 ${!playing ? "opacity-20" : ""}`}>
                    {waveBars.map((h, i) => (
                        <span
                            key={i}
                            className="block w-[3px] bg-red-400 rounded-full"
                            style={{
                                height: `${h}px`,
                                animation: playing ? `waveBar 1.2s ease-in-out ${i * 0.15}s infinite` : "none",
                            }}
                        />
                    ))}
                </div>
            </div>

            <style>{`
        @keyframes waveBar {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(1.9); }
        }
      `}</style>
        </>
    );
}

export default function KiaraAndSiddharth() {
    const [menuOpen, setMenuOpen] = useState(false);

    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [visible, setVisible] = useState<boolean[]>(
        Array(galleryItems.length).fill(false)
    );

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const idx = itemRefs.current.indexOf(entry.target as HTMLDivElement);
                    if (entry.isIntersecting && idx !== -1) {
                        setVisible((v) => {
                            const next = [...v];
                            next[idx] = true;
                            return next;
                        });
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
        );
        itemRefs.current.forEach((el) => el && observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <main className="min-h-screen bg-[#f0ebe3] flex flex-col overflow-x-hidden">

            {/* ===== MOBILE NAVBAR (xs–md) ===== */}
            <nav className="flex md:hidden items-center justify-between px-4 sm:px-6 py-4 border-b border-gray-200">
                <Link href="/" className="flex items-center shrink-0">
                    <Image
                        src="/images/eleven11logo.png"
                        alt="Eleven11 Films"
                        width={390}
                        height={95}
                        className="h-[50px] sm:h-[60px] w-auto max-w-[160px] sm:max-w-[190px] object-contain"
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
                        className="w-[30px] h-[30px] sm:w-[34px] sm:h-[34px] object-contain"
                    />
                </button>
            </nav>

            {/* ===== DESKTOP NAVBAR (md+) ===== */}
            <nav className="hidden md:flex items-center justify-between gap-8 px-6 md:px-8 lg:px-12 xl:px-16 py-4 border-b border-gray-200">
                <Link href="/" className="flex items-center shrink-0 min-w-0">
                    <Image
                        src="/images/eleven11logo.png"
                        alt="Eleven11 Films"
                        width={450}
                        height={110}
                        className="h-[50px] lg:h-[55px] xl:h-[60px] w-auto max-w-[160px] lg:max-w-[190px] xl:max-w-[280px] object-contain"
                        priority
                    />
                </Link>

                <div className="flex items-center justify-end gap-4 lg:gap-6 xl:gap-8 shrink min-w-0">
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
                        className="relative overflow-hidden rounded-full border-2 border-red-400 bg-red-400 text-white font-serif tracking-wide text-xs lg:text-sm px-4 lg:px-5 xl:px-6 py-2 lg:py-2.5 whitespace-nowrap shrink-0 transition-colors duration-300 group"
                    >
                        <span className="absolute inset-0 bg-[#7B1C2E] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out rounded-full" />
                        <span className="relative z-10 text-white">Get in Touch</span>
                    </Link>
                </div>
            </nav>

            {/* ===== MOBILE MENU BACKDROP ===== */}
            <div
                className={`fixed inset-0 z-40 bg-black/40 md:hidden transition-opacity duration-300 ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    }`}
                onClick={() => setMenuOpen(false)}
            />

            {/* ===== MOBILE MENU PANEL — slides down from top, half screen ===== */}
            <div
                className={`fixed top-0 left-0 z-50 flex flex-col bg-white md:hidden transition-transform duration-300 ease-in-out ${menuOpen ? "translate-y-0" : "-translate-y-full"
                    }`}
                style={{ width: "100vw", height: "50dvh" }}
            >
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

            {/* Couple Name + Credits */}
            <div className="flex flex-col items-center pt-12 sm:pt-16 md:pt-20 pb-10 gap-5 sm:gap-6 px-4">
                <h1
                    className="font-serif text-gray-400 tracking-wide text-center"
                    style={{ fontSize: "clamp(2.25rem, 8vw, 3.75rem)" }}
                >
                    Suyansh
                </h1>

                <div className="flex flex-col items-center gap-1 text-xs sm:text-sm text-gray-600 text-center max-w-full px-2">
                    {credits.map((credit, index) => (
                        <p key={index} className="break-words">
                            {credit.label}{" "}
                            <span className="font-semibold underline cursor-pointer hover:text-red-400 transition-colors">
                                {credit.handle}
                            </span>
                        </p>
                    ))}
                </div>
            </div>

            {/* Vertical Gallery */}
            <div className="w-full flex flex-col items-center gap-6 sm:gap-8 px-4 sm:px-6 pb-32 sm:pb-40">
                {galleryItems.map((item, i) => {
                    if (item.kind === "caption") {
                        return (
                            <div
                                key={i}
                                ref={(el) => { itemRefs.current[i] = el; }}
                                className={`text-center font-serif italic text-[#b0a090] text-sm sm:text-base tracking-widest py-4 transition-opacity duration-1000 ${visible[i] ? "opacity-100" : "opacity-0"}`}
                            >
                                {item.text}
                            </div>
                        );
                    }

                    return (
                        <div
                            key={i}
                            ref={(el) => { itemRefs.current[i] = el; }}
                            className={`relative w-full mx-auto transition-all duration-700 ${visible[i] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                            style={{
                                maxWidth: `${item.w}px`,
                                aspectRatio: `${item.w} / ${item.h}`,
                            }}
                        >
                            <Image
                                src={item.src}
                                alt={`Wedding photo ${i + 1}`}
                                fill
                                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 60vw, 400px"
                                className="object-cover"
                                style={{ filter: "saturate(0.92) brightness(1.02)" }}
                            />
                            {item.kind === "single" && item.label && (
                                <span className="absolute bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 text-[9px] sm:text-[11px] tracking-[0.3em] sm:tracking-[0.45em] uppercase text-white/85 font-serif whitespace-nowrap drop-shadow-md">
                                    {item.label}
                                </span>
                            )}
                        </div>
                    );
                })}
            </div>

            <AudioPlayer />
            <Footer />
        </main>
    );
}