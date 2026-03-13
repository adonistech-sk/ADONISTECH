import React from 'react';
import { Mail, Phone, Calendar } from 'lucide-react';
import { HoverFooter } from '../components/HoverFooterDemo';
import { useScrollReveal } from '../hooks/useScrollReveal';

export function ContactPage() {
    const revealRef = useScrollReveal();

    return (
        <div ref={revealRef} className="w-full min-h-screen pt-32 pb-0 flex flex-col relative z-20">
            <section className="flex-1 px-4 md:px-8 w-full max-w-5xl mx-auto flex flex-col items-center justify-center">
                <div data-reveal className="w-full bg-white/30 backdrop-blur-xl rounded-[48px] p-8 md:p-16 text-neutral-900 flex flex-col items-center shadow-[0_8px_32px_rgba(0,0,0,0.05)] border border-white/40 relative overflow-hidden mb-20">

                    {/* Pill */}
                    <div data-reveal data-reveal-delay="100" className="border border-black/10 bg-white/40 backdrop-blur-md px-6 py-2 rounded-full text-sm font-semibold tracking-wide text-neutral-800 mb-8 relative z-10 shadow-sm">
                        Contact
                    </div>

                    {/* Heading */}
                    <h2 data-reveal data-reveal-delay="200" className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-center text-neutral-900 relative z-10">
                        Get in Touch
                    </h2>

                    {/* Subheading */}
                    <p data-reveal data-reveal-delay="300" className="text-neutral-600 text-lg md:text-xl max-w-2xl text-center mb-16 leading-relaxed relative z-10 font-medium">
                        Have a question, opportunity, or just want to talk design? I'm always open to thoughtful conversations.
                    </p>

                    {/* Icon Buttons */}
                    <div className="flex justify-center gap-8 md:gap-20 mb-20 relative z-10">
                        <a href="mailto:adonistech.sk@gmail.com" data-reveal data-reveal-delay="400" className="flex flex-col items-center gap-4 cursor-pointer group no-underline">
                            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center transition-transform group-hover:scale-[1.05] shadow-[0_8px_16px_rgba(0,0,0,0.05)] border border-black/5">
                                <Mail className="w-8 h-8 text-neutral-800" strokeWidth={2} />
                            </div>
                            <span className="text-lg font-semibold text-neutral-700 group-hover:text-black transition-colors">Mail</span>
                        </a>
                        <a href="tel:+421950280922" data-reveal data-reveal-delay="480" className="flex flex-col items-center gap-4 cursor-pointer group no-underline">
                            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center transition-transform group-hover:scale-[1.05] shadow-[0_8px_16px_rgba(0,0,0,0.05)] border border-black/5">
                                <Phone className="w-8 h-8 text-neutral-800" strokeWidth={2} />
                            </div>
                            <span className="text-lg font-semibold text-neutral-700 group-hover:text-black transition-colors">Call</span>
                        </a>
                        <div data-reveal data-reveal-delay="560" className="flex flex-col items-center gap-4 cursor-pointer group">
                            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center transition-transform group-hover:scale-[1.05] shadow-[0_8px_16px_rgba(0,0,0,0.05)] border border-black/5">
                                <Calendar className="w-8 h-8 text-neutral-800" strokeWidth={2} />
                            </div>
                            <span className="text-lg font-semibold text-neutral-700 group-hover:text-black transition-colors">Book</span>
                        </div>
                    </div>

                    {/* Form Card */}
                    <div data-reveal="scale-up" data-reveal-delay="200" className="w-full max-w-[800px] bg-white/40 backdrop-blur-md rounded-[2.5rem] p-8 md:p-14 shadow-xl border border-white/50 relative z-10">
                        <h3 className="text-2xl md:text-3xl font-bold text-center mb-10 text-neutral-900">Or shoot me a message!</h3>

                        <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-semibold text-neutral-600 ml-1">Name</label>
                                    <input
                                        type="text"
                                        placeholder="Peter Parker"
                                        className="bg-white/60 border border-black/10 rounded-2xl px-5 py-4 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#3ca2fa]/50 transition-all font-medium backdrop-blur-sm"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-semibold text-neutral-600 ml-1">Email</label>
                                    <input
                                        type="email"
                                        placeholder="peterparker@mail.com"
                                        className="bg-white/60 border border-black/10 rounded-2xl px-5 py-4 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#3ca2fa]/50 transition-all font-medium backdrop-blur-sm"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-neutral-600 ml-1">Business</label>
                                <input
                                    type="text"
                                    placeholder="Apple"
                                    className="bg-white/60 border border-black/10 rounded-2xl px-5 py-4 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#3ca2fa]/50 transition-all font-medium backdrop-blur-sm"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-neutral-600 ml-1">Message</label>
                                <textarea
                                    placeholder="Your message..."
                                    rows={5}
                                    className="bg-white/60 border border-black/10 rounded-2xl px-5 py-4 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#3ca2fa]/50 transition-all resize-none font-medium backdrop-blur-sm"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-neutral-900 text-white font-bold text-lg py-5 rounded-2xl mt-6 hover:bg-black transition-colors shadow-lg"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            <div data-reveal="fade-in">
                <HoverFooter />
            </div>
        </div>
    );
}
