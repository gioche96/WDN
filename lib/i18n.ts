import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import it from "@/locales/it.json";
import en from "@/locales/en.json";
import fr from "@/locales/fr.json";
import de from "@/locales/de.json";

const resources = {
    it: {
        translation: it,
    },
    en: {
        translation: en,
    },
    fr: {
        translation: fr,
    },
    de: {
        translation: de,
    },
};

if (!i18n.isInitialized) {
    i18n.use(initReactI18next).init({
        resources,
        lng: "it",
        fallbackLng: "it",
        supportedLngs: ["it", "en", "fr", "de"],

        interpolation: {
            escapeValue: false,
        },

        react: {
            useSuspense: false,
        },
    });
}

export default i18n;