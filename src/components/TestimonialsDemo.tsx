import React from "react";
import { TestimonialsColumn } from "./ui/testimonials-columns-1";
import { motion } from "motion/react";

const testimonials = [
    {
        text: "Working with this process was effortless. I absolutely recommend him to anyone looking for a talented and reliable web developer.",
        image: "https://ridbtuorcmkjidenxudx.supabase.co/storage/v1/object/public/Public%20main/client-2.webp",
        name: "Mark Williams",
        role: "Technology",
    },
    {
        text: "Collaborating with Samuel on this project was seamless. The vision was clearly understood, and the designs genuinely reflect my brand identity",
        image: "https://ridbtuorcmkjidenxudx.supabase.co/storage/v1/object/public/Public%20main/client-1.webp",
        name: "Daniel Bittner",
        role: "Education",
    },
    {
        text: "They delivered a modern, clean design and everything works smoothly.",
        image: "https://ridbtuorcmkjidenxudx.supabase.co/storage/v1/object/public/Public%20main/Gemini_Generated_Image_uhynnmuhynnmuhyn.webp",
        name: "Simon Malik",
        role: "Visual Designer",
    },
    {
        text: "He completely transformed our website. It’s faster, cleaner, and converting better than ever. Highly recommend.",
        image: "https://ridbtuorcmkjidenxudx.supabase.co/storage/v1/object/public/Public%20main/client-3.webp",
        name: "Sarah S. Clair",
        role: "Creative Director",
    },
    {
        text: "Its robust features and incredibly smooth animations have transformed our digital footprint and branding.",
        image: "https://ridbtuorcmkjidenxudx.supabase.co/storage/v1/object/public/Public%20main/Gemini_Generated_Image_1fknr81fknr81fkn.webp",
        name: "Filip Semanto",
        role: "Project Manager",
    },
    {
        text: "He built our mobile app exactly how we envisioned it, even better. Communication was excellent throughout the entire project, and deadlines were always met.",
        image: "https://ridbtuorcmkjidenxudx.supabase.co/storage/v1/object/public/Public%20main/client-4.webp",
        name: "Roman Kašák",
        role: "Mobile App",
    },
    {
        text: "Our business functions improved with a gorgeous visual design and extremely positive customer feedback from users.",
        image: "https://ridbtuorcmkjidenxudx.supabase.co/storage/v1/object/public/Public%20main/Gemini_Generated_Image_vmxd7pvmxd7pvmxd.webp",
        name: "Helena Adamcová",
        role: "Coffe Owner",
    },
    {
        text: "They delivered a digital experience that exceeded expectations, understanding our brand and enhancing our operations.",
        image: "https://ridbtuorcmkjidenxudx.supabase.co/storage/v1/object/public/Public%20main/Gemini_Generated_Image_rd0nq8rd0nq8rd0n.webp",
        name: "Petra Tyle",
        role: "Sales Manager",
    },
    {
        text: "We’re so happy with the website he created for us. There were a couple of small tweaks along the way, but he handled them quickly and professionally.",
        image: "https://ridbtuorcmkjidenxudx.supabase.co/storage/v1/object/public/Public%20main/client-5.webp",
        name: "P & J Macháč",
        role: "Real Estate Developers",
    },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

export const TestimonialsDemo = () => {
    return (
        <section className="bg-transparent my-20 relative font-sans overflow-hidden py-10">
            <div className="container z-10 mx-auto px-4 md:px-8 max-w-7xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center justify-center max-w-[540px] mx-auto"
                >
                    <div className="flex justify-center">
                        <div className="border border-black/10 py-1 px-4 rounded-full bg-white/30 backdrop-blur-md text-sm font-semibold text-black tracking-wide uppercase">
                            Partners
                        </div>
                    </div>

                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] leading-tight font-bold tracking-tight text-black text-center mt-6">
                        Trusted by the best
                    </h2>
                    <p className="text-center mt-5 text-black/60 text-lg max-w-md mx-auto">
                        Discover how our digital experiences are driving real impact for industry leaders worldwide.
                    </p>
                </motion.div>

                <div className="flex justify-center gap-6 mt-14 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] max-h-[800px] overflow-hidden">
                    <TestimonialsColumn testimonials={firstColumn} duration={15} />
                    <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
                    <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
                </div>
            </div>
        </section>
    );
};
