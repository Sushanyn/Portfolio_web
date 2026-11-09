import { useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import { FadeIn } from './FadeIn';
import { useTranslation } from 'react-i18next';

const PROJECTS = [
  {
    num: "01",
    client: "SquareUp",
    category: "Digital Product Studio",
    tagline: "Full-cycle digital product studio delivering high-impact creative direction, 3D interactions, and responsive web systems.",
    url: "squareup.studio",
    tags: ["UI/UX Design", "Creative Agency", "3D Interactive"],
    accentColor: "#C4EF00",
    desktopImg: "/projects/squareup-desktop.webp",
    companionImg: "/projects/squareup-mobile.webp",
    companionType: "phone" as const
  },
  {
    num: "02",
    client: "Estatein",
    category: "Real Estate Platform",
    tagline: "Comprehensive PropTech platform featuring intuitive property search, modern dark aesthetics, and luxury architectural listings.",
    url: "estatein.io",
    tags: ["PropTech", "Web Platform", "Design System"],
    accentColor: "#703BF7",
    desktopImg: "/projects/estatein-desktop.webp",
    companionImg: "/projects/estatein-mobile.webp",
    companionType: "phone" as const
  },
  {
    num: "03",
    client: "OrangeFarm",
    category: "SaaS CRM & Analytics",
    tagline: "Minimalist, data-dense CRM dashboard designed for modern sales teams with live revenue metrics, pipelines, and performance analytics.",
    url: "orangefarm.app",
    tags: ["Product Design", "CRM Dashboard", "Data Viz"],
    accentColor: "#FF6B00",
    desktopImg: "/projects/orangefarm-dashboard.webp",
    companionImg: "/projects/orangefarm-ipad-screen.webp",
    companionType: "tablet" as const
  }
];

function AppleBrowserWindow({
  url,
  src,
  alt,
  className = ""
}: {
  url: string;
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div className={`relative rounded-lg sm:rounded-2xl border border-foreground/15 bg-card shadow-2xl overflow-hidden flex flex-col transition-colors duration-300 ${className}`}>
      {/* Apple-style window titlebar - tuned for mobile and desktop */}
      <div className="h-6 sm:h-9 px-2 sm:px-4 bg-foreground/[0.04] border-b border-foreground/10 flex items-center justify-between shrink-0 select-none backdrop-blur-md">
        <div className="flex items-center gap-1 sm:gap-2">
          <div className="w-1.5 sm:w-2.5 h-1.5 sm:h-2.5 rounded-full bg-[#FF5F56]/85 shadow-sm" />
          <div className="w-1.5 sm:w-2.5 h-1.5 sm:h-2.5 rounded-full bg-[#FFBD2E]/85 shadow-sm" />
          <div className="w-1.5 sm:w-2.5 h-1.5 sm:h-2.5 rounded-full bg-[#27C93F]/85 shadow-sm" />
        </div>
        <div className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-0.5 sm:py-1 rounded bg-foreground/[0.04] border border-foreground/10 text-[8px] sm:text-[11px] font-mono text-foreground/60 max-w-[130px] sm:max-w-none truncate">
          <svg className="w-2 sm:w-2.5 h-2 sm:h-2.5 opacity-60 text-current shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span className="opacity-90 truncate">{url}</span>
        </div>
        <div className="w-5 sm:w-10" />
      </div>

      {/* Screen viewport */}
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-foreground/5">
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover/canvas:scale-[1.02]"
        />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/[0.02] to-white/[0.05]" />
      </div>
    </div>
  );
}

function ApplePhoneFrame({
  src,
  alt,
  className = ""
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      {/* Physical power button on right edge */}
      <div className="absolute -right-[2px] sm:-right-[3px] top-7 sm:top-14 w-[2px] sm:w-[3px] h-5 sm:h-10 bg-[#3A3A44] rounded-r-sm z-0" />
      {/* Volume buttons on left edge */}
      <div className="absolute -left-[2px] sm:-left-[3px] top-6 sm:top-12 w-[2px] sm:w-[3px] h-3.5 sm:h-6 bg-[#3A3A44] rounded-l-sm z-0" />
      <div className="absolute -left-[2px] sm:-left-[3px] top-11 sm:top-20 w-[2px] sm:w-[3px] h-3.5 sm:h-6 bg-[#3A3A44] rounded-l-sm z-0" />

      {/* Main iPhone Body */}
      <div className="relative w-full aspect-[9/18.5] rounded-[16px] sm:rounded-[34px] border-[2.5px] sm:border-[5px] border-[#2C2C34] ring-1 ring-foreground/15 bg-black shadow-[0_15px_35px_rgba(0,0,0,0.6)] sm:shadow-[0_25px_60px_rgba(0,0,0,0.5)] overflow-hidden">
        {/* iPhone Dynamic Island */}
        <div className="absolute top-1 sm:top-2 left-1/2 -translate-x-1/2 w-7 sm:w-16 h-1.5 sm:h-3.5 bg-black rounded-full z-20 flex items-center justify-end pr-0.5 sm:pr-1.5 shadow-sm">
          <div className="w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-[#1C1C24] ring-1 ring-white/10" />
        </div>

        {/* Screen */}
        <div className="relative w-full h-full overflow-hidden bg-black">
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover/canvas:scale-[1.03]"
          />
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/[0.03] to-white/[0.08]" />

          {/* iOS Home Indicator */}
          <div className="absolute bottom-1 sm:bottom-1.5 left-1/2 -translate-x-1/2 w-8 sm:w-16 h-0.5 sm:h-1 bg-white/40 rounded-full z-20 pointer-events-none" />
        </div>
      </div>
    </div>
  );
}

function AppleTabletFrame({
  src,
  alt,
  className = ""
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      {/* Physical power button on top edge (iPad Pro top-right) */}
      <div className="absolute -top-[2px] sm:-top-[3px] right-4 sm:right-8 w-4 sm:w-8 h-[2px] sm:h-[3px] bg-[#3A3A44] rounded-t-sm z-0" />
      {/* Physical volume buttons on right edge (iPad Pro top-right side) */}
      <div className="absolute -right-[2px] sm:-right-[3px] top-4 sm:top-8 w-[2px] sm:w-[3px] h-3 sm:h-7 bg-[#3A3A44] rounded-r-sm z-0" />
      <div className="absolute -right-[2px] sm:-right-[3px] top-8 sm:top-17 w-[2px] sm:w-[3px] h-3 sm:h-7 bg-[#3A3A44] rounded-r-sm z-0" />

      {/* iPad Aluminum Chassis with uniform Apple bezel */}
      <div className="relative w-full rounded-[14px] sm:rounded-[28px] border-[2px] sm:border-[3px] border-[#34343E] ring-1 ring-foreground/15 bg-[#0F0F14] shadow-[0_15px_40px_rgba(0,0,0,0.6)] sm:shadow-[0_25px_60px_rgba(0,0,0,0.55)] p-1 sm:p-2.5 flex flex-col items-center">
        
        {/* iPad Top Bezel: Centered Front Camera & Ambient Sensor */}
        <div className="w-full h-2 sm:h-3.5 flex items-center justify-center gap-1 sm:gap-1.5 shrink-0 select-none pointer-events-none">
          {/* Ambient Sensor */}
          <div className="w-0.5 sm:w-1 h-0.5 sm:h-1 rounded-full bg-[#181822]" />
          {/* Front Camera Lens with antireflective reflection */}
          <div className="w-1 sm:w-2 h-1 sm:h-2 rounded-full bg-[#12121A] ring-1 ring-white/20 flex items-center justify-center">
            <div className="w-0.5 h-0.5 rounded-full bg-[#1E2D4A]" />
          </div>
        </div>

        {/* Liquid Retina Active Screen */}
        <div className="relative w-full aspect-[3/4.1] rounded-[6px] sm:rounded-[14px] overflow-hidden bg-[#F6F6F4] shadow-inner">
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover/canvas:scale-[1.03]"
          />
          {/* iPad Glass Screen Glare */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/[0.03] to-white/[0.08]" />

          {/* iPadOS Home Indicator */}
          <div className="absolute bottom-1 sm:bottom-2 left-1/2 -translate-x-1/2 w-8 sm:w-20 h-0.5 sm:h-1 bg-black/40 rounded-full z-20 pointer-events-none" />
        </div>

        {/* iPad Bottom Bezel for symmetry */}
        <div className="w-full h-1 sm:h-2.5 shrink-0" />
      </div>
    </div>
  );
}

interface ProjectCardProps {
  project: typeof PROJECTS[0];
  index: number;
  totalCards: number;
}

function ProjectCard({ project, index, totalCards }: ProjectCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  const targetScale = 1 - (totalCards - 1 - index) * 0.025;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div
      ref={containerRef}
      className="sticky top-16 sm:top-24 w-full flex justify-center origin-top pb-8 sm:pb-16"
      style={{ top: `calc(3.75rem + ${index * 16}px)` }}
    >
      <motion.div
        style={{ scale }}
        transition={{ duration: 0.3 }}
        className="group relative w-full max-w-6xl rounded-[22px] sm:rounded-[36px] md:rounded-[44px] border border-foreground/12 bg-card/90 backdrop-blur-2xl p-4 sm:p-8 md:p-10 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.4)] [.theme-olive_&]:shadow-[0_20px_50px_-15px_rgba(44,53,37,0.08)] flex flex-col gap-4 sm:gap-8 overflow-hidden transition-colors duration-300"
      >
        {/* Subtle ambient brand glow in the background */}
        <div
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full blur-[140px] pointer-events-none opacity-20 [.theme-olive_&]:opacity-15"
          style={{ backgroundColor: project.accentColor }}
        />

        {/* Card Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 relative z-10">
          <div className="flex flex-col gap-1.5 sm:gap-2.5 max-w-2xl">
            <div className="flex items-center gap-2 sm:gap-2.5">
              <span className="text-[11px] sm:text-sm font-mono tracking-widest text-foreground/50 uppercase">
                {project.num} / 03
              </span>
              <span className="w-1 h-1 rounded-full bg-foreground/30" />
              <span className="text-[11px] sm:text-sm font-medium tracking-wider text-foreground/70 uppercase">
                {project.category}
              </span>
            </div>

            <h3 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              {project.client}
            </h3>

            <p className="text-xs sm:text-base text-foreground/75 leading-relaxed font-light line-clamp-3 sm:line-clamp-none">
              {project.tagline}
            </p>

            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 pt-0.5 sm:pt-1">
              {project.tags.map((tag, tIdx) => (
                <span
                  key={tIdx}
                  className="text-[10px] sm:text-xs font-medium px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-foreground/[0.05] border border-foreground/10 text-foreground/80"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="shrink-0 pt-1 sm:pt-2 md:pt-0">
            <a
              href={`https://${project.url}`}
              target="_blank"
              rel="noreferrer"
              className="btn-card-action inline-flex items-center justify-center gap-2 sm:gap-2.5 w-full sm:w-auto px-5 py-2.5 sm:px-6 sm:py-3 rounded-full font-semibold text-xs sm:text-sm uppercase tracking-wider active:scale-95 shadow-md cursor-pointer"
            >
              <span>Live Project</span>
              <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>

        {/* Apple-style Showcase Canvas */}
        <div className="relative w-full rounded-xl sm:rounded-3xl bg-foreground/[0.03] [.theme-olive_&]:bg-foreground/[0.04] border border-foreground/10 p-2.5 sm:p-8 lg:p-10 flex items-center justify-center min-h-[200px] xs:min-h-[240px] sm:min-h-[460px] lg:min-h-[520px] overflow-hidden group/canvas transition-colors duration-300">
          {/* Main Desktop Window */}
          <div className="w-full max-w-[95%] lg:max-w-[82%] -translate-x-1 sm:translate-x-0 -translate-y-1 sm:translate-y-0 transition-transform duration-500 group-hover/canvas:-translate-y-1">
            <AppleBrowserWindow
              url={project.url}
              src={project.desktopImg}
              alt={`${project.client} desktop preview`}
            />
          </div>

          {/* Floating Companion (Phone or Tablet) */}
          <div className="absolute right-2 sm:right-6 lg:right-10 bottom-2 sm:bottom-6 lg:bottom-8 z-20 transition-transform duration-500 group-hover/canvas:-translate-y-2 group-hover/canvas:translate-x-1">
            {project.companionType === "tablet" ? (
              <AppleTabletFrame
                src={project.companionImg}
                alt={`${project.client} iPad preview`}
                className="w-[110px] xs:w-[130px] sm:w-[195px] lg:w-[235px]"
              />
            ) : (
              <ApplePhoneFrame
                src={project.companionImg}
                alt={`${project.client} iPhone preview`}
                className="w-[78px] xs:w-[92px] sm:w-[145px] lg:w-[170px]"
              />
            )}
          </div>
        </div>

      </motion.div>
    </div>
  );
}

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useTranslation();

  return (
    <section 
      id="projects" 
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center"
    >
      <div 
        className="bg-background rounded-t-[32px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-8 sm:-mt-12 md:-mt-14 pt-14 sm:pt-24 md:pt-32 pb-24 sm:pb-32 px-3.5 sm:px-8 md:px-10 relative z-20 w-full transition-colors duration-300"
      >
        <FadeIn delay={0} y={40}>
          <h2 className="hero-heading font-black uppercase text-center text-[clamp(2.5rem,10vw,160px)] mb-8 sm:mb-20 md:mb-24 leading-none tracking-tight pointer-events-auto">
            {t('projects.title')}
          </h2>
        </FadeIn>

        <div className="relative pointer-events-auto flex flex-col">
          {PROJECTS.map((project, i) => (
            <ProjectCard 
              key={project.num} 
              project={project} 
              index={i} 
              totalCards={PROJECTS.length} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}
