import { Link } from "@inertiajs/react";
import BackofficeLayout from "../../layouts/BackofficeLayout";
import PageHeader from "../../components/ui/PageHeader";
import SectionCard from "../../components/ui/SectionCard";
import EmptyState from "../../components/ui/EmptyState";

export default function CreateEvent() {
  return (
    <BackofficeLayout
      title="Novo evento"
      subtitle="Espaco reservado para criacao de eventos no backoffice."
      searchPlaceholder="Pesquisar no modulo de eventos"
    >
      <div className="space-y-6">
        <PageHeader
          eyebrow="Agenda"
          title="Criar evento"
          description="A pagina ja segue a nova base visual e esta pronta para receber o formulario final."
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
            title="Formulario de evento ainda por ligar."
            description="Mantive a pagina pronta dentro da nova arquitetura para evitar retrabalho quando os campos finais forem implementados."
          />
        </SectionCard>
      </div>
    </BackofficeLayout>
  );
}
