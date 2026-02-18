import React, { useEffect, useState } from 'react';
import EvoraLogo from '../assets/Evoralogo.png';

const layers = [
    { label: 'OPTIMIZED', color: '#cbd7e2', cx: 200, cy: 200, r: 180, labelX: 280, labelY: 105, delay: 0 },
    { label: 'STRATEGIC', color: '#92c66d', cx: 200, cy: 225, r: 145, labelX: 300, labelY: 175, delay: 150 },
    { label: 'INTEGRATED', color: '#f4cc54', cx: 200, cy: 250, r: 115, labelX: 320, labelY: 255, delay: 300 },
    { label: 'DEFINED', color: '#f2a900', cx: 200, cy: 280, r: 85, labelX: 310, labelY: 325, delay: 450 },
    { label: 'HEROES', color: '#e23a1a', cx: 200, cy: 310, r: 55, labelX: 0, labelY: 0, delay: 600 },
];

export const OnionPeel: React.FC = () => {
    const [visible, setVisible] = useState<boolean[]>(layers.map(() => false));
    const [hovered, setHovered] = useState<number | null>(null);

    useEffect(() => {
        layers.forEach((_, i) => {
            setTimeout(() => {
                setVisible((prev) => {
                    const next = [...prev];
                    next[i] = true;
                    return next;
                });
            }, layers[i].delay);
        });
    }, []);

    return (
        <div className="flex items-center justify-center w-full h-[420px] select-none">
            <svg
                viewBox="0 0 440 400"
                xmlns="http://www.w3.org/2000/svg"
                fontFamily="Arial, sans-serif"
                fontWeight="bold"
                className="w-full h-full max-w-[440px]"
            >
                {/* Concentric circles */}
                {layers.map((layer, i) => (
                    <circle
                        key={layer.label}
                        cx={layer.cx}
                        cy={layer.cy}
                        r={layer.r}
                        fill={layer.color}
                        className="cursor-pointer"
                        style={{
                            transform: `scale(${visible[i] ? (hovered === i ? 1.03 : 1) : 0})`,
                            transformOrigin: `${layer.cx}px ${layer.cy}px`,
                            opacity: visible[i] ? 1 : 0,
                            transition: 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.5s ease',
                            filter: hovered === i ? `drop-shadow(0 0 12px ${layer.color}aa)` : 'none',
                        }}
                        onMouseEnter={() => setHovered(i)}
                        onMouseLeave={() => setHovered(null)}
                    />
                ))}

                {/* Right-side labels */}
                {layers.slice(0, 4).map((layer, i) => (
                    <text
                        key={`label-${layer.label}`}
                        x={layer.labelX}
                        y={layer.labelY}
                        fontSize="18"
                        fill={hovered === i ? layer.color : '#1a1a1a'}
                        fontWeight="bold"
                        style={{
                            opacity: visible[i] ? 1 : 0,
                            transform: `translateX(${visible[i] ? 0 : -15}px)`,
                            transition: 'opacity 0.5s ease, transform 0.5s ease, fill 0.3s ease',
                            transitionDelay: `${layer.delay + 200}ms`,
                        }}
                    >
                        {layer.label}
                    </text>
                ))}

                {/* HEROES label inside the red circle */}
                <text
                    x={200}
                    y={318}
                    fontSize="16"
                    fill="white"
                    fontWeight="bold"
                    textAnchor="middle"
                    style={{
                        opacity: visible[4] ? 1 : 0,
                        transition: 'opacity 0.5s ease',
                        transitionDelay: '800ms',
                    }}
                >
                    HEROES
                </text>

                {/* HARTS branding - EVORA Logo */}
                <image
                    href={EvoraLogo}
                    x="145"
                    y="70"
                    width="110"
                    height="85"
                    style={{
                        opacity: visible[0] ? 1 : 0,
                        transition: 'opacity 0.6s ease',
                        transitionDelay: '300ms',
                    }}
                />

                {/* Subtle pulse animation on outermost ring */}
                <circle
                    cx={200}
                    cy={200}
                    r={180}
                    fill="none"
                    stroke={`${layers[0].color}66`}
                    strokeWidth="2"
                    style={{
                        opacity: visible[0] ? 1 : 0,
                        transition: 'opacity 0.6s ease',
                    }}
                >
                    {visible[0] && (
                        <animate
                            attributeName="r"
                            values="180;188;180"
                            dur="3s"
                            repeatCount="indefinite"
                        />
                    )}
                    {visible[0] && (
                        <animate
                            attributeName="opacity"
                            values="0.5;0;0.5"
                            dur="3s"
                            repeatCount="indefinite"
                        />
                    )}
                </circle>
            </svg>
        </div>
    );
};
