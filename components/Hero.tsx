"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const socialLinks = [
    { href: "https://www.instagram.com/eleven11films/", src: "/instagram.png", label: "Instagram" },
    { href: "https://youtube.com", src: "/youtube.png", label: "YouTube" },
    { href: "https://www.facebook.com/profile.php?id=61567440545491", src: "/facebook.png", label: "Facebook" },
    // { href: "https://vimeo.com/eleven11films", src: "/vimeo.png", label: "Vimeo" },
];

export default function Hero() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
            {/* ===== HERO VIDEO — full screen on all breakpoints ===== */}
            <div className="relative w-full h-[100svh] overflow-hidden">
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

                {/* ===== MOBILE NAVBAR (xs–md) ===== */}
                <nav className="flex md:hidden absolute top-0 left-0 w-full items-center justify-between px-4 sm:px-6 py-4 z-20">
                    <Link href="/" className="flex items-center shrink-0">
                        <Image
                            src="/images/eleven11logo.png"
                            alt="Eleven11 Films"
                            width={390}
                            height={95}
                            className="h-[50px] sm:h-[60px] w-auto max-w-[160px] sm:max-w-[190px] object-contain drop-shadow-md"
                            style={{ width: "auto" }}
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

                {/* ===== DESKTOP NAVBAR (md+) ===== */}
                <div className="hidden md:flex absolute top-0 left-0 w-full min-h-[100px] lg:min-h-[120px] xl:min-h-[130px] items-center justify-between gap-8 px-6 md:px-8 lg:px-12 xl:px-16 py-4 z-20">
                    <Link href="/" className="flex items-center shrink-0 min-w-0">
                        <Image
                            src="/images/eleven11logo.png"
                            alt="Eleven11 Films"
                            width={450}
                            height={110}
                            className="h-[50px] lg:h-[65px] xl:h-[72px] w-auto max-w-[160px] lg:max-w-[190px] xl:max-w-[280px] object-contain drop-shadow-md"
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
                            className="relative overflow-hidden rounded-full border-2  text-white font-serif tracking-wide text-xs lg:text-sm px-4 lg:px-5 xl:px-6 py-2 lg:py-2.5 whitespace-nowrap shrink-0 transition-colors duration-300 group"
                        >
                            <span className="absolute inset-0  translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out rounded-full" />
                            <span className="relative z-10 text-white">Get in Touch</span>
                        </Link>
                    </nav>
                </div>
            </div>

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
                {/* Top bar — logo + close */}
                <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-100 shrink-0">
                    <Link href="/" onClick={() => setMenuOpen(false)} className="flex items-center shrink-0">
                        <Image
                            src="/images/eleven11logo.png"
                            alt="Eleven11 Films"
                            width={290}
                            height={70}
                            className="h-[38px] w-auto max-w-[140px] object-contain"
                            style={{ width: "auto" }}
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

                {/* Social links — centered */}
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

                {/* Get In Touch — pinned at bottom */}
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