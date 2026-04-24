import React from "react";
import { Link } from "@inertiajs/react";
import Layout from "../../layouts/Layout";
import { useTranslation } from "react-i18next";
import Banner from "../../components/common/Banner";

export default function Erasmus() {
  const { t } = useTranslation();

  const benefits = [
    t("erasmusPage.benefits.0"),
    t("erasmusPage.benefits.1"),
    t("erasmusPage.benefits.2"),
    t("erasmusPage.benefits.3"),
  ];
  const highlights = [
    { value: "20+", label: t("erasmusPage.highlights.0") },
    { value: "10+", label: t("erasmusPage.highlights.1") },
    { value: "100%", label: t("erasmusPage.highlights.2") },
  ];

  const partners = [
    t("erasmusPage.partners.0"),
    t("erasmusPage.partners.1"),
    t("erasmusPage.partners.2"),
    t("erasmusPage.partners.3"),
  ];

  const steps = [
    {
      title: t("erasmusPage.steps.0.title"),
      text: t("erasmusPage.steps.0.text"),
    },
    {
      title: t("erasmusPage.steps.1.title"),
      text: t("erasmusPage.steps.1.text"),
    },
    {
      title: t("erasmusPage.steps.2.title"),
      text: t("erasmusPage.steps.2.text"),
    },
  ];
  return (
    <Layout title={t("erasmusPage.title")}>
      <div className="min-h-screen bg-white">
        <main className="">
         <Banner>
            <div className="max-w-[1600px] mx-auto px-6 py-20">
              <p className="text-sm uppercase tracking-[2px] font-extrabold text-white/80 mb-4">
                {t("erasmusPage.subtitle")}
              </p>
        
              <h1 className="text-[clamp(2.5rem,4vw,4rem)] font-extrabold leading-tight">
               {t("erasmusPage.title")}
              </h1>
        
              <p className="mt-6 max-w-[700px] text-white/90 leading-relaxed">
                {t("erasmusPage.description")}
              </p>
            </div>
          </Banner>
           <section className="py-16">
            <div className="max-w-7xl mx-auto px-6 md:px-10">
              <div className="grid gap-6 md:grid-cols-3">
                {highlights.map((item, index) => (
                  <div
                    key={index}
                    className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm"
                  >
                    <div className="text-4xl font-bold text-[#1697e6]">
                      {item.value}
                    </div>
                    <p className="mt-3 text-slate-600">{item.label}</p>
                  </div>
                ))}
              </div>
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
          <section className="pb-16">
            <div className="max-w-7xl mx-auto px-6 md:px-10">
              <div className="mb-10 text-center">
                <h2 className="text-3xl font-bold text-[#1697e6]">
                  {t("erasmusPage.stepsTitle")}
                </h2>
                <p className="mt-3 text-slate-600">
                  {t("erasmusPage.stepsDescription")}
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                {steps.map((step, index) => (
                  <div
                    key={index}
                    className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                  >
                    <h3 className="text-lg font-semibold text-slate-900">
                      {step.title}
                    </h3>
                    <p className="mt-4 leading-7 text-slate-600">{step.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="pb-16">
            <div className="max-w-7xl mx-auto px-6 md:px-10">
              <div className="mb-10 text-center">
                <h2 className="text-3xl font-bold text-[#1697e6]">
                  {t("erasmusPage.partnersTitle")}
                </h2>
                <p className="mt-3 text-slate-600">
                  {t("erasmusPage.partnersDescription")}
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                {partners.map((partner, index) => (
                  <div
                    key={index}
                    className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm"
                  >
                    <p className="font-semibold text-slate-900">{partner}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="pb-16">
            <div className="max-w-4xl mx-auto px-6 text-center">
              <h2 className="text-3xl font-bold text-[#1697e6]">
                {t("erasmusPage.ctaTitle")}
              </h2>

              <p className="mt-4 text-slate-600 leading-8">
                {t("erasmusPage.ctaText")}
              </p>

              <Link
                  href={route("contacts")}
                  className="mt-8 inline-block rounded-xl bg-[#1697e6] px-8 py-3 font-semibold text-white transition hover:bg-[#0f7fc2]"
                >
                  {t("erasmusPage.ctaButton")}
            </Link>
            </div>
          </section>
        </main>
      </div>
    </Layout>
  );
}
   