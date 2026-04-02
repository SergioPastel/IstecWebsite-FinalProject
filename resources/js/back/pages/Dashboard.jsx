import { Link, usePage } from '@inertiajs/react';
import { useTranslation } from 'react-i18next'; // Importing the useTranslation hook from react-i18next, which allows us to translate
import Layout from '../../front/layouts/layout';

export default function Dashboard({ analytics }) {
    {/* This will be used on our partial views (header) to translate content */}
    const { t, i18n } = useTranslation();

    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
    };

    const { user } = usePage().props;

    return <>
        <Layout>
            <div>
                <h1>{t("test")}</h1>
                <label>back/pages/Dashboard</label><br />
                <p>User: {user.name}</p>

                <p>Stats:</p>
                <p>Visitantes: {analytics.visitors}</p> 
                <p>Visualizações: {analytics.pageviews}</p>
                <p>Botão de curso clicado: {analytics.course_check}</p>

                <button onClick={() => changeLanguage("en")}>English</button>
                <button onClick={() => changeLanguage("pt")}>Portuguese</button>
                <Link href={route('backoffice.courses')}>{t('click')}</Link>
            </div>
        </Layout>
    </>;
}
