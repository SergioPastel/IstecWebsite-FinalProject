import { useState } from "react";
import { Link, router } from "@inertiajs/react";
import BackofficeLayout from "../../layouts/BackofficeLayout";
import EmptyState from "../../components/ui/EmptyState";
import PageHeader from "../../components/ui/PageHeader";
import SectionCard from "../../components/ui/SectionCard";
import StatusBadge from "../../components/ui/StatusBadge";

export default function EventsIndexBack({ events }) {
  const rows = events?.data ?? events ?? [];

  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  function openDeleteModal(id) {
    setSelectedId(id);
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
    setSelectedId(null);
  }

  function confirmDelete() {
    router.delete(route("events.destroy", { event: selectedId }), {
      preserveScroll: true,
      preserveState: false,
      onSuccess: () => {
        closeModal();
        router.visit(route("backoffice.events"));
      },
    });
  }

  return (
    <BackofficeLayout
      title="Eventos"
      subtitle="Coordene agenda, visibilidade e estado operacional dos eventos."
      searchPlaceholder="Pesquisar eventos"
    >
      <div className="space-y-6">
        <PageHeader
          eyebrow="Eventos"
          title="Gestão de eventos"
          //description="Base visual consistente com o novo backoffice, pronta para detalhe, filtros temporais e estados editoriais."
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
          subtitle={`${rows.length} eventos preparados para acompanhamento.`}
        >
          {rows.length === 0 ? (
            <EmptyState
              title="Nao existem eventos configurados."
              description="Assim que a agenda for populada, esta area pode mostrar estados, localizacao, periodo e destaque institucional."
            />
          ) : (
            <div className="grid gap-4 xl:grid-cols-2">
              {rows.map((event) => (
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
                      onClick={() => openDeleteModal(event.id)}
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
      </div>  
      {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
              <h2 className="text-lg font-semibold text-slate-900">
                Confirmar eliminação
              </h2>

              <p className="mt-2 text-sm text-slate-600">
                Tens a certeza que queres eliminar este evento? Esta ação não pode ser revertida.
              </p>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-xl border border-slate-200 px-4 py-2 text-slate-600 hover:bg-slate-100"
                >
                  Cancelar
                </button>

                <button
                  type="button"
                  onClick={confirmDelete}
                  className="rounded-xl bg-rose-600 px-4 py-2 text-white hover:bg-rose-700"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        )}
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