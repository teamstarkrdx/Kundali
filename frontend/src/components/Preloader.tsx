"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const scrambleWords = [
  "INITIALIZING",
  "LOADING ASSETS",
  "COMPILING",
  "RENDERING",
  "OPTIMIZING",
  "LAUNCHING",
];

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [percentage, setPercentage] = useState(0);
  const [currentWord, setCurrentWord] = useState(0);
  const preloaderRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const barsRef = useRef<HTMLDivElement>(null);

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

    // Animate loading bars
    if (barsRef.current) {
      const bars = barsRef.current.querySelectorAll('.loading-bar');
      bars.forEach((bar, i) => {
        gsap.to(bar, {
          scaleY: Math.random() * 0.5 + 0.5,
          duration: 0.3,
          repeat: -1,
          yoyo: true,
          delay: i * 0.1,
          ease: "power2.inOut",
        });
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
      {/* Grid background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(var(--line-color) 1px, transparent 1px),
            linear-gradient(90deg, var(--line-color) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }} />
      </div>

      <div className="relative flex flex-col items-center gap-6 px-4">
        {/* Audio visualizer style loader */}
        <div ref={barsRef} className="flex items-end gap-1 h-20 mb-4">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="loading-bar w-1 md:w-1.5 bg-accent origin-bottom"
              style={{ 
                height: '100%',
                opacity: 0.3 + (i % 5) * 0.15,
              }}
            />
          ))}
        </div>

        {/* Percentage display */}
        <div className="flex items-baseline gap-2">
          <span className="font-clash text-6xl md:text-8xl font-bold text-text-main">
            {percentage}
          </span>
          <span className="font-clash text-2xl md:text-3xl font-bold text-accent">%</span>
        </div>

        {/* Status text */}
        <span className="font-jetbrains text-xs text-accent tracking-[0.3em]">
          {scrambleWords[currentWord]}
        </span>

        {/* Progress bar */}
        <div className="w-48 md:w-64 h-0.5 bg-line-color overflow-hidden">
          <div 
            ref={progressRef} 
            className="h-full bg-accent"
            style={{ boxShadow: '0 0 10px var(--accent)' }}
          />
        </div>

        {/* Branding */}
        <div className="mt-6 flex flex-col items-center gap-2">
          <span className="font-clash text-lg md:text-xl font-bold text-text-main tracking-wider">
            RAJAT KURDEKAR
          </span>
          <span className="font-jetbrains text-[10px] text-text-muted tracking-widest">
            CREATIVE DEVELOPER
          </span>
        </div>
      </div>
    </div>
  );
}
