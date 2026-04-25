import { useEffect, useRef, useState } from "react";
import { router } from "@inertiajs/react";
import { route } from "ziggy-js";

function ImageUpload({ currentUrl = null, onChange, error }) {
    const [preview, setPreview] = useState(currentUrl);
    const [isExisting, setIsExisting] = useState(!!currentUrl);
    const inputRef = useRef(null);

    const handleFile = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        onChange(file, true);
        setPreview(URL.createObjectURL(file));
        setIsExisting(false);
    };

    const handleClear = () => {
        onChange(null, false);
        setPreview(null);
        setIsExisting(false);
        if (inputRef.current) inputRef.current.value = "";
    };

    useEffect(() => {
        onChange(null, !!currentUrl);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="flex flex-col gap-2">
            <label className="font-semibold text-brand-black">Imagem</label>
            {preview ? (
                <div className="relative rounded-lg overflow-hidden border border-brand-border w-full max-w-sm">
                    <img src={preview} alt="Preview" className="w-full max-h-48 object-cover" />
                    {isExisting && (
                        <span className="absolute bottom-2 left-2 text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded bg-black/50 text-white">
                            Imagem atual
                        </span>
                    )}
                    <button type="button" onClick={handleClear}
                        className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center bg-black/50 text-white rounded-full text-sm hover:bg-black/80 transition">
                        ×
                    </button>
                </div>
            ) : (
                <div onClick={() => inputRef.current?.click()}
                    className={`flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-lg p-8 cursor-pointer transition bg-slate-50 ${error ? "border-red-400" : "border-brand-border hover:border-brand-secondary"}`}>
                    <svg className="w-8 h-8 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12V4m0 0L8 8m4-4l4 4" />
                    </svg>
                    <span className="text-sm text-slate-400">Clica para fazer upload</span>
                    <span className="text-xs text-slate-300">JPG, PNG, WEBP</span>
                </div>
            )}
            <input ref={inputRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
            {error && <span className="text-red-500 text-sm">{error}</span>}
        </div>
    );
}

export default function NewsCreateForm({ news = null, isEdit = false, categories = [] }) {
    const initialNews      = news?.data ?? news ?? {};
    const existingImageUrl = initialNews.media?.url ?? null;

    const [processing, setProcessing] = useState(false);
    const [errors, setErrors]         = useState({});
    const [data, setDataRaw]          = useState({
        title:            { pt: initialNews.title?.pt   ?? "", en: initialNews.title?.en   ?? "" },
        excerpt:          { pt: initialNews.excerpt?.pt ?? "", en: initialNews.excerpt?.en ?? "" },
        content:          { pt: initialNews.content?.pt ?? "", en: initialNews.content?.en ?? "" },
        news_category_id: initialNews.news_category_id ?? "",
        image:            null,
    });

    const setData = (keyOrFn, value) => {
        if (typeof keyOrFn === "function") {
            setDataRaw(keyOrFn);
        } else if (typeof keyOrFn === "string") {
            setDataRaw((prev) => ({ ...prev, [keyOrFn]: value }));
        } else {
            setDataRaw((prev) => ({ ...prev, ...keyOrFn }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});

        const payload = { ...data };

        if (isEdit && existingImageUrl && !data.image) {
            delete payload.image;
        }

        const options = {
            forceFormData: true,
            onError:  (errs) => { setErrors(errs); setProcessing(false); },
            onFinish: () => setProcessing(false),
        };

        if (isEdit) {
            router.put(route("news.update", initialNews.id), payload, options);
        } else {
            router.post(route("news.store"), payload, options);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-4xl p-6 mx-auto space-y-10 rounded-xl">

            {/* ── Informação básica ── */}
            <section className="space-y-1">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                    Informação básica
                </h3>
                <div className="border-t border-brand-border pt-4 grid grid-cols-1 md:grid-cols-2 gap-6">

                    <div className="flex flex-col gap-2">
                        <label className="font-semibold text-brand-black">Categoria</label>
                        <select value={data.news_category_id}
                            onChange={(e) => setData("news_category_id", e.target.value)}
                            className="p-2 border rounded border-brand-border bg-white focus:ring-2 focus:ring-brand-secondary outline-none">
                            <option value="">Sem categoria</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.title?.pt || cat.title?.en || "Sem título"}
                                </option>
                            ))}
                        </select>
                        {errors.news_category_id && <span className="text-red-500 text-sm">{errors.news_category_id}</span>}
                    </div>

                    {/* empty cell to keep grid alignment */}
                    <div className="hidden md:block" />

                    <div className="flex flex-col gap-2">
                        <label className="font-semibold text-brand-black">Título (PT)</label>
                        <input type="text" value={data.title.pt}
                            onChange={(e) => setData("title", { ...data.title, pt: e.target.value })}
                            className={`p-2 border rounded border-brand-border focus:ring-2 focus:ring-brand-secondary outline-none ${errors["title.pt"] ? "border-red-500" : ""}`} />
                        {errors["title.pt"] && <span className="text-red-500 text-sm">{errors["title.pt"]}</span>}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="font-semibold text-brand-black">Título (EN)</label>
                        <input type="text" value={data.title.en}
                            onChange={(e) => setData("title", { ...data.title, en: e.target.value })}
                            className={`p-2 border rounded border-brand-border focus:ring-2 focus:ring-brand-secondary outline-none ${errors["title.en"] ? "border-red-500" : ""}`} />
                        {errors["title.en"] && <span className="text-red-500 text-sm">{errors["title.en"]}</span>}
                    </div>

                </div>
            </section>

            {/* ── Resumo ── */}
            <section className="space-y-1">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                    Resumo
                </h3>
                <div className="border-t border-brand-border pt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                        <label className="font-semibold text-brand-black">Resumo (PT)</label>
                        <textarea rows={3} value={data.excerpt.pt}
                            onChange={(e) => setData("excerpt", { ...data.excerpt, pt: e.target.value })}
                            className={`p-2 border rounded border-brand-border focus:ring-2 focus:ring-brand-secondary outline-none resize-y ${errors["excerpt.pt"] ? "border-red-500" : ""}`} />
                        {errors["excerpt.pt"] && <span className="text-red-500 text-sm">{errors["excerpt.pt"]}</span>}
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="font-semibold text-brand-black">Resumo (EN)</label>
                        <textarea rows={3} value={data.excerpt.en}
                            onChange={(e) => setData("excerpt", { ...data.excerpt, en: e.target.value })}
                            className={`p-2 border rounded border-brand-border focus:ring-2 focus:ring-brand-secondary outline-none resize-y ${errors["excerpt.en"] ? "border-red-500" : ""}`} />
                        {errors["excerpt.en"] && <span className="text-red-500 text-sm">{errors["excerpt.en"]}</span>}
                    </div>
                </div>
            </section>

            {/* ── Conteúdo ── */}
            <section className="space-y-1">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                    Conteúdo
                </h3>
                <div className="border-t border-brand-border pt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                        <label className="font-semibold text-brand-black">Conteúdo (PT)</label>
                        <textarea rows={10} value={data.content.pt}
                            onChange={(e) => setData("content", { ...data.content, pt: e.target.value })}
                            className={`p-2 border rounded border-brand-border focus:ring-2 focus:ring-brand-secondary outline-none resize-y ${errors["content.pt"] ? "border-red-500" : ""}`} />
                        {errors["content.pt"] && <span className="text-red-500 text-sm">{errors["content.pt"]}</span>}
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="font-semibold text-brand-black">Conteúdo (EN)</label>
                        <textarea rows={10} value={data.content.en}
                            onChange={(e) => setData("content", { ...data.content, en: e.target.value })}
                            className={`p-2 border rounded border-brand-border focus:ring-2 focus:ring-brand-secondary outline-none resize-y ${errors["content.en"] ? "border-red-500" : ""}`} />
                        {errors["content.en"] && <span className="text-red-500 text-sm">{errors["content.en"]}</span>}
                    </div>
                </div>
            </section>

            {/* ── Imagem ── */}
            <section className="space-y-1">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                    Imagem
                </h3>
                <div className="border-t border-brand-border pt-4">
                    <ImageUpload
                        currentUrl={existingImageUrl}
                        onChange={(file) => setData("image", file)}
                        error={errors.image}
                    />
                </div>
            </section>

            <button type="submit" disabled={processing}
                className="w-full md:w-auto px-8 py-3 bg-brand-primary text-white font-bold rounded-lg hover:bg-brand-secondary transition-colors disabled:opacity-50">
                {processing ? "A guardar..." : isEdit ? "Atualizar notícia" : "Criar notícia"}
            </button>
        </form>
    );
}
