import { motion } from 'framer-motion';

export function NotFoundPage() {
  return (
    <div className="h-screen w-full bg-background flex flex-col items-center justify-center overflow-hidden relative">
      {/* Background Elements */}
      <motion.div 
        animate={{ y: [0, -30, 0], rotate: [0, 15, -15, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        className="text-[120px] absolute top-[15%] left-[10%] opacity-20 select-none pointer-events-none"
      >
        🌀
      </motion.div>
      <motion.div 
        animate={{ y: [0, 40, 0], rotate: [0, -20, 20, 0] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut", delay: 1 }}
        className="text-[100px] absolute bottom-[15%] right-[15%] opacity-20 select-none pointer-events-none"
      >
        🛸
      </motion.div>
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="w-[300px] h-[300px] bg-accent/20 rounded-full blur-[100px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none"
      />

      <div className="relative z-10">
        <motion.h1 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="font-black uppercase tracking-tight text-[25vw] sm:text-[18vw] leading-none text-foreground text-center"
        >
          404
        </motion.h1>
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
          className="absolute -top-10 -right-10 md:-top-20 md:-right-20 bg-accent text-white font-bold text-sm md:text-xl px-4 py-2 md:px-8 md:py-4 rounded-full rotate-12"
        >
          Oops!
        </motion.div>
      </div>

      <motion.p 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-foreground/70 text-lg md:text-2xl mt-8 mb-12 uppercase tracking-[0.2em] font-light text-center px-4"
      >
        Page lost in space
      </motion.p>

      <motion.a 
        href="/"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        whileHover={{ scale: 1.05, backgroundColor: "rgb(var(--foreground))", color: "rgb(var(--background))" }}
        whileTap={{ scale: 0.95 }}
        className="border border-foreground/30 text-foreground px-8 py-4 rounded-full uppercase tracking-widest font-medium transition-colors z-10"
      >
        Go Home
      </motion.a>
    </div>
  );
}
