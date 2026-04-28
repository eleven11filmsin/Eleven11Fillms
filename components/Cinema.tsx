import Image from "next/image";

export default function Cinema() {
    return (
        <>
            {/* Full Screen Video Section */}
            <section className="relative h-[60svh] sm:h-[75svh] md:h-screen w-full overflow-hidden">
                <Image
                    src="/images/hero1.jpeg"
                    alt="Wedding"
                    fill
                    sizes="100vw"
                    className="object-cover"
                    priority
                />

                {/* Dark overlay for text legibility */}
                <div className="absolute inset-0 bg-black/40" />

                {/* Centered Text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                    <p
                        className="text-white/60 tracking-[0.3em] text-[10px] sm:text-xs md:tracking-[0.4em] md:text-sm uppercase font-light"
                        style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                        eleven11 films presents
                    </p>
                    <h1
                        className="text-white text-center leading-none"
                        style={{
                            fontFamily: "coral-blush-serif",
                            fontSize: "clamp(2rem, 7vw, 8rem)",
                            fontWeight: 300,
                            letterSpacing: "0.15em",
                        }}
                    >
                        SOUL
                        <span className="mx-2 md:mx-4 text-white/50" style={{ fontWeight: 30 }}>+</span>
                        CINEMA
                    </h1>
                    <div className="w-24 h-px bg-white/40 mt-2" />
                </div>

                {/* Scroll hint */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50">
                    <span
                        className="text-xs tracking-widest uppercase"
                        style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                        scroll
                    </span>
                    <div className="w-px h-8 bg-white/30 animate-pulse" />
                </div>
            </section>
        </>
    );
}