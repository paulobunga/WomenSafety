import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        title: "Welcome",
        alerts: "Alerts",
        favorites: "Favorites",
        record: "Record",
        cancel: "cancel",
        send: "send",
        phone: "Phone",
        address: "Address",
        postedOn: "Posted On",
        name: "name",
        bloodRequestForm: "Blood request form",
        bloodRequests: "Blood Requests",
        missingChildren: "Missing Children",
        age: "age",
        childInfoForm: "Child information form",
        logout: "Logout",
        yourFavorites: "Your favorites",
        addFavorites: "Add Favorites"
      }
    },
    gu: {
      translation: {
        title: "સ્વાગત છે",
        alerts: "સંપર્ક",
        favorites: "મિત્રો",
        record: "રેકોર્ડ",
        cancel: "રદ કરો",
        send: "મોકલો",
        phone: "ફોન",
        address: "સરનામું",
        postedOn: "તારીખ",
        name: "નામ",
        bloodRequestForm: "રક્ત વિનંતી ફોર્મ",
        bloodRequests: "રક્ત વિનંતીઓ",
        missingChildren: "લાપતા બાળકો",
        age: "ઉંમર",
        childInfoForm: "બાળક માહિતી ફોર્મ",
        logout: "લૉગ આઉટ",
        yourFavorites: "તમારા મિત્રો",
        addFavorites: "મિત્રો ઉમેરો"
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
