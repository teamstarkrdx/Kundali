"use client";

import { useState } from "react";

interface NavbarProps {
  theme: "dark" | "light";
  toggleTheme: () => void;
}

export default function Navbar({ theme, toggleTheme }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav 
        className="fixed top-0 left-0 w-full z-50 px-4 md:px-12 py-4 md:py-6 flex items-center justify-between mix-blend-difference"
        data-testid="navbar"
      >
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <button 
            onClick={() => scrollToSection("works")}
            className="font-jetbrains text-xs tracking-wider text-text-main hover:text-accent transition-colors link-underline"
            data-testid="nav-work"
          >
            WORK
          </button>
          <button 
            onClick={() => scrollToSection("about")}
            className="font-jetbrains text-xs tracking-wider text-text-main hover:text-accent transition-colors link-underline"
            data-testid="nav-id"
          >
            ID
          </button>
          <button 
            onClick={() => scrollToSection("arsenal")}
            className="font-jetbrains text-xs tracking-wider text-text-main hover:text-accent transition-colors link-underline"
            data-testid="nav-arsenal"
          >
            ARSENAL
          </button>
          <button 
            onClick={() => scrollToSection("contact")}
            className="font-jetbrains text-xs tracking-wider text-text-main hover:text-accent transition-colors link-underline"
            data-testid="nav-contact"
          >
            CONTACT
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden font-jetbrains text-xs tracking-wider text-text-main"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? 'CLOSE' : 'MENU'}
        </button>

        {/* Right side */}
        <div className="flex items-center gap-3 md:gap-6">
          <a
            href="/resume.pdf"
            target="_blank"
            className="hidden md:block font-jetbrains text-xs tracking-wider px-4 py-2 border border-line-color hover:border-accent hover:text-accent transition-all"
            data-testid="nav-resume"
          >
            RESUME
          </a>
          <button
            onClick={toggleTheme}
            className="font-jetbrains text-xs tracking-wider text-text-main hover:text-accent transition-colors"
            data-testid="theme-toggle"
          >
            {theme === "dark" ? "LIGHT" : "DARK"}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-bg z-40 flex flex-col items-center justify-center gap-8 md:hidden">
          <button 
            onClick={() => scrollToSection("works")}
            className="font-clash text-3xl font-bold text-text-main hover:text-accent transition-colors"
          >
            WORK
          </button>
          <button 
            onClick={() => scrollToSection("about")}
            className="font-clash text-3xl font-bold text-text-main hover:text-accent transition-colors"
          >
            ID
          </button>
          <button 
            onClick={() => scrollToSection("arsenal")}
            className="font-clash text-3xl font-bold text-text-main hover:text-accent transition-colors"
          >
            ARSENAL
          </button>
          <button 
            onClick={() => scrollToSection("contact")}
            className="font-clash text-3xl font-bold text-text-main hover:text-accent transition-colors"
          >
            CONTACT
          </button>
          <a
            href="/resume.pdf"
            target="_blank"
            className="font-jetbrains text-sm tracking-wider px-6 py-3 border border-accent text-accent mt-4"
          >
            RESUME
          </a>
        </div>
      )}
    </>
  );
}
