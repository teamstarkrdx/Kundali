"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
  {
    name: "Telegram",
    handle: "@btwimrajat",
    url: "https://t.me/btwimrajat",
  },
  {
    name: "Instagram",
    handle: "@rajat.__06",
    url: "https://instagram.com/rajat.__06",
  },
  {
    name: "GitHub",
    handle: "teamstarkrdx",
    url: "https://github.com/teamstarkrdx",
  },
  {
    name: "Email",
    handle: "teamstarkrdx@gmail.com",
    url: "mailto:teamstarkrdx@gmail.com",
  },
];

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headingRef.current) {
        const split = new SplitType(headingRef.current, { types: "chars" });
        gsap.from(split.chars, {
          opacity: 0,
          y: 100,
          rotateX: -90,
          stagger: 0.03,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-16 md:py-32 overflow-hidden"
      data-testid="contact-section"
    >
      {/* Marquee Strip */}
      <div className="border-y border-line-color py-3 md:py-4 mb-8 md:mb-16 overflow-hidden">
        <div className="marquee">
          <div className="marquee-content">
            {[...Array(10)].map((_, i) => (
              <span
                key={i}
                className="font-jetbrains text-xs md:text-sm text-text-muted tracking-widest mx-4 md:mx-8 whitespace-nowrap"
              >
                OPEN FOR OPPORTUNITIES • AVAILABLE FOR FREELANCE • LET&apos;S COLLABORATE
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="px-4 md:px-12 lg:px-24">
        <span className="font-jetbrains text-[10px] md:text-xs text-accent tracking-widest px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-accent/30 inline-block mb-6 md:mb-8">
          04 // GET IN TOUCH
        </span>

        {/* Giant Heading */}
        <div className="overflow-hidden mb-8 md:mb-12">
          <h2
            ref={headingRef}
            className="font-clash text-[12vw] md:text-[10vw] font-bold text-text-main leading-none"
          >
            LET&apos;S WORK
          </h2>
        </div>

        {/* Social Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 max-w-4xl">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link group flex items-center justify-between p-4 md:p-5 rounded-xl md:rounded-2xl border border-line-color bg-card-bg hover:border-accent hover:bg-accent/5 transition-all duration-300"
              data-testid={`social-link-${link.name.toLowerCase()}`}
            >
              <div className="min-w-0 flex-1">
                <span className="font-jetbrains text-[10px] md:text-xs text-text-muted tracking-wider block mb-0.5 md:mb-1">
                  {link.name.toUpperCase()}
                </span>
                <span className="font-satoshi text-sm md:text-lg text-text-main group-hover:text-accent transition-colors truncate block">
                  {link.handle}
                </span>
              </div>
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-line-color group-hover:border-accent flex items-center justify-center group-hover:bg-accent/10 transition-all flex-shrink-0 ml-3">
                <svg
                  className="w-4 h-4 md:w-5 md:h-5 text-text-muted group-hover:text-accent group-hover:translate-x-0.5 transition-all"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
