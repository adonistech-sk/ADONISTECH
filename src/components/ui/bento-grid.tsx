import { ReactNode } from "react";
import { ArrowRight } from "lucide-react";

import { cn } from "../../lib/utils";
import { Button } from "./button";

const BentoGrid = ({
    children,
    className,
}: {
    children: ReactNode;
    className?: string;
}) => {
    return (
        <div
            className={cn(
                "grid w-full auto-rows-[22rem] lg:auto-rows-[42rem] grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6",
                className,
            )}
        >
            {children}
        </div>
    );
};

const BentoCard = ({
    name,
    className,
    background,
    description,
    href,
    cta,
    key,
}: {
    name: string;
    className: string;
    background: ReactNode;
    description: string;
    href: string;
    cta: string;
    key?: string | number;
}) => (
    <div
        key={key || name}
        className={cn(
            "group relative col-span-1 lg:col-span-3 flex flex-col justify-end overflow-hidden rounded-[24px]",
            "bg-[#09090b] border border-white/5",
            "shadow-xl transform-gpu",
            className,
        )}
    >
        <div className="absolute inset-0 z-0">{background}</div>

        {/* Gradient overlay so the text stands out */}
        <div className="absolute inset-x-0 bottom-0 h-4/5 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10 pointer-events-none transition-opacity duration-300 group-hover:opacity-60" />

        <div className="pointer-events-none z-20 flex transform-gpu flex-col gap-2 px-6 pt-6 pb-4 transition-all duration-300 mt-auto">
            <h3 className="text-xl md:text-2xl font-bold !text-white z-30 relative shadow-black drop-shadow-[0_4px_8px_rgba(0,0,0,1)]">
                {name}
            </h3>
            <p className="max-w-lg !text-white font-medium text-sm md:text-base leading-relaxed z-30 relative drop-shadow-[0_4px_8px_rgba(0,0,0,1)]">
                {description}
            </p>
        </div>

        <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-white/[0.03]" />
    </div>
);

export { BentoCard, BentoGrid };
