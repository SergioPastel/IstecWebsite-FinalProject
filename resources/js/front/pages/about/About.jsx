import Layout from "../../layouts/Layout";
import { useForm, usePage } from "@inertiajs/react";
import { useTranslation } from 'react-i18next';

export default function About() {
  const { t } = useTranslation();

  return (
    <Layout title={t("about.metaTitle", "Sobre ISTEC")}>
      <main className="w-full bg-white text-[#1f2937]">

        {/* HERO */}
        <section className="mt-[120px]">
          <div className="bg-gradient-to-r from-[#0b7fd1] to-[#1597ec] text-white">
            <div className="max-w-[1600px] mx-auto px-6 py-20">
              <p className="text-sm uppercase tracking-[2px] font-extrabold text-white/80 mb-4">
                {t("about.hero.label", "Instituição")}
              </p>

              <h1 className="text-[clamp(2.5rem,4vw,4rem)] font-extrabold leading-tight">
                {t("about.hero.title", "Sobre o ISTEC Porto")}
              </h1>

              <p className="mt-6 max-w-[700px] text-white/90 leading-relaxed">
                {t(
                  "about.hero.description",
                  "O ISTEC Porto é uma instituição de ensino superior focada na inovação, na formação prática e na ligação direta ao mercado de trabalho."
                )}
              </p>
            </div>
          </div>
        </section>

        {/* SOBRE */}
        <section className="py-16">
          <div className="max-w-[1200px] mx-auto px-6">
            <h2 className="text-3xl font-extrabold mb-6">
              {t("about.section.aboutTitle", "Quem somos")}
            </h2>

            <p className="text-lg text-[#4b5563] leading-relaxed mb-6">
              {t(
                "about.section.aboutText1",
                "O ISTEC Porto integra uma rede de ensino superior orientada para a tecnologia, inovação e desenvolvimento de competências práticas."
              )}
            </p>

            <p className="text-lg text-[#4b5563] leading-relaxed">
              {t(
                "about.section.aboutText2",
                "A nossa missão passa por preparar profissionais qualificados, promovendo o contacto direto com o mercado e experiências reais ao longo do percurso académico."
              )}
            </p>
          </div>
        </section>

        {/* MISSÃO */}
        <section className="py-16 bg-[#f8fafc]">
          <div className="max-w-[1200px] mx-auto px-6">
            <h2 className="text-3xl font-extrabold mb-6">
              {t("about.section.missionTitle", "Missão e Valores")}
            </h2>

            <p className="text-lg text-[#4b5563] leading-relaxed mb-6">
              {t(
                "about.section.missionText1",
                "Promover uma formação de excelência baseada na inovação, proximidade ao estudante e ligação ao tecido empresarial."
              )}
            </p>

            <p className="text-lg text-[#4b5563] leading-relaxed">
              {t(
                "about.section.missionText2",
                "Valorizamos o rigor académico, a responsabilidade social e o desenvolvimento contínuo de competências."
              )}
            </p>
          </div>
        </section>

        {/* CONTACTO RÁPIDO */}
        <section className="py-16">
            <div className="max-w-[1200px] mx-auto px-6 text-center">
                <h2 className="text-3xl font-extrabold mb-4">
                {t("about.cta.title", "Queres saber mais?")}
                </h2>

                <p className="text-[#6b7280] mb-8">
                {t(
                    "about.cta.description",
                    "Entra em contacto connosco para mais informações sobre cursos, candidaturas ou a instituição."
                )}
                </p>

                <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                    href={route("contacts")}
                    className="inline-flex items-center justify-center bg-[#0d8fe8] text-white px-6 py-3 rounded-full font-bold hover:bg-[#0a78c4] transition"
                >
                    {t("about.cta.contactButton", "Contactar")}
                </Link>

                <Link
                    href={route("courses")}
                    className="inline-flex items-center justify-center border border-[#0d8fe8] text-[#0d8fe8] px-6 py-3 rounded-full font-bold hover:bg-[#eef6ff] transition"
                >
                    {t("about.cta.coursesButton", "Ver cursos")}
                </Link>
                </div>
            </div>
        </section>

      </main>
    </Layout>
  );
}