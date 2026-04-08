import React, { useMemo, useState } from "react";
import Layout from "../../layouts/layout.jsx";

const steps = [
  "Seleção e dados pessoais",
  "Envio de arquivos",
  "Revisão",
  "Confirmação",
];

const courseLevels = [
  {
    id: "ctesp",
    title: "CTeSP",
    courses: [
      { id: 1, title: "Desenvolvimento Web" },
      { id: 2, title: "Redes e Sistemas Informáticos" },
    ],
  },
  {
    id: "licenciatura",
    title: "Licenciatura",
    courses: [
      { id: 3, title: "Engenharia Informática" },
      { id: 4, title: "Gestão" },
    ],
  },
  {
    id: "pos-graduacao",
    title: "Pós-Graduação",
    courses: [
      { id: 5, title: "Cibersegurança" },
      { id: 6, title: "Data Science" },
    ],
  },
  {
    id: "plano-atividades",
    title: "Plano de Atividades",
    courses: [
      { id: 7, title: "Plano Anual 2025/2026" },
      { id: 8, title: "Atividades Complementares" },
    ],
  },
];

export default function ApplicationsCourse({
  setPage,
  language,
  setLanguage,
}) {
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});

  const pageTitle = "Candidatura a Curso";
  const selectionLabel = "Curso desejado";

  const [formData, setFormData] = useState({
    course_level: "",
    applicable_id: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    birth_date: "",
    identification_number: "",
    notes: "",
    cv_file: null,
    identification_file: null,
    certificate_file: null,
    terms: false,
  });

  const availableCourses = useMemo(() => {
    if (!formData.course_level) return [];
    const selectedLevel = courseLevels.find(
      (level) => level.id === formData.course_level
    );
    return selectedLevel ? selectedLevel.courses : [];
  }, [formData.course_level]);

  const selectedLevelName = useMemo(() => {
    if (!formData.course_level) return "";
    const found = courseLevels.find(
      (level) => level.id === formData.course_level
    );
    return found?.title || "";
  }, [formData.course_level]);

  const selectedName = useMemo(() => {
    if (!formData.applicable_id) return "";

    const found = availableCourses.find(
      (item) => String(item.id) === String(formData.applicable_id)
    );

    return found?.title || "";
  }, [formData.applicable_id, availableCourses]);

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const isValidIdentificationNumber = (value) => {
    return /^\d{9}$/.test(value);
  };

  const validateStep1 = () => {
    const newErrors = {};

    if (!formData.course_level) {
      newErrors.course_level = "Campo obrigatório.";
    }

    if (!formData.applicable_id) {
      newErrors.applicable_id = "Campo obrigatório.";
    }

    if (!formData.first_name) {
      newErrors.first_name = "Campo obrigatório.";
    }

    if (!formData.last_name) {
      newErrors.last_name = "Campo obrigatório.";
    }

    if (!formData.email) {
      newErrors.email = "Campo obrigatório.";
    }

    if (!formData.phone) {
      newErrors.phone = "Campo obrigatório.";
    }

    if (!formData.birth_date) {
      newErrors.birth_date = "Campo obrigatório.";
    }

    if (!formData.identification_number) {
      newErrors.identification_number = "Campo obrigatório.";
    } else if (!isValidIdentificationNumber(formData.identification_number)) {
      newErrors.identification_number =
        "O número de identificação deve ter 9 dígitos.";
    }

    setErrors((prev) => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors = {};

    if (!formData.terms) {
      newErrors.terms = "Tem de aceitar os termos.";
    }

    setErrors((prev) => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (currentStep === 1 && !validateStep1()) return;
    if (currentStep < 4) setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateStep3()) return;

    console.log("Candidatura submetida:", formData);
    setCurrentStep(4);
  };

  return (
    <>
      <Layout
        setPage={setPage}
        language={language}
        setLanguage={setLanguage}
      />

      <main className="min-h-screen bg-[#f6f8fb] pt-[140px] pb-12">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-6 py-5 sm:px-10">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#0d8fe8]">
                    Candidaturas
                  </p>
                  <h1 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
                    {pageTitle}
                  </h1>
                  <p className="mt-2 text-sm text-slate-500">
                    Preencha a candidatura e associe-a diretamente a um curso.
                  </p>
                </div>

                <div className="rounded-xl bg-[#eef7fe] px-4 py-3 text-sm text-slate-700">
                  <span className="font-semibold text-slate-900">Tipo:</span>{" "}
                  Curso
                </div>
              </div>
            </div>

            <div className="border-b border-slate-200 bg-white px-4 py-8 sm:px-10">
              <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                {steps.map((step, index) => {
                  const stepNumber = index + 1;
                  const active = currentStep === stepNumber;
                  const completed = currentStep > stepNumber;

                  return (
                    <div
                      key={step}
                      className="relative flex flex-col items-center text-center"
                    >
                      {index !== steps.length - 1 && (
                        <div className="absolute left-[60%] top-5 hidden h-[2px] w-[80%] bg-slate-200 md:block" />
                      )}

                      <div
                        className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full border text-sm font-bold transition ${
                          active
                            ? "border-[#0d8fe8] bg-[#0d8fe8] text-white"
                            : completed
                            ? "border-[#0d8fe8] bg-[#eef7fe] text-[#0d8fe8]"
                            : "border-slate-300 bg-white text-slate-400"
                        }`}
                      >
                        {stepNumber}
                      </div>

                      <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                        Passo {stepNumber}
                      </p>
                      <p className="mt-1 max-w-[150px] text-sm font-medium text-slate-700">
                        {step}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="px-4 py-8 sm:px-10">
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">
                      Seleção e Informações Pessoais
                    </h2>
                    <p className="mt-2 text-sm text-slate-500">
                      Escolha o curso e preencha os seus dados.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <div className="border-b border-slate-200 px-6 py-4">
                      <h3 className="text-base font-semibold text-slate-900">
                        1. Seleção
                      </h3>
                    </div>

                    <div className="space-y-5 p-6">
                      <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                          Nível de ensino <span className="text-red-500">*</span>
                        </label>

                        <select
                          value={formData.course_level}
                          onChange={(e) => {
                            updateField("course_level", e.target.value);
                            updateField("applicable_id", "");
                          }}
                          className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-[#0d8fe8]"
                        >
                          <option value="">Selecione um nível</option>
                          {courseLevels.map((level) => (
                            <option key={level.id} value={level.id}>
                              {level.title}
                            </option>
                          ))}
                        </select>

                        {errors.course_level && (
                          <p className="mt-2 text-sm text-red-500">
                            {errors.course_level}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                          {selectionLabel} <span className="text-red-500">*</span>
                        </label>

                        <select
                          value={formData.applicable_id}
                          onChange={(e) =>
                            updateField("applicable_id", e.target.value)
                          }
                          disabled={!formData.course_level}
                          className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-[#0d8fe8] disabled:bg-slate-100 disabled:text-slate-400"
                        >
                          <option value="">
                            {formData.course_level
                              ? "Selecione um curso"
                              : "Selecione primeiro o nível"}
                          </option>

                          {availableCourses.map((course) => (
                            <option key={course.id} value={course.id}>
                              {course.title}
                            </option>
                          ))}
                        </select>

                        {errors.applicable_id && (
                          <p className="mt-2 text-sm text-red-500">
                            {errors.applicable_id}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <div className="border-b border-slate-200 px-6 py-4">
                      <h3 className="text-base font-semibold text-slate-900">
                        2. Informações pessoais
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 gap-5 p-6 md:grid-cols-2">
                      <Input
                        label="Primeiro nome"
                        value={formData.first_name}
                        onChange={(v) => updateField("first_name", v)}
                        error={errors.first_name}
                        required
                      />
                      <Input
                        label="Sobrenome"
                        value={formData.last_name}
                        onChange={(v) => updateField("last_name", v)}
                        error={errors.last_name}
                        required
                      />
                      <Input
                        label="Endereço de e-mail"
                        type="email"
                        value={formData.email}
                        onChange={(v) => updateField("email", v)}
                        error={errors.email}
                        required
                      />
                      <Input
                        label="Número de telefone"
                        value={formData.phone}
                        onChange={(v) => updateField("phone", v)}
                        error={errors.phone}
                        required
                      />
                      <Input
                        label="Data de nascimento"
                        type="date"
                        value={formData.birth_date}
                        onChange={(v) => {
                          if (/^\d{0,4}-?\d{0,2}-?\d{0,2}$/.test(v)) {
                            updateField("birth_date", v);
                          }
                        }}
                        error={errors.birth_date}
                        required
                      />
                      <Input
                        label="Número de identificação"
                        value={formData.identification_number}
                        onChange={(v) =>
                          updateField(
                            "identification_number",
                            v.replace(/\D/g, "").slice(0, 9)
                          )
                        }
                        error={errors.identification_number}
                        required
                        maxLength={9}
                        inputMode="numeric"
                      />
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">
                      Envio de Arquivos
                    </h2>
                    <p className="mt-2 text-sm text-slate-500">
                      Faça upload dos documentos pedidos para concluir a
                      candidatura.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-2">
                    <FileInput
                      label="CV"
                      onChange={(file) => updateField("cv_file", file)}
                      error={errors.cv_file}
                    />
                    <FileInput
                      label="Documento de identificação"
                      onChange={(file) =>
                        updateField("identification_file", file)
                      }
                      error={errors.identification_file}
                    />
                    <div className="md:col-span-2">
                      <FileInput
                        label="Certificado / comprovativo"
                        onChange={(file) =>
                          updateField("certificate_file", file)
                        }
                        error={errors.certificate_file}
                      />
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">
                      Revisão
                    </h2>
                    <p className="mt-2 text-sm text-slate-500">
                      Reveja os dados antes de submeter.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <ReviewItem
                        label="Nível de ensino"
                        value={selectedLevelName || "Não selecionado"}
                      />
                      <ReviewItem
                        label={selectionLabel}
                        value={selectedName || "Não selecionado"}
                      />
                      <ReviewItem
                        label="Nome"
                        value={
                          `${formData.first_name} ${formData.last_name}`.trim() ||
                          "—"
                        }
                      />
                      <ReviewItem label="Email" value={formData.email || "—"} />
                      <ReviewItem
                        label="Telefone"
                        value={formData.phone || "—"}
                      />
                      <ReviewItem
                        label="Data de nascimento"
                        value={formData.birth_date || "—"}
                      />
                      <ReviewItem
                        label="Número de identificação"
                        value={formData.identification_number || "—"}
                      />
                    </div>

                    <label className="mt-6 flex items-start gap-3 rounded-xl border border-slate-200 p-4 text-sm text-slate-600">
                      <input
                        type="checkbox"
                        checked={formData.terms}
                        onChange={(e) => updateField("terms", e.target.checked)}
                        className="mt-1"
                      />
                      <span>
                        Confirmo que os dados estão corretos e aceito os termos
                        da candidatura.
                      </span>
                    </label>

                    {errors.terms && (
                      <p className="mt-2 text-sm text-red-500">
                        {errors.terms}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">
                      Confirmação
                    </h2>
                    <p className="mt-2 text-sm text-slate-500">
                      A sua candidatura foi submetida com sucesso.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-[#d8ebfb] bg-[#f7fbff] p-6 shadow-sm">
                    <h3 className="text-lg font-bold text-slate-900">
                      Resumo final
                    </h3>

                    {selectedLevelName && (
                      <p className="mt-2 text-sm text-slate-600">
                        Nível escolhido: <strong>{selectedLevelName}</strong>
                      </p>
                    )}

                    <p className="mt-2 text-sm text-slate-600">
                      Submeteu uma candidatura para{" "}
                      <strong>{selectedName || "uma opção por selecionar"}</strong>.
                    </p>
                  </div>
                </div>
              )}

              <div className="mt-8 flex flex-col gap-4 border-t border-slate-200 pt-6 md:flex-row md:items-center md:justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={currentStep === 1 || currentStep === 4}
                  className="rounded-xl border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Voltar
                </button>

                <div className="text-center text-sm text-slate-500">
                  Passo {currentStep} de 4
                </div>

                {currentStep < 3 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="rounded-xl bg-[#0d8fe8] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                  >
                    Próximo
                  </button>
                ) : currentStep === 3 ? (
                  <button
                    type="submit"
                    className="rounded-xl bg-[#0d8fe8] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                  >
                    Submeter candidatura
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setPage("home")}
                    className="rounded-xl bg-[#0d8fe8] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                  >
                    Voltar ao início
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

function Input({
  label,
  value,
  onChange,
  error,
  required = false,
  type = "text",
  maxLength,
  inputMode,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        value={value}
        maxLength={type === "date" ? 10 : maxLength}
        inputMode={inputMode}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-[#0d8fe8]"
      />
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
}

function FileInput({ label, onChange, error }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-700">
        {label}
      </label>
      <input
        type="file"
        onChange={(e) => onChange(e.target.files[0])}
        className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition file:mr-4 file:rounded-lg file:border-0 file:bg-[#eef7fe] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-[#0d8fe8]"
      />
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
}

function ReviewItem({ label, value }) {
  return (
    <div className="rounded-xl border border-slate-200 p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </p>
      <p className="mt-2 text-sm font-medium text-slate-800">{value}</p>
    </div>
  );
}