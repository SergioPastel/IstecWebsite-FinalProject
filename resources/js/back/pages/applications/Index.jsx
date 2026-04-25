import { Link } from "@inertiajs/react";
import BackofficeLayout from "../../layouts/BackofficeLayout";
import PageHeader from "../../components/ui/PageHeader";
import SectionCard from "../../components/ui/SectionCard";
import StatusBadge from "../../components/ui/StatusBadge";
import EmptyState from "../../components/ui/EmptyState";
import { filterCollectionByQuery } from "../../utils/search";

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
      {({ searchQuery }) => {
        const filteredApplications = filterCollectionByQuery(
          applications,
          searchQuery,
          (application) => [
            application.full_name,
            application.email,
            application.course?.title,
            formatDate(application.created_at),
          ],
        );

        return <div className="space-y-6">
        <PageHeader
          eyebrow="Admissions"
          title="Pipeline de candidaturas"
        />

        <SectionCard
          title="Submissões recentes"
          subtitle={`${filteredApplications.length} de ${applications.length} registo(s) visiveis na triagem.`}
        >
          {applications.length === 0 ? (
            <EmptyState
              compact
              title="Ainda não existem candidaturas."
              description="Aqui serão listadas as candidaturas, incluindo o estado, o curso associado e a data de submissão."
            />
          ) : filteredApplications.length === 0 ? (
            <EmptyState
              compact
              title="Nenhuma candidatura corresponde a esta pesquisa."
              description="A pesquisa funciona por candidato, email, curso, estado e data."
            />
          ) : (
            <div className="space-y-4">
              <div className="grid gap-4 lg:hidden">
                {filteredApplications.map((application) => (
                  <article
                    key={application.id}
                    className="rounded-[24px] border border-slate-200 bg-slate-50/70 p-5"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="font-medium text-slate-900">
                          {application.full_name ?? "Candidatura sem nome"}
                        </p>
                        <p className="mt-1 text-sm text-slate-500">{application.email}</p>
                      </div>
                    </div>
                    <div className="mt-4 grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
                      <p>
                        Curso:{" "}
                        {application.course?.title?.pt ??
                          application.course?.title ??
                          "Curso por atribuir"}
                      </p>
                      <p>Recebida em: {formatDate(application.created_at)}</p>
                    </div>
                  </article>
                ))}
              </div>

              <div className="hidden overflow-x-auto lg:block">
                <table className="min-w-full text-left text-sm">
                  <thead className="border-b border-slate-200 text-slate-500">
                    <tr>
                      <th className="px-4 py-3 font-medium">Candidato</th>
                      <th className="px-4 py-3 font-medium">Curso</th>
                      <th className="px-4 py-3 font-medium">Recebida em</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredApplications.map((application) => (
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
                        
                        <td className="px-4 py-4 text-slate-500">
                          {formatDate(application.created_at)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </SectionCard>
      </div>;
      }}
    </BackofficeLayout>
  );
}



function formatDate(value) {
  if (!value) {
    return "Sem data";
  }

  return new Date(value).toLocaleDateString("pt-PT", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
