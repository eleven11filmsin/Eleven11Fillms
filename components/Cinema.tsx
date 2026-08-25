export default function Cinema() {
    return (
        <>
            {/* Full Screen Video Section */}
            <section className="relative h-[60svh] sm:h-[75svh] md:h-screen w-full overflow-hidden">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    className="absolute inset-0 w-full h-full object-cover z-0"
                >
                    <source src="/videos/cinema.mp4" type="video/mp4" />
                </video>

                {/* Centered Text */}
                {/* <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3">
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
                </div> */}

                {/* Scroll hint */}
                {/* <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/50">
                    <span
                        className="text-xs tracking-widest italic"
                        style={{ fontFamily: "manrope" }}
                    >
                        Capturing what you have always wished for.
                    </span>
                    
                </div> */}
            </section>
        </>
    );
}