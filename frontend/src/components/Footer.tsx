"use client";

export default function Footer() {
  return (
    <footer className="border-t border-line-color py-8 px-6 md:px-12 lg:px-24" data-testid="footer">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="font-clash text-xl font-bold text-text-main">RK</span>
          <span className="font-jetbrains text-xs text-text-muted">© 2024</span>
        </div>

        <div className="flex items-center gap-6">
          <span className="font-jetbrains text-xs text-text-muted tracking-wider">
            DESIGNED & BUILT BY RAJAT KURDEKAR
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="font-jetbrains text-xs text-text-muted tracking-wider">
            ALL SYSTEMS OPERATIONAL
          </span>
        </div>
      </div>
    </footer>
  );
}
