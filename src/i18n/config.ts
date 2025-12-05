import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import mi from './locales/mi.json';
import zh from './locales/zh.json';

/**
 * i18next configuration for multi-language support
 * Supports: English, Maori (Māori), Chinese
 */

const resources = {
  en: {
    translation: en,
  },
  mi: {
    translation: mi,
  },
  zh: {
    translation: zh,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    compatibilityJSON: 'v3',
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;

