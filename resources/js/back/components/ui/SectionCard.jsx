export default function SectionCard({ title, subtitle, action, children }) {
  return (
    <section className="rounded-[28px] border border-[var(--color-brand-border)] bg-white p-6 shadow-sm sm:p-7">
      {(title || subtitle || action) ? (
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            {title ? (
              <h2 className="text-xl font-semibold tracking-tight text-[var(--color-brand-black)]">
                {title}
              </h2>
            ) : null}
            {subtitle ? (
              <p className="mt-2 text-sm leading-6 text-slate-500">{subtitle}</p>
            ) : null}
          </div>
          {action ? <div className="shrink-0">{action}</div> : null}
        </div>
      ) : null}

      {children}
    </section>
  );
}
