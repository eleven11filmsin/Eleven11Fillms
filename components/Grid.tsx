import Image from "next/image";

const images = [
    "/images/galleryph4.png",
    "/images/galleryph4.png",
    "/images/galleryph4.png",
    "/images/galleryph4.png",
    "/images/galleryph4.png",
    "/images/galleryph4.png",
    "/images/galleryph4.png",
    "/images/galleryph4.png",
    "/images/galleryph4.png",
    "/images/galleryph4.png",
    "/images/galleryph4.png",
    "/images/galleryph4.png",
    "/images/galleryph4.png",
    "/images/galleryph4.png",
    "/images/galleryph4.png",
];

export default function Grid() {
    return (
        <section className="min-h-screen bg-[#f0ebe3] py-7">

            {/* ── MOBILE: 2-column grid ── */}
            <div className="grid grid-cols-2 gap-0.5 md:hidden">
                {images.map((src, index) => (
                    <div key={index} className="relative w-full h-[48vw] overflow-hidden group">
                        <Image
                            src={src}
                            alt={`Gallery ${index + 1}`}
                            fill
                            className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                        />
                    </div>
                ))}
                {/* Blank 16th cell so img 15 isn't full-width */}
                <div className="w-full h-[48vw] bg-[#f0ebe3]" />
            </div>

            {/* ── DESKTOP: original 5-column grid, untouched ── */}
            <div className="hidden md:grid grid-cols-5 gap-0.5">
                {images.map((src, index) => (
                    <div key={index} className="relative w-full h-70 overflow-hidden group">
                        <Image
                            src={src}
                            alt={`Gallery ${index + 1}`}
                            fill
                            className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                        />
                    </div>
                ))}
            </div>

        </section>
    );
}