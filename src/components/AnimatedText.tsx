import { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
}

// Subcomponent safely calls the hook
function Char({ char, progress, range }: { char: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return (
    <span className="relative inline-block">
      <span className="invisible">{char}</span>
      <motion.span className="absolute left-0 top-0" style={{ opacity }}>
        {char}
      </motion.span>
    </span>
  );
}

export function AnimatedText({ text, className = "" }: AnimatedTextProps) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2']
  });

  const words = text.split(' ');
  const totalChars = text.length;
  let globalCharIndex = 0;

  return (
    <p ref={containerRef} className={`${className} flex flex-wrap justify-center gap-x-[0.25em] gap-y-[0.1em]`}>
      {words.map((word, wordIdx) => {
        const wordChars = word.split('');
        const wordNode = (
          <span key={wordIdx} className="inline-flex whitespace-nowrap">
            {wordChars.map((char, charIdx) => {
              const start = globalCharIndex / totalChars;
              const end = start + (1 / totalChars);
              globalCharIndex++;
              return <Char key={charIdx} char={char} progress={scrollYProgress} range={[start, end]} />;
            })}
          </span>
        );
        
        // Add 1 for the space that was removed during split
        globalCharIndex++; 
        
        return wordNode;
      })}
    </p>
  );
}
