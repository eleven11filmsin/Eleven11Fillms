import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="w-full bg-[#f0ebe3] border-t border-gray-200 mt-auto py-10 md:py-16">
            <div className="w-full max-w-6xl mx-auto px-6 md:px-10">

                {/* ── MOBILE: stacked centered layout ── */}
                <div className="flex flex-col items-center gap-8 md:hidden text-center">

                    {/* Brand */}
                    <Link href="/">
                        <h2 className="font-serif text-[#1a1a1a] text-xl font-bold leading-tight tracking-wide">
                            ELEVEN11 FILMS
                        </h2>
                    </Link>

                    {/* Socials */}
                    <div className="flex items-center gap-5">
                        <a href="https://www.instagram.com/eleven11films/" target="_blank" rel="noopener noreferrer" className="hover:opacity-50 transition-opacity">
                            <Image src="/images/instagram.png" alt="Instagram" width={20} height={20} />
                        </a>
                        <a href="https://www.facebook.com/profile.php?id=61567440545491" target="_blank" rel="noopener noreferrer" className="hover:opacity-50 transition-opacity">
                            <Image src="/images/facebook.png" alt="Facebook" width={20} height={20} />
                        </a>
                        <a href="https://vimeo.com/eleven11films" target="_blank" rel="noopener noreferrer" className="hover:opacity-50 transition-opacity">
                            <Image src="/images/vimeo.png" alt="Vimeo" width={20} height={20} />
                        </a>
                    </div>

                    {/* Location + Policy */}
                    <div className="flex flex-col gap-2">
                        <p className="text-[#1a1a1a] text-sm font-serif tracking-wide">
                            Mumbai . Bangalore
                        </p>
                        <Link href="/privacy" className="text-[#1a1a1a] text-sm font-serif tracking-wide hover:opacity-50 transition-opacity">
                            Privacy Policy
                        </Link>
                    </div>

                    {/* Contact */}
                    <div className="flex flex-col gap-2">
                        <a href="tel:+919964787383" className="text-[#1a1a1a] text-sm font-serif tracking-wide hover:opacity-50 transition-opacity">
                            +91 99647 87383
                        </a>
                        <a href="mailto:hello@eleven11films.com" className="text-[#1a1a1a] text-sm font-serif tracking-wide hover:opacity-50 transition-opacity">
                            hello@eleven11films.com
                        </a>
                    </div>

                </div>

                {/* ── DESKTOP: original horizontal layout ── */}
                <div className="hidden md:flex items-start justify-between gap-10">

                    {/* Left — Brand + Socials */}
                    <div className="flex flex-col gap-6">
                        <Link href="/">
                            <h2 className="font-serif text-[#1a1a1a] text-2xl font-bold leading-tight tracking-wide">
                                ELEVEN11 FILMS
                            </h2>
                        </Link>
                        <div className="flex items-center gap-4">
                            <a href="https://www.instagram.com/eleven11films/" target="_blank" rel="noopener noreferrer" className="hover:opacity-50 transition-opacity">
                                <Image src="/images/instagram.png" alt="Instagram" width={20} height={20} />
                            </a>
                            <a href="https://www.facebook.com/profile.php?id=61567440545491" target="_blank" rel="noopener noreferrer" className="hover:opacity-50 transition-opacity">
                                <Image src="/images/facebook.png" alt="Facebook" width={20} height={20} />
                            </a>
                            <a href="https://vimeo.com/eleven11films" target="_blank" rel="noopener noreferrer" className="hover:opacity-50 transition-opacity">
                                <Image src="/images/vimeo.png" alt="Vimeo" width={20} height={20} />
                            </a>
                        </div>
                    </div>

                    {/* Center — Location + Policy */}
                    <div className="flex flex-col gap-3 pt-1">
                        <p className="text-[#1a1a1a] text-sm font-serif tracking-wide">
                            Mumbai . Bangalore
                        </p>
                        <Link href="/privacy" className="text-[#1a1a1a] text-sm font-serif tracking-wide hover:opacity-50 transition-opacity">
                            Privacy Policy
                        </Link>
                    </div>

                    {/* Right — Contact */}
                    <div className="flex flex-col gap-3 pt-1">
                        <a href="tel:+919964787383" className="text-[#1a1a1a] text-sm font-serif tracking-wide hover:opacity-50 transition-opacity">
                            +91 99647 87383
                        </a>
                        <a href="mailto:hello@eleven11films.com" className="text-[#1a1a1a] text-sm font-serif tracking-wide hover:opacity-50 transition-opacity">
                            hello@eleven11films.com
                        </a>
                    </div>

                </div>

            </div>
        </footer>
    );
}