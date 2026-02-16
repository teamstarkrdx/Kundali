"use client";

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
      className="fixed top-0 left-0 w-full z-50 px-6 md:px-12 py-6 flex items-center justify-between mix-blend-difference"
      data-testid="navbar"
    >
      <div className="flex items-center gap-8">
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

      <div className="flex items-center gap-6">
        <a
          href="/resume.pdf"
          target="_blank"
          className="font-jetbrains text-xs tracking-wider px-4 py-2 border border-line-color hover:border-accent hover:text-accent transition-all"
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
  );
}
