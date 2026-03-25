import Layout from "../layouts/layout";
import { useTranslation } from 'react-i18next';
import { Link } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";

export default function EventsIndexBack({ events }) {
    const { t } = useTranslation();

    function handleDelete(eventId) {
        // ADD I18N TRANSLATION TO THIS MESSAGE!!!
        if (confirm('Tem certeza que deseja deletar este evento?')) {
            Inertia.delete(route('events.destroy', { event: eventId }));
        }
    }

    return (
        <Layout>
            <h1>{t("language")}</h1>

            <div className="container mx-auto p-6">
                <h1 className="text-3xl font-bold mb-6">Events BACK</h1>


                {events.length === 0 ? (
                <p>No events available.</p>
                ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {events.map((event) => (
                    <div
                        key={event.id}
                        className="border rounded-lg p-4 shadow-sm hover:shadow-md transition"
                    >                        
                        <div className="mt-4 text-sm text-gray-500">
                        ID: {event.id}
                        </div>

                        <Link href={route('events.edit', { event: event.id })}>Editar evento</Link>
                        <button type="button" onClick={() => handleDelete(event.id)}>DELETAR evento</button>
                    </div>
                    ))}
                </div>
                )}
            </div>
        </Layout>
    );
}