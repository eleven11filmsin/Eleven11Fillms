'use client';

import React, { useEffect, useRef, useState } from 'react';
import ClickSpark, { ClickSparkHandle } from '@/components/ClickSpark';

interface ClickSparkProviderProps {
    children: React.ReactNode;
}

const ClickSparkProvider: React.FC<ClickSparkProviderProps> = ({ children }) => {
    const sparkRef = useRef<ClickSparkHandle>(null);
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
        const handlePointerDown = (e: PointerEvent) => {
            // Ignore right-click / secondary mouse buttons; covers mouse, touch, and pen.
            if (e.pointerType === 'mouse' && e.button !== 0) return;
            sparkRef.current?.trigger(e.clientX, e.clientY);
        };

        document.addEventListener('pointerdown', handlePointerDown, { passive: true });
        return () => {
            document.removeEventListener('pointerdown', handlePointerDown);
        };
    }, []);

    return (
        <>
            {children}
            <ClickSpark
                ref={sparkRef}
                sparkColor="#ffffff"
                sparkSize={isMobile ? 15 : 15}
                sparkRadius={isMobile ? 30 : 30}
                sparkCount={isMobile ? 8 : 12}
                duration={isMobile ? 400 : 500}
                easing="ease-out"
                extraScale={isMobile ? 1.0 : 1.5}
            />
        </>
    );
};

export default ClickSparkProvider;