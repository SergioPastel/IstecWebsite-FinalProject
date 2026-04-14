import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { router } from '@inertiajs/react';
import Layout from "../../layouts/Layout";

export default function ApplicationsEvents({
  setPage,
  language,
  setLanguage,
  events = [],
}) {
  const { t } = useTranslation();
  const steps = [
    t("applicationsForm.event.steps.1"),
    t("applicationsForm.event.steps.2"),
    t("applicationsForm.event.steps.3"),
  ];
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    event_category: "",
    applicable_id: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    birth_date: "",
    identification_number: "",
    terms: false,
  });

  const eventCategories = useMemo(
    () => [
      {
        id: "all-events",
        title: t("applicationsForm.event.categoryAll"),
        events,
      },
    ],
    [events, t]
  );

  const availableEvents = useMemo(() => {
    if (!formData.event_category) return [];
    const selectedCategory = eventCategories.find(
      (category) => category.id === formData.event_category
    );
    return selectedCategory ? selectedCategory.events : [];
  }, [formData.event_category, eventCategories]);

  const selectedCategoryName = useMemo(() => {
    if (!formData.event_category) return "";
    const selectedCategory = eventCategories.find(
      (category) => category.id === formData.event_category
    );
    return selectedCategory?.title || "";
  }, [formData.event_category, eventCategories]);

  const selectedEventName = useMemo(() => {
    if (!formData.applicable_id) return "";
    const found = availableEvents.find(
      (item) => String(item.id) === String(formData.applicable_id)
    );
    return found?.title || "";
  }, [formData.applicable_id, availableEvents]);

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const isValidIdentificationNumber = (value) => {
    return /^\d{9}$/.test(value);
  };

  const validateStep1 = () => {
    const newErrors = {};

    if (!formData.event_category) {
      newErrors.event_category = t("applicationsForm.common.requiredField");
    }

    if (!formData.applicable_id) {
      newErrors.applicable_id = t("applicationsForm.common.requiredField");
    }

    if (!formData.first_name) {
      newErrors.first_name = t("applicationsForm.common.requiredField");
    }

    if (!formData.last_name) {
      newErrors.last_name = t("applicationsForm.common.requiredField");
    }

    if (!formData.email) {
      newErrors.email = t("applicationsForm.common.requiredField");
    }

    if (!formData.phone) {
      newErrors.phone = t("applicationsForm.common.requiredField");
    }

    if (!formData.birth_date) {
      newErrors.birth_date = t("applicationsForm.common.requiredField");
    }

    if (!formData.identification_number) {
      newErrors.identification_number = t("applicationsForm.common.requiredField");
    } else if (!isValidIdentificationNumber(formData.identification_number)) {
      newErrors.identification_number =
        t("applicationsForm.event.invalidIdentificationNumber");
    }

    setErrors((prev) => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};

    if (!formData.terms) {
      newErrors.terms = t("applicationsForm.common.acceptTerms");
    }

    setErrors((prev) => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (currentStep === 1 && !validateStep1()) return;
    if (currentStep < 3) setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentStep === 2) {
      if (!validateStep2()) return;
      setCurrentStep(3);
    } else if (currentStep === 3) {
      // Submit the application
      const data = {
        event_id: formData.applicable_id,
        full_name: `${formData.first_name} ${formData.last_name}`,
        email: formData.email,
        phone: formData.phone,
      };
      router.post('/applications/events', data);
    }
  };

  const pageTitle = t("applicationsForm.event.pageTitle");

  return (
    <Layout title={pageTitle}>
      <main className="min-h-screen bg-[#f6f8fb] pt-[140px] pb-12">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-6 py-5 sm:px-10">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#0d8fe8]">
                    {t("applicationsForm.common.sectionLabel")}
                  </p>
                  <h1 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
                    {t("applicationsForm.event.pageTitle")}
                  </h1>
                  <p className="mt-2 text-sm text-slate-500">
                    {t("applicationsForm.event.pageDescription")}
                  </p>
                </div>

                <div className="rounded-xl bg-[#eef7fe] px-4 py-3 text-sm text-slate-700">
                  <span className="font-semibold text-slate-900">
                    {t("applicationsForm.common.typeLabel")}:
                  </span>{" "}
                  {t("applicationsForm.event.typeValue")}
                </div>
              </div>
            </div>

            <div className="border-b border-slate-200 bg-white px-4 py-8 sm:px-10">
              <div className="grid grid-cols-3 gap-6">
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
                        {t("applicationsForm.common.stepLabel")} {stepNumber}
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
                      {t("applicationsForm.event.sectionOneTitle")}
                    </h2>
                    <p className="mt-2 text-sm text-slate-500">
                      {t("applicationsForm.event.sectionOneDescription")}
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
                          {t("applicationsForm.event.categoryLabel")} <span className="text-red-500">*</span>
                        </label>

                        <select
                          value={formData.event_category}
                          onChange={(e) => {
                            updateField("event_category", e.target.value);
                            updateField("applicable_id", "");
                          }}
                          className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-[#0d8fe8]"
                        >
                          <option value="">{t("applicationsForm.event.selectCategoryOption")}</option>
                          {eventCategories.map((category) => (
                            <option key={category.id} value={category.id}>
                              {category.title}
                            </option>
                          ))}
                        </select>

                        {errors.event_category && (
                          <p className="mt-2 text-sm text-red-500">
                            {errors.event_category}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                          {t("applicationsForm.event.desiredEventLabel")} <span className="text-red-500">*</span>
                        </label>

                        <select
                          value={formData.applicable_id}
                          onChange={(e) =>
                            updateField("applicable_id", e.target.value)
                          }
                          disabled={!formData.event_category}
                          className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-[#0d8fe8] disabled:bg-slate-100 disabled:text-slate-400"
                        >
                          <option value="">
                            {formData.event_category
                              ? t("applicationsForm.event.selectEventOption")
                              : t("applicationsForm.event.selectCategoryFirstOption")}
                          </option>

                          {availableEvents.map((event) => (
                            <option key={event.id} value={event.id}>
                              {event.title}
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
                        {t("applicationsForm.event.personalInfoHeading")}
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 gap-5 p-6 md:grid-cols-2">
                      <Input
                        label={t("applicationsForm.common.firstName")}
                        value={formData.first_name}
                        onChange={(v) => updateField("first_name", v)}
                        error={errors.first_name}
                        required
                      />
                      <Input
                        label={t("applicationsForm.common.lastName")}
                        value={formData.last_name}
                        onChange={(v) => updateField("last_name", v)}
                        error={errors.last_name}
                        required
                      />
                      <Input
                        label={t("applicationsForm.common.email")}
                        type="email"
                        value={formData.email}
                        onChange={(v) => updateField("email", v)}
                        error={errors.email}
                        required
                      />
                      <Input
                        label={t("applicationsForm.common.phone")}
                        value={formData.phone}
                        onChange={(v) => updateField("phone", v)}
                        error={errors.phone}
                        required
                      />
                      <Input
                        label={t("applicationsForm.common.birthDate")}
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
                        label={t("applicationsForm.common.identificationNumber")}
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
                      {t("applicationsForm.event.sectionThreeTitle")}
                    </h2>
                    <p className="mt-2 text-sm text-slate-500">
                      {t("applicationsForm.event.sectionThreeDescription")}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <ReviewItem
                        label={t("applicationsForm.event.reviewCategory")}
                        value={selectedCategoryName || t("applicationsForm.common.notSelected")}
                      />
                      <ReviewItem
                        label={t("applicationsForm.event.reviewEvent")}
                        value={selectedEventName || t("applicationsForm.common.notSelected")}
                      />
                      <ReviewItem
                        label={t("applicationsForm.common.name")}
                        value={
                          `${formData.first_name} ${formData.last_name}`.trim() ||
                          t("applicationsForm.common.noValue")
                        }
                      />
                      <ReviewItem
                        label={t("applicationsForm.common.email")}
                        value={formData.email || t("applicationsForm.common.noValue")}
                      />
                      <ReviewItem
                        label={t("applicationsForm.common.phone")}
                        value={formData.phone || t("applicationsForm.common.noValue")}
                      />
                      <ReviewItem
                        label={t("applicationsForm.common.birthDate")}
                        value={formData.birth_date || t("applicationsForm.common.noValue")}
                      />
                      <ReviewItem
                        label={t("applicationsForm.common.identificationNumber")}
                        value={formData.identification_number || t("applicationsForm.common.noValue")}
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

              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">
                      {t("applicationsForm.event.sectionFourTitle")}
                    </h2>
                    <p className="mt-2 text-sm text-slate-500">
                      {t("applicationsForm.event.sectionFourDescription")}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-[#d8ebfb] bg-[#f7fbff] p-6 shadow-sm">
                    <h3 className="text-lg font-bold text-slate-900">
                      {t("applicationsForm.event.finalSummaryTitle")}
                    </h3>

                    {selectedCategoryName && (
                      <p className="mt-2 text-sm text-slate-600">
                        {t("applicationsForm.event.selectedCategoryLabel")} <strong>{selectedCategoryName}</strong>
                      </p>
                    )}

                    <p className="mt-2 text-sm text-slate-600">
                      {t("applicationsForm.event.submittedFor")} <strong>{selectedEventName || t("applicationsForm.common.noSelection")}</strong>.
                    </p>
                  </div>
                </div>
              )}

              <div className="mt-8 flex flex-col gap-4 border-t border-slate-200 pt-6 md:flex-row md:items-center md:justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={currentStep === 1 || currentStep === 3}
                  className="rounded-xl border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {t("applicationsForm.common.back")}
                </button>

                <div className="text-center text-sm text-slate-500">
                  {t("applicationsForm.common.stepCounter", { current: currentStep, total: 3 })}
                </div>

                {currentStep === 1 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="rounded-xl bg-[#0d8fe8] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                  >
                    {t("applicationsForm.common.next")}
                  </button>
                ) : currentStep === 2 ? (
                  <button
                    type="submit"
                    className="rounded-xl bg-[#0d8fe8] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                  >
                    {t("applicationsForm.common.next")}
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="rounded-xl bg-[#0d8fe8] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                  >
                    {t("applicationsForm.common.submitApplication")}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </main>
    </Layout>
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