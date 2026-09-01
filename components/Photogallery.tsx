import Image from "next/image";
import Link from "next/link";

const couples = [
    {
        image: "/images/pratiksha/2.jpg",
        name: "Pratiksha",
        date: "Oct 7, 2024",
        slug: "pratiksha",
    },
    {
        image: "/images/ganeshdimple/13.jpg",
        name: "Ganesh & Dimple",
        date: "Aug 25, 2024",
        slug: "ganesh-dimple",
    },
    {
        image: "/images/tejalmanish/6.jpg",
        name: "Tejal & Manish",
        date: "Aug 8, 2024",
        slug: "tejalmanish",
    },
    {
        image: "/images/suyansh/2.JPG",
        name: "Suyansh",
        date: "Apr 24, 2024",
        slug: "suyansh",
    },
];

export default function CouplesGrid() {
    return (
        <section className="min-h-screen bg-[#f0ebe3] py-16 md:py-35 px-6 sm:px-10 md:px-15">

            {/* ── MOBILE: single vertical column ── */}
            <div className="flex flex-col gap-4 md:hidden">
                {couples.map((couple, index) => (
                    <div key={index} className="flex flex-col gap-2">
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
                                <p className="text-gray-900 font-bold text-[20px] font-playfair hover:text-[#5b0625] transition-colors cursor-pointer">
                                    {couple.name}
                                </p>
                            </Link>
                            <p className="text-gray-500 text-[12px] font-manrope">{couple.date}</p>
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
                                <p className="text-gray-900 font-playfair font-bold  text-[20px] hover:text-[#5b0625] transition-colors cursor-pointer">
                                    {couple.name}
                                </p>
                            </Link>
                            <p className="text-gray-500 text-[12px] font-manrope">{couple.date}</p>
                        </div>
                    </div>
                ))}
            </div>

        </section>
    );
}