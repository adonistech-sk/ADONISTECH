'use client';
import { ReactLenis } from 'lenis/react';
import { useTransform, motion, useScroll, MotionValue } from 'motion/react';
import { useRef, forwardRef, Key } from 'react';
import { ArrowRight } from 'lucide-react';

interface ProjectData {
  title: string;
  description: string;
  link: string;
  color: string;
}

interface CardProps {
  i: number;
  title: string;
  description: string;
  url: string;
  color: string;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
  key?: Key;
}

export const Card = ({
  i,
  title,
  description,
  url,
  color,
  progress,
  range,
  targetScale,
}: CardProps) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start'],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={container}
      className='h-screen flex items-center justify-center sticky top-0'
    >
      <motion.div
        style={{
          scale,
          top: `calc(-5vh + ${i * 25}px)`,
        }}
        className={`flex flex-col relative -top-[20%] h-[500px] w-[90%] md:w-[80%] max-w-5xl rounded-[32px] p-8 md:p-12 origin-top bg-white/60 backdrop-blur-2xl border border-white/50 shadow-[0_30px_60px_rgba(0,0,0,0.1)]`}
      >
        <div className={`flex flex-col md:flex-row h-full gap-8 md:gap-12 items-center`}>
          {/* Text Section */}
          <div className={`w-full md:w-[45%] flex flex-col justify-center`}>
            <div className="flex items-center gap-3 mb-4">
               <span style={{ backgroundColor: color }} className="w-3 h-3 rounded-full"></span>
               <span className="text-sm font-semibold tracking-widest uppercase text-neutral-500">Project 0{i + 1}</span>
            </div>
            <h2 className='text-neutral-900 font-bold text-4xl md:text-5xl tracking-tight leading-tight mb-6'>
              {title}
            </h2>
            <p className='text-neutral-600 text-lg md:text-xl leading-relaxed mb-8'>
              {description}
            </p>
            <a
              href={'#'}
              target='_blank'
              style={{ color }}
              className='inline-flex items-center gap-2 font-bold text-lg hover:opacity-70 transition-opacity w-fit'
            >
              <span className='border-b-2 pb-0.5 border-current'>Book a FREE Consultation</span>
              <ArrowRight size={20} />
            </a>
          </div>

          {/* Image Section */}
          <div
            className={`relative w-full md:w-[55%] h-[200px] md:h-full rounded-[24px] overflow-hidden shadow-2xl border border-white/20`}
          >
            <motion.div
              className={`w-full h-full`}
              style={{ scale: imageScale }}
            >
              <img src={url} alt={title} className='absolute inset-0 w-full h-full object-cover' />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

interface ComponentRootProps {
  projects: ProjectData[];
}

const Component = forwardRef<HTMLElement, ComponentRootProps>(({ projects }, ref) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  return (
    <ReactLenis root>
      <main className='relative w-full' ref={container}>

        <section className='text-black w-full relative z-10'>
          {projects.map((project, i) => {
            const targetScale = 1 - (projects.length - i) * 0.05;
            return (
              <Card
                key={`p_${i}`}
                i={i}
                url={project.link}
                title={project.title}
                color={project.color}
                description={project.description}
                progress={scrollYProgress}
                range={[i * 0.25, 1]}
                targetScale={targetScale}
              />
            );
          })}
        </section>
      </main>
    </ReactLenis>
  );
});

Component.displayName = 'Component';

export default Component;
