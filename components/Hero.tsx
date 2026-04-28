"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const socialLinks = [
    { href: "https://www.instagram.com/eleven11films/", src: "/images/instagram.png", label: "Instagram" },
    { href: "https://youtube.com", src: "/images/youtube.png", label: "YouTube" },
    { href: "https://www.facebook.com/profile.php?id=61567440545491", src: "/images/facebook.png", label: "Facebook" },
    { href: "https://vimeo.com/eleven11films", src: "/images/vimeo.png", label: "Vimeo" },
];

export default function Hero() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
            {/* ===== HERO IMAGE — full screen on all breakpoints ===== */}
            <div className="relative w-full h-[100svh] overflow-hidden">
                <Image
                    src="/images/hero1.jpeg"
                    alt="Wedding"
                    fill
                    className="object-cover object-center"
                    priority
                />

                {/* ===== MOBILE NAVBAR (xs–md) ===== */}
                <nav className="flex md:hidden absolute top-0 left-0 w-full items-center justify-between px-4 sm:px-6 py-4 sm:py-5 z-20">
                    <Link href="/">
                        <h1 className="text-base sm:text-lg text-red-400 font-semibold tracking-wide font-serif drop-shadow-md">
                            ELEVEN11 FILMS
                        </h1>
                    </Link>
                    <button
                        onClick={() => setMenuOpen(true)}
                        aria-label="Open menu"
                        className="w-8 h-8 flex items-center justify-center"
                    >
                        <Image
                            src="/images/menu.png"
                            alt="Open menu"
                            width={28}
                            height={28}
                            className="object-contain drop-shadow-md"
                        />
                    </button>
                </nav>

                {/* ===== DESKTOP NAVBAR (md+) ===== */}
                <div className="hidden md:flex absolute top-0 left-0 w-full items-center justify-between px-8 lg:px-14 xl:px-20 py-6 lg:py-8 z-20">
                    <Link href="/">
                        <h1 className="text-2xl lg:text-3xl xl:text-4xl text-red-400 font-semibold tracking-wide font-serif">
                            ELEVEN11 FILMS
                        </h1>
                    </Link>
                    <nav className="flex items-center gap-5 lg:gap-8 xl:gap-10">
                        {socialLinks.map((s) => (
                            <a
                                key={s.label}
                                href={s.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:opacity-70 transition-opacity"
                            >
                                <Image
                                    src={s.src}
                                    alt={s.label}
                                    width={22}
                                    height={22}
                                    className="lg:w-6 lg:h-6"
                                />
                            </a>
                        ))}
                        <Link
                            href="/contact"
                            className="relative overflow-hidden rounded-full border-2 border-red-400 bg-red-400 text-white font-serif tracking-wide text-xs lg:text-sm px-4 lg:px-6 py-2 transition-colors duration-300 group"
                        >
                            <span className="absolute inset-0 bg-[#7B1C2E] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out rounded-full" />
                            <span className="relative z-10 text-white">Create With Us</span>
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
                <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-gray-100 shrink-0">
                    <Link href="/" onClick={() => setMenuOpen(false)}>
                        <h1 className="text-base sm:text-lg text-red-400 font-semibold tracking-wide font-serif">
                            ELEVEN11 FILMS
                        </h1>
                    </Link>
                    <button
                        onClick={() => setMenuOpen(false)}
                        aria-label="Close menu"
                        className="w-7 h-7 flex items-center justify-center"
                    >
                        <Image
                            src="/images/cross.png"
                            alt="Close menu"
                            width={18}
                            height={18}
                            className="object-contain"
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
                            <Image src={s.src} alt={s.label} width={18} height={18} className="shrink-0" />
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