import { useEffect, useRef, useState } from "react";
import { router } from "@inertiajs/react";
import { route } from "ziggy-js";

function getLocalizedValue(value) {
  if (value && typeof value === "object") {
    return {
      pt: value.pt ?? "",
      en: value.en ?? "",
    };
  }

  if (typeof value === "string") {
    return {
      pt: value,
      en: value,
    };
  }

  return {
    pt: "",
    en: "",
  };
}

function toDateInputValue(value) {
  if (!value) return "";
  return String(value).slice(0, 10);
}

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
          <img
            src={preview}
            alt="Preview"
            className="w-full max-h-48 object-cover"
          />
          {isExisting && (
            <span className="absolute bottom-2 left-2 text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded bg-black/50 text-white">
              Imagem atual
            </span>
          )}
          <button
            type="button"
            onClick={handleClear}
            className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center bg-black/50 text-white rounded-full text-sm hover:bg-black/80 transition"
          >
            ×
          </button>
        </div>
      ) : (
        <div
          onClick={() => inputRef.current?.click()}
          className={`flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-lg p-8 cursor-pointer transition bg-slate-50 ${
            error
              ? "border-red-400"
              : "border-brand-border hover:border-brand-secondary"
          }`}
        >
          <svg
            className="w-8 h-8 text-slate-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12V4m0 0L8 8m4-4l4 4"
            />
          </svg>
          <span className="text-sm text-slate-400">
            Clica para fazer upload
          </span>
          <span className="text-xs text-slate-300">JPG, PNG, GIF</span>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFile}
        className="hidden"
      />

      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
}

