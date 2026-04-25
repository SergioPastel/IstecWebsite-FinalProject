import React from "react";
import { useTranslation } from "react-i18next";
import Layout from "../../layouts/Layout";

export default function Privacy() {
  const { t } = useTranslation();
  const sections = t('privacyPage.sections', { returnObjects: true });

  return (
    <Layout title={t('privacyPage.title')}>
      <main className="min-h-screen bg-[#f6f8fb] pt-[140px] pb-16">
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-6 py-8 sm:px-10">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#0d8fe8]">
                {t('privacyPage.subtitle')}
              </p>
              <h1 className="mt-2 text-3xl font-bold text-slate-900">
                {t('privacyPage.title')}
              </h1>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-500">
                {t('privacyPage.description')}
              </p>
            </div>

            <div className="space-y-8 px-6 py-8 sm:px-10">
              {sections.map((section, index) => (
                <section key={index}>
                  <h2 className="text-xl font-bold text-slate-900">{section.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {section.content}
                  </p>
                </section>
              ))}

              <section className="rounded-xl bg-slate-50 p-4 text-sm text-slate-500">
                {t('privacyPage.lastUpdate')} {new Date().getFullYear()}
              </section>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}