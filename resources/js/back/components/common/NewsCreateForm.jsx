import { useForm } from "@inertiajs/react";

export default function NewsCreateForm({
  news = null,
  isEdit = false,
}) {
  const initialNews = news?.data ?? news ?? {};

  const { data, setData, post, put, processing, errors } = useForm({
    title: initialNews.title || "",
    excerpt: initialNews.excerpt || "",
    content: initialNews.content || "",
    published_at: initialNews.published_at
      ? String(initialNews.published_at).slice(0, 10)
      : "",
    image: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEdit) {
      put(route("news.update", initialNews.id), {
        preserveScroll: true,
        forceFormData: true,
      });
    } else {
      post(route("news.store"), {
        preserveScroll: true,
        forceFormData: true,
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl p-6 mx-auto space-y-8 rounded-xl"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2 md:col-span-2">
          <label className="font-semibold text-brand-black">Título</label>
          <input
            type="text"
            value={data.title}
            onChange={(e) => setData("title", e.target.value)}
            className={`p-2 border rounded border-brand-border focus:ring-2 focus:ring-brand-secondary outline-none ${
              errors.title ? "border-red-500" : ""
            }`}
          />
          {errors.title && (
            <span className="text-red-500 text-sm">{errors.title}</span>
          )}
        </div>

        <div className="flex flex-col gap-2 md:col-span-2">
          <label className="font-semibold text-brand-black">Resumo</label>
          <textarea
            rows="3"
            value={data.excerpt}
            onChange={(e) => setData("excerpt", e.target.value)}
            className={`p-2 border rounded border-brand-border focus:ring-2 focus:ring-brand-secondary outline-none ${
              errors.excerpt ? "border-red-500" : ""
            }`}
          />
          {errors.excerpt && (
            <span className="text-red-500 text-sm">{errors.excerpt}</span>
          )}
        </div>

        <div className="flex flex-col gap-2 md:col-span-2">
          <label className="font-semibold text-brand-black">Conteúdo</label>
          <textarea
            rows="8"
            value={data.content}
            onChange={(e) => setData("content", e.target.value)}
            className={`p-2 border rounded border-brand-border focus:ring-2 focus:ring-brand-secondary outline-none ${
              errors.content ? "border-red-500" : ""
            }`}
          />
          {errors.content && (
            <span className="text-red-500 text-sm">{errors.content}</span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-semibold text-brand-black">
            Data de publicação
          </label>
          <input
            type="date"
            value={data.published_at}
            onChange={(e) => setData("published_at", e.target.value)}
            className={`p-2 border rounded border-brand-border focus:ring-2 focus:ring-brand-secondary outline-none ${
              errors.published_at ? "border-red-500" : ""
            }`}
          />
          {errors.published_at && (
            <span className="text-red-500 text-sm">{errors.published_at}</span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-semibold text-brand-black">Imagem</label>
          <input
            type="file"
            accept=".jpg,.jpeg,.png,.webp"
            onChange={(e) => setData("image", e.target.files?.[0] || null)}
            className={`p-2 border rounded border-brand-border bg-white ${
              errors.image ? "border-red-500" : ""
            }`}
          />
          {errors.image && (
            <span className="text-red-500 text-sm">{errors.image}</span>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={processing}
        className="w-full md:w-auto px-8 py-3 bg-brand-primary text-white font-bold rounded-lg hover:bg-brand-secondary transition-colors disabled:opacity-50"
      >
        {processing ? "A guardar..." : isEdit ? "Atualizar notícia" : "Criar notícia"}
      </button>
    </form>
  );
}