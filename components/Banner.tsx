import Image from "next/image";

export default function Banner() {
    return (
        <section className="bg-[#f0ebe3] flex flex-col py-10 px-5 overflow-hidden">

            {/* ── HEADING ── */}
            <div className="flex flex-col items-start leading-tight mb-8 md:items-center md:mb-6 md:relative md:top-34 md:right-18">
                <h2 className="text-[5.8vw] md:text-5xl font-coral-blush-serif text-gray-900 tracking-[0.15em] md:tracking-widest uppercase whitespace-nowrap">
                    A Modern Approach
                </h2>
                <h2 className="text-[5.8vw] md:text-5xl font-coral-blush-serif text-gray-900 tracking-[0.15em] md:tracking-widest uppercase flex items-center whitespace-nowrap -mt-1">
                    <span className="italic font-SnellRoundhandRegular font-light text-[5.8vw] md:text-5xl normal-case mr-2 tracking-normal">to an</span>
                    Age Old Tradition
                </h2>
            </div>

            {/* ── MOBILE LAYOUT ── */}
            <div className="flex flex-col md:hidden">

                {/* Two staggered images side by side */}
                <div className="flex items-start gap-3 mb-8">
                    {/* Left image — sits higher */}
                    <div className="relative w-[48%] h-[260px] shrink-0 self-start">
                        <Image
                            src="/images/galleryph1.png"
                            alt="Bride"
                            fill
                            className="object-cover grayscale"
                        />
                    </div>
                    {/* Right image — pushed down */}
                    <div className="relative w-[48%] h-[260px] shrink-0 self-start mt-12">
                        <Image
                            src="/images/galleryph2.png"
                            alt="Wedding"
                            fill
                            className="object-cover grayscale"
                        />
                    </div>
                </div>

                {/* Paragraphs */}
                <div className="flex flex-col gap-5 font-manrope">
                    <p className="text-gray-800 text-[15px] leading-relaxed font-normal tracking-wider">
                        Considered to be the epitome of Modern Photography and Filmmaking,
                        Eleven11 Films has transformed the Indian Wedding landscape on a regular basis.
                        For almost a decade we have been creating photographs and films
                        which are timeless and have been etched in memories of thousands of
                        people forever.
                    </p>
                    <p className="text-gray-800 text-[15px] leading-relaxed font-normal tracking-wider">
                        Awarded as the Wedding Filmmaker of the year for four consecutive years,
                        Eleven11 Films is committed to capturing your story with elegance, emotion,
                        and authenticity — every single frame.
                    </p>
                </div>

            </div>

            {/* ── DESKTOP LAYOUT (original three-column) ── */}
            <div className="hidden md:flex items-start justify-center gap-2 flex-1">

                {/* Left Image */}
                <div className="relative w-[26.5%] h-[490px] shrink-0 mt-31 self-start -translate-x-1 translate-y-2">
                    <Image
                        src="/images/galleryph1.png"
                        alt="Bride"
                        fill
                        className="object-cover grayscale"
                    />
                </div>

                {/* Center Text */}
                <div className="flex flex-col gap-5 w-[33%] -mt-31 font-manrope self-center -translate-x-3" style={{ marginLeft: "10px" }}>
                    <p className="text-gray-800 text-[12px] leading-relaxed font-normal tracking-wider">
                        Considered to be the epitome of Modern Photography and Filmmaking,
                        Eleven11 Films has transformed the Indian Wedding landscape on a regular basis.
                        For almost a decade we have been creating photographs and films
                        which are timeless and have been etched in memories of thousands of
                        people forever.
                    </p>
                    <p className="text-gray-800 text-[12px] leading-relaxed font-normal tracking-wider">
                        Awarded as the Wedding Filmmaker of the year for four consecutive years,
                        Eleven11 Films is committed to capturing your story with elegance, emotion,
                        and authenticity — every single frame.
                    </p>
                </div>

                {/* Right Image */}
                <div className="relative w-[30%] h-[550px] shrink-0 -mt-28 right-5 self-start translate-x-6">
                    <Image
                        src="/images/galleryph2.png"
                        alt="Wedding"
                        fill
                        className="object-cover grayscale"
                    />
                </div>

            </div>

        </section>
    );
}