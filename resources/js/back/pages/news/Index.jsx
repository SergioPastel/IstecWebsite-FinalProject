import Layout from '../layouts/layout';
import { useTranslation } from 'react-i18next';
import { Link } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';

export default function NewsIndexBack({ news }) {
  const { t } = useTranslation();

  function handleDelete(newsId) {
    // ADD I18N TRANSLATION TO THIS MESSAGE!!!
    if (confirm('Tem certeza que deseja deletar esta noticia?')) {
        Inertia.delete(route('news.destroy', { news: newsId }));
    }
  }

/**
 * Component properties, when coming from the server, may be wraped with 'data'
 * key, such as a collection of resources. Single resources remain unwraped
 * (see more in resource classes)
 *
 * As such, to map news data, acces is given through 'news.data', and
 * not 'news', as seen in the example below
 */
  return (
    <Layout>
      <h1>{t("language")} ADMIN</h1>

      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">News</h1>


        {news.length === 0 ? (
          <p>No news available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((news) => (
              <div
                key={news.id}
                className="border rounded-lg p-4 shadow-sm hover:shadow-md transition"
              >
                <h2 className="text-xl font-semibold">{news.title.pt}</h2>

                {news.description && (
                  <p className="text-gray-600 mt-2">{news.description.pt}</p>
                )}

                <div className="mt-4 text-sm text-gray-500">
                  ID: {news.id}
                </div>

                <Link href={route('news.edit', { news: news.id })}>Editar noticia</Link><br />
                <button type="button" onClick={() => handleDelete(news.id)}>DELETAR noticias</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
