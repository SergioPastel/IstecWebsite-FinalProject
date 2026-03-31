import { Link, router, usePage } from "@inertiajs/react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next"; // Importing the useTranslation hook from react-i18next, which allows us to translate

export default function Navbar() {
  const { props } = usePage();
  const { t, i18n } = useTranslation();

  // Sync frontend locale (i18n.language) to backend locale (props.locale)
  useEffect(() => {
    if (props.locale && props.locale !== i18n.language) {
      i18n.changeLanguage(props.locale);
    }
  }, [props.locale]); // run when props.locale changes

  /**
   * Since locale is by nature unsynched with backend, changeLanguage
   * handler must notify backend of locale change. It uses custom route
   * for handling locale change (documented) which will redirect back to
   * current route, prompting a react reload with new locale information
   *
   * This locale change will trigger the useEffect below and change UI
   * language, thus finally completing the translation process
   * 
   * @param {*} lang
   */
  const changeLanguage = (lang) => {
    router.post(
      "/locale",
      { locale: lang },
      {
        preserveScroll: true,
      },
    );
  };

  return (
    <nav
      className={`fixed top-0 w-full bg-blue-600 text-white transition-all duration-300 z-50 flex items-center px-6`}
    >
      <div className="text-xl font-bold">My Logo</div>
      <ul className="ml-auto flex space-x-6">
        <li>
          <Link href={route("home")}>home</Link>
        </li>
        <li>
          <Link href={route("courses")}>Pag cursos</Link>
        </li>
      </ul>
      <button onClick={() => changeLanguage("en")}>English</button>
      <button onClick={() => changeLanguage("pt")}>Portuguese</button>
    </nav>
  );
}
