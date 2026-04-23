import { useState } from "react";
import { Link, router } from "@inertiajs/react";
import BackofficeLayout from "../../layouts/BackofficeLayout";
import EmptyState from "../../components/ui/EmptyState";
import PageHeader from "../../components/ui/PageHeader";
import SectionCard from "../../components/ui/SectionCard";
import StatusBadge from "../../components/ui/StatusBadge";

export default function CoursesIndexBack({ courses }) {
  const rows = courses?.data ?? [];

  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  function openDeleteModal(id) {
    setSelectedId(id);
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
    setSelectedId(null);
  }

  function confirmDelete() {
    router.delete(route("courses.destroy", { course: selectedId }), {
      preserveScroll: true,
      onSuccess: () => {
        closeModal();
        router.visit(route("backoffice.courses"));
      },
    });
  }

  return (
    <BackofficeLayout
      title="Cursos"
      subtitle="Organize a oferta formativa e prepare a área para futuras operacões editoriais."
      searchPlaceholder="Pesquisar cursos"
    >
      <div className="space-y-6">
        <PageHeader
          eyebrow="Cursos"
          title="Gestao de cursos"
          //description="A estrutura abaixo reaproveita a stack atual e deixa a pagina pronta para crescer com filtros, formularios e detalhe editorial."
          actions={[
            <Link
              key="create"
              href={route("courses.create")}
              className="inline-flex items-center justify-center rounded-2xl bg-[var(--color-brand-primary)] px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_32px_rgba(12,115,183,0.28)] transition hover:bg-[var(--color-brand-secondary)]"
            >
              Novo curso
            </Link>,
          ]}
        />

        <SectionCard
          title="Catalogo atual"
          subtitle={`${rows.length} registos disponiveis para administracao.`}
        >
          {rows.length === 0 ? (
            <EmptyState
              title="Ainda nao existem cursos registados."
              description="Quando a equipa adicionar a oferta formativa, esta vista pode evoluir para incluir filtros, estados, imagens e destaque institucional."
            />
          ) : (
            <div className="grid gap-4 xl:grid-cols-2">
              {rows.map((course) => (
                <article
                  key={course.id}
                  className="rounded-[28px] border border-slate-200 bg-slate-50/80 p-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-semibold text-slate-950">
                        {course.title?.pt ?? course.title}
                      </h2>
                      <p className="mt-2 text-sm leading-6 text-slate-500">
                        {course.description?.pt ??
                          course.description ??
                          "Sem descricao resumida."}
                      </p>
                    </div>
                    <StatusBadge
                      label={
                        course.duration_years
                          ? `${course.duration_years} anos`
                          : "Sem duracao"
                      }
                      tone="info"
                    />
                  </div>

                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    <Link
                      href={route("courses.edit", { course: course.id })}
                      className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-950"
                    >
                      Editar
                    </Link>
                   <button
                      type="button"
                      onClick={() => openDeleteModal(course.id)}
                      className="inline-flex items-center justify-center rounded-2xl border border-rose-200 bg-rose-50 px-4 py-2.5 text-sm font-semibold text-rose-700 transition hover:bg-rose-100"
                    >
                      Eliminar
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </SectionCard>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="text-lg font-semibold text-slate-900">
              Confirmar eliminação
            </h2>

            <p className="mt-2 text-sm text-slate-600">
              Tens a certeza que queres eliminar este curso? Esta ação não pode ser revertida.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={closeModal}
                className="rounded-xl border border-slate-200 px-4 py-2 text-slate-600 hover:bg-slate-100"
              >
                Cancelar
              </button>

              <button
                type="button"
                onClick={confirmDelete}
                className="rounded-xl bg-rose-600 px-4 py-2 text-white hover:bg-rose-700"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </BackofficeLayout>
  );
}