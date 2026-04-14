import React from "react";
import { Link } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import Layout from "../../layouts/Layout";
import { route } from "ziggy-js";

export default function Events({ events = [] }) {
  const { t, i18n } = useTranslation();

  const featuredEvent = events.data.find((item) => item.featured) || events[0];

  return (
    <Layout title={"Events"}>
      <main
        className="w-full overflow-x-hidden bg-[#f5f8fc] text-[#1f2937]"
        onClick={() => {
          window.dispatchEvent(new Event("closeDropdowns"));
        }}
      >
        <section className="w-full mt-[120px]">
          <div className="bg-gradient-to-br from-[#0d8fe8] to-[#38b6ff] text-white min-h-[420px] flex items-center relative overflow-hidden">
            <div className="max-w-[1600px] mx-auto px-6 w-full relative z-10">
              <div className="max-w-[760px]">
                <p className="mb-4 text-[0.85rem] font-extrabold tracking-[1.5px] uppercase text-white/90">
                  {t("events.hero.label", "Eventos ISTEC")}
                </p>

                <h1 className="text-[clamp(2.4rem,4vw,3.8rem)] leading-[1.08] mb-5 font-extrabold tracking-[-1px]">
                  {t("events.hero.title", "Descobre os próximos eventos")}
                </h1>

                <p className="text-[1.08rem] leading-[1.75] text-white/90 max-w-[650px]">
                  {t(
                    "events.hero.description",
                    "Workshops, open days e iniciativas académicas para aproximar estudantes, docentes e comunidade."
                  )}
                </p>

                <div className="flex flex-wrap gap-[14px] mt-8">
                  <Link
                    href="/"
                    className="bg-white text-[#0d8fe8] px-6 py-3 rounded-full font-bold shadow hover:bg-[#f8fbff] transition"
                  >
                    {t("events.hero.backHome", "Voltar à home")}
                  </Link>
                </div>
              </div>
            </div>

            <div className="absolute right-[-120px] bottom-[-80px] w-[320px] h-[320px] bg-white/10 rounded-full blur-xl"></div>
          </div>
        </section>

        {featuredEvent && (
          <section className="relative -mt-14 z-10 pb-10">
            <div className="max-w-[1600px] mx-auto px-6">
              <div className="grid lg:grid-cols-2 overflow-hidden rounded-[26px] border border-[#ddd6cc] bg-white shadow-[0_10px_30px_rgba(15,23,42,0.08)]">
                <div className="h-[320px] lg:h-full">
                  <img
                    src={featuredEvent.image}
                    alt={featuredEvent.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-8 md:p-10 lg:p-12 flex flex-col justify-center">
                  <span className="inline-flex self-start items-center min-h-[30px] px-3 py-[6px] rounded-full text-[0.8rem] font-extrabold bg-[#eae6df] text-[#3f3f3f]">
                    {featuredEvent.type}
                  </span>

                  <p className="mt-5 text-[0.95rem] font-bold text-[#4b5563]">
                    {featuredEvent.date} • {featuredEvent.location}
                  </p>

                  <h2 className="mt-2 text-[clamp(1.9rem,3vw,2.8rem)] leading-[1.15] tracking-[-0.5px] font-bold text-[#111827]">
                    {featuredEvent.title}
                  </h2>

                  <p className="mt-5 text-[#6b7280] leading-[1.8] text-[1rem]">
                    {featuredEvent.description}
                  </p>

                  <div className="mt-8">
                    <Link
                      href={`/eventos/${featuredEvent.id}`}
                      className="inline-flex items-center justify-center rounded-full bg-[#0d8fe8] px-6 py-3 text-sm font-bold text-white shadow-[0_10px_30px_rgba(13,143,232,0.12)] hover:bg-[#0a78c4] hover:-translate-y-[2px] transition-all duration-300"
                    >
                      {t("events.buttons.viewEvent")}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        <section className="py-16">
          <div className="max-w-[1600px] mx-auto px-6">
            <div className="grid grid-cols-3 gap-[22px] max-[1100px]:grid-cols-2 max-[768px]:grid-cols-1">
              {events.data.map((event) => (
                <div
                  key={event.id}
                  className="min-h-full bg-white border border-[#ddd6cc] rounded-[20px] overflow-hidden shadow-[0_8px_24px_rgba(15,23,42,0.06)] hover:-translate-y-1 transition-all duration-300 flex flex-col"
                >
                  <div className="h-[220px] overflow-hidden bg-[#eae6df]">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover transition duration-500 hover:scale-105"
                    />
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <span className="inline-flex self-start items-center min-h-[30px] px-3 py-[6px] rounded-full text-[0.8rem] font-extrabold bg-[#eae6df] text-[#3f3f3f]">
                      {event.type}
                    </span>

                    <p className="mt-4 mb-3 text-[0.95rem] font-bold text-[#4b5563]">
                      {event.date} • {event.location}
                    </p>

                    <h3 className="text-[1.2rem] leading-[1.3] font-semibold">
                      {event.title}
                    </h3>

                    <p className="mt-4 text-[#6b7280] leading-[1.7]">
                      {event.description}
                    </p>

                    <Link
                      href={route("events.show", event.id)}
                      className="inline-block mt-auto pt-5 font-bold text-[#0d8fe8] hover:underline text-left"
                    >
                      {t("events.buttons.viewDetails")}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}