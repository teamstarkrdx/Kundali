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
    status: "VERSION 1.0",
    statusColor: "#818CF8",
    description: "Experimental system-console UI architecture focused on immersive motion and high-performance layout systems.",
    tech: ["React", "GSAP", "Tailwind", "Figma"],
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",
  },
  {
    title: "SecureStack",
    subtitle: "Cyber Toolkit",
    status: "BUILDING",
    statusColor: "#F87171",
    description: "Beginner-focused cybersecurity tooling and infrastructure experimentation environment.",
    tech: ["Docker", "AWS", "Firebase", "Node.js"],
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=400&fit=crop",
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
      // Get the total scroll distance
      const scrollWidth = track.scrollWidth - window.innerWidth;

      // Door opening animation - starts closed (at center), opens outward
      const doorTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=300",
          scrub: 1,
        },
      });

      // Doors start at 0 (center/closed) and move outward
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

      // Animate project cards - B&W to color on scroll into view
      const cards = document.querySelectorAll('.project-card-wrapper');
      cards.forEach((card) => {
        gsap.fromTo(card.querySelector('.project-image'), 
          { filter: 'grayscale(100%) brightness(0.8)' },
          {
            filter: 'grayscale(0%) brightness(1)',
            scrollTrigger: {
              trigger: card,
              start: "left 80%",
              end: "left 30%",
              scrub: 1,
              horizontal: true,
              containerAnimation: gsap.to(track, { x: -scrollWidth }),
            },
          }
        );
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
      {/* Door Panels - Start closed (touching in center) */}
      <div 
        ref={doorLeftRef} 
        className="fixed top-0 left-0 w-1/2 h-full bg-bg z-[100] flex items-center justify-end pr-4 border-r border-line-color"
        style={{ transform: 'translateX(0)' }}
      >
        <span className="font-clash text-6xl md:text-8xl font-bold text-text-main tracking-tighter">WORK</span>
      </div>
      <div 
        ref={doorRightRef} 
        className="fixed top-0 right-0 w-1/2 h-full bg-bg z-[100] flex items-center justify-start pl-4 border-l border-line-color"
        style={{ transform: 'translateX(0)' }}
      >
        <span className="font-clash text-6xl md:text-8xl font-bold text-accent tracking-tighter">FOLIO</span>
      </div>

      {/* Horizontal Track */}
      <div className="h-screen flex items-center">
        <div
          ref={trackRef}
          className="works-track pl-12 md:pl-24"
        >
          {/* Section Header */}
          <div className="flex-shrink-0 w-[40vw] flex flex-col justify-center pr-12">
            <span className="font-jetbrains text-xs text-accent tracking-widest mb-4 px-4 py-2 rounded-full border border-accent/30 inline-block w-fit">
              01 // SELECTED WORKS
            </span>
            <h2 className="font-clash text-5xl md:text-7xl font-bold text-text-main leading-tight">
              Featured<br />Projects
            </h2>
          </div>

          {/* Project Cards */}
          {projects.map((project, index) => (
            <div
              key={index}
              className="project-card-wrapper flex-shrink-0 w-[400px] md:w-[450px] border border-line-color bg-card-bg rounded-2xl overflow-hidden group transition-all duration-500 hover:border-accent hover:shadow-[0_0_40px_rgba(219,255,0,0.15)]"
              data-testid={`project-card-${index}`}
            >
              <div className="relative h-48 md:h-56 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-image w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                  style={{ filter: 'grayscale(100%) brightness(0.8)' }}
                />
                <div className="scanlines" />
                <div className="absolute top-4 right-4 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-sm border border-white/10">
                  <span 
                    className="font-jetbrains text-xs tracking-wider"
                    style={{ color: project.statusColor }}
                  >
                    {project.status}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-baseline gap-3 mb-3">
                  <h3 className="font-clash text-2xl font-bold text-text-main">
                    {project.title}
                  </h3>
                  <span className="font-jetbrains text-xs text-text-muted">
                    {project.subtitle}
                  </span>
                </div>

                <p className="font-satoshi text-sm text-text-muted leading-relaxed mb-4">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="font-jetbrains text-xs px-3 py-1.5 rounded-full border border-line-color text-text-muted bg-window-bg/50"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* Archive Card */}
          <div
            className="flex-shrink-0 w-[350px] md:w-[400px] h-[500px] border border-line-color bg-card-bg rounded-2xl flex flex-col items-center justify-center group relative overflow-hidden hover:border-accent transition-all duration-500"
            data-testid="archive-card"
          >
            <div className="archive-grid absolute inset-0 opacity-20">
              <div className="w-full h-full" style={{
                backgroundImage: `
                  linear-gradient(var(--grid-color) 1px, transparent 1px),
                  linear-gradient(90deg, var(--grid-color) 1px, transparent 1px)
                `,
                backgroundSize: "40px 40px",
                transform: "perspective(500px) rotateX(60deg)",
              }} />
            </div>

            <div className="archive-ring w-24 h-24 border-2 border-accent rounded-full mb-8 flex items-center justify-center animate-spin" style={{ animationDuration: '10s' }}>
              <div className="w-16 h-16 border border-line-color rounded-full" />
            </div>

            <span className="font-clash text-3xl font-bold text-text-main glitch group-hover:text-accent transition-colors">
              ARCHIVE
            </span>
            <span className="font-jetbrains text-xs text-text-muted mt-2 tracking-wider">
              VIEW ALL PROJECTS
            </span>
          </div>

          {/* Spacer */}
          <div className="flex-shrink-0 w-[20vw]" />
        </div>
      </div>
    </section>
  );
}
