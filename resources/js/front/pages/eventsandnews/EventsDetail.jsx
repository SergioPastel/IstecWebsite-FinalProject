import React from "react";
import { Link } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import Layout from "../../layouts/Layout";

export default function EventDetail({ event }) {
  const { t, i18n } = useTranslation();

  return (  
    <Layout title={event.title}>
      <main
        className="w-full overflow-x-hidden bg-[#f5f8fc] text-[#1f2937] pt-[160px] pb-20"
        onClick={() => {
          window.dispatchEvent(new Event("closeDropdowns"));
        }}
      >
        <section className="max-w-[1200px] mx-auto px-6">
          <article className="overflow-hidden rounded-[28px] border border-[#ddd6cc] bg-white shadow-[0_10px_30px_rgba(15,23,42,0.08)]">
            <div className="h-[320px] md:h-[460px] w-full overflow-hidden bg-[#eae6df]">
              {event.media ? (
                <img
                  src={event.media?.url}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex w-full h-full items-center justify-center text-[#6b7280] font-medium">
                  {t("events.detail.imagePlaceholder", "Imagem do evento")}
                </div>
              )}
            </div>

            <div className="p-8 md:p-12">
              <div className="mb-5 flex flex-wrap items-center gap-3">
                {event.type && (
                  <span className="inline-flex items-center min-h-[30px] px-3 py-[6px] rounded-full text-[0.8rem] font-extrabold bg-[#eae6df] text-[#3f3f3f]">
                    {event.type}
                  </span>
                )}

                {event.date && (
                  <span className="text-[0.95rem] font-bold text-[#4b5563]">
                    {event.date}
                  </span>
                )}

                {event.location && (
                  <span className="text-[0.95rem] font-bold text-[#4b5563]">
                    • {event.location}
                  </span>
                )}
              </div>

              <h1 className="text-[clamp(2rem,4vw,3.6rem)] leading-[1.1] tracking-[-1px] font-extrabold text-[#111827]">
                {event.title}
              </h1>

              <p className="mt-6 text-[1.08rem] leading-[1.9] text-[#6b7280]">
                {event.description}
              </p>

              <div className="mt-10 border-t border-[#e5e0d8] pt-8">
                <div className="prose prose-lg max-w-none text-[#374151]">
                  <p className="leading-[1.9] whitespace-pre-line">
                    {event.content || event.description}
                  </p>
                </div>
              </div>
                <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-between items-center">
                    <button
                      type="button"
                      onClick={() => window.history.back()}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[#0d8fe8] text-[#0d8fe8] font-semibold hover:bg-[#eaf4ff] transition"
                    >
                      ← {t("events.detail.back", "Voltar")}
                    </button>

                    <Link
                      href={route("applications.events.apply", { event: event.id })}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#0d8fe8] text-white font-semibold hover:bg-[#0b7acc] transition shadow"
                    >
                      {t("events.detail.apply", "Candidatar-se")}
                    </Link>
                  </div>

            </div>
          </article>
        </section>
      </main>
    </Layout>
  );
}