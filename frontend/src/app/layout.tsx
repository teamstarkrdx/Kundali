import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rajat Kurdekar | Creative Developer & UI Engineer",
  description: "Creative Developer focused on building high-performance interfaces powered by AI and system-level design thinking.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Libre+Barcode+39+Text&display=swap" 
          rel="stylesheet" 
        />
        <link 
          href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&f[]=satoshi@400,500,700&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="font-satoshi antialiased">
        {children}
      </body>
    </html>
  );
}
