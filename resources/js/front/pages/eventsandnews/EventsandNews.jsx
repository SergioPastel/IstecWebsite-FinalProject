import React, { useMemo, useState } from "react";
import { Link } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import Layout from "../../layouts/Layout";
import { route } from "ziggy-js";
import Pagination from "../../components/common/Pagination";

export default function Updates({
  events = { data: [] },
  news = { data: [] },
}) {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState("all");
  const [search, setSearch] = useState("");

  const eventItems = Array.isArray(events?.data)
    ? events.data.map((item) => ({...item,
            kind: "event",
            label: item.type || "Evento",
            meta: `${item.date || "Data por definir"} • ${item.location || "Local por definir"}`,
            summary:item.description || "Descobre este evento e participa numa experiência única com atividades práticas e interação com a comunidade.",
      }))
    : [];

  const newsItems = Array.isArray(news?.data)
    ? news.data.map((item) => ({
        ...item,
        kind: "news",
        label: item.category || "Notícia",
        meta: item.date || "Data por definir",
        summary:item.excerpt || "Fica a par das últimas novidades, atualizações e histórias relevantes da nossa comunidade.",
      }))
    : [];

  const allItems = [...eventItems, ...newsItems];

  const filteredItems = useMemo(() => {
    return allItems.filter((item) => {
      const matchesFilter =
        activeFilter === "all" ||
        (activeFilter === "events" && item.kind === "event") ||
        (activeFilter === "news" && item.kind === "news");

      const searchableText = `
        ${item.title || ""}
        ${item.summary || ""}
        ${item.label || ""}
        ${item.location || ""}
      `.toLowerCase();

      const matchesSearch = searchableText.includes(search.toLowerCase());

      return matchesFilter && matchesSearch;
    });
  }, [allItems, activeFilter, search]);

  const featuredItem =
    filteredItems.find((item) => item.featured) || filteredItems[0] || null;

  const otherItems = featuredItem
    ? filteredItems.filter(
        (item) =>
          `${item.kind}-${item.id}` !== `${featuredItem.kind}-${featuredItem.id}`
      )
    : filteredItems;

  const getItemHref = (item) => {
    if (item.kind === "event") {
      return route("events.show", item.id);
    }

    return `/noticias/${item.id}`;
  };

    const getKindLabel = (item) => {
    return item.kind === "event"
      ? t("updates.card.event", "Evento")
      : t("updates.card.news", "Notícia");
  };

  return (
  <Layout title={t("updates.metaTitle", "Notícias e Eventos")}>
    <main
      className="w-full overflow-x-hidden bg-white text-[#1f2937]"
      onClick={() => {
        window.dispatchEvent(new Event("closeDropdowns"));
      }}
    >
      <section className="w-full mt-[120px]">
        <div className="bg-gradient-to-r from-[#0b7fd1] to-[#1597ec] text-white">
          <div className="max-w-[1600px] mx-auto px-6 min-h-[540px] md:min-h-[620px] flex items-center">
            <div className="max-w-[760px]">
              <p className="text-[0.82rem] font-extrabold tracking-[1.8px] uppercase text-white/80 mb-4">
                {t("updates.hero.label", "Atualizações")}
              </p>

              <h1 className="text-[clamp(2.6rem,4.5vw,4.2rem)] leading-[1.08] font-extrabold tracking-[-1px]">
                {t("updates.hero.title", "Notícias e Eventos")}
              </h1>

              <p className="mt-5 text-[1.04rem] leading-[1.8] text-white/90 max-w-[620px]">
                {t(
                  "updates.hero.description",
                  "Acompanha as últimas notícias e descobre os próximos eventos, atividades e novidades da nossa comunidade académica."
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative -mt-8 z-10 pb-2">
        <div className="max-w-[1600px] mx-auto px-6">
          <div className="bg-white border border-[#e5e7eb] rounded-[24px] shadow-[0_12px_30px_rgba(15,23,42,0.06)] p-5 md:p-6 flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setActiveFilter("all")}
                className={`px-5 py-2.5 rounded-full font-semibold transition-all duration-300 ${
                  activeFilter === "all"
                    ? "bg-[#0d8fe8] text-white shadow"
                    : "bg-[#f3f4f6] text-[#374151] hover:bg-[#e8eef5]"
                }`}
              >
                {t("updates.filters.all", "Todos")}
              </button>

              <button
                onClick={() => setActiveFilter("events")}
                className={`px-5 py-2.5 rounded-full font-semibold transition-all duration-300 ${
                  activeFilter === "events"
                    ? "bg-[#0d8fe8] text-white shadow"
                    : "bg-[#f3f4f6] text-[#374151] hover:bg-[#e8eef5]"
                }`}
              >
                {t("updates.filters.events", "Eventos")}
              </button>

              <button
                onClick={() => setActiveFilter("news")}
                className={`px-5 py-2.5 rounded-full font-semibold transition-all duration-300 ${
                  activeFilter === "news"
                    ? "bg-[#0d8fe8] text-white shadow"
                    : "bg-[#f3f4f6] text-[#374151] hover:bg-[#e8eef5]"
                }`}
              >
                {t("updates.filters.news", "Notícias")}
              </button>
            </div>

            <div className="w-full lg:w-[340px]">
              <input
                type="text"
                placeholder={t(
                  "updates.search.placeholder",
                  "Pesquisar notícias ou eventos..."
                )}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-full border border-[#e5e7eb] bg-[#f9fafb] px-5 py-3 outline-none transition focus:border-[#0d8fe8] focus:bg-white"
              />
            </div>
          </div>
        </div>
      </section>

      {featuredItem && (
        <section className="py-10">
          <div className="max-w-[1600px] mx-auto px-6">
            <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-6">
              <div className="group overflow-hidden rounded-[28px] border border-[#dbe4ee] bg-white shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
                <div className="relative h-[320px] md:h-[420px] overflow-hidden">
                  <img
                    src={featuredItem.image}
                    alt={featuredItem.title}
                    className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/55 via-[#0f172a]/15 to-transparent"></div>

                  <div className="absolute left-6 right-6 bottom-6">
                    <div className="flex flex-wrap gap-3 mb-4">
                      <span className="inline-flex items-center min-h-[34px] px-4 py-[6px] rounded-full text-[0.8rem] font-extrabold bg-white text-[#111827]">
                        {t("updates.featured.badge", "Destaque")}
                      </span>

                      <span className="inline-flex items-center min-h-[34px] px-4 py-[6px] rounded-full text-[0.8rem] font-extrabold bg-white/15 text-white border border-white/20 backdrop-blur-sm">
                        {getKindLabel(featuredItem)}
                      </span>
                    </div>

                    <h2 className="text-white text-[clamp(1.8rem,3vw,2.8rem)] leading-[1.1] font-extrabold tracking-[-0.8px] max-w-[760px]">
                      {featuredItem.title || "Título em destaque"}
                    </h2>

                    <p className="mt-3 text-white/90 max-w-[700px] leading-[1.7]">
                      {featuredItem.summary ||
                        "Consulta mais informações sobre este conteúdo em destaque e fica a par das novidades mais relevantes."}
                    </p>
                  </div>
                </div>

                <div className="p-6 md:p-7">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <span className="inline-flex self-start items-center min-h-[30px] px-3 py-[6px] rounded-full text-[0.78rem] font-extrabold bg-[#eef6ff] text-[#0d8fe8]">
                        {featuredItem.label || "Destaque"}
                      </span>

                      <p className="mt-4 text-[0.95rem] font-bold text-[#4b5563]">
                        {featuredItem.meta || "Data por definir • Local por definir"}
                      </p>
                    </div>

                    <Link
                      href={getItemHref(featuredItem)}
                      className="inline-flex items-center justify-center rounded-full bg-[#0d8fe8] px-6 py-3 text-sm font-bold text-white shadow-[0_10px_30px_rgba(13,143,232,0.14)] hover:bg-[#0a78c4] hover:-translate-y-[2px] transition-all duration-300"
                    >
                      {featuredItem.kind === "event"
                        ? t("updates.buttons.viewEvent", "Ver evento")
                        : t("updates.buttons.readFull", "Ler notícia")}
                    </Link>
                  </div>
                </div>
              </div>

              <div className="grid gap-6">
                {otherItems.slice(0, 2).map((item) => (
                  <div
                    key={`${item.kind}-${item.id}`}
                    className="group bg-white border border-[#dbe4ee] rounded-[24px] overflow-hidden shadow-[0_10px_30px_rgba(15,23,42,0.06)] hover:-translate-y-1 hover:shadow-[0_18px_36px_rgba(15,23,42,0.08)] transition-all duration-300"
                  >
                    <div className="grid sm:grid-cols-[180px_1fr]">
                      <div className="h-[180px] sm:h-full overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
                        />
                      </div>

                      <div className="p-6 flex flex-col">
                        <div className="flex flex-wrap gap-2 mb-3">
                          <span className="inline-flex items-center min-h-[30px] px-3 py-[6px] rounded-full text-[0.76rem] font-extrabold bg-[#f2f4f7] text-[#374151]">
                            {getKindLabel(item)}
                          </span>

                          <span className="inline-flex items-center min-h-[30px] px-3 py-[6px] rounded-full text-[0.76rem] font-extrabold bg-[#eef6ff] text-[#0d8fe8]">
                            {item.label || "Atualização"}
                          </span>
                        </div>

                        <p className="text-[0.92rem] font-bold text-[#4b5563]">
                          {item.meta || "Data por definir"}
                        </p>

                        <h3 className="mt-3 text-[1.18rem] leading-[1.3] font-bold text-[#111827]">
                          {item.title || "Título do conteúdo"}
                        </h3>

                        <p className="mt-3 text-[#6b7280] leading-[1.7] line-clamp-3">
                          {item.summary ||
                            "Explora esta notícia ou evento para saber mais detalhes e acompanhar as novidades mais recentes."}
                        </p>

                        <Link
                          href={getItemHref(item)}
                          className="inline-flex items-center gap-2 mt-5 font-bold text-[#0d8fe8] hover:underline text-left"
                        >
                          {t("updates.buttons.viewDetails", "Ver detalhes")}
                          <span className="transition-transform duration-300 group-hover:translate-x-1">
                            →
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="pb-16 pt-4">
        <div className="max-w-[1600px] mx-auto px-6">
          <div className="flex justify-between items-end gap-6 mb-8 max-[768px]:flex-col max-[768px]:items-start">
            <div>
              <p className="inline-block text-[0.8rem] font-extrabold uppercase tracking-[1.2px] text-[#0d8fe8] mb-[10px]">
                {t("updates.section.label", "Atualizações")}
              </p>

              <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] leading-[1.15] tracking-[-0.5px] font-extrabold">
                {t("updates.section.title", "Todas as Notícias e Eventos")}
              </h2>
            </div>

            <p className="text-[#6b7280] font-medium">
              {filteredItems.length}{" "}
              {t("updates.section.results", "resultados encontrados")}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-6 max-[1150px]:grid-cols-2 max-[768px]:grid-cols-1">
            {filteredItems.map((item) => (
              <article
                key={`${item.kind}-${item.id}`}
                className="group min-h-full bg-white border border-[#dbe4ee] rounded-[24px] overflow-hidden shadow-[0_10px_30px_rgba(15,23,42,0.05)] hover:-translate-y-1.5 hover:shadow-[0_18px_40px_rgba(15,23,42,0.08)] transition-all duration-300 flex flex-col"
              >
                <div className="relative h-[240px] overflow-hidden bg-[#eae6df]">
                  <img
                    src={item.image}
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

                  <Link
                    href={getItemHref(item)}
                    className="inline-flex items-center gap-2 mt-auto pt-6 font-bold text-[#0d8fe8] hover:underline text-left"
                  >
                    {t("updates.buttons.viewDetails", "Ver detalhes")}
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
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
                  "Não foram encontrados conteúdos com os filtros selecionados. Tenta ajustar a pesquisa ou escolher outra categoria."
                )}
              </p>
            </div>
          )}
        </div>

        <div className="mt-12 flex justify-center">
          <Pagination links={events.links || []} />
        </div>
      </section>
    </main>
  </Layout>
);
}