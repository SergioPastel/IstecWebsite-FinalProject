import { Link } from "@inertiajs/react";
import BackofficeLayout from "../../layouts/BackofficeLayout";
import SectionCard from "../../components/ui/SectionCard";
import NewsCreateForm from "../../components/common/NewsCreateForm";

export default function CreateNews({ categories = [] }) {
  return (
    <BackofficeLayout
      title="Nova notícia"
      subtitle="Criação de uma nova notícia"
      searchPlaceholder="Pesquisar notícias"
      actions={[
        <Link
          key="back"
          href={route("backoffice.news")}
          className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-950"
        >
          Voltar à lista de notícias
        </Link>,
      ]}
    >
      <SectionCard title="Formulário" subtitle="Dados principais da notícia">
        <NewsCreateForm categories={categories} />
      </SectionCard>
    </BackofficeLayout>
  );
}
