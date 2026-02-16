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

  const doubledStack = [...techStack, ...techStack];

  return (
    <section
      ref={sectionRef}
      id="arsenal"
      className="py-16 md:py-32 overflow-hidden"
      data-testid="arsenal-section"
    >
      <div className="px-4 md:px-12 lg:px-24 mb-8 md:mb-16">
        <span className="font-jetbrains text-[10px] md:text-xs text-accent tracking-widest px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-accent/30 inline-block mb-4 md:mb-6">
          03 // SYSTEM ARSENAL
        </span>
        <h2 className="arsenal-title font-clash text-3xl md:text-5xl lg:text-7xl font-bold text-text-main">
          Tools & Technologies
        </h2>
      </div>

      {/* Stream 1 */}
      <div className="mb-4 md:mb-6 overflow-hidden">
        <div className="flex gap-2 md:gap-4 stream-left" style={{ width: "max-content" }}>
          {doubledStack.map((tech, index) => (
            <div
              key={`stream1-${index}`}
              className="arsenal-pill px-4 md:px-8 py-2.5 md:py-4 rounded-full border border-line-color bg-window-bg/30 whitespace-nowrap hover:border-accent hover:bg-accent/5 transition-all duration-300 group"
            >
              <span className="font-satoshi text-sm md:text-lg text-text-muted group-hover:text-accent transition-colors">
                {tech}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Stream 2 */}
      <div className="overflow-hidden">
        <div className="flex gap-2 md:gap-4 stream-right" style={{ width: "max-content" }}>
          {[...doubledStack].reverse().map((tech, index) => (
            <div
              key={`stream2-${index}`}
              className="arsenal-pill px-4 md:px-8 py-2.5 md:py-4 rounded-full border border-line-color bg-window-bg/30 whitespace-nowrap hover:border-accent hover:bg-accent/5 transition-all duration-300 group"
            >
              <span className="font-satoshi text-sm md:text-lg text-text-muted group-hover:text-accent transition-colors">
                {tech}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
