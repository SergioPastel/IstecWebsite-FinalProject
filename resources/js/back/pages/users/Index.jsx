import { Link, router } from "@inertiajs/react";
import { useState } from "react";
import BackofficeLayout from "../../layouts/BackofficeLayout";
import PageHeader from "../../components/ui/PageHeader";
import SectionCard from "../../components/ui/SectionCard";
import StatusBadge from "../../components/ui/StatusBadge";

export default function UsersIndex({ users = [] }) {
    const [userToDelete, setUserToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  function confirmDelete(user) {
    setUserToDelete(user);
  }

  function cancelDelete() {
    setUserToDelete(null);
  }

  function handleDelete() {
    if (!userToDelete) return;

    setIsDeleting(true);

    router.delete(route("backoffice.users.destroy", userToDelete.id), {
      preserveScroll: true,
      onSuccess: () => {
        setUserToDelete(null);
      },
      onError: (errors) => {
        console.log(errors);
      },
      onFinish: () => {
        setIsDeleting(false);
      },
    });
  }

  return (
    <>
    <BackofficeLayout
      title="Utilizadores"
      subtitle="Gestao base da equipa administrativa, perfis e niveis de acesso."
      searchPlaceholder="Pesquisar utilizadores"
    >
      <div className="space-y-6">
        <PageHeader
          eyebrow="Utilizadores"
          title="Acessos e perfis"
          description="Base visual para uma futura gestao de permissoes, convites e auditoria de acesso."
          actions={[
            <Link
              key="create"
              href={route("backoffice.users.create")}
              className="inline-flex items-center justify-center rounded-2xl bg-[var(--color-brand-primary)] px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_32px_rgba(12,115,183,0.28)] transition hover:bg-[var(--color-brand-secondary)]"
            >
              Novo utilizador
            </Link>,
          ]}
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
                    label={user.deleted_at ? "Eliminado" : "Ativo"}
                    tone={user.deleted_at ? "danger" : "success"}
                  />

                  <button
                   onClick={() => !user.deleted_at && confirmDelete(user)}
                    disabled={!!user.deleted_at}
                    className={`ml-auto text-sm ${
                      user.deleted_at
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-red-600 hover:text-red-800"
                    }`}
                  >
                    Eliminar
                  </button>
                </div>                

                {/* <div className="mt-4 flex flex-wrap gap-2">
                  {user.roles.map((role) => (
                    <StatusBadge key={role} label={role} tone="info" />
                  ))}
                </div> */}
              </article>
            ))}
           </div>
          </SectionCard>
        </div>
      </BackofficeLayout>

      {userToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="text-lg font-bold text-slate-900">
              Confirmar eliminação
            </h2>

            <p className="mt-3 text-sm text-slate-600">
              Tem a certeza que deseja eliminar o utilizador{" "}
              <span className="font-semibold text-slate-900">
                {userToDelete.name}
              </span>
              ?
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={cancelDelete}
                disabled={isDeleting}
                className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Cancelar
              </button>

              <button
                type="button"
                onClick={handleDelete}
                disabled={isDeleting}
                className="rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
              >
                {isDeleting ? "A eliminar..." : "Eliminar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}