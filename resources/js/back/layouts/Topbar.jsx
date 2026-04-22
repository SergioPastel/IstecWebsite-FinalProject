export default function Topbar({
  title,
  subtitle,
  onMenuClick,
  onToggleSidebar,
  isSidebarCollapsed,
  searchPlaceholder = "Pesquisar no backoffice",
  searchQuery,
  onSearchChange,
  user,
}) {
  const initials = getInitials(user?.name);

  return (
    <header className="sticky top-0 z-20 border-b border-[var(--color-brand-border)]/80 bg-white/90 backdrop-blur">
      <div className="flex flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-start gap-3">
            <button
              type="button"
              onClick={onMenuClick}
              className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-950 md:hidden"
              aria-label="Abrir menu"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-5 w-5"
              >
                <path d="M4 7h16" />
                <path d="M4 12h16" />
                <path d="M4 17h16" />
              </svg>
            </button>

            <button
              type="button"
              onClick={onToggleSidebar}
              className="hidden h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-950 md:inline-flex"
              aria-label={isSidebarCollapsed ? "Expandir sidebar" : "Recolher sidebar"}
              title={isSidebarCollapsed ? "Expandir sidebar" : "Recolher sidebar"}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-5 w-5"
              >
                {isSidebarCollapsed ? (
                  <path d="m9 6 6 6-6 6" />
                ) : (
                  <path d="m15 6-6 6 6 6" />
                )}
              </svg>
            </button>

            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-brand-primary)]">
                Painel administrativo
              </p>
              <h2 className="backoffice-heading mt-1 text-2xl font-semibold tracking-tight text-[var(--color-brand-black)] sm:text-3xl">
                {title}
              </h2>
              {subtitle ? (
                <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
                  {subtitle}
                </p>
              ) : null}
            </div>
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-slate-300 hover:text-slate-950"
              aria-label="Notificacoes"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-5 w-5"
              >
                <path d="M15 17h5l-1.4-1.4a2 2 0 0 1-.6-1.4v-3.2a6 6 0 1 0-12 0v3.2a2 2 0 0 1-.6 1.4L4 17h5" />
                <path d="M10 17a2 2 0 0 0 4 0" />
              </svg>
            </button>

            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2 shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--color-brand-surface-strong)] text-sm font-semibold text-[var(--color-brand-primary)]">
                {initials}
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-slate-900">
                  {user?.name ?? "Administrador"}
                </p>
                <p className="text-xs text-slate-500">
                  {user?.email ?? "admin@istec-porto.pt"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <label className="relative block w-full md:max-w-xl">
            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-5 w-5"
              >
                <circle cx="11" cy="11" r="6" />
                <path d="m20 20-4.35-4.35" />
              </svg>
            </span>
            <input
              type="search"
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={(event) => onSearchChange(event.target.value)}
              className="w-full rounded-2xl border border-[var(--color-brand-border)] bg-white py-3 pl-12 pr-4 text-sm text-slate-700 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-[var(--color-brand-secondary)] focus:ring-4 focus:ring-[rgba(45,167,223,0.18)]"
            />
          </label>

          <div className="flex items-center justify-between gap-3 md:hidden">
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 shadow-sm"
              aria-label="Notificacoes"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-5 w-5"
              >
                <path d="M15 17h5l-1.4-1.4a2 2 0 0 1-.6-1.4v-3.2a6 6 0 1 0-12 0v3.2a2 2 0 0 1-.6 1.4L4 17h5" />
                <path d="M10 17a2 2 0 0 0 4 0" />
              </svg>
            </button>

            <div className="flex min-w-0 items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--color-brand-surface-strong)] text-sm font-semibold text-[var(--color-brand-primary)]">
                {initials}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-900">
                  {user?.name ?? "Administrador"}
                </p>
                <p className="truncate text-xs text-slate-500">
                  {user?.email ?? "admin@istec-porto.pt"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function getInitials(name = "") {
  const parts = name.trim().split(/\s+/).filter(Boolean).slice(0, 2);

  if (parts.length === 0) {
    return "AD";
  }

  return parts.map((part) => part[0]?.toUpperCase() ?? "").join("");
}
