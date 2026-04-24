import { useState, useRef } from "react";
import { useForm } from "@inertiajs/react";
import BackofficeLayout from "../../layouts/BackofficeLayout";
import PageHeader from "../../components/ui/PageHeader";

// ─── Reusable primitives ─────────────────────────────────────────────────────

function FieldError({ message }) {
    if (!message) return null;
    return <span className="text-red-500 text-sm">{message}</span>;
}

function TextInput({ value, onChange, error, placeholder, type = "text" }) {
    return (
        <>
            <input
                type={type}
                value={value ?? ""}
                onChange={onChange}
                placeholder={placeholder}
                className={`p-2 border rounded border-brand-border focus:ring-2 focus:ring-brand-secondary outline-none w-full ${
                    error ? "border-red-500" : ""
                }`}
            />
            <FieldError message={error} />
        </>
    );
}

function TextareaInput({ value, onChange, error, rows = 3, placeholder }) {
    return (
        <>
            <textarea
                rows={rows}
                value={value ?? ""}
                onChange={onChange}
                placeholder={placeholder}
                className={`p-2 border rounded border-brand-border focus:ring-2 focus:ring-brand-secondary outline-none resize-y w-full ${
                    error ? "border-red-500" : ""
                }`}
            />
            <FieldError message={error} />
        </>
    );
}

function TranslatableField({
    label,
    locales,
    value = {},
    onChange,
    multiline = false,
    rows = 3,
    error,
    required = false,
}) {
    const [active, setActive] = useState(locales[0]);

    return (
        <div className="flex flex-col gap-2">
            <label className="font-semibold text-brand-black">
                {label}
                {required && <span className="text-red-400"> *</span>}
            </label>

            <div className="flex gap-1">
                {locales.map((loc) => (
                    <button
                        key={loc}
                        type="button"
                        onClick={() => setActive(loc)}
                        className={`px-3 py-1 rounded-lg text-xs font-semibold uppercase tracking-wide transition ${
                            active === loc
                                ? "bg-brand-primary text-white"
                                : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                        }`}
                    >
                        {loc}
                    </button>
                ))}
            </div>

            {multiline ? (
                <TextareaInput
                    value={value[active] ?? ""}
                    onChange={(e) => onChange(active, e.target.value)}
                    error={error}
                    rows={rows}
                />
            ) : (
                <TextInput
                    value={value[active] ?? ""}
                    onChange={(e) => onChange(active, e.target.value)}
                    error={error}
                />
            )}
        </div>
    );
}

function ImageUpload({ label, currentUrl = null, onChange, error }) {
    const [preview, setPreview] = useState(currentUrl ?? null);
    const [isNew, setIsNew] = useState(false);
    const inputRef = useRef(null);

    const handleFile = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        onChange(file);
        setPreview(URL.createObjectURL(file));
        setIsNew(true);
    };

    const handleClear = () => {
        onChange(null);
        setPreview(currentUrl ?? null);
        setIsNew(false);
        if (inputRef.current) inputRef.current.value = "";
    };

    return (
        <div className="flex flex-col gap-2">
            <label className="font-semibold text-brand-black">{label}</label>

            {preview ? (
                <div className="relative w-16 h-16 rounded-lg border border-brand-border bg-slate-50 flex items-center justify-center overflow-hidden">
                    <img src={preview} alt={label} className="max-w-full max-h-full object-contain p-1" />
                    {isNew && (
                        <button
                            type="button"
                            onClick={handleClear}
                            className="absolute top-1 right-1 w-4 h-4 flex items-center justify-center bg-black/50 text-white rounded-full text-xs hover:bg-black/80 transition"
                        >
                            ×
                        </button>
                    )}
                </div>
            ) : (
                <div
                    onClick={() => inputRef.current?.click()}
                    className={`flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-lg p-8 cursor-pointer transition bg-slate-50 ${
                        error ? "border-red-400" : "border-brand-border hover:border-brand-secondary"
                    }`}
                >
                    <svg className="w-8 h-8 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12V4m0 0L8 8m4-4l4 4" />
                    </svg>
                    <span className="text-sm text-slate-400">Clica para fazer upload</span>
                    <span className="text-xs text-slate-300">ICO, PNG, SVG</span>
                </div>
            )}

            {preview && !isNew && (
                <button type="button" onClick={() => inputRef.current?.click()}
                    className="w-fit text-xs text-brand-secondary font-semibold hover:underline">
                    Substituir
                </button>
            )}

            <input ref={inputRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
            <FieldError message={error} />
        </div>
    );
}

