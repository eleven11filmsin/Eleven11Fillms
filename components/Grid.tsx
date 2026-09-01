import Image from "next/image";

const images = [
    "/images/grid/DSC04779.jpg",
    "/images/grid/IMG_8292.JPG",
    "/images/grid/DSC02347.jpg",
    "/images/grid/DSC01498 2.jpg",
    "/images/grid/DSC03740.jpg",
    "/images/grid/DSC09285.jpg",
    "/images/grid/DSC07851 2.jpg",
    "/images/grid/IMG_6514.JPG",
    "/images/grid/DSC07769.jpg",
    "/images/grid/DSC09303.jpg",
    "/images/grid/DSC03256.jpg",
    "/images/grid/IMG_8461.JPG",
    "/images/grid/DSC02333.jpg",
    "/images/grid/IMG_8494.JPG",
    "/images/grid/DSC04701.jpg",
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