import { Link } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import BackofficeLayout from "../../layouts/BackofficeLayout";
import EmptyState from "../../components/ui/EmptyState";
import PageHeader from "../../components/ui/PageHeader";
import SectionCard from "../../components/ui/SectionCard";
import StatusBadge from "../../components/ui/StatusBadge";
import { filterCollectionByQuery } from "../../utils/search";

export default function EventsIndexBack({ events }) {
  const rows = events?.data ?? events ?? [];

  function handleDelete(eventId) {
    if (confirm("Tem certeza que deseja eliminar este evento?")) {
      Inertia.delete(route("events.destroy", { event: eventId }));
    }
  }

  return (
    <BackofficeLayout
      title="Eventos"
      subtitle="Coordene agenda, visibilidade e estado operacional dos eventos."
      searchPlaceholder="Pesquisar eventos"
    >
      {({ searchQuery }) => {
        const filteredRows = filterCollectionByQuery(rows, searchQuery, (event) => [
          event.title,
          event.description,
          event.location,
          formatDate(event.start_date),
          formatDate(event.end_date),
        ]);

        return <div className="space-y-6">
        <PageHeader
          eyebrow="Agenda"
          title="Gestao de eventos"
          actions={[
            <Link
              key="create"
              href={route("events.create")}
              className="inline-flex items-center justify-center rounded-2xl bg-[var(--color-brand-primary)] px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_32px_rgba(12,115,183,0.28)] transition hover:bg-[var(--color-brand-secondary)]"
            >
              Novo evento
            </Link>,
          ]}
        />

        <SectionCard
          title="Calendario editorial"
          subtitle={`${filteredRows.length} de ${rows.length} eventos preparados para acompanhamento.`}
        >
          {rows.length === 0 ? (
            <EmptyState
              title="Nao existem eventos configurados."
              description="Assim que a agenda for populada, esta area pode mostrar estados, localizacao, periodo e destaque institucional."
            />
          ) : filteredRows.length === 0 ? (
            <EmptyState
              title="Nenhum evento corresponde a esta pesquisa."
              description="A pesquisa funciona por titulo, descricao, local e datas."
            />
          ) : (
            <div className="grid gap-4 xl:grid-cols-2">
              {filteredRows.map((event) => (
                <article
                  key={event.id}
                  className="rounded-[28px] border border-slate-200 bg-slate-50/80 p-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-semibold text-slate-950">
                        {event.title?.pt ?? event.title}
                      </h2>
                      <p className="mt-2 text-sm leading-6 text-slate-500">
                        {event.description?.pt ??
                          event.description ??
                          "Sem descricao resumida."}
                      </p>
                    </div>
                    <StatusBadge
                      label={event.location ?? "Sem local"}
                      tone="info"
                    />
                  </div>

                  <p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                    {formatDate(event.start_date)} a {formatDate(event.end_date)}
                  </p>

                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    <Link
                      href={route("events.edit", { event: event.id })}
                      className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-950"
                    >
                      Editar
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleDelete(event.id)}
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

function formatDate(value) {
  if (!value) {
    return "Data por definir";
  }

  return new Date(value).toLocaleDateString("pt-PT", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
