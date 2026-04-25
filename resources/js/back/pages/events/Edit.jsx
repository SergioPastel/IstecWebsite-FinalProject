import { Link } from "@inertiajs/react";
import BackofficeLayout from "../../layouts/BackofficeLayout";
import SectionCard from "../../components/ui/SectionCard";
import EventCreateForm from "../../components/common/EventCreateForm";

export default function EventEdit({ event, eventCategories = [] }) {
  const currentEvent = event?.data ?? event ?? {};
  return (
    <BackofficeLayout
      title="Editar evento"
      subtitle="Atualize os dados do evento"
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
      <SectionCard title="Formulário" subtitle="Edite os dados principais do evento">
        <EventCreateForm
          event={currentEvent}
          isEdit={true}
          eventCategories={eventCategories}
        />
      </SectionCard>
    </BackofficeLayout>
  );
}
