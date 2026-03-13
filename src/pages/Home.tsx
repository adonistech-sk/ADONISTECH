import React from 'react';
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
import { useScrollReveal } from '../hooks/useScrollReveal';

export function Home({ setHeroLoaded }: { setHeroLoaded: (loaded: boolean) => void }) {
    const revealRef = useScrollReveal();

    return (
        <>
            <div className="w-full h-screen relative z-10">
                <SplineBackground
                    sceneUrl="https://prod.spline.design/4TCNX3a9YPPXiRdQ/scene.splinecode?v=2"
                    interactive={true}
                    className="absolute inset-0 w-full h-full"
                    fallbackColor="transparent"
                    onLoad={() => setHeroLoaded(true)}
                >
                    {/* Hero Content Overlay */}
                    <div className="absolute top-[65%] left-1/2 -translate-x-1/2 z-50 pointer-events-auto">
                        <LiquidButton>
                            Start a Project
                        </LiquidButton>
                    </div>
                </SplineBackground>
            </div>

            <div ref={revealRef} className="relative z-10 flex flex-col w-full">
                <div data-reveal="fade-in">
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
