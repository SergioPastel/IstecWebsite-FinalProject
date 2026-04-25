import { Link } from "@inertiajs/react";
import BackofficeLayout from "../../layouts/BackofficeLayout";
import PageHeader from "../../components/ui/PageHeader";
import SectionCard from "../../components/ui/SectionCard";
import NewsCreateForm from "../../components/common/NewsCreateForm";


export default function EditNews({ news }) {
  const currentNews = news?.data ?? news ?? {};

  return (
    <BackofficeLayout
      title="Editar notícia"
      subtitle="Atualização dos dados da notícia"
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

        <SectionCard
          title="Formulário"
          subtitle="Edite os dados principais da notícia"
        >
          <NewsCreateForm
            news={currentNews}
            isEdit={true}
          />
        </SectionCard>
      
    </BackofficeLayout>
  );
}
