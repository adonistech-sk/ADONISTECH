import React from 'react';
import { Code2, Palette, Rocket, Zap, Layers, MessageSquare } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const services = [
  { title: 'Web Development',    icon: <Code2         className="w-6 h-6" />, color: 'blue'   },
  { title: 'Branding & Design',  icon: <Palette       className="w-6 h-6" />, color: 'pink'   },
  { title: 'Software',           icon: <Rocket        className="w-6 h-6" />, color: 'purple' },
  { title: 'Automation Systems', icon: <Zap           className="w-6 h-6" />, color: 'amber'  },
  { title: 'API & Backend',      icon: <Layers        className="w-6 h-6" />, color: 'indigo' },
  { title: 'E-Commerce',         icon: <MessageSquare className="w-6 h-6" />, color: 'rose'   },
];

/* Per-color tokens — icon bg/border, outer glow shadow, and wash gradient */
const colorTokens = {
  blue:   {
    icon:   'text-blue-600   bg-blue-50/60   border-blue-200   group-hover:bg-blue-100    group-hover:border-blue-400   group-hover:shadow-lg group-hover:shadow-blue-200/70',
    glow:   'group-hover:shadow-[0_10px_36px_-6px_rgba(59,130,246,0.30)]',
    wash:   'from-blue-100/50',
    accent: 'via-blue-300/40',
  },
  pink:   {
    icon:   'text-pink-600   bg-pink-50/60   border-pink-200   group-hover:bg-pink-100    group-hover:border-pink-400   group-hover:shadow-lg group-hover:shadow-pink-200/70',
    glow:   'group-hover:shadow-[0_10px_36px_-6px_rgba(236,72,153,0.28)]',
    wash:   'from-pink-100/50',
    accent: 'via-pink-300/40',
  },
  purple: {
    icon:   'text-purple-600 bg-purple-50/60 border-purple-200 group-hover:bg-purple-100  group-hover:border-purple-400 group-hover:shadow-lg group-hover:shadow-purple-200/70',
    glow:   'group-hover:shadow-[0_10px_36px_-6px_rgba(147,51,234,0.28)]',
    wash:   'from-purple-100/50',
    accent: 'via-purple-300/40',
  },
  amber:  {
    icon:   'text-amber-600  bg-amber-50/60  border-amber-200  group-hover:bg-amber-100   group-hover:border-amber-400  group-hover:shadow-lg group-hover:shadow-amber-200/70',
    glow:   'group-hover:shadow-[0_10px_36px_-6px_rgba(245,158,11,0.30)]',
    wash:   'from-amber-100/50',
    accent: 'via-amber-300/40',
  },
  indigo: {
    icon:   'text-indigo-600 bg-indigo-50/60 border-indigo-200 group-hover:bg-indigo-100  group-hover:border-indigo-400 group-hover:shadow-lg group-hover:shadow-indigo-200/70',
    glow:   'group-hover:shadow-[0_10px_36px_-6px_rgba(99,102,241,0.28)]',
    wash:   'from-indigo-100/50',
    accent: 'via-indigo-300/40',
  },
  rose:   {
    icon:   'text-rose-600   bg-rose-50/60   border-rose-200   group-hover:bg-rose-100    group-hover:border-rose-400   group-hover:shadow-lg group-hover:shadow-rose-200/70',
    glow:   'group-hover:shadow-[0_10px_36px_-6px_rgba(244,63,94,0.28)]',
    wash:   'from-rose-100/50',
    accent: 'via-rose-300/40',
  },
};

export function ServiceGrid() {
  const revealRef = useScrollReveal({ threshold: 0.1, rootMargin: '0px' });

  return (
    <div ref={revealRef} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6 gap-5 w-full mt-16 pb-12">
      {services.map((service, index) => {
        const t = colorTokens[service.color as keyof typeof colorTokens];
        return (
          <div
            key={index}
            data-reveal
            data-reveal-delay={`${index * 80}`}
            className={`
              relative bg-white/40 backdrop-blur-xl border border-white/50 rounded-[28px]
              px-8 py-6 flex flex-col items-center justify-center gap-4
              group overflow-hidden min-h-[150px] cursor-default
              shadow-[0_2px_12px_rgba(0,0,0,0.04)]
              transition-all duration-300 ease-out
              hover:-translate-y-3 hover:scale-[1.04] hover:bg-white/65
              ${t.glow}
            `}
          >
            {/* Colour wash — radiates from top on hover */}
            <div
              className={`absolute inset-0 bg-gradient-to-b ${t.wash} to-transparent
                          opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
            />

            {/* Top shimmer line */}
            <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-90 transition-opacity duration-300" />

            {/* Icon container */}
            <div className={`
              w-14 h-14 rounded-[20px] flex items-center justify-center border
              transition-all duration-300 shadow-sm relative z-10
              group-hover:scale-[1.18] group-hover:-translate-y-0.5
              ${t.icon}
            `}>
              {service.icon}
            </div>

            {/* Label */}
            <span className="text-sm font-bold text-neutral-800 text-center tracking-tight relative z-10 whitespace-nowrap transition-colors duration-300 group-hover:text-neutral-950">
              {service.title}
            </span>

            {/* Bottom accent bar — slides in on hover */}
            <div className={`absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent ${t.accent} to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center`} />
          </div>
        );
      })}
    </div>
  );
}
