"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Footer from "@/components/Footer";

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
            <div className="fixed bottom-7 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 bg-[#f0ebe3]/85 backdrop-blur-md border border-[#c8b8a8]/30 px-6 py-3 rounded-full shadow-xl min-w-[260px]">
                <button
                    onClick={toggle}
                    className="w-9 h-9 rounded-full border border-red-400 text-red-400 flex items-center justify-center text-sm hover:bg-red-400 hover:text-white transition-all duration-300"
                >
                    {playing ? "⏸" : "▶"}
                </button>
                <div className="flex flex-col gap-0.5">
                    <span className="text-xs italic text-[#5a4a3a] tracking-wide truncate max-w-[190px]">
                        Où tu ne m&apos;attendais pas
                    </span>
                    <span className="text-[10px] uppercase tracking-widest text-[#a89080]">
                        Isabelle Adjani
                    </span>
                </div>
                <div className={`flex items-center gap-[3px] h-5 ${!playing ? "opacity-20" : ""}`}>
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
        <main className="min-h-screen bg-[#f0ebe3] flex flex-col">

            {/* Navbar */}
            <nav className="w-full flex items-center justify-between px-20 py-6 border-b border-gray-200">
                <Link href="/">
                    <h1 className="text-3xl text-red-400 font-semibold tracking-wide font-serif">
                        ELEVEN11 FILMS
                    </h1>
                </Link>
                <div className="flex items-center gap-10">
                    <a href="https://www.instagram.com/eleven11films/" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
                        <Image src="/images/instagram.png" alt="Instagram" width={24} height={24} />
                    </a>
                    <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
                        <Image src="/images/youtube.png" alt="YouTube" width={24} height={24} />
                    </a>
                    <a href="https://www.facebook.com/profile.php?id=61567440545491" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
                        <Image src="/images/facebook.png" alt="Facebook" width={24} height={24} />
                    </a>
                    <a href="https://vimeo.com/eleven11films?fl=pp&fe=sh" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
                        <Image src="/images/vimeo.png" alt="Vimeo" width={24} height={24} />
                    </a>
                    <Link
                        href="/contact"
                        className="relative overflow-hidden rounded-full border-2 border-red-400 bg-red-400 text-white font-serif tracking-wide text-sm px-6 py-2 transition-colors duration-300 group"
                    >
                        <span className="absolute inset-0 bg-[#7B1C2E] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out rounded-full" />
                        <span className="relative z-10 text-white">Create With Us</span>
                    </Link>
                </div>
            </nav>

            {/* Couple Name + Credits */}
            <div className="flex flex-col items-center pt-20 pb-10 gap-6">
                <h1 className="text-6xl font-serif text-gray-400 tracking-wide text-center">
                    Suyansh
                </h1>
                <div className="flex flex-col items-center gap-1 text-sm text-gray-600 text-center">
                    {credits.map((credit, index) => (
                        <p key={index}>
                            {credit.label}{" "}
                            <span className="font-semibold underline cursor-pointer hover:text-red-400 transition-colors">
                                {credit.handle}
                            </span>
                        </p>
                    ))}
                </div>
                
            </div>

            {/* Vertical Gallery — all centered, one per row */}
            <div className="w-full flex flex-col items-center gap-8 px-6 pb-40">
                {galleryItems.map((item, i) => {
                    if (item.kind === "caption") {
                        return (
                            <div
                                key={i}
                                ref={(el) => { itemRefs.current[i] = el; }}
                                className={`text-center font-serif italic text-[#b0a090] text-base tracking-widest py-4 transition-opacity duration-1000 ${visible[i] ? "opacity-100" : "opacity-0"}`}
                            >
                                {item.text}
                            </div>
                        );
                    }

                    return (
                        <div
                            key={i}
                            ref={(el) => { itemRefs.current[i] = el; }}
                            className={`relative transition-all duration-700 ${visible[i] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                            style={{ width: item.w, height: item.h }}
                        >
                            <Image
                                src={item.src}
                                alt={`Wedding photo ${i + 1}`}
                                fill
                                className="object-cover"
                                style={{ filter: "saturate(0.92) brightness(1.02)" }}
                            />
                            {item.kind === "single" && item.label && (
                                <span className="absolute bottom-5 left-1/2 -translate-x-1/2 text-[11px] tracking-[0.45em] uppercase text-white/85 font-serif whitespace-nowrap drop-shadow-md">
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