import "../css/app.css";
import "./bootstrap";
import { createInertiaApp, router } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createRoot } from "react-dom/client";
import { useEffect } from 'react';
import "./i18n"; // Imports our translation configuration file, which allows us to use our translations in our pages

const appName = import.meta.env.VITE_APP_NAME || "Laravel";
const pages = import.meta.glob([
  './front/pages/**/*.jsx',
  './back/pages/**/*.jsx',
]);

function useUmamiPageTracking() { // For umami analytics tracking on our SPA
    useEffect(() => {
        const handleVisit = () => {
            if (window.umami) {
                window.umami.trackView();
            }
        };

        router.on('finish', handleVisit);

        return () => {
            router.off('finish', handleVisit);
        };
    }, []);
}

createInertiaApp({
  // Entry point for our Inertia app
  title: (title) => `${title} - ${appName}`,
  resolve: (name) => {
    const page = resolvePageComponent(`./${name}.jsx`, pages);

    // Auto-assign layouts
    // if (name.startsWith("Back/")) {
    //   page.default.layout ??= (p) => <AdminLayout>{p}</AdminLayout>;
    // } else if (name.startsWith("Front/")) {
    //   page.default.layout ??= (p) => <MainLayout>{p}</MainLayout>;
    // }

    return page;
  },
  setup({ el, App, props }) {
    // Track Inertia navigation with Umami, apparently it needs to be in a hook. Check this later
    function AppWithTracking(props) {
        useUmamiPageTracking(); // call the hook here
        return <App {...props} />;
    }

    // Sets up the React application by rendering the App component into the DOM element provided by Inertia (el).
    createRoot(el).render(<AppWithTracking {...props} />);
  },
  progress: {
    color: "#2da7df" // light blue brandcolor
  }
});
