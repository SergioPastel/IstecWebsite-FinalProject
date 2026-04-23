import React from "react";
import Layout from "../../layouts/Layout";
import { useTranslation } from "react-i18next";
import Banner from "../../components/common/Banner";

export default function Pedagogy() {
  const { t } = useTranslation();

  const areas = [
    {
      title: t("pedagogyPage.areas.0.title"),
      text: t("pedagogyPage.areas.0.text"),
    },
    {
      title: t("pedagogyPage.areas.1.title"),
      text: t("pedagogyPage.areas.1.text"),
    },
    {
      title: t("pedagogyPage.areas.2.title"),
      text: t("pedagogyPage.areas.2.text"),
    },
  ];

  const objectives = [
    t("pedagogyPage.objectives.0"),
    t("pedagogyPage.objectives.1"),
    t("pedagogyPage.objectives.2"),
    t("pedagogyPage.objectives.3"),
  ];

  return (
    <Layout title={t("pedagogyPage.title")}>
      <div className="min-h-screen bg-white">
        <main className="">
          <Banner>
            <div className="max-w-[1600px] mx-auto px-6 py-20">
              <p className="text-sm uppercase tracking-[2px] font-extrabold text-white/80 mb-4">
                {t("pedagogyPage.subtitle")}
              </p>

              <h1 className="text-[clamp(2.5rem,4vw,4rem)] font-extrabold leading-tight">
                {t("pedagogyPage.title")}
              </h1>

              <p className="mt-6 max-w-[700px] text-white/90 leading-relaxed">
                {t("pedagogyPage.description")}
              </p>
            </div>
          </Banner>

          <section className="py-16">
            <div className="max-w-7xl mx-auto px-6 md:px-10">
              <div className="grid gap-10 lg:grid-cols-2">
                <div>
                  <h2 className="text-3xl font-bold text-[#1697e6]">
                    {t("pedagogyPage.impactTitle")}
                  </h2>

                  <p className="mt-5 leading-8 text-slate-600">
                    {t("pedagogyPage.impactText1")}
                  </p>

                  <p className="mt-4 leading-8 text-slate-600">
                    {t("pedagogyPage.impactText2")}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                  <h3 className="text-xl font-semibold text-slate-900">
                    {t("pedagogyPage.objectivesTitle")}
                  </h3>

                  <ul className="mt-5 space-y-3 text-slate-600">
                    {objectives.map((item, index) => (
                      <li key={index}>• {item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="pb-16">
            <div className="max-w-7xl mx-auto px-6 md:px-10">
              <div className="mb-10">
                <h2 className="text-3xl font-bold text-[#1697e6] text-center">
                  {t("pedagogyPage.areasTitle")}
                </h2>

                <p className="mt-3 text-slate-600 text-center">
                  {t("pedagogyPage.areasDescription")}
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {areas.map((area, index) => (
                  <div
                    key={index}
                    className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                  >
                    <h3 className="text-xl font-semibold text-slate-900">
                      {area.title}
                    </h3>
                    <p className="mt-4 text-slate-600">{area.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="pb-16">
            <div className="max-w-4xl mx-auto px-6 text-center">
              <h2 className="text-3xl font-bold text-[#1697e6]">
                {t("pedagogyPage.ctaTitle")}
              </h2>

              <p className="mt-4 text-slate-600 leading-8">
                {t("pedagogyPage.ctaText")}
              </p>

              <button className="mt-8 rounded-xl bg-[#1697e6] px-8 py-3 font-semibold text-white transition hover:bg-[#0f7fc2]">
                {t("pedagogyPage.ctaButton")}
              </button>
            </div>
          </section>
        </main>
      </div>
    </Layout>
  );
}