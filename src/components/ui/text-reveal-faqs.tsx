// Forcing Vite HMR Reload for FAQs
'use client'

import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './accordion'
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';

export default function FAQs() {
    const faqItems = [
        {
            id: 'item-1',
            question: 'What makes your agency different?',
            answer: 'We combine creative design, modern technology, and strategic thinking to build websites that not only look great but also drive real business results.',
        },
        {
            id: 'item-2',
            question: 'How long does it take to build a website?',
            answer: 'For smaller websites, we can deliver a fully functional site in about 7 days. Larger or more complex websites with custom features usually take 2–5 weeks.',
        },
        {
            id: 'item-3',
            question: 'How much does a website cost?',
            answer: 'Pricing varies based on the project size and functionality. We offer flexible packages and custom quotes to fit your business needs.',
        },
        {
            id: 'item-4',
            question: 'Can you help improve an existing website?',
            answer: 'Absolutely. We can redesign, optimize, and modernize existing websites to improve performance, user experience, and conversions.',
        },
        {
            id: 'item-5',
            question: 'Do you provide support after the website launches?',
            answer: 'Yes. We offer ongoing support, updates, and maintenance to keep your website secure and performing at its best.',
        },
    ];

    return (
        <section id="faqs" className="w-full relative z-20 mt-12 mb-20">
            <div className="w-full bg-white/30 backdrop-blur-xl rounded-[48px] p-8 md:p-16 text-neutral-900 border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.05)] overflow-hidden relative">
                <div className="grid gap-12 md:grid-cols-5 md:gap-16 relative z-10">
                    <div className="md:col-span-2">
                        <div className="border border-black/10 bg-white/40 backdrop-blur-md px-6 py-2 rounded-full text-sm font-semibold tracking-wide text-neutral-800 mb-8 inline-block shadow-sm">
                            Knowledge Base
                        </div>
                        <h2 className="text-neutral-900 text-5xl md:text-6xl font-bold tracking-tight">FAQS</h2>
                        <p className="text-neutral-600 mt-6 text-balance text-xl md:text-2xl tracking-tight font-medium">
                            Everything you need to know about partnering with <span className="text-neutral-900 font-bold">ADONISTECH</span>.
                        </p>
                        <p className="text-neutral-500 mt-8 hidden md:block text-lg">
                            Can't find what you're looking for? Reach out to our{' '}
                            <Link to="/contact" className="text-[#3ca2fa] font-semibold hover:underline">
                                strategy team
                            </Link>{' '}
                            for immediate assistance.
                        </p>
                    </div>

                    <div className="md:col-span-3">
                        <Accordion
                            type="single"
                            collapsible>
                            {faqItems.map((item) => (
                                <AccordionItem
                                    key={item.id}
                                    value={item.id}
                                    className="border-b border-black/10 py-2">
                                    <AccordionTrigger className="cursor-pointer text-neutral-900 text-xl md:text-2xl font-normal tracking-tight hover:no-underline hover:text-[#3ca2fa] transition-colors">{item.question}</AccordionTrigger>
                                    <AccordionContent>
                                        <BlurredStagger text={item.answer} />
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>

                    <p className="text-neutral-500 mt-6 md:hidden text-lg">
                        Can't find what you're looking for? Contact our{' '}
                        <Link to="/contact" className="text-[#3ca2fa] font-semibold hover:underline">
                            strategy team
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    )
}

export const BlurredStagger = ({
    text = "built by ruixen.com",
}: {
    text: string;
}) => {
    const headingText = text;

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.015,
            },
        },
    };

    const letterAnimation = {
        hidden: {
            opacity: 0,
            filter: "blur(10px)",
        },
        show: {
            opacity: 1,
            filter: "blur(0px)",
        },
    };

    return (
        <>
            <div className="w-full">
                <motion.p
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="text-neutral-600 text-lg md:text-xl leading-relaxed break-words whitespace-normal"
                >
                    {headingText.split("").map((char, index) => (
                        <motion.span
                            key={index}
                            variants={letterAnimation}
                            transition={{ duration: 0.3 }}
                            className="inline-block"
                        >
                            {char === " " ? "\u00A0" : char}
                        </motion.span>
                    ))}
                </motion.p>
            </div>
        </>
    );
};
