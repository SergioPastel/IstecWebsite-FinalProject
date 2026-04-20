import React from "react";
import Layout from "../../layouts/Layout";
import { useTranslation } from "react-i18next";

export default function Erasmus() {
  const { t } = useTranslation();

  const benefits = [
    t("erasmusPage.benefits.0"),
    t("erasmusPage.benefits.1"),
    t("erasmusPage.benefits.2"),
    t("erasmusPage.benefits.3"),
  ];

  return (
    <Layout title={t("erasmusPage.title")}>
      <div className="min-h-screen bg-white">
        <main className="pt-28">
          <section className="h-[500px] md:h-[600px] flex items-center bg-[#1697e6] text-white">
            <div className="max-w-7xl mx-auto px-6 md:px-10">
              <p className="uppercase tracking-[0.2em] text-sm text-white/80 mb-4">
                {t("erasmusPage.subtitle")}
              </p>

              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                {t("erasmusPage.title")}
              </h1>

              <p className="text-lg md:text-xl text-white/90 max-w-2xl">
                {t("erasmusPage.description")}
              </p>
            </div>
          </section>

          <section className="py-16">
            <div className="max-w-7xl mx-auto px-6 md:px-10">
              <div className="grid items-center gap-10 lg:grid-cols-2">
                <div>
                  <h2 className="text-3xl font-bold text-[#1697e6]">
                    {t("erasmusPage.studyTitle")}
                  </h2>

                  <p className="mt-5 leading-8 text-slate-600">
                    {t("erasmusPage.studyText1")}
                  </p>

                  <p className="mt-4 leading-8 text-slate-600">
                    {t("erasmusPage.studyText2")}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                  <h3 className="text-xl font-semibold text-slate-900">
                    {t("erasmusPage.benefitsTitle")}
                  </h3>

                  <ul className="mt-5 space-y-4 text-slate-600">
                    {benefits.map((item, index) => (
                      <li key={index}>• {item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </Layout>
  );
}