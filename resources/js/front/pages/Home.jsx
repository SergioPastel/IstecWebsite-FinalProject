// THIS IS NOT USED ANYMORE, USE IT AS AN EXAMPLE

import Layout from '../layout';
import { useTranslation } from 'react-i18next'; // needed in EVERY view to use the translated text
import { Link } from '@inertiajs/react';

export default function Home() {
    const { t } = useTranslation(); // needed in EVERY view to use the translated text
    return (
        <Layout>
            <div>
                <h1>{t("language")}</h1>

                <h1>{t("test")}</h1>
                <label>front/pages/Home</label><br />
                <Link href={route('dashboard')}>{t('click')}</Link><br />
                <Link href={route('about')}>About us</Link>
            </div>
        </Layout>
    );
}
