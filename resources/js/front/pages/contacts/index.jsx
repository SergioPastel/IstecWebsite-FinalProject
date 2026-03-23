import Layout from "../layouts/layout";
import { useTranslation } from 'react-i18next';

export default function ContactsIndex({ contacts }) {
    const { t } = useTranslation();

    return (
        <Layout>
            <h1>{t("language")}</h1>

            <div className="container mx-auto p-6">
                <h1 className="text-3xl font-bold mb-6">Contacts</h1>
            </div>
        </Layout>
    );
}