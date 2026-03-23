import { Link, usePage } from '@inertiajs/react';
import { useTranslation } from 'react-i18next'; // Importing the useTranslation hook from react-i18next, which allows us to translate

export default function Dashboard() {
    {/* This will be used on our partial views (header) to translate content */}
    const { t, i18n } = useTranslation();

    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
    };

    const { user } = usePage().props;

    return <>
        <div>
            <h1>{t("test")}</h1>
            <label>front/pages/Home</label><br />
            <label>back/pages/Dashboard</label><br />
            <p>User: {user.name}</p>

            <button onClick={() => changeLanguage("en")}>English</button>
            <button onClick={() => changeLanguage("pt")}>Portuguese</button>
            <Link href={route('home')}>{t('click')}</Link>
        </div>

    </>;
}
