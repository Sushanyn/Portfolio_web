import { FadeIn } from './FadeIn';
import { useTranslation } from 'react-i18next';

const SERVICE_NUMS = ["01", "02", "03", "04", "05"];

export function ServicesSection() {
  const { t } = useTranslation();

  return (
    <section id="services" className="min-h-screen bg-foreground rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 pt-20 sm:pt-24 md:pt-32 pb-20 relative z-20">
      <FadeIn delay={0} y={40}>
        <h2 className="text-background font-black uppercase text-center text-[clamp(3rem,12vw,160px)] mb-16 sm:mb-20 md:mb-28 leading-none tracking-tight">
          {t('services.title')}
        </h2>
      </FadeIn>

      <div className="max-w-5xl mx-auto flex flex-col px-5 sm:px-8 md:px-10 overflow-hidden">
        {SERVICE_NUMS.map((num, i) => (
          <FadeIn key={num} delay={i * 0.1} y={30} className="border-b border-background/15 last:border-b-0">
            <div className="flex flex-col md:flex-row gap-6 sm:gap-8 md:gap-16 items-start md:items-center py-10 sm:py-12 border-t border-background/20 group hover:border-background/60 transition-colors duration-500 cursor-default">
              <span className="text-background font-black text-[clamp(3rem,10vw,140px)] leading-none shrink-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-2 group-hover:opacity-40">
                {num}
              </span>
              <div className="flex flex-col gap-3 sm:gap-4 flex-1 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-4 md:group-hover:translate-x-8">
                <h3 className="text-background font-medium uppercase text-[clamp(1rem,2.2vw,2.1rem)]">
                  {t(`services.s${i + 1}_name`)}
                </h3>
                <p className="text-background font-light leading-relaxed max-w-2xl text-[clamp(0.85rem,1.6vw,1.25rem)] opacity-60 transition-opacity duration-700 group-hover:opacity-100">
                  {t(`services.s${i + 1}_desc`)}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
