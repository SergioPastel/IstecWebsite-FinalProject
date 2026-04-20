import BackofficeLayout from "../../layouts/BackofficeLayout";
import PageHeader from "../../components/ui/PageHeader";
import SectionCard from "../../components/ui/SectionCard";
import StatusBadge from "../../components/ui/StatusBadge";

export default function SettingsIndex({ settingsGroups = [] }) {
  return (
    <BackofficeLayout
      title="Definicoes"
      //subtitle="Estrutura inicial para gerir configuracoes institucionais, notificacoes e preferencias operacionais."
      searchPlaceholder="Pesquisar definicoes"
    >
      <div className="space-y-6">
        <PageHeader
          eyebrow="Configuration"
          title="Preferencias do backoffice"
          //description="Pagina base preparada para crescimento modular sem depender ainda do backend final."
        />

        <div className="grid gap-6 xl:grid-cols-2">
          {settingsGroups.map((group) => (
            <SectionCard
              key={group.id}
              title={group.title}
              subtitle={group.description}
            >
              <div className="space-y-4">
                {group.items.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-4"
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
      </div>
    </BackofficeLayout>
  );
}
