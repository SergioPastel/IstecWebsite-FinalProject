import { useState, useRef, useEffect } from "react";
import { router } from "@inertiajs/react";

// ─── Searchable combobox ─────────────────────────────────────────────────────
function SubjectCombobox({ subjects = [], onSelect, excludeIds = [] }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const filtered = subjects.filter(
    (s) =>
      !excludeIds.includes(s.id) &&
      (s.name?.pt?.toLowerCase().includes(query.toLowerCase()) ||
        s.name?.en?.toLowerCase().includes(query.toLowerCase())),
  );

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <input
        type="text"
        placeholder="Pesquisar disciplina..."
        value={query}
        onFocus={() => setOpen(true)}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        className="w-full p-2 border rounded border-brand-border focus:ring-2 focus:ring-brand-secondary outline-none text-sm bg-white"
      />
      {open && filtered.length > 0 && (
        <ul className="absolute z-20 mt-1 w-full bg-white border border-brand-border rounded shadow-lg max-h-48 overflow-y-auto">
          {filtered.map((s) => (
            <li
              key={s.id}
              onMouseDown={() => {
                onSelect(s);
                setQuery("");
                setOpen(false);
              }}
              className="px-3 py-2 hover:bg-slate-50 cursor-pointer text-sm flex items-center justify-between gap-4"
            >
              <span className="font-medium text-slate-800">
                {s.name?.pt || s.name?.en || "Sem nome"}
              </span>
              <span className="text-xs text-slate-400 shrink-0">
                {s.ects} ECTS
              </span>
            </li>
          ))}
        </ul>
      )}
      {open && query.length > 0 && filtered.length === 0 && (
        <div className="absolute z-20 mt-1 w-full bg-white border border-brand-border rounded shadow text-sm text-slate-400 px-3 py-2">
          Sem resultados
        </div>
      )}
    </div>
  );
}

