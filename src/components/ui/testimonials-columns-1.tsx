"use client";
import React from "react";
import { motion } from "motion/react";

const _isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

export type Testimonial = {
    text: string;
    image: string;
    name: string;
    role: string;
};

export const TestimonialsColumn = (props: {
    className?: string;
    testimonials: Testimonial[];
    duration?: number;
}) => {
    return (
        <div className={props.className}>
            <motion.div
                animate={{
                    translateY: "-50%",
                }}
                transition={{
                    duration: props.duration || 10,
                    repeat: Infinity,
                    ease: "linear",
                    repeatType: "loop",
                }}
                className="flex flex-col gap-6 pb-6 bg-transparent"
            >
                {[
                    ...new Array(2).fill(0).map((_, index) => (
                        <React.Fragment key={index}>
                            {props.testimonials.map(({ text, image, name, role }, i) => (
                                <div
                                    className="p-10 rounded-3xl border border-white/40 bg-white/40 backdrop-blur-2xl shadow-xl shadow-black/5 max-w-xs w-full text-black"
                                    key={i}
                                >
                                    <div className="text-black/80">{text}</div>
                                    <div className="flex items-center gap-2 mt-5">
                                        <img
                                            width={40}
                                            height={40}
                                            src={image}
                                            alt={name}
                                            loading={_isMobile ? "lazy" : undefined}
                                            className="h-10 w-10 rounded-full border border-white/50"
                                        />
                                        <div className="flex flex-col">
                                            <div className="font-semibold tracking-tight leading-5 text-black">{name}</div>
                                            <div className="leading-5 opacity-70 tracking-tight text-black/70">{role}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </React.Fragment>
                    )),
                ]}
            </motion.div>
        </div>
    );
};
