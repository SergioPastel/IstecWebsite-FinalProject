import Layout from '../layouts/layout';
import { useTranslation } from 'react-i18next';
import { Link } from '@inertiajs/react';

export default function CreateNews() {
    const { t } = useTranslation();
    
    return(
        <p>Create news</p>
    );
}