import React from 'react';

const industries = [
    "🛒 E-Commerce",
    "🏡 Real Estate",
    "🏥 Healthcare",
    "🍽️ Restaurants",
    "🎓 Education",
    "💼 Finance",
    "💻 Technology",
    "💪 Fitness",
    "⚖️ Professional Services",
];

export function LogoCarousel() {
    return (
        <div className="w-full bg-transparent py-8 overflow-hidden relative border-y border-black/5 flex items-center justify-center font-sans tracking-tight">
            {/* Gradients for fading edges */}
            <div className="absolute inset-y-0 left-0 w-24 md:w-40 bg-gradient-to-r from-white to-transparent mix-blend-screen z-10 pointer-events-none"></div>
            <div className="absolute inset-y-0 right-0 w-24 md:w-40 bg-gradient-to-l from-white to-transparent mix-blend-screen z-10 pointer-events-none"></div>

            {/* Marquee Container */}
            <div className="flex w-max marquee-content items-center">
                {/* Render multiple times for seamless looping on all screen sizes */}
                {[...industries, ...industries, ...industries, ...industries].map((industry, index) => (
                    <div key={index} className="mx-8 md:mx-12 flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity whitespace-nowrap cursor-default">
                        <span className="text-black font-bold text-lg md:text-xl tracking-wide uppercase">
                            {industry}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
