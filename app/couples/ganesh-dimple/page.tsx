"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Footer from "@/components/Footer";
import MobileMenu from "@/components/MobileMenu";
import CoupleAudioPlayer from "@/components/CoupleAudioPlayer";

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
    { kind: "single", src: "/images/ganeshdimple/1.jpg", w: 360, h: 440 },
    { kind: "collage", src: "/images/ganeshdimple/2.jpg", w: 360, h: 420 },
    { kind: "single", src: "/images/ganeshdimple/3.jpg", w: 340, h: 420 },

    { kind: "collage", src: "/images/ganeshdimple/4.jpg", w: 360, h: 420 },
    { kind: "single", src: "/images/ganeshdimple/5.jpg", w: 420, h: 300 },
    { kind: "single", src: "/images/ganeshdimple/6.jpg", w: 350, h: 430 },
    { kind: "single", src: "/images/ganeshdimple/7.jpg", w: 300, h: 380 },

    { kind: "single", src: "/images/ganeshdimple/8.jpg", w: 340, h: 420 },
    { kind: "single", src: "/images/ganeshdimple/9.jpg", w: 360, h: 450 },
    { kind: "single", src: "/images/ganeshdimple/10.jpg", w: 310, h: 390 },
    { kind: "single", src: "/images/ganeshdimple/11.jpg", w: 350, h: 440 },
    { kind: "single", src: "/images/ganeshdimple/12.jpg", w: 420, h: 300 },
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
            <audio ref={audioRef} src="/audio/partikshagallery.mp3" loop />

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

export default function PriyaAndArjun() {
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
            <nav className="flex md:hidden items-center justify-between px-4 sm:px-6 py-4">
                <Link href="/" className="flex items-center shrink-0">
                    <Image
                        src="/images/Eleven11Filmsred.png"
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
                        src="/images/Eleven11Filmsred.png"
                        alt="Eleven11 Films"
                        width={450}
                        height={110}
                        className="h-[50px] lg:h-[55px] xl:h-[60px] w-auto max-w-[160px] lg:max-w-[190px] xl:max-w-[280px] object-contain"
                        priority
                    />
                </Link>

                <div className="flex items-center justify-end gap-4 lg:gap-6 xl:gap-8 shrink min-w-0">
                    {/* {socialLinks.map((s) => (
                        
                            <a key={s.label}
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
                    ))} */}

                    <Link href="/contact"
                        className="relative overflow-hidden rounded-full border-2 border-[#5b0625] text-white font-manrope tracking-wide text-xs lg:text-sm px-4 lg:px-5 xl:px-6 py-2 lg:py-2.5 whitespace-nowrap shrink-0 transition-colors duration-300 group">
                        <span className="absolute inset-0 bg-[#5b0625]  translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out rounded-full" />
                        <span className="relative z-20 text-[#7B1C2E] group-hover:text-white transition-colors duration-300">GET IN TOUCH</span>
                    </Link>
                </div>
            </nav>

            {/* Mobile menu — shared component, consistent with Hero */}
            <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />

            {/* Couple Name + Credits */}
            <div className="flex flex-col items-center pt-12 sm:pt-16 md:pt-20 pb-10 gap-5 sm:gap-6 px-4">
                <h1
                    className="font-playfair text-gray-400 tracking-wide text-center"
                    style={{ fontSize: "clamp(2.25rem, 8vw, 3.75rem)" }}
                >
                    Ganesh &amp; Dimple
                </h1>

                {/* <div className="flex flex-col items-center gap-1 text-xs sm:text-sm text-gray-600 text-center max-w-full px-2">
                    {credits.map((credit, index) => (
                        <p key={index} className="break-words">
                            {credit.label}{" "}
                            <span className="font-semibold underline cursor-pointer hover:text-red-400 transition-colors">
                                {credit.handle}
                            </span>
                        </p>
                    ))}
                </div> */}
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

            <CoupleAudioPlayer
                audioSrc="/audio/ganeshdimplegallery.mp3"
                title="ganeshdimplegallery"
                coupleName="Ganesh & Dimple"
            />
            <Footer />
        </main>
    );
}