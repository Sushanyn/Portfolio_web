
import { FadeIn } from './FadeIn';
import { AnimatedText } from './AnimatedText';
import { ContactButton } from './ContactButton';
import { useTranslation } from 'react-i18next';

export function AboutSection() {
  const { t } = useTranslation();
  return (
    <section id="about" className="relative min-h-screen flex flex-col items-center justify-center px-5 sm:px-8 md:px-10 py-20 overflow-hidden">
      
      {/* Decorative Images */}
      <FadeIn delay={0.1} x={-80} y={0} duration={0.9} className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] z-0">
        <img src="https://raw.githubusercontent.com/iamcal/emoji-data/master/img-apple-160/1f3c3.png" alt="Runner" className="w-[120px] sm:w-[160px] md:w-[210px] pointer-events-none" />
      </FadeIn>
      
      <FadeIn delay={0.25} x={-80} y={0} duration={0.9} className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] z-0">
        <img src="https://raw.githubusercontent.com/iamcal/emoji-data/master/img-apple-160/1f525.png" alt="Fire" className="w-[100px] sm:w-[140px] md:w-[180px] pointer-events-none" />
      </FadeIn>
      
      <FadeIn delay={0.15} x={80} y={0} duration={0.9} className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] z-0">
        <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" alt="React" className="w-[120px] sm:w-[160px] md:w-[210px] pointer-events-none" />
      </FadeIn>
      
      <FadeIn delay={0.3} x={80} y={0} duration={0.9} className="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] z-0">
        <img src="https://raw.githubusercontent.com/iamcal/emoji-data/master/img-apple-160/1f680.png" alt="Rocket" className="w-[130px] sm:w-[170px] md:w-[220px] pointer-events-none" />
      </FadeIn>

      <div className="z-10 flex flex-col items-center">
        <FadeIn delay={0} y={40}>
          <h2 className="hero-heading font-black uppercase leading-none tracking-tight text-center text-[clamp(3rem,12vw,160px)] mb-10 sm:mb-14 md:mb-16">
            {t('about.title')}
          </h2>
        </FadeIn>

        <AnimatedText 
          text={`${t('about.desc1')} ${t('about.desc2')}`}
          className="text-foreground uppercase text-[clamp(1.5rem,4vw,3.5rem)] leading-[1.1] font-medium tracking-tight text-center max-w-[560px] mb-16 sm:mb-20 md:mb-24"
        />

        <FadeIn delay={0.2} y={30}>
          <ContactButton />
        </FadeIn>
      </div>

    </section>
  );
}
