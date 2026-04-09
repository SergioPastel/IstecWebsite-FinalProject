import React, { useEffect, useRef, useState } from "react";
import logo from "../assets/istec-logo.png";
import { Link, router, usePage } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import { route } from "ziggy-js";

function Header({}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [privateOpen, setPrivateOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const searchRef = useRef(null);
  const privateRef = useRef(null);

  const { props } = usePage();
  const { t, i18n } = useTranslation();

  // Sync frontend locale (i18n.language) to backend locale (props.locale)
  useEffect(() => {
    if (props.locale && props.locale !== i18n.language) {
      i18n.changeLanguage(props.locale);
    }
  }, [props.locale]); // run when props.locale changes

  useEffect(() => {
    const handlePointerDown = (event) => {
      const target = event.target;

      if (searchRef.current && !searchRef.current.contains(target)) {
        setSearchOpen(false);
      }

      if (privateRef.current && !privateRef.current.contains(target)) {
        setPrivateOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, []);

  useEffect(() => {
    const handleCloseAll = () => {
      setPrivateOpen(false);
      setSearchOpen(false);
    };

    window.addEventListener("closeDropdowns", handleCloseAll);

    return () => {
      window.removeEventListener("closeDropdowns", handleCloseAll);
    };
  }, []);

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        setPrivateOpen(false);
        setSearchOpen(false);
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenus = () => {
    setMenuOpen(false);
    setPrivateOpen(false);
    setSearchOpen(false);
    setOpenDropdown(null);
  };

  const setLanguage = (lang) => {
    router.post(
      "/locale",
      { locale: lang },
      {
        preserveScroll: true,
      },
    );
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Pesquisar:", search);
  };

    const topLinks = [
    {
      type: "external",
      href: "https://istec-porto.pt/citeca/",
      label: t("header.research"),
      target: "_blank",
      rel: "noopener noreferrer",
    },
    {
      type: "page",
      href: "/contactos",
      label: t("header.institutionContacts"),
    },
    {
      type: "external",
      href: "https://www.istec.pt/",
      label: t("header.istecLisboa"),
      target: "_blank",
      rel: "noopener noreferrer",
    },
  ];

  // Blue Nav Links with Dropdowns
  const mainNav = [
    {
      key: "istec-porto",
      titleKey: "istecPorto",
      children: [
        { href: "/finalidade-e-projeto-educativo", labelKey: "mission" },
        { href: "/orgaos", labelKey: "orgaos" },
        { href: "/organograma", labelKey: "organograma" },
        { href: "/documentos", labelKey: "documentos" },
        { href: "/docentes", labelKey: "docentes" },
        { href: "/calendarios", labelKey: "calendarios" },
        { href: "/qualidade", labelKey: "qualidade" },
        { href: "/etica", labelKey: "etica" },
      ],
    },
    {
      key: "courses",
      titleKey: "courses",
      children: [
        { href: "/ctesp", labelKey: "ctesp" },
        { href: "/licenciatura", labelKey: "licenciatura" },
        { href: "/pos-graduacao", labelKey: "pos-graduacao" },
        { href: "/plano-atividades", labelKey: "plano-atividades" },
        { href: "/emolumentos", labelKey: "emolumentos" },
        { href: "/bolsas-dges", labelKey: "bolsas-dges" },
        { href: "/protocolos", labelKey: "protocolos" },
        { href: "/editais-2526", labelKey: "editais-2526" },
        { href: "/candidaturas/curso", labelKey: "applications" },
      ],
    },
    {
      key: "events-and-news",
      titleKey: "eventsAndNews",
      children: [
        { href: route("events"), labelKey: "events-upcoming" },
        { href: "/eventos", labelKey: "events-workshops" },
        { href: "/eventos", labelKey: "events-open-days" },
        { href: route("news"), labelKey: "news-latest" },
        { href: "/noticias", labelKey: "news-interviews" },
        { href: "/noticias", labelKey: "news-press" },
        { href: "/candidaturas/evento", labelKey: "applications-events" },
      ],
    },
    {
      key: "mobility-program",
      titleKey: "mobilityProgram",
      children: [
        { href: "/erasmus", labelKey: "erasmus+" },
      ],
    },
    {
      key: "pedagogy-xxi",
      titleKey: "pedagogyXXI",
      href: "/pedagogia-xxi",
    },
  ];

  return (
    <header className="fixed top-0 left-0 z-[1000] w-full bg-white font-sans shadow-sm transition-all duration-300">
      <div className="border-b border-[#e5eaf0] bg-[#f8f9fb]">
        <div
          className={`mx-auto flex max-w-[1600px] items-center justify-between px-4 transition-all duration-300 md:flex-nowrap ${
            scrolled ? "py-[10px]" : "py-[18px]"
          } flex-wrap`}
        >
          <Link
            onClick={() => {
              setPrivateOpen(false);
              setSearchOpen(false);              
            }}
            href={route('home')}           
            className="p-0 border-0 bg-transparent cursor-pointer"
          >
            <img
              src={logo}
              alt="ISTEC Porto"
              className={`block transition-all duration-300 ${
                scrolled ? "h-[45px]" : "h-[60px]"
              }`}
            />
          </Link>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen(!menuOpen);
            }}
            className="md:hidden text-[22px] text-[#1d1d1b]"
          >
            ☰
          </button>

          <div
            className={`${
              menuOpen ? "flex" : "hidden"
            } mt-2 w-full flex-col items-start gap-4 md:mt-0 md:flex md:w-auto md:flex-row md:items-center md:gap-[18px]`}
          >
            {topLinks.map((item, index) => (
              <React.Fragment key={index}>
                {item.type === "external" ? (
                  <a
                    href={item.href}
                    target={item.target}
                    rel={item.rel}
                    onClick={closeMenus}
                    className="text-[15px] text-[#1d1d1b] hover:text-[#0c73b7]"
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    href={item.href}
                    onClick={closeMenus}
                    className="text-[15px] text-[#1d1d1b] hover:text-[#0c73b7]"
                  >
                    {item.label}
                  </Link>
                )}

                {index < topLinks.length - 1 && <Divider />}
              </React.Fragment>
            ))}

            <Divider />

            <div className="relative" ref={privateRef}>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSearchOpen(false);
                  setPrivateOpen((prev) => !prev);
                }}
                className="flex items-center gap-2 text-[15px] font-bold text-[#1d1d1b] hover:text-[#0c73b7] transition"
              >
                {t("header.privateArea")}
                <svg
                  className={`w-4 h-4 transition-transform duration-300 ${privateOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 9l6 6 6-6"
                  />
                </svg>
              </button>

              <div
                className={`absolute top-full right-0 mt-3 w-[220px] rounded-2xl border border-[#e5eaf0] bg-white shadow-[0_12px_30px_rgba(15,23,42,0.12)] overflow-hidden z-[1200] origin-top-right transition-all duration-200 ${
                  privateOpen
                    ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                }`}
              >
                <a
                  href="https://aluno.istec-porto.pt/?_gl=1*1tahsiw*_ga*NTUwMTQ4MzkwLjE3Njk4MTk5MTM.*_ga_BPL2BYTWCM*czE3NzQ5NzkyNzgkbzE2JGcxJHQxNzc0OTgwMTIyJGozOCRsMCRoMA.."
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setPrivateOpen(false)}
                  className="block px-4 py-3 text-[14px] text-[#1d1d1b] hover:bg-[#f5f8fc] hover:text-[#0c73b7] transition"
                >
                  {t("header.studentArea")}
                </a>

                <a
                  href="https://docente.istec-porto.pt/?_gl=1*1796j2f*_ga*NTUwMTQ4MzkwLjE3Njk4MTk5MTM.*_ga_BPL2BYTWCM*czE3NzQ5NzkyNzgkbzE2JGcxJHQxNzc0OTgwMTIyJGozOCRsMCRoMA.."
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setPrivateOpen(false)}
                  className="block px-4 py-3 text-[14px] text-[#1d1d1b] hover:bg-[#f5f8fc] hover:text-[#0c73b7] transition"
                >
                  {t("header.teacherArea")}
                </a>

                <a
                  href="https://moodle.istec-porto.pt/?_gl=1*1796j2f*_ga*NTUwMTQ4MzkwLjE3Njk4MTk5MTM.*_ga_BPL2BYTWCM*czE3NzQ5NzkyNzgkbzE2JGcxJHQxNzc0OTgwMTIyJGozOCRsMCRoMA.."
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setPrivateOpen(false)}
                  className="block px-4 py-3 text-[14px] text-[#1d1d1b] hover:bg-[#f5f8fc] hover:text-[#0c73b7] transition"
                >
                  {t("header.moodle")}
                </a>

                <a  
                  href={route('dashboard')}
                  onClick={() => setPrivateOpen(false)}
                  className="block px-4 py-3 text-[14px] font-semibold text-[#1d1d1b] hover:bg-[#f5f8fc] hover:text-[#0c73b7] transition"
                >
                  {t("header.administration")}
                </a>
              </div>
            </div>

            <div
              className="flex items-center gap-2 ml-2 relative"
              ref={searchRef}
            >
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setLanguage("pt")}
                  className={`text-[15px] font-semibold hover:cursor-pointer ${
                    i18n.language === "pt" ? "text-[#0c73b7]" : "text-[#1d1d1b]"
                  }`}
                >
                  PT
                </button>

                  <Divider className="h-5 mx-1! inline-block! bg-gray-800 self-center"/>

                <button
                  onClick={() => setLanguage("en")}
                  className={`text-[15px] font-semibold hover:cursor-pointer ${
                    i18n.language === "en" ? "text-[#0c73b7]" : "text-[#1d1d1b]"
                  }`}
                >
                  EN
                </button>
              </div>

              <div className="flex flex-row-reverse items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setPrivateOpen(false);
                    setSearchOpen((prev) => !prev);
                  }}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 transition hover:bg-[#0d8fe8] hover:text-white"
                >
                  🔍
                </button>

                <form
                  onSubmit={handleSearchSubmit}
                  className={`overflow-hidden transition-all duration-300 ${
                    searchOpen ? "w-[190px] opacity-100" : "w-0 opacity-0"
                  }`}
                >
                  <input
                    type="text"
                    placeholder={t("header.searchPlaceholder")}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full h-[34px] border border-[#dbe4ee] rounded-full px-3 text-[14px] outline-none focus:border-[#0c73b7] focus:ring-2 focus:ring-[#0c73b7]/20"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`${scrolled ? "shadow-md" : ""} bg-[#0C73B7]`}>
      
        <div
          className={`${
            menuOpen ? "flex" : "hidden"
          } md:flex flex-col md:flex-row max-w-[1600px] mx-auto`}
        >
          {mainNav.map((item, index) => (
        <div
          key={index}
          className="relative w-full md:w-auto"
          onMouseEnter={() => item.children && setOpenDropdown(item.key)}
          onMouseLeave={() => item.children && setOpenDropdown(null)}
        >
           {item.children ? (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setOpenDropdown(openDropdown === item.key ? null : item.key)
                    }
                    className="flex w-full items-center justify-between border-r border-white/25 px-6 py-4 text-left text-[16px] font-bold text-white transition hover:bg-white/10 md:w-auto md:gap-2"
                  >
                    <span>{t("header." + item.titleKey)}</span>

                    <svg
                      className={`h-4 w-4 transition-transform duration-300 ${
                        openDropdown === item.key ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 9l6 6 6-6"
                      />
                    </svg>
                  </button>

                  <div
                    className={`${
                      openDropdown === item.key
                        ? "pointer-events-auto visible opacity-100 translate-y-0"
                        : "pointer-events-none invisible opacity-0 -translate-y-2"
                    } absolute left-0 top-full z-[1200] min-w-[260px] overflow-hidden bg-[#1488c9] shadow-lg transition-all duration-200`}
                  >
                    {item.children.map((child, childIndex) => (
                      <Link
                        key={childIndex}
                        href={child.href}
                        onClick={closeMenus}
                        className="block w-full px-8 py-4 text-left text-[15px] text-white transition hover:bg-[#0f6fa9]"
                      >
                        {t("nav." + child.labelKey)}
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                <Link
                  href={item.href}
                  onClick={closeMenus}
                  className="flex w-full items-center justify-between border-r border-white/25 px-6 py-4 text-left text-[16px] font-bold text-white transition hover:bg-white/10 md:w-auto md:gap-2"
                >
                  <span>{t("header." + item.titleKey)}</span>
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}

function Divider() {
  return <span className="hidden md:block w-[1px] h-[18px] bg-[#d6d6d6]" />;
}

export default Header;

/*[ This has been REPLACED, but the code might be relevant still. REMOVE LATER.
            "home",
            "/courses",
            "/events",
            "/news",
            "/applications",
          ].map((link, i) =>
            link === "home" ? (
              <button
                key={i}
                onClick={() => {
                  setPrivateOpen(false);
                  setSearchOpen(false);
                }}
                href={route("home")}
                className="text-white font-bold text-[16px] px-6 py-4 border-r border-white/25 hover:bg-white/10 w-full md:w-auto text-left"
              >
                {t("header." + link.replace("/", ""))}
              </button>
            ) : (
              <Link
                key={i}
                href={link}
                onClick={() => {
                  setPrivateOpen(false);
                  setSearchOpen(false);
                }}
                className="text-white font-bold text-[16px] px-6 py-4 border-r border-white/25 hover:bg-white/10 w-full md:w-auto"
              >
                {t("header." + link.replace("/", ""))}
              </Link>
            ),
          )*/