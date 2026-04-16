const toneClasses = {
  success: "bg-[rgba(45,167,223,0.12)] text-[var(--color-brand-primary)] ring-[rgba(45,167,223,0.28)]",
  warning: "bg-[rgba(12,115,183,0.12)] text-[var(--color-brand-primary)] ring-[rgba(12,115,183,0.24)]",
  danger: "bg-rose-50 text-rose-700 ring-rose-200",
  info: "bg-[var(--color-brand-surface)] text-[var(--color-brand-primary)] ring-[var(--color-brand-border)]",
  neutral: "bg-[rgba(29,29,27,0.06)] text-[var(--color-brand-black)] ring-[rgba(29,29,27,0.12)]",
};

export default function StatusBadge({ label, tone = "neutral" }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${
        toneClasses[tone] ?? toneClasses.neutral
      }`}
    >
      {label}
    </span>
  );
}
