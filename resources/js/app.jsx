import './bootstrap';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import './i18n' // Imports our translation configuration file, which allows us to use our translations in our pages

createInertiaApp({ // Entry point for our Inertia app
    resolve: name => { // Dynamically imports our pages based on the name provided by Inertia. Loads all pages between front and back
        const pages = import.meta.glob('./**/*.jsx', { eager: true }); // Vite feature that imports files based on a glob pattern. Eager loading will import all pages on startup rather than importing them when needed
        return pages[`./${name}.jsx`]; // Name comes from our backend and directs to the correct component
    },
    setup({ el, App, props }) { // Sets up the React application by rendering the App component into the DOM element provided by Inertia (el).
        createRoot(el).render(<App {...props} />);
    },
});