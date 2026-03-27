import Layout from '../layouts/Layout';
import { useTranslation } from 'react-i18next';
import { Link } from '@inertiajs/react';

export default function CoursesIndex({ courses }) {
  const { t } = useTranslation();

/**
 * Component properties, when coming from the server, may be wraped with 'data'
 * key, such as a collection of resources. Single resources remain unwraped
 * (see more in resource classes)
 *
 * As such, to map courses data, acces is given through 'courses.data', and
 * not 'courses', as seen in the example below
 */
  return (
    <Layout>
      <h1>{t("language")}</h1>

      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Courses</h1>


        {courses.data.length === 0 ? (
          <p>No courses available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.data.map((course) => (
              <div
                key={course.id}
                className="border rounded-lg p-4 shadow-sm hover:shadow-md transition"
              >
                <h2 className="text-xl font-semibold">{course.title}</h2>

                {course.description && (
                  <p className="text-gray-600 mt-2">{course.description}</p>
                )}

                <div className="mt-4 text-sm text-gray-500">
                  ID: {course.id}
                </div>

                <Link href={route('courses.show', { course: course.id })}>Link do curso</Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
