import { Head, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";

export default function BackofficeLayout({
  children,
  title,
  subtitle,
  searchPlaceholder,
}) {
  const { props } = usePage();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [title]);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(45,167,223,0.18),_transparent_30%),linear-gradient(180deg,_var(--color-brand-surface)_0%,_#ffffff_100%)] text-[var(--color-brand-black)]">
      <Head title={title} />

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="min-h-screen md:pl-72">
        <Topbar
          title={title}
          subtitle={subtitle}
          onMenuClick={() => setIsSidebarOpen(true)}
          searchPlaceholder={searchPlaceholder}
          user={props.user}
        />

        <main className="px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
