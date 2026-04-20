import { Link } from "@inertiajs/react";
import BackofficeLayout from "../../layouts/BackofficeLayout";
import PageHeader from "../../components/ui/PageHeader";
import SectionCard from "../../components/ui/SectionCard";
import EmptyState from "../../components/ui/EmptyState";

export default function EditCourse({ course }) {
  return (
    <BackofficeLayout
      title="Editar curso"
      subtitle="Espaco preparado para edicao sem quebrar a navegacao do novo backoffice."
      searchPlaceholder="Pesquisar no modulo de cursos"
    >
      <div className="space-y-6">
        <PageHeader
          eyebrow="Academics"
          title={course?.title?.pt ?? course?.title ?? "Curso"}
          description={`Edicao do registo ${course?.id ?? ""}.`}
          actions={[
            <Link
              key="back"
              href={route("backoffice.courses")}
              className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-950"
            >
              Voltar a cursos
            </Link>,
          ]}
        />

        <SectionCard title="Formulario" subtitle="Placeholder preparado para evolucao.">
          <EmptyState
            compact
            title="Edicao detalhada ainda por concluir."
            description="A pagina ja esta alinhada com o novo sistema visual e pronta para receber os campos reais do curso."
          />
        </SectionCard>
      </div>
    </BackofficeLayout>
  );
}
