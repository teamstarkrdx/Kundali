"use client";

import { useState } from "react";

interface NavbarProps {
  theme: "dark" | "light";
  toggleTheme: () => void;
}

export default function Navbar({ theme, toggleTheme }: NavbarProps) {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav 
      className="fixed top-0 left-0 w-full z-50 px-4 md:px-12 py-4 md:py-6 flex items-center justify-between mix-blend-difference"
      data-testid="navbar"
    >
      {/* Desktop Nav - Hidden on mobile */}
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

      {/* Logo for mobile */}
      <div className="md:hidden">
        <span className="font-clash text-lg font-bold text-accent">RK</span>
      </div>

      {/* Theme toggle only */}
      <div className="flex items-center">
        <button
          onClick={toggleTheme}
          className="font-jetbrains text-xs tracking-wider text-text-main hover:text-accent transition-colors px-3 py-1.5 border border-line-color rounded-full"
          data-testid="theme-toggle"
        >
          {theme === "dark" ? "LIGHT" : "DARK"}
        </button>
      </div>
    </nav>
  );
}
