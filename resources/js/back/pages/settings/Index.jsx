import { useState, useRef, useEffect } from "react";
import { router } from "@inertiajs/react";
import BackofficeLayout from "../../layouts/BackofficeLayout";
import PageHeader from "../../components/ui/PageHeader";

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
                className={`p-2 border rounded border-brand-border focus:ring-2 focus:ring-brand-secondary outline-none w-full ${error ? "border-red-500" : ""}`}
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
                className={`p-2 border rounded border-brand-border focus:ring-2 focus:ring-brand-secondary outline-none resize-y w-full ${error ? "border-red-500" : ""}`}
            />
            <FieldError message={error} />
        </>
    );
}

function TranslatableField({ label, locales, value = {}, onChange, multiline = false, rows = 3, error, required = false }) {
    const [active, setActive] = useState(locales[0]);
    return (
        <div className="flex flex-col gap-2">
            <label className="font-semibold text-brand-black">
                {label}{required && <span className="text-red-400"> *</span>}
            </label>
            <div className="flex gap-1">
                {locales.map((loc) => (
                    <button key={loc} type="button" onClick={() => setActive(loc)}
                        className={`px-3 py-1 rounded-lg text-xs font-semibold uppercase tracking-wide transition ${active === loc ? "bg-brand-primary text-white" : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`}>
                        {loc}
                    </button>
                ))}
            </div>
            {multiline
                ? <TextareaInput value={value[active] ?? ""} onChange={(e) => onChange(active, e.target.value)} error={error} rows={rows} />
                : <TextInput value={value[active] ?? ""} onChange={(e) => onChange(active, e.target.value)} error={error} />}
        </div>
    );
}

function ImageUpload({ label, currentUrl = null, onChange, error }) {
    const [preview, setPreview] = useState(currentUrl ?? null);
    const [isNew, setIsNew] = useState(false);
    const inputRef = useRef(null);

    return (
        <div className="flex flex-col gap-2">
            <label className="font-semibold text-brand-black">{label}</label>
            {preview ? (
                <div className="relative w-16 h-16 rounded-lg border border-brand-border bg-slate-50 flex items-center justify-center overflow-hidden">
                    <img src={preview} alt={label} className="max-w-full max-h-full object-contain p-1" />
                    {isNew && (
                        <button type="button"
                            onClick={() => { onChange(null); setPreview(currentUrl); setIsNew(false); if (inputRef.current) inputRef.current.value = ""; }}
                            className="absolute top-1 right-1 w-4 h-4 flex items-center justify-center bg-black/50 text-white rounded-full text-xs hover:bg-black/80 transition">
                            ×
                        </button>
                    )}
                </div>
            ) : (
                <div onClick={() => inputRef.current?.click()}
                    className={`flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-lg p-8 cursor-pointer transition bg-slate-50 ${error ? "border-red-400" : "border-brand-border hover:border-brand-secondary"}`}>
                    <svg className="w-8 h-8 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12V4m0 0L8 8m4-4l4 4" />
                    </svg>
                    <span className="text-sm text-slate-400">Clique para carregar</span>
                </div>
            )}
            {preview && !isNew && (
                <button type="button" onClick={() => inputRef.current?.click()} className="w-fit text-xs text-brand-secondary font-semibold hover:underline">
                    Substituir
                </button>
            )}
            <input ref={inputRef} type="file" accept="image/*"
                onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (!f) return;
                    onChange(f);
                    setPreview(URL.createObjectURL(f));
                    setIsNew(true);
                }}
                className="hidden"
            />
            <FieldError message={error} />
        </div>
    );
}

