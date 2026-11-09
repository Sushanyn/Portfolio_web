import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { changeAppLanguage } from '../i18n';

export const LANGUAGES = [
  { code: 'en', label: '🇬🇧 English', flag: '🇬🇧', short: 'EN' },
  { code: 'uk', label: '🇺🇦 Українська', flag: '🇺🇦', short: 'UA' },
  { code: 'ru', label: '🇷🇺 Русский', flag: '🇷🇺', short: 'RU' },
  { code: 'pl', label: '🇵🇱 Polski', flag: '🇵🇱', short: 'PL' },
  { code: 'cs', label: '🇨🇿 Česky', flag: '🇨🇿', short: 'CS' },
  { code: 'sk', label: '🇸🇰 Slovenský', flag: '🇸🇰', short: 'SK' },
  { code: 'es', label: '🇪🇸 Español', flag: '🇪🇸', short: 'ES' },
  { code: 'fr', label: '🇫🇷 Français', flag: '🇫🇷', short: 'FR' }
];

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectLanguage = (code: string) => {
    changeAppLanguage(code);
    setIsOpen(false);
  };

  const currentLang = i18n.resolvedLanguage || i18n.language || 'en';
  const matchedLang = LANGUAGES.find(l => currentLang.startsWith(l.code)) || LANGUAGES[0];

  return (
    <div className={`relative ${className}`} ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="h-8.5 px-2.5 rounded-full border border-foreground/15 hover:border-foreground/30 hover:bg-foreground/[0.08] transition-all text-xs font-semibold text-foreground bg-foreground/[0.05] uppercase tracking-wider shadow-sm active:scale-95 flex items-center gap-1.5 overflow-hidden"
        aria-label="Change Language"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={matchedLang.code}
            initial={{ opacity: 0, y: -4, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.9 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-1.5"
          >
            <span className="text-xs">{matchedLang.flag}</span>
            <span className="text-[11px] font-mono font-medium">{matchedLang.code}</span>
          </motion.div>
        </AnimatePresence>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.95 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-full right-0 mt-2 py-1.5 w-38 bg-background/95 backdrop-blur-2xl border border-foreground/15 rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50"
          >
            {LANGUAGES.map((lang) => {
              const isSelected = matchedLang.code === lang.code;
              return (
                <button
                  key={lang.code}
                  onClick={() => handleSelectLanguage(lang.code)}
                  className={`px-3.5 py-1.5 text-left text-xs transition-colors flex items-center justify-between group ${
                    isSelected
                      ? 'bg-foreground/10 text-foreground font-semibold'
                      : 'text-foreground/70 hover:bg-foreground/5 hover:text-foreground'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span>{lang.flag}</span>
                    <span>{lang.label.split(' ')[1]}</span>
                  </div>
                  {isSelected && (
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
