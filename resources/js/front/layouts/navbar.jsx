import React, { useState } from "react";
import { Link, router } from "@inertiajs/react";

function NavItem({ href, children }) {
  return (
    <Link href={href} className="text-sm text-gray-700 hover:text-gray-900">
      {children}
    </Link>
  );
}

function BlueNavItem({ href, children }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 px-6 py-4 text-sm font-semibold text-white/95 hover:bg-white/10 border-r border-white/10"
    >
      {children}
      <span className="text-white/80">▾</span>
    </Link>
  );
}

export default function Navbar() {
  const [q, setQ] = useState("");

  function onSearch(e) {
    e.preventDefault();
    const query = q.trim();
    router.get("/search", query ? { q: query } : {}, { preserveState: true, replace: true });
  }

  return (
    <header className="w-full">
      {/* a barra do topo branca */}
      <div className="bg-white border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-10 py-3 flex items-center justify-between">
          {/* Logo area */}
          <Link href="/" className="flex items-center gap-3 no-underline">
            {/* placeholder "logo" */}
            <div className="h-10 w-10 rounded bg-gray-200" />
            <div className="leading-tight">
              <div className="text-2xl font-bold text-gray-900">ISTEC</div>
              <div className="text-xs text-gray-500 -mt-1">
                Instituto Superior de Tecnologias Avançadas do Porto
              </div>
            </div>
          </Link>

          {/* links */}
          <div className="flex items-center gap-6">
            <nav className="flex items-center gap-6">
              <NavItem href="/sobre">Sobre o ISTEC</NavItem>
              <NavItem href="/contactos">Contactos Instituição</NavItem>
              <NavItem href="/istec-lisboa">ISTEC Lisboa</NavItem>
            </nav>

            <div className="flex items-center gap-4">
              <Link href="/area-privada" className="text-sm font-semibold text-gray-900 hover:underline">
                Área Privada <span className="opacity-70">▾</span>
              </Link>

              <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <button type="button" className="hover:text-gray-900">PT</button>
                <span className="text-gray-300">|</span>
                <button type="button" className="hover:text-gray-900">EN</button>
              </div>

              {/* icon de pesquisa */}
              <form onSubmit={onSearch} className="flex items-center gap-2">
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Pesquisar..."
                  className="w-44 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)]"
                />
                <button
                  type="submit"
                  className="grid h-8 w-8 place-items-center rounded-full bg-gray-100 hover:bg-gray-200"
                  aria-label="Pesquisar"
                >
                  🔍
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* a barra azul*/}
      <div className="bg-[#128ACB]">
        <div className="mx-auto max-w-7xl px-10">
          <nav className="flex items-center">
            <BlueNavItem href="/">ISTEC Porto</BlueNavItem>
            <BlueNavItem href="/courses">Cursos</BlueNavItem>
            <BlueNavItem href="/events">Eventos</BlueNavItem>
            <BlueNavItem href="/news">Notícias</BlueNavItem>
            <BlueNavItem href="/candidaturas">Candidaturas</BlueNavItem>
          </nav>
        </div>
      </div>
    </header>
  );
}