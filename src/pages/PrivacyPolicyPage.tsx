import React from 'react';
import { HoverFooter } from '../components/HoverFooterDemo';
import { useScrollReveal } from '../hooks/useScrollReveal';

const sections = [
    {
        title: '1. Information We Collect',
        content: `We may collect personal information that you voluntarily provide when you contact us, submit a project inquiry, or interact with our website. This includes your name, email address, phone number, company name, and any message content you choose to share. We also collect non-personal usage data such as browser type, pages visited, and time spent on the site through standard analytics tools.`,
    },
    {
        title: '2. How We Use Your Information',
        content: `We use the information we collect to respond to your inquiries and project requests, provide our web development and digital agency services, send relevant updates or follow-up communications, and improve the performance and content of our website. We do not sell, rent, or share your personal data with third parties for marketing purposes.`,
    },
    {
        title: '3. Cookies & Tracking Technologies',
        content: `Our website may use cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, and understand user behavior. You can choose to disable cookies through your browser settings, though some features of our site may not function correctly as a result.`,
    },
    {
        title: '4. Data Security',
        content: `We take reasonable precautions to protect your personal information from unauthorized access, misuse, or disclosure. Our website uses SSL encryption to secure data transmission. However, please note that no method of internet transmission is completely secure, and we cannot guarantee absolute security.`,
    },
    {
        title: '5. Third-Party Services',
        content: `We may use trusted third-party services — such as email providers, analytics platforms, or hosting services — that may process your data on our behalf. These services are bound by their own privacy policies and are not permitted to use your data for any purpose other than providing services to us.`,
    },
    {
        title: '6. Your Rights',
        content: `You have the right to request access to, correction of, or deletion of any personal data we hold about you. To exercise these rights, please contact us directly. We will respond to all valid requests within a reasonable timeframe and in accordance with applicable data protection laws.`,
    },
    {
        title: '7. Children\'s Privacy',
        content: `Our services are not directed at individuals under the age of 16. We do not knowingly collect personal information from children. If we become aware that we have inadvertently collected personal data from a minor, we will take steps to delete that information promptly.`,
    },
    {
        title: '8. Changes to This Policy',
        content: `We reserve the right to update or modify this Privacy Policy at any time. Any changes will be reflected on this page with an updated effective date. We encourage you to review this policy periodically to stay informed about how we are protecting your information.`,
    },
    {
        title: '9. Contact Us',
        content: `If you have any questions, concerns, or requests regarding this Privacy Policy, please reach out to us at adonistech.sk@gmail.com or call us at +421 950 280 922. We are committed to addressing your concerns promptly and transparently.`,
    },
];

export function PrivacyPolicyPage() {
    const revealRef = useScrollReveal({ threshold: 0.05, rootMargin: '0px' });

    return (
        <div ref={revealRef} className="w-full min-h-screen pt-32 pb-0 flex flex-col relative z-20">
            <section className="flex-1 px-4 md:px-8 w-full max-w-5xl mx-auto flex flex-col">

                {/* Hero Card */}
                <div data-reveal className="w-full bg-white/30 backdrop-blur-xl rounded-[48px] p-8 md:p-16 text-neutral-900 flex flex-col items-center shadow-[0_8px_32px_rgba(0,0,0,0.05)] border border-white/40 relative overflow-hidden mb-12">

                    {/* Pill */}
                    <div data-reveal data-reveal-delay="100" className="border border-black/10 bg-white/40 backdrop-blur-md px-6 py-2 rounded-full text-sm font-semibold tracking-wide text-neutral-800 mb-8 relative z-10 shadow-sm">
                        Legal
                    </div>

                    {/* Heading */}
                    <h1 data-reveal data-reveal-delay="200" className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-center text-neutral-900 relative z-10">
                        Privacy Policy
                    </h1>

                    {/* Subheading */}
                    <p data-reveal data-reveal-delay="300" className="text-neutral-600 text-lg md:text-xl max-w-2xl text-center mb-4 leading-relaxed relative z-10 font-medium tracking-tight">
                        Your privacy matters to us. This policy outlines how <span className="text-neutral-900 font-bold">Adonis</span> collects, uses, and protects your information.
                    </p>

                    <p data-reveal data-reveal-delay="350" className="text-neutral-400 text-sm relative z-10">
                        Effective date: March 13, 2026
                    </p>
                </div>

                {/* Policy Sections */}
                <div className="flex flex-col gap-6 mb-20">
                    {sections.map((section, i) => (
                        <div
                            key={section.title}
                            data-reveal
                            data-reveal-delay={`${i * 40}`}
                            className="w-full bg-white/30 backdrop-blur-xl rounded-[32px] p-8 md:p-12 border border-white/40 shadow-[0_4px_24px_rgba(0,0,0,0.04)]"
                        >
                            <h2 className="text-xl md:text-2xl font-bold text-neutral-900 mb-4 tracking-tight">
                                {section.title}
                            </h2>
                            <p className="text-neutral-600 text-base md:text-lg leading-relaxed">
                                {section.content}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            <div data-reveal="fade-in">
                <HoverFooter />
            </div>
        </div>
    );
}
