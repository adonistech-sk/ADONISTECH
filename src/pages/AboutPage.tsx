import { ServiceGrid } from '../components/ui/service-grid';

import { HoverFooter } from '../components/HoverFooterDemo';
import FAQs from '../components/ui/text-reveal-faqs';
import React, { useState } from 'react';
import Stepper, { Step } from '../components/Stepper';
import { useScrollReveal } from '../hooks/useScrollReveal';

export function AboutPage() {
    const [name, setName] = useState('');
    const revealRef = useScrollReveal();

    return (
        <div ref={revealRef} className="w-full min-h-screen pt-32 pb-0 flex flex-col relative z-20">
            <section className="flex-1 px-4 md:px-8 w-full max-w-7xl mx-auto flex flex-col items-center justify-center">
                <div data-reveal className="w-full bg-white/30 backdrop-blur-xl rounded-[48px] p-8 md:p-16 text-neutral-900 flex flex-col items-center shadow-[0_8px_32px_rgba(0,0,0,0.05)] border border-white/40 relative overflow-hidden mb-20">

                    {/* Pill */}
                    <div data-reveal data-reveal-delay="100" className="border border-black/10 bg-white/40 backdrop-blur-md px-6 py-2 rounded-full text-sm font-semibold tracking-wide text-neutral-800 mb-8 relative z-10 shadow-sm">
                        About
                    </div>

                    {/* Heading */}
                    <h2 data-reveal data-reveal-delay="200" className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-center text-neutral-900 relative z-10">
                        Our Process
                    </h2>

                    {/* Subheading */}
                    <p data-reveal data-reveal-delay="300" className="text-neutral-600 text-lg md:text-xl max-w-2xl text-center mb-8 leading-relaxed relative z-10 font-medium tracking-tight">
                        From the first idea to the final launch, our process transforms ambitious ideas into powerful digital products.
                    </p>

                    <div data-reveal data-reveal-delay="400" className="w-full">
                        <Stepper
                            initialStep={1}
                            onStepChange={(step) => {
                                console.log(step);
                            }}
                            onFinalStepCompleted={() => console.log("Ready to Build Your Website?")}
                            backButtonText="Previous"
                            nextButtonText="Next"
                        >
                            <Step>
                                <div className="flex flex-col items-center justify-center h-full min-h-[120px] md:min-h-[200px] text-center">
                                    <p className="text-[#3ca2fa] font-bold tracking-widest uppercase mb-2 md:mb-4 text-sm md:text-base">Step 1</p>
                                    <h2 className="text-2xl md:text-5xl font-bold text-neutral-900 mb-0 md:mb-6">Analysis &amp; Understanding</h2>
                                    <p className="text-neutral-600 text-lg max-w-2xl leading-relaxed hidden md:block">
                                        At the meeting (in person or online), we will go through your expectations, goals, and ideas for the new website. We will advise you on the scope, technology, and structure as well.
                                    </p>
                                </div>
                            </Step>
                            <Step>
                                <div className="flex flex-col items-center justify-center h-full min-h-[120px] md:min-h-[200px] text-center">
                                    <p className="text-[#3ca2fa] font-bold tracking-widest uppercase mb-2 md:mb-4 text-sm md:text-base">Step 2</p>
                                    <h2 className="text-2xl md:text-5xl font-bold text-neutral-900 mb-0 md:mb-6">Concept &amp; Planning</h2>
                                    <p className="text-neutral-600 text-lg max-w-2xl leading-relaxed hidden md:block">
                                        With a clear understanding of your goals, we define the website strategy, structure, and user journey. This phase ensures every page and feature is planned to deliver a smooth experience and support your business objectives.
                                    </p>
                                </div>
                            </Step>
                            <Step>
                                <div className="flex flex-col items-center justify-center h-full min-h-[120px] md:min-h-[200px] text-center">
                                    <p className="text-[#3ca2fa] font-bold tracking-widest uppercase mb-2 md:mb-4 text-sm md:text-base">Step 3</p>
                                    <h2 className="text-2xl md:text-5xl font-bold text-neutral-900 mb-0 md:mb-6">Design &amp; Content</h2>
                                    <p className="text-neutral-600 text-lg max-w-2xl leading-relaxed hidden md:block">
                                        We transform the strategy into a visually engaging design that reflects your brand. Layouts, typography, colors, and content are carefully crafted to create a modern, intuitive, and user-friendly experience.
                                    </p>
                                </div>
                            </Step>
                            <Step>
                                <div className="flex flex-col items-center justify-center h-full min-h-[120px] md:min-h-[200px] text-center">
                                    <p className="text-[#3ca2fa] font-bold tracking-widest uppercase mb-2 md:mb-4 text-sm md:text-base">Step 4</p>
                                    <h2 className="text-2xl md:text-5xl font-bold text-neutral-900 mb-0 md:mb-6">Development &amp; Implementation</h2>
                                    <p className="text-neutral-600 text-lg max-w-2xl leading-relaxed hidden md:block">
                                        Our development team turns the approved designs into a fully functional website using modern technologies. The site is built to be fast, responsive, secure, and optimized for all devices and browsers.
                                    </p>
                                </div>
                            </Step>
                            <Step>
                                <div className="flex flex-col items-center justify-center h-full min-h-[120px] md:min-h-[200px] text-center">
                                    <p className="text-[#3ca2fa] font-bold tracking-widest uppercase mb-2 md:mb-4 text-sm md:text-base">Step 5</p>
                                    <h2 className="text-2xl md:text-5xl font-bold text-neutral-900 mb-0 md:mb-6">Launch &amp; Optimization</h2>
                                    <p className="text-neutral-600 text-lg max-w-2xl leading-relaxed hidden md:block">
                                        After testing everything thoroughly, we launch your website and make it live. We also optimize performance, improve SEO readiness, and ensure everything runs smoothly for your visitors.
                                    </p>
                                </div>
                            </Step>
                        </Stepper>
                        <ServiceGrid />
                    </div>
                </div>



                <div data-reveal>
                    <FAQs />
                </div>
            </section>

            <div data-reveal="fade-in">
                <HoverFooter />
            </div>
        </div>
    );
}
