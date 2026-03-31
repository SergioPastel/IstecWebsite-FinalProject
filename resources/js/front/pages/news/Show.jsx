import Layout from '../layouts/layout';
import { useTranslation } from 'react-i18next';
import { Link } from '@inertiajs/react';

export default function ShowNews({ news }) {
    const { t } = useTranslation();
    
    return(
        <Layout>
            <p>Edit news</p>
            <p>{ news.title.pt }({ news.id })</p>
        </Layout>
    );
}