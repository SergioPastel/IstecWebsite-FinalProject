export default function Pagination({ links }) {
    if (!links || links.length <= 3) return null;

    return (
        <nav className="flex flex-wrap items-center justify-center gap-2 pt-6">
            {links.map((link) => {
                const isDisabled = link.url == null;
                const isActive = link.active;

                return (
                    <button
                        key={link.label}
                        type="button"
                        disabled={isDisabled}
                        onClick={() => link.url && router.visit(link.url, { preserveScroll: true })}
                        className={[
                            "min-w-9 rounded-md border px-3 py-2 text-sm transition",
                            isActive ? "bg-[var(--color-brand-primary)] text-white border-[var(--color-brand-primary)]" : "bg-white text-gray-800 border-gray-200 hover:bg-gray-50",
                            isDisabled ? "opacity-50 cursor-not-allowed" : "",
                        ].join(' ')}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                );
            })}
        </nav>
    );
}
