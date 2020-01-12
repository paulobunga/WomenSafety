import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        title: "Welcome"
      }
    },
    gu: {
      translation: {
        title: "સ્વાગત છે"
      }
    },
    hi: {
      translation: {
        title: "स्वागत हे"
      }
    }
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
