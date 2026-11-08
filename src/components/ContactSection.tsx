import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FadeIn } from './FadeIn';
import { Magnet } from './Magnet';
import { useTranslation } from 'react-i18next';

const SOCIALS = [
  { name: 'GitHub', url: 'https://github.com/Sushanyn' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/sushanyn/' },
  { name: 'Instagram', url: 'https://www.instagram.com/nynahsus' },
  { name: 'Email', url: 'mailto:volodymyr.sushanyn@gmail.com' },
];

export function ContactSection() {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [150, 0]);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section id="contact" ref={containerRef} className="relative min-h-[90vh] flex flex-col justify-between px-5 sm:px-8 md:px-10 pt-32 pb-10 overflow-hidden bg-background">
      
      {/* Top massive text with Magnetic Button */}
      <motion.div 
        style={{ y }} 
        className="flex-1 flex flex-col items-center justify-center relative w-full my-20 sm:my-32"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        
        <h2 
          className="font-black uppercase tracking-tighter leading-none select-none text-center w-full whitespace-nowrap transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            fontSize: `min(22vw, 90vw / ${t('contact.hire_me').length * 0.6})`,
            color: isHovered ? 'rgb(var(--hire-fill-hover))' : 'rgb(var(--accent-color))',
            transform: isHovered ? 'scale(1.2)' : 'scale(1)',
            WebkitTextStroke: isHovered ? '4px rgb(var(--hire-stroke-hover))' : '0px transparent',
            textShadow: isHovered ? '0 0 40px rgba(var(--accent-color), 0.5)' : 'none',
          }}
        >
          {t('contact.hire_me')}
        </h2>

        {/* Sophisticated Magnetic Button Overlaid */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
          <Magnet padding={200} strength={1.5}>
            <a 
              href="mailto:volodymyr.sushanyn@gmail.com"
              className="flex items-center justify-center w-36 h-36 sm:w-48 sm:h-48 md:w-56 md:h-56 border border-foreground/20 rounded-full text-foreground font-medium uppercase text-xs sm:text-sm tracking-[0.2em] backdrop-blur-md hover:border-accent hover:bg-accent hover:text-background transition-all duration-500 group shadow-2xl text-center leading-relaxed"
            >
              <span className="text-center group-hover:scale-95 transition-transform duration-500 whitespace-pre-line">
                {t('contact.email_me').replace(' ', '\n')}
              </span>
            </a>
          </Magnet>
        </div>

      </motion.div>

      {/* Bottom links (Isolated) */}
      <div className="mt-10 sm:mt-20">
        <div className="pb-12">
          
          <div className="flex flex-col gap-4">
            <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-foreground/40 font-semibold mb-4">{t('contact.socials')}</p>
            <div className="grid grid-cols-2 gap-x-12 sm:gap-x-24 gap-y-6 max-w-2xl">
              {SOCIALS.map((social, i) => (
                <FadeIn key={social.name} delay={i * 0.1} y={20}>
                  <a 
                    href={social.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-wide text-foreground hover:text-accent-light transition-colors duration-300"
                  >
                    {social.name}
                  </a>
                </FadeIn>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
