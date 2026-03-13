"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { LucideIcon } from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import { cn } from "../../lib/utils"

interface NavItem {
    name: string
    url: string
    icon: LucideIcon
}

interface NavBarProps {
    items: NavItem[]
    className?: string
}

export function NavBar({ items, className }: NavBarProps) {
    const location = useLocation();
    const [activeTab, setActiveTab] = useState(items[0].name);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768)
        }

        handleResize()
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, []);

    useEffect(() => {
        // Find which nav item matches the current pathname
        // Handle hash routes like /#projects if possible, though mostly matching main paths.
        const currentPath = location.pathname;
        const currentItem = items.find(item => {
            if (item.url === '/') return currentPath === '/';
            return currentPath.startsWith(item.url.split('#')[0]);
        });

        if (currentItem) {
            setActiveTab(currentItem.name);
        }
    }, [location.pathname, items]);

    return (
        <div
            className={cn(
                "fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-50",
                className,
            )}
        >
            <div className="flex items-center gap-3 bg-white/40 border border-white/40 backdrop-blur-xl py-1 px-1 rounded-full shadow-xl">
                {items.map((item) => {
                    const Icon = item.icon
                    const isActive = activeTab === item.name

                    return (
                        <Link
                            key={item.name}
                            to={item.url}
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className={cn(
                                "relative cursor-pointer text-sm font-bold px-6 py-2 rounded-full transition-colors",
                                "text-black/60 hover:text-[#3ca2fa]",
                                isActive && "bg-white/60 text-[#3ca2fa]",
                            )}
                        >
                            <span className="hidden md:inline">{item.name}</span>
                            <span className="md:hidden">
                                <Icon size={18} strokeWidth={2.5} />
                            </span>
                            {isActive && (
                                <motion.div
                                    layoutId="lamp"
                                    className="absolute inset-0 w-full bg-[#3ca2fa]/5 rounded-full -z-10"
                                    initial={false}
                                    transition={{
                                        type: "spring",
                                        stiffness: 300,
                                        damping: 30,
                                    }}
                                >
                                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-[#3ca2fa] rounded-t-full">
                                        <div className="absolute w-12 h-6 bg-[#3ca2fa]/20 rounded-full blur-md -top-2 -left-2" />
                                        <div className="absolute w-8 h-6 bg-[#3ca2fa]/20 rounded-full blur-md -top-1" />
                                        <div className="absolute w-4 h-4 bg-[#3ca2fa]/20 rounded-full blur-sm top-0 left-2" />
                                    </div>
                                </motion.div>
                            )}
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}
