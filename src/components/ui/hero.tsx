import React from "react";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <div
      className="w-full h-full text-white font-sans flex flex-col relative overflow-hidden"
      style={{ background: 'radial-gradient(125% 125% at 50% 10%, #000 40%, #63e 100%)' }}
    >
      {/* Dark overlay circle shape for depth */}
      <div
        className="absolute z-[1]"
        style={{
          width: '60%',
          height: '40%',
          top: '10%',
          left: '50%',
          transform: 'translateX(-50%)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(10,0,20,0.5) 30%, transparent 70%)',
        }}
      />

      {/* Content */}
      <div className="flex flex-col flex-1 px-5 pb-6" style={{ paddingTop: 'clamp(70px, 16svh, 120px)' }}>

        {/* Main heading — bold rounded serif, svh-based size */}
        <h1
          className="leading-[0.92] tracking-tight text-white"
          style={{
            fontSize: 'clamp(48px, 10svh, 80px)',
            fontFamily: '"Fraunces", serif',
            fontWeight: 900,
          }}
        >
          <span className="block">Design</span>
          <span className="block">That</span>
          <span className="block">Breaks</span>
          <span className="block">Limits</span>
        </h1>

        {/* Description */}
        <p
          className="text-white/80 leading-relaxed"
          style={{
            marginTop: 'clamp(14px, 3svh, 28px)',
            fontSize: 'clamp(14px, 2.2svh, 18px)',
            maxWidth: '90%',
          }}
        >
          We design and develop{' '}
          <span className="font-bold text-white">websites, apps and digital experiences</span>,
          {' '}that help businesses grow faster.
        </p>

        {/* CTA Button */}
        <div style={{ marginTop: 'clamp(16px, 3.5svh, 32px)' }}>
          <a
            href="/contact"
            className="group inline-flex items-center justify-center gap-3 rounded-full bg-white font-bold text-black transition-all hover:scale-[1.02] active:scale-[0.98] w-full shadow-xl"
            style={{
              padding: 'clamp(14px, 2.8svh, 20px) 24px',
              fontSize: 'clamp(15px, 2.2svh, 18px)',
            }}
          >
            Start a Project
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

      </div>
    </div>
  );
}
