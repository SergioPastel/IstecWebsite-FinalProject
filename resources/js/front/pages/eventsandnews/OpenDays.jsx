import React from "react";
import { Link } from "@inertiajs/react";
import Layout from "../../layouts/Layout";
import { route } from "ziggy-js";

export default function OpenDays({ events = { data: [] } }) {
  const items = Array.isArray(events?.data) ? events.data : [];

  return (
    <Layout title="Open Days">
      <main
        className="w-full overflow-x-hidden bg-white text-[#1f2937]"
        onClick={() => {
          window.dispatchEvent(new Event("closeDropdowns"));
        }}
      >
        <section className="w-full mt-[120px]">
          <div className="bg-gradient-to-r from-[#0b7fd1] to-[#1597ec] text-white">
            <div className="max-w-[1600px] mx-auto px-6 min-h-[420px] flex items-center">
              <div className="max-w-[760px]">
                <p className="text-[0.82rem] font-extrabold tracking-[1.8px] uppercase text-white/80 mb-4">
                  Eventos & Notícias
                </p>

                <h1 className="text-[clamp(2.6rem,4.5vw,4.2rem)] leading-[1.08] font-extrabold tracking-[-1px]">
                  Open Days
                </h1>

                <p className="mt-5 text-[1.04rem] leading-[1.8] text-white/90 max-w-[620px]">
                  Descobre mais sobre os nossos open days, visitas e oportunidades
                  para conhecer o ambiente académico.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="pb-16 pt-10">
          <div className="max-w-[1600px] mx-auto px-6">
            <div className="mb-8">
              <p className="inline-block text-[0.8rem] font-extrabold uppercase tracking-[1.2px] text-[#0d8fe8] mb-[10px]">
                Categoria
              </p>

              <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] leading-[1.15] tracking-[-0.5px] font-extrabold">
                Todos os Open Days
              </h2>
            </div>

            <div className="grid grid-cols-3 gap-6 max-[1150px]:grid-cols-2 max-[768px]:grid-cols-1">
              {items.map((item) => (
                <article
                  key={item.id}
                  className="group min-h-full bg-white border border-[#dbe4ee] rounded-[24px] overflow-hidden shadow-[0_10px_30px_rgba(15,23,42,0.05)] hover:-translate-y-1.5 hover:shadow-[0_18px_40px_rgba(15,23,42,0.08)] transition-all duration-300 flex flex-col"
                >
                  <div className="relative h-[240px] overflow-hidden bg-[#eae6df]">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
                    />

                    <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                      <span className="inline-flex items-center min-h-[32px] px-3 py-[6px] rounded-full text-[0.76rem] font-extrabold bg-white/90 text-[#111827] backdrop-blur-sm">
                        Evento
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <span className="inline-flex self-start items-center min-h-[30px] px-3 py-[6px] rounded-full text-[0.78rem] font-extrabold bg-[#eef6ff] text-[#0d8fe8]">
                      {item.type || "Open Day"}
                    </span>

                    <p className="mt-4 mb-3 text-[0.95rem] font-bold text-[#4b5563]">
                      {item.date || "Data a anunciar"} •{" "}
                      {item.location || "Local a anunciar"}
                    </p>

                    <h3 className="text-[1.22rem] leading-[1.3] font-bold text-[#111827]">
                      {item.title || "Título do Open Day"}
                    </h3>

                    <p className="mt-4 text-[#6b7280] leading-[1.75]">
                      {item.description ||
                        "Fica a saber mais sobre este open day e descobre tudo o que a experiência tem para oferecer."}
                    </p>

                    <Link
                      href={route("events.show", item.id)}
                      className="inline-flex items-center gap-2 mt-auto pt-6 font-bold text-[#0d8fe8] hover:underline text-left"
                    >
                      Ver detalhes
                      <span className="transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            {items.length === 0 && (
              <div className="bg-white border border-[#dbe4ee] rounded-[24px] p-12 text-center shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
                <h3 className="text-[1.8rem] font-bold text-[#111827]">
                  Não existem open days disponíveis
                </h3>
                <p className="mt-3 text-[#6b7280] leading-[1.7]">
                  De momento não existem open days para mostrar.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
    </Layout>
  );
}