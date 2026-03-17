import React from 'react';
import { useNavigate } from 'react-router-dom';
import SplineBackground from '../spline skill/react-spline-wrapper';
import { HeroScrollDemo } from '../components/HeroScrollDemo';
import { LogoCarousel } from '../components/ui/logo-carousel';
import { StackingCardDemo } from '../components/StackingCardDemo';
import { TextGradientScrollExample } from '../components/TextGradientScrollExample';
import { ProjectsCarousel } from '../components/ProjectsCarousel';
import { TestimonialsDemo } from '../components/TestimonialsDemo';
import FAQs from '../components/ui/text-reveal-faqs';
import { HoverFooter } from '../components/HoverFooterDemo';
import { LiquidButton } from '../components/ui/liquid-glass-button';
import ShaderHero from '../components/ui/hero';
import { useScrollReveal } from '../hooks/useScrollReveal';

export function Home({ setHeroLoaded }: { setHeroLoaded: (loaded: boolean) => void }) {
    const navigate = useNavigate();
    const revealRef = useScrollReveal();
    const heroRef = React.useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = React.useState(
        typeof window !== 'undefined' ? window.innerWidth < 768 : false
    );
    const [heroLoaded, setHeroLoadedLocal] = React.useState(false);

    React.useEffect(() => {
        const handler = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handler);
        return () => window.removeEventListener('resize', handler);
    }, []);

    // On mobile, show navbar only after user scrolls fully past the hero section
    React.useEffect(() => {
        if (!isMobile || !heroRef.current) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) {
                    setHeroLoaded(true);
                }
            },
            { threshold: 0 }
        );
        observer.observe(heroRef.current);
        return () => observer.disconnect();
    }, [isMobile]);

    return (
        <>
            <div ref={heroRef} className="w-full h-screen relative z-10">
                {isMobile ? (
                    /* Mobile Shader Hero — card ends right after CTA, carousel below */
                    <div className="w-full h-full flex flex-col">
                        {/* Card: rounded, fixed svh height so it looks same on all phones */}
                        <div className="px-3 pt-3">
                            <div className="rounded-[28px] overflow-hidden" style={{ height: '78svh' }}>
                                <ShaderHero />
                            </div>
                        </div>
                        {/* Carousel: sits below the card, outside rounded container */}
                        <div className="flex-1 flex flex-col justify-center px-3 pb-4">
                            <p className="text-sm font-bold uppercase tracking-widest text-black/40 mb-4 text-center">
                                Trusted In Every Industry
                            </p>
                            <div className="overflow-hidden relative">
                                <div className="absolute inset-y-0 left-0 w-16 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent" />
                                <div className="absolute inset-y-0 right-0 w-16 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent" />
                                <div className="flex w-max marquee-content items-center">
                                    {[
                                        "🛒 E-Commerce", "🏡 Real Estate", "🏥 Healthcare", "🍽️ Restaurants",
                                        "🎓 Education", "💼 Finance", "💻 Technology", "💪 Fitness", "⚖️ Professional Services",
                                        "🛒 E-Commerce", "🏡 Real Estate", "🏥 Healthcare", "🍽️ Restaurants",
                                        "🎓 Education", "💼 Finance", "💻 Technology", "💪 Fitness", "⚖️ Professional Services",
                                        "🛒 E-Commerce", "🏡 Real Estate", "🏥 Healthcare", "🍽️ Restaurants",
                                        "🎓 Education", "💼 Finance", "💻 Technology", "💪 Fitness", "⚖️ Professional Services",
                                        "🛒 E-Commerce", "🏡 Real Estate", "🏥 Healthcare", "🍽️ Restaurants",
                                        "🎓 Education", "💼 Finance", "💻 Technology", "💪 Fitness", "⚖️ Professional Services",
                                    ].map((item, i) => (
                                        <span key={i} className="mx-6 text-black/50 font-bold text-lg tracking-wide uppercase whitespace-nowrap">
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    /* Desktop Spline Hero — unchanged */
                    <SplineBackground
                        sceneUrl="https://prod.spline.design/4TCNX3a9YPPXiRdQ/scene.splinecode?v=2"
                        interactive={true}
                        className="absolute inset-0 w-full h-full"
                        fallbackColor="transparent"
                        onLoad={() => { setHeroLoaded(true); setHeroLoadedLocal(true); }}
                    >
                        {/* Hero Content Overlay — fades in simultaneously with navbar */}
                        <div
                            className="absolute top-[65%] left-0 right-0 flex justify-center z-50 pointer-events-auto transition-all duration-1000 ease-out"
                            style={{
                                opacity: heroLoaded ? 1 : 0,
                                transform: heroLoaded ? 'translateY(0)' : 'translateY(-24px)',
                                transitionDelay: heroLoaded ? '3.5s' : '0s',
                            }}
                        >
                            <LiquidButton onClick={() => navigate('/contact')}>
                                Start a Project
                            </LiquidButton>
                        </div>
                    </SplineBackground>
                )}
            </div>

            <div ref={revealRef} className="relative z-10 flex flex-col w-full">
                <div data-reveal="fade-in" className="hidden md:block">
                    <LogoCarousel />
                </div>
                <div data-reveal data-reveal-delay="100">
                    <ProjectsCarousel />
                </div>
                <div>
                    <StackingCardDemo />
                </div>
                <div data-reveal data-reveal-delay="100">
                    <HeroScrollDemo />
                </div>
                <div data-reveal>
                    <TextGradientScrollExample />
                </div>
                <div data-reveal>
                    <TestimonialsDemo />
                </div>
                <div data-reveal>
                    <FAQs />
                </div>
                <div data-reveal="fade-in">
                    <HoverFooter />
                </div>
            </div>
        </>
    );
}
