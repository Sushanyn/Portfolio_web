import { useState, useEffect } from 'react';
import { useLenis } from 'lenis/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ThemeToggle } from './ThemeToggle';
import { LanguageSwitcher, LANGUAGES } from './LanguageSwitcher';
import { useTheme } from '../hooks/useTheme';
import { X, ArrowUpRight, Sun, Moon } from 'lucide-react';

const NAV_IDS = [
  { id: '#home', key: 'nav.home' },
  { id: '#about', key: 'nav.about' },
  { id: '#services', key: 'nav.services' },
  { id: '#projects', key: 'nav.work' },
  { id: '#contact', key: 'nav.contact' },
];

const SOCIAL_LINKS = [
  { name: 'GitHub', url: 'https://github.com/Sushanyn' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/sushanyn/' },
  { name: 'Instagram', url: 'https://www.instagram.com/nynahsus' },
];

export function Navbar() {
  const { t, i18n } = useTranslation();
  const lenis = useLenis();
  const { theme, toggleTheme } = useTheme();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Track active section on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -40% 0px' }
    );

    NAV_IDS.forEach((item) => {
      const el = document.getElementById(item.id.replace('#', ''));
      if (el) observer.observe(el);
    });

    const handleScrollEvent = () => {
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50) {
        setActiveSection('contact');
      }
    };
    window.addEventListener('scroll', handleScrollEvent);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScrollEvent);
    };
  }, []);

  // Lock body scroll and listen for Escape key when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setIsMobileMenuOpen(false);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isMobileMenuOpen]);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const targetElement = document.querySelector(targetId);
    if (!targetElement) return;

    if (lenis) {
      lenis.scrollTo(targetId, { offset: 0 });
    } else {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentLang = i18n.resolvedLanguage || i18n.language || 'en';

  return (
    <>
      {/* ─────────────────────────────────────────────────────────────
          1. DESKTOP NAVBAR (Visible on Large Screens: lg and above)
          ───────────────────────────────────────────────────────────── */}
      <div className="fixed top-6 sm:top-8 left-1/2 -translate-x-1/2 z-[100] hidden lg:flex justify-center items-center gap-2 pointer-events-none px-4 w-full">
        <motion.nav 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 25, delay: 0.2 }}
          className="flex items-center gap-1 p-1.5 rounded-full bg-background/50 backdrop-blur-2xl border border-foreground/10 pointer-events-auto shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] [.theme-olive_&]:shadow-[0_20px_40px_-10px_rgba(44,53,37,0.08)] transition-colors duration-300"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {NAV_IDS.map((item, index) => {
            const isActive = activeSection === item.id.replace('#', '');
            
            return (
              <a
                key={item.id}
                href={item.id}
                onMouseEnter={() => setHoveredIndex(index)}
                onClick={(e) => handleScroll(e, item.id)}
                className="relative px-5 py-2.5 rounded-full uppercase tracking-[0.2em] text-[11px] font-semibold transition-colors duration-300 z-10 group outline-none focus:outline-none"
              >
                {/* Active Section Background */}
                {isActive && (
                  <motion.div
                    layoutId="navbar-active"
                    className="absolute inset-0 bg-accent/20 rounded-full z-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                )}

                {/* Sliding Hover Background */}
                <AnimatePresence>
                  {hoveredIndex === index && (
                    <motion.div
                      layoutId="navbar-hover"
                      className="absolute inset-0 bg-accent rounded-full z-0"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </AnimatePresence>
                
                <span 
                  className={`relative z-10 transition-colors duration-300 ${
                    hoveredIndex === index 
                      ? 'text-background font-bold' 
                      : isActive 
                        ? 'text-accent font-bold'
                        : 'text-foreground/60'
                  }`}
                >
                  {t(item.key)}
                </span>
              </a>
            );
          })}
        </motion.nav>
        
        {/* Desktop Theme and Language Switchers */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 25, delay: 0.3 }}
          className="pointer-events-auto flex items-center gap-1.5"
        >
          <ThemeToggle />
          <LanguageSwitcher />
        </motion.div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. MOBILE & SMALL TABLET TOP BAR (Screens < lg: phones & tablets)
          ───────────────────────────────────────────────────────────── */}
      <div className="fixed top-3.5 sm:top-5 left-0 right-0 z-[100] flex lg:hidden justify-center pointer-events-none px-3.5 sm:px-6 w-full">
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 25, delay: 0.2 }}
          className="pointer-events-auto w-full max-w-xl h-12 sm:h-13 px-3.5 sm:px-4 rounded-full bg-background/80 backdrop-blur-2xl border border-foreground/10 shadow-[0_15px_30px_-10px_rgba(0,0,0,0.3)] [.theme-olive_&]:shadow-[0_15px_30px_-10px_rgba(44,53,37,0.08)] flex items-center justify-between transition-colors duration-300"
        >
          {/* Brand Name on the Left */}
          <a
            href="#home"
            onClick={(e) => handleScroll(e, '#home')}
            className="flex items-center gap-1.5 group active:scale-95 transition-transform"
          >
            <span className="font-extrabold text-xs sm:text-sm tracking-widest uppercase text-foreground">
              Sushanyn
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          </a>

          {/* Unified Controls: Theme, Language, and Menu */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <ThemeToggle />
            <LanguageSwitcher />

            {/* Apple-style Unified Menu Trigger */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="h-8.5 px-3 rounded-full border border-foreground/15 bg-foreground/[0.05] hover:bg-foreground hover:text-background text-foreground transition-all duration-300 active:scale-95 shadow-sm flex items-center gap-1.5"
              aria-label="Open Navigation Menu"
            >
              <div className="flex flex-col justify-center items-center gap-1 w-3.5 h-3.5">
                <span className="w-3.5 h-[1.5px] bg-current rounded-full" />
                <span className="w-3.5 h-[1.5px] bg-current rounded-full" />
              </div>
              <span className="text-[11px] font-semibold tracking-wider uppercase hidden xs:inline">
                Menu
              </span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. FULLSCREEN MOBILE & TABLET NAVIGATION DRAWER
          ───────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[200] bg-background/95 backdrop-blur-3xl flex flex-col justify-between p-5 sm:p-8 overflow-y-auto"
          >
            {/* Drawer Top Bar */}
            <div className="w-full flex items-center justify-between pb-5 border-b border-foreground/10">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm sm:text-base tracking-widest uppercase text-foreground">
                  Sushanyn
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              </div>

              {/* Close Button */}
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-8.5 h-8.5 rounded-full border border-foreground/15 bg-foreground/[0.05] hover:bg-foreground hover:text-background text-foreground flex items-center justify-center transition-all active:scale-90 shadow-sm"
                aria-label="Close Navigation Menu"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Main Navigation Links */}
            <div className="flex-1 py-8 flex flex-col justify-center gap-2 max-w-lg mx-auto w-full">
              {NAV_IDS.map((item, index) => {
                const isActive = activeSection === item.id.replace('#', '');

                return (
                  <motion.a
                    key={item.id}
                    href={item.id}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: index * 0.05 + 0.1, duration: 0.3 }}
                    onClick={(e) => {
                      handleScroll(e, item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`group flex items-center justify-between py-3.5 sm:py-4 px-5 rounded-2xl transition-all duration-300 ${
                      isActive
                        ? 'bg-foreground/10 text-foreground font-bold shadow-sm'
                        : 'text-foreground/75 hover:text-foreground hover:bg-foreground/5'
                    }`}
                  >
                    <div className="flex items-center gap-4 sm:gap-6">
                      <span className="font-mono text-xs sm:text-sm text-foreground/40 font-normal">
                        0{index + 1}
                      </span>
                      <span className="text-2xl sm:text-3xl font-semibold tracking-tight uppercase">
                        {t(item.key)}
                      </span>
                    </div>

                    <div className="flex items-center">
                      {isActive ? (
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono uppercase tracking-widest text-accent font-medium hidden sm:inline">
                            Current
                          </span>
                          <span className="w-2.5 h-2.5 rounded-full bg-accent shadow-[0_0_12px_rgb(var(--accent-color))]" />
                        </div>
                      ) : (
                        <ArrowUpRight className="w-5 h-5 text-foreground/30 transition-transform duration-300 group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      )}
                    </div>
                  </motion.a>
                );
              })}
            </div>

            {/* Drawer Footer: 1-Tap Languages, Theme, and Socials */}
            <div className="w-full pt-6 border-t border-foreground/10 flex flex-col gap-5 max-w-lg mx-auto">
              
              {/* Language Selector: 1-Tap Quick Pills */}
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-mono tracking-widest uppercase text-foreground/45">
                  Language
                </span>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {LANGUAGES.map((lang) => {
                    const isCurrent = currentLang.startsWith(lang.code);
                    return (
                      <button
                        key={lang.code}
                        onClick={() => {
                          i18n.changeLanguage(lang.code);
                        }}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 flex items-center gap-1.5 ${
                          isCurrent
                            ? 'bg-foreground text-background font-bold shadow-sm scale-105'
                            : 'bg-foreground/[0.04] border border-foreground/10 text-foreground/70 hover:bg-foreground/10 hover:text-foreground'
                        }`}
                      >
                        <span>{lang.flag}</span>
                        <span className="uppercase">{lang.short}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Row: Theme Toggle + Direct Email + Socials */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
                {/* Theme Switcher Button */}
                <button
                  onClick={toggleTheme}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-foreground/[0.06] border border-foreground/10 text-foreground text-xs font-semibold uppercase tracking-wider hover:bg-foreground hover:text-background transition-all active:scale-95"
                >
                  {theme === 'dark' ? (
                    <>
                      <Sun className="w-4 h-4" />
                      <span>Olive Theme</span>
                    </>
                  ) : (
                    <>
                      <Moon className="w-4 h-4" />
                      <span>Dark Theme</span>
                    </>
                  )}
                </button>

                {/* Social Links */}
                <div className="flex items-center justify-center gap-3 sm:gap-4">
                  {SOCIAL_LINKS.map((s) => (
                    <a
                      key={s.name}
                      href={s.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs uppercase tracking-wider text-foreground/60 hover:text-foreground font-medium transition-colors"
                    >
                      {s.name}
                    </a>
                  ))}
                  <a
                    href="mailto:volodymyr.sushanyn@gmail.com"
                    className="text-xs uppercase tracking-wider text-accent font-semibold hover:underline"
                  >
                    Email Me
                  </a>
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
