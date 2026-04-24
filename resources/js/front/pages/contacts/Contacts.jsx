import Layout from "../../layouts/Layout";
import { router, useForm, usePage } from "@inertiajs/react";
import { route } from "ziggy-js";
import { useTranslation } from 'react-i18next';
import Banner from "../../components/common/Banner";

export default function Contacts({departmentContacts }) {
  const { flash } = usePage().props;

  const { t } = useTranslation();

  const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(data);
    console.log("URL:", route("contacts.store"));

    post(route("contacts.store"), {
      onStart: () => console.log("request started"),
      onFinish: () => console.log("request finished"),
      preserveScroll: true,
      onSuccess: () => reset(),
    });
  };

  return (
    <Layout title={t("contacts.contacts")}>
      <div className="min-h-screen bg-[#f3f5f8]">
        <main className="">

          {/* HERO */}
          <Banner >
            <div className="max-w-7xl mx-auto px-6 md:px-10">
              <p className="uppercase tracking-[0.2em] text-sm text-white/80 mb-4">
                ISTEC PORTO
              </p>

              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                {t("contacts.contacts")}
              </h1>

              <p className="text-lg md:text-xl text-white/90 max-w-2xl">
                {t("contacts.subtitle")}
              </p>
            </div>
          </Banner>

          {/* DEPARTAMENTOS */}
          <section className="bg-[#f3f5f8] py-16">
            <div className="mx-auto max-w-[1200px] px-6 md:px-10">
              <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold text-[#1697e6]">
                {t("contacts.departments")}
              </h2>
            </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {departmentContacts.map((dept, i) => (
                <div key={i} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 hover:shadow-[0_14px_34px_rgba(13,143,232,0.12)]">
                  <h3 className="min-h-[48px] font-bold text-slate-950">
            {dept.title}
          </h3>
                  <p className="text-sm text-gray-600 mb-4">{dept.email}</p>

                  <a
                    href={`mailto:${dept.email}`}
                    className="bg-[#1697e6] text-white px-4 py-2 rounded-full text-sm"
                  >
                    {t('contacts.sendEmail')}
                  </a>
                </div>
              ))}
            </div>
          </section>

          {/* MAPA */}
          <section className="pb-16 max-w-7xl mx-auto px-6 md:px-10">
            <h2 className="text-3xl font-bold text-[#1697e6] mb-6 text-center">
              {t("contacts.location")}
            </h2>

            <div className="rounded-2xl overflow-hidden shadow bg-white">
              <iframe
                src="https://www.google.com/maps?q=ISTEC%20Porto&output=embed"
                width="100%"
                height="400"
                style={{ border: 0 }}
                loading="lazy"
                title="Mapa"
              ></iframe>
            </div>
          </section>

          {/* FORM */}
          <section id="contact-form" className="bg-[#1697e6] py-16">
            <div className="max-w-3xl mx-auto px-6">
              <div className="bg-white p-8 rounded-2xl shadow">
                <h2 className="text-2xl font-bold text-[#1697e6] mb-6 text-center">
                  {t("contacts.message")}
                </h2>

                {flash?.success && (
                  <p className="text-green-600 mb-4 text-center">
                    {flash.success}
                  </p>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    value={data.name}
                    onChange={(e) => setData("name", e.target.value)}
                    placeholder={t('contacts.placeholders.name')}
                    className="w-full border p-3 rounded"
                  />
                  {errors.name && <p className="text-red-500">{errors.name}</p>}

                  <input
                    value={data.email}
                    onChange={(e) => setData("email", e.target.value)}
                    placeholder="Email"
                    className="w-full border p-3 rounded"
                  />
                  {errors.email && <p className="text-red-500">{errors.email}</p>}

                  <input
                    value={data.subject}
                    onChange={(e) => setData("subject", e.target.value)}
                    placeholder={t('contacts.placeholders.subject')}
                    className="w-full border p-3 rounded"
                  />
                  {errors.subject && <p className="text-red-500">{errors.subject}</p>}

                  <textarea
                    value={data.message}
                    onChange={(e) => setData("message", e.target.value)}
                    placeholder={t('contacts.placeholders.message')}
                    className="w-full border p-3 rounded"
                  />
                  {errors.message && (
                    <p className="text-red-500">{errors.message}</p>
                  )}

                  <button
                    disabled={processing}
                    className="bg-[#1697e6] text-white px-6 py-3 rounded-full"
                    type="submit"
                  >
                    {processing ? "A enviar..." : "Enviar mensagem"}
                  </button>
                </form>
              </div>
            </div>
          </section>
        </main>
      </div>
    </Layout>
  );
}
