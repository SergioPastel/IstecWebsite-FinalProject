import React from "react";
import Layout from "../layouts/Layout";

export default function Privacy() {
  return (
    <Layout title="Política de Privacidade">
      <main className="min-h-screen bg-[#f6f8fb] pt-[140px] pb-16">
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-6 py-8 sm:px-10">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#0d8fe8]">
                Proteção de Dados
              </p>
              <h1 className="mt-2 text-3xl font-bold text-slate-900">
                Política de Privacidade
              </h1>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-500">
                Esta Política de Privacidade explica como os dados pessoais
                recolhidos através deste website são tratados pelo ISTEC Porto.
              </p>
            </div>

            <div className="space-y-8 px-6 py-8 sm:px-10">
              <section>
                <h2 className="text-xl font-bold text-slate-900">
                  1. Responsável pelo tratamento
                </h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  O responsável pelo tratamento dos dados pessoais recolhidos
                  através deste website é o ISTEC Porto, no âmbito das suas
                  atividades institucionais, académicas e administrativas.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900">
                  2. Dados recolhidos
                </h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  Poderão ser recolhidos dados como nome, email, contacto
                  telefónico, data de nascimento, número de identificação e
                  outros elementos necessários ao processamento de pedidos,
                  candidaturas ou contactos efetuados pelo utilizador.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900">
                  3. Finalidade da recolha
                </h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  Os dados pessoais são recolhidos para gestão de candidaturas,
                  inscrição em eventos, resposta a pedidos de contacto,
                  prestação de informações institucionais e cumprimento de
                  obrigações legais aplicáveis.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900">
                  4. Fundamento de licitude
                </h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  O tratamento dos dados poderá basear-se no consentimento do
                  titular, na execução de diligências pré-contratuais, no
                  cumprimento de obrigações legais ou no interesse legítimo da
                  instituição, conforme aplicável em cada situação.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900">
                  5. Conservação dos dados
                </h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  Os dados pessoais serão conservados apenas pelo período
                  necessário para as finalidades que motivaram a sua recolha,
                  sem prejuízo dos prazos legais de conservação obrigatória.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900">
                  6. Partilha de dados
                </h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  Os dados pessoais não serão vendidos nem cedidos a terceiros,
                  exceto quando tal seja necessário para cumprimento de
                  obrigações legais, processamento administrativo ou prestação
                  de serviços essenciais ao funcionamento da instituição.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900">
                  7. Direitos do titular dos dados
                </h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  Nos termos da legislação aplicável, o titular dos dados pode
                  solicitar o acesso, retificação, apagamento, limitação do
                  tratamento, oposição ao tratamento e portabilidade dos seus
                  dados, quando aplicável.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900">
                  8. Segurança
                </h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  O ISTEC Porto adota medidas técnicas e organizativas adequadas
                  para proteger os dados pessoais contra perda, uso indevido,
                  acesso não autorizado, divulgação ou destruição.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900">
                  9. Contacto para questões de privacidade
                </h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  Para qualquer questão relacionada com privacidade ou proteção
                  de dados, o utilizador poderá contactar o ISTEC Porto através
                  dos canais oficiais disponibilizados no website.
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