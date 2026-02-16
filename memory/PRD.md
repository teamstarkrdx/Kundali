# Rajat Kurdekar Portfolio Website - PRD

## Original Problem Statement
Recreate a portfolio website exactly matching the visual reference using:
- Next.js 14 (App Router)
- TailwindCSS
- GSAP 3 + ScrollTrigger
- Lenis (smooth scroll)
- SplitType (character animation)
- Static export capable, Vercel-ready
- No backend, no auth, no database

## User Personas
- **Rajat Kurdekar**: Creative Developer & UI Engineer showcasing work
- **Recruiters/Clients**: Viewing portfolio for hiring/collaboration
- **Fellow Developers**: Exploring animation techniques

## Core Requirements (Static)
- Dark/Light theme toggle with localStorage persistence
- Grain SVG overlay
- Custom cursor (disabled on touch devices)
- Lenis smooth scrolling
- GSAP ScrollTrigger animations

## What's Been Implemented (Jan 2026)
### Sections Completed:
1. **Preloader** - Percentage animation, scramble text, slide-up exit
2. **Navbar** - Fixed top, links (Work, ID, Arsenal, Contact), Resume, theme toggle
3. **Hero** - Three stacked headings with SplitType char animations, LOC/STAT boxes
4. **Works** - Horizontal scroll, curtain panels, 4 project cards + archive card
5. **About (ID Card)** - Tilt effect, scanlines, bio, barcode
6. **Arsenal** - Dual infinite scroll streams with tech pills
7. **Contact** - Marquee strip, giant "LET'S WORK", social links
8. **Footer** - RK logo, credits, system status

### Technical Implementation:
- Next.js 14 with App Router
- TailwindCSS with custom CSS variables
- GSAP 3 with ScrollTrigger (proper cleanup)
- Lenis smooth scroll integration
- SplitType for text animations
- Static export configured (`output: 'export'`)

## Prioritized Backlog

### P0 (Critical) - DONE
- [x] All sections implemented
- [x] Theme toggle working
- [x] Animations functional
- [x] Static build passing

### P1 (High Priority) - OPTIONAL
- [ ] Add actual project images
- [ ] Add resume PDF
- [ ] Optimize images with next/image

### P2 (Nice to Have)
- [ ] Add page transitions
- [ ] Mobile nav hamburger menu
- [ ] Project detail pages
- [ ] Contact form with email integration

## Next Tasks
1. User can add custom project images
2. User can upload resume PDF at /public/resume.pdf
3. Consider adding project detail pages
4. Deploy to Vercel via Emergent deployment
