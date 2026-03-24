import Layout from '../layouts/layout';
import { useTranslation } from 'react-i18next';
import { Link } from '@inertiajs/react';

export default function CreateCourse({ course }) {
    const { t } = useTranslation();
    
    return(
        <Layout>
            <p>Edit course</p>
            <p>{ course.title }({ course.id })</p>
        </Layout>
    );
}