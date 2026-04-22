import { Head, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import FlashToasts from "../components/ui/FlashToast";
import "../styles/backoffice.css";

export default function BackofficeLayout({
  children,
  title,
  subtitle,
  searchPlaceholder,
}) {
  const { props } = usePage();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isDesktopSidebarCollapsed, setIsDesktopSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const savedState = window.localStorage.getItem("backoffice.sidebar.collapsed");
    setIsDesktopSidebarCollapsed(savedState === "true");
  }, []);

  useEffect(() => {
    setIsMobileSidebarOpen(false);
    setSearchQuery("");
  }, [title]);

  function handleDesktopSidebarToggle() {
    setIsDesktopSidebarCollapsed((currentValue) => {
      const nextValue = !currentValue;
      window.localStorage.setItem("backoffice.sidebar.collapsed", String(nextValue));
      return nextValue;
    });
  }

  const layoutPaddingClass = isDesktopSidebarCollapsed ? "md:pl-24" : "md:pl-72";
  const content =
    typeof children === "function" ? children({ searchQuery, setSearchQuery }) : children;

  return (
    <div className="backoffice-shell min-h-screen bg-[radial-gradient(circle_at_top,_rgba(45,167,223,0.18),_transparent_30%),linear-gradient(180deg,_var(--color-brand-surface)_0%,_#ffffff_100%)] text-[var(--color-brand-black)]">
      <FlashToasts />
      <Head title={title} />

      <Sidebar
        isOpen={isMobileSidebarOpen}
        isCollapsed={isDesktopSidebarCollapsed}
        onClose={() => setIsMobileSidebarOpen(false)}
        onToggleCollapse={handleDesktopSidebarToggle}
      />

      <div className={`min-h-screen transition-[padding] duration-300 ${layoutPaddingClass}`}>
        <Topbar
          title={title}
          subtitle={subtitle}
          onMenuClick={() => setIsMobileSidebarOpen(true)}
          onToggleSidebar={handleDesktopSidebarToggle}
          isSidebarCollapsed={isDesktopSidebarCollapsed}
          searchPlaceholder={searchPlaceholder}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          user={props.user}
        />

        <main className="px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">{content}</div>
        </main>
      </div>
    </div>
  );
}
