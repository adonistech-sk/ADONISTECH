import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../lib/utils";

export const projects = [
    {
        id: 1,
        title: "Super Chill",
        category: "Education",
        description: "Mindfullness educational platform",
        image: "https://ridbtuorcmkjidenxudx.supabase.co/storage/v1/object/public/Public%20main/project-super-chill.webp",
        url: "http://superchill.org/",
    },
    {
        id: 2,
        title: "Matcha Ren",
        category: "Food",
        description: "E-commerce for premium matcha products",
        image: "https://ridbtuorcmkjidenxudx.supabase.co/storage/v1/object/public/Public%20main/project-matcha-ren.webp",
        url: "https://www.matcharen.com/",
    },
    {
        id: 3,
        title: "Volta Yachts",
        category: "Marketplace",
        description: "Premium yacht marketplace",
        image: "https://ridbtuorcmkjidenxudx.supabase.co/storage/v1/object/public/Public%20main/project-volta-yachts.webp",
        url: "https://www.voltayachts.com/",
    },
    {
        id: 4,
        title: "Vimcosmo",
        category: "Beauty",
        description: "Luxury cosmetics brand",
        image: "https://ridbtuorcmkjidenxudx.supabase.co/storage/v1/object/public/Public%20main/project-vimcosmo.webp",
        url: "https://vimcosmo.com/",
    }
];

