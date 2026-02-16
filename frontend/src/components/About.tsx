"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // Check for touch device
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const rotateX = (e.clientY - centerY) / 20;
      const rotateY = (centerX - e.clientX) / 20;

      gsap.to(card, {
        rotateX: rotateX,
        rotateY: rotateY,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);

    // Scroll animation
    const ctx = gsap.context(() => {
      gsap.from(card, {
        opacity: 0,
        y: 100,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          end: "top 30%",
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="min-h-screen py-32 px-6 md:px-12 lg:px-24 flex items-center justify-center"
      data-testid="about-section"
    >
      <div
        ref={cardRef}
        className="id-card w-full max-w-2xl bg-id-bg border border-line-color relative overflow-hidden"
        style={{ perspective: "1000px" }}
      >
        <div className="scanlines" />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent pointer-events-none" />

        {/* Header */}
        <div className="border-b border-line-color p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-accent animate-pulse" />
            <span className="font-jetbrains text-xs text-text-muted tracking-widest">
              IDENTIFICATION CARD
            </span>
          </div>
          <span className="font-jetbrains text-xs text-accent tracking-widest">
            LEVEL 5
          </span>
        </div>

        {/* Main Content */}
        <div className="p-8">
          {/* Photo and Basic Info */}
          <div className="flex gap-8 mb-8">
            <div className="w-32 h-40 bg-window-bg border border-line-color flex items-center justify-center overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-accent/20 to-transparent flex items-center justify-center">
                <span className="font-clash text-4xl font-bold text-accent">RK</span>
              </div>
            </div>

            <div className="flex-1 space-y-4">
              <div>
                <span className="font-jetbrains text-xs text-text-muted tracking-wider block mb-1">
                  OPERATIVE NAME
                </span>
                <span className="font-clash text-2xl font-bold text-text-main">
                  RAJAT KURDEKAR
                </span>
              </div>

              <div>
                <span className="font-jetbrains text-xs text-text-muted tracking-wider block mb-1">
                  ROLE DESIGNATION
                </span>
                <span className="font-satoshi text-lg text-text-main">
                  Creative Developer & UI Engineer
                </span>
              </div>
            </div>
          </div>

          {/* Info Rows */}
          <div className="space-y-4 mb-8">
            <div className="flex justify-between items-center py-3 border-b border-line-color">
              <span className="font-jetbrains text-xs text-text-muted tracking-wider">
                LOCATION
              </span>
              <span className="font-satoshi text-text-main">
                Karnataka, India
              </span>
            </div>

            <div className="flex justify-between items-center py-3 border-b border-line-color">
              <span className="font-jetbrains text-xs text-text-muted tracking-wider">
                CLEARANCE
              </span>
              <span className="font-satoshi text-accent">
                LEVEL 5
              </span>
            </div>

            <div className="flex justify-between items-center py-3 border-b border-line-color">
              <span className="font-jetbrains text-xs text-text-muted tracking-wider">
                STATUS
              </span>
              <span className="font-satoshi text-green-400">
                ACTIVE
              </span>
            </div>
          </div>

          {/* Bio */}
          <div className="mb-8">
            <span className="font-jetbrains text-xs text-text-muted tracking-wider block mb-3">
              BIO
            </span>
            <p className="font-satoshi text-sm text-text-muted leading-relaxed mb-3">
              Creative Developer focused on building high-performance interfaces powered by AI and system-level design thinking.
            </p>
            <p className="font-satoshi text-sm text-text-muted leading-relaxed">
              Specialized in React, Next.js, and advanced animation systems. Exploring automation, scripting, and cybersecurity foundations.
            </p>
          </div>

          {/* Barcode */}
          <div className="flex flex-col items-center pt-6 border-t border-line-color">
            <span className="font-barcode text-4xl text-text-main tracking-widest">
              RAJATKURDEKAR2006
            </span>
            <span className="font-jetbrains text-xs text-text-muted mt-2">
              RAJATKURDEKAR2006
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
