"use client";

// app/testimonials/page.tsx
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import { useState } from "react";
import MobileMenu from "@/components/MobileMenu";
import Image from "next/image";
import Link from "next/link";


export default function TestimonialsPage() {
    const [menuOpen, setMenuOpen] = useState(false);
    return (
        <div>
            {/* Mobile Navbar */}
            <nav className="block md:hidden w-full bg-[#f0ebe3] flex items-center justify-between px-4 sm:px-6 py-4">
                <Link href="/" className="flex items-center shrink-0">
                    <Image
                        src="/images/Eleven11Filmsred.png"
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
            <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
            <Testimonials />
            <Footer />
        </div>
    );
}