import React from "react"
import { TextGradientScroll } from "./ui/text-gradient-scroll"

function TextGradientScrollExample() {
    return (
        <div className="w-full relative bg-transparent font-sans overflow-hidden py-10 md:py-16 -mt-32 md:-mt-20 mb-8">
            <div className="flex items-center justify-center pointer-events-none z-10 relative">
                <div className="w-full max-w-5xl mx-auto p-4 flex items-center justify-center">
                    <div className="flex p-6 text-4xl md:text-6xl lg:text-[4.5rem] w-full mx-auto flex-col items-center text-center justify-center pointer-events-auto leading-[1.15] font-bold tracking-tight text-neutral-900">
                        <TextGradientScroll
                            text="Behind every successful business is a story, a vision, and a purpose. We take that vision and shape it into a brand that not only looks great, but connects, inspires, and grows."
                            className="justify-center"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export { TextGradientScrollExample }
