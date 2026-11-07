
import { ReactLenis } from 'lenis/react';
import { HeroSection } from './components/HeroSection';
import { MarqueeSection } from './components/MarqueeSection';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ContactSection } from './components/ContactSection';
import { ScrollToTopButton } from './components/ScrollToTopButton';
import { Preloader } from './components/Preloader';

function App() {
  return (
    <ReactLenis root>
      <div className="overflow-x-clip bg-background">
        <Preloader />
        <ScrollToTopButton />
        <HeroSection />
        <MarqueeSection />
        <AboutSection />
        <ServicesSection />
        <ProjectsSection />
        <ContactSection />
      </div>
    </ReactLenis>
  );
}

export default App;
