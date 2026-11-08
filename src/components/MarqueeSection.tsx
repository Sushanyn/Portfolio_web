import { useEffect, useRef, useState } from 'react';

const IMAGES = [
  "/projects/project-1.png",
  "/projects/project-2.png",
  "/projects/project-3.png",
  "/projects/project-4.png",
  "/projects/project-5.png",
  "/projects/project-6.png",
  "/projects/project-7.png",
  "/projects/project-8.png",
  "/projects/project-9.png",
  "/projects/project-10.png",
];

const ROW_1_IMAGES = IMAGES.slice(0, 5);
const ROW_2_IMAGES = IMAGES.slice(5);

export function MarqueeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const { top } = sectionRef.current.getBoundingClientRect();
      const scrollY = window.scrollY;
      const sectionTop = scrollY + top;
      
      // Calculate based on viewport intersection
      if (scrollY + window.innerHeight > sectionTop && scrollY < sectionTop + sectionRef.current.offsetHeight) {
        setOffset((scrollY - sectionTop + window.innerHeight) * 0.3);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial position
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="bg-background pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden flex flex-col gap-3">
      <div 
        className="flex gap-3 w-max"
        style={{ 
          transform: `translate3d(${offset - 200}px, 0, 0)`,
          willChange: 'transform'
        }}
      >
        {[...ROW_1_IMAGES, ...ROW_1_IMAGES, ...ROW_1_IMAGES].map((src, i) => (
          <img 
            key={`row1-${i}`}
            src={src}
            alt="Marquee item"
            loading="lazy"
            className="w-[280px] sm:w-[380px] md:w-[480px] aspect-video rounded-2xl object-cover flex-shrink-0 border border-foreground/10"
          />
        ))}
      </div>

      <div 
        className="flex gap-3 w-max"
        style={{ 
          transform: `translate3d(${-(offset - 200)}px, 0, 0)`,
          willChange: 'transform'
        }}
      >
        {[...ROW_2_IMAGES, ...ROW_2_IMAGES, ...ROW_2_IMAGES].map((src, i) => (
          <img 
            key={`row2-${i}`}
            src={src}
            alt="Marquee item"
            loading="lazy"
            className="w-[280px] sm:w-[380px] md:w-[480px] aspect-video rounded-2xl object-cover flex-shrink-0 border border-foreground/10"
          />
        ))}
      </div>
    </section>
  );
}
