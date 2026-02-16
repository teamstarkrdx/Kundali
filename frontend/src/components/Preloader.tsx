"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const loadingTexts = [
  "LOADING SHADERS",
  "COMPILING ASSETS",
  "INITIALIZING UI",
  "LOADING MODULES",
  "RENDERING",
  "READY",
];

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [percentage, setPercentage] = useState(0);
  const [currentText, setCurrentText] = useState(0);
  const preloaderRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Text animation
    const textInterval = setInterval(() => {
      setCurrentText((prev) => Math.min(prev + 1, loadingTexts.length - 1));
    }, 400);

    // Percentage increment
    const percentInterval = setInterval(() => {
      setPercentage((prev) => {
        const increment = Math.random() * 15 + 8;
        const newValue = Math.min(prev + increment, 100);
        return Math.round(newValue);
      });
    }, 120);

    return () => {
      clearInterval(textInterval);
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
      }, 400);
    }
  }, [percentage, onComplete]);

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 bg-bg z-[10001] flex flex-col"
      data-testid="preloader"
    >
      {/* Top left - Loading text */}
      <div className="absolute top-6 md:top-12 left-4 md:left-12">
        <span className="font-clash text-lg md:text-2xl font-bold text-accent tracking-wider">
          {loadingTexts[currentText]}
        </span>
      </div>

      {/* Center - empty black space */}
      <div className="flex-1" />

      {/* Bottom section */}
      <div className="px-4 md:px-12 pb-8 md:pb-12">
        {/* System check text and percentage */}
        <div className="flex items-end justify-between mb-3">
          <span className="font-jetbrains text-sm md:text-base text-accent tracking-wider">
            SYSTEM CHECK // V.14.0
          </span>
          <span className="font-clash text-6xl md:text-8xl lg:text-9xl font-bold text-accent leading-none">
            {percentage}%
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full h-1 bg-line-color overflow-hidden">
          <div 
            ref={progressRef} 
            className="h-full bg-accent"
            style={{ boxShadow: '0 0 10px var(--accent)' }}
          />
        </div>
      </div>
    </div>
  );
}