export default function EventCreateForm({
  event = null,
  isEdit = false,
  eventCategories = [],
}) {
  const initialEvent = event?.data ?? event ?? {};
  const existingImageUrl =
    initialEvent.media?.url ??
    initialEvent.image?.url ??
    initialEvent.image_url ??
    null;

  const [processing, setProcessing] = useState(false);
  const [errors, setErrors] = useState({});
  const [hasImage, setHasImage] = useState(!!existingImageUrl);
  const [data, setDataRaw] = useState({
    event_category_id: initialEvent.event_category_id || "",
    title: getLocalizedValue(initialEvent.title),
    description: getLocalizedValue(initialEvent.description),
    location: getLocalizedValue(initialEvent.location),
    start_date: toDateInputValue(initialEvent.start_date),
    end_date: toDateInputValue(initialEvent.end_date),
    image: null,
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

    const payload = {
      ...data,
      event_category_id: data.event_category_id || null,
      title: {
        pt: data.title.pt,
        en: data.title.en,
      },
      description: {
        pt: data.description.pt,
        en: data.description.en,
      },
      location: {
        pt: data.location.pt,
        en: data.location.en,
      },
    };

    if (existingImageUrl && hasImage && !data.image) {
      delete payload.image;
    }

    const options = {
      preserveScroll: true,
      forceFormData: true,
      onError: (errs) => {
        setErrors(errs);
        setProcessing(false);
      },
      onFinish: () => setProcessing(false),
    };

    if (isEdit) {
      router.put(route("events.update", initialEvent.id), payload, options);
    } else {
      router.post(route("events.store"), payload, options);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl p-6 mx-auto space-y-8 rounded-xl"
    >
      <section className="space-y-1">
        <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-400">
          Informação básica
        </h3>
        <div className="border-t border-brand-border pt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="font-semibold text-brand-black">Categoria</label>
            <select
              value={data.event_category_id}
              onChange={(e) => setData("event_category_id", e.target.value)}
              className={`p-2 border rounded border-brand-border focus:ring-2 focus:ring-brand-secondary outline-none bg-white ${
                errors.event_category_id ? "border-red-500" : ""
              }`}
            >
              <option value="">Seleciona uma categoria</option>
              {eventCategories.map((category) => {
                const title = getLocalizedValue(category.title);
                return (
                  <option key={category.id} value={category.id}>
                    {title.pt || title.en || ""}
                  </option>
                );
              })}
            </select>
            {errors.event_category_id && (
              <span className="text-red-500 text-sm">
                {errors.event_category_id}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-semibold text-brand-black">
              Título (PT)
            </label>
            <input
              type="text"
              value={data.title.pt}
              onChange={(e) =>
                setData("title", { ...data.title, pt: e.target.value })
              }
              className={`p-2 border rounded border-brand-border focus:ring-2 focus:ring-brand-secondary outline-none ${
                errors["title.pt"] ? "border-red-500" : ""
              }`}
            />
            {errors["title.pt"] && (
              <span className="text-red-500 text-sm">
                {errors["title.pt"]}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-semibold text-brand-black">
              Título (EN)
            </label>
            <input
              type="text"
              value={data.title.en}
              onChange={(e) =>
                setData("title", { ...data.title, en: e.target.value })
              }
              className={`p-2 border rounded border-brand-border focus:ring-2 focus:ring-brand-secondary outline-none ${
                errors["title.en"] ? "border-red-500" : ""
              }`}
            />
            {errors["title.en"] && (
              <span className="text-red-500 text-sm">
                {errors["title.en"]}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="font-semibold text-brand-black">
              Descrição (PT)
            </label>
            <textarea
              rows={4}
              value={data.description.pt}
              onChange={(e) =>
                setData("description", {
                  ...data.description,
                  pt: e.target.value,
                })
              }
              className={`p-2 border rounded border-brand-border resize-y focus:ring-2 focus:ring-brand-secondary outline-none ${
                errors["description.pt"] ? "border-red-500" : ""
              }`}
            />
            {errors["description.pt"] && (
              <span className="text-red-500 text-sm">
                {errors["description.pt"]}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="font-semibold text-brand-black">
              Descrição (EN)
            </label>
            <textarea
              rows={4}
              value={data.description.en}
              onChange={(e) =>
                setData("description", {
                  ...data.description,
                  en: e.target.value,
                })
              }
              className={`p-2 border rounded border-brand-border resize-y focus:ring-2 focus:ring-brand-secondary outline-none ${
                errors["description.en"] ? "border-red-500" : ""
              }`}
            />
            {errors["description.en"] && (
              <span className="text-red-500 text-sm">
                {errors["description.en"]}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-semibold text-brand-black">
              Localização (PT)
            </label>
            <input
              type="text"
              value={data.location.pt}
              onChange={(e) =>
                setData("location", { ...data.location, pt: e.target.value })
              }
              className={`p-2 border rounded border-brand-border focus:ring-2 focus:ring-brand-secondary outline-none ${
                errors["location.pt"] ? "border-red-500" : ""
              }`}
            />
            {errors["location.pt"] && (
              <span className="text-red-500 text-sm">
                {errors["location.pt"]}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-semibold text-brand-black">
              Localização (EN)
            </label>
            <input
              type="text"
              value={data.location.en}
              onChange={(e) =>
                setData("location", { ...data.location, en: e.target.value })
              }
              className={`p-2 border rounded border-brand-border focus:ring-2 focus:ring-brand-secondary outline-none ${
                errors["location.en"] ? "border-red-500" : ""
              }`}
            />
            {errors["location.en"] && (
              <span className="text-red-500 text-sm">
                {errors["location.en"]}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-semibold text-brand-black">
              Data de início
            </label>
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
        </div>
      </section>

      <section className="space-y-1">
        <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-400">
          Imagem
        </h3>
        <div className="border-t border-brand-border pt-4">
          <ImageUpload
            currentUrl={existingImageUrl}
            onChange={(file, has) => {
              setData("image", file);
              setHasImage(has);
            }}
            error={errors.image}
          />
        </div>
      </section>

      <button
        type="submit"
        disabled={processing}
        className="w-full md:w-auto px-8 py-3 bg-brand-primary text-white font-bold rounded-lg hover:bg-brand-secondary transition-colors disabled:opacity-50"
      >
        {processing
          ? "A guardar..."
          : isEdit
            ? "Atualizar evento"
            : "Criar evento"}
      </button>
    </form>
  );
}