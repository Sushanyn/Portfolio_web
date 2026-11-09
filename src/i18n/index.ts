import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en';
import ru from './locales/ru';
import uk from './locales/uk';
import fr from './locales/fr';
import es from './locales/es';
import cs from './locales/cs';
import sk from './locales/sk';
import pl from './locales/pl';

export const SUPPORTED_LANGUAGES = ['en', 'uk', 'ru', 'fr', 'es', 'cs', 'sk', 'pl'] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

export const USER_LANG_STORAGE_KEY = 'portfolio_user_lang';

/**
 * Detect language:
 * 1. Checks if the user manually saved a preferred language in localStorage.
 * 2. Checks browser languages (navigator.languages / navigator.language).
 * 3. Fallback to English ('en') if not supported or not found.
 */
export function getInitialLanguage(): SupportedLanguage {
  // Clear any legacy stuck value from older i18next detector
  try {
    localStorage.removeItem('i18nextLng');
  } catch {
    // Ignore storage errors in private mode
  }

  // 1. Explicit user selection
  try {
    const saved = localStorage.getItem(USER_LANG_STORAGE_KEY);
    if (saved && (SUPPORTED_LANGUAGES as readonly string[]).includes(saved)) {
      return saved as SupportedLanguage;
    }
  } catch {
    // Ignore storage errors
  }

  // 2. Browser language detection
  if (typeof navigator !== 'undefined') {
    const candidates: string[] = [];
    if (Array.isArray(navigator.languages)) {
      candidates.push(...navigator.languages);
    }
    if (navigator.language) {
      candidates.push(navigator.language);
    }
    if ((navigator as unknown as { userLanguage?: string }).userLanguage) {
      candidates.push((navigator as unknown as { userLanguage: string }).userLanguage);
    }

    for (const raw of candidates) {
      if (!raw || typeof raw !== 'string') continue;
      const base = raw.trim().toLowerCase().split('-')[0];
      if ((SUPPORTED_LANGUAGES as readonly string[]).includes(base)) {
        return base as SupportedLanguage;
      }
    }
  }

  // 3. Fallback to English
  return 'en';
}

i18n
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
    lng: getInitialLanguage(),
    fallbackLng: 'en',
    supportedLngs: SUPPORTED_LANGUAGES as unknown as string[],
    load: 'languageOnly',
    interpolation: {
      escapeValue: false
    }
  });

/**
 * Switch language with a smooth crossfade animation and persist choice
 */
export async function changeAppLanguage(newCode: string): Promise<void> {
  const current = i18n.resolvedLanguage || i18n.language;
  if (current === newCode) return;

  // Add transition class to start smooth fade-out
  document.documentElement.classList.add('lang-transitioning');
  await new Promise((resolve) => setTimeout(resolve, 140));

  // Change language in i18next
  await i18n.changeLanguage(newCode);

  // Save user explicit preference
  try {
    localStorage.setItem(USER_LANG_STORAGE_KEY, newCode);
  } catch {
    // Ignore storage errors
  }

  // Allow DOM to update then smoothly fade back in
  requestAnimationFrame(() => {
    setTimeout(() => {
      document.documentElement.classList.remove('lang-transitioning');
    }, 40);
  });
}

export default i18n;
