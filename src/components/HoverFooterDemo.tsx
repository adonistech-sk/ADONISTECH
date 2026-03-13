"use client";
import React, { useEffect, useRef } from "react";
import {
    Mail,
    Phone,
    MapPin,
    Facebook,
    Instagram,
    Twitter,
    Dribbble,
    Globe,
} from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FooterBackgroundGradient, TextHoverEffect } from "./ui/hover-footer";
import { useScrollReveal } from "../hooks/useScrollReveal";

export function HoverFooter() {
    const navigate = useNavigate();
    const location = useLocation();

    // After navigating to /#faqs, scroll to the element
    useEffect(() => {
        if (location.pathname === '/' && location.hash === '#faqs') {
            const el = document.getElementById('faqs');
            if (el) {
                setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
            }
        }
    }, [location]);

    const handleFaqClick = (e: React.MouseEvent) => {
        e.preventDefault();
        navigate('/#faqs');
    };

    // Footer link data
    const footerLinks = [
        {
            title: "Pages",
            links: [
                { label: "Home", to: "/" },
                { label: "Portfolio", to: "/projects" },
                { label: "About", to: "/about" },
            ],
        },
        {
            title: "Info",
            links: [
                { label: "FAQs", to: "/#faqs", hash: true },
                { label: "Support", to: "/contact" },
                {
                    label: "Privacy Policy",
                    to: "/privacy",
                    pulse: true,
                },
            ],
        },
    ];

    // Contact info data
    const contactInfo = [
        {
            icon: <Mail size={18} className="text-[#3ca2fa]" />,
            text: "adonistech.sk@gmail.com",
            href: "mailto:adonistech.sk@gmail.com",
        },
        {
            icon: <Phone size={18} className="text-[#3ca2fa]" />,
            text: "+421 950 280 922",
            href: "tel:+421950280922",
        },
        {
            icon: <MapPin size={18} className="text-[#3ca2fa]" />,
            text: "Nitra, Slovakia",
        },
    ];

    // Social media icons
    const socialLinks = [
        { icon: <Facebook size={20} />, label: "Facebook", href: "#" },
        { icon: <Instagram size={20} />, label: "Instagram", href: "#" },
        { icon: <Twitter size={20} />, label: "Twitter", href: "#" },
        { icon: <Dribbble size={20} />, label: "Dribbble", href: "#" },
        { icon: <Globe size={20} />, label: "Globe", href: "#" },
    ];

    const revealRef = useScrollReveal({ threshold: 0.05, rootMargin: '0px' });
    const footerRef = useRef<HTMLElement>(null);

    return (
        <footer ref={(el) => { (revealRef as any).current = el; (footerRef as any).current = el; }} className="bg-white/40 backdrop-blur-xl relative h-fit rounded-3xl overflow-hidden m-8 border border-white/40 shadow-2xl">
            <div className="max-w-7xl mx-auto p-14 z-40 relative">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 lg:gap-16 pb-12">
                    {/* Brand section */}
                    <div data-reveal data-reveal-delay="0" className="flex flex-col space-y-4">
                        <div className="flex items-center space-x-2">
                            <span className="text-[#3ca2fa] text-3xl font-extrabold">
                                &hearts;
                            </span>
                            <span className="text-black text-3xl font-bold">Adonis</span>
                        </div>
                        <p className="text-sm leading-relaxed text-black/70">
                            Adonis is a premium digital agency.
                        </p>
                    </div>

                    {/* Footer link sections */}
                    {footerLinks.map((section, i) => (
                        <div key={section.title} data-reveal data-reveal-delay={`${(i + 1) * 100}`}>
                            <h4 className="text-black text-lg font-semibold mb-6">
                                {section.title}
                            </h4>
                            <ul className="space-y-3">
                                {section.links.map((link) => (
                                    <li key={link.label} className="relative">
                                        {link.hash ? (
                                            <a
                                                href={link.to}
                                                onClick={handleFaqClick}
                                                className="text-black/70 hover:text-[#3ca2fa] transition-colors cursor-pointer"
                                            >
                                                {link.label}
                                            </a>
                                        ) : (
                                            <Link
                                                to={link.to}
                                                className="text-black/70 hover:text-[#3ca2fa] transition-colors"
                                            >
                                                {link.label}
                                            </Link>
                                        )}
                                        {link.pulse && (
                                            <span className="absolute top-0 right-[-10px] w-2 h-2 rounded-full bg-[#3ca2fa] animate-pulse"></span>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Contact section */}
                    <div data-reveal data-reveal-delay="300">
                        <h4 className="text-black text-lg font-semibold mb-6">
                            Contact Us
                        </h4>
                        <ul className="space-y-4 text-black/70">
                            {contactInfo.map((item, i) => (
                                <li key={i} className="flex items-center space-x-3">
                                    {item.icon}
                                    {item.href ? (
                                        <a
                                            href={item.href}
                                            className="hover:text-[#3ca2fa] transition-colors"
                                        >
                                            {item.text}
                                        </a>
                                    ) : (
                                        <span className="hover:text-[#3ca2fa] transition-colors">
                                            {item.text}
                                        </span>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <hr className="border-t border-black/10 my-8" />

                {/* Footer bottom */}
                <div className="flex flex-col md:flex-row justify-end items-center text-sm space-y-4 md:space-y-0 text-black/60">
                    {/* Copyright */}
                    <p className="text-center md:text-right w-full">
                        &copy; {new Date().getFullYear()} Adonis. All rights reserved.
                    </p>
                </div>
            </div>

            {/* Text hover effect */}
            <div className="lg:flex hidden h-[30rem] -mt-52 -mb-36">
                <TextHoverEffect text="ADONIS" className="z-50" triggerRef={footerRef} />
            </div>

            <FooterBackgroundGradient />
        </footer>
    );
}
