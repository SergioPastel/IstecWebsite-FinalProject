import BackofficeLayout from "../../layouts/BackofficeLayout";
import PageHeader from "../../components/ui/PageHeader";
import SectionCard from "../../components/ui/SectionCard";
import StatusBadge from "../../components/ui/StatusBadge";
import EmptyState from "../../components/ui/EmptyState";
import { filterCollectionByQuery } from "../../utils/search";

export default function SettingsIndex({ settingsGroups = [] }) {
  return (
    <BackofficeLayout
      title="Definicoes"
      searchPlaceholder="Pesquisar definicoes"
    >
      {({ searchQuery }) => {
        const filteredGroups = settingsGroups
          .map((group) => ({
            ...group,
            items: filterCollectionByQuery(group.items, searchQuery, (item) => [
              group.title,
              group.description,
              item.label,
              item.helpText,
              item.value,
            ]),
          }))
          .filter((group) => group.items.length > 0);

        return <div className="space-y-6">
        <PageHeader
          eyebrow="Configuration"
          title="Preferencias do backoffice"
        />

        {filteredGroups.length === 0 ? (
          <SectionCard title="Definicoes">
            <EmptyState
              compact
              title="Nenhuma definicao corresponde a esta pesquisa."
              description="A pesquisa funciona por grupo, etiqueta, ajuda e valor."
            />
          </SectionCard>
        ) : (
          <div className="grid gap-6 xl:grid-cols-2">
            {filteredGroups.map((group) => (
              <SectionCard
                key={group.id}
                title={group.title}
                subtitle={group.description}
              >
                <div className="space-y-4">
                  {group.items.map((item) => (
                    <div
                      key={item.label}
                      className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-4 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div>
                        <p className="font-medium text-slate-900">{item.label}</p>
                        <p className="mt-1 text-sm text-slate-500">
                          {item.helpText}
                        </p>
                      </div>
                      <StatusBadge
                        label={item.value}
                        tone={item.enabled ? "success" : "neutral"}
                      />
                    </div>
                  ))}
                </div>
              </SectionCard>
            ))}
          </div>
        )}
      </div>;
      }}
    </BackofficeLayout>
  );
}
