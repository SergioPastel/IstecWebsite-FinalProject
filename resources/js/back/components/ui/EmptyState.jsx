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
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[var(--color-brand-primary)] shadow-sm">
        {icon ?? (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="h-6 w-6"
          >
            <path d="M12 7v10" />
            <path d="M7 12h10" />
          </svg>
        )}
      </div>
      <h3 className="mt-4 text-lg font-semibold text-[var(--color-brand-black)]">{title}</h3>
      <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-500">
        {description}
      </p>
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}
