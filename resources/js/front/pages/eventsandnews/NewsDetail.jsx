import React from "react";
import { Link } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import Layout from "../../layouts/Layout";

export default function NewsDetail({ newsItem = null }) {
  const { t, i18n } = useTranslation();

  if (!newsItem) {
    return (
      <>
        <Layout language={i18n.language} />

        <main className="min-h-screen bg-[#f5f8fc] pt-32 pb-20 px-6">
          <div className="max-w-[1000px] mx-auto">
            <div className="rounded-[24px] border border-[#ddd6cc] bg-white p-10 text-center shadow-[0_8px_24px_rgba(15,23,42,0.06)]">
              <h1 className="text-3xl font-bold text-[#111827]">
                {t("news.detail.notFound", "Notícia não encontrada")}
              </h1>

              <p className="mt-4 text-[#6b7280]">
                {t(
                  "news.detail.notFoundDescription",
                  "Não foi possível carregar o detalhe da notícia."
                )}
              </p>

              <Link
                href="/noticias"
                className="mt-8 inline-flex items-center justify-center rounded-full bg-[#0d8fe8] px-6 py-3 font-bold text-white transition hover:bg-[#0a78c4]"
              >
                {t("news.detail.backToNews", "Voltar às notícias")}
              </Link>
            </div>
          </div>
        </main>

        <Footer language={i18n.language} />
      </>
    );
  }

  return (
    <>
      <Header language={i18n.language} />

      <main
        className="w-full overflow-x-hidden bg-[#f5f8fc] text-[#1f2937] pt-[120px] pb-20"
        onClick={() => {
          window.dispatchEvent(new Event("closeDropdowns"));
        }}
      >
        <section className="max-w-[1200px] mx-auto px-6">
          <Link
            href="/noticias"
            className="mb-8 inline-flex items-center font-bold text-[#0d8fe8] hover:underline"
          >
            ← {t("news.detail.backToNews", "Voltar às notícias")}
          </Link>

          <article className="overflow-hidden rounded-[28px] border border-[#ddd6cc] bg-white shadow-[0_10px_30px_rgba(15,23,42,0.08)]">
            <div className="h-[320px] md:h-[460px] w-full overflow-hidden bg-[#eae6df]">
              {newsItem.image ? (
                <img
                  src={newsItem.image}
                  alt={newsItem.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex w-full h-full items-center justify-center text-[#6b7280] font-medium">
                  {t("news.detail.imagePlaceholder", "Imagem da notícia")}
                </div>
              )}
            </div>

            <div className="p-8 md:p-12">
              <div className="mb-5 flex flex-wrap items-center gap-3">
                {newsItem.category && (
                  <span className="inline-flex items-center min-h-[30px] rounded-full bg-[#eae6df] px-3 py-[6px] text-[0.8rem] font-extrabold text-[#3f3f3f]">
                    {newsItem.category}
                  </span>
                )}

                {newsItem.date && (
                  <span className="text-[0.95rem] font-bold text-[#4b5563]">
                    {newsItem.date}
                  </span>
                )}
              </div>

              <h1 className="text-[clamp(2rem,4vw,3.6rem)] font-extrabold leading-[1.1] tracking-[-1px] text-[#111827]">
                {newsItem.title}
              </h1>

              <p className="mt-6 text-[1.08rem] leading-[1.9] text-[#6b7280]">
                {newsItem.excerpt}
              </p>

              <div className="mt-10 border-t border-[#e5e0d8] pt-8">
                <div className="prose prose-lg max-w-none text-[#374151]">
                  <p className="whitespace-pre-line leading-[1.9]">
                    {newsItem.content || newsItem.excerpt}
                  </p>
                </div>
              </div>
            </div>
          </article>
        </section>
      </main>

      <Footer language={i18n.language} />
    </>
  );
}