"use client";

import Image from "next/image";
import Link from "next/link";



const menuLinks = [
    { label: "Contact Us", href: "/contact" },
    { label: "Testimonials", href: "/testimonials" },
];

interface MobileMenuProps {
    open: boolean;
    onClose: () => void;
}

export default function MobileMenu({ open, onClose }: MobileMenuProps) {
    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 z-40 bg-[#f0ebe3] md:hidden transition-opacity duration-300 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    }`}
                onClick={onClose}
            />

            {/* Menu panel */}
            <div
                className={`fixed inset-0 z-50 flex flex-col bg-[#f0ebe3] md:hidden transition-transform duration-300 ease-in-out ${open ? "translate-y-0" : "-translate-y-full"
                    }`}
            >
                {/* Top bar — X left, logo centered */}
                <div className="relative flex items-center justify-center px-5 py-1 shrink-0">
                    <button
                        onClick={onClose}
                        aria-label="Close menu"
                        className="absolute left-5 w-8 h-8 flex items-center justify-center shrink-0"
                    >
                        <Image
                            src="/images/cross.png"
                            alt="Close menu"
                            width={22}
                            height={22}
                            className="w-[40px] h-[40px] object-contain"
                        />
                    </button>

                    <Link href="/" onClick={onClose} className="flex items-center shrink-0">
                        <Image
                            src="/images/eleven11filmsred.png"
                            alt="Eleven11 Films"
                            width={290}
                            height={70}
                            className="h-[100px] w-auto max-w-[200px] object-contain"
                        />
                    </Link>
                </div>

                {/* Nav links — vertically centered */}
                <div className="flex-1 flex flex-col items-center justify-center gap-6 px-6">
                    {menuLinks.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            onClick={onClose}
                            className="font-manrope font-medium text-2xl sm:text-3xl text-gray-900 tracking-wide hover:opacity-60 transition-opacity"
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>

                {/* Social links — centered row */}
                {/* <div className="flex items-center justify-center gap-6 pb-8 shrink-0">
                    {socialLinks.map((s) => (

                        <a key={s.label}
                            href={s.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={s.label}
                            className="flex items-center justify-center hover:opacity-60 transition-opacity"
                            onClick={onClose}
                        >
                            <Image
                                src={s.src}
                                alt={s.label}
                                width={22}
                                height={22}
                                className="w-[20px] h-[20px] object-contain"
                            />
                        </a>
                    ))}
                </div> */}

                {/* Get In Touch — compact, bottom */}
                <div className="flex justify-center pb-8 sm:pb-10 shrink-0">
                    <Link
                        href="/contact"
                        onClick={onClose}
                        className="border border-[#5b0625] text-[#5b0625] font-manrope font-bold tracking-widest text-sm px-15 py-3 rounded-full text-center hover:bg-[#5b0625] hover:text-white transition-colors duration-300"
                    >
                        GET IN TOUCH
                    </Link>
                </div>
            </div>
        </>
    );
}