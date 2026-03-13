import React from "react";
import { BentoCard, BentoGrid } from "./ui/bento-grid";

const features = [
    {
        name: "Web Development",
        description: "We build websites that help businesses stand out online.",
        href: "/",
        cta: "Learn more",
        background: <img src="https://ridbtuorcmkjidenxudx.supabase.co/storage/v1/object/public/Public%20main/Gemini_Generated_Image_8rr30t8rr30t8rr3.webp" className="absolute inset-0 object-cover w-full h-full transition-all duration-500 ease-out group-hover:scale-110 opacity-95" alt="Web Dev" draggable="false" />,
        className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
    },
    {
        name: "3D Animation",
        description: "We create 3D visuals and animations that help ideas and brands come to life.",
        href: "/",
        cta: "Learn more",
        background: <img src="https://ridbtuorcmkjidenxudx.supabase.co/storage/v1/object/public/Public%20main/3D.webp.webp" className="absolute inset-0 object-cover w-full h-full transition-all duration-500 ease-out group-hover:scale-110 opacity-95" alt="3D" draggable="false" />,
        className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
    },
    {
        name: "Branding",
        description: "We will create your company’s name, logo or even your complete visual identity.",
        href: "/",
        cta: "Learn more",
        background: <img src="https://ridbtuorcmkjidenxudx.supabase.co/storage/v1/object/public/Public%20main/Branding.webp.webp" className="absolute inset-0 object-cover w-full h-full transition-all duration-500 ease-out group-hover:scale-110 opacity-95" alt="Branding" draggable="false" />,
        className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
    },
    {
        name: "Software",
        description: "We develop custom software that helps businesses run and grow more efficiently.",
        href: "/",
        cta: "Learn more",
        background: <img src="https://ridbtuorcmkjidenxudx.supabase.co/storage/v1/object/public/Public%20main/Software.webp.webp" className="absolute inset-0 object-cover w-full h-full transition-all duration-500 ease-out group-hover:scale-110 opacity-95" alt="Software" draggable="false" />,
        className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2",
    },
    {
        name: "Product Design",
        description: "We design digital products that are simple, useful, and easy to use.",
        href: "/",
        cta: "Learn more",
        background: <img src="https://ridbtuorcmkjidenxudx.supabase.co/storage/v1/object/public/Public%20main/Design.webp.webp" className="absolute inset-0 object-cover w-full h-full transition-all duration-500 ease-out group-hover:scale-110 opacity-95" alt="Product Design" draggable="false" />,
        className: "lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4",
    },
];

export function BentoDemo() {
    return (
        <div className="w-full py-24 px-4 md:px-12 lg:px-24 bg-transparent font-sans">
            <div className="max-w-full mx-auto">
                <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 text-black">
                    Discover our capabilities
                </h2>
                <BentoGrid className="lg:grid-rows-3">
                    {features.map((feature) => (
                        <BentoCard
                            key={feature.name}
                            name={feature.name}
                            description={feature.description}
                            href={feature.href}
                            cta={feature.cta}
                            background={feature.background}
                            className={feature.className}
                        />
                    ))}
                </BentoGrid>
            </div>
        </div>
    );
}
