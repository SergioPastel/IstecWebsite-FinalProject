export default function StatCard({ label, value, trend, accent = "primary" }) {
  const accents = {
    primary:
      "from-[var(--color-brand-primary)] via-[var(--color-brand-primary)] to-[var(--color-brand-black)] text-white shadow-[0_18px_48px_rgba(12,115,183,0.25)]",
    light:
      "border border-[var(--color-brand-border)] bg-white text-[var(--color-brand-black)] shadow-sm",
    soft:
      "border border-[var(--color-brand-border)] bg-[var(--color-brand-surface)] text-[var(--color-brand-black)] shadow-sm",
  };

  return (
    <article
      className={`rounded-[28px] p-6 ${accents[accent] ?? accents.light} ${
        accent === "primary" ? "bg-gradient-to-br" : ""
      }`}
    >
      <p
        className={`text-sm font-medium ${
          accent === "primary" ? "text-[rgba(255,255,255,0.82)]" : "text-slate-500"
        }`}
      >
        {label}
      </p>
      <div className="mt-4 flex items-end justify-between gap-4">
        <p className="text-4xl font-semibold tracking-tight">{value}</p>
        {trend ? (
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              accent === "primary"
                ? "bg-white/15 text-sky-100"
                : "bg-[var(--color-brand-surface-strong)] text-[var(--color-brand-primary)]"
            }`}
          >
            {trend}
          </span>
        ) : null}
      </div>
    </article>
  );
}
