import React from 'react';
import { Mail, Phone, Calendar } from 'lucide-react';

export function ContactSection() {
    return (
        <section className="py-24 px-4 md:px-8 w-full max-w-7xl mx-auto relative z-20">
            <div className="bg-[#0b0f19] rounded-[48px] p-8 md:p-20 text-white flex flex-col items-center shadow-2xl relative overflow-hidden">
                {/* Subtle top glow to make it blend slightly with the environment */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[200px] bg-blue-500/10 blur-[100px] pointer-events-none rounded-full"></div>

                {/* Pill */}
                <div className="border border-white/10 bg-white/5 backdrop-blur-md px-6 py-2 rounded-full text-sm font-medium tracking-wide text-gray-300 mb-8 relative z-10">
                    Contact
                </div>

                {/* Heading */}
                <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-center text-white relative z-10">
                    Get in Touch
                </h2>

                {/* Subheading */}
                <p className="text-gray-400 text-lg md:text-xl max-w-2xl text-center mb-16 leading-relaxed relative z-10">
                    Have a question, opportunity, or just want to talk design? I'm always open to thoughtful conversations.
                </p>

                {/* Icon Buttons */}
                <div className="flex justify-center gap-8 md:gap-20 mb-20 relative z-10">
                    <div className="flex flex-col items-center gap-4 cursor-pointer group">
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center transition-transform group-hover:scale-[1.05] shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                            <Mail className="w-8 h-8 text-[#0b0f19]" strokeWidth={2} />
                        </div>
                        <span className="text-lg font-semibold text-white group-hover:text-gray-300 transition-colors">Mail</span>
                    </div>
                    <div className="flex flex-col items-center gap-4 cursor-pointer group">
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center transition-transform group-hover:scale-[1.05] shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                            <Phone className="w-8 h-8 text-[#0b0f19]" strokeWidth={2} />
                        </div>
                        <span className="text-lg font-semibold text-white group-hover:text-gray-300 transition-colors">Call</span>
                    </div>
                    <div className="flex flex-col items-center gap-4 cursor-pointer group">
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center transition-transform group-hover:scale-[1.05] shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                            <Calendar className="w-8 h-8 text-[#0b0f19]" strokeWidth={2} />
                        </div>
                        <span className="text-lg font-semibold text-white group-hover:text-gray-300 transition-colors">Book</span>
                    </div>
                </div>

                {/* Form Card */}
                <div className="w-full max-w-[800px] bg-[#161b24] rounded-[2.5rem] p-8 md:p-14 shadow-2xl border border-white/5 relative z-10">
                    <h3 className="text-2xl md:text-3xl font-bold text-center mb-10 text-white">Or shoot me a message!</h3>

                    <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-gray-400 ml-1">Name</label>
                                <input
                                    type="text"
                                    placeholder="Peter Parker"
                                    className="bg-[#1d2331] border border-white/5 rounded-2xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all font-medium"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-gray-400 ml-1">Email</label>
                                <input
                                    type="email"
                                    placeholder="peterparker@mail.com"
                                    className="bg-[#1d2331] border border-white/5 rounded-2xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all font-medium"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-gray-400 ml-1">Business</label>
                            <input
                                type="text"
                                placeholder="Apple"
                                className="bg-[#1d2331] border border-white/5 rounded-2xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all font-medium"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-gray-400 ml-1">Message</label>
                            <textarea
                                placeholder="Your message..."
                                rows={5}
                                className="bg-[#1d2331] border border-white/5 rounded-2xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all resize-none font-medium"
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-white text-black font-bold text-lg py-5 rounded-2xl mt-6 hover:bg-gray-100 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.05)]"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}
