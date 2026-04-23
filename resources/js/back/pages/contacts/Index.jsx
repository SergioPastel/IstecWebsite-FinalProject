import BackofficeLayout from "../../layouts/BackofficeLayout";
import PageHeader from "../../components/ui/PageHeader";
import SectionCard from "../../components/ui/SectionCard";
import StatusBadge from "../../components/ui/StatusBadge";
import EmptyState from "../../components/ui/EmptyState";

export default function ContactsIndex({ contacts = [] }) {
  return (
    <BackofficeLayout
      title="Contactos"
      subtitle="Centralize mensagens recebidas e prepare o fluxo de resposta institucional."
      searchPlaceholder="Pesquisar mensagens"
    >
      <div className="space-y-6">
        <PageHeader
          eyebrow="Inbox"
          title="Mensagens recebidas"
          //description="Area preparada para evoluir com filtros, detalhe da mensagem, atribuicao interna e marcacao de resolucao."
        />

        <SectionCard
          title="Ultimos contactos"
          //subtitle="Reaproveita a mesma base visual de tabelas e badges usada nas restantes areas administrativas."
        >
          {contacts.length === 0 ? (
            <EmptyState
              compact
              title="Nao existem mensagens por mostrar."
              description="Quando o backend estiver ligado a este fluxo, os contactos recebidos vao aparecer aqui com estado e prioridade."
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="border-b border-slate-200 text-slate-500">
                  <tr>
                    <th className="px-4 py-3 font-medium">Remetente</th>
                    <th className="px-4 py-3 font-medium">Assunto</th>
                    <th className="px-4 py-3 font-medium">Estado</th>
                    <th className="px-4 py-3 font-medium">Recebido em</th>
                    <th className="px-4 py-3 font-medium">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map((contact) => (
                    <tr
                      key={contact.id}
                      className="border-b border-slate-100 last:border-b-0"
                    >
                      <td className="px-4 py-4">
                        <p className="font-medium text-slate-900">
                          {contact.name ?? "Contacto sem nome"}
                        </p>
                        <p className="text-slate-500">{contact.email}</p>
                      </td>
                      <td className="px-4 py-4 text-slate-600">
                        {contact.subject ?? "Mensagem geral"}
                      </td>
                      <td className="px-4 py-4">
                        <StatusBadge
                          label={contact.status ?? "Novo"}
                          tone={contact.status === "Respondido" ? "success" : "info"}
                        />
                      </td>
                      <td className="px-4 py-4 text-slate-500">
                        {formatDate(contact.created_at)}
                      </td>
                      <td className="px-4 py-4">
                        <Link
                          href={route("backoffice.contacts.show", {
                            contact: contact.id,
                          })}
                          className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-950"
                        >
                          Ver detalhe
                        </Link>
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
