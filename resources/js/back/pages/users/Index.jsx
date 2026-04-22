import { Inertia } from "@inertiajs/inertia";
import BackofficeLayout from "../../layouts/BackofficeLayout";
import PageHeader from "../../components/ui/PageHeader";
import SectionCard from "../../components/ui/SectionCard";
import StatusBadge from "../../components/ui/StatusBadge";
import EmptyState from "../../components/ui/EmptyState";
import { filterCollectionByQuery } from "../../utils/search";

export default function UsersIndex({ users = [] }) {
  function handleDelete(userId) {
    if (confirm("Tem certeza que deseja eliminar este utilizador?")) {
      Inertia.delete(route("backoffice.users.destroy", { user: userId }));
    }
  }

  return (
    <BackofficeLayout
      title="Utilizadores"
      subtitle="Gestao base da equipa administrativa, perfis e niveis de acesso."
      searchPlaceholder="Pesquisar utilizadores"
    >
      {({ searchQuery }) => {
        const filteredUsers = filterCollectionByQuery(users, searchQuery, (user) => [
          user.name,
          user.email,
          user.deleted_at ? "eliminado" : "ativo",
        ]);

        return <div className="space-y-6">
        <PageHeader
          eyebrow="Team"
          title="Acessos e perfis"
          description="Base visual para uma futura gestao de permissoes, convites e auditoria de acesso."
        />

        <SectionCard title="Equipa administrativa">
          {users.length === 0 ? (
            <EmptyState
              compact
              title="Ainda nao existem utilizadores."
              description="Quando houver mais contas administrativas, elas vao aparecer aqui."
            />
          ) : filteredUsers.length === 0 ? (
            <EmptyState
              compact
              title="Nenhum utilizador corresponde a esta pesquisa."
              description="A pesquisa funciona por nome, email e estado."
            />
          ) : (
            <div className="grid gap-4 lg:grid-cols-2">
              {filteredUsers.map((user) => (
                <article
                  key={user.id}
                  className="rounded-[24px] border border-slate-200 bg-slate-50/75 p-5"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                    <div className="min-w-0 flex-1">
                      <h3 className="text-lg font-semibold text-slate-950">
                        {user.name}
                      </h3>
                      <p className="mt-1 break-all text-sm text-slate-500">{user.email}</p>
                    </div>
                    <div className="flex items-center gap-3 self-start">
                      <StatusBadge
                        label={user.deleted_at ? "Eliminado" : "Ativo"}
                        tone={user.deleted_at ? "danger" : "success"}
                      />
                      <button
                        onClick={() => !user.deleted_at && handleDelete(user.id)}
                        disabled={!!user.deleted_at}
                        className={`text-sm ${
                          user.deleted_at
                            ? "cursor-not-allowed text-gray-400"
                            : "text-red-600 hover:text-red-800"
                        }`}
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </SectionCard>
      </div>;
      }}
    </BackofficeLayout>
  );
}
