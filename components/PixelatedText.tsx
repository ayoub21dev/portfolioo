import React, { useState, useRef, useEffect } from 'react';

interface PixelatedTextProps {
    text: string;
    className?: string;
}

const PixelatedChar: React.FC<{ char: string; index: number; className?: string }> = ({ char, index, className }) => {
    const [isHovered, setIsHovered] = useState(false);
    // Unique ID per character to ensure independent effects
    const filterId = `pixelate-filter-${index}-${char}-${Math.random().toString(36).substr(2, 9)}`;

    // Animation state
    const [scale, setScale] = useState(0);
    const requestRef = useRef<number>();
    const targetScale = isHovered ? 50 : 0;

    // Smooth animation loop
    useEffect(() => {
        const animate = () => {
            setScale(prev => {
                const diff = targetScale - prev;
                if (Math.abs(diff) < 0.5) return targetScale;
                return prev + diff * 0.1; // Ease factor
            });
            requestRef.current = requestAnimationFrame(animate);
        };

        requestRef.current = requestAnimationFrame(animate);
        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, [targetScale]);

    // Handle spaces gracefully
    if (char === ' ') {
        return <span className="inline-block whitespace-pre">&nbsp;</span>;
    }

    return (
        <span
            className="relative inline-block"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <svg className="absolute w-0 h-0 pointer-events-none">
                <defs>
                    <filter id={filterId}>
                        <feTurbulence
                            type="fractalNoise"
                            baseFrequency="0.8"
                            numOctaves="1"
                            result="noise"
                        />
                        <feDisplacementMap
                            in="SourceGraphic"
                            in2="noise"
                            scale={scale}
                            xChannelSelector="R"
                            yChannelSelector="G"
                        />
                    </filter>
                </defs>
            </svg>
            <span
                className={`${className} transition-opacity duration-300 inline-block`}
                style={{
                    filter: `url(#${filterId})`,
                    opacity: isHovered ? 0.8 : 1
                }}
            >
                {char}
            </span>
        </span>
    );
};

const PixelatedText: React.FC<PixelatedTextProps> = ({ text, className = '' }) => {
    return (
        <span className="inline-flex flex-wrap">
            {text.split('').map((char, index) => (
                <PixelatedChar
                    key={`${index}-${char}`}
                    char={char}
                    index={index}
                    className={className}
                />
            ))}
        </span>
    );
};

export default PixelatedText;
