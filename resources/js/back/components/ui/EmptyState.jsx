export default function EmptyState({
  title,
  description,
  action,
  icon,
  compact = false,
}) {
  return (
    <div
      className={`rounded-[28px] border border-dashed border-[var(--color-brand-border)] bg-[var(--color-brand-surface)] text-center ${
        compact ? "px-5 py-8" : "px-6 py-12"
      }`}
    >
      <h3 className="mt-4 text-lg font-semibold text-[var(--color-brand-black)]">{title}</h3>
      <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-500">
        {description}
      </p>
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}
