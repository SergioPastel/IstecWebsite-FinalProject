import React from "react";
import { Link } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import Layout from "../../layouts/Layout";

export default function News({ news = [] }) {
  const { t, i18n } = useTranslation();

  const featuredNews = news.data?.find((item) => item.featured) || news.data?.[0];

  const getBadgeClasses = (category) => {
    switch (category) {
      case "Notícia":
        return "bg-blue-100 text-blue-800";
      case "Entrevista":
        return "bg-green-100 text-green-800";
      case "Evento":
        return "bg-yellow-100 text-yellow-800";
      case "Parceria":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-[#eae6df] text-[#3f3f3f]";
    }
  };

  const getCardHoverClasses = (category) => {
    switch (category) {
      case "Notícia":
      case "Entrevista":
      case "Evento":
      case "Parceria":
        return "hover:border-[#dbe4ee]";
      default:
        return "hover:border-[#0d8fe8]/20";
    }
  };

  return (
    <Layout title={"News"}>
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
                  {t("news.hero.label", "Notícias ISTEC")}
                </p>

                <h1 className="text-[clamp(2.4rem,4vw,3.8rem)] leading-[1.08] mb-5 font-extrabold tracking-[-1px]">
                  {t("news.hero.title", "Fica a par das últimas novidades")}
                </h1>

                <p className="text-[1.08rem] leading-[1.75] text-white/90 max-w-[650px]">
                  {t(
                    "news.hero.description",
                    "Descobre notícias, entrevistas, eventos e atualizações importantes da comunidade académica do ISTEC Porto."
                  )}
                </p>

                <div className="flex flex-wrap gap-[14px] mt-8">
                  <Link
                    href="/"
                    className="bg-white text-[#0d8fe8] px-6 py-3 rounded-full font-bold shadow hover:bg-[#f8fbff] transition"
                  >
                    {t("news.hero.backHome", "Voltar à home")}
                  </Link>
                </div>
              </div>
            </div>

            <div className="absolute right-[-120px] bottom-[-80px] w-[320px] h-[320px] bg-white/10 rounded-full blur-xl"></div>
          </div>
        </section>

        {featuredNews && (
          <section className="relative -mt-14 z-10 pb-10">
            <div className="max-w-[1600px] mx-auto px-6">
              <div className="grid lg:grid-cols-2 overflow-hidden rounded-[26px] border border-[#dbe4ee] bg-white shadow-[0_10px_30px_rgba(15,23,42,0.08)]">
                <div className="h-[320px] lg:h-full">
                  <img
                    src={featuredNews.image}
                    alt={featuredNews.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-8 md:p-10 lg:p-12 flex flex-col justify-center">
                  <span
                    className={`inline-flex self-start items-center min-h-[30px] px-3 py-[6px] rounded-full text-[0.8rem] font-extrabold ${getBadgeClasses(
                      featuredNews.category
                    )}`}
                  >
                    {featuredNews.category}
                  </span>

                  <p className="mt-5 text-[0.95rem] font-bold text-[#4b5563]">
                    {featuredNews.date}
                  </p>

                  <h2 className="mt-2 text-[clamp(1.9rem,3vw,2.8rem)] leading-[1.15] tracking-[-0.5px] font-bold text-[#111827]">
                    {featuredNews.title}
                  </h2>

                  <p className="mt-5 text-[#6b7280] leading-[1.8] text-[1rem]">
                    {featuredNews.excerpt}
                  </p>

                  <div className="mt-8">
                    <Link
                      href={`/noticias/${featuredNews.id}`}
                      className="inline-flex items-center justify-center rounded-full bg-[#0d8fe8] px-6 py-3 text-sm font-bold text-white shadow-[0_10px_30px_rgba(13,143,232,0.12)] hover:bg-[#0a78c4] hover:-translate-y-[2px] transition-all duration-300"
                    >
                      {t("news.buttons.readFull", "Ler notícia completa")}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        <section className="py-16">
          <div className="max-w-[1600px] mx-auto px-6">
            <div className="flex justify-between items-end gap-6 mb-10 max-[768px]:flex-col max-[768px]:items-start">
              <div>
                <p className="inline-block text-[0.8rem] font-extrabold uppercase tracking-[1.2px] text-[#0d8fe8] mb-[10px]">
                  {t("news.section.label", "Atualizações")}
                </p>

                <h2 className="text-[clamp(2rem,3vw,2.5rem)] leading-[1.15] tracking-[-0.5px] m-0">
                  {t("news.section.title", "Todas as notícias")}
                </h2>
              </div>

              <Link
                href="/"
                className="text-[#0d8fe8] font-bold whitespace-nowrap hover:underline"
              >
                {t("news.section.backHomeInline", "Voltar à home")} →
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-[22px] max-[1100px]:grid-cols-2 max-[768px]:grid-cols-1">
              {news.data.map((item) => (
                <div
                  key={item.id}
                  className={`min-h-full bg-white border border-[#dbe4ee] rounded-[20px] overflow-hidden shadow-[0_8px_24px_rgba(15,23,42,0.06)] hover:-translate-y-1 transition-all duration-300 flex flex-col ${getCardHoverClasses(
                    item.category
                  )}`}
                >
                  <div className="h-[220px] overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition duration-500 hover:scale-105"
                    />
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <span
                      className={`inline-flex self-start items-center min-h-[30px] px-3 py-[6px] rounded-full text-[0.8rem] font-extrabold ${getBadgeClasses(
                        item.category
                      )}`}
                    >
                      {item.category}
                    </span>

                    <p className="mt-4 mb-3 text-[0.95rem] font-bold text-[#4b5563]">
                      {item.date}
                    </p>

                    <h3 className="text-[1.2rem] leading-[1.3] font-semibold">
                      {item.title}
                    </h3>

                    <p className="mt-4 text-[#6b7280] leading-[1.7]">
                      {item.excerpt}
                    </p>

                    <Link
                      href={`/noticias/${item.id}`}
                      className="inline-block mt-auto pt-5 font-bold text-[#0d8fe8] hover:underline text-left"
                    >
                      {t("news.buttons.readMore", "Ler mais")}
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