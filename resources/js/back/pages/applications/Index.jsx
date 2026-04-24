import { Link } from "@inertiajs/react";
import BackofficeLayout from "../../layouts/BackofficeLayout";
import PageHeader from "../../components/ui/PageHeader";
import SectionCard from "../../components/ui/SectionCard";
import StatusBadge from "../../components/ui/StatusBadge";
import EmptyState from "../../components/ui/EmptyState";

const statusToneMap = {
  pending: "warning",
  approved: "success",
  rejected: "danger",
};

export default function ApplicationsIndex({ applications = [] }) {
  return (
    <BackofficeLayout
      title="Candidaturas"
      subtitle="Acompanhe o estado das submissões e prepare a triagem operacional."
      searchPlaceholder="Pesquisar candidaturas"
    >
      <div className="space-y-6">
        <PageHeader
          eyebrow="Admissions"
          title="Pipeline de candidaturas"
          //description="Vista preparada para evoluir com filtros, bulk actions e integração com estados reais do processo."
        />

        <SectionCard
          title="Submissoes recentes"
          subtitle="Base visual pronta para integrar regras de aprovação, observações internas e detalhe por candidatura."
        >
          {applications.length === 0 ? (
            <EmptyState
              compact
              title="Ainda nao existem candidaturas."
              description="Assim que existirem entradas no sistema, esta tabela pode exibir o estado, o curso associado e a data de submissao."
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="border-b border-slate-200 text-slate-500">
                  <tr>
                    <th className="px-4 py-3 font-medium">Candidato</th>
                    <th className="px-4 py-3 font-medium">Curso</th>
                    <th className="px-4 py-3 font-medium">Recebida em</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((application) => (
                    <tr
                      key={application.id}
                      className="border-b border-slate-100 last:border-b-0"
                    >
                      <td className="px-4 py-4">
                        <p className="font-medium text-slate-900">
                          {application.full_name ?? "Candidatura sem nome"}
                        </p>
                        <p className="text-slate-500">{application.email}</p>
                      </td>
                      <td className="px-4 py-4 text-slate-600">
                        {application.course?.title?.pt ??
                          application.course?.title ??
                          "Curso por atribuir"}
                      </td>
                      {/* <td className="px-4 py-4">
                        <StatusBadge
                          label={formatStatus(application.status ?? "pending")}
                          tone={statusToneMap[application.status] ?? "warning"}
                        />
                      </td> */}
                      <td className="px-4 py-4 text-slate-500">
                        {formatDate(application.created_at)}
                      </td>
                      <td className="px-4 py-4">
                        {/* <Link
                          href={route("admin.applications", {
                            application: application.id,
                          })}
                          className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-950"
                        >
                          Ver detalhe
                        </Link> */}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </SectionCard>
      </div>
    </BackofficeLayout>
  );
}

function formatStatus(status) {
  const labels = {
    pending: "Pendente",
    approved: "Aprovada",
    rejected: "Rejeitada",
  };

  return labels[status] ?? status;
}

function formatDate(value) {
  if (!value) {
    return "Agora mesmo";
  }

  return new Date(value).toLocaleDateString("pt-PT", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
