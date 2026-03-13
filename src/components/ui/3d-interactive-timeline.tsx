import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Check, Star, Globe, Layout, BookOpen, LucideIcon } from 'lucide-react';

export interface TimelineEvent {
    id: string;
    date: string;
    title: string;
    description: string;
    icon?: React.ReactNode;
    image?: string;
    category?: string;
    color?: string;
    link?: {
        url: string;
        text: string;
    };
}

interface Timeline3DProps {
    events: TimelineEvent[];
    backgroundColor?: string;
    primaryColor?: string;
    secondaryColor?: string;
    textColor?: string;
    accentColor?: string;
    showImages?: boolean;
    className?: string;
}

const defaultColors = {
    background: 'bg-transparent',
    primary: 'bg-blue-600',
    secondary: 'bg-indigo-500',
    text: 'text-neutral-900',
    accent: 'bg-emerald-500',
};

export const Timeline3D: React.FC<Timeline3DProps> = ({
    events,
    backgroundColor = defaultColors.background,
    primaryColor = defaultColors.primary,
    secondaryColor = defaultColors.secondary,
    textColor = defaultColors.text,
    accentColor = defaultColors.accent,
    showImages = true,
    className = '',
}) => {
    const [activeEvent, setActiveEvent] = useState<string | null>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);
    const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');
    const [lastScrollTop, setLastScrollTop] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const st = window.pageYOffset || document.documentElement.scrollTop;
            setScrollDirection(st > lastScrollTop ? 'down' : 'up');
            setLastScrollTop(st <= 0 ? 0 : st);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollTop]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            setMousePosition({
                x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
                y: ((e.clientY - rect.top) / rect.height) * 2 - 1,
            });
        };

        const container = containerRef.current;
        if (container) {
            container.addEventListener('mousemove', handleMouseMove);
        }

        return () => {
            if (container) {
                container.removeEventListener('mousemove', handleMouseMove);
            }
        };
    }, []);

    return (
        <div
            className={`w-full ${backgroundColor} py-16 px-4 sm:px-6 lg:px-8 overflow-hidden ${textColor} ${className}`}
            ref={containerRef}
        >
            <div className="max-w-7xl mx-auto relative">
                {/* Decorative elements - 3D floating spheres */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    {[...Array(8)].map((_, i) => (
                        <motion.div
                            key={i}
                            className={`absolute rounded-full opacity-10 ${i % 2 === 0 ? primaryColor : secondaryColor}`}
                            animate={{
                                x: [
                                    `${20 + i * 10}%`,
                                    `${30 + i * 8}%`,
                                    `${15 + i * 12}%`,
                                    `${20 + i * 10}%`,
                                ],
                                y: [
                                    `${10 + i * 12}%`,
                                    `${20 + i * 10}%`,
                                    `${30 + i * 8}%`,
                                    `${10 + i * 12}%`,
                                ],
                                scale: [1, 1.2, 1.1, 1],
                            }}
                            transition={{
                                duration: 20 + i * 2,
                                ease: 'easeInOut',
                                repeat: Infinity,
                                repeatType: 'loop',
                            }}
                            style={{
                                width: `${50 + i * 20}px`,
                                height: `${50 + i * 20}px`,
                                filter: 'blur(8px)',
                                zIndex: 0,
                            }}
                        />
                    ))}
                </div>

                {/* Main timeline content */}
                <motion.div
                    className="relative z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="relative">
                        {/* Central line */}
                        <div
                            className={`absolute left-1/2 transform -translate-x-1/2 h-full w-1 ${primaryColor} rounded-full opacity-20`}
                        ></div>

                        {/* Timeline events */}
                        {events.map((event, index) => {
                            const [ref, inView] = useInView({
                                threshold: 0.3,
                                triggerOnce: false,
                            });
                            const controls = useAnimation();

                            useEffect(() => {
                                if (inView) {
                                    controls.start('visible');
                                }
                            }, [controls, inView]);

                            const isEven = index % 2 === 0;
                            const eventColor = event.color || primaryColor;

                            return (
                                <motion.div
                                    key={event.id}
                                    ref={ref}
                                    className={`relative mb-16 md:mb-24 ${isEven ? 'md:ml-auto' : 'md:mr-auto'} md:w-1/2 flex ${isEven ? 'md:justify-start' : 'md:justify-end'
                                        }`}
                                    initial="hidden"
                                    animate={controls}
                                    variants={{
                                        hidden: {
                                            opacity: 0,
                                            x: isEven ? 50 : -50,
                                            y: 20,
                                        },
                                        visible: {
                                            opacity: 1,
                                            x: 0,
                                            y: 0,
                                            transition: {
                                                duration: 0.8,
                                                ease: [0.16, 1, 0.3, 1],
                                            },
                                        },
                                    }}
                                >
                                    {/* Timeline node */}
                                    <div
                                        className={`absolute left-1/2 md:left-auto ${isEven ? 'md:left-0' : 'md:right-0'
                                            } top-0 transform -translate-x-1/2 ${isEven ? 'md:translate-x-0' : 'md:translate-x-0'
                                            } z-20`}
                                    >
                                        <motion.div
                                            className={`w-12 h-12 rounded-full ${eventColor} flex items-center justify-center border-4 border-white shadow-lg cursor-pointer text-white`}
                                            whileHover={{ scale: 1.1 }}
                                            onClick={() => setActiveEvent(activeEvent === event.id ? null : event.id)}
                                        >
                                            {event.icon || (
                                                <span className="font-bold">
                                                    {index + 1}
                                                </span>
                                            )}
                                        </motion.div>
                                    </div>

                                    {/* Content card */}
                                    <motion.div
                                        className={`relative z-10 bg-white/40 backdrop-blur-xl rounded-[32px] overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.05)] w-full md:w-[calc(100%-3rem)] ${isEven ? 'md:ml-16' : 'md:mr-16'
                                            } border border-white/40`}
                                        whileHover={{
                                            y: -5,
                                            transition: { duration: 0.3 },
                                        }}
                                        style={{
                                            transformStyle: 'preserve-3d',
                                            transform: `perspective(1000px) rotateY(${mousePosition.x * (isEven ? -2 : 2)
                                                }deg) rotateX(${mousePosition.y * -2}deg)`,
                                        }}
                                        onMouseEnter={() => setActiveEvent(event.id)}
                                        onMouseLeave={() => setActiveEvent(null)}
                                    >
                                        {showImages && event.image && (
                                            <div className="relative h-48 overflow-hidden">
                                                <motion.img
                                                    src={event.image}
                                                    alt={event.title}
                                                    className="w-full h-full object-cover"
                                                    initial={{ scale: 1.1 }}
                                                    animate={{
                                                        scale: activeEvent === event.id ? 1.05 : 1,
                                                    }}
                                                    transition={{ duration: 0.8 }}
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-transparent"></div>

                                                {event.category && (
                                                    <div className="absolute top-4 right-4">
                                                        <span className={`${accentColor} px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase text-white shadow-sm`}>
                                                            {event.category}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        <div className="p-8">
                                            <div className="flex items-center justify-between mb-4">
                                                <span className={`text-sm font-bold tracking-tight opacity-60`}>
                                                    {event.date}
                                                </span>
                                            </div>

                                            <h3 className="text-2xl font-bold mb-3 tracking-tight text-neutral-900">{event.title}</h3>

                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{
                                                    height: activeEvent === event.id ? 'auto' : 0,
                                                    opacity: activeEvent === event.id ? 1 : 0,
                                                }}
                                                transition={{ duration: 0.3 }}
                                                className="overflow-hidden"
                                            >
                                                <p className="text-neutral-600 mt-2 leading-relaxed font-medium">
                                                    {event.description}
                                                </p>

                                                {event.link && (
                                                    <a
                                                        href={event.link.url}
                                                        className={`inline-block mt-6 px-6 py-2.5 ${primaryColor} hover:bg-opacity-90 rounded-full font-bold text-white transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5`}
                                                    >
                                                        {event.link.text}
                                                    </a>
                                                )}
                                            </motion.div>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Timeline3D;
