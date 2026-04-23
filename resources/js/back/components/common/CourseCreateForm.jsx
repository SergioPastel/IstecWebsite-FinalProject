import { useForm } from "@inertiajs/react";

export default function CourseCreateForm({
  categories = [],
  course = null,
  isEdit = false,
}) {
  const initialCourse = course?.data ?? course ?? {};

  const { data, setData, post, put, processing, errors } = useForm({
    course_category_id: initialCourse.course_category_id ?? "",
    media_id: initialCourse.media_id ?? "",
    title: {
        pt: initialCourse.title?.pt || "",
        en: initialCourse.title?.en || "",
    },
    description: {
        pt: initialCourse.description?.pt || "",
        en: initialCourse.description?.en || "",
    },
    professional_outcomes: {
        pt: initialCourse.professional_outcomes?.pt || "",
        en: initialCourse.professional_outcomes?.en || "",
    },
    duration_years: initialCourse.duration_years ?? 1,
    study_regime: initialCourse.study_regime ?? 0,
    tuition_monthly_pay: initialCourse.tuition_monthly_pay ?? 0,
    tuition_months: initialCourse.tuition_months ?? 10,
    });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEdit) {
      put(route("courses.update", initialCourse.id), {
        preserveScroll: true,
      });
    } else {
      post(route("courses.store"), {
        preserveScroll: true,
      });
    }
  };
    return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl p-6 mx-auto space-y-8 rounded-xl"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-brand-black">Título (PT)</label>
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
            <span className="text-red-500 text-sm">{errors["title.pt"]}</span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-semibold text-brand-black">Título (EN)</label>
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
            <span className="text-red-500 text-sm">{errors["title.en"]}</span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-semibold text-brand-black">Categoria</label>
          <select
            value={data.course_category_id}
            onChange={(e) => setData("course_category_id", e.target.value)}
            className="p-2 border rounded border-brand-border bg-white"
          >
            <option value="">Selecionar categoria</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.title?.pt || cat.title?.en || "Sem título"}
              </option>
            ))}
          </select>
          {errors.course_category_id && (
            <span className="text-red-500 text-sm">
              {errors.course_category_id}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-semibold text-brand-black">
            Duração (anos)
          </label>
          <input
            type="number"
            value={data.duration_years}
            onChange={(e) => setData("duration_years", e.target.value)}
            className="p-2 border rounded border-brand-border"
          />
          {errors.duration_years && (
            <span className="text-red-500 text-sm">{errors.duration_years}</span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-semibold text-brand-black">
            Regime de estudo
          </label>
          <select
            value={data.study_regime}
            onChange={(e) => setData("study_regime", parseInt(e.target.value, 10))}
            className="p-2 border rounded border-brand-border bg-white"
          >
            <option value={0}>Laboral</option>
            <option value={1}>Pós-laboral</option>
          </select>
          {errors.study_regime && (
            <span className="text-red-500 text-sm">{errors.study_regime}</span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-semibold text-brand-black">
            Propina mensal
          </label>
          <input
            type="number"
            value={data.tuition_monthly_pay}
            onChange={(e) => setData("tuition_monthly_pay", e.target.value)}
            className="p-2 border rounded border-brand-border"
          />
          {errors.tuition_monthly_pay && (
            <span className="text-red-500 text-sm">
              {errors.tuition_monthly_pay}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-semibold text-brand-black">
            Número de meses
          </label>
          <input
            type="number"
            value={data.tuition_months}
            onChange={(e) => setData("tuition_months", e.target.value)}
            className="p-2 border rounded border-brand-border"
          />
          {errors.tuition_months && (
            <span className="text-red-500 text-sm">{errors.tuition_months}</span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-brand-black">
            Descrição (PT)
          </label>
          <textarea
            rows="4"
            value={data.description.pt}
            onChange={(e) =>
              setData("description", { ...data.description, pt: e.target.value })
            }
            className="p-2 border rounded border-brand-border"
          />
          {errors["description.pt"] && (
            <span className="text-red-500 text-sm">
              {errors["description.pt"]}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-semibold text-brand-black">
            Descrição (EN)
          </label>
          <textarea
            rows="4"
            value={data.description.en}
            onChange={(e) =>
              setData("description", { ...data.description, en: e.target.value })
            }
            className="p-2 border rounded border-brand-border"
          />
          {errors["description.en"] && (
            <span className="text-red-500 text-sm">
              {errors["description.en"]}
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-brand-black">
            Saídas profissionais (PT)
          </label>
          <textarea
            rows="4"
            value={data.professional_outcomes.pt}
            onChange={(e) =>
              setData("professional_outcomes", {
                ...data.professional_outcomes,
                pt: e.target.value,
              })
            }
            className="p-2 border rounded border-brand-border"
          />
          {errors["professional_outcomes.pt"] && (
            <span className="text-red-500 text-sm">
              {errors["professional_outcomes.pt"]}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-semibold text-brand-black">
            Saídas profissionais (EN)
          </label>
          <textarea
            rows="4"
            value={data.professional_outcomes.en}
            onChange={(e) =>
              setData("professional_outcomes", {
                ...data.professional_outcomes,
                en: e.target.value,
              })
            }
            className="p-2 border rounded border-brand-border"
          />
          {errors["professional_outcomes.en"] && (
            <span className="text-red-500 text-sm">
              {errors["professional_outcomes.en"]}
            </span>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={processing}
        className="w-full md:w-auto px-8 py-3 bg-brand-primary text-white font-bold rounded-lg hover:bg-brand-secondary transition-colors disabled:opacity-50"
      >
        {processing ? "A guardar..." : isEdit ? "Atualizar curso" : "Criar curso"}
      </button>
    </form>
  );
}