import { useTranslation } from 'react-i18next'; // Importing the useTranslation hook from react-i18next, which allows us to translate

export default function Home() {
    const { t } = useTranslation();

    return <h1>{ t('test') }</h1>;
}