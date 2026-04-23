import { Link } from "@inertiajs/react";
import BackofficeLayout from "../../layouts/BackofficeLayout";
import PageHeader from "../../components/ui/PageHeader";
import SectionCard from "../../components/ui/SectionCard";
import StatusBadge from "../../components/ui/StatusBadge";

export default function ContactShow({ contact }) {
  return (
    <BackofficeLayout
      title="Detalhe da mensagem"
      subtitle="Consulta da mensagem recebida através do formulário de contacto."
      searchPlaceholder="Pesquisar mensagens"
    >
      <div className="space-y-6">
        <PageHeader
          eyebrow="Contactos"
          title={contact?.name ?? "Mensagem"}
          description="Consulta os dados enviados pelo utilizador."
          actions={[
            <Link
              key="back"
              href={route("admin.contacts.index")}
              className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-950"
            >
              Voltar à lista de mensagens
            </Link>,
          ]}
        />

        <SectionCard title="Resumo" subtitle="Informação principal da mensagem">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-sm text-slate-500">Nome</p>
              <p className="font-medium text-slate-900">{contact?.name ?? "—"}</p>
            </div>

            <div>
              <p className="text-sm text-slate-500">Email</p>
              <p className="font-medium text-slate-900">{contact?.email ?? "—"}</p>
            </div>

            <div>
              <p className="text-sm text-slate-500">Assunto</p>
              <p className="font-medium text-slate-900">{contact?.subject ?? "Mensagem geral"}</p>
            </div>

            <div>
              <p className="text-sm text-slate-500">Estado</p>
              <StatusBadge
                label={contact?.status ?? "Novo"}
                tone={contact?.status === "Respondido" ? "success" : "info"}
              />
            </div>

            <div className="md:col-span-2">
              <p className="text-sm text-slate-500">Mensagem</p>
              <p className="whitespace-pre-line font-medium text-slate-900">
                {contact?.message ?? "Sem conteúdo."}
              </p>
            </div>
          </div>
        </SectionCard>
      </div>
    </BackofficeLayout>
  );
}