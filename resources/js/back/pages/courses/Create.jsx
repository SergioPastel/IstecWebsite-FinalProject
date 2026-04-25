import { Link } from "@inertiajs/react";
import BackofficeLayout from "../../layouts/BackofficeLayout";
import PageHeader from "../../components/ui/PageHeader";
import SectionCard from "../../components/ui/SectionCard";
import CourseCreateForm from "../../components/common/CourseCreateForm";

export default function CreateCourse({ categories = [], subjects = [] }) {
  return (
   <BackofficeLayout
      title="Novo curso"
      subtitle="Criação de um novo curso."
      searchPlaceholder="Pesquisar cursos"
      actions={[
        <Link
          key="back"
          href={route("backoffice.courses")}
          className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-950"
        >
          Voltar à lista de cursos
        </Link>,
      ]}
    >
      
    <SectionCard
      title="Formulário"
      subtitle="Dados principais do curso"
    >
      <CourseCreateForm categories={categories} subjects={subjects} />
    </SectionCard>
  </BackofficeLayout>
  );
}
