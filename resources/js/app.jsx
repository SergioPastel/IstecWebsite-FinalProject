import './bootstrap';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import './i18n' // Imports our translation configuration file, which allows us to use our translations in our pages

createInertiaApp({ // Entry point for our Inertia app
    resolve: name => { // Dynamically imports our pages based on the name provided by Inertia.
        const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true }); 
        return pages[`./Pages/${name}.jsx`]; // Returns the component for the requested page.
    },
    setup({ el, App, props }) { // Sets up the React application by rendering the App component into the DOM element provided by Inertia.
        createRoot(el).render(<App {...props} />);
    },
});