"use client";
import React from "react";
import { ContainerScroll } from "./ui/container-scroll-animation";
import { BlurIn } from "./ui/blur-in";

export function HeroScrollDemo() {
    return (
        <div className="flex flex-col bg-transparent overflow-hidden py-10">
            <ContainerScroll
                titleComponent={null}
            >
                <img
                    src="https://ridbtuorcmkjidenxudx.supabase.co/storage/v1/object/public/Public%20main/Gemini_Generated_Image_j9nzy4j9nzy4j9nzbfd-Photoroom.webp"
                    alt="hero"
                    className="mx-auto rounded-2xl object-contain md:object-cover h-full w-full object-center"
                    draggable={false}
                />
            </ContainerScroll>
        </div>
    );
}
