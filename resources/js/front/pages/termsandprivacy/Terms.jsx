import React from "react";
import { useTranslation } from "react-i18next";
import Layout from "../../layouts/Layout";

export default function Terms() {
  const { t } = useTranslation();

  return (
    <Layout title="Termos e Condições">
      <main className="min-h-screen bg-[#f6f8fb] pt-[140px] pb-16">
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-6 py-8 sm:px-10">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#0d8fe8]">
                Informação Legal
              </p>
              <h1 className="mt-2 text-3xl font-bold text-slate-900">
                Termos e Condições
              </h1>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-500">
                Estes Termos e Condições regulam a utilização deste website e
                dos formulários disponibilizados pelo ISTEC Porto.
              </p>
            </div>

            <div className="space-y-8 px-6 py-8 sm:px-10">
              <section>
                <h2 className="text-xl font-bold text-slate-900">1. Objeto</h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  O presente website tem como finalidade disponibilizar
                  informação institucional, académica e administrativa,
                  incluindo conteúdos sobre cursos, eventos, notícias e
                  candidaturas.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900">
                  2. Utilização do website
                </h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  O utilizador compromete-se a utilizar este website de forma
                  responsável, lícita e em conformidade com a legislação
                  aplicável, abstendo-se de praticar qualquer ato que possa
                  comprometer a segurança, integridade ou funcionamento da
                  plataforma.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900">
                  3. Conteúdos e informação
                </h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  O ISTEC Porto procura garantir que toda a informação
                  disponibilizada neste website é clara, rigorosa e atualizada.
                  Ainda assim, poderá proceder a alterações de conteúdos,
                  horários, ofertas formativas, eventos ou outras informações
                  sem aviso prévio.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900">
                  4. Candidaturas e formulários
                </h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  O preenchimento e submissão de formulários através deste
                  website não dispensa a verificação posterior dos dados
                  submetidos nem substitui eventuais procedimentos
                  administrativos exigidos pela instituição.
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  O utilizador declara que os dados fornecidos são verdadeiros,
                  completos e atualizados, sendo responsável por qualquer erro
                  ou omissão na informação submetida.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900">
                  5. Propriedade intelectual
                </h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  Os conteúdos deste website, incluindo textos, imagens,
                  elementos gráficos, logótipos e estrutura, estão protegidos
                  por direitos de propriedade intelectual e não podem ser
                  reproduzidos, distribuídos ou utilizados sem autorização
                  prévia, salvo nos casos legalmente permitidos.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900">
                  6. Limitação de responsabilidade
                </h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  O ISTEC Porto não se responsabiliza por interrupções
                  temporárias do serviço, falhas técnicas, indisponibilidade da
                  plataforma ou danos resultantes de utilização indevida do
                  website por parte do utilizador ou de terceiros.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900">
                  7. Ligações externas
                </h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  Sempre que este website contenha ligações para páginas
                  externas, o ISTEC Porto não se responsabiliza pelos conteúdos,
                  políticas ou práticas desses websites de terceiros.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900">
                  8. Alterações aos termos
                </h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  O ISTEC Porto reserva-se o direito de alterar os presentes
                  Termos e Condições a qualquer momento. As alterações entram em
                  vigor após a sua publicação no website.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900">
                  9. Contactos
                </h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  Para qualquer questão relacionada com a utilização deste
                  website, o utilizador poderá entrar em contacto através dos
                  meios disponibilizados na página de contactos.
                </p>
              </section>

              <section className="rounded-xl bg-slate-50 p-4 text-sm text-slate-500">
                Última atualização: {new Date().getFullYear()}
              </section>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}