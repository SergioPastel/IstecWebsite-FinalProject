import React from "react";
import "./Home.css";
import Layout from "../../layouts/layout";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useTranslation } from 'react-i18next';

export default function Home({
  courses,
  latestActivity,
  setPage = () => {},
  language = "pt",
  setLanguage = () => {},
}) {

  const { t } = useTranslation();

  const quickLinks = [
    {
      id: 1,
      title: t("home.quickLinks.courses.title"),
      description: t("home.quickLinks.courses.description"),
      link: "#",
    },
    {
      id: 2,
      title: t("home.quickLinks.applications.title"),
      description: t("home.quickLinks.applications.description"),
      link: "#",
    },
    {
      id: 3,
      title: t("home.quickLinks.events.title"),
      description: t("home.quickLinks.events.description"),
      link: "#",
    },
    {
      id: 4,
      title: t("home.quickLinks.contacts.title"),
      description: t("home.quickLinks.contacts.description"),
      link: "#",
    },
  ];

  // const courses = [
  //   {
  //     id: 1,
  //     category: "CTeSP",
  //     title: "Cibersegurança",
  //     duration: "2 anos",
  //     description: "Aprende segurança digital, proteção de redes e gestão de sistemas.",
  //   },
  //   {
  //     id: 2,
  //     category: "Licenciatura",
  //     title: "Engenharia Informática",
  //     duration: "3 anos",
  //     description: "Desenvolvimento, software e sistemas com foco prático.",
  //   },
  //   {
  //     id: 3,
  //     category: "Pós-Graduação",
  //     title: "Marketing Digital",
  //     duration: "Especialização",
  //     description: "Competências atuais em marketing, inovação e estratégia digital.",
  //   },
  // ];

  // const events = [
  //   {
  //     id: 1,
  //     category: "Evento",
  //     title: "Hackathon IA",
  //     date: "10 Maio 2026",
  //     description: "Desafio tecnológico focado em inovação e colaboração.",
  //   },
  //   {
  //     id: 2,
  //     category: "Workshop",
  //     title: "Workshop Cloud",
  //     date: "22 Junho 2026",
  //     description:
  //       "Sessão prática sobre cloud computing e transformação digital.",
  //   },
  //   {
  //     id: 3,
  //     category: "Notícia",
  //     title: "Jornadas Tecnológicas",
  //     date: "Julho 2026",
  //     description: "Iniciativa dedicada à tecnologia, ensino e investigação.",
  //   },
  // ];

  const steps = [
    {
      id: 1,
      title: t("home.applicationsSection.steps.1.title"),
      description: t("home.applicationsSection.steps.1.description"),
    },
    {
      id: 2,
      title: t("home.applicationsSection.steps.2.title"),
      description: t("home.applicationsSection.steps.2.description"),
    },
    {
      id: 3,
      title: t("home.applicationsSection.steps.3.title"),
      description: t("home.applicationsSection.steps.3.description"),
    },
  ];

  const getCourseBadgeClasses = (category) => {
    switch (category) {
      case "CTeSP":
        return "bg-[#eaf5ff] text-[#0d8fe8]";
      case "Licenciatura":
        return "bg-[#eafaf1] text-[#16a34a]";
      case "Pós-Graduação":
        return "bg-[#f3e8ff] text-[#7c3aed]";
      default:
        return "bg-[#eaf5ff] text-[#0d8fe8]";
    }
  };

  const getCourseCardHoverClasses = (category) => {
    switch (category) {
      case "CTeSP":
        return "hover:border-[#0d8fe8]/20 hover:shadow-[0_14px_34px_rgba(13,143,232,0.12)]";
      case "Licenciatura":
        return "hover:border-[#16a34a]/20 hover:shadow-[0_14px_34px_rgba(22,163,74,0.12)]";
      case "Pós-Graduação":
        return "hover:border-[#7c3aed]/20 hover:shadow-[0_14px_34px_rgba(124,58,237,0.12)]";
      default:
        return "hover:border-[#0d8fe8]/20 hover:shadow-[0_14px_34px_rgba(13,143,232,0.12)]";
    }
  };

  const getCourseLinkClasses = (category) => {
    switch (category) {
      case "CTeSP":
        return "text-[#0d8fe8]";
      case "Licenciatura":
        return "text-[#16a34a]";
      case "Pós-Graduação":
        return "text-[#7c3aed]";
      default:
        return "text-[#0d8fe8]";
    }
  };

    const getEventBadgeClasses = () => {
    return "bg-[#eae6df] text-[#3f3f3f]";
  };

  const getEventCardHoverClasses = () => {
    return "hover:border-[#d6d1c7] hover:shadow-[0_14px_34px_rgba(0,0,0,0.06)]";
  };

  const getEventLinkClasses = () => {
  return "text-[#6b6257]";
};
  return (
    <Layout title={"Home"}>

      <main
        className="w-full overflow-x-hidden bg-[#f5f8fc] text-[#1f2937]"
        onClick={() => {
          window.dispatchEvent(new Event("closeDropdowns"));
        }}
      >
        <section className="w-full mt-[120px]">
          <Swiper
            className="home-swiper"
            modules={[Autoplay, Navigation, Pagination]}
            slidesPerView={1}
            loop={true}
            speed={800}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            navigation
            pagination={{ clickable: true }}
          >
            <SwiperSlide>
              <div className="bg-gradient-to-br from-[#0d8fe8] to-[#38b6ff] text-white h-[520px] flex items-center justify-center relative">
                <div className="max-w-[1600px] mx-auto px-6 w-full flex justify-center relative z-10">
                  <div className="max-w-[680px] text-center mx-auto">
                    <p className="mb-4 text-[0.85rem] font-extrabold tracking-[1.5px] uppercase text-white/90">
                      {t("home.hero.istecPorto")}
                    </p>

                    <h1 className="text-[clamp(2.4rem,4vw,3.8rem)] leading-[1.08] mb-5 font-extrabold tracking-[-1px]">
                      {t("home.hero.buildFuture")}
                    </h1>

                    <p className="text-[1.08rem] leading-[1.75] mb-7 text-white/90 max-w-[620px] mx-auto">
                      {t("home.hero.coursesEvents")}
                    </p>

                    <div className="flex flex-wrap gap-[14px] justify-center">
                      <button className="bg-white text-[#0d8fe8] px-6 py-3 rounded-full font-bold shadow hover:bg-[#f8fbff] transition">
                        {t("home.hero.viewCourses")}
                      </button>

                      <button
                        onClick={() => setPage("about")}
                        className="border border-white/80 text-white px-6 py-3 rounded-full font-bold hover:bg-white/10 transition"
                      >
                        {t("home.hero.aboutIstec")}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="absolute right-[-120px] bottom-[-80px] w-[320px] h-[320px] bg-white/10 rounded-full blur-xl"></div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="bg-gradient-to-br from-[#0d8fe8] to-[#38b6ff] text-white h-[520px] flex items-center justify-center relative">
                <div className="max-w-[1600px] mx-auto px-6 w-full flex justify-center relative z-10">
                  <div className="max-w-[680px] text-center mx-auto">
                    <p className="mb-4 text-[0.85rem] font-extrabold tracking-[1.5px] uppercase text-white/90">
                      {t("home.hero.trainingOffer")}
                    </p>

                    <h1 className="text-[clamp(2.4rem,4vw,3.8rem)] leading-[1.08] mb-5 font-extrabold tracking-[-1px]">
                      {t("home.hero.exploreOffer")}
                    </h1>

                    <p className="text-[1.08rem] leading-[1.75] mb-7 text-white/90 max-w-[620px] mx-auto">
                      {t("home.hero.discoverCourses")}
                    </p>

                    <div className="flex flex-wrap gap-[14px] justify-center">
                      <button className="bg-white text-[#0d8fe8] px-6 py-3 rounded-full font-bold shadow hover:bg-[#f8fbff] transition">
                        {t("home.hero.exploreCourses")}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="absolute right-[-120px] bottom-[-80px] w-[320px] h-[320px] bg-white/10 rounded-full blur-xl"></div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="bg-gradient-to-br from-[#0d8fe8] to-[#38b6ff] text-white h-[520px] flex items-center justify-center relative">
                <div className="max-w-[1600px] mx-auto px-6 w-full flex justify-center relative z-10">
                  <div className="max-w-[680px] text-center mx-auto">
                    <p className="mb-4 text-[0.85rem] font-extrabold tracking-[1.5px] uppercase text-white/90">
                      {t("home.hero.events")}
                    </p>

                    <h1 className="text-[clamp(2.4rem,4vw,3.8rem)] leading-[1.08] mb-5 font-extrabold tracking-[-1px]">
                      {t("home.hero.participateEvents")}
                    </h1>

                    <p className="text-[1.08rem] leading-[1.75] mb-7 text-white/90 max-w-[620px] mx-auto">
                      {t("home.hero.workshopsReal")}
                    </p>

                    <div className="flex flex-wrap gap-[14px] justify-center">
                      <button className="bg-white text-[#0d8fe8] px-6 py-3 rounded-full font-bold shadow hover:bg-[#f8fbff] transition">
                        {t("home.hero.viewEvents")}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="absolute right-[-120px] bottom-[-80px] w-[320px] h-[320px] bg-white/10 rounded-full blur-xl"></div>
              </div>
            </SwiperSlide>
          </Swiper>
        </section>

        <section className="relative -mt-16 z-10">
          <div className="max-w-[1600px] mx-auto px-6">
            <div className="grid grid-cols-4 gap-[22px] max-[1100px]:grid-cols-2 max-[768px]:grid-cols-1">
              {quickLinks.map((item) => (
                <a
                  href={item.link}
                  key={item.id}
                  className="bg-white border border-[#dbe4ee] rounded-[20px] p-6 shadow-[0_8px_24px_rgba(15,23,42,0.06)] hover:translate-y-[-4px] hover:shadow-[0_14px_34px_rgba(13,143,232,0.12)] transition-all duration-300 block"
                >
                  <h3 className="text-[1.2rem] font-semibold mb-2">
                    {item.title}
                  </h3>

                  <p className="text-[#6b7280] mb-3">{item.description}</p>

                  <span className="text-[#0d8fe8] font-bold">
                    {t("home.quickLinks.viewMore")}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-[1600px] mx-auto px-6">
            <div className="flex justify-between items-end gap-6 mb-10 max-[768px]:flex-col max-[768px]:items-start">
              <div>
                <p className="inline-block text-[0.8rem] font-extrabold uppercase tracking-[1.2px] text-[#0d8fe8] mb-[10px]">
                  {t("home.coursesSection.trainingOffer")}
                </p>
                <h2 className="text-[clamp(2rem,3vw,2.5rem)] leading-[1.15] tracking-[-0.5px] m-0">
                  {t("home.coursesSection.findRightCourse")}
                </h2>
              </div>

              <a
                href="#"
                className="text-[#0d8fe8] font-bold whitespace-nowrap hover:underline"
              >
                {t("home.coursesSection.viewAllOffer")}
              </a>
            </div>

            <div className="grid grid-cols-3 gap-[22px] max-[1100px]:grid-cols-2 max-[768px]:grid-cols-1">
              {courses.data.map((course) => (
                <div
                  key={course.id}
                  className={`min-h-full bg-white border border-[#dbe4ee] rounded-[20px] p-6 shadow-[0_8px_24px_rgba(15,23,42,0.06)] hover:-translate-y-1 transition-all duration-300 flex flex-col ${getCourseCardHoverClasses(
                    course.category,
                  )}`}
                >
                  <span
                    className={`inline-flex self-start items-center px-3 py-[6px] rounded-full text-[0.8rem] font-extrabold ${getCourseBadgeClasses(
                      course.category,
                    )}`}
                  >
                    {course.category}
                  </span>

                  <h3 className="mt-[14px] mb-[10px] text-[1.2rem] leading-[1.3] font-semibold">
                    {course.title}
                  </h3>

                  <p className="mb-3 text-[0.95rem] font-bold text-[#4b5563]">
                    {course.duration_years}
                  </p>

                  <p className="m-0 text-[#6b7280] leading-[1.7]">
                    {course.description}
                  </p>

                  <a
                    href="#"
                    className={`inline-block mt-auto pt-4 font-bold hover:underline ${getCourseLinkClasses(
                      course.category,
                    )}`}
                  >
                    {t("home.coursesSection.learnMore")}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-[1600px] mx-auto px-6">
            <div className="flex justify-between items-end gap-6 mb-10 max-[768px]:flex-col max-[768px]:items-start">
              <div>
                <p className="inline-block text-[0.8rem] font-extrabold uppercase tracking-[1.2px] text-[#0d8fe8] mb-[10px]">
                  {t("home.eventsNewsSection.eventsNews")}
                </p>
                <h2 className="text-[clamp(2rem,3vw,2.5rem)] leading-[1.15] tracking-[-0.5px] m-0">
                  {t("home.eventsNewsSection.stayUpdated")}
                </h2>
              </div>

              <a
                href="#"
                className="text-[#0d8fe8] font-bold whitespace-nowrap hover:underline"
              >
                {t("home.eventsNewsSection.viewAll")}
              </a>
            </div>

            <div className="grid grid-cols-3 gap-[22px] max-[1100px]:grid-cols-2 max-[768px]:grid-cols-1">
              {latestActivity.data.map((event) => (
                <div
                  key={event.id}
                  className={`min-h-full bg-white border border-[#dbe4ee] rounded-[20px] p-6 shadow-[0_8px_24px_rgba(15,23,42,0.06)] hover:-translate-y-1 transition-all duration-300 flex flex-col ${getEventCardHoverClasses(
                    event.type,
                  )}`}
                >
                  <span
                    className={`inline-flex self-start items-center min-h-[30px] px-3 py-[6px] rounded-full text-[0.8rem] font-extrabold ${getEventBadgeClasses(
                      event.type,
                    )}`}
                  >
                    {event.type}
                  </span>

                  <h3 className="mt-[14px] mb-[10px] text-[1.2rem] leading-[1.3] font-semibold">
                    {event.title}
                  </h3>

                  <p className="mb-3 text-[0.95rem] font-bold text-[#4b5563]">
                    {event.date}
                  </p>

                  <p className="m-0 text-[#6b7280] leading-[1.7]">
                    {event.description}
                  </p>

                  <a
                    href="#"
                    className={`inline-block mt-auto pt-4 font-bold hover:underline ${getEventLinkClasses(
                      event.type,
                    )}`}
                  >
                    {t("home.eventsNewsSection.readMore")}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-br from-[#0d8fe8] to-[#38b6ff] text-white py-20">
          <div className="max-w-[1600px] mx-auto px-6">
            <div className="text-center flex justify-center mb-10">
              <div>
                <p className="inline-block text-[0.8rem] font-extrabold uppercase tracking-[1.2px] text-white/90 mb-[10px]">
                  {t("home.applicationsSection.applications")}
                </p>

                <h2 className="text-[clamp(2rem,3vw,2.5rem)] leading-[1.15] tracking-[-0.5px] m-0 mb-[14px]">
                  {t("home.applicationsSection.startApplication3Steps")}
                </h2>

                <p className="max-w-[720px] mx-auto text-white/90 leading-[1.8] m-0">
                  {t("home.applicationsSection.futureStartsClick")}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-[22px] max-[1100px]:grid-cols-2 max-[768px]:grid-cols-1">
              {steps.map((step) => (
                <div
                  key={step.id}
                  className="rounded-[20px] p-6 max-[768px]:p-5 bg-white/15 border border-white/20 backdrop-blur-[4px]"
                >
                  <div className="w-[42px] h-[42px] rounded-full bg-white text-[#0d8fe8] inline-flex items-center justify-center font-extrabold mb-4 shadow-[0_8px_20px_rgba(255,255,255,0.18)]">
                    {step.id}
                  </div>

                  <h3 className="m-0 mb-[10px] text-[1.15rem] font-semibold">
                    {step.title}
                  </h3>

                  <p className="m-0 text-white/90 leading-[1.7]">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex justify-center">
              <button className="mt-7 min-h-[52px] px-7 py-3 rounded-full bg-white text-[#0d8fe8] font-bold shadow-[0_8px_24px_rgba(15,23,42,0.06)] hover:bg-[#f8fbff] hover:-translate-y-[2px] transition-all duration-300">
                {t("home.applicationsSection.startApplication")}
              </button>
            </div>
          </div>
        </section>

        <section className="bg-[#f5f8fc] py-20">
          <div className="max-w-[1600px] mx-auto px-6">
            <div className="bg-white border border-[#dbe4ee] rounded-[26px] p-[34px] max-[768px]:p-5 shadow-[0_8px_24px_rgba(15,23,42,0.06)] flex items-center justify-between gap-7 max-[1100px]:flex-col max-[1100px]:items-start">
              <div>
                <p className="inline-block text-[0.8rem] font-extrabold uppercase tracking-[1.2px] text-[#0d8fe8] mb-[10px]">
                  {t("home.contactsSection.contacts")}
                </p>

                <h2 className="text-[clamp(2rem,3vw,2.5rem)] leading-[1.15] tracking-[-0.5px] m-0 mb-3">
                  {t("home.contactsSection.needHelp")}
                </h2>

                <p className="m-0 max-w-[660px] leading-[1.7] text-[#6b7280]">
                  {t("home.contactsSection.teamAvailable")}
                </p>

                <ul className="mt-4 pl-[18px] leading-[1.8] text-[#6b7280]">
                  <li>{t("home.contactsSection.location")}</li>
                  <li>{t("home.contactsSection.email")}</li>
                  <li>{t("home.contactsSection.phone")}</li>
                </ul>
              </div>

              <div className="flex gap-3 flex-wrap">
                <button className="inline-flex items-center justify-center min-h-12 px-[22px] py-3 rounded-full border border-transparent bg-[#0d8fe8] text-white font-bold shadow-[0_10px_30px_rgba(13,143,232,0.08)] hover:bg-[#0a78c4] hover:-translate-y-[2px] transition-all duration-300">
                  {t("home.contactsSection.goToContacts")}
                </button>

                <button className="inline-flex items-center justify-center min-h-12 px-[22px] py-3 rounded-full border border-[rgba(13,143,232,0.22)] bg-transparent text-[#0d8fe8] font-bold hover:bg-[#eaf5ff] hover:-translate-y-[2px] transition-all duration-300">
                  {t("home.contactsSection.requestInfo")}
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
