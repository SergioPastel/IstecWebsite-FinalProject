import BackofficeLayout from "../../layouts/BackofficeLayout";
import PageHeader from "../../components/ui/PageHeader";
import SectionCard from "../../components/ui/SectionCard";
import StatusBadge from "../../components/ui/StatusBadge";
import EmptyState from "../../components/ui/EmptyState";
import { Link } from "@inertiajs/react";
import { filterCollectionByQuery } from "../../utils/search";
export default function ContactsIndex({ contacts }) {

  const rows = contacts ?? [];

  return (
    <BackofficeLayout
      title="Contactos"
      subtitle="Centralize mensagens recebidas e prepare o fluxo de resposta institucional."
      searchPlaceholder="Pesquisar mensagens"
    >
      {({ searchQuery }) => {
        const filteredContacts = filterCollectionByQuery(contacts, searchQuery, (contact) => [
          contact.name,
          contact.email,
          contact.subject,
          contact.status,
          formatDate(contact.created_at),
        ]);

        return <div className="space-y-6">
        <PageHeader
          eyebrow="Inbox"
          title="Mensagens recebidas"
        />

        <SectionCard
          title="Ultimos contactos"
          subtitle={`${filteredContacts.length} de ${contacts.length} mensagem(ns) visiveis.`}
        >
          {contacts.length === 0 ? (
            <EmptyState
              compact
              title="Nao existem mensagens por mostrar."
              description="Quando o backend estiver ligado a este fluxo, os contactos recebidos vao aparecer aqui com estado e prioridade."
            />
          ) : filteredContacts.length === 0 ? (
            <EmptyState
              compact
              title="Nenhuma mensagem corresponde a esta pesquisa."
              description="A pesquisa funciona por remetente, email, assunto, estado e data."
            />
          ) : (
            <div className="space-y-4">
              <div className="grid gap-4 lg:hidden">
                {filteredContacts.map((contact) => (
                  <article
                    key={contact.id}
                    className="rounded-[24px] border border-slate-200 bg-slate-50/70 p-5"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="font-medium text-slate-900">
                          {contact.name ?? "Contacto sem nome"}
                        </p>
                        <p className="mt-1 text-sm text-slate-500">{contact.email}</p>
                      </div>                    
                    </div>
                    <div className="mt-4 grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
                      <p>Assunto: {contact.subject ?? "Mensagem geral"}</p>
                      <p>Recebido em: {formatDate(contact.created_at)}</p>
                    </div>
                  </article>
                ))}
              </div>

              <div className="hidden overflow-x-auto lg:block">
                <table className="min-w-full text-left text-sm">
                  <thead className="border-b border-slate-200 text-slate-500">
                    <tr>
                      <th className="px-4 py-3 font-medium">Remetente</th>
                      <th className="px-4 py-3 font-medium">Assunto</th>
                      <th className="px-4 py-3 font-medium">Mensagem</th>
                      <th className="px-4 py-3 font-medium">Recebido em</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredContacts.map((contact) => (
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
                          {contact.message.length > 100
                          ? `${contact.message.substring(0, 150)}...`
                          : contact.message}
                        </td>
                        <td className="px-4 py-4 text-slate-500">
                          {formatDate(contact.created_at)}
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
    return "Agora mesmo";
  }

  return new Date(value).toLocaleDateString("pt-PT", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
