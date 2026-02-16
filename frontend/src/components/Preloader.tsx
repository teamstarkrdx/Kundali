"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const scrambleWords = [
  "INITIALIZING SYSTEMS",
  "LOADING ASSETS",
  "COMPILING CODE",
  "RENDERING UI",
  "OPTIMIZING",
  "ALMOST THERE",
];

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [percentage, setPercentage] = useState(0);
  const [currentWord, setCurrentWord] = useState(0);
  const preloaderRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const spinnerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scramble text animation
    const wordInterval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % scrambleWords.length);
    }, 300);

    // Faster percentage increment
    const percentInterval = setInterval(() => {
      setPercentage((prev) => {
        const increment = Math.random() * 20 + 10;
        const newValue = Math.min(prev + increment, 100);
        return Math.round(newValue);
      });
    }, 100);

    // Spinner animation
    if (spinnerRef.current) {
      gsap.to(spinnerRef.current, {
        rotation: 360,
        duration: 1,
        repeat: -1,
        ease: "linear",
      });
    }

    return () => {
      clearInterval(wordInterval);
      clearInterval(percentInterval);
    };
  }, []);

  useEffect(() => {
    if (progressRef.current) {
      gsap.to(progressRef.current, {
        width: `${percentage}%`,
        duration: 0.2,
        ease: "power2.out",
      });
    }

    if (percentage >= 100) {
      setTimeout(() => {
        gsap.to(preloaderRef.current, {
          yPercent: -100,
          duration: 0.6,
          ease: "power3.inOut",
          onComplete: () => {
            onComplete();
          },
        });
      }, 300);
    }
  }, [percentage, onComplete]);

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 bg-bg z-[10001] flex flex-col items-center justify-center"
      data-testid="preloader"
    >
      {/* Animated circles background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full border border-line-color opacity-20 animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full border border-accent/20 animate-ping" style={{ animationDuration: '3s' }} />
      </div>

      <div className="relative flex flex-col items-center gap-8">
        {/* Spinning ring loader */}
        <div className="relative w-32 h-32">
          <div 
            ref={spinnerRef}
            className="absolute inset-0 rounded-full border-2 border-transparent border-t-accent border-r-accent/50"
          />
          <div className="absolute inset-2 rounded-full border border-line-color" />
          <div className="absolute inset-4 rounded-full bg-window-bg flex items-center justify-center">
            <span className="font-clash text-2xl font-bold text-accent">
              {percentage}
            </span>
          </div>
        </div>

        {/* Status text */}
        <div className="flex flex-col items-center gap-2">
          <span className="font-jetbrains text-xs text-accent tracking-[0.3em]">
            {scrambleWords[currentWord]}
          </span>
        </div>

        {/* Progress bar - pill shaped */}
        <div className="w-64 h-2 bg-window-bg rounded-full overflow-hidden">
          <div 
            ref={progressRef} 
            className="h-full bg-gradient-to-r from-accent to-accent/70 rounded-full transition-all"
            style={{ boxShadow: '0 0 20px var(--accent-glow)' }}
          />
        </div>

        {/* Branding */}
        <div className="mt-8 flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="font-clash text-sm text-text-muted tracking-wider">
            RAJAT KURDEKAR
          </span>
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
        </div>
      </div>
    </div>
  );
}