function Section({ title, children }) {
    return (
        <section className="space-y-1">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                {title}
            </h3>
            <div className="border-t border-brand-border pt-4">{children}</div>
        </section>
    );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function SettingsIndex({
    siteInfo = null,
    locales = ["pt", "en"],
    faviconUrl = null,
}) {
    function parseTranslatable(raw) {
        if (!raw) return {};
        if (typeof raw === "object") return raw;
        try { return JSON.parse(raw); } catch { return {}; }
    }

    const { data, setData, post, processing, errors, recentlySuccessful } =
        useForm({
            phone_number: siteInfo?.phone_number ?? "",
            email:        siteInfo?.email        ?? "",
            address:      siteInfo?.address      ?? "",
            slogan:       parseTranslatable(siteInfo?.slogan),
            mission:      parseTranslatable(siteInfo?.mission),
            whoWeAre:     parseTranslatable(siteInfo?.whoWeAre),
            favicon:      null,
        });

    function setTranslatable(field, locale, value) {
        setData(field, { ...data[field], [locale]: value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        post(route("settings.siteinfo.update"), { forceFormData: true });
    }

    return (
        <BackofficeLayout
            title="Definições"
            searchPlaceholder="Pesquisar definições"
        >
            <div className="space-y-6">
                <PageHeader
                    eyebrow="Configuration"
                    title="Informações do site"
                    description="Dados gerais da instituição apresentados publicamente no site."
                />

                <form onSubmit={handleSubmit} className="max-w-4xl space-y-10 rounded-xl">

                    {/* ── Identidade ── */}
                    <Section title="Identidade">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="font-semibold text-brand-black">Telefone</label>
                                <TextInput
                                    value={data.phone_number}
                                    onChange={(e) => setData("phone_number", e.target.value)}
                                    error={errors.phone_number}
                                    placeholder="+351 000 000 000"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="font-semibold text-brand-black">Email</label>
                                <TextInput
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData("email", e.target.value)}
                                    error={errors.email}
                                    placeholder="geral@exemplo.pt"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="font-semibold text-brand-black">Morada</label>
                                <TextareaInput
                                    rows={2}
                                    value={data.address}
                                    onChange={(e) => setData("address", e.target.value)}
                                    error={errors.address}
                                    placeholder="Rua Exemplo, n.º 1, 0000-000 Porto"
                                />
                            </div>
                        </div>
                    </Section>

                    {/* ── Conteúdo traduzível ── */}
                    <Section title="Conteúdo">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <TranslatableField
                                label="Slogan"
                                locales={locales}
                                value={data.slogan}
                                onChange={(locale, val) => setTranslatable("slogan", locale, val)}
                                error={errors.slogan}
                            />

                            <div className="hidden md:block" />

                            <TranslatableField
                                label="Missão"
                                locales={locales}
                                value={data.mission}
                                multiline
                                rows={4}
                                onChange={(locale, val) => setTranslatable("mission", locale, val)}
                                error={errors.mission}
                            />

                            <TranslatableField
                                label="Quem somos"
                                locales={locales}
                                value={data.whoWeAre}
                                multiline
                                rows={4}
                                onChange={(locale, val) => setTranslatable("whoWeAre", locale, val)}
                                error={errors.whoWeAre}
                            />
                        </div>
                    </Section>

                    {/* ── Favicon ── */}
                    <Section title="Favicon">
                        <ImageUpload
                            label="Favicon"
                            currentUrl={faviconUrl}
                            onChange={(file) => setData("favicon", file)}
                            error={errors.favicon}
                        />
                    </Section>

                    {/* ── Submit ── */}
                    <div className="flex items-center gap-4">
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-8 py-3 bg-brand-primary text-white font-bold rounded-lg hover:bg-brand-secondary transition-colors disabled:opacity-50"
                        >
                            {processing ? "A guardar..." : "Guardar alterações"}
                        </button>

                        {recentlySuccessful && (
                            <span className="text-sm font-medium text-emerald-600">
                                Guardado ✓
                            </span>
                        )}
                    </div>
                </form>
            </div>
        </BackofficeLayout>
    );
}
