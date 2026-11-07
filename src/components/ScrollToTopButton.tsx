import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLenis } from 'lenis/react';

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0);
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          whileHover="hover"
          onClick={scrollToTop}
          className="group fixed bottom-6 left-6 sm:bottom-10 sm:left-10 z-[9900] w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-foreground/30 flex items-center justify-center bg-background/50 backdrop-blur-md text-foreground hover:border-accent hover:bg-accent hover:text-background transition-colors duration-300 shadow-xl overflow-hidden pointer-events-auto"
          aria-label="Scroll to top"
        >
          <motion.span
            variants={{
              hover: { y: -3 }
            }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="text-lg sm:text-xl font-light"
          >
            ↑
          </motion.span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
