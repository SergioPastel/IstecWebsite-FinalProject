import { useForm } from "@inertiajs/react";

export default function EventCreateForm({
  event = null,
  isEdit = false,
  eventCategories = [],
}) {
  const initialEvent = event?.data ?? event ?? {};

  const { data, setData, post, put, processing, errors } = useForm({
    event_category_id: initialEvent.event_category_id || "",
    title: initialEvent.title || "",
    description: initialEvent.description || "",
    start_date: initialEvent.start_date || "",
    end_date: initialEvent.end_date || "",
    location: initialEvent.location || "",
    image: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEdit) {
      put(route("events.update", initialEvent.id), {
        preserveScroll: true,
        forceFormData: true,
      });
    } else {
      post(route("events.store"), {
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
          <label className="font-semibold text-brand-black">Categoria</label>
          <select
            value={data.event_category_id}
            onChange={(e) => setData("event_category_id", e.target.value)}
            className={`p-2 border rounded border-brand-border focus:ring-2 focus:ring-brand-secondary outline-none ${
              errors.event_category_id ? "border-red-500" : ""
            }`}
          >
            <option value="">Seleciona uma categoria</option>
            {eventCategories.map((category) => (
              <option key={category.id} value={category.id}>
                {typeof category.title === "object"
                  ? category.title.pt || category.title.en || ""
                  : category.title}
              </option>
            ))}
          </select>
          {errors.event_category_id && (
            <span className="text-red-500 text-sm">
              {errors.event_category_id}
            </span>
          )}
        </div>

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
          <label className="font-semibold text-brand-black">Descrição</label>
          <textarea
            rows="5"
            value={data.description}
            onChange={(e) => setData("description", e.target.value)}
            className={`p-2 border rounded border-brand-border focus:ring-2 focus:ring-brand-secondary outline-none ${
              errors.description ? "border-red-500" : ""
            }`}
          />
          {errors.description && (
            <span className="text-red-500 text-sm">{errors.description}</span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-semibold text-brand-black">Data de início</label>
          <input
            type="date"
            value={data.start_date}
            onChange={(e) => setData("start_date", e.target.value)}
            className={`p-2 border rounded border-brand-border focus:ring-2 focus:ring-brand-secondary outline-none ${
              errors.start_date ? "border-red-500" : ""
            }`}
          />
          {errors.start_date && (
            <span className="text-red-500 text-sm">{errors.start_date}</span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-semibold text-brand-black">Data de fim</label>
          <input
            type="date"
            value={data.end_date}
            onChange={(e) => setData("end_date", e.target.value)}
            className={`p-2 border rounded border-brand-border focus:ring-2 focus:ring-brand-secondary outline-none ${
              errors.end_date ? "border-red-500" : ""
            }`}
          />
          {errors.end_date && (
            <span className="text-red-500 text-sm">{errors.end_date}</span>
          )}
        </div>

        <div className="flex flex-col gap-2 md:col-span-2">
          <label className="font-semibold text-brand-black">Localização</label>
          <input
            type="text"
            value={data.location}
            onChange={(e) => setData("location", e.target.value)}
            className={`p-2 border rounded border-brand-border focus:ring-2 focus:ring-brand-secondary outline-none ${
              errors.location ? "border-red-500" : ""
            }`}
          />
          {errors.location && (
            <span className="text-red-500 text-sm">{errors.location}</span>
          )}
        </div>

        <div className="flex flex-col gap-2 md:col-span-2">
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
        {processing ? "A guardar..." : isEdit ? "Atualizar evento" : "Criar evento"}
      </button>
    </form>
  );
}