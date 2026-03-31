import Layout from '../layouts/layout';
import { useTranslation } from 'react-i18next';
import { Link, router, Head } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import Pagination from '../../components/common/Pagination';

function getCourseText(value, lang) {
    if (value == null) return '';
    if (typeof value === 'string') return value;
    if (typeof value === 'object') return value?.[lang] ?? value?.pt ?? value?.en ?? '';
    return String(value);
}


export default function CoursesIndex({ courses, categories, filters }) {
    const { i18n, t } = useTranslation();
    const lang = i18n.language?.startsWith('en') ? 'en' : 'pt';

    const [query, setQuery] = useState(filters?.q ?? '');
    const [category, setCategory] = useState(filters?.category ?? '');
    const [regime, setRegime] = useState(filters?.regime ?? '');
    const [sortBy, setSortBy] = useState('relevance');

    const resultsCount = courses?.total ?? (Array.isArray(courses) ? courses.length : 0);

    const courseItems = useMemo(() => {
        if (!courses) return [];
        if (Array.isArray(courses)) return courses;
        return courses.data ?? [];
    }, [courses]);

    const sortedCourseItems = useMemo(() => {
        const items = [...courseItems];

        if (sortBy === 'name_asc') {
            items.sort((a, b) => {
                const ta = getCourseText(a.title, lang).toLowerCase();
                const tb = getCourseText(b.title, lang).toLowerCase();
                return ta.localeCompare(tb, lang);
            });
        } else if (sortBy === 'name_desc') {
            items.sort((a, b) => {
                const ta = getCourseText(a.title, lang).toLowerCase();
                const tb = getCourseText(b.title, lang).toLowerCase();
                return tb.localeCompare(ta, lang);
            });
        }

        return items;
    }, [courseItems, sortBy, lang]);

    const applyFilters = (next = {}) => {
        router.get(
            route('courses'),
            {
                q: next.q ?? query ?? undefined,
                category: next.category ?? category ?? undefined,
                regime: next.regime ?? regime ?? undefined,
            },
            { preserveScroll: true, preserveState: true, replace: true }
        );
    };

    return (
        <Layout title={t("courses.title")}>
            <div className="w-full mt-20 bg-slate-50/60">
                <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 pb-12 pt-24 sm:px-6 lg:px-8">
                    {/* Header + search */}
                    <header className="space-y-4">
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-brand-primary)]">
                                    {t("courses.subtitle")}
                                </p>
                                <h1 className="mt-1 text-2xl font-semibold text-gray-900 sm:text-3xl">{t("courses.title")}</h1>
                                <p className="mt-1 text-sm text-gray-600 max-w-2xl">
                                    {t("courses.description")}
                                </p>
                            </div>
                            <div className="text-sm text-gray-500">
                                <span className="font-semibold text-gray-900">{resultsCount}</span>{' '}
                                {resultsCount === 1 ? t("courses.oneCourse") : t("courses.multipleCourses")}
                            </div>
                        </div>

                        <div className="relative">
                            <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-400">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    className="h-4 w-4"
                                >
                                    <circle cx="11" cy="11" r="7" />
                                    <line x1="16.5" y1="16.5" x2="21" y2="21" />
                                </svg>
                            </div>
                            <input
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') applyFilters({ q: e.currentTarget.value });
                                }}
                                placeholder={t("courses.searchPlaceholder")}
                                className="w-full rounded-xl border border-gray-200 bg-white px-10 py-3.5 pr-32 text-sm outline-none ring-[var(--color-brand-primary)] focus:ring-2"
                            />
                            <div className="absolute right-2 top-1/2 -translate-y-1/2">
                                <button
                                    type="button"
                                    onClick={() => applyFilters({ q: query })}
                                    className="rounded-lg bg-[var(--color-brand-primary)] px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:brightness-95"
                                >
                                    Pesquisar
                                </button>
                            </div>
                        </div>
                    </header>

                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                        {/* Sidebar */}
                        <aside className="lg:col-span-3">
                            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                                <div className="mb-4 flex items-center justify-between">
                                    <div className="text-sm font-semibold text-gray-900">{t("courses.filters")}</div>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setQuery('');
                                            setCategory('');
                                            setRegime('');
                                            setSortBy('relevance');
                                            router.get(route('courses'), {}, { preserveScroll: true, replace: true });
                                        }}
                                        className="text-xs font-medium text-[var(--color-brand-primary)] hover:text-[var(--color-brand-secondary)]"
                                    >
                                        {t("courses.clearAll")}
                                    </button>
                                </div>

                                <div className="space-y-5">
                                    {/* Tipo / categoria */}
                                    <div>
                                        <div className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                                            {t("courses.courseType")}
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setCategory('');
                                                    applyFilters({ category: '' });
                                                }}
                                                className={[
                                                    'rounded-full border px-3 py-1 text-xs font-medium transition',
                                                    category === ''
                                                        ? 'border-[var(--color-brand-primary)] bg-[var(--color-brand-primary)] text-white'
                                                        : 'border-gray-200 bg-white text-gray-700 hover:border-[var(--color-brand-primary)] hover:text-[var(--color-brand-primary)]',
                                                ].join(' ')}
                                            >
                                                {t("courses.all")}
                                            </button>
                                            {(categories ?? []).map((c) => {
                                                const id = String(c.id);
                                                const label = getCourseText(c.title, lang);

                                                return (
                                                    <button
                                                        key={c.id}
                                                        type="button"
                                                        onClick={() => {
                                                            setCategory(id);
                                                            applyFilters({ category: id });
                                                        }}
                                                        className={[
                                                            'rounded-full border px-3 py-1 text-xs font-medium transition',
                                                            category === id
                                                                ? 'border-[var(--color-brand-primary)] bg-[var(--color-brand-primary)] text-white'
                                                                : 'border-gray-200 bg-white text-gray-700 hover:border-[var(--color-brand-primary)] hover:text-[var(--color-brand-primary)]',
                                                        ].join(' ')}
                                                    >
                                                        {label}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    {/* Modalidade / regime */}
                                    <div>
                                        <div className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                                            {t("courses.modality")}
                                        </div>
                                        <div className="space-y-2 text-sm text-gray-700">
                                            <label className="flex items-center gap-2">
                                                <input
                                                    type="radio"
                                                    name="regime"
                                                    value=""
                                                    checked={regime === ''}
                                                    onChange={() => {
                                                        setRegime('');
                                                        applyFilters({ regime: '' });
                                                    }}
                                                    className="h-4 w-4 text-[var(--color-brand-primary)] focus:ring-[var(--color-brand-primary)]"
                                                />
                                                <span>{t("courses.all")}</span>
                                            </label>
                                            <label className="flex items-center gap-2">
                                                <input
                                                    type="radio"
                                                    name="regime"
                                                    value="0"
                                                    checked={regime === '0'}
                                                    onChange={() => {
                                                        setRegime('0');
                                                        applyFilters({ regime: '0' });
                                                    }}
                                                    className="h-4 w-4 text-[var(--color-brand-primary)] focus:ring-[var(--color-brand-primary)]"
                                                />
                                                <span>{t("courses.laboral")}</span>
                                            </label>
                                            <label className="flex items-center gap-2">
                                                <input
                                                    type="radio"
                                                    name="regime"
                                                    value="1"
                                                    checked={regime === '1'}
                                                    onChange={() => {
                                                        setRegime('1');
                                                        applyFilters({ regime: '1' });
                                                    }}
                                                    className="h-4 w-4 text-[var(--color-brand-primary)] focus:ring-[var(--color-brand-primary)]"
                                                />
                                                <span>{t("courses.posLaboral")}</span>
                                            </label>
                                        </div>
                                    </div>

                                    {/* Ordenar */}
                                    <div>
                                        <div className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                                            {t("courses.sortBy")}
                                        </div>
                                        <select
                                            value={sortBy}
                                            onChange={(e) => setSortBy(e.target.value)}
                                            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none ring-[var(--color-brand-primary)] focus:ring-2"
                                        >
                                            <option value="relevance">{t("courses.mostRecent")}</option>
                                            <option value="name_asc">{t("courses.nameAsc")}</option>
                                            <option value="name_desc">{t("courses.nameDesc")}</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </aside>

                        {/* Results */}
                        <section className="lg:col-span-9">
                            {sortedCourseItems.length === 0 ? (
                                <div className="rounded-2xl border border-dashed border-gray-200 bg-white/60 p-10 text-center text-sm text-gray-600 shadow-sm">
                                    {t("courses.noCourses")}
                                </div>
                            ) : (
                                <>
                                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                                        {sortedCourseItems.map((course) => {
                                            const title = getCourseText(course.title, lang);
                                            const desc = getCourseText(course.description, lang);
                                            const categoryTitle = getCourseText(
                                                course.course_category?.title ?? course.courseCategory?.title,
                                                lang
                                            );
                                            const duration = course.duration_years ? `${course.duration_years} ${t("courses.years")}` : null;

                                            return (
                                                <article
                                                    key={course.id}
                                                    className="flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                                                >
                                                    <div className="relative h-36 w-full bg-gradient-to-br from-slate-100 to-slate-200">
                                                        <div className="absolute left-4 top-4 rounded-md bg-[var(--color-brand-secondary)] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
                                                            {categoryTitle || t("courses.defaultCategory")}
                                                        </div>
                                                    </div>

                                                    <div className="flex flex-1 flex-col p-4">
                                                        <h3 className="text-base font-semibold text-gray-900 line-clamp-2">
                                                            {title}
                                                        </h3>
                                                        {desc ? (
                                                            <p className="mt-2 text-sm text-gray-600 line-clamp-3">
                                                                {desc}
                                                            </p>
                                                        ) : null}

                                                        <div className="mt-4 space-y-1 text-xs text-gray-500">
                                                            <div className="flex flex-wrap items-center gap-2">
                                                                <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-1">
                                                                    {course.study_regime ? t("courses.posLaboralLabel") : t("courses.laboralLabel")}
                                                                </span>
                                                                {duration ? (
                                                                    <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-1">
                                                                        {course.duration_years} {t("courses.years")}
                                                                    </span>
                                                                ) : null}
                                                            </div>
                                                            <div className="mt-1 flex items-center justify-between text-[11px]">
                                                                <div className="font-medium text-gray-700">
                                                                    {course.tuition_monthly_pay ? `${course.tuition_monthly_pay}${t("courses.perMonth")}` : ''}
                                                                </div>
                                                                <div className="text-gray-400">
                                                                    {course.tuition_months ? `${course.tuition_months} ${t("courses.months")}` : ''}
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="mt-4 flex gap-2 pt-2">
                                                            <Link
                                                                href={route('courses')}
                                                                className="flex-1 rounded-md bg-[var(--color-brand-primary)] px-3 py-2 text-center text-sm font-medium text-white transition hover:brightness-95"
                                                            >
                                                                {t("courses.learnMore")}
                                                            </Link>
                                                            <button
                                                                type="button"
                                                                className="flex-1 rounded-md border border-[var(--color-brand-primary)] px-3 py-2 text-sm font-medium text-[var(--color-brand-primary)] transition hover:bg-[color-mix(in_srgb,var(--color-brand-primary),white_92%)]"
                                                                onClick={() =>
                                                                    window.umami?.track('course_check_click', {
                                                                        course_id: course.id
                                                                    })
                                                                }
                                                            >
                                                                {t("courses.enroll")}
                                                            </button>
                                                        </div>
                                                    </div>
                                                </article>
                                            );
                                        })}
                                    </div>

                                    <Pagination links={courses?.meta.links} />
                                </>
                            )}
                        </section>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
