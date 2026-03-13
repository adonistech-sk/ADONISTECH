// Forcing Vite HMR Reload
import React, { useState } from 'react';
import { HoverFooter } from '../components/HoverFooterDemo';
import { projects } from '../components/ProjectsCarousel';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { LiquidButton } from '../components/ui/liquid-glass-button';

export function ProjectsPage() {
    const [showAll, setShowAll] = useState(false);
    const revealRef = useScrollReveal({}, [showAll]);

    const extraProjects = [
        {
            id: 5,
            title: "Joi Planner",
            category: "Productivity",
            description: "Digital life coordination system",
            image: "https://ridbtuorcmkjidenxudx.supabase.co/storage/v1/object/public/Public%20main/project-joi-planner.webp",
            url: "https://joi.software/",
        },
        {
            id: 6,
            title: "Cylinder",
            category: "SaaS",
            description: "Sleek data management interface",
            image: "https://ridbtuorcmkjidenxudx.supabase.co/storage/v1/object/public/Public%20main/project-cylinder.webp",
            url: "https://cylinderhealth.com/",
        },
        {
            id: 7,
            title: "Codex",
            category: "Technology",
            description: "Next-gen code editor platform",
            image: "https://ridbtuorcmkjidenxudx.supabase.co/storage/v1/object/public/Public%20main/project-codex.webp",
            url: "https://www.codex.io/",
        },
        {
            id: 8,
            title: "Amprit Palace",
            category: "Food",
            description: "Luxury Indian Restaurant",
            image: "https://ridbtuorcmkjidenxudx.supabase.co/storage/v1/object/public/Public%20main/project-amprit-palace.webp",
            url: "https://amritpalace.com/",
        },
        {
            id: 9,
            title: "Samuel Nduka",
            category: "Portfolio",
            description: "Creative developer showcase",
            image: "https://ridbtuorcmkjidenxudx.supabase.co/storage/v1/object/public/Public%20main/Gemini_Generated_Image_mbbumxmbbumxmbbu.webp",
            url: "https://samuelnduka.com/",
        }
    ];

    const displayedProjects = showAll ? [...projects, ...extraProjects] : projects;

    return (
        <div ref={revealRef} className="w-full min-h-screen pt-32 pb-0 flex flex-col relative z-20">
            <section className="flex-1 px-4 md:px-8 w-full max-w-7xl mx-auto flex flex-col items-center">
                {/* Header */}
                <div data-reveal className="w-full bg-white/30 backdrop-blur-xl rounded-[48px] p-8 md:p-16 text-neutral-900 flex flex-col items-center shadow-[0_8px_32px_rgba(0,0,0,0.05)] border border-white/40 mb-12 relative overflow-hidden">
                    <div data-reveal data-reveal-delay="100" className="border border-black/10 bg-white/40 backdrop-blur-md px-6 py-2 rounded-full text-sm font-semibold tracking-wide text-neutral-800 mb-8 relative z-10 shadow-sm">
                        Portfolio
                    </div>
                    <h2 data-reveal data-reveal-delay="200" className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-center text-neutral-900 relative z-10">
                        Featured Projects
                    </h2>
                    <p data-reveal data-reveal-delay="300" className="text-neutral-600 text-lg md:text-xl max-w-2xl text-center leading-relaxed relative z-10 font-medium tracking-tight">
                        A curated selection of the impactful digital experiences and powerful brand narratives we've built.
                    </p>
                </div>

                {/* Grid */}
                <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 w-full ${showAll ? 'mb-20' : 'mb-12'}`}>
                    {displayedProjects.map((project: any, index: number) => (
                        <a
                            key={project.id}
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-reveal
                            data-reveal-delay={String(index * 80)}
                            className="group bg-white/40 backdrop-blur-xl rounded-[32px] border border-white/50 overflow-hidden flex flex-col no-underline shadow-xl
                                       transition-all duration-300 ease-out
                                       hover:-translate-y-4 hover:scale-[1.015]
                                       hover:shadow-[0_24px_60px_-12px_rgba(60,162,250,0.22),0_8px_24px_rgba(0,0,0,0.08)]
                                       hover:border-[#3ca2fa]/30"
                        >
                            {/* Image wrapper */}
                            <div className="relative w-full h-[320px] md:h-[400px] overflow-hidden shrink-0 border-b border-white/20 bg-white/10">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover object-top drop-shadow-2xl opacity-100
                                               transition-transform duration-500 ease-out
                                               group-hover:scale-[1.06]"
                                    draggable={false}
                                />
                                {/* Blue tint overlay on hover */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#3ca2fa]/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                {/* Shimmer sweep */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                                {/* Category pill — floats up on hover */}
                                <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/60 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                                    <span className="text-[#3ca2fa] text-xs font-bold tracking-widest uppercase">{project.category}</span>
                                </div>
                            </div>

                            {/* Text content */}
                            <div className="p-8 flex flex-col gap-4">
                                <div className="flex justify-between items-baseline">
                                    <h3 className="text-neutral-900 font-bold text-3xl md:text-4xl tracking-tight transition-colors duration-200 group-hover:text-[#3ca2fa]">{project.title}</h3>
                                    <span className="text-[#3ca2fa]/50 text-xs md:text-sm font-semibold tracking-widest uppercase ml-4 whitespace-nowrap group-hover:text-[#3ca2fa] transition-colors duration-200">{project.category}</span>
                                </div>
                                <p className="text-neutral-600 text-base md:text-lg leading-relaxed max-w-md">
                                    {project.description}
                                </p>
                            </div>
                        </a>
                    ))}
                </div>

                {!showAll && (
                    <div data-reveal className="w-full flex justify-center mb-20 relative z-10">
                        <LiquidButton onClick={() => setShowAll(true)}>
                            Load More
                        </LiquidButton>
                    </div>
                )}
            </section>

            <div data-reveal="fade-in">
                <HoverFooter />
            </div>
        </div>
    );
}
