"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heading1Ref = useRef<HTMLHeadingElement>(null);
  const heading2Ref = useRef<HTMLHeadingElement>(null);
  const heading3Ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Split text for character animations
      if (heading1Ref.current) {
        const split1 = new SplitType(heading1Ref.current, { types: "chars" });
        gsap.from(split1.chars, {
          opacity: 0,
          y: 100,
          rotateX: -90,
          stagger: 0.05,
          duration: 1,
          ease: "power4.out",
          delay: 0.2,
        });
      }

      if (heading2Ref.current) {
        const split2 = new SplitType(heading2Ref.current, { types: "chars" });
        gsap.from(split2.chars, {
          opacity: 0,
          y: 100,
          rotateX: -90,
          stagger: 0.05,
          duration: 1,
          ease: "power4.out",
          delay: 0.5,
        });
      }

      if (heading3Ref.current) {
        const split3 = new SplitType(heading3Ref.current, { types: "chars" });
        gsap.from(split3.chars, {
          opacity: 0,
          y: 50,
          stagger: 0.02,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.9,
        });
      }

      // Animate stat boxes
      gsap.from(".hero-stat", {
        opacity: 0,
        y: 30,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out",
        delay: 1.2,
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 pt-32"
      data-testid="hero-section"
    >
      <div className="max-w-7xl">
        <div className="overflow-hidden">
          <h1
            ref={heading1Ref}
            className="font-clash text-[12vw] md:text-[10vw] lg:text-[8vw] font-bold leading-none text-text-main"
          >
            Rajat
          </h1>
        </div>
        
        <div className="overflow-hidden">
          <h1
            ref={heading2Ref}
            className="font-clash text-[12vw] md:text-[10vw] lg:text-[8vw] font-bold leading-none text-outline cursor-pointer"
          >
            Kurdekar
          </h1>
        </div>
        
        <div className="overflow-hidden mt-4">
          <h2
            ref={heading3Ref}
            className="font-satoshi text-xl md:text-2xl lg:text-3xl text-text-muted"
          >
            Creative Developer & UI Engineer
          </h2>
        </div>

        <div className="w-32 h-1 bg-accent mt-6 origin-left" style={{ transform: "scaleX(1)" }} />

        <div className="flex flex-wrap gap-8 mt-16">
          <div className="hero-stat border border-line-color px-6 py-4">
            <span className="font-jetbrains text-xs text-text-muted tracking-wider block mb-1">LOC:</span>
            <span className="font-satoshi text-lg text-text-main">Karnataka, India</span>
          </div>
          
          <div className="hero-stat border border-line-color px-6 py-4">
            <span className="font-jetbrains text-xs text-text-muted tracking-wider block mb-1">STAT:</span>
            <span className="font-satoshi text-lg text-accent">AVAILABLE</span>
          </div>
        </div>
      </div>
    </section>
  );
}
