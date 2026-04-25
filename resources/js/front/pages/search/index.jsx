import React from "react";
import Layout from "../../layouts/Layout";
import { Link } from "@inertiajs/react";
import { route } from "ziggy-js";
import { useTranslation } from "react-i18next";

export default function Search({ query = "", results = {} }) {
  const { t } = useTranslation();
  const courses = results.courses || [];
  const events = results.events || [];
  const news = results.news || [];

  const hasCourses = courses.length > 0;
  const hasEvents = events.length > 0;
  const hasNews = news.length > 0;
  const hasAnyResults = hasCourses || hasEvents || hasNews;

  return (
    <Layout title={t("search.title")}>
      <div className="min-h-screen bg-white">
        <main className="pt-28">
          <section className="bg-[#1697e6] text-white py-16">
            <div className="max-w-7xl mx-auto px-6 md:px-10">
              <h1 className="text-4xl md:text-5xl font-bold">{t("search.title")}</h1>
              <p className="mt-4 text-white/90">
                {query ? t("search.resultsFor", { query }) : t("search.writeToSearch")}
              </p>
            </div>
          </section>

          <section className="py-16">
            <div className="max-w-7xl mx-auto px-6 md:px-10 space-y-14">
              {!hasAnyResults && (
                <p className="text-slate-600 text-lg">
                  {t("search.noResults", { query })}
                </p>
              )}

              {hasCourses && (
                <div>
                  <h2 className="text-2xl font-bold text-[#1697e6] mb-6">
                    {t("search.courses")}
                  </h2>

                  <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {courses.map((course) => (
                      <div
                        key={course.id}
                        className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                      >
                        <h3 className="text-lg font-semibold text-slate-900">
                          {course.title}
                        </h3>

                        <p className="mt-3 text-slate-600 line-clamp-3">
                          {course.description}
                        </p>

                        <Link
                          href={route("courses.show", course.id)}
                          className="inline-block mt-6 rounded-xl bg-[#1697e6] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0f7fc2]"
                        >
                          {t("search.viewMore")}
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {hasEvents && (
                <div>
                  <h2 className="text-2xl font-bold text-[#1697e6] mb-6">
                    {t("search.events")}
                  </h2>

                  <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {events.map((event) => (
                      <div
                        key={event.id}
                        className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                      >
                        <h3 className="text-lg font-semibold text-slate-900">
                          {event.title}
                        </h3>

                        <p className="mt-3 text-slate-600 line-clamp-3">
                          {event.description}
                        </p>

                        <Link
                          href={route("events.show", event.id)}
                          className="inline-block mt-6 rounded-xl bg-[#1697e6] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0f7fc2]"
                        >
                          {t("search.viewMore")}
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {hasNews && (
                <div>
                  <h2 className="text-2xl font-bold text-[#1697e6] mb-6">
                    {t("search.news")}
                  </h2>

                  <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {news.map((item) => (
                      <div
                        key={item.id}
                        className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                      >
                        <h3 className="text-lg font-semibold text-slate-900">
                          {item.title}
                        </h3>

                        <p className="mt-3 text-slate-600 line-clamp-3">
                          {item.description}
                        </p>

                        <Link
                          href={route("news.show", item.id)}
                          className="inline-block mt-6 rounded-xl bg-[#1697e6] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0f7fc2]"
                        >
                          {t("search.viewMore")}
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        </main>
      </div>
    </Layout>
  );
}