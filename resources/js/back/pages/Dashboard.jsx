import { Link, router } from "@inertiajs/react";
import { useEffect } from "react";
import BackofficeLayout from "../layouts/BackofficeLayout";
import PageHeader from "../components/ui/PageHeader";
import SectionCard from "../components/ui/SectionCard";
import StatCard from "../components/ui/StatCard";
import StatusBadge from "../components/ui/StatusBadge";

const fallbackMetrics = {
  courses: 18,
  news: 12,
  events: 5,
  applications: 47,
};

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

export default function Dashboard({ analytics = {}, user }) {
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
      label: "Total de cursos",
      value: fallbackMetrics.courses,
      trend: "+2 este semestre",
      accent: "primary",
    },
    {
      label: "Noticias publicadas",
      value: fallbackMetrics.news,
      trend: `${analytics.pageviews ?? 0} pageviews`,
      accent: "light",
    },
    {
      label: "Eventos ativos",
      value: fallbackMetrics.events,
      trend: `${analytics.visitors ?? 0} visitantes`,
      accent: "soft",
    },
    {
      label: "Candidaturas recebidas",
      value: fallbackMetrics.applications,
      trend: `${analytics.course_check ?? 0} cliques em cursos`,
      accent: "light",
    },
  ];

  return (
    <BackofficeLayout
      title="Dashboard"
      subtitle="Vista geral do ecossistema digital do ISTEC Porto com foco operacional."
      searchPlaceholder="Pesquisar modulos, paginas ou conteudos"
    >
      <div className="space-y-6">
        <PageHeader
          eyebrow="Overview"
          title={`Bem-vindo${user?.name ? `, ${user.name}` : ""}`}
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
        />

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {metrics.map((metric) => (
            <StatCard key={metric.label} {...metric} />
          ))}
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.35fr_0.95fr]">
          <SectionCard
            title="Atividade recente"
            //subtitle="Resumo visual das operacoes mais relevantes do backoffice."
          >
            <div className="space-y-4">
              {recentActivity.map((item) => (
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
          </SectionCard>

          <SectionCard
            title="Ultimos contactos"
            //subtitle="Area pronta para evoluir para uma inbox operacional completa."
            action={
              <Link
                href={route("backoffice.contacts")}
                className="text-sm font-semibold text-[var(--color-brand-primary)] transition hover:text-[var(--color-brand-black)]"
              >
                Abrir inbox
              </Link>
            }
          >
            <div className="space-y-4">
              {latestContacts.map((contact) => (
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
                      tone={
                        contact.status === "Respondido" ? "success" : "info"
                      }
                    />
                  </div>
                  <p className="mt-3 text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                    {contact.receivedAt}
                  </p>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      </div>
    </BackofficeLayout>
  );
}
