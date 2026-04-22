import { Link } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import BackofficeLayout from "../../layouts/BackofficeLayout";
import EmptyState from "../../components/ui/EmptyState";
import PageHeader from "../../components/ui/PageHeader";
import SectionCard from "../../components/ui/SectionCard";
import StatusBadge from "../../components/ui/StatusBadge";
import { filterCollectionByQuery } from "../../utils/search";

export default function NewsIndexBack({ news }) {
  const rows = news ?? [];

  function handleDelete(newsId) {
    if (confirm("Tem certeza que deseja eliminar esta noticia?")) {
      Inertia.delete(route("news.destroy", { news: newsId }));
    }
  }

  return (
    <BackofficeLayout
      title="Noticias"
      subtitle="Organize o conteudo editorial com uma base pronta para evoluir."
      searchPlaceholder="Pesquisar noticias"
    >
      {({ searchQuery }) => {
        const filteredRows = filterCollectionByQuery(rows, searchQuery, (item) => [
          item.title,
          item.description,
          item.excerpt,
          item.published_at ? "publicado" : "rascunho",
        ]);

        return <div className="space-y-6">
        <PageHeader
          eyebrow="Editorial"
          title="Gestao de noticias"
          actions={[
            <Link
              key="create"
              href={route("news.create")}
              className="inline-flex items-center justify-center rounded-2xl bg-[var(--color-brand-primary)] px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_32px_rgba(12,115,183,0.28)] transition hover:bg-[var(--color-brand-secondary)]"
            >
              Nova noticia
            </Link>,
          ]}
        />

        <SectionCard
          title="Publicacoes"
          subtitle={`${filteredRows.length} de ${rows.length} entradas prontas para administracao editorial.`}
        >
          {rows.length === 0 ? (
            <EmptyState title="Nao existem noticias publicadas." />
          ) : filteredRows.length === 0 ? (
            <EmptyState
              title="Nenhuma noticia corresponde a esta pesquisa."
              description="A pesquisa funciona por titulo, resumo, descricao e estado."
            />
          ) : (
            <div className="grid gap-4 xl:grid-cols-2">
              {filteredRows.map((item) => (
                <article
                  key={item.id}
                  className="rounded-[28px] border border-slate-200 bg-slate-50/80 p-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-semibold text-slate-950">
                        {item.title?.pt ?? item.title}
                      </h2>
                      <p className="mt-2 text-sm leading-6 text-slate-500">
                        {item.description?.pt ??
                          item.excerpt?.pt ??
                          item.excerpt ??
                          "Sem resumo disponivel."}
                      </p>
                    </div>
                    <StatusBadge
                      label={item.published_at ? "Publicado" : "Rascunho"}
                      tone={item.published_at ? "success" : "warning"}
                    />
                  </div>

                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    <Link
                      href={route("news.edit", { news: item.id })}
                      className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-950"
                    >
                      Editar
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleDelete(item.id)}
                      className="inline-flex items-center justify-center rounded-2xl border border-rose-200 bg-rose-50 px-4 py-2.5 text-sm font-semibold text-rose-700 transition hover:bg-rose-100"
                    >
                      Eliminar
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </SectionCard>
      </div>;
      }}
    </BackofficeLayout>
  );
}
