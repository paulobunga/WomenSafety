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
        bloodDonation: "Blood Donation",
        age: "age",
        childInfoForm: "Child information form",
        logout: "Logout",
        emergency: "Emergency",
        yourFavorites: "Your favorites",
        addFavorites: "Add Favorites",
        emergencyContacts: "Emergency Contacts",
        ambulance: 'Ambulance',
        police: 'Police',
        alert: 'Alert',
        violence: 'Violence',
        kidnapping: 'Kidnapping',
        fireFighter: 'Firefighter'
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
        emergency: "કટોકટી",
        yourFavorites: "તમારા મિત્રો",
        addFavorites: "મિત્રો ઉમેરો",
        emergencyContacts: "કટોકટી સંપર્કો",
        ambulance: 'દર્દીવાહિની',
        police: 'પોલીસ',
        alert: 'ચેતવણી',
        violence: 'હિંસા',
        kidnapping: 'અપહરણ',
        fireFighter: 'અગ્નિશામક'
      }
    },
    hi: {
      translation: {
        title: "स्वागत हे",
        alerts: "चेतावनी",
        favorites: "पसंदीदा",
        record: "अभिलेख",
        cancel: "रद्द करना",
        send: "भेजना",
        phone: "फ़ोन",
        address: "पता",
        postedOn: "पर प्रविष्ट किया",
        name: "नाम",
        bloodRequestForm: "रक्त अनुरोध प्रपत्र",
        bloodRequests: "रक्त अनुरोध",
        missingChildren: "ग़ुम बच्चे",
        bloodDonation: "रक्त दान",
        age: "उम्र",
        childInfoForm: "बाल जानकारी प्रपत्र",
        logout: "लॉग आउट",
        emergency: "आपातकालीन",
        yourFavorites: "आपका पसंदीदा",
        addFavorites: "पसंदीदा मे समूह करना",
        emergencyContacts: "आपातकालीन संपर्क",
        ambulance: 'रोगी-वाहन',
        police: 'पुलिस',
        alert: 'चेतावनी',
        violence: 'हिंसा',
        kidnapping: 'अपहरण',
        fireFighter: 'आग बुझानेवाला'
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
