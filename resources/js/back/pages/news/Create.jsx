import { Link } from "@inertiajs/react";
import BackofficeLayout from "../../layouts/BackofficeLayout";
import PageHeader from "../../components/ui/PageHeader";
import SectionCard from "../../components/ui/SectionCard";
import EmptyState from "../../components/ui/EmptyState";

export default function CreateNews() {
  return (
    <BackofficeLayout
      title="Nova noticia"
      subtitle="Espaco reservado para criacao editorial."
      searchPlaceholder="Pesquisar no modulo de noticias"
    >
      <div className="space-y-6">
        <PageHeader
          eyebrow="Editorial"
          title="Criar noticia"
          //description="A pagina ficou pronta para receber um formulario real sem voltar a mexer no layout estrutural."
          actions={[
            <Link
              key="back"
              href={route("backoffice.news")}
              className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-950"
            >
              Voltar a noticias
            </Link>,
          ]}
        />

        <SectionCard title="Formulario" subtitle="Placeholder preparado para evolucao.">
          <EmptyState
            compact
            title="Formulario de noticia ainda por ligar."
            description="Mantive a integracao visual pronta para que a equipa possa evoluir este modulo sem duplicar estrutura."
          />
        </SectionCard>
      </div>
    </BackofficeLayout>
  );
}
