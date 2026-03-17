// react-spline-wrapper.tsx
// Production-ready Spline wrapper for React / Next.js
// Features: lazy loading, mobile detection, GPU check, fallback, fade-in on load
//
// Usage:
//   <SplineBackground sceneUrl="https://prod.spline.design/XXXXX/scene.splinecode" />

import React, { lazy, Suspense, useState, useEffect, useRef } from 'react';

const Spline = lazy(() => import('@splinetool/react-spline'));

interface SplineBackgroundProps {
  sceneUrl: string;
  fallbackColor?: string;
  fallbackImageUrl?: string;
  mobileBreakpoint?: number;
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  interactive?: boolean;
  onLoad?: () => void;
}

function shouldLoadSpline(mobileBreakpoint: number): boolean {
  if (typeof window === 'undefined') return false; // SSR guard

  const isMobile = window.innerWidth < mobileBreakpoint;
  const isLowEnd = navigator.hardwareConcurrency <= 2;

  // Check WebGL support
  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
  const noWebGL = !gl;

  return !isMobile && !isLowEnd && !noWebGL;
}

export default function SplineBackground({
  sceneUrl,
  fallbackColor = '#0a0a0a',
  fallbackImageUrl,
  mobileBreakpoint = 768,
  className = '',
  children,
  style = { position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' },
  interactive = false,
  onLoad: onLoadProp,
}: SplineBackgroundProps) {
  const [splineLoaded, setSplineLoaded] = useState(false);
  const [splineFailed, setSplineFailed] = useState(false);
  const [canLoad, setCanLoad] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const canLoadNow = shouldLoadSpline(mobileBreakpoint);
    setCanLoad(canLoadNow);
    if (!canLoadNow && onLoadProp) onLoadProp();
  }, [mobileBreakpoint]);

  useEffect(() => {
    if (!canLoad) return;

    // If Spline hasn't loaded after 8 seconds, show fallback
    timeoutRef.current = setTimeout(() => {
      if (!splineLoaded) {
        setSplineFailed(true);
      }
    }, 8000);

    return () => clearTimeout(timeoutRef.current);
  }, [canLoad, splineLoaded]);

  // Hack to disable WebGL-drawn Spline watermark
  function onLoad(splineApp: any) {
    clearTimeout(timeoutRef.current);
    setSplineLoaded(true);
    if (onLoadProp) onLoadProp();

    try {
      // The current (latest) Spline runtime draws the watermark as a WebGL post-processing pass.
      // We can intercept the Spline Application instance and disable the pass before it gets rendered.
      if (splineApp._renderer && splineApp._renderer.pipeline) {
        const pipeline = splineApp._renderer.pipeline;

        // Method 1: Disable the logo overlay pass completely
        if (pipeline.logoOverlayPass) {
          pipeline.logoOverlayPass.enabled = false;
        }

        // Method 2: Call the intended setWatermark method with null
        if (typeof pipeline.setWatermark === 'function') {
          pipeline.setWatermark(null);
        }
      }
    } catch (err) {
      console.warn("Could not remove Spline watermark via JS", err);
    }
  }

  const showFallback = !canLoad || splineFailed;

  return (
    <div
      className={className}
      style={style}
    >
      {/* Fallback layer — always rendered underneath */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          background: fallbackImageUrl
            ? `url(${fallbackImageUrl}) center/cover no-repeat`
            : fallbackColor,
          // Fade out once Spline loads
          opacity: splineLoaded && !showFallback ? 0 : 1,
          transition: 'opacity 0.6s ease',
        }}
      />

      {/* Spline scene — only on capable devices */}
      {canLoad && !splineFailed && (
        <Suspense fallback={null}>
          <Spline
            scene={sceneUrl}
            onLoad={onLoad}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: 0,
              // Fade in when ready
              opacity: splineLoaded ? 1 : 0,
              transition: 'opacity 0.6s ease',
              // Dynamic interaction
              pointerEvents: interactive ? 'auto' : 'none',
            }}
          />
        </Suspense>
      )}

      {/* Content sits on top of everything */}
      {children && (
        <div
          className="absolute inset-0 pointer-events-none transition-all duration-1000 ease-out"
          style={{
            zIndex: 1,
            opacity: (!canLoad || splineLoaded) ? 1 : 0,
            transform: (!canLoad || splineLoaded) ? 'translateY(0)' : 'translateY(24px)',
            transitionDelay: (splineLoaded && canLoad) ? '3.5s' : '0s'
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
}
