import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface ProcessStep {
  id: number;
  step: string;
  title: string;
  status: string;
  statusText: string;
}

const steps: ProcessStep[] = [
  {
    id: 1,
    step: 'Step 1',
    title: 'Analysis\n& Understanding',
    status: 'Creation',
    statusText: 'Creation',
  },
  {
    id: 2,
    step: 'Step 2',
    title: 'Concept\n& Planning',
    status: 'In Progress',
    statusText: 'In Progress',
  },
  {
    id: 3,
    step: 'Step 3',
    title: 'Design\n& Content',
    status: 'Pending',
    statusText: 'Waiting',
  },
  {
    id: 4,
    step: 'Step 4',
    title: 'Development\n& Implementation',
    status: 'Pending',
    statusText: 'Testing',
  },
  {
    id: 5,
    step: 'Step 5',
    title: 'Launch\n& Optimization',
    status: 'Completed',
    statusText: 'Completed',
  },
];

const isFinished = (status: string) => status === 'completed' || status === 'Creation' || status === 'Completed';
const isActive = (status: string) => status === 'in-progress' || status === 'In Progress';

export const HorizontalProcess: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);

  // Staggered animation for nodes
  const nodeVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: (i: number) => ({
      scale: 1,
      opacity: 1,
      transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" }
    })
  };

  return (
    <section className="w-full bg-transparent pb-24 pt-0 px-4 md:px-8 rounded-[48px] overflow-hidden relative">
      <div className="max-w-7xl mx-auto flex flex-col items-center">

        {/* Timeline Desktop */}
        <div className="w-full relative px-4 md:px-12 mb-20 hidden md:block">
          {/* Progress Line Background */}
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-neutral-200/60 -translate-y-1/2" />

          {/* Animated Progress Line Overlay */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, ease: "circOut" }}
            className="absolute top-1/2 left-0 w-full h-[2px] -translate-y-1/2 origin-left bg-gradient-to-r from-teal-500 via-teal-400 to-transparent opacity-70"
          />

          <div className="flex justify-between items-center relative z-10 w-full">
            {steps.map((step, idx) => (
              <motion.div
                key={step.id}
                custom={idx}
                initial="hidden"
                animate="visible"
                variants={nodeVariants}
                className="relative flex flex-col items-center group/node cursor-pointer"
              >
                {/* Node Glow/Pulse for In Progress */}
                {isActive(step.status) && (
                  <motion.div
                    animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0.5, 0.2] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute inset-0 bg-teal-400/30 rounded-full blur-md -z-10"
                  />
                )}

                {/* Node Circle */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 border-2 ${isFinished(step.status)
                  ? 'bg-teal-500 border-teal-500 shadow-[0_0_20px_rgba(20,184,166,0.5)] text-white'
                  : isActive(step.status)
                    ? 'bg-white border-white ring-4 ring-neutral-100 shadow-[0_0_15px_rgba(0,0,0,0.1)]'
                    : 'bg-white border-neutral-100 text-neutral-300'
                  } group-hover/node:scale-110 group-hover/node:border-teal-300 transition-transform duration-300`}>
                  {isFinished(step.status) && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3 + idx * 0.1 }}>
                      <Check size={20} className="stroke-[3]" />
                    </motion.div>
                  )}
                  {isActive(step.status) && <div className="w-2.5 h-2.5 rounded-full bg-neutral-900 animate-pulse" />}
                  {!isFinished(step.status) && !isActive(step.status) && (
                    <div className="w-1.5 h-1.5 rounded-full bg-neutral-200 group-hover/node:bg-neutral-400 transition-colors" />
                  )}
                </div>

                <span className={`absolute -bottom-8 text-[9px] font-bold uppercase tracking-[0.15em] transition-colors duration-300 ${isFinished(step.status) ? 'text-teal-600' : isActive(step.status) ? 'text-neutral-900' : 'text-neutral-400'
                  }`}>
                  {step.statusText}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6 w-full">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{
                scale: 1.05,
                y: -12,
                boxShadow: step.id === 5
                  ? '0 25px 50px -12px rgba(34,197,94,0.3)'
                  : isFinished(step.status) || isActive(step.status)
                    ? '0 25px 50px -12px rgba(20,184,166,0.15)'
                    : '0 25px 50px -12px rgba(0,0,0,0.08)',
                transition: { type: "spring", stiffness: 400, damping: 25 }
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`p-6 xl:p-8 rounded-[32px] border transition-all duration-500 flex flex-col aspect-square cursor-pointer group relative overflow-hidden ${step.id === 5
                  ? 'bg-green-500 border-green-600 text-white shadow-[0_20px_50px_-10px_rgba(34,197,94,0.3)]'
                  : 'bg-white border-neutral-200 shadow-[0_8px_40px_rgba(0,0,0,0.06)] ring-1 ring-neutral-100'
                }`}
            >
              {/* Internal Glow on Hover/Active */}
              {(isFinished(step.status) || isActive(step.status) || step.id === 5) && (
                <div className={`absolute top-0 right-0 w-32 h-32 blur-3xl -mr-16 -mt-16 pointer-events-none group-hover:opacity-100 transition-opacity duration-500 ${step.id === 5 ? 'bg-white/20' : 'bg-teal-400/10'
                  }`} />
              )}

              {/* Step indicator (Top Left) */}
              <div className="relative z-10 w-full mb-auto">
                <span className={`text-[10px] xl:text-xs font-bold uppercase tracking-[0.2em] block transition-colors duration-300 ${step.id === 5 ? 'text-green-100' : isFinished(step.status) ? 'text-teal-600' : isActive(step.status) ? 'text-teal-500' : 'text-neutral-400'
                  }`}>
                  {step.step}
                </span>
              </div>

              {/* Title (Middle Left) */}
              <div className="relative z-10 w-full my-auto">
                <h3 className={`text-xl lg:text-lg xl:text-2xl font-bold leading-[1.2] tracking-tight whitespace-pre-line transition-all duration-300 ${step.id === 5
                    ? 'text-white'
                    : isFinished(step.status) || isActive(step.status)
                      ? 'text-neutral-900 group-hover:translate-x-1'
                      : 'text-neutral-400 group-hover:text-neutral-600'
                  }`}>
                  {step.title}
                </h3>
              </div>

              {/* Status (Bottom Left) */}
              <div className="flex items-center gap-2 mt-auto relative z-10 w-full">
                <div className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${step.id === 5
                    ? 'bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]'
                    : isFinished(step.status)
                      ? 'bg-teal-500 shadow-[0_0_8px_rgba(20,184,166,0.6)]'
                      : isActive(step.status)
                        ? 'bg-teal-400 animate-pulse'
                        : 'bg-neutral-200'
                  }`} />
                <span className={`text-[10px] xl:text-xs font-bold uppercase tracking-widest transition-colors duration-300 ${step.id === 5
                    ? 'text-green-50'
                    : isFinished(step.status)
                      ? 'text-teal-600'
                      : isActive(step.status)
                        ? 'text-neutral-900'
                        : 'text-neutral-400 font-medium group-hover:text-neutral-500'
                  }`}>
                  {step.statusText}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

