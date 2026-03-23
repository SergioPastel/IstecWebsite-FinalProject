import Layout from "../../layouts/layout";
import { useTranslation } from 'react-i18next';

export default function NewsIndex({ news }) {
    const { t } = useTranslation();

    return (
        <Layout>
            <h1>{t("language")}</h1>

            <div className="container mx-auto p-6">
                <h1 className="text-3xl font-bold mb-6">News</h1>
            </div>
        </Layout>
    );
}