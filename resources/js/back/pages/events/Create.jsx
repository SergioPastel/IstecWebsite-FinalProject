import { Link } from "@inertiajs/react";
import BackofficeLayout from "../../layouts/BackofficeLayout";
import PageHeader from "../../components/ui/PageHeader";
import SectionCard from "../../components/ui/SectionCard";
import EventCreateForm from "../../components/common/EventCreateForm";

export default function CreateEvent({ eventCategories = [] }) {
  return (
    <BackofficeLayout
      title="Novo evento"
      subtitle="Criação de um novo evento."
      searchPlaceholder="Pesquisar eventos"
      actions={[
        <Link
          key="back"
          href={route("backoffice.events")}
          className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-950"
        >
          Voltar à lista de eventos
        </Link>,
      ]}
    >

    <SectionCard
      title="Formulário"
      subtitle="Dados principais do evento"
    >
      <EventCreateForm eventCategories={eventCategories} />
    </SectionCard>
      
    </BackofficeLayout>
  );
}