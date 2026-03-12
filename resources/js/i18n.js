import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "../../lang/en.json"
import pt from "../../lang/pt.json"

// the translations
// Links to my lang folder's json files
const resources = {
    en: { translation: en },
    pt: { translation: pt}
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "pt", // language to use by default, change it to "en" if you want to use English by default

    interpolation: {
      escapeValue: false // react already does escaping, so we don't need to escape values again
    }
  });

  export default i18n;