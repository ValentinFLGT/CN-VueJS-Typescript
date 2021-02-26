import { createI18n} from "vue-i18n";

const messages = {
    en: {
        hi: "Hello!",
        test: "Test",
    },
    fr: {
        hi: "Bonjour !",
        test: "Test",
    },
};

const i18n = createI18n({
    locale: "fr",
    messages: messages,
});

export default i18n;