import Layout from '../../layouts/layout';
import { useTranslation } from 'react-i18next';

export default function CourseShow({ course }){
    const { t } = useTranslation();

    return (
        <Layout>
            Curso
            <p>id:{ course.id }</p>
            <p>titulo:{ course.title }</p>
        </Layout>
    );
}