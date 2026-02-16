"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import GrainOverlay from "@/components/GrainOverlay";
import Hero from "@/components/Hero";
import Works from "@/components/Works";
import About from "@/components/About";
import Arsenal from "@/components/Arsenal";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Check localStorage for theme preference
    const savedTheme = localStorage.getItem("theme") as "dark" | "light" | null;
    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === "light") {
        document.documentElement.classList.add("light");
      }
    }
  }, []);

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Update ScrollTrigger on Lenis scroll
    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
    };
  }, [isLoading]);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    if (newTheme === "light") {
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
    }
  };

  const handlePreloaderComplete = () => {
    setIsLoading(false);
  };

  return (
    <main className="bg-bg min-h-screen">
      <GrainOverlay />
      <CustomCursor />
      
      {isLoading ? (
        <Preloader onComplete={handlePreloaderComplete} />
      ) : (
        <>
          <Navbar theme={theme} toggleTheme={toggleTheme} />
          <Hero />
          <Works />
          <About />
          <Arsenal />
          <Contact />
          <Footer />
        </>
      )}
    </main>
  );
}
