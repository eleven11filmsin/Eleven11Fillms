import Image from "next/image";
import Link from "next/link";

const couples = [
    {
        image: "/images/galleryph1.png",
        name: "Reva & Zach",
        date: "Oct 7, 2024",
        slug: "reva-and-zach",
    },
    {
        image: "/images/galleryph2.png",
        name: "Priya & Arjun",
        date: "Aug 25, 2024",
        slug: "priya-and-arjun",
    },
    {
        image: "/images/galleryph3.png",
        name: "Alia & Ranbir, Mumbai",
        date: "Aug 8, 2024",
        slug: "alia-and-ranbir",
    },
    {
        image: "/images/galleryph4.png",
        name: "Kiara & Siddharth",
        date: "Apr 24, 2024",
        slug: "kiara-and-siddharth",
    },
];

export default function CouplesGrid() {
    return (
        <section className="min-h-screen bg-[#f0ebe3] py-16 md:py-35 px-6 sm:px-10 md:px-15">

            {/* ── MOBILE: single vertical column ── */}
            <div className="flex flex-col gap-1 md:hidden">
                {couples.map((couple, index) => (
                    <div key={index} className="flex flex-col gap-3">
                        <Link href={`/couples/${couple.slug}`} className="block group cursor-pointer">
                            <div className="relative w-full overflow-hidden" style={{ height: "463px" }}>
                                <Image
                                    src={couple.image}
                                    alt={couple.name}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                        </Link>
                        <div className="flex flex-col gap-0.5">
                            <Link href={`/couples/${couple.slug}`}>
                                <p className="text-gray-900 font-semibold text-base font-serif hover:text-red-400 transition-colors cursor-pointer">
                                    {couple.name}
                                </p>
                            </Link>
                            <p className="text-gray-500 text-sm">{couple.date}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* ── DESKTOP: original 4-column grid ── */}
            <div className="hidden md:grid grid-cols-4 gap-1 items-end">
                {couples.map((couple, index) => (
                    <div key={index} className="flex flex-col gap-3">
                        <Link href={`/couples/${couple.slug}`} className="block group cursor-pointer">
                            <div className="relative w-full overflow-hidden" style={{ height: "463px" }}>
                                <Image
                                    src={couple.image}
                                    alt={couple.name}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                        </Link>
                        <div className="flex flex-col gap-0.5">
                            <Link href={`/couples/${couple.slug}`}>
                                <p className="text-gray-900 font-semibold text-base font-serif hover:text-red-400 transition-colors cursor-pointer">
                                    {couple.name}
                                </p>
                            </Link>
                            <p className="text-gray-500 text-sm">{couple.date}</p>
                        </div>
                    </div>
                ))}
            </div>

        </section>
    );
}