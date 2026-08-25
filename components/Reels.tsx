const reels = [
    {
        youtubeId: "6_kqN4PS9yw",
        name: "Ankit & Pranali",
        date: "Oct 7, 2024",
    },
    {
        youtubeId: "LZy0D3-II0Y",
        name: "Pratiksha",
        date: "Aug 25, 2024",
    },
    {
        youtubeId: "Rqjc1Mj0b5E",
        name: "Pratiksha",
        date: "Aug 8, 2024",
    },
    {
        youtubeId: "REEL_VIDEO_ID_4",
        name: "Zina & Zain",
        date: "Apr 24, 2024",
    },
];

export default function Reels() {
    return (
        <section className="min-h-screen bg-black py-16 md:py-24 px-6 sm:px-10 md:px-16">



            {/* Single responsive grid — one CoupleCard-equivalent per reel, no separate mobile/desktop trees */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-x-1 gap-y-10 max-w-[1390px] mx-auto">
                {reels.map((reel) => (
                    <div key={reel.youtubeId} className="flex flex-col gap-3 group">

                        <div className="relative w-full aspect-[5/4] overflow-hidden bg-black transition-opacity duration-300 group-hover:opacity-90">
                            <iframe
                                src={`https://www.youtube.com/embed/${reel.youtubeId}?playsinline=1&rel=0`}
                                title={reel.name}
                                className="absolute inset-0 w-full h-full border-0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            />
                        </div>

                        <div className="flex flex-col gap-0.5 px-1">
                            <p className="font-playfair font-bold text-base text-gray-900 tracking-wide">
                                {reel.name}
                            </p>
                            <p className="font-manrope text-xs text-gray-500 tracking-wide">
                                {reel.date}
                            </p>
                        </div>

                    </div>
                ))}
            </div>

        </section>
    );
}