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
    status: "V1.0 LAB",
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
  const curtainLeftRef = useRef<HTMLDivElement>(null);
  const curtainRightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const curtainLeft = curtainLeftRef.current;
    const curtainRight = curtainRightRef.current;

    if (!section || !track || !curtainLeft || !curtainRight) return;

    const ctx = gsap.context(() => {
      // Get the total scroll distance
      const scrollWidth = track.scrollWidth - window.innerWidth;

      // Curtain animation
      const curtainTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=200",
          scrub: 1,
        },
      });

      curtainTl.to(curtainLeft, { xPercent: -100, ease: "power2.inOut" });
      curtainTl.to(curtainRight, { xPercent: 100, ease: "power2.inOut" }, "<");

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
      {/* Curtain Panels */}
      <div ref={curtainLeftRef} className="curtain-left flex items-center justify-center">
        <span className="font-clash text-4xl md:text-6xl font-bold text-text-main">WORK</span>
      </div>
      <div ref={curtainRightRef} className="curtain-right flex items-center justify-center">
        <span className="font-clash text-4xl md:text-6xl font-bold text-text-main">FOLIO</span>
      </div>

      {/* Horizontal Track */}
      <div className="h-screen flex items-center">
        <div
          ref={trackRef}
          className="works-track pl-12 md:pl-24"
        >
          {/* Section Header */}
          <div className="flex-shrink-0 w-[40vw] flex flex-col justify-center pr-12">
            <span className="font-jetbrains text-xs text-text-muted tracking-widest mb-4">
              [ SELECTED WORKS ]
            </span>
            <h2 className="font-clash text-5xl md:text-7xl font-bold text-text-main leading-tight">
              Featured<br />Projects
            </h2>
          </div>

          {/* Project Cards */}
          {projects.map((project, index) => (
            <div
              key={index}
              className="project-card flex-shrink-0 w-[400px] md:w-[450px] border border-line-color bg-card-bg overflow-hidden group transition-all duration-500"
              data-testid={`project-card-${index}`}
            >
              <div className="relative h-48 md:h-56 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="scanlines" />
                <div className="absolute top-4 right-4 px-3 py-1 bg-black/60 backdrop-blur-sm">
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
                      className="font-jetbrains text-xs px-2 py-1 border border-line-color text-text-muted"
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
            className="flex-shrink-0 w-[350px] md:w-[400px] h-[500px] border border-line-color bg-card-bg flex flex-col items-center justify-center group relative overflow-hidden"
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

            <div className="archive-ring w-24 h-24 border border-accent rounded-full mb-8 flex items-center justify-center">
              <div className="w-16 h-16 border border-line-color rounded-full" />
            </div>

            <span className="font-clash text-3xl font-bold text-text-main glitch group-hover:text-accent transition-colors">
              ARCHIVE
            </span>
            <span className="font-jetbrains text-xs text-text-muted mt-2 tracking-wider">
              VIEW ALL PROJECTS
            </span>

            {/* Vertical scan */}
            <div className="absolute left-0 top-0 w-full h-1 bg-accent/30 animate-pulse" style={{
              animation: "scanVertical 3s linear infinite",
            }} />
          </div>

          {/* Spacer for smooth scrolling end */}
          <div className="flex-shrink-0 w-[20vw]" />
        </div>
      </div>

      <style jsx>{`
        @keyframes scanVertical {
          0% { transform: translateY(0); }
          100% { transform: translateY(500px); }
        }
      `}</style>
    </section>
  );
}
