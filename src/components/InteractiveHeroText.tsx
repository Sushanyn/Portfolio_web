import { useRef, useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

export function InteractiveHeroText({ text }: { text: string }) {
  const chars = text.split('');
  const [waveOrigin, setWaveOrigin] = useState<number | null>(null);
  const [waveId, setWaveId] = useState(0);
  const lastTrigger = useRef(0);

  const triggerWave = (index: number) => {
    const now = Date.now();
    // Cooldown of 1.2s to prevent disco/spamming. Forces the wave to finish gracefully.
    if (now - lastTrigger.current < 1200) return;
    lastTrigger.current = now;
    
    setWaveOrigin(index);
    setWaveId(id => id + 1);
  };

  return (
    <div 
      className="flex justify-center whitespace-nowrap cursor-default relative w-full py-10"
      style={{ 
        perspective: 1000,
        fontSize: `min(16vw, 90vw / ${chars.length * 0.6})`
      }}
    >
      {chars.map((char, i) => (
        <AnimatedShockwaveLetter 
          key={i} 
          char={char} 
          index={i} 
          waveOrigin={waveOrigin} 
          waveId={waveId}
          onTrigger={() => triggerWave(i)}
        />
      ))}
    </div>
  );
}

function AnimatedShockwaveLetter({ 
  char, 
  index, 
  waveOrigin, 
  waveId, 
  onTrigger 
}: { 
  char: string, 
  index: number, 
  waveOrigin: number | null, 
  waveId: number, 
  onTrigger: () => void 
}) {
  const controls = useAnimation();
  
  useEffect(() => {
    if (waveOrigin === null || waveId === 0) return;
    
    // Distance from the letter that was hovered
    const distance = Math.abs(index - waveOrigin);
    // The wave travels outward. 40ms delay per letter distance.
    const delay = distance * 0.04;
    
    controls.start({
      y: [0, -35, 0],
      scale: [1, 1.25, 1],
      rotateX: [0, 30, 0],
      // Animate custom CSS variables instead of colors directly to prevent Framer Motion from caching the initial theme color
      // @ts-ignore
      '--wave-opacity': [0, 1, 0],
      // @ts-ignore
      '--shadow-opacity': [0, 0.9, 0],
      transition: {
        duration: 0.8, // 0.8s as requested
        delay: delay,
        ease: "easeInOut",
        times: [0, 0.4, 1] // Peaks at 40% of the animation duration
      }
    });
  }, [waveId, waveOrigin, index, controls]);

  return (
    <motion.span
      onMouseEnter={onTrigger}
      animate={controls}
      style={{ 
        display: 'inline-block', 
        WebkitTextFillColor: 'rgb(var(--accent-color) / var(--wave-opacity, 0))',
        filter: 'drop-shadow(0px 15px 30px rgb(var(--accent-color) / var(--shadow-opacity, 0)))'
      }}
      className={
        char === ' ' 
        ? 'w-[3vw]' 
        : 'hero-heading font-black uppercase tracking-tight leading-none text-[length:inherit]'
      }
    >
      {char}
    </motion.span>
  );
}
