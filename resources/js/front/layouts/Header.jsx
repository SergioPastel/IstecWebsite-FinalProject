import React, { useEffect, useRef, useState } from "react";
import logo from "../assets/istec-logo.png";
import { Link, router, usePage } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import { route } from "ziggy-js";

function Header({ language = "pt"}) {
  const { props } = usePage();
  const { t, i18n } = useTranslation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [privateOpen, setPrivateOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const searchRef = useRef(null);
  const privateRef = useRef(null);

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

  const setLanguage = (lang) => {
    router.post(
      "/locale",
      { locale: lang },
      {
        preserveScroll: true,
      },
    );
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Pesquisar:", search);
  };

  return (
    <header className="w-full fixed top-0 left-0 z-[1000] bg-white shadow-sm transition-all duration-300 font-sans">
      <div className="bg-[#f8f9fb] border-b border-[#e5eaf0]">
        <div
          className={`max-w-[1600px] mx-auto flex items-center justify-between transition-all duration-300 ${
            scrolled ? "py-[10px]" : "py-[18px]"
          } px-4 flex-wrap md:flex-nowrap`}
        >
          <Link
            onClick={() => {
              setPrivateOpen(false);
              setSearchOpen(false);
            }}
            href={route("home")}
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
            } md:flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-[18px] w-full md:w-auto mt-2 md:mt-0`}
          >
            <Link
              onClick={() => {
                setPrivateOpen(false);
                setSearchOpen(false);
              }}
              href={route("about")}
              className="text-[15px] text-[#1d1d1b] hover:text-[#0c73b7]"
            >
              {t("header.aboutIstec")}
            </Link>

            <Divider />

            <Link
              // href={route("contacts")}
              onClick={() => {
                setPrivateOpen(false);
                setSearchOpen(false);
              }}
              className="text-[15px] text-[#1d1d1b] hover:text-[#0c73b7]"
            >
              {t("header.institutionContacts")}
            </Link>

            <Divider />

            <Link
              href="https://www.istec.pt/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                setPrivateOpen(false);
                setSearchOpen(false);
              }}
              className="text-[15px] text-[#1d1d1b] hover:text-[#0c73b7]"
            >
              ISTEC Lisboa
            </Link>

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
                <Link
                  // href="/student/login"
                  onClick={() => setPrivateOpen(false)}
                  className="block px-4 py-3 text-[14px] text-[#1d1d1b] hover:bg-[#f5f8fc] hover:text-[#0c73b7] transition"
                >
                  {t("header.studentArea")}
                </Link>

                <Link
                  // href="/teacher/login"
                  onClick={() => setPrivateOpen(false)}
                  className="block px-4 py-3 text-[14px] text-[#1d1d1b] hover:bg-[#f5f8fc] hover:text-[#0c73b7] transition"
                >
                  {t("header.teacherArea")}
                </Link>

                <Link
                  href="/moodle"
                  onClick={() => setPrivateOpen(false)}
                  className="block px-4 py-3 text-[14px] text-[#1d1d1b] hover:bg-[#f5f8fc] hover:text-[#0c73b7] transition"
                >
                  Moodle
                </Link>

                <Link
                  href={route('dashboard')}
                  onClick={() => setPrivateOpen(false)}
                  className="block px-4 py-3 text-[14px] font-semibold text-[#1d1d1b] hover:bg-[#f5f8fc] hover:text-[#0c73b7] transition"
                >
                  {t("header.administration")}
                </Link>
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
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-[#0d8fe8] hover:text-white transition"
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

      <div
        className={`bg-gradient-to-r from-[#2a92da] to-[#38a6df] ${
          scrolled ? "shadow-md" : ""
        }`}
      >
        <div
          className={`${
            menuOpen ? "flex" : "hidden"
          } md:flex flex-col md:flex-row max-w-[1600px] mx-auto`}
        >
          {[
            ["home", "Início", "Home"],
            ["/courses", "Cursos", "Courses"],
            ["/events", "Eventos", "Events"],
            ["/news", "Notícias", "News"],
            ["/applications", "Candidaturas", "Applications"],
          ].map(([link, pt, en], i) =>
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
                {language === "pt" ? pt : en}
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
                {language === "pt" ? pt : en}
              </Link>
            ),
          )}
        </div>
      </div>
    </header>
  );
}

function Divider({ className = "h-4.5 bg-[#d6d6d6]" }) {
  return <div className={`hidden md:block w-px ${className}`} />;
}

export default Header;
