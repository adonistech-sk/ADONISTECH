import { useEffect, useRef, useCallback } from 'react';

const _isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

interface ScrollRevealOptions {
    threshold?: number;
    rootMargin?: string;
    staggerDelay?: number;
    once?: boolean;
}

/**
 * A reusable hook that uses Intersection Observer to animate elements
 * into view as they enter the viewport. Apply `data-reveal` to any
 * element you want animated. Use `data-reveal-delay="N"` (in ms)
 * for custom stagger delays.
 *
 * Elements inside the container with `data-reveal` will get the
 * `.revealed` class added when they scroll into view.
 */
export function useScrollReveal(options: ScrollRevealOptions = {}, deps: any[] = []) {
    const {
        threshold = 0.15,
        rootMargin = '0px 0px -60px 0px',
        once = true,
    } = options;

    const containerRef = useRef<HTMLDivElement>(null);

    const observe = useCallback(() => {
        if (!containerRef.current) return;

        const elements = containerRef.current.querySelectorAll('[data-reveal]:not(.revealed)');

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const el = entry.target as HTMLElement;
                        // Apply stagger delay if specified
                        const delay = el.getAttribute('data-reveal-delay');
                        if (delay) {
                            el.style.transitionDelay = `${delay}ms`;
                        }
                        el.classList.add('revealed');
                        if (once) observer.unobserve(el);
                    }
                });
            },
            { threshold, rootMargin }
        );

        elements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, [threshold, rootMargin, once]);

    useEffect(() => {
        if (_isMobile) {
            // Mobile: double-RAF fires after layout+paint (~32ms instead of 200ms)
            let cancelled = false;
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    if (!cancelled) observe();
                });
            });
            return () => { cancelled = true; };
        } else {
            // Desktop: original 200ms delay
            const timeout = setTimeout(observe, 200);
            return () => clearTimeout(timeout);
        }
    }, [observe, ...deps]);

    return containerRef;
}

/**
 * Helper to generate stagger delay attributes for mapped children.
 * Usage: <div {...staggerProps(index)} data-reveal>...</div>
 */
export function staggerProps(index: number, baseDelay = 0, increment = 80) {
    return {
        'data-reveal': true,
        'data-reveal-delay': String(baseDelay + index * increment),
    };
}
