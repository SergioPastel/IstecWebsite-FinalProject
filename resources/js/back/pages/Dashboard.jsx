import { useTranslation } from 'react-i18next'; // Importing the useTranslation hook from react-i18next, which allows us to translate

export default function Dashboard() {
    {/* This will be used on our partial views (header) to translate content */}
    const { t, i18n } = useTranslation();

    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
    };

    return <>
        <div>
            <h1>{t("test")}</h1>
            <label>back/pages/Dashboard</label><br />
            <button onClick={() => changeLanguage("en")}>English</button>
            <button onClick={() => changeLanguage("pt")}>Portuguese</button>
        </div>
    </>;
}