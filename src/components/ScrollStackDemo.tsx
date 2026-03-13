import React from 'react';
import ScrollStack, { ScrollStackItem } from './ui/scroll-stack';
import { AlignLeft, Play, LayoutGrid } from 'lucide-react';

export function ScrollStackDemo() {
  return (
    <div className="w-full h-screen bg-black relative z-20">
      <ScrollStack
        useWindowScroll={false}
        itemDistance={0}
        itemScale={0.03}
        itemStackDistance={40}
        stackPosition="15%"
        scaleEndPosition="5%"
        blurAmount={0}
        baseScale={0.9}
        className="w-full h-full pb-24"
      >
        <ScrollStackItem itemClassName="rounded-[32px] overflow-hidden shadow-2xl relative w-[90vw] md:w-[60vw] max-w-4xl aspect-[16/9] md:aspect-[2/1] bg-[#5a3cf3] text-white flex flex-row items-center justify-between p-8 md:p-16 mx-auto mt-24">
          <h3 className="text-4xl md:text-6xl font-bold font-sans">Text Animations</h3>
          <div className="w-32 h-32 md:w-48 md:h-48 border-4 border-white rounded-[2rem] flex items-center justify-center">
            <AlignLeft className="w-16 h-16 md:w-24 md:h-24 text-white p-2" strokeWidth={3} />
          </div>
        </ScrollStackItem>

        <ScrollStackItem itemClassName="rounded-[32px] overflow-hidden shadow-2xl relative w-[90vw] md:w-[60vw] max-w-4xl aspect-[16/9] md:aspect-[2/1] bg-[#e11d95] text-white flex flex-row items-center justify-between p-8 md:p-16 mx-auto mt-24">
          <h3 className="text-4xl md:text-6xl font-bold font-sans">Animations</h3>
          <div className="w-32 h-32 md:w-48 md:h-48 border-4 border-white rounded-[2rem] flex items-center justify-center">
            <Play className="w-16 h-16 md:w-24 md:h-24 text-white ml-2" strokeWidth={2} />
          </div>
        </ScrollStackItem>

        <ScrollStackItem itemClassName="rounded-[32px] overflow-hidden shadow-2xl relative w-[90vw] md:w-[60vw] max-w-4xl aspect-[16/9] md:aspect-[2/1] bg-[#5833ff] text-white flex flex-row items-center justify-between p-8 md:p-16 mx-auto mt-24">
          <h3 className="text-4xl md:text-6xl font-bold font-sans">Components</h3>
          <div className="w-32 h-32 md:w-48 md:h-48 border-4 border-white rounded-[2rem] flex pl-[0.1rem] pt-[0.1rem] items-center justify-center">
             <LayoutGrid className="w-16 h-16 md:w-20 md:h-20 text-white transform rotate-45" strokeWidth={4} />
          </div>
        </ScrollStackItem>
      </ScrollStack>
    </div>
  );
}
