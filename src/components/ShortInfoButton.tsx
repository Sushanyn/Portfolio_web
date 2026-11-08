import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Badge = ({ children }: { children: React.ReactNode }) => (
  <span className="px-2 py-0.5 text-[9px] sm:text-[10px] rounded font-semibold tracking-wider bg-foreground/5 border border-foreground/10 text-foreground/80 hover:bg-foreground/10 hover:border-accent/30 hover:text-accent transition-all cursor-default">
    {children}
  </span>
);

export function ShortInfoButton() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.button 
        onClick={() => setIsOpen(true)}
        whileHover="hover"
        className="group relative rounded-full border border-foreground/30 text-foreground font-medium uppercase tracking-[0.2em] px-8 py-3 sm:px-10 sm:py-3.5 text-xs sm:text-sm transition-all duration-300 hover:border-accent hover:bg-accent hover:text-background flex items-center justify-center gap-3 overflow-hidden"
      >
        <span>{t('buttons.shortInfo', 'Short Info')}</span>
        <motion.span 
          variants={{ hover: { y: 2 } }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          ↓
        </motion.span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 text-left">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-background/80 backdrop-blur-md cursor-pointer"
            />
            
            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl bg-background border border-foreground/10 rounded-2xl p-6 shadow-2xl overflow-hidden"
            >
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-foreground/10 transition-colors z-10"
              >
                <X className="w-5 h-5 text-foreground/50 hover:text-foreground" />
              </button>

              <div className="space-y-6">
                
                {/* Header */}
                <div className="text-center space-y-1 pt-2">
                  <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tighter">
                    Volodymyr <span className="text-accent">Sushanyn</span>
                  </h2>
                  <p className="text-accent text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase">
                    {t('shortInfo.subtitle', 'Designing clean and modern UI')}
                  </p>
                </div>

                {/* Whoami */}
                <div className="space-y-2">
                  <h3 className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] border-b border-foreground/10 pb-1">
                    {t('shortInfo.whoami', 'Whoami 👨‍💻')}
                  </h3>
                  <p className="text-foreground/70 leading-relaxed text-[11px] sm:text-xs">
                    {t('shortInfo.whoami_desc', 'Aspiring software engineer and student focusing on full-stack web development (React + Node.js). I am passionate about learning modern technologies, exploring application architecture, and writing clean, efficient code.')}
                  </p>
                </div>

                {/* Stack */}
                <div className="space-y-3 pb-2">
                  <h3 className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] border-b border-foreground/10 pb-1">
                    {t('shortInfo.stack', 'Stack 🚀')}
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <h4 className="text-[9px] font-bold text-foreground/40 uppercase tracking-[0.2em]">{t('shortInfo.frontend', 'Frontend')}</h4>
                      <div className="flex flex-wrap gap-1.5">
                        <Badge>React</Badge>
                        <Badge>HTML5</Badge>
                        <Badge>CSS3</Badge>
                        <Badge>TailwindCSS</Badge>
                        <Badge>Zustand</Badge>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <h4 className="text-[9px] font-bold text-foreground/40 uppercase tracking-[0.2em]">{t('shortInfo.backend', 'Backend & DB')}</h4>
                      <div className="flex flex-wrap gap-1.5">
                        <Badge>Node.js</Badge>
                        <Badge>PostgreSQL</Badge>
                        <Badge>MySQL</Badge>
                        <Badge>Supabase</Badge>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <h4 className="text-[9px] font-bold text-foreground/40 uppercase tracking-[0.2em]">{t('shortInfo.languages_title', 'Languages')}</h4>
                      <div className="flex flex-wrap gap-1.5">
                        <Badge>JavaScript</Badge>
                        <Badge>TypeScript</Badge>
                        <Badge>Python</Badge>
                        <Badge>C++</Badge>
                        <Badge>C#</Badge>
                        <Badge>Java</Badge>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <h4 className="text-[9px] font-bold text-foreground/40 uppercase tracking-[0.2em]">{t('shortInfo.devops', 'DevOps, Tools & CMS')}</h4>
                      <div className="flex flex-wrap gap-1.5">
                        <Badge>Docker</Badge>
                        <Badge>Git</Badge>
                        <Badge>Vercel</Badge>
                        <Badge>Vite</Badge>
                        <Badge>Figma</Badge>
                        <Badge>WordPress</Badge>
                        <Badge>Shopify</Badge>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
