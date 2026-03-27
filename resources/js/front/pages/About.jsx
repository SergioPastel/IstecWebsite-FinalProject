import Layout from '../layouts/layout';
import { useTranslation } from 'react-i18next'; // needed in EVERY view to use the translated text
import { Link } from '@inertiajs/react';

export default function About() {
    const { t } = useTranslation(); // needed in EVERY view to use the translated text
    return (
        <Layout>
            <div>
                <h1>{t("language")}</h1>

                <h1>{t("test")}</h1>
                <label>front/pages/About</label>
            </div>
        </Layout>
    );
}