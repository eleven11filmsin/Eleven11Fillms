import Image from "next/image";
import Link from "next/link";

const couples = [
    {
        slug: "parag-gauri",
        name: "PARAG&GUARI",
        location: null,
        image: "/images/galleryph1.png",
        brand: "Eleven11 Films",
        brandColor: "text-white/70",
    },
    {
        slug: "alisha-rahul",
        name: "ALISHA&RAHUL",
        location: null,
        image: "/images/galleryph2.png",
        brand: "Eleven11 Films",
        brandColor: "text-white/70",
    },
    {
        slug: "saloni-sid",
        name: "SALONI&SID",
        location: null,
        image: "/images/galleryph3.png",
        brand: "Eleven11 Films",
        brandColor: "text-white/70",
    },
    {
        slug: "zina-zain",
        name: "ZINA&ZAIN",
        location: null,
        image: "/images/galleryph4.png",
        brand: "Eleven11 Films",
        brandColor: "text-white/70",
    },
];

const CoupleCard = ({ couple }: { couple: typeof couples[0] }) => (
    <div className="block group">
        <div className="relative w-full overflow-hidden" style={{ height: "390px" }}>

            <Image
                src={couple.image}
                alt={couple.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
            />

            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/60" />

            {/* Brand name - top center */}
            <div className="absolute top-5 left-0 right-0 flex justify-center">
                <span
                    className={`${couple.brandColor} text-[10px] tracking-[0.35em] uppercase font-light`}
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                    {couple.brand}
                </span>
            </div>

            {/* Play button - center (hover) */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-15 h-15 flex items-center justify-center">
                    <svg className="w-15 h-15 text-white fill-white ml-1" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                    </svg>
                </div>
            </div>

            {/* Always-visible play icon (subtle) */}
            <div className="absolute inset-0 flex items-center justify-center group-hover:opacity-0 transition-opacity duration-300">
                <div className="w-15 h-15 flex items-center justify-center">
                    <svg className="w-15 h-15 text-white fill-white ml-0.5" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                    </svg>
                </div>
            </div>

            {/* Couple name + location - bottom left */}
            <div className="absolute bottom-6 left-6 right-6">
                {couple.location && (
                    <p
                        className="text-rose-400 text-[10px] tracking-[0.3em] uppercase mb-1"
                        style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                        {couple.brand}
                    </p>
                )}
                <h2
                    className="text-white leading-none"
                    style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                        fontWeight: 300,
                        letterSpacing: "0.02em",
                    }}
                >
                    {couple.name}
                </h2>
                {couple.location && (
                    <p
                        className="text-white/80 text-sm mt-1 italic"
                        style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                        {couple.location}
                    </p>
                )}
            </div>

        </div>
    </div>
);

export default function Videogallery() {
    return (
        <section className="min-h-screen bg-[#f0ebe3] py-16 px-4">

            {/* Intro Text */}
            <div className="max-w-3xl mx-auto text-center mb-14 px-4">
                <p className="text-gray-800 font-semibold text-sm leading-relaxed font-serif">
                    We at HOTC celebrate the wild ones, the rule breakers, the travellers, the new age modern
                    couple who are not afraid to experiment. We believe the ultimate goal of a wedding
                    photographer is to justify the vibe of the wedding and the personalities of the couple.
                    And this approach has helped us experience weddings in a two bedroom apartments to
                    weddings spread over 2 continents.
                </p>
                <p className="text-gray-800 font-semibold text-sm leading-relaxed font-serif mt-6">
                    Here are some selected weddings from past couple of years to showcase the union of two
                    people in the most authentic way possible.
                </p>
            </div>

            {/* ── MOBILE: single vertical column ── */}
            <div className="flex flex-col gap-10 md:hidden max-w-[1390px] mx-auto">
                {couples.map((couple, index) => (
                    <CoupleCard key={index} couple={couple} />
                ))}
            </div>

            {/* ── DESKTOP: original 2-column grid ── */}
            <div className="hidden md:grid grid-cols-2 gap-x-3 gap-y-16 max-w-[1390px] mx-auto">
                {couples.map((couple, index) => (
                    <CoupleCard key={index} couple={couple} />
                ))}
            </div>

        </section>
    );
}