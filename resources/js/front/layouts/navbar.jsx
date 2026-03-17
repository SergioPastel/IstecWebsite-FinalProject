import { Link } from '@inertiajs/react';
import { useTranslation } from 'react-i18next'; // Importing the useTranslation hook from react-i18next, which allows us to translate

export default function Navbar() {
    const { t, i18n } = useTranslation();
  
    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
    };

    return (
        <nav
            className={`fixed top-0 w-full bg-blue-600 text-white transition-all duration-300 z-50 flex items-center px-6`}
        >
            <div className="text-xl font-bold">My Logo</div>
            <ul className="ml-auto flex space-x-6">
                <li><Link href={route('home')}>home</Link></li>
                <li><Link href={route('courses')}>Pag cursos</Link></li>
            </ul>
            <button onClick={() => changeLanguage("en")}>English</button>
            <button onClick={() => changeLanguage("pt")}>Portuguese</button>
        </nav>
    );
}
