import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import langAr from "../utils/lang/ar.json";
const supportedLanguages = ["en", "ar"];

const resources = {
  ar: {
    translation: langAr,
  },
};
i18n
  .use(LanguageDetector)
  .use(Backend)
  .use(initReactI18next)
  .init({
    lng: "ar",
    supportedLngs: supportedLanguages,
    resources,
    fallbackLng: "ar", // Default language in case a translation is missing
    interpolation: {
      escapeValue: false,
    },
    debug: false,
  });
export default i18n;
