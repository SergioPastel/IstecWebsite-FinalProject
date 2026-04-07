import React from "react";

export default function Footer({ language = "pt" }) {
  return (
    <footer className="mt-20 bg-black text-white">
      <div className="max-w-[1600px] mx-auto px-6 py-16">
        <div className="grid grid-cols-[1.45fr_0.9fr_1fr_1fr] gap-x-6 gap-y-10 max-[1100px]:grid-cols-2 max-[640px]:grid-cols-1">
          <div>
            <div className="mb-4">
              <h3 className="text-[1.4rem] font-bold tracking-[-0.4px]">
                ISTEC Porto
              </h3>
              <div className="mt-3 h-[2px] w-14 bg-[#0d8fe8]" />
            </div>

            <p className="max-w-[320px] text-gray-400 leading-7">
              Instituto Superior de Tecnologias Avançadas do Porto, com foco na
              inovação, formação prática e proximidade ao mercado.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-[1rem] font-semibold text-white">
              Navegação
            </h4>
            <ul className="space-y-3 text-gray-400">
              <li>
                <a
                  href="#"
                  className="transition-colors duration-300 hover:text-[#0d8fe8]"
                >
                  Início
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transition-colors duration-300 hover:text-[#0d8fe8]"
                >
                  Cursos
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transition-colors duration-300 hover:text-[#0d8fe8]"
                >
                  Eventos
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transition-colors duration-300 hover:text-[#0d8fe8]"
                >
                  Candidaturas
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-[1rem] font-semibold text-white">
              Contactos
            </h4>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-start gap-3">
                <span className="text-[#0d8fe8]">📍</span>
                <span>Porto, Portugal</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#0d8fe8]">📧</span>
                <span>geral@istec.pt</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#0d8fe8]">📞</span>
                <span>+351 222 000 000</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-[1rem] font-semibold text-white">
              Informações
            </h4>
            <ul className="space-y-3 text-gray-400">
              <li>
                <a
                  href="#"
                  className="transition-colors duration-300 hover:text-[#0d8fe8]"
                >
                  Política de Privacidade
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transition-colors duration-300 hover:text-[#0d8fe8]"
                >
                  Termos e Condições
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transition-colors duration-300 hover:text-[#0d8fe8]"
                >
                  Pedir Informações
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="max-w-[1600px] mx-auto px-6 py-5 flex items-center justify-between gap-3 text-sm text-gray-500 max-[640px]:flex-col max-[640px]:items-start">
          <span>
            © {new Date().getFullYear()} ISTEC Porto. Todos os direitos reservados.
          </span>

          <span>
            {language === "pt"
              ? "Desenvolvido para projeto académico"
              : "Developed for academic project"}
          </span>
        </div>
      </div>
    </footer>
  );
}