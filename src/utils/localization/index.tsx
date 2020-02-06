import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        title: "Welcome",
        alerts: "Alerts",
        favorites: "Favorites",
        record: "Record"
      }
    },
    gu: {
      translation: {
        title: "સ્વાગત છે",
        alerts: "સંપર્ક",
        favorites: "મિત્રો",
        record: "રેકોર્ડ"
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
