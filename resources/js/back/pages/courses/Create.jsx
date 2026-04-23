import { Link } from "@inertiajs/react";
import BackofficeLayout from "../../layouts/BackofficeLayout";
import PageHeader from "../../components/ui/PageHeader";
import SectionCard from "../../components/ui/SectionCard";
import EmptyState from "../../components/ui/EmptyState";
import CourseCreateForm from "../../components/common/CourseCreateForm";

export default function CreateCourse({categories = []}) {
  return (
    <BackofficeLayout
      title="Novo curso"
      subtitle="Criação de um novo curso."
      searchPlaceholder="Pesquisar cursos"
    >
     <div className="space-y-6">
        <PageHeader
          eyebrow="Novo Curso"
          title="Criar curso"
          description="Preenche os campos abaixo para adicionar um novo curso."
          actions={[
            <Link
              key="back"
              href={route("backoffice.courses")}
              className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-950"
            >
              Voltar à lista de cursos
            </Link>,
          ]}
        />

        <SectionCard 
        title="Formulario" 
        subtitle="Dados principais do curso">
          <CourseCreateForm categories={categories}/>
        </SectionCard>
      </div>
    </BackofficeLayout>
  );
}