export function ProjectsCarousel() {
    const carouselRef = useRef<HTMLDivElement>(null);
    const cursorRef = useRef<HTMLDivElement>(null);

    // All drag state kept in refs — zero re-renders during drag
    const isDragging      = useRef(false);
    const dragStartX      = useRef(0);
    const dragStartScroll = useRef(0);
    const lastX           = useRef(0);
    const velocity        = useRef(0);
    const momentumRaf     = useRef<number | null>(null);
    const autoRaf         = useRef<number | null>(null);
    const autoPlayTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const [isHovering, setIsHovering]   = useState(false);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [isMouseDown, setIsMouseDown] = useState(false); // cursor style only

    /* ── helpers ─────────────────────────────────────────────── */
    const stopMomentum = () => {
        if (momentumRaf.current) cancelAnimationFrame(momentumRaf.current);
        momentumRaf.current = null;
    };

    const resetAutoPlayTimer = () => {
        setIsAutoPlaying(false);
        if (autoPlayTimeoutRef.current) clearTimeout(autoPlayTimeoutRef.current);
        autoPlayTimeoutRef.current = setTimeout(() => setIsAutoPlaying(true), 2500);
    };

    /* ── drag handlers ────────────────────────────────────────── */
    const handleMouseDown = (e: React.MouseEvent) => {
        if (!carouselRef.current) return;
        stopMomentum();
        isDragging.current      = true;
        dragStartX.current      = e.pageX;
        dragStartScroll.current = carouselRef.current.scrollLeft;
        lastX.current           = e.pageX;
        velocity.current        = 0;
        setIsMouseDown(true);
        setIsAutoPlaying(false);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging.current || !carouselRef.current) return;
        e.preventDefault();
        velocity.current = e.pageX - lastX.current;       // px moved this frame
        lastX.current    = e.pageX;
        carouselRef.current.scrollLeft =
            dragStartScroll.current - (e.pageX - dragStartX.current);
    };

    const handleMouseUp = () => {
        if (!isDragging.current) return;
        isDragging.current = false;
        setIsMouseDown(false);

        // Launch momentum with current velocity
        const startVelocity = -velocity.current * 1.4; // amplify a bit
        let vel = startVelocity;

        const coast = () => {
            if (!carouselRef.current || Math.abs(vel) < 0.3) {
                resetAutoPlayTimer();
                return;
            }
            carouselRef.current.scrollLeft += vel;
            vel *= 0.92;                                   // friction / deceleration
            momentumRaf.current = requestAnimationFrame(coast);
        };
        momentumRaf.current = requestAnimationFrame(coast);
    };

    const handleMouseLeave = () => {
        if (isDragging.current) handleMouseUp();
        setIsHovering(false);
        if (autoPlayTimeoutRef.current) clearTimeout(autoPlayTimeoutRef.current);
        setIsAutoPlaying(true);
    };

    /* ── auto-scroll loop ─────────────────────────────────────── */
    useEffect(() => {
        const autoScroll = () => {
            if (carouselRef.current && isAutoPlaying && !isHovering && !isDragging.current) {
                const c = carouselRef.current;
                if (c.scrollLeft >= c.scrollWidth / 2) c.scrollLeft -= c.scrollWidth / 2;
                c.scrollLeft += 0.8;                       // slightly faster than before
            }
            autoRaf.current = requestAnimationFrame(autoScroll);
        };
        autoRaf.current = requestAnimationFrame(autoScroll);
        return () => {
            if (autoRaf.current) cancelAnimationFrame(autoRaf.current);
            if (autoPlayTimeoutRef.current) clearTimeout(autoPlayTimeoutRef.current);
        };
    }, [isAutoPlaying, isHovering]);

    return (
        <div className="w-full py-24 bg-transparent font-sans overflow-hidden">
            <div className="max-w-[1400px] mx-auto px-4 md:px-8">

                {/* Carousel Container */}
                <div
                    ref={carouselRef}
                    className={cn(
                        "flex gap-6 overflow-x-auto pb-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)] select-none",
                        isMouseDown ? "cursor-grabbing" : "cursor-grab"
                    )}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={handleMouseLeave}
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                    onTouchStart={() => {
                        setIsHovering(true);
                        setIsAutoPlaying(false);
                    }}
                    onTouchEnd={() => {
                        setIsHovering(false);
                        resetAutoPlayTimer();
                    }}
                >
                    {/* Double the projects to create a seamless loop */}
                    {[...projects, ...projects].map((project, index) => (
                        <a
                            key={`${project.id}-${index}`}
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex-none w-[75vw] md:w-[480px] bg-white/40 backdrop-blur-xl rounded-[32px] border border-white/50 overflow-hidden flex flex-col no-underline shadow-xl
                                       transition-all duration-300 ease-out
                                       hover:scale-[1.03] hover:-translate-y-3
                                       hover:shadow-[0_24px_60px_-12px_rgba(60,162,250,0.22),0_8px_24px_rgba(0,0,0,0.08)]
                                       hover:border-[#3ca2fa]/30"
                        >
                            {/* Image Section */}
                            <div className="relative w-full h-[240px] md:h-[320px] overflow-hidden shrink-0 border-b border-white/20 bg-white/10">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-auto drop-shadow-2xl opacity-100
                                               transition-transform duration-500 ease-out
                                               group-hover:scale-[1.06]"
                                    draggable={false}
                                />
                                {/* Blue tint overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#3ca2fa]/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                {/* Shimmer sweep */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                                {/* Floating category pill */}
                                <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/60 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                                    <span className="text-[#3ca2fa] text-xs font-bold tracking-widest uppercase">{project.category}</span>
                                </div>
                            </div>

                            {/* Text Section */}
                            <div className="p-8 flex flex-col gap-4">
                                <div className="flex justify-between items-baseline">
                                    <h3 className="text-neutral-900 font-bold text-3xl md:text-5xl tracking-tight transition-colors duration-200 group-hover:text-[#3ca2fa]">{project.title}</h3>
                                    <span className="text-[#3ca2fa]/50 text-xs md:text-sm font-semibold tracking-widest uppercase ml-4 whitespace-nowrap group-hover:text-[#3ca2fa] transition-colors duration-200">{project.category}</span>
                                </div>
                                <p className="text-neutral-600 text-base md:text-xl leading-relaxed max-w-md">
                                    {project.description}
                                </p>
                            </div>
                        </a>
                    ))}
                </div>



            </div>
        </div>
    );
}
