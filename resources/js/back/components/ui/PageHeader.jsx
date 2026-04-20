export default function PageHeader({ eyebrow, title, description, actions }) {
  return (
    <div className="flex flex-col gap-4 rounded-[28px] border border-[var(--color-brand-border)] bg-white px-6 py-6 shadow-sm sm:px-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-3xl">
          {eyebrow ? (
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-brand-primary)]">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[var(--color-brand-black)]">
            {title}
          </h1>
          {description ? (
            <p className="mt-3 text-sm leading-7 text-slate-500">{description}</p>
          ) : null}
        </div>

        {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
      </div>
    </div>
  );
}
