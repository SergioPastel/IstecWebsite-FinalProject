import Layout from "../layouts/layout";
import { useTranslation } from 'react-i18next';
import { Link } from "@inertiajs/react";

export default function EventsIndex({ events }) {
    const { t } = useTranslation();

    return (
        <Layout>
            <h1>{t("language")}</h1>

            <div className="container mx-auto p-6">
                <h1 className="text-3xl font-bold mb-6">Events</h1>


                {events.length === 0 ? (
                <p>No events available.</p>
                ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {events.data.map((event) => (
                    <div
                        key={event.id}
                        className="border rounded-lg p-4 shadow-sm hover:shadow-md transition"
                    >
                        <h2 className="text-xl font-semibold">{event.title.pt}</h2>

                        {event.description && (
                        <p className="text-gray-600 mt-2">{event.description.pt}</p>
                        )}

                        <div className="mt-4 text-sm text-gray-500">
                        ID: {event.id}
                        </div>

                        <Link href={route('events.show', { event: event.id })}>Link do curso</Link>
                    </div>
                    ))}
                </div>
                )}
            </div>
        </Layout>
    );
}
