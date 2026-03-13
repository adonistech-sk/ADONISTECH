"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion, useInView } from "motion/react";
import { cn } from "../../lib/utils";

export const TextHoverEffect = ({
    text,
    duration,
    className,
}: {
    text: string;
    duration?: number;
    automatic?: boolean;
    className?: string;
}) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [cursor, setCursor] = useState({ x: 0, y: 0 });
    const [hovered, setHovered] = useState(false);
    const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });
    const isInView = useInView(containerRef, { once: true, margin: "0px 0px -80px 0px" });

    useEffect(() => {
        if (svgRef.current && cursor.x !== null && cursor.y !== null) {
            const svgRect = svgRef.current.getBoundingClientRect();
            const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100;
            const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100;
            setMaskPosition({
                cx: `${cxPercentage}%`,
                cy: `${cyPercentage}%`,
            });
        }
    }, [cursor]);

    return (
        <div ref={containerRef} className="w-full h-full">
            <motion.svg
                ref={svgRef}
                width="100%"
                height="100%"
                viewBox="0 0 300 100"
                xmlns="http://www.w3.org/2000/svg"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
                className={cn("select-none uppercase cursor-pointer", className)}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.94 }}
                transition={{ duration: 1.0, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
                <defs>
                    <linearGradient
                        id="textGradient"
                        gradientUnits="userSpaceOnUse"
                        cx="50%"
                        cy="50%"
                        r="25%"
                    >
                        {hovered && (
                            <>
                                <stop offset="0%"   stopColor="#3ca2fa" />
                                <stop offset="25%"  stopColor="#a855f7" />
                                <stop offset="50%"  stopColor="#ec4899" />
                                <stop offset="75%"  stopColor="#06b6d4" />
                                <stop offset="100%" stopColor="#3ca2fa" />
                            </>
                        )}
                    </linearGradient>

                    {/* Glow filter */}
                    <filter id="glow" x="-20%" y="-50%" width="140%" height="200%">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>

                    <motion.radialGradient
                        id="revealMask"
                        gradientUnits="userSpaceOnUse"
                        r="25%"
                        initial={{ cx: "50%", cy: "50%" }}
                        animate={maskPosition}
                        transition={{ duration: duration ?? 0.05, ease: "easeOut" }}
                    >
                        <stop offset="0%"   stopColor="white" />
                        <stop offset="100%" stopColor="black" />
                    </motion.radialGradient>
                    <mask id="textMask">
                        <rect x="0" y="0" width="100%" height="100%" fill="url(#revealMask)" />
                    </mask>
                </defs>

                {/* Idle ghost outline — always visible, subtle */}
                <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    strokeWidth="0.4"
                    className="fill-transparent stroke-black/10 font-[helvetica] text-7xl font-bold"
                    style={{ opacity: 1 }}
                >
                    {text}
                </text>

                {/* Stroke draw-on animation — triggered by scroll into view */}
                <motion.text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    strokeWidth="0.5"
                    className="fill-transparent font-[helvetica] text-7xl font-bold"
                    style={{
                        stroke: hovered ? "url(#textGradient)" : "#3ca2fa",
                        filter: "url(#glow)",
                    }}
                    initial={{ strokeDashoffset: 1200, strokeDasharray: 1200, opacity: 0 }}
                    animate={isInView
                        ? { strokeDashoffset: 0, strokeDasharray: 1200, opacity: 1 }
                        : { strokeDashoffset: 1200, strokeDasharray: 1200, opacity: 0 }
                    }
                    transition={{
                        strokeDashoffset: { duration: 3.2, ease: "easeInOut", delay: 0.3 },
                        opacity:          { duration: 0.4, delay: 0.3 },
                    }}
                >
                    {text}
                </motion.text>

                {/* Hover rainbow reveal layer */}
                <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    stroke="url(#textGradient)"
                    strokeWidth="0.5"
                    mask="url(#textMask)"
                    className="fill-transparent font-[helvetica] text-7xl font-bold"
                    style={{ filter: "url(#glow)" }}
                >
                    {text}
                </text>

                {/* Hovered ghost fill for depth */}
                <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    strokeWidth="0.4"
                    className="fill-transparent stroke-black/25 font-[helvetica] text-7xl font-bold"
                    style={{
                        opacity: hovered ? 0.6 : 0,
                        transition: "opacity 0.3s ease"
                    }}
                >
                    {text}
                </text>
            </motion.svg>
        </div>
    );
};

export const FooterBackgroundGradient = () => {
    return (
        <div
            className="absolute inset-0 z-0"
            style={{
                background:
                    "radial-gradient(125% 125% at 50% 10%, rgba(255,255,255,0.4) 50%, rgba(160,200,255,0.15) 100%)",
            }}
        />
    );
};
