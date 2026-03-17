'use client';
import React from 'react';

const isMobileDevice = typeof window !== 'undefined' && window.innerWidth < 768;

export function useScroll(threshold: number) {
	const [scrolled, setScrolled] = React.useState(false);
	const scrolledRef = React.useRef(false);

	const onScroll = React.useCallback(() => {
		if (isMobileDevice) {
			// Mobile: only setState when value actually changes to reduce re-renders
			const isScrolled = window.scrollY > threshold;
			if (isScrolled !== scrolledRef.current) {
				scrolledRef.current = isScrolled;
				setScrolled(isScrolled);
			}
		} else {
			// Desktop: original behavior
			setScrolled(window.scrollY > threshold);
		}
	}, [threshold]);

	React.useEffect(() => {
		// Mobile gets passive flag for smoother scroll compositing
		window.addEventListener('scroll', onScroll, isMobileDevice ? { passive: true } : undefined);
		return () => window.removeEventListener('scroll', onScroll);
	}, [onScroll]);

	React.useEffect(() => {
		onScroll();
	}, [onScroll]);

	return scrolled;
}
