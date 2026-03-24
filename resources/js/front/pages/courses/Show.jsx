import Layout from '../../layouts/layout';
import { useTranslation } from 'react-i18next';

export default function CourseShow({ course }){
    const { t } = useTranslation();

    return (
        <Layout>
            <p>id:{ course.id }</p>
            <p>id:{ course.title }</p>
        </Layout>
    );
}