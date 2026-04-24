import logo from "../assets/_logo_branco.png";
import { Link, usePage } from "@inertiajs/react";

const navigationItems = [
  {
    label: "Dashboard",
    routeName: "dashboard",
    href: () => route("dashboard"),
    icon: DashboardIcon,
  },
  {
    label: "Cursos",
    routeName: "backoffice.courses",
    href: () => route("backoffice.courses"),
    icon: CoursesIcon,
  },
  {
    label: "Noticias",
    routeName: "backoffice.news",
    href: () => route("backoffice.news"),
    icon: NewsIcon,
  },
  {
    label: "Eventos",
    routeName: "backoffice.events",
    href: () => route("backoffice.events"),
    icon: EventsIcon,
  },
  {
    label: "Candidaturas",
    routeName: "backoffice.applications",
    href: () => route("backoffice.applications"),
    icon: ApplicationsIcon,
  },
  {
    label: "Contactos",
    routeName: "backoffice.contacts",
    href: () => route("backoffice.contacts"),
    icon: ContactsIcon,
  },
  {
    label: "Utilizadores",
    routeName: "backoffice.users",
    href: () => route("backoffice.users"),
    icon: UsersIcon,
  },
  {
    label: "Definicoes",
    routeName: "backoffice.settings",
    href: () => route("backoffice.settings"),
    icon: SettingsIcon,
  },
];

export default function Sidebar({ isOpen, onClose }) {
  const { props } = usePage();

  const isActive = (routeName) => {
    try {
      return route().current(routeName);
    } catch {
      return false;
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={onClose}
        className={`fixed inset-0 z-30 bg-slate-950/45 transition md:hidden ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-label="Fechar menu"
      />

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col overflow-y-auto border-r border-white/10 bg-[#0C73B7] text-slate-100 transition-transform duration-300 md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="border-b border-white/10 px-6 py-6">
          <img src={logo} alt="ISTEC Porto" />

          <h1 className="mt-3 text-2xl font-semibold tracking-tight text-white">
            Backoffice
          </h1>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            Gestao institucional de cursos, conteudos e operacoes internas.
          </p>
        </div>

        <nav className="flex-1 px-4 py-6">
          <ul className="space-y-2">
            {navigationItems.map((item) => {
              const active = isActive(item.routeName);
              const Icon = item.icon;

              return (
                <li key={item.routeName}>
                  <Link
                    href={item.href()}
                    onClick={onClose}
                    className={`group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                      active
                        ? "bg-[rgba(1, 164, 240, 0.18)] text-white shadow-[inset_0_0_0_1px_rgba(1, 164, 240, 0.45)]"
                        : "text-slate-300 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <span
                      className={`flex h-10 w-10 items-center justify-center rounded-2xl transition ${
                        active
                          ? "bg-[rgba(1, 164, 240, 0.18)] text-[var(--color-brand-secondary)]"
                          : "bg-white/5 text-slate-300 group-hover:bg-white/10"
                      }`}
                    >
                      <Icon />
                    </span>
                    <span className="flex-1">{item.label}</span>
                    {active ? (
                      <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-brand-secondary)]" />
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="border-t border-white/10 px-4 py-4">
          <div className="mb-4 rounded-2xl bg-white/5 px-4 py-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
              Sessao atual
            </p>
            <p className="mt-2 text-sm font-semibold text-white">
              {props.user?.name ?? "Administrador"}
            </p>
            <p className="mt-1 text-xs text-slate-400">
              {props.user?.email ?? "admin@istec-porto.pt"}
            </p>
          </div>

          <Link
            href={route("logout")}
            method="post"
            as="button"
            className="flex w-full items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-slate-100 transition hover:bg-white/10"
          >
            Terminar sessao
          </Link>
        </div>
      </aside>
    </>
  );
}

function IconShell({ children }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-5 w-5"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

function DashboardIcon() {
  return (
    <IconShell>
      <path d="M4 13.5h6.5V20H4z" />
      <path d="M13.5 4H20v7.5h-6.5z" />
      <path d="M13.5 13.5H20V20h-6.5z" />
      <path d="M4 4h6.5v5.5H4z" />
    </IconShell>
  );
}

function CoursesIcon() {
  return (
    <IconShell>
      <path d="M4 6.5 12 3l8 3.5-8 3.5-8-3.5Z" />
      <path d="M6 10.5v5.8c0 1.1 2.7 2.7 6 2.7s6-1.6 6-2.7v-5.8" />
    </IconShell>
  );
}

function NewsIcon() {
  return (
    <IconShell>
      <path d="M5 6.5A2.5 2.5 0 0 1 7.5 4H18v13a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V6.5Z" />
      <path d="M8.5 8.5h6" />
      <path d="M8.5 12h6" />
      <path d="M8.5 15.5h4" />
    </IconShell>
  );
}

function EventsIcon() {
  return (
    <IconShell>
      <path d="M7 4v3" />
      <path d="M17 4v3" />
      <rect x="4" y="6.5" width="16" height="13.5" rx="2.5" />
      <path d="M4 10.5h16" />
      <path d="M9 14h2v2H9z" />
      <path d="M13 14h2v2h-2z" />
    </IconShell>
  );
}

function ApplicationsIcon() {
  return (
    <IconShell>
      <path d="M7 5h10" />
      <path d="M9 3.5h6v3H9z" />
      <rect x="5" y="6" width="14" height="15" rx="2.5" />
      <path d="m8.5 12 2 2 5-5" />
    </IconShell>
  );
}

function ContactsIcon() {
  return (
    <IconShell>
      <path d="M4 7.5A2.5 2.5 0 0 1 6.5 5h11A2.5 2.5 0 0 1 20 7.5v9a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 16.5v-9Z" />
      <path d="m5.5 8 6.5 5 6.5-5" />
    </IconShell>
  );
}

function UsersIcon() {
  return (
    <IconShell>
      <path d="M15.5 19v-1.2a3.3 3.3 0 0 0-3.3-3.3H8.8a3.3 3.3 0 0 0-3.3 3.3V19" />
      <circle cx="10.5" cy="9" r="3" />
      <path d="M17 11.5a2.5 2.5 0 1 0 0-5" />
      <path d="M19 19v-1a3 3 0 0 0-2.2-2.9" />
    </IconShell>
  );
}

function SettingsIcon() {
  return (
    <IconShell>
      <path d="M12 8.5A3.5 3.5 0 1 0 12 15.5 3.5 3.5 0 0 0 12 8.5Z" />
      <path d="m19 12-.9.5a6.6 6.6 0 0 1-.3 1l.5 1a1 1 0 0 1-.2 1.2l-1 1a1 1 0 0 1-1.2.2l-1-.5a6.6 6.6 0 0 1-1 .3L12 19l-1.5-.2a6.6 6.6 0 0 1-1-.3l-1 .5a1 1 0 0 1-1.2-.2l-1-1a1 1 0 0 1-.2-1.2l.5-1a6.6 6.6 0 0 1-.3-1L5 12l.2-1.5a6.6 6.6 0 0 1 .3-1l-.5-1A1 1 0 0 1 5.2 7.3l1-1a1 1 0 0 1 1.2-.2l1 .5a6.6 6.6 0 0 1 1-.3L12 5l1.5.2a6.6 6.6 0 0 1 1 .3l1-.5a1 1 0 0 1 1.2.2l1 1a1 1 0 0 1 .2 1.2l-.5 1a6.6 6.6 0 0 1 .3 1Z" />
    </IconShell>
  );
}