function InlineTranslatable({ label, locales, value = {}, onChange }) {
    const [active, setActive] = useState(locales[0]);
    return (
        <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-500">{label}</span>
                <div className="flex gap-1">
                    {locales.map((loc) => (
                        <button key={loc} type="button" onClick={() => setActive(loc)}
                            className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wide transition ${active === loc ? "bg-brand-primary text-white" : "bg-slate-200 text-slate-500 hover:bg-slate-300"}`}>
                            {loc}
                        </button>
                    ))}
                </div>
            </div>
            <input
                type="text"
                value={value[active] ?? ""}
                onChange={(e) => onChange(active, e.target.value)}
                placeholder={`${label} (${active})`}
                className="p-2 border rounded border-brand-border focus:ring-2 focus:ring-brand-secondary outline-none text-sm w-full bg-white"
            />
        </div>
    );
}

function BannerManager({ slides, locales, onChange }) {
    const [expanded, setExpanded] = useState(null);
    const inputRef = useRef(null);

    const handleAdd = (e) => {
        const files = Array.from(e.target.files ?? []);
        if (!files.length) return;
        const added = files.map((file) => ({
            _key: crypto.randomUUID(),
            file,
            url: URL.createObjectURL(file),
            title: {},
            subtitle: {},
        }));
        onChange([...slides, ...added]);
        if (inputRef.current) inputRef.current.value = "";
    };

    const remove = (idx) => {
        onChange(slides.filter((_, i) => i !== idx));
        setExpanded((prev) => {
            if (prev === idx) return null;
            if (prev !== null && prev > idx) return prev - 1;
            return prev;
        });
    };

    const move = (idx, dir) => {
        const next = [...slides];
        const target = idx + dir;
        if (target < 0 || target >= next.length) return;
        [next[idx], next[target]] = [next[target], next[idx]];
        setExpanded((prev) => {
            if (prev === idx) return target;
            if (prev === target) return idx;
            return prev;
        });
        onChange(next);
    };

    const updateText = (idx, field, locale, val) => {
        onChange(slides.map((s, i) =>
            i === idx ? { ...s, [field]: { ...(s[field] ?? {}), [locale]: val } } : s
        ));
    };

    return (
        <div className="space-y-3">
            {slides.map((slide, idx) => {
                const key = slide.id ?? slide._key;
                const isNew = !slide.id;
                return (
                    <div key={key} className={`border rounded-lg bg-white overflow-hidden ${isNew ? "border-dashed border-amber-300" : "border-brand-border"}`}>
                        <div className="flex items-center gap-3 px-3 py-2">
                            <img src={slide.url} alt="" className="w-16 h-10 object-cover rounded shrink-0" />
                            <span className="flex-1 text-xs text-slate-400 truncate">
                                {isNew ? slide.file.name : slide.url.split('/').pop()}
                            </span>
                            {isNew && (
                                <span className="text-[10px] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded bg-amber-100 text-amber-700 shrink-0">
                                    Nova
                                </span>
                            )}
                            <button type="button"
                                onClick={() => setExpanded(expanded === idx ? null : idx)}
                                className="text-xs text-brand-secondary font-semibold hover:underline shrink-0">
                                {expanded === idx ? "Fechar" : "Editar texto"}
                            </button>
                            <div className="flex items-center gap-1 shrink-0">
                                <button type="button" onClick={() => move(idx, -1)} disabled={idx === 0}
                                    className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 transition">↑</button>
                                <button type="button" onClick={() => move(idx, 1)} disabled={idx === slides.length - 1}
                                    className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 transition">↓</button>
                                <button type="button" onClick={() => remove(idx)}
                                    className="p-1 text-slate-300 hover:text-red-400 transition text-lg leading-none">×</button>
                            </div>
                        </div>
                        {expanded === idx && (
                            <div className="border-t border-brand-border px-4 py-3 bg-slate-50 space-y-3">
                                <InlineTranslatable label="Título" locales={locales}
                                    value={slide.title ?? {}}
                                    onChange={(loc, val) => updateText(idx, "title", loc, val)} />
                                <InlineTranslatable label="Subtítulo" locales={locales}
                                    value={slide.subtitle ?? {}}
                                    onChange={(loc, val) => updateText(idx, "subtitle", loc, val)} />
                            </div>
                        )}
                    </div>
                );
            })}

            {slides.length === 0 && (
                <p className="text-sm text-slate-400">Nenhuma imagem adicionada.</p>
            )}

            <button type="button" onClick={() => inputRef.current?.click()}
                className="text-xs text-brand-secondary font-semibold hover:underline">
                + Adicionar imagem
            </button>
            <input ref={inputRef} type="file" accept="image/*" multiple onChange={handleAdd} className="hidden" />
        </div>
    );
}

function Section({ title, children }) {
    return (
        <section className="space-y-1">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-400">{title}</h3>
            <div className="border-t border-brand-border pt-4">{children}</div>
        </section>
    );
}

function parseTranslatable(raw) {
    if (!raw) return {};
    if (typeof raw === "object") return raw;
    try { return JSON.parse(raw); } catch { return {}; }
}

function initSlides(bannerImages) {
    return bannerImages.map((b) => ({
        id:       b.id,
        url:      b.url,
        order:    b.order,
        title:    parseTranslatable(b.title),
        subtitle: parseTranslatable(b.subtitle),
    }));
}

export default function SettingsIndex({ siteInfo = null, locales = ["pt", "en"], faviconUrl = null, bannerImages = [] }) {
    const [slides, setSlides] = useState(() => initSlides(bannerImages));
    const [deleted, setDeleted] = useState([]);
    const [processing, setProcessing] = useState(false);
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(false);

    // When Inertia redirects back after save, bannerImages prop updates
    // but useState doesn't reinitialize — this syncs slides to the fresh prop.
    useEffect(() => {
        setSlides(initSlides(bannerImages));
        setDeleted([]);
    }, [bannerImages]);

    const [fields, setFields] = useState({
        phone_number: siteInfo?.phone_number ?? "",
        email:        siteInfo?.email        ?? "",
        address:      siteInfo?.address      ?? "",
        slogan:       parseTranslatable(siteInfo?.slogan),
        mission:      parseTranslatable(siteInfo?.mission),
        whoWeAre:     parseTranslatable(siteInfo?.whoWeAre),
        favicon:      null,
    });

    const setField = (key, value) => setFields((prev) => ({ ...prev, [key]: value }));

    const handleSlidesChange = (next) => {
        const nextIds = new Set(next.filter((s) => s.id).map((s) => s.id));
        slides.forEach((s) => {
            if (s.id && !nextIds.has(s.id) && !deleted.includes(s.id)) {
                setDeleted((prev) => [...prev, s.id]);
            }
        });
        setSlides(next);
    };

    function submit(e) {
        e.preventDefault();
        setSuccess(false);

        const payload = {
            _method:        "PUT",
            phone_number:   fields.phone_number,
            email:          fields.email,
            address:        fields.address,
            favicon:        fields.favicon,
            slogan:         fields.slogan,
            mission:        fields.mission,
            whoWeAre:       fields.whoWeAre,
            banner_deleted: deleted,
            banner_images:  slides.filter((s) => !s.id).map((s) => s.file),
            banner_new_texts: slides.filter((s) => !s.id).map((s) => ({
                title:    s.title    ?? {},
                subtitle: s.subtitle ?? {},
            })),
            banner_order:   slides.filter((s) => s.id).map((s) => s.id),
            banner_texts:   slides.filter((s) => s.id).map((s) => ({
                id:       s.id,
                title:    s.title    ?? {},
                subtitle: s.subtitle ?? {},
            })),
        };

        router.post(route("backoffice.settings"), payload, {
            forceFormData: true,
            onStart:   () => { setProcessing(true); setErrors({}); },
            onFinish:  () => setProcessing(false),
            onSuccess: () => { setSuccess(true); setDeleted([]); },
            onError:   (errs) => setErrors(errs),
        });
    }

    return (
        <BackofficeLayout
            title="Definições"
            searchPlaceholder="Pesquisar definições"
            actions={[
                <button
                    key="save"
                    type="submit"
                    form="settings-form"
                    disabled={processing}
                    className="inline-flex items-center justify-center rounded-2xl bg-[var(--color-brand-primary)] px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_32px_rgba(12,115,183,0.28)] transition hover:bg-[var(--color-brand-secondary)] disabled:opacity-50"
                >
                    {processing ? "A guardar..." : "Guardar alterações"}
                </button>,
            ]}
        >
            <div className="space-y-6">
                {errors.general && (
                    <div className="rounded border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                        {errors.general}
                    </div>
                )}

                <form
                    id="settings-form"
                    onSubmit={submit}
                    className="max-w-4xl space-y-10 rounded-xl"
                >
                    <Section title="Identidade">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div className="flex flex-col gap-2">
                                <label className="font-semibold text-brand-black">Telefone</label>
                                <TextInput
                                    value={fields.phone_number}
                                    onChange={(e) => setField("phone_number", e.target.value)}
                                    error={errors.phone_number}
                                    placeholder="+351 000 000 000"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="font-semibold text-brand-black">Email</label>
                                <TextInput
                                    type="email"
                                    value={fields.email}
                                    onChange={(e) => setField("email", e.target.value)}
                                    error={errors.email}
                                    placeholder="geral@exemplo.pt"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="font-semibold text-brand-black">Morada</label>
                                <TextareaInput
                                    rows={2}
                                    value={fields.address}
                                    onChange={(e) => setField("address", e.target.value)}
                                    error={errors.address}
                                    placeholder="Rua Exemplo, n.º 1, 0000-000 Porto"
                                />
                            </div>
                        </div>
                    </Section>

                    <Section title="Conteúdo">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <TranslatableField
                                label="Slogan"
                                locales={locales}
                                value={fields.slogan}
                                onChange={(loc, val) => setField("slogan", { ...fields.slogan, [loc]: val })}
                                error={errors.slogan}
                            />

                            <div className="hidden md:block" />

                            <TranslatableField
                                label="Missão"
                                locales={locales}
                                value={fields.mission}
                                multiline
                                rows={4}
                                onChange={(loc, val) => setField("mission", { ...fields.mission, [loc]: val })}
                                error={errors.mission}
                            />

                            <TranslatableField
                                label="Quem somos"
                                locales={locales}
                                value={fields.whoWeAre}
                                multiline
                                rows={4}
                                onChange={(loc, val) => setField("whoWeAre", { ...fields.whoWeAre, [loc]: val })}
                                error={errors.whoWeAre}
                            />
                        </div>
                    </Section>

                    <Section title="Favicon">
                        <ImageUpload
                            label="Favicon"
                            currentUrl={faviconUrl}
                            onChange={(file) => setField("favicon", file)}
                            error={errors.favicon}
                        />
                    </Section>

                    <Section title="Banner">
                        <BannerManager
                            slides={slides}
                            locales={locales}
                            onChange={handleSlidesChange}
                        />
                    </Section>

                    {success && (
                        <span className="text-sm font-medium text-emerald-600">
                            Alterações guardadas ✓
                        </span>
                    )}
                </form>
            </div>
        </BackofficeLayout>
    );
}
