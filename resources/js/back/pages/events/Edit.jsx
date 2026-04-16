import { Link } from "@inertiajs/react";
import BackofficeLayout from "../../layouts/BackofficeLayout";
import PageHeader from "../../components/ui/PageHeader";
import SectionCard from "../../components/ui/SectionCard";
import EmptyState from "../../components/ui/EmptyState";

export default function EventEdit({ event }) {
  return (
    <BackofficeLayout
      title="Editar evento"
      subtitle="Area preparada para consolidar a gestao editorial da agenda."
      searchPlaceholder="Pesquisar no modulo de eventos"
    >
      <div className="space-y-6">
        <PageHeader
          eyebrow="Agenda"
          title={event?.title?.pt ?? event?.title ?? "Evento"}
          description={`Edicao do registo ${event?.id ?? ""}.`}
          actions={[
            <Link
              key="back"
              href={route("backoffice.events")}
              className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-950"
            >
              Voltar a eventos
            </Link>,
          ]}
        />

        <SectionCard title="Formulario" subtitle="Placeholder preparado para evolucao.">
          <EmptyState
            compact
            title="Edicao detalhada ainda por concluir."
            description="Mantive a pagina integrada no novo backoffice para que a experiencia continue consistente enquanto o formulario final e concluido."
          />
        </SectionCard>
      </div>
    </BackofficeLayout>
  );
}
