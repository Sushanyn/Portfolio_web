import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en';
import ru from './locales/ru';
import uk from './locales/uk';
import fr from './locales/fr';
import es from './locales/es';
import cs from './locales/cs';
import sk from './locales/sk';
import pl from './locales/pl';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ru: { translation: ru },
      uk: { translation: uk },
      fr: { translation: fr },
      es: { translation: es },
      cs: { translation: cs },
      sk: { translation: sk },
      pl: { translation: pl }
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
