import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, animate, useTransform } from 'framer-motion';

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);

  useEffect(() => {
    // Lock scroll
    document.body.style.overflow = 'hidden';
    window.scrollTo(0, 0); // Force scroll to top on load
    
    // Animate the counter from 0 to 100
    const controls = animate(count, 100, {
      duration: 1,
      ease: "easeInOut",
      delay: 0.2
    });

    const timer = setTimeout(() => {
      setIsLoading(false);
      // Unlock scroll slightly before animation finishes so it feels more fluid
      setTimeout(() => {
        document.body.style.overflow = '';
      }, 800); 
    }, 1500);

    return () => {
      controls.stop();
      clearTimeout(timer);
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-background pointer-events-none"
        >
          <div className="overflow-hidden flex flex-col items-end">
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
              className="relative inline-block font-black uppercase tracking-[0.3em] text-3xl sm:text-5xl md:text-6xl"
            >
              <span className="text-foreground/20">
                Sushanyn
              </span>
              
              <motion.span
                initial={{ clipPath: "inset(0% 100% 0% 0%)" }}
                animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
                transition={{ duration: 1, ease: "easeInOut", delay: 0.2 }}
                className="absolute left-0 top-0 text-foreground"
              >
                Sushanyn
              </motion.span>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex items-center gap-1 text-foreground/50 font-mono text-xs sm:text-sm mt-3 uppercase tracking-widest"
            >
              <span>Loading</span>
              <motion.span>{rounded}</motion.span>
              <span>%</span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
