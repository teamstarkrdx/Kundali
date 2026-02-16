"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  title: string;
  subtitle: string;
  status: string;
  statusColor: string;
  description: string;
  tech: string[];
  image: string;
}

const projects: Project[] = [
  {
    title: "Nyaya Mitra",
    subtitle: "AI Legal Help",
    status: "ONLINE",
    statusColor: "#4ADE80",
    description: "Futuristic AI-powered legal assistance platform for India with multilingual chatbot, voice interface, and intelligent document workflows.",
    tech: ["Next.js", "TypeScript", "GSAP", "Tailwind", "AI", "Vercel"],
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&h=400&fit=crop",
  },
  {
    title: "StarkBot",
    subtitle: "Automation Suite",
    status: "IN PROGRESS",
    statusColor: "#FBBF24",
    description: "Advanced automation and scripting ecosystem for bots, workflows, and digital command pipelines.",
    tech: ["Node.js", "Python", "MongoDB", "Telegram API"],
    image: "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=600&h=400&fit=crop",
  },
  {
    title: "VibeOS",
    subtitle: "Interface System",
    status: "IN PROGRESS",
    statusColor: "#FBBF24",
    description: "Experimental system-console UI architecture focused on immersive motion and high-performance layout systems.",
    tech: ["React", "GSAP", "Tailwind", "Figma"],
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",
  },
];

export default function Works() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const doorLeftRef = useRef<HTMLDivElement>(null);
  const doorRightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const doorLeft = doorLeftRef.current;
    const doorRight = doorRightRef.current;

    if (!section || !track || !doorLeft || !doorRight) return;

    const ctx = gsap.context(() => {
      const scrollWidth = track.scrollWidth - window.innerWidth;

      // Door opening animation
      const doorTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=300",
          scrub: 1,
        },
      });

      doorTl.to(doorLeft, { xPercent: -100, ease: "power2.inOut" });
      doorTl.to(doorRight, { xPercent: 100, ease: "power2.inOut" }, "<");

      // Horizontal scroll
      gsap.to(track, {
        x: -scrollWidth,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=400%",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="works"
      className="relative min-h-screen overflow-hidden"
      data-testid="works-section"
    >
      {/* Door Panels */}
      <div 
        ref={doorLeftRef} 
        className="fixed top-0 left-0 w-1/2 h-full bg-bg z-[100] flex items-center justify-end pr-2 md:pr-4 border-r border-line-color"
      >
        <span className="font-clash text-4xl md:text-6xl lg:text-8xl font-bold text-text-main tracking-tighter">WORK</span>
      </div>
      <div 
        ref={doorRightRef} 
        className="fixed top-0 right-0 w-1/2 h-full bg-bg z-[100] flex items-center justify-start pl-2 md:pl-4 border-l border-line-color"
      >
        <span className="font-clash text-4xl md:text-6xl lg:text-8xl font-bold text-accent tracking-tighter">FOLIO</span>
      </div>

      {/* Horizontal Track */}
      <div className="h-screen flex items-center">
        <div
          ref={trackRef}
          className="works-track pl-4 md:pl-12 lg:pl-24"
        >
          {/* Section Header */}
          <div className="flex-shrink-0 w-[80vw] md:w-[40vw] flex flex-col justify-center pr-4 md:pr-12">
            <span className="font-jetbrains text-[10px] md:text-xs text-accent tracking-widest mb-3 md:mb-4 px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-accent/30 inline-block w-fit">
              01 // SELECTED WORKS
            </span>
            <h2 className="font-clash text-4xl md:text-5xl lg:text-7xl font-bold text-text-main leading-tight">
              Featured<br />Projects
            </h2>
          </div>

          {/* Project Cards */}
          {projects.map((project, index) => (
            <div
              key={index}
              className="project-card-wrapper flex-shrink-0 w-[85vw] md:w-[400px] lg:w-[450px] border border-line-color bg-card-bg rounded-2xl overflow-hidden group transition-all duration-500 hover:border-accent hover:shadow-[0_0_40px_rgba(219,255,0,0.15)]"
              data-testid={`project-card-${index}`}
            >
              <div className="relative h-40 md:h-48 lg:h-56 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-image w-full h-full object-cover transition-all duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                />
                <div className="scanlines" />
                <div className="absolute top-3 md:top-4 right-3 md:right-4 px-3 md:px-4 py-1 md:py-1.5 rounded-full bg-black/60 backdrop-blur-sm border border-white/10">
                  <span 
                    className="font-jetbrains text-[10px] md:text-xs tracking-wider"
                    style={{ color: project.statusColor }}
                  >
                    {project.status}
                  </span>
                </div>
              </div>

              <div className="p-4 md:p-6">
                <div className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-3 mb-2 md:mb-3">
                  <h3 className="font-clash text-xl md:text-2xl font-bold text-text-main">
                    {project.title}
                  </h3>
                  <span className="font-jetbrains text-[10px] md:text-xs text-text-muted">
                    {project.subtitle}
                  </span>
                </div>

                <p className="font-satoshi text-xs md:text-sm text-text-muted leading-relaxed mb-3 md:mb-4 line-clamp-3">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5 md:gap-2">
                  {project.tech.slice(0, 4).map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="font-jetbrains text-[10px] md:text-xs px-2 md:px-3 py-1 md:py-1.5 rounded-full border border-line-color text-text-muted bg-window-bg/50"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* Coming Soon Card */}
          <div
            className="flex-shrink-0 w-[85vw] md:w-[350px] lg:w-[400px] h-[400px] md:h-[500px] border border-dashed border-line-color bg-card-bg/50 rounded-2xl flex flex-col items-center justify-center group relative overflow-hidden"
            data-testid="coming-soon-card"
          >
            {/* Animated background */}
            <div className="absolute inset-0 opacity-10">
              <div className="w-full h-full" style={{
                backgroundImage: `
                  linear-gradient(var(--grid-color) 1px, transparent 1px),
                  linear-gradient(90deg, var(--grid-color) 1px, transparent 1px)
                `,
                backgroundSize: "30px 30px",
              }} />
            </div>

            {/* Pulsing dots */}
            <div className="flex gap-2 mb-6 md:mb-8">
              {[...Array(3)].map((_, i) => (
                <div 
                  key={i}
                  className="w-2 md:w-3 h-2 md:h-3 rounded-full bg-accent animate-pulse"
                  style={{ animationDelay: `${i * 0.3}s` }}
                />
              ))}
            </div>

            <span className="font-clash text-2xl md:text-3xl font-bold text-text-main mb-2">
              MORE PROJECTS
            </span>
            <span className="font-clash text-xl md:text-2xl font-bold text-accent mb-3 md:mb-4">
              COMING SOON
            </span>
            <span className="font-jetbrains text-[10px] md:text-xs text-text-muted tracking-wider text-center px-4">
              EXCITING THINGS IN THE WORKS
            </span>

            {/* Decorative lines */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-1">
              {[...Array(5)].map((_, i) => (
                <div 
                  key={i}
                  className="w-6 md:w-8 h-0.5 bg-line-color"
                  style={{ opacity: 0.3 + i * 0.15 }}
                />
              ))}
            </div>
          </div>

          {/* Spacer */}
          <div className="flex-shrink-0 w-[10vw] md:w-[20vw]" />
        </div>
      </div>
    </section>
  );
}
