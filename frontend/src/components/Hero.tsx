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
      className="min-h-screen flex flex-col justify-center px-4 md:px-12 lg:px-24 pt-24 md:pt-32"
      data-testid="hero-section"
    >
      <div className="max-w-7xl w-full">
        <div className="overflow-hidden">
          <h1
            ref={heading1Ref}
            className="font-clash text-[14vw] md:text-[10vw] lg:text-[8vw] font-bold leading-[0.9] text-text-main"
          >
            Rajat
          </h1>
        </div>
        
        <div className="overflow-hidden">
          <h1
            ref={heading2Ref}
            className="font-clash text-[14vw] md:text-[10vw] lg:text-[8vw] font-bold leading-[0.9] text-outline cursor-pointer"
          >
            Kurdekar
          </h1>
        </div>
        
        <div className="overflow-hidden mt-3 md:mt-4">
          <h2
            ref={heading3Ref}
            className="font-satoshi text-base md:text-2xl lg:text-3xl text-text-muted"
          >
            Creative Developer & UI Engineer
          </h2>
        </div>

        <div className="w-20 md:w-32 h-1 bg-accent mt-4 md:mt-6" />

        <div className="flex flex-col sm:flex-row gap-3 md:gap-6 mt-8 md:mt-16">
          <div className="hero-stat px-4 md:px-6 py-3 md:py-4 rounded-full border border-line-color bg-window-bg/50 backdrop-blur-sm">
            <span className="font-jetbrains text-[10px] md:text-xs text-text-muted tracking-wider">LOCATION:</span>
            <span className="font-satoshi text-sm md:text-lg text-text-main ml-2 md:ml-3">Karnataka, India</span>
          </div>
          
          <div className="hero-stat px-4 md:px-6 py-3 md:py-4 rounded-full border border-accent/30 bg-accent/5 backdrop-blur-sm">
            <span className="font-jetbrains text-[10px] md:text-xs text-text-muted tracking-wider">STATUS:</span>
            <span className="font-satoshi text-sm md:text-lg text-green-400 ml-2 md:ml-3">ACTIVE</span>
          </div>
        </div>
      </div>
    </section>
  );
}
