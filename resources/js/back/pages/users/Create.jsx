import { Link } from "@inertiajs/react";
import BackofficeLayout from "../../layouts/BackofficeLayout";
import PageHeader from "../../components/ui/PageHeader";
import SectionCard from "../../components/ui/SectionCard";
import UserForm from "../../components/common/UserForm";

export default function CreateUser() {
  return (
    <BackofficeLayout
      title="Novo utilizador"
      subtitle="Criação de um novo utilizador."
      searchPlaceholder="Pesquisar utilizadores"
    >
      <div className="space-y-6">
        <PageHeader
          eyebrow="Utilizadores"
          title="Criar utilizador"
          description="Preenche o formulário abaixo para criar um novo utilizador."
          actions={[
            <Link
              key="back"
              href={route("backoffice.users")}
              className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-950"
            >
              Voltar à lista de utilizadores
            </Link>,
          ]}
        />

        <SectionCard
          title="Formulário"
          subtitle="Dados principais do utilizador"
        >
          <UserForm />
        </SectionCard>
      </div>
    </BackofficeLayout>
  );
}