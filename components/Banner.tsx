import Image from "next/image";

export default function Banner() {
    return (
        <section className="bg-[#f0ebe3] flex flex-col py-10 px-5 overflow-hidden">
            {/** ── MOBILE HEADING ── */}
            <div className="md:hidden w-full flex flex-col items-center justify-center gap-3 -translate-y-2 mb-8 overflow-visible">

                {/* First line */}
                <h2 className="font-coral-blush-serif  text-gray-900 uppercase text-[4.8vw] leading-none tracking-[0.05em] whitespace-nowrap">
                    Your Story, Your Way
                </h2>

                {/* Second line */}
                <div className="flex items-center justify-center w-full -mt-0.5 whitespace-nowrap">

                    <span className="font-SnellRoundhandRegular italic font-normal text-gray-900 normal-case text-[4.2vw] leading-none tracking-normal translate-y-0.5 -translate-x-2">
                        nothing about it should
                    </span>

                    <span className="font-coral-blush-serif text-gray-900 uppercase text-[4.8vw] leading-none tracking-[0.05em] ml-1">
                        Feel Ordinary
                    </span>

                </div>

            </div>

            {/* ── DESKTOP HEADING ── */}
            <div className="hidden md:flex relative z-20 gap-3 flex-col items-center justify-center leading-tight mb-8 w-full overflow-visible md:items-center md:mb-6 md:relative md:top-34 md:right-18 -translate-y-2">
                {/* First line  */}
                <h2 className="font-coral-blush-serif text-gray-900 uppercase tracking-[0.05em] text-[9.2vw] leading-[1.05] whitespace-nowrap md:text-4xl md:tracking-widest">
                    Your Story, Your Way
                </h2>

                {/* Second line — stays on one line on mobile */}
                <h2 className="font-coral-blush-serif text-gray-900 uppercase gap-1 tracking-[0.05em] text-[14vw] leading-[1.25] flex flex-nowrap items-center -mt-1 whitespace-nowrap md:text-4xl md:tracking-widest">
                    <span className="italic font-SnellRoundhandRegular font-normal text-[10vw] normal-case mr-2 -translate-x-5 mt-1 tracking-normal md:text-4xl md:mr-0 md:mt-2">
                        nothing about it should
                    </span>
                    Feel Ordinary
                </h2>
            </div>
            {/* ── MOBILE LAYOUT ── */}
            <div className="flex flex-col md:hidden">

                {/* Two staggered images side by side */}
                <div className="flex items-start gap-3 mb-8">
                    {/* Left image — sits higher */}
                    <div className="relative w-[48%] h-[260px] shrink-0 self-start">
                        <Image
                            src="/images/grid/DSC02335.jpg"
                            alt="Bride"
                            fill
                            className="object-cover grayscale"
                        />
                    </div>
                    {/* Right image — pushed down */}
                    <div className="relative w-[48%] h-[260px] shrink-0 self-start mt-12">
                        <Image
                            src="/images/grid/DSC09592.jpg"
                            alt="Wedding"
                            fill
                            className="object-cover grayscale"
                        />
                    </div>
                </div>

                {/* Paragraphs */}
                <div className="flex flex-col gap-5 font-manrope">
                    <p className="text-gray-800 text-[15px] leading-relaxed font-normal tracking-wider">
                        We’re a studio built around one simple belief. Your wedding should feel like you.
                    </p>
                    <p className="text-gray-800 text-[15px] leading-relaxed font-normal tracking-wider">
                        Your people, your traditions, your energy, and all the little moments that make the day yours. We create films that feel honest and personal, so when you watch them years from now, you don’t just remember what happened. You remember how it felt. We care deeply about every story we get to tell. Every wedding is an opportunity to create something genuine, thoughtful, and completely yours.
                    </p>
                </div>

            </div>

            {/* ── DESKTOP LAYOUT (original three-column) ── */}
            <div className="hidden md:flex items-start justify-center gap-2 flex-1">

                {/* Left Image */}
                <div className="relative w-[26.5%] h-[490px] shrink-0 mt-31 self-start -translate-x-1 translate-y-2">
                    <Image
                        src="/images/grid/DSC02335.jpg"
                        alt="Bride"
                        fill
                        className="object-cover grayscale"
                    />
                </div>

                {/* Center Text */}
                <div className="flex flex-col gap-3 w-[33%] -mt-31 font-manrope self-center -translate-x-3" style={{ marginLeft: "10px" }}>
                    <p className="text-gray-800 text-[12px] leading-relaxed font-normal tracking-wider">
                        We’re a studio built around one simple belief. Your wedding should feel like you.
                    </p>
                    <p className="text-gray-800 text-[12px] leading-relaxed font-normal tracking-wider">
                        Your people, your traditions, your energy, and all the little moments that make the day yours. We create films that feel honest and personal, so when you watch them years from now, you don’t just remember what happened. You remember how it felt. We care deeply about every story we get to tell. Every wedding is an opportunity to create something genuine, thoughtful, and completely yours.
                    </p>
                </div>

                {/* Right Image */}
                <div className="relative w-[30%] h-[550px] shrink-0 -mt-28 right-5 self-start translate-x-6">
                    <Image
                        src="/images/grid/DSC09592.jpg"
                        alt="Wedding"
                        fill
                        className="object-cover grayscale"
                    />
                </div>

            </div>

        </section>
    );
}