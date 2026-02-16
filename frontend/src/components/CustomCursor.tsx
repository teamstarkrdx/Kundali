"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const rippleContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check for touch device
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice) return;

    const dot = dotRef.current;
    const follower = followerRef.current;
    const rippleContainer = rippleContainerRef.current;

    if (!dot || !follower || !rippleContainer) return;

    const moveCursor = (e: MouseEvent) => {
      gsap.to(dot, {
        x: e.clientX - 4,
        y: e.clientY - 4,
        duration: 0.1,
      });

      gsap.to(follower, {
        x: e.clientX - 20,
        y: e.clientY - 20,
        duration: 0.3,
      });
    };

    // Touch/click ripple effect
    const createRipple = (e: MouseEvent | TouchEvent) => {
      const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const y = 'touches' in e ? e.touches[0].clientY : e.clientY;

      const ripple = document.createElement('div');
      ripple.className = 'touch-ripple';
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      rippleContainer.appendChild(ripple);

      gsap.fromTo(ripple, 
        { scale: 0, opacity: 0.5 },
        { 
          scale: 2, 
          opacity: 0, 
          duration: 0.6, 
          ease: "power2.out",
          onComplete: () => ripple.remove()
        }
      );
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("click", createRipple);
    window.addEventListener("touchstart", createRipple);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("click", createRipple);
      window.removeEventListener("touchstart", createRipple);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={followerRef} className="cursor-follower" />
      <div ref={rippleContainerRef} className="ripple-container" />
    </>
  );
}
