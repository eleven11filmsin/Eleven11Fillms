'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import Dock, { type DockItemData } from './Dock';

const socialLinks = [
    {
        href: 'https://www.instagram.com/eleven11films/',
        src: '/images/instagram-2.png',
        label: 'Instagram',
    },
    {
        href: 'https://www.facebook.com/profile.php?id=61567440545491',
        src: '/images/facebook-2.png',
        label: 'Facebook',
    },
    {
        href: 'https://www.youtube.com/@Eleven11_film',
        src: '/images/youtube-3.png',
        label: 'YouTube',
    },
];

function PlayIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white/90">
            <path d="M8 5v14l11-7z" />
        </svg>
    );
}

function PauseIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white/90">
            <rect x="6" y="5" width="4" height="14" />
            <rect x="14" y="5" width="4" height="14" />
        </svg>
    );
}

export default function MediaDock() {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        audio.volume = 0.6;
        audio.loop = true;

        const handlePlay = () => setIsPlaying(true);
        const handlePause = () => setIsPlaying(false);
        const handleEnded = () => setIsPlaying(false);

        audio.addEventListener('play', handlePlay);
        audio.addEventListener('pause', handlePause);
        audio.addEventListener('ended', handleEnded);

        // Attempt autoplay once when the Dock mounts. Browsers routinely
        // block this when audio isn't muted — that's expected, not an
        // error, so we swallow the rejection and stay in the paused state.
        audio.play().catch(() => {
            setIsPlaying(false);
        });

        return () => {
            audio.removeEventListener('play', handlePlay);
            audio.removeEventListener('pause', handlePause);
            audio.removeEventListener('ended', handleEnded);

            audio.pause();
            audio.currentTime = 0;
        };
    }, []);

    const toggleAudio = async () => {
        const audio = audioRef.current;
        if (!audio) return;

        try {
            if (audio.paused) {
                await audio.play();
            } else {
                audio.pause();
            }
        } catch {
            setIsPlaying(false);
        }
    };

    const items: DockItemData[] = [
        ...socialLinks.map((s) => ({
            icon: (
                <Image
                    src={s.src}
                    alt={s.label}
                    width={isMobile ? 22 : 30}
                    height={isMobile ? 22 : 30}
                    className={isMobile ? "w-[18px] h-[18px] object-contain" : "w-[25px] h-[25px] object-contain"}
                />
            ),
            label: s.label,
            onClick: () => {
                window.open(s.href, '_blank', 'noopener,noreferrer');
            },
        })),
        {
            icon: isPlaying ? <PauseIcon /> : <PlayIcon />,
            label: isPlaying ? 'Pause music' : 'Play music',
            onClick: toggleAudio,
        },
    ];

    return (
        <>
            {/* Single source of truth for playback — one <audio> element, reused on toggle */}
            <audio ref={audioRef} src="/audio/heromain.mp3" loop preload="auto" />
            <Dock
                items={items}
                panelHeight={isMobile ? 46 : 65}
                baseItemSize={isMobile ? 32 : 45}
                magnification={isMobile ? 46 : 65}
            />
        </>
    );
}