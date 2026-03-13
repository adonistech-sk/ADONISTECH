"use client";
import React from "react";
import { ContainerScroll } from "./ui/container-scroll-animation";
import { BlurIn } from "./ui/blur-in";

export function HeroScrollDemo() {
    return (
        <div className="flex flex-col bg-transparent overflow-hidden py-10">
            <ContainerScroll
                titleComponent={
                    <BlurIn
                        word="Recent Projects"
                        className="text-neutral-900 mb-4 px-4"
                    />
                }
            >
                <img
                    src="https://ridbtuorcmkjidenxudx.supabase.co/storage/v1/object/public/Public%20main/Gemini_Generated_Image_h1twhih1twhih1tw.webp"
                    alt="hero"
                    className="mx-auto rounded-2xl object-cover h-full w-full object-center"
                    draggable={false}
                />
            </ContainerScroll>
        </div>
    );
}
