import React from "react";
import "./Home.css";

import Layout from "../../layouts/Layout";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import { GraduationCap, BookOpen, Calendar, Mail } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useTranslation } from 'react-i18next';
import { route } from "ziggy-js";
import { Link, router } from "@inertiajs/react";

export default function Home({
  courses,
  latestActivity,
}) {

  const { t } = useTranslation();

  const quickLinks = [
    {
      id: 1,
      title: t("home.quickLinks.ctesp.title"),
      description: t("home.quickLinks.ctesp.description"),
      link: route("courses.ctesp"),
      icon: GraduationCap,
    },
    {
      id: 2,
      title: t("home.quickLinks.licenciatura.title"),
      description: t("home.quickLinks.licenciatura.description"),
      link: route("courses.licenciatura"),
      icon: BookOpen,
    },
    {
      id: 3,
      title: t("home.quickLinks.pos.title"),
      description: t("home.quickLinks.pos.description"),
      link: route("courses.posGraduacao"),
      icon: GraduationCap,
    },
    {
      id: 4,
      title: t("home.quickLinks.events.title"),
      description: t("home.quickLinks.events.description"),
      link: route("eventsandnews"),
      icon: Calendar,

    },
  ];

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
      return "bg-[#eaf5ff] text-[#0d8fe8] px-3 py-1 rounded-full text-[0.75rem]";
    case "Licenciatura":
      return "bg-[#eafaf1] text-[#16a34a] px-3 py-1 rounded-full text-[0.75rem]";
    case "Pós-Graduação":
      return "bg-[#f3e8ff] text-[#7c3aed] px-3 py-1 rounded-full text-[0.75rem]";
    default:
      return "bg-[#eaf5ff] text-[#0d8fe8] px-3 py-1 rounded-full text-[0.75rem]";
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
            speed={1200}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            navigation

          >
            <SwiperSlide>
              <div className="bg-[#0d8fe8] text-white h-[560px] flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.15),transparent_60%)]"></div>
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

                    </div>
                  </div>
                </div>

                <div className="absolute right-[-120px] bottom-[-80px] w-[320px] h-[320px] bg-white/10 rounded-full blur-xl"></div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
             <div className="bg-[#0d8fe8] text-white h-[560px] flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.15),transparent_60%)]"></div>
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

                    </div>
                  </div>
                </div>

                <div className="absolute right-[-120px] bottom-[-80px] w-[320px] h-[320px] bg-white/10 rounded-full blur-xl"></div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="bg-[#0d8fe8] text-white h-[560px] flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.15),transparent_60%)]"></div>
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
              {quickLinks.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                    href={item.link}
                    key={item.id}
                    className="group bg-white border border-[#dbe4ee] rounded-[20px] p-6 shadow-[0_8px_24px_rgba(15,23,42,0.06)] hover:translate-y-[-4px] hover:shadow-[0_14px_34px_rgba(13,143,232,0.12)] transition-all duration-300 block"
                  >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#eaf5ff]">
                    <Icon size={22} className="text-[#0d8fe8]" />
                  </div>

                  <h3 className="text-[1.2rem] font-semibold mb-2">
                    {item.title}
                  </h3>

                  <p className="text-[#6b7280] mb-3">{item.description}</p>

                  <span className="mt-1 inline-flex w-fit items-center justify-center rounded-full bg-[#0d8fe8] px-6 py-2.5 text-sm font-bold text-white shadow-[0_8px_20px_rgba(13,143,232,0.22)] transition-all duration-300 group-hover:bg-[#0a78c4] group-hover:-translate-y-[1px]">
                    {t("home.quickLinks.viewMore")}
                  </span>
                </Link>
              );
            })}
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

              <Link
                href={route("courses.ctesp")}
                className="text-[#0d8fe8] font-bold whitespace-nowrap hover:underline"
              >
                {t("home.coursesSection.viewAllOffer")}
              </Link>
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
                    className={`inline-flex self-start items-center font-extrabold ${getCourseBadgeClasses(
                      course.category,
                    )}`}
                  >
                    {course.category?.startsWith("CTeSP") ? "CTeSP" : course.category}
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

                  <Link
                    href={route("courses.show", course.id)}
                    className="mt-auto pt-4"
                  >
                    <span className="inline-flex items-center justify-center rounded-full bg-[#0d8fe8] px-5 py-2 text-sm font-bold text-white shadow-[0_8px_20px_rgba(13,143,232,0.22)] transition-all duration-300 hover:bg-[#0a78c4] hover:-translate-y-[1px]">
                      {t("home.coursesSection.learnMore")}
                    </span>
                  </Link>
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

            </div>

            <div className="grid grid-cols-3 gap-[22px] max-[1100px]:grid-cols-2 max-[768px]:grid-cols-1">
              {latestActivity.data.map((item) => (
                <div
                  key={item.id}
                  className={`min-h-full bg-white border border-[#dbe4ee] rounded-[20px] p-6 shadow-[0_8px_24px_rgba(15,23,42,0.06)] hover:-translate-y-1 transition-all duration-300 flex flex-col ${getEventCardHoverClasses(
                    item.type,
                  )}`}
                >
                  <span
                    className={`inline-flex self-start items-center min-h-[30px] px-3 py-[6px] rounded-full text-[0.8rem] font-extrabold ${getEventBadgeClasses(
                      item.type,
                    )}`}
                  >
                    {item.type}
                  </span>

                  <h3 className="mt-[14px] mb-[10px] text-[1.2rem] leading-[1.3] font-semibold">
                    {item.title}
                  </h3>

                  <p className="mb-3 text-[0.95rem] font-bold text-[#4b5563]">
                    {item.date}
                  </p>

                  <p className="m-0 text-[#6b7280] leading-[1.7]">
                    {item.description}
                  </p>

                  <Link
                    href={
                      item.type === "Event"
                        ? route("events.show", item.id)
                        : route("news.show", item.id)
                    }
                    className="mt-auto pt-4"
                  >
                    <span className="inline-flex items-center justify-center rounded-full bg-[#0d8fe8] px-5 py-2 text-sm font-bold text-white shadow-[0_8px_20px_rgba(13,143,232,0.22)] transition-all duration-300 hover:bg-[#0a78c4] hover:-translate-y-[1px]">
                      {t("home.eventsNewsSection.readMore")}
                    </span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

      <section className="bg-[#e2e8f0] text-[#1f2937] py-20">
          <div className="max-w-[1600px] mx-auto px-6">
            <div className="text-center flex justify-center mb-10">
              <div>
                <p className="inline-block text-[0.8rem] font-extrabold uppercase tracking-[1.2px] /90 mb-[10px]">
                  {t("home.applicationsSection.applications")}
                </p>

                <h2 className="text-[clamp(2rem,3vw,2.5rem)] text-[#1f2937]">
                  {t("home.applicationsSection.startApplication3Steps")}
                </h2>

                <p className="max-w-[720px] mx-auto text-[#6b7280] leading-[1.8] m-0">
                  {t("home.applicationsSection.futureStartsClick")}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-[22px] max-[1100px]:grid-cols-2 max-[768px]:grid-cols-1">
              {steps.map((step) => (
                <div
                  key={step.id}
                  className="rounded-[20px] p-6 max-[768px]:p-5 bg-white border border-[#dbe4ee] shadow-[0_8px_24px_rgba(13,143,232,0.08)]"
                >
                  <div className="w-[42px] h-[42px] rounded-full bg-[#0d8fe8] text-white inline-flex items-center justify-center font-extrabold mb-4 shadow-[0_8px_20px_rgba(13,143,232,0.22)]">
                    {step.id}
                  </div>

                  <h3 className="m-0 mb-[10px] text-[1.15rem] font-semibold text-[#1f2937]">
                    {step.title}
                  </h3>

                  <p className="m-0 text-[#6b7280] leading-[1.7]">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex justify-center">
              <button 
              className="mt-7 min-h-[52px] px-7 py-3 rounded-full bg-[#0d8fe8] text-white font-bold shadow-[0_8px_24px_rgba(13,143,232,0.22)] hover:bg-[#0a78c4] hover:-translate-y-[2px] transition-all duration-300"
              onClick={() => router.visit(route('applications.courses.apply'))}
            >
              {t("home.applicationsSection.startApplication")}
            </button>
            </div>
          </div>
        </section>

        <section className="bg-white pt-20 pb-8">
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
                <button
                className="inline-flex items-center justify-center min-h-12 px-[22px] py-3 rounded-full border border-transparent bg-[#0d8fe8] text-white font-bold shadow-[0_10px_30px_rgba(13,143,232,0.08)] hover:bg-[#0a78c4] hover:-translate-y-[2px] transition-all duration-300"
                onClick={() => router.visit(route('contacts'))}
                >
                  {t("home.contactsSection.goToContacts")}
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
