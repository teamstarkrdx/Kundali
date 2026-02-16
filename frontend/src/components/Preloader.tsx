"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const scrambleWords = [
  "INITIALIZING",
  "LOADING ASSETS",
  "COMPILING",
  "RENDERING",
  "OPTIMIZING",
  "FINALIZING",
];

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [percentage, setPercentage] = useState(0);
  const [currentWord, setCurrentWord] = useState(0);
  const preloaderRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scramble text animation
    const wordInterval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % scrambleWords.length);
    }, 300);

    // Faster percentage increment for quicker load
    const percentInterval = setInterval(() => {
      setPercentage((prev) => {
        const increment = Math.random() * 20 + 10;
        const newValue = Math.min(prev + increment, 100);
        return Math.round(newValue);
      });
    }, 100);

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
      // Exit animation
      setTimeout(() => {
        gsap.to(preloaderRef.current, {
          yPercent: -100,
          duration: 0.8,
          ease: "power3.inOut",
          onComplete: () => {
            onComplete();
          },
        });
      }, 500);
    }
  }, [percentage, onComplete]);

  return (
    <div
      ref={preloaderRef}
      className="preloader"
      data-testid="preloader"
    >
      <div className="flex flex-col items-center gap-6">
        <span className="font-jetbrains text-sm text-text-muted tracking-widest">
          {scrambleWords[currentWord]}
        </span>
        <span className="font-clash text-6xl md:text-8xl font-bold text-text-main">
          {percentage}%
        </span>
        <div className="preloader-bar">
          <div ref={progressRef} className="preloader-progress" />
        </div>
      </div>
    </div>
  );
}
