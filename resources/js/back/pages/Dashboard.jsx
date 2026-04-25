import { Link, router } from "@inertiajs/react";
import { useEffect } from "react";
import BackofficeLayout from "../layouts/BackofficeLayout";
import PageHeader from "../components/ui/PageHeader";
import SectionCard from "../components/ui/SectionCard";
import StatCard from "../components/ui/StatCard";
import StatusBadge from "../components/ui/StatusBadge";
import EmptyState from "../components/ui/EmptyState";
import { filterCollectionByQuery } from "../utils/search";

const recentActivity = [
  {
    id: 1,
    title: "Novo curso em revisao editorial",
    detail: "CTeSP em Ciberseguranca aguardando validacao final.",
    status: "Em revisao",
    tone: "warning",
  },
  {
    id: 2,
    title: "Noticia institucional publicada",
    detail: "Comunicado sobre parcerias academicas atualizado.",
    status: "Publicado",
    tone: "success",
  },
  {
    id: 3,
    title: "Evento com destaque na homepage",
    detail: "Open Day promovido para a agenda principal.",
    status: "Ativo",
    tone: "info",
  },
];

const latestContacts = [
  {
    id: 1,
    name: "Mariana Costa",
    subject: "Pedido de informacao sobre licenciaturas",
    receivedAt: "Hoje, 10:14",
    status: "Novo",
  },
  {
    id: 2,
    name: "Tiago Pereira",
    subject: "Esclarecimento sobre equivalencias",
    receivedAt: "Hoje, 09:02",
    status: "Em analise",
  },
  {
    id: 3,
    name: "Rita Almeida",
    subject: "Contacto institucional para parceria",
    receivedAt: "Ontem, 17:46",
    status: "Respondido",
  },
];

export default function Dashboard({ analytics = {}, counts = {}, user }) {
  useEffect(() => {
    router.post(
      "/locale",
      { locale: "pt" },
      {
        preserveScroll: true,
      }
    );
  }, []);

  const metrics = [
    {
      label: "Visitantes",
      value: analytics.visitors ?? 0,
      trend: `${analytics.pageviews ?? 0} pageviews`,
      accent: "light",
    },
    {
      label: "Eventos ativos",
      value: counts.active_events ?? 0,
      trend: `${counts.active_events ?? 0} eventos ainda ativos`,
      accent: "light",
    },
    {
      label: "Candidaturas recebidas",
      value: counts.applications ?? 0,
      trend: `${analytics.course_check ?? 0} cliques em cursos`,
      accent: "light",
    },
    {
      label: "Contactos recebidos",
      value: counts.contacts ?? 0,
      trend: "Mensagens do inbox",
      accent: "light",
    },
  ];

  return (
    <BackofficeLayout
      title="Dashboard"
      subtitle="Vista geral do ecossistema digital do ISTEC Porto com foco operacional."
      searchPlaceholder="Pesquisar modulos, paginas ou conteudos"
      actions={[
        <Link
          key="courses"
          href={route("backoffice.courses")}
          className="inline-flex items-center justify-center rounded-2xl bg-[var(--color-brand-primary)] px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_32px_rgba(12,115,183,0.28)] transition hover:bg-[var(--color-brand-secondary)]"
        >
          Gerir cursos
        </Link>,
        <Link
          key="news"
          href={route("backoffice.news")}
          className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-950"
        >
          Ver noticias
        </Link>,
      ]}
    >
      {({ searchQuery }) => {
        const filteredMetrics = filterCollectionByQuery(metrics, searchQuery, (metric) => [
          metric.label,
          metric.trend,
          metric.value,
        ]);

        const filteredActivity = filterCollectionByQuery(recentActivity, searchQuery, (item) => [
          item.title,
          item.detail,
          item.status,
        ]);

        const filteredContacts = filterCollectionByQuery(
          latestContacts,
          searchQuery,
          (contact) => [contact.name, contact.subject, contact.receivedAt, contact.status],
        );

        const hasResults =
          filteredMetrics.length > 0 || filteredActivity.length > 0 || filteredContacts.length > 0;

        return <div className="space-y-6">

        {hasResults ? (
          <>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {filteredMetrics.map((metric) => (
                <StatCard key={metric.label} {...metric} />
              ))}
            </div>

            <div className="grid gap-6 xl:grid-cols-[1.35fr_0.95fr]">
              <SectionCard
                title="Atividade recente"
                subtitle={searchQuery ? `${filteredActivity.length} resultado(s) encontrados.` : undefined}
              >
                {filteredActivity.length === 0 ? (
                  <EmptyState
                    compact
                    title="Sem atividade correspondente."
                    description="Ajusta a pesquisa para encontrar modulos, estados ou detalhes recentes."
                  />
                ) : (
                  <div className="space-y-4">
                    {filteredActivity.map((item) => (
                      <div
                        key={item.id}
                        className="flex flex-col gap-3 rounded-[24px] border border-slate-200 bg-slate-50/75 px-5 py-5 md:flex-row md:items-center md:justify-between"
                      >
                        <div>
                          <h3 className="text-base font-semibold text-slate-950">
                            {item.title}
                          </h3>
                          <p className="mt-1 text-sm leading-6 text-slate-500">
                            {item.detail}
                          </p>
                        </div>
                        <StatusBadge label={item.status} tone={item.tone} />
                      </div>
                    ))}
                  </div>
                )}
              </SectionCard>

              <SectionCard
                title="Ultimos contactos"
                subtitle={searchQuery ? `${filteredContacts.length} resultado(s) encontrados.` : undefined}
                action={
                  <Link
                    href={route("backoffice.contacts")}
                    className="text-sm font-semibold text-[var(--color-brand-primary)] transition hover:text-[var(--color-brand-black)]"
                  >
                    Abrir inbox
                  </Link>
                }
              >
                {filteredContacts.length === 0 ? (
                  <EmptyState
                    compact
                    title="Sem contactos correspondentes."
                    description="A pesquisa pode filtrar por nome, assunto, estado ou data."
                  />
                ) : (
                  <div className="space-y-4">
                    {filteredContacts.map((contact) => (
                      <div
                        key={contact.id}
                        className="rounded-[24px] border border-slate-200 bg-white px-5 py-4"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="text-base font-semibold text-slate-950">
                              {contact.name}
                            </h3>
                            <p className="mt-1 text-sm text-slate-500">
                              {contact.subject}
                            </p>
                          </div>
                          <StatusBadge
                            label={contact.status}
                            tone={contact.status === "Respondido" ? "success" : "info"}
                          />
                        </div>
                        <p className="mt-3 text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                          {contact.receivedAt}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </SectionCard>
            </div>
          </>
        ) : (
          <SectionCard title="Pesquisa no dashboard">
            <EmptyState
              title="Sem resultados para esta pesquisa."
              description="Experimenta procurar por modulos, estados, contactos ou atividade recente."
            />
          </SectionCard>
        )}
      </div>;
      }}
    </BackofficeLayout>
  );
}
