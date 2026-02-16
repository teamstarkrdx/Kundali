"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const techStack = [
  "React",
  "Next.js",
  "GSAP",
  "Tailwind",
  "TypeScript",
  "Node.js",
  "MongoDB",
  "Firebase",
  "Docker",
  "AWS",
  "Figma",
  "Python",
  "Three.js",
];

export default function Arsenal() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".arsenal-title", {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Double the array for seamless infinite scroll
  const doubledStack = [...techStack, ...techStack];

  return (
    <section
      ref={sectionRef}
      id="arsenal"
      className="py-32 overflow-hidden"
      data-testid="arsenal-section"
    >
      <div className="px-6 md:px-12 lg:px-24 mb-16">
        <span className="font-jetbrains text-xs text-accent tracking-widest px-4 py-2 rounded-full border border-accent/30 inline-block mb-6">
          03 // SYSTEM ARSENAL
        </span>
        <h2 className="arsenal-title font-clash text-5xl md:text-7xl font-bold text-text-main">
          Tools & Technologies
        </h2>
      </div>

      {/* Stream 1 - Left direction - Pill style */}
      <div className="mb-6 overflow-hidden">
        <div className="flex gap-4 stream-left" style={{ width: "max-content" }}>
          {doubledStack.map((tech, index) => (
            <div
              key={`stream1-${index}`}
              className="arsenal-pill px-8 py-4 rounded-full border border-line-color bg-window-bg/30 whitespace-nowrap hover:border-accent hover:bg-accent/5 transition-all duration-300 group"
            >
              <span className="font-satoshi text-lg text-text-muted group-hover:text-accent transition-colors">
                {tech}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Stream 2 - Right direction (opposite) - Pill style */}
      <div className="overflow-hidden">
        <div className="flex gap-4 stream-right" style={{ width: "max-content" }}>
          {[...doubledStack].reverse().map((tech, index) => (
            <div
              key={`stream2-${index}`}
              className="arsenal-pill px-8 py-4 rounded-full border border-line-color bg-window-bg/30 whitespace-nowrap hover:border-accent hover:bg-accent/5 transition-all duration-300 group"
            >
              <span className="font-satoshi text-lg text-text-muted group-hover:text-accent transition-colors">
                {tech}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
