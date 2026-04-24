import React, { useMemo, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Layout from "../../layouts/Layout";
import { Link, router, Head, usePage } from '@inertiajs/react';
import { route } from "ziggy-js";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";


export default function ApplicationsEvents({
  event,
  eventCategories = [],
}) {
  const { t } = useTranslation();
  const { flash = {}, errors: serverErrors = {} } = usePage().props;

  const steps = [
    t("applicationsForm.event.steps.1"),
    t("applicationsForm.event.steps.2"),
    t("applicationsForm.event.steps.3"),
  ];

  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});

  const successMessage = flash?.success;
  const errorMessage = flash?.error;
  const hasResult = Boolean(successMessage || errorMessage);

  const initialFormData = {
    event_category: "all",
    event_id: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    identification_number: "",
    terms: false,
  };

  const [formData, setFormData] = useState(initialFormData);

  const availableEvents = useMemo(() => {
    if (!formData.event_category) return [];

    if (formData.event_category === "all") {
      return eventCategories.flatMap((category) => category.events || []);
    }

    const selectedCategory = eventCategories.find(
      (category) => String(category.id) === String(formData.event_category)
    );

    return selectedCategory?.events || [];
  }, [formData.event_category, eventCategories]);

  const selectedCategoryName = useMemo(() => {
    if (!formData.event_category) return "";

    if (formData.event_category === "all") {
      return t("applicationsForm.event.categoryAll");
    }

    const selectedCategory = eventCategories.find(
      (category) => String(category.id) === String(formData.event_category)
    );

    return selectedCategory?.title || "";
  }, [formData.event_category, eventCategories, t]);

  const selectedEventName = useMemo(() => {
    if (!formData.event_id) return "";

    const found = availableEvents.find(
      (item) => String(item.id) === String(formData.event_id)
    );

    return found?.title || "";
  }, [formData.event_id, availableEvents]);

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const isValidIdentificationNumber = (value) => {
    return /^\d{9}$/.test(value);
  };

  const isValidEmail = (value) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const validateStep1 = () => {
    const newErrors = {};

    if (!formData.event_category) {
      newErrors.event_category = t("applicationsForm.common.requiredField");
    }

    if (!formData.event_id) {
      newErrors.event_id = t("applicationsForm.common.requiredField");
    }

    if (!formData.first_name) {
      newErrors.first_name = t("applicationsForm.common.requiredField");
    }

    if (!formData.last_name) {
      newErrors.last_name = t("applicationsForm.common.requiredField");
    }

    if (!formData.email) {
      newErrors.email = t("applicationsForm.common.requiredField");
    } else if (!isValidEmail(formData.email)) {
       newErrors.email = "Introduza um email válido.";
      }

    if (!formData.phone) {
      newErrors.phone = t("applicationsForm.common.requiredField");
    } else if (!isValidPhoneNumber(formData.phone)) {
      newErrors.phone = "Introduza um número de telefone válido.";
    }

    if (
      formData.identification_number &&
      !isValidIdentificationNumber(formData.identification_number)
    ) {
      newErrors.identification_number = t(
        "applicationsForm.event.invalidIdentificationNumber"
      );
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
    if (currentStep < 2) setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    if (currentStep > 1 && !hasResult) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateStep2()) return;

    const data = { // takes formData and maps it to the expected backend format
      event_id: formData.event_id,
      full_name: `${formData.first_name} ${formData.last_name}`,
      email: formData.email,
      phone: formData.phone,
      identification_number: formData.identification_number,
    };

    router.post(route("applications.events.store"), data, { preserveScroll: true });
  };

  useEffect(() => {
    if (event) {
      setFormData((prev) => ({
        ...prev,
        event_category: event.event_category_id
          ? String(event.event_category_id)
          : "all",
        event_id: event.id ? String(event.id) : "",
      }));
    }
  }, [event]);

  useEffect(() => {
    if (serverErrors && Object.keys(serverErrors).length > 0) {
      setErrors(serverErrors);
    }
  }, [serverErrors]);

  useEffect(() => {
    if (hasResult) {
      setCurrentStep(3);
    }
  }, [hasResult]);

  const resetForm = () => {
    setCurrentStep(1);
    setErrors({});
    setFormData({ ...initialFormData });
    router.reload({ preserveScroll: true });
  };

  const pageTitle = t("applicationsForm.event.pageTitle");
  const displayStep = hasResult ? 3 : currentStep;

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
                    {pageTitle}
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
                  const active = displayStep === stepNumber;
                  const completed = displayStep > stepNumber;

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

            {!hasResult ? (
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
                          {t("applicationsForm.event.stepHeading")}
                        </h3>
                      </div>

                      <div className="space-y-5 p-6">
                        <div>
                          <label className="mb-2 block text-sm font-semibold text-slate-700">
                            {t("applicationsForm.event.categoryLabel")}{" "}
                            <span className="text-red-500">*</span>
                          </label>

                          <select
                            value={formData.event_category}
                            onChange={(e) => {
                              updateField("event_category", e.target.value);
                              updateField("event_id", "");
                            }}
                            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-[#0d8fe8]"
                          >
                            <option value="all">
                              {t("applicationsForm.event.categoryAll")}
                            </option>
                            {eventCategories.map((category) => (
                              <option key={category.id} value={String(category.id)}>
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
                            {t("applicationsForm.event.desiredEventLabel")}{" "}
                            <span className="text-red-500">*</span>
                          </label>

                          <select
                            value={formData.event_id}
                            onChange={(e) =>
                              updateField("event_id", e.target.value)
                            }
                            disabled={!formData.event_category}
                            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-[#0d8fe8] disabled:bg-slate-100 disabled:text-slate-400"
                          >
                            <option value="">
                              {formData.event_category
                                ? t("applicationsForm.event.selectEventOption")
                                : t("applicationsForm.event.selectCategoryFirstOption")}
                            </option>

                            {availableEvents.map((eventItem) => (
                              <option key={eventItem.id} value={String(eventItem.id)}>
                                {eventItem.title}
                              </option>
                            ))}
                          </select>

                          {errors.event_id && (
                            <p className="mt-2 text-sm text-red-500">
                              {errors.event_id}
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
                        <div>
                          <label className="mb-2 block text-sm font-semibold text-slate-700">
                            {t("applicationsForm.common.phone")} <span className="text-red-500">*</span>
                          </label>

                          <div className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus-within:border-[#0d8fe8]">
                            <PhoneInput
                              international
                              defaultCountry="PT"
                              value={formData.phone}
                              onChange={(value) => updateField("phone", value || "")}
                              className="w-full"
                            />
                          </div>

                          {errors.phone && (
                            <p className="mt-2 text-sm text-red-500">{errors.phone}</p>
                          )}
                       </div>
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
                        {t("applicationsForm.common.acceptPrefix")}{" "}

                        <Link
                          href={route("terms")}
                          className="text-[#0d8fe8] underline hover:opacity-80"
                        >
                          {t("applicationsForm.common.terms")}
                        </Link>{" "}

                        {t("applicationsForm.common.and")}{" "}

                        <Link
                          href={route("privacy")}
                          className="text-[#0d8fe8] underline hover:opacity-80"
                        >
                          {t("applicationsForm.common.privacy")}
                        </Link>
                        .
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

                <div className="mt-8 flex flex-col gap-4 border-t border-slate-200 pt-6 md:flex-row md:items-center md:justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    className="rounded-xl border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {t("applicationsForm.common.back")}
                  </button>

                  <div className="text-center text-sm text-slate-500">
                    {t("applicationsForm.common.stepCounter", {
                      current: currentStep,
                      total: 3,
                    })}
                  </div>

                  {currentStep === 1 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="rounded-xl bg-[#0d8fe8] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                    >
                      {t("applicationsForm.common.next")}
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={!formData.terms}
                      className="rounded-xl bg-[#0d8fe8] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      {t("applicationsForm.common.submitApplication")}
                    </button>
                  )}
                </div>
              </form>
            ) : (
              <div className="px-4 py-8 sm:px-10">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">
                      {t("applicationsForm.event.sectionThreeTitle")}
                    </h2>
                    <p className="mt-2 text-sm text-slate-500">
                      {successMessage || errorMessage}
                    </p>
                  </div>

                  {successMessage ? (
                    <div className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center">
                      <div className="text-5xl">🎉</div>
                      <h3 className="mt-4 text-2xl font-bold text-green-800">
                        {t(
                          "applicationsForm.event.successTitle",
                          "Application submitted"
                        )}
                      </h3>
                      <p className="mt-2 text-sm text-green-700">
                        {successMessage}
                      </p>
                      <p className="mt-4 text-sm text-slate-600">
                        {t(
                          "applicationsForm.event.successFollowUp",
                          "You will receive a confirmation message shortly."
                        )}
                      </p>
                    </div>
                  ) : (
                    <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
                      <div className="text-5xl">⚠️</div>
                      <h3 className="mt-4 text-2xl font-bold text-red-800">
                        {t(
                          "applicationsForm.event.errorTitle",
                          "Submission failed"
                        )}
                      </h3>
                      <p className="mt-2 text-sm text-red-700">{errorMessage}</p>
                      <p className="mt-4 text-sm text-slate-600">
                        {t(
                          "applicationsForm.event.errorFollowUp",
                          "Please try again."
                        )}
                      </p>
                    </div>
                  )}

                  <div className="flex justify-center">
                    <button
                      type="button"
                      onClick={resetForm}
                      className="rounded-xl bg-[#0d8fe8] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                    >
                      {t("applicationsForm.common.newApplication", "New application")}
                    </button>
                  </div>
                </div>
              </div>
            )}
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
