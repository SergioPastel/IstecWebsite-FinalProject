import BackofficeLayout from "../../layouts/BackofficeLayout";
import PageHeader from "../../components/ui/PageHeader";
import SectionCard from "../../components/ui/SectionCard";
import StatusBadge from "../../components/ui/StatusBadge";

export default function UsersIndex({ users = [] }) {
  return (
    <BackofficeLayout
      title="Utilizadores"
      subtitle="Gestao base da equipa administrativa, perfis e niveis de acesso."
      searchPlaceholder="Pesquisar utilizadores"
    >
      <div className="space-y-6">
        <PageHeader
          eyebrow="Team"
          title="Acessos e perfis"
          description="Base visual para uma futura gestao de permissoes, convites e auditoria de acesso."
        />

        <SectionCard
          title="Equipa administrativa"
          //subtitle="Os dados podem ser substituidos depois por utilizadores reais sem alterar a estrutura visual."
        >
          <div className="grid gap-4 lg:grid-cols-2">
            {users.map((user) => (
              <article
                key={user.id}
                className="rounded-[24px] border border-slate-200 bg-slate-50/75 p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-950">
                      {user.name}
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">{user.email}</p>
                  </div>
                  <StatusBadge
                    label={user.status}
                    tone={user.status === "Ativo" ? "success" : "warning"}
                  />
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {user.roles.map((role) => (
                    <StatusBadge key={role} label={role} tone="info" />
                  ))}
                </div>
              </article>
            ))}
          </div>
        </SectionCard>
      </div>
    </BackofficeLayout>
  );
}
