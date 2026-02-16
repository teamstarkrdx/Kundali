import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg-color)',
        'text-main': 'var(--text-main)',
        'text-muted': 'var(--text-muted)',
        accent: 'var(--accent)',
        'accent-glow': 'var(--accent-glow)',
        'line-color': 'var(--line-color)',
        'window-bg': 'var(--window-bg)',
        'card-bg': 'var(--card-bg)',
        'curtain-bg': 'var(--curtain-bg)',
        'id-bg': 'var(--id-bg)',
        'grid-color': 'var(--grid-color)',
      },
      fontFamily: {
        clash: ['Clash Display', 'sans-serif'],
        satoshi: ['Satoshi', 'sans-serif'],
        jetbrains: ['JetBrains Mono', 'monospace'],
        barcode: ['Libre Barcode 39 Text', 'cursive'],
      },
    },
  },
  plugins: [],
};
export default config;
