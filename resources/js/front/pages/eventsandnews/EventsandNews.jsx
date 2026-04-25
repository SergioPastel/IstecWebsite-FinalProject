import React, { useMemo, useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import Layout from "../../layouts/Layout";
import { route } from "ziggy-js";
import Pagination from "../../components/common/Pagination";
import Banner from "../../components/common/Banner";

export default function EventsandNews({
  events = { data: [] },
  news = { data: [] },
}) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language?.startsWith("en") ? "en" : "pt";

  const [activeFilter, setActiveFilter] = useState("all");
  const [subFilter, setSubFilter] = useState("all");
  const [search, setSearch] = useState(""); // the value used for filtering, updated on search

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const { siteInfo } = usePage().props;
  const banner = siteInfo?.pageBanners?.ctesp ?? null;
  const bannerTitle = banner?.title?.[lang] ?? banner?.title?.pt ?? null;
  const bannerSubtitle =
    banner?.subtitle?.[lang] ?? banner?.subtitle?.pt ?? null;

  const eventSubFilters = [
    { key: "all", label: "Todos" },
    { key: "workshop", label: "Workshops" },
    { key: "open", label: "Open Days" },
  ];

  const newsSubFilters = [
    { key: "all", label: "Todas" },
    { key: "entrevista", label: "Entrevistas" },
    { key: "parceria", label: "Parcerias" },
  ];

  const eventItems = Array.isArray(events?.data)
    ? events.data.map((item) => ({
        ...item,
        kind: "event",
        label: item.category || "Evento",
        meta: `${new Date(item.start_date).toLocaleDateString() || "Data por definir"} • ${item.location || "Local por definir"}`,
        summary:
          item.description ||
          "Descobre este evento e participa numa experiência única com atividades práticas e interação com a comunidade.",
      }))
    : [];

  const newsItems = Array.isArray(news?.data)
    ? news.data.map((item) => ({
        ...item,
        kind: "news",
        label: item.category || "Notícia",
        meta:
          new Date(item.created_at).toLocaleDateString() || "Data por definir",
        summary:
          item.excerpt ||
          "Fica a par das últimas novidades, atualizações e histórias relevantes da nossa comunidade.",
      }))
    : [];

  const allItems = [...eventItems, ...newsItems];

  const filteredItems = useMemo(() => {
    return allItems.filter((item) => {
      const matchesFilter =
        activeFilter === "all" ||
        (activeFilter === "events" && item.kind === "event") ||
        (activeFilter === "news" && item.kind === "news");

      const matchesSubFilter =
        subFilter === "all" ||
        (activeFilter === "events" &&
          item.kind === "event" &&
          (item.type || item.category || "")
            .toLowerCase()
            .includes(subFilter)) ||
        (activeFilter === "news" &&
          item.kind === "news" &&
          (item.category || "").toLowerCase().includes(subFilter));

      const searchableText = `
        ${item.title || ""}
        ${item.summary || ""}
        ${item.label || ""}
        ${item.location || ""}
      `.toLowerCase();

      const matchesSearch =
        search.trim() === "" ||
        searchableText.includes(search.toLowerCase().trim());

      return matchesFilter && matchesSubFilter && matchesSearch;
    });
  }, [allItems, activeFilter, subFilter, search]);

  const featuredItem =
    filteredItems.find((item) => item.featured) || filteredItems[0] || null;

  const getItemHref = (item) => {
    if (item.kind === "event") {
      return route("events.show", item.id);
    } else if (item.kind === "news") {
      return route("news.show", item.id);
    }
  };

  const getKindLabel = (item) => {
    return item.kind === "event"
      ? t("updates.card.event", "Evento")
      : t("updates.card.news", "Notícia");
  };
  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredItems.slice(start, start + itemsPerPage);
  }, [filteredItems, currentPage]);

  return (
    <Layout title={t("updates.metaTitle", "Eventos e Notícias")}>
      <main
        className="w-full overflow-x-hidden bg-white text-[#1f2937]"
        onClick={() => {
          window.dispatchEvent(new Event("closeDropdowns"));
        }}
      >
        <Banner
          imageUrl={banner?.url ?? null}
          title={bannerTitle}
          subtitle={bannerSubtitle}
        >
          <div className="w-full px-6 flex items-center">
            <div className="max-w-[760px]">
              <p className="text-[0.82rem] font-extrabold tracking-[1.8px] uppercase text-white/80 mb-4">
                {t("updates.hero.label", "Atualizações")}
              </p>

              <h1 className="text-[clamp(2.6rem,4.5vw,4.2rem)] leading-[1.08] font-extrabold tracking-[-1px]">
                {t("updates.hero.title", "Eventos e Notícias")}
              </h1>

              <p className="mt-5 text-[1.04rem] leading-[1.8] text-white/90 max-w-[620px]">
                {t(
                  "updates.hero.description",
                  "Acompanha as últimas notícias e descobre os próximos eventos, atividades e novidades da nossa comunidade académica.",
                )}
              </p>
            </div>
          </div>
        </Banner>

        <section className="relative -mt-8 z-10 pb-2">
          <div className="max-w-[1600px] mx-auto px-6">
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-4">
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-[#94a3b8]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="h-4 w-4"
                    >
                      <circle cx="11" cy="11" r="7" />
                      <line x1="16.5" y1="16.5" x2="21" y2="21" />
                    </svg>
                  </div>

                  <input
                    type="text"
                    placeholder={t(
                      "updates.search.placeholder",
                      "Pesquisar notícias ou eventos...",
                    )}
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full rounded-[18px] border border-[#dbe4ee] bg-white px-11 py-4 pr-32 text-sm text-[#1f2937] outline-none focus:ring-2 focus:ring-[#0d8fe8]"
                  />
                </div>

                <select
                  value={activeFilter}
                  onChange={(e) => {
                    setActiveFilter(e.target.value);
                    setSubFilter("all");
                    setCurrentPage(1);
                  }}
                  className="w-full rounded-[18px] border border-[#dbe4ee] bg-white px-4 py-4 text-sm text-[#1f2937] outline-none focus:ring-2 focus:ring-[#0d8fe8]"
                >
                  <option value="all">
                    {t("updates.filters.all", "Todos")}
                  </option>
                  <option value="events">
                    {t("updates.filters.events", "Eventos")}
                  </option>
                  <option value="news">
                    {t("updates.filters.news", "Notícias")}
                  </option>
                </select>
              </div>

              {activeFilter === "events" && (
                <div className="flex flex-wrap justify-end gap-3">
                  {eventSubFilters.map((filter) => (
                    <button
                      key={filter.key}
                      onClick={() => {
                        setSubFilter(filter.key);
                        setCurrentPage(1);
                      }}
                      className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                        subFilter === filter.key
                          ? "bg-[#0d8fe8] text-white shadow"
                          : "bg-white border border-[#dbe4ee] text-[#374151] hover:bg-[#f8fafc]"
                      }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>
              )}

              {activeFilter === "news" && (
                <div className="flex flex-wrap justify-end gap-3">
                  {newsSubFilters.map((filter) => (
                    <button
                      key={filter.key}
                      onClick={() => {
                        setSubFilter(filter.key);
                        setCurrentPage(1);
                      }}
                      className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                        subFilter === filter.key
                          ? "bg-[#0d8fe8] text-white shadow"
                          : "bg-white border border-[#dbe4ee] text-[#374151] hover:bg-[#f8fafc]"
                      }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="pb-16 pt-4">
          <div className="max-w-[1600px] mx-auto px-6">
            <div className="flex justify-end mb-8">
              <p className="text-[#6b7280] font-medium">
                {filteredItems.length}{" "}
                {t("updates.section.results", "resultados encontrados")}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-6 max-[1150px]:grid-cols-2 max-[768px]:grid-cols-1">
              {paginatedItems.map((item) => (
                <article
                  key={`${item.kind}-${item.id}`}
                  className="group min-h-full bg-white border border-[#dbe4ee] rounded-[24px] overflow-hidden shadow-[0_10px_30px_rgba(15,23,42,0.05)] hover:-translate-y-1.5 hover:shadow-[0_18px_40px_rgba(15,23,42,0.08)] transition-all duration-300 flex flex-col"
                >
                  <div className="relative h-[240px] overflow-hidden bg-[#eae6df]">
                    <img
                      src={item.media?.url}
                      alt={item.title}
                      className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
                    />

                    <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                      <span className="inline-flex items-center min-h-[32px] px-3 py-[6px] rounded-full text-[0.76rem] font-extrabold bg-white/90 text-[#111827] backdrop-blur-sm">
                        {getKindLabel(item)}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <span className="inline-flex self-start items-center min-h-[30px] px-3 py-[6px] rounded-full text-[0.78rem] font-extrabold bg-[#eef6ff] text-[#0d8fe8]">
                      {item.label || "Atualização"}
                    </span>

                    <p className="mt-4 mb-3 text-[0.95rem] font-bold text-[#4b5563]">
                      {item.meta || "Data por definir"}
                    </p>

                    <h3 className="text-[1.22rem] leading-[1.3] font-bold text-[#111827]">
                      {item.title || "Título do conteúdo"}
                    </h3>

                    <p className="mt-4 text-[#6b7280] leading-[1.75]">
                      {item.summary ||
                        "Consulta mais detalhes sobre esta notícia ou evento e acompanha todas as novidades."}
                    </p>

                    <Link href={getItemHref(item)} className="mt-auto pt-6">
                      <span className="inline-flex w-fit items-center justify-center rounded-full bg-[#0d8fe8] px-5 py-2 text-sm font-bold text-white shadow-[0_8px_20px_rgba(13,143,232,0.22)] transition-all duration-300 hover:bg-[#0a78c4] hover:-translate-y-[1px]">
                        {t("updates.buttons.viewDetails", "Saber mais")}
                      </span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            {filteredItems.length === 0 && (
              <div className="bg-white border border-[#dbe4ee] rounded-[24px] p-12 text-center shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
                <h3 className="text-[1.8rem] font-bold text-[#111827]">
                  {t("updates.empty.title", "Sem resultados")}
                </h3>
                <p className="mt-3 text-[#6b7280] leading-[1.7]">
                  {t(
                    "updates.empty.description",
                    "Não foram encontrados conteúdos com os filtros selecionados. Tenta ajustar a pesquisa ou escolher outra categoria.",
                  )}
                </p>
              </div>
            )}
          </div>
          {Math.ceil(filteredItems.length / itemsPerPage) > 1 && (
            <div className="mt-12 flex justify-center">
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-md border text-sm font-medium transition ${
                    currentPage === 1
                      ? "bg-[#f9fafb] text-[#9ca3af] border-[#e5e7eb] cursor-not-allowed"
                      : "bg-white text-[#374151] border-[#dbe4ee] hover:bg-[#f8fafc]"
                  }`}
                >
                  {`« ${t("pagination.previous", "Anterior")}`}
                </button>

                {Array.from(
                  { length: Math.ceil(filteredItems.length / itemsPerPage) },
                  (_, i) => i + 1,
                ).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`min-w-[40px] h-[40px] rounded-md border text-sm font-medium transition ${
                      currentPage === page
                        ? "bg-[#0d8fe8] text-white border-[#0d8fe8]"
                        : "bg-white text-[#374151] border-[#dbe4ee] hover:bg-[#f8fafc]"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() =>
                    setCurrentPage((prev) =>
                      Math.min(
                        prev + 1,
                        Math.ceil(filteredItems.length / itemsPerPage),
                      ),
                    )
                  }
                  disabled={
                    currentPage ===
                    Math.ceil(filteredItems.length / itemsPerPage)
                  }
                  className={`px-4 py-2 rounded-md border text-sm font-medium transition ${
                    currentPage ===
                    Math.ceil(filteredItems.length / itemsPerPage)
                      ? "bg-[#f9fafb] text-[#9ca3af] border-[#e5e7eb] cursor-not-allowed"
                      : "bg-white text-[#374151] border-[#dbe4ee] hover:bg-[#f8fafc]"
                  }`}
                >
                  {`${t("pagination.next", "Seguinte")} »`}
                </button>
              </div>
            </div>
          )}
        </section>
      </main>
    </Layout>
  );
}
