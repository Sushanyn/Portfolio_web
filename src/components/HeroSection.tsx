import { Navbar } from './Navbar';
import { ContactButton } from './ContactButton';
import { ShortInfoButton } from './ShortInfoButton';
import { FadeIn } from './FadeIn';
import { InteractiveHeroText } from './InteractiveHeroText';
import { useTranslation } from 'react-i18next';

export function HeroSection() {
  const { t } = useTranslation();
  return (
    <section id="home" className="h-screen flex flex-col overflow-x-clip relative">
      <Navbar />

      <div className="flex-1 flex flex-col justify-center overflow-hidden">
        <FadeIn delay={0.15} y={40} className="w-full text-center mt-6 sm:mt-4 md:-mt-5">
          <InteractiveHeroText text={t('hero.title')} />
        </FadeIn>
      </div>

      <div className="flex justify-between items-end pb-7 sm:pb-8 md:pb-10 px-5 sm:px-8 md:px-10 z-20">
        <FadeIn delay={0.35} y={20}>
          <p className="text-foreground font-light uppercase tracking-wide leading-snug max-w-[160px] sm:max-w-[220px] md:max-w-[260px] text-[clamp(0.75rem,1.4vw,1.5rem)]">
            {t('hero.subtitle')}
          </p>
        </FadeIn>
        
        <FadeIn delay={0.5} y={20}>
          <div className="flex items-center gap-3 sm:gap-4">
            <ShortInfoButton />
            <ContactButton />
          </div>
        </FadeIn>
      </div>

    </section>
  );
}
