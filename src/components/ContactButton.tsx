import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export function ContactButton() {
  const { t } = useTranslation();
  return (
    <motion.a 
      href="mailto:volodymyr.sushanyn@gmail.com"
      whileHover="hover"
      className="group relative inline-flex rounded-full border border-foreground/30 text-foreground font-medium uppercase tracking-[0.2em] px-8 py-3 sm:px-10 sm:py-3.5 text-xs sm:text-sm transition-all duration-300 hover:border-accent hover:bg-accent hover:text-background overflow-hidden items-center justify-center"
    >
      <span className="relative z-10 transition-transform duration-300 group-hover:-translate-y-[150%]">
        {t('buttons.contact', 'Contact Me')}
      </span>
      <span className="absolute inset-0 flex items-center justify-center z-10 translate-y-[150%] transition-transform duration-300 group-hover:translate-y-0">
        {t('buttons.contact', 'Contact Me')}
      </span>
    </motion.a>
  );
}
