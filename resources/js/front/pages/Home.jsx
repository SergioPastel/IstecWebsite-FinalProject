import { useTranslation } from 'react-i18next'; // needed in EVERY view to use the translated text
import Layout from '../layouts/layout';
import { Link } from '@inertiajs/react';


export default function Home() {
    {/* This will be used on our partial views (header) to translate content */}
    const { t, i18n } = useTranslation();

    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
    };

    return <>
        <div>
            <h1>{t("test")}</h1>
            <label>front/pages/Home</label><br />
            <button onClick={() => changeLanguage("en")}>English</button>
            <button onClick={() => changeLanguage("pt")}>Portuguese</button>
            <Link href={route('dashboard')}>{t('click')}</Link>
        </div>
        
    </>;
}
