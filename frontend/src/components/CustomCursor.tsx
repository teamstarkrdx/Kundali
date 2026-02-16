"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    
    const dot = dotRef.current;
    const follower = followerRef.current;
    const particlesContainer = particlesRef.current;

    if (!particlesContainer) return;

    // Create particles on click/touch
    const createParticles = (e: MouseEvent | TouchEvent) => {
      const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const y = 'touches' in e ? e.touches[0].clientY : e.clientY;

      // Create multiple particles
      for (let i = 0; i < 12; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particlesContainer.appendChild(particle);

        const angle = (i / 12) * Math.PI * 2;
        const velocity = 50 + Math.random() * 80;
        const targetX = Math.cos(angle) * velocity;
        const targetY = Math.sin(angle) * velocity;

        gsap.fromTo(particle, 
          { 
            scale: 1, 
            opacity: 1,
            x: 0,
            y: 0,
          },
          { 
            scale: 0,
            opacity: 0,
            x: targetX,
            y: targetY,
            duration: 0.6 + Math.random() * 0.3,
            ease: "power2.out",
            onComplete: () => particle.remove()
          }
        );
      }

      // Create expanding ring
      const ring = document.createElement('div');
      ring.className = 'touch-ring';
      ring.style.left = `${x}px`;
      ring.style.top = `${y}px`;
      particlesContainer.appendChild(ring);

      gsap.fromTo(ring,
        { scale: 0, opacity: 0.8 },
        { 
          scale: 2.5, 
          opacity: 0, 
          duration: 0.8,
          ease: "power2.out",
          onComplete: () => ring.remove()
        }
      );
    };

    // Desktop cursor
    if (!isTouchDevice && dot && follower) {
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

      window.addEventListener("mousemove", moveCursor);
      window.addEventListener("click", createParticles);

      return () => {
        window.removeEventListener("mousemove", moveCursor);
        window.removeEventListener("click", createParticles);
      };
    } else {
      // Mobile touch effects
      window.addEventListener("touchstart", createParticles);
      
      return () => {
        window.removeEventListener("touchstart", createParticles);
      };
    }
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot hidden md:block" />
      <div ref={followerRef} className="cursor-follower hidden md:block" />
      <div ref={particlesRef} className="particles-container" />
    </>
  );
}
