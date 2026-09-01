import Link from "next/link";
import Image from "next/image";

const services = [
    "Wedding Films",
    "Wedding Photography",
    "Pre Wedding",
    "Highlight Films",
    "Teaser Films",
    "Cinematic Videos",
    "Reels / Short Films",
];

export default function Footer() {
    return (
        <footer className="w-full bg-[#f0ebe3] mt-auto flex items-center justify-center">

            {/* =========================================================
                MAIN FOOTER — 3 COLUMN GRID
            ========================================================= */}
            <div className="px-3 sm:px-5 md:px-6 py-4 sm:py-14 w-full">

                <div className="w-full max-w-4xl mx-auto">

                    <div
                        className="
                            grid
                            grid-cols-1
                            md:grid-cols-3
                            items-start
                        "
                    >

                        {/* =================================================
                            COLUMN 1 — LOGO + TAGLINE
                        ================================================= */}
                        <div
                            className="
                                flex
                                flex-col
                                items-center
                                md:items-start
                                sm:px-8
                                md:px-8
                                lg:px-10
                                py-3
                                md:py-4
                            "
                        >

                            {/* Logo */}
                            <Link href="/" className="block">
                                <Image
                                    src="/images/Eleven11Filmsred.png"
                                    alt="Eleven 11 Films"
                                    width={2160}
                                    height={740}
                                    className="w-44 sm:w-48 h-auto"
                                />
                            </Link>

                            {/* Tagline — intentionally close to logo */}
                            <p
                                className="
                                    font-manrope
                                    text-xs
                                    sm:text-sm
                                    text-[#1a1a1a]
                                    leading-relaxed
                                    max-w-[280px]
                                    mt-2
                                "
                            >
                                Capturing what you've always wished for

                            </p>

                        </div>


                        {/* =================================================
                            COLUMN 2 — SERVICES
                        ================================================= */}
                        <div
                            className="
        flex
        flex-col
        items-center
        text-center
        md:items-start
        md:text-left
        px-10
        sm:px-14
        md:px-8
        lg:px-10
        py-3
        md:py-4
        translate-x-0
        md:translate-x-12
        lg:translate-x-14
    "
                        >

                            <h3
                                className="
                                    font-manrope
                                    text-xs
                                    tracking-[0.2em]
                                    uppercase
                                    text-[#7B1C2E]
                                    mb-3
                                "
                            >
                                Services
                            </h3>

                            <div className="flex flex-col gap-2">
                                {services.map((service) => (
                                    <p
                                        key={service}
                                        className="
                                            font-manrope
                                            text-sm
                                            text-[#1a1a1a]
                                            leading-relaxed
                                        "
                                    >
                                        {service}
                                    </p>
                                ))}
                            </div>

                        </div>


                        {/* =================================================
                            COLUMN 3 — GET IN TOUCH
                        ================================================= */}
                        <div
                            className="
        flex
        flex-col
        items-center
        text-center
        md:items-start
        md:text-left
        px-5
        sm:px-8
        md:px-8
        lg:px-10
        py-3
        md:py-4
    "
                        >

                            <h3
                                className="
                                    font-manrope
                                    text-xs
                                    tracking-[0.2em]
                                    uppercase
                                    text-[#7B1C2E]
                                    mb-3
                                    gap-3
                                "
                            >
                                Get In Touch
                            </h3>

                            <div className="flex flex-col gap-3.5">

                                {/* Phone */}
                                <a
                                    href="tel:+919359101185"
                                    className="flex items-start gap-3 group"
                                >
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.4"
                                        className="w-5 h-5 shrink-0 text-[#7B1C2E] mt-0.5"
                                    >
                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L8 9.73a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92z" />
                                    </svg>

                                    <span className="font-manrope text-sm text-[#1a1a1a] group-hover:opacity-60 transition-opacity">
                                        +91 93591 01185
                                    </span>
                                </a>


                                {/* Email */}
                                <a
                                    href="mailto:eleven11films.in@gmail.com"
                                    className="flex items-start gap-3 group"
                                >
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.4"
                                        className="w-5 h-5 shrink-0 text-[#7B1C2E] mt-0.5"
                                    >
                                        <rect
                                            x="2"
                                            y="4"
                                            width="20"
                                            height="16"
                                            rx="1.5"
                                        />
                                        <path d="m3 6 9 7 9-7" />
                                    </svg>

                                    <span className="font-manrope text-sm text-[#1a1a1a] break-all group-hover:opacity-60 transition-opacity">
                                        eleven11films.in@gmail.com
                                    </span>
                                </a>


                                {/* Location */}
                                <div className="flex items-start gap-3">

                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.4"
                                        className="w-5 h-5 shrink-0 text-[#7B1C2E] mt-0.5"
                                    >
                                        <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
                                        <circle cx="12" cy="10" r="2.5" />
                                    </svg>

                                    <span className="font-manrope text-sm text-[#1a1a1a]">
                                        Mumbai, IN Worldwide
                                    </span>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </footer>
    );
}