import { motion } from 'framer-motion';

export function LiveProjectButton() {
  return (
    <motion.button 
      whileHover="hover"
      className="group relative rounded-full border border-foreground/30 text-foreground font-medium uppercase tracking-[0.2em] px-6 py-2.5 sm:px-8 sm:py-3 text-xs sm:text-sm transition-all duration-300 hover:border-accent hover:bg-accent hover:text-background flex items-center justify-center gap-3 overflow-hidden"
    >
      <span>Live Project</span>
      <motion.span 
        variants={{ hover: { x: 3, y: -3, rotate: -45 } }}
        initial={{ rotate: -45 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        →
      </motion.span>
    </motion.button>
  );
}
