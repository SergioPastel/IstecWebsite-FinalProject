import Layout from '../layouts/layout';
import { useTranslation } from 'react-i18next';

export default function EventEdit({ event }){
    const { t } = useTranslation();

    return (
        <Layout>
            evento editar
            <p>id:{ event.id }</p>
            <p>titulo:{ event.title.pt }</p>
        </Layout>
    );
}