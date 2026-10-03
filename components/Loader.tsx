"use client";

import { useEffect, useRef, useState } from "react";

interface LoaderProps {
    onComplete?: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
    const [isFinished, setIsFinished] = useState(false);
    const [shouldRender, setShouldRender] = useState(true);
    const [isDesktop, setIsDesktop] = useState<boolean | null>(null);

    const desktopVideoRef = useRef<HTMLVideoElement>(null);
    const mobileVideoRef = useRef<HTMLVideoElement>(null);

    const handleFinish = () => {
        setIsFinished((prev) => {
            if (prev) return prev;
            onComplete?.();
            setTimeout(() => {
                setShouldRender(false);
            }, 1500);
            return true;
        });
    };

    useEffect(() => {
        const mql = window.matchMedia("(min-width: 768px)");
        setIsDesktop(mql.matches);

        const handler = (e: MediaQueryListEvent) => {
            setIsDesktop(e.matches);
        };

        mql.addEventListener("change", handler);
        return () => mql.removeEventListener("change", handler);
    }, []);

    useEffect(() => {
        const video = isDesktop ? desktopVideoRef.current : mobileVideoRef.current;
        if (video) {
            video.play().catch(() => { });
        }
    }, [isDesktop]);

    useEffect(() => {
        // Allow up to ~5.5s of opener video background loading time,
        // preserving the 4-6s loader experience and ensuring smooth transition.
        const timer = setTimeout(() => {
            handleFinish();
        }, 5500);

        return () => clearTimeout(timer);
    }, []);

    if (!shouldRender) return null;

    return (
        <div
            onClick={handleFinish}
            className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black overflow-hidden transition-opacity duration-[2000ms] ease-in-out cursor-pointer ${isFinished ? "opacity-0 pointer-events-none" : "opacity-100"
                }`}
            aria-hidden={isFinished}
        >
            {/* Mobile Loader Video */}
            <video
                ref={mobileVideoRef}
                autoPlay
                muted
                playsInline
                preload={isDesktop === false ? "auto" : "none"}
                onEnded={handleFinish}
                className="md:hidden block w-full h-full object-cover"
            >
                {isDesktop === false && (
                    <source src="/videos/loadermobile.mp4" type="video/mp4" />
                )}
            </video>

            {/* Desktop Loader Video */}
            <video
                ref={desktopVideoRef}
                autoPlay
                muted
                playsInline
                preload={isDesktop === true ? "auto" : "none"}
                onEnded={handleFinish}
                className="hidden md:block w-full h-full object-cover"
            >
                {isDesktop === true && (
                    <source src="/videos/loader.mp4" type="video/mp4" />
                )}
            </video>
        </div>
    );
}