// ─── Inline new-subject creator ──────────────────────────────────────────────
function NewSubjectForm({ onAdd, onCancel }) {
  const [form, setForm] = useState({ name: { pt: "", en: "" }, ects: 6 });
  const valid = form.name.pt.trim() || form.name.en.trim();

  return (
    <div className="mt-2 p-3 border border-dashed border-brand-border rounded-lg bg-slate-50 space-y-3">
      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
        Nova disciplina
      </p>
      <div className="grid grid-cols-2 gap-2">
        <div className="flex flex-col gap-1">
          <label className="text-xs text-slate-500">Nome (PT)</label>
          <input
            type="text"
            value={form.name.pt}
            onChange={(e) =>
              setForm((f) => ({
                ...f,
                name: { ...f.name, pt: e.target.value },
              }))
            }
            className="p-2 border rounded border-brand-border text-sm outline-none focus:ring-2 focus:ring-brand-secondary"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-slate-500">Nome (EN)</label>
          <input
            type="text"
            value={form.name.en}
            onChange={(e) =>
              setForm((f) => ({
                ...f,
                name: { ...f.name, en: e.target.value },
              }))
            }
            className="p-2 border rounded border-brand-border text-sm outline-none focus:ring-2 focus:ring-brand-secondary"
          />
        </div>
      </div>
      <div className="flex flex-col gap-1 w-32">
        <label className="text-xs text-slate-500">ECTS</label>
        <input
          type="number"
          min={1}
          max={255}
          value={form.ects}
          onChange={(e) =>
            setForm((f) => ({ ...f, ects: parseInt(e.target.value) || 0 }))
          }
          className="p-2 border rounded border-brand-border text-sm outline-none focus:ring-2 focus:ring-brand-secondary"
        />
      </div>
      <div className="flex gap-2">
        <button
          type="button"
          disabled={!valid}
          onClick={() => onAdd(form)}
          className="px-3 py-1.5 bg-brand-primary text-white text-sm font-semibold rounded hover:bg-brand-secondary transition disabled:opacity-40"
        >
          Adicionar
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-3 py-1.5 text-sm text-slate-500 hover:text-slate-800 transition"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}

// ─── Single semester card ────────────────────────────────────────────────────
function SemesterCard({ semesterNumber, subjects, allSubjects, onChange }) {
  const [showNewForm, setShowNewForm] = useState(false);

  const usedIds = subjects.filter((s) => s.id).map((s) => s.id);

  const handlePickExisting = (subject) => {
    onChange([...subjects, { ...subject, _type: "existing" }]);
  };

  const handleAddNew = (newSubject) => {
    onChange([
      ...subjects,
      { ...newSubject, _type: "new", _tempId: crypto.randomUUID() },
    ]);
    setShowNewForm(false);
  };

  const handleRemove = (index) => {
    onChange(subjects.filter((_, i) => i !== index));
  };

  const totalEcts = subjects.reduce(
    (sum, s) => sum + (parseInt(s.ects) || 0),
    0,
  );

  return (
    <div className="border border-brand-border rounded-xl p-4 space-y-3 bg-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 flex items-center justify-center rounded-full bg-brand-primary text-white text-xs font-bold">
            {semesterNumber}
          </span>
          <span className="font-semibold text-slate-700 text-sm">
            Semestre {semesterNumber}
          </span>
        </div>
        <span className="text-xs text-slate-400 font-medium">
          {totalEcts} ECTS
        </span>
      </div>

      {subjects.length > 0 && (
        <ul className="space-y-1.5">
          {subjects.map((subject, idx) => (
            <li
              key={subject.id || subject._tempId}
              className="flex items-center justify-between gap-2 px-3 py-2 bg-slate-50 rounded-lg"
            >
              <div className="flex items-center gap-2 min-w-0">
                {subject._type === "new" && (
                  <span className="shrink-0 text-[10px] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded bg-amber-100 text-amber-700">
                    Nova
                  </span>
                )}
                <span className="text-sm text-slate-800 truncate">
                  {subject.name?.pt || subject.name?.en || "Sem nome"}
                </span>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-xs text-slate-400">
                  {subject.ects} ECTS
                </span>
                <button
                  type="button"
                  onClick={() => handleRemove(idx)}
                  className="text-slate-300 hover:text-red-400 transition text-lg leading-none"
                  aria-label="Remover disciplina"
                >
                  ×
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {!showNewForm && (
        <SubjectCombobox
          subjects={allSubjects}
          onSelect={handlePickExisting}
          excludeIds={usedIds}
        />
      )}

      {showNewForm ? (
        <NewSubjectForm
          onAdd={handleAddNew}
          onCancel={() => setShowNewForm(false)}
        />
      ) : (
        <button
          type="button"
          onClick={() => setShowNewForm(true)}
          className="text-xs text-brand-secondary font-semibold hover:underline"
        >
          + Criar nova disciplina
        </button>
      )}
    </div>
  );
}

function ImageUpload({ currentUrl = null, onChange, error }) {
  const [preview, setPreview] = useState(currentUrl);
  const [isExisting, setIsExisting] = useState(!!currentUrl);
  const inputRef = useRef(null);

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    onChange(file);
    setPreview(URL.createObjectURL(file));
    setIsExisting(false);
  };

  const handleClear = () => {
    onChange(null);
    setPreview(null);
    setIsExisting(false);
    if (inputRef.current) inputRef.current.value = "";
  };

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
          className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-brand-border rounded-lg p-8 cursor-pointer hover:border-brand-secondary transition bg-slate-50"
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
// ─── Main form ───────────────────────────────────────────────────────────────
export default function CourseCreateForm({
  categories = [],
  subjects: allSubjects = [],
  course = null,
  isEdit = false,
}) {
  const initialCourse = course?.data ?? course ?? {}; // ← add this
  const buildInitialSemesters = () => {
    const years = initialCourse.duration_years ?? 1;
    const count = years * 2;
    return Array.from({ length: count }, (_, i) => ({
      semester_number: i + 1,
      subjects:
        initialCourse.semesters?.find((s) => s.semester_number === i + 1)
          ?.subjects ?? [],
    }));
  };

  const [processing, setProcessing] = useState(false);
  const [errors, setErrors] = useState({});
  const [data, setDataRaw] = useState({
    course_category_id: initialCourse.course_category_id ?? "",
    media: null, // holds a new File when changed, null means keep existing
    modality: initialCourse.modality ?? "",
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
    semesters: buildInitialSemesters(),
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

  const handleDurationChange = (newYears) => {
    const years = parseInt(newYears) || 1;
    const count = years * 2;
    const current = data.semesters;
    const updated = Array.from({ length: count }, (_, i) => ({
      semester_number: i + 1,
      subjects: current[i]?.subjects ?? [],
    }));
    setData((d) => ({ ...d, duration_years: years, semesters: updated }));
  };

  const handleSemesterSubjectsChange = (semesterIndex, subjects) => {
    const updated = data.semesters.map((s, i) =>
      i === semesterIndex ? { ...s, subjects } : s,
    );
    setData("semesters", updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setProcessing(true);
    setErrors({});

    const payload = {
      ...data,
      modality: data.modality || null,
      course_category_id: data.course_category_id || null,
    };

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
      router.put(route("courses.update", initialCourse.id), payload, options);
    } else {
      router.post(route("courses.store"), payload, options);
    }
  };

  // Existing media URL passed from the resource (e.g. initialCourse.media?.url)
  const existingMediaUrl = initialCourse.media?.url ?? null;

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl p-6 mx-auto space-y-10 rounded-xl"
    >
      {/* ── Basic info ── */}
      <section className="space-y-1">
        <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-400">
          Informação básica
        </h3>
        <div className="border-t border-brand-border pt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
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
              className={`p-2 border rounded border-brand-border focus:ring-2 focus:ring-brand-secondary outline-none ${errors["title.pt"] ? "border-red-500" : ""}`}
            />
            {errors["title.pt"] && (
              <span className="text-red-500 text-sm">{errors["title.pt"]}</span>
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
              className={`p-2 border rounded border-brand-border focus:ring-2 focus:ring-brand-secondary outline-none ${errors["title.en"] ? "border-red-500" : ""}`}
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
            <label className="font-semibold text-brand-black">Modalidade</label>
            <select
              value={data.modality}
              onChange={(e) => setData("modality", e.target.value)}
              className="p-2 border rounded border-brand-border bg-white"
            >
              <option value="">Selecionar modalidade</option>
              <option value="in-person">Presencial</option>
              <option value="online">Online</option>
              <option value="hybrid">Híbrido</option>
            </select>
            {errors.modality && (
              <span className="text-red-500 text-sm">{errors.modality}</span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-semibold text-brand-black">
              Regime de estudo
            </label>
            <select
              value={data.study_regime}
              onChange={(e) =>
                setData("study_regime", parseInt(e.target.value, 10))
              }
              className="p-2 border rounded border-brand-border bg-white"
            >
              <option value={0}>Laboral</option>
              <option value={1}>Pós-laboral</option>
            </select>
            {errors.study_regime && (
              <span className="text-red-500 text-sm">
                {errors.study_regime}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-semibold text-brand-black">
              Duração (anos)
            </label>
            <input
              type="number"
              min={1}
              max={6}
              value={data.duration_years}
              onChange={(e) => handleDurationChange(e.target.value)}
              className="p-2 border rounded border-brand-border"
            />
            {errors.duration_years && (
              <span className="text-red-500 text-sm">
                {errors.duration_years}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-semibold text-brand-black">
              Propina mensal (€)
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
              <span className="text-red-500 text-sm">
                {errors.tuition_months}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* ── Descrição ── */}
      <section className="space-y-1">
        <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-400">
          Descrição
        </h3>
        <div className="border-t border-brand-border pt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
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
              className="p-2 border rounded border-brand-border resize-y"
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
              rows={4}
              value={data.description.en}
              onChange={(e) =>
                setData("description", {
                  ...data.description,
                  en: e.target.value,
                })
              }
              className="p-2 border rounded border-brand-border resize-y"
            />
            {errors["description.en"] && (
              <span className="text-red-500 text-sm">
                {errors["description.en"]}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* ── Saídas profissionais ── */}
      <section className="space-y-1">
        <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-400">
          Saídas profissionais
        </h3>
        <div className="border-t border-brand-border pt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-brand-black">
              Saídas profissionais (PT)
            </label>
            <textarea
              rows={4}
              value={data.professional_outcomes.pt}
              onChange={(e) =>
                setData("professional_outcomes", {
                  ...data.professional_outcomes,
                  pt: e.target.value,
                })
              }
              className="p-2 border rounded border-brand-border resize-y"
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
              rows={4}
              value={data.professional_outcomes.en}
              onChange={(e) =>
                setData("professional_outcomes", {
                  ...data.professional_outcomes,
                  en: e.target.value,
                })
              }
              className="p-2 border rounded border-brand-border resize-y"
            />
            {errors["professional_outcomes.en"] && (
              <span className="text-red-500 text-sm">
                {errors["professional_outcomes.en"]}
              </span>
            )}
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
            currentUrl={existingMediaUrl}
            onChange={(file) => setData("media", file)}
            error={errors.media}
          />
        </div>
      </section>

      {/* ── Semestres ── */}
      <section className="space-y-1">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-400">
            Semestres e disciplinas
          </h3>
          <span className="text-xs text-slate-400">
            {data.duration_years} {data.duration_years === 1 ? "ano" : "anos"} ·{" "}
            {data.semesters.length} semestres
          </span>
        </div>
        <div className="border-t border-brand-border pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.semesters.map((semester, idx) => (
            <SemesterCard
              key={semester.semester_number}
              semesterNumber={semester.semester_number}
              subjects={semester.subjects}
              allSubjects={allSubjects}
              onChange={(subjects) =>
                handleSemesterSubjectsChange(idx, subjects)
              }
            />
          ))}
        </div>
      </section>

      {/* ── Submit ── */}
      <button
        type="submit"
        disabled={processing}
        className="w-full md:w-auto px-8 py-3 bg-brand-primary text-white font-bold rounded-lg hover:bg-brand-secondary transition-colors disabled:opacity-50"
      >
        {processing
          ? "A guardar..."
          : isEdit
            ? "Atualizar curso"
            : "Criar curso"}
      </button>
    </form>
  );
}
