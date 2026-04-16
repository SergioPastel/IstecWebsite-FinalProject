import Layout from "../../layouts/layout";
import { useTranslation } from 'react-i18next';

export default function EventShow({ event }){
    const { t } = useTranslation();

    return (
        <Layout>
            evento
            <p>id:{ event.id }</p>
            <p>titulo:{ event.title.pt }</p>
        </Layout>
    );
}