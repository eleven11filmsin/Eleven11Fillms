"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import MobileMenu from "@/components/MobileMenu";
import MediaDock from "@/components/MediaDock";

const socialLinks = [
    {
        href: "https://www.instagram.com/eleven11films/",
        src: "/instagram.png",
        label: "Instagram",
    },
    {
        href: "https://www.facebook.com/profile.php?id=61567440545491",
        src: "/facebook.png",
        label: "Facebook",
    },
    {
        href: "https://www.youtube.com/@Eleven11_film",
        src: "/youtube.png",
        label: "YouTube",
    },
];

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
                                src="/images/eleven11newlogo.png"
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
                                src="/images/eleven11newlogo.png"
                                alt="Eleven11 Films"
                                width={450}
                                height={110}
                                className="h-[50px] lg:h-[55px] xl:h-[60px] w-auto max-w-[160px] lg:max-w-[190px] xl:max-w-[280px] object-contain drop-shadow-md"
                                priority
                            />
                        </Link>

                        <nav className="flex items-center justify-end gap-4 lg:gap-6 xl:gap-8 shrink min-w-0">
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

                            <Link
                                href="/contact"
                                className="relative overflow-hidden rounded-full border-2 text-white font-serif tracking-wide text-xs lg:text-sm px-4 lg:px-5 xl:px-6 py-2 lg:py-2.5 whitespace-nowrap shrink-0 transition-colors duration-300 group"
                            >
                                <span
                                    className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-[#5b0625] ease-out rounded-full"
                                />
                                <span className="relative z-10 text-white font-manrope">
                                    GET IN TOUCH
                                </span>
                            </Link>

                        </nav>
                    </div>
                </div>

                {/* =================================================
                    MEDIA DOCK — Instagram / Facebook / YouTube / Audio.
                    Fixed to the viewport bottom; stays visible across
                    the whole page, not just the Hero section.
                ================================================== */}
                <MediaDock />
            </div>

            {/* Mobile menu — shared component, same behavior as before */}
            <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
        </>
    );
}