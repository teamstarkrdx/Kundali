"use client";

export default function Footer() {
  return (
    <footer className="border-t border-line-color py-6 md:py-8 px-4 md:px-12 lg:px-24" data-testid="footer">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="font-clash text-lg md:text-xl font-bold text-text-main">RK</span>
          <span className="font-jetbrains text-[10px] md:text-xs text-text-muted">© 2026</span>
        </div>

        <div className="flex items-center">
          <span className="font-jetbrains text-[10px] md:text-xs text-text-muted tracking-wider text-center">
            DESIGNED & BUILT BY RAJAT KURDEKAR
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-1.5 md:w-2 h-1.5 md:h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="font-jetbrains text-[10px] md:text-xs text-text-muted tracking-wider">
            ALL SYSTEMS OPERATIONAL
          </span>
        </div>
      </div>
    </footer>
  );
}
