import { createI18n} from "vue-i18n";
import en from "../assets/translations/translation.en"
import fr from "../assets/translations/translation.fr"

const messages = {
    fr,
    en
};

const i18n = createI18n({
    locale: "en",
    messages: messages,
});

export default i18n;