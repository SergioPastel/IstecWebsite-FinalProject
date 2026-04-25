import Layout from '../../layouts/Layout';
import { useTranslation } from 'react-i18next';
import { Link, router, Head } from '@inertiajs/react';
import Banner from '../../components/common/Banner';
import { useEffect, useMemo, useState } from 'react';

function getCourseText(value, lang) {
    if (value == null) return '';
    if (typeof value === 'string') return value;
    if (typeof value === 'object') return value?.[lang] ?? value?.pt ?? value?.en ?? '';
    return String(value);
}

function normalizeText(value) {
    return String(value ?? '')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase();
}

function isLicenciaturaCourse(course, lang) {
    const categoryTitle = getCourseText(
        course.course_category?.title ?? course.courseCategory?.title ?? course.category,
        lang
    );

    const searchableText = normalizeText([
        getCourseText(course.title, lang),
        getCourseText(course.title, 'pt'),
        getCourseText(course.title, 'en'),
        categoryTitle,
        course.type,
        course.course_type,
    ].join(' '));

    return searchableText.includes('licenciatura') || searchableText.includes('bachelor');
}

export default function LicenciaturasIndex({ courses, filters = {} }) {
    const { t, i18n } = useTranslation();
    const lang = i18n.language?.startsWith('en') ? 'en' : 'pt';

    const [query, setQuery] = useState(filters?.q ?? '');
    
    const [sortBy, setSortBy] = useState('relevance');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const courseItems = useMemo(() => {
        if (!courses) return [];
        if (Array.isArray(courses)) return courses;
        return courses.data ?? [];
    }, [courses]);

    const sortedCourseItems = useMemo(() => {
        const search = normalizeText(query.trim());

        let items = [...courseItems];

        if (search) {
            items = items.filter((course) => {
                const title = normalizeText(getCourseText(course.title, lang));
                return title.includes(search);
            });
        }

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
    }, [courseItems, sortBy, lang, query]);

    const totalPages = Math.ceil(sortedCourseItems.length / itemsPerPage);

    useEffect(() => {
        if (totalPages === 0 && currentPage !== 1) {
            setCurrentPage(1);
            return;
        }

        if (totalPages > 0 && currentPage > totalPages) {
            setCurrentPage(totalPages);
        }
    }, [currentPage, totalPages]);

    const paginatedCourseItems = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return sortedCourseItems.slice(start, start + itemsPerPage);
    }, [sortedCourseItems, currentPage]);

    const resultsCount = sortedCourseItems.length;

   const applyFilters = (next = {}) => {
        setCurrentPage(1);
    };

    return (
        <Layout title={t('courses.licenciatura.pageTitle')}>
            <Head title={t('courses.licenciatura.pageTitle')} />

            <div className="w-full bg-[#f5f8fc] text-[#1f2937]">
                <Banner>
                    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 sm:px-6 lg:px-8">
                        <div className="max-w-3xl">
                            <p className="mb-4 text-[0.85rem] font-extrabold uppercase tracking-[1.5px] text-white/90">
                                {t('courses.licenciatura.hero.badge')}
                            </p>

                            <h1 className="text-[clamp(2.2rem,4vw,3.8rem)] font-extrabold leading-[1.08] tracking-[-1px]">
                                {t('courses.licenciatura.hero.title')}
                            </h1>

                            <p className="mt-5 max-w-2xl text-[1.05rem] leading-[1.8] text-white/90">
                                {t('courses.licenciatura.hero.description')}
                            </p>
                        </div>
                    </div>

                    <div className="absolute right-[-120px] bottom-[-80px] h-[320px] w-[320px] rounded-full bg-white/10 blur-xl"></div>
                </Banner>

                <section className="relative -mt-10 z-10">
                    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="rounded-[26px] border border-[#dbe4ee] bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.06)] sm:p-8">
                            <p className="mb-3 inline-block text-[0.8rem] font-extrabold uppercase tracking-[1.2px] text-[#0d8fe8]">
                                {t('courses.licenciatura.about.badge')}
                            </p>

                            <h2 className="mb-4 text-[clamp(1.8rem,3vw,2.4rem)] font-semibold leading-[1.15] tracking-[-0.5px] text-[#1f2937]">
                                {t('courses.licenciatura.about.title')}
                            </h2>

                            <div className="max-w-4xl space-y-4 text-[0.98rem] leading-[1.8] text-[#6b7280]">
                                <p>{t('courses.licenciatura.about.paragraph1')}</p>
                                <p>{t('courses.licenciatura.about.paragraph2')}</p>
                                <p>{t('courses.licenciatura.about.paragraph3')}</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-12">
                    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                            <div>
                                <p className="mb-[10px] inline-block text-[0.8rem] font-extrabold uppercase tracking-[1.2px] text-[#0d8fe8]">
                                    {t('courses.licenciatura.listing.badge')}
                                </p>

                                <h2 className="text-[clamp(1.8rem,3vw,2.4rem)] leading-[1.15] tracking-[-0.5px] text-[#1f2937]">
                                    {t('courses.licenciatura.listing.title')}
                                </h2>
                            </div>

                            <div className="text-sm text-[#6b7280]">
                                <span className="font-bold text-[#1f2937]">{resultsCount}</span>{' '}
                                {resultsCount === 1 ? t('courses.oneCourse') : t('courses.multipleCourses')}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_220px]">
                            <div className="relative">
                                <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-[#94a3b8]">
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
                                    onChange={(e) => { // Update query state and apply filters immediately on input change
                                        const value = e.target.value;
                                        setQuery(value);
                                        applyFilters({ q: value });
                                    }}
                                    placeholder={t('courses.licenciatura.searchPlaceholder')}
                                    className="w-full rounded-[18px] border border-[#dbe4ee] bg-white px-11 py-4 pr-32 text-sm text-[#1f2937] outline-none focus:ring-2 focus:ring-[#0d8fe8]"
                                />
                            </div>

                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="w-full rounded-[18px] border border-[#dbe4ee] bg-white px-4 py-4 text-sm text-[#1f2937] outline-none focus:ring-2 focus:ring-[#0d8fe8]"
                            >
                                <option value="relevance">{t('courses.licenciatura.sortRelevance')}</option>
                                <option value="name_asc">{t('courses.nameAsc')}</option>
                                <option value="name_desc">{t('courses.nameDesc')}</option>
                            </select>
                        </div>
                    </div>
                </section>

                <section className="pb-16">
                    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                        {sortedCourseItems.length === 0 ? (
                            <div className="rounded-[20px] border border-dashed border-[#dbe4ee] bg-white p-10 text-center text-sm text-[#6b7280] shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
                                {t('courses.licenciatura.noResults')}
                            </div>
                        ) : (
                            <>
                                <div className="grid grid-cols-1 gap-[22px] sm:grid-cols-2 xl:grid-cols-3">
                                    {paginatedCourseItems.map((course) => {
                                        const title = getCourseText(course.title, lang);
                                        const desc = getCourseText(course.description, lang);
                                        const duration = course.duration_years
                                            ? `${course.duration_years} ${t('courses.years')}`
                                            : `3 ${t('courses.years')}`;
                                        const regimeLabel = course.study_regime
                                            ? t('courses.posLaboralLabel')
                                            : t('courses.laboralLabel');
                                        const modality = course.modality === 'hibrido'
                                                        ? t('courses.modality.hybrid')
                                                        : course.modality === 'online'
                                                        ? t('courses.modality.remote')
                                                        : t('courses.modality.inPerson');
                                        const ects = course.semesters
                                            .flatMap(semester => semester.subjects)
                                            .reduce((sum, subject) => sum + subject.ects, 0);

                                        return (
                                            <article
                                                key={course.id}
                                                className="flex h-full flex-col rounded-[20px] border border-[#dbe4ee] bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_34px_rgba(22,163,74,0.12)]"
                                            >
                                                <div className="relative mb-4 h-48 w-full overflow-hidden rounded-xl">
                                                    <img
                                                        src={course.media?.url}
                                                        alt={title}
                                                        className="h-full w-full object-cover opacity-60 transition duration-700 group-hover:scale-105"
                                                    />

                                                    <span className="absolute top-3 left-3 inline-flex self-start rounded-full bg-[#eafaf1] px-3 py-[6px] text-[0.8rem] font-extrabold text-[#16a34a] shadow">
                                                        {t('courses.licenciatura.cardBadge')}
                                                    </span>
                                                </div>

                                                <h3 className="mt-[14px] text-[1.2rem] font-semibold leading-[1.3] text-[#1f2937]">
                                                    {title}
                                                </h3>

                                                {desc ? (
                                                    <p className="mt-3 text-sm leading-[1.7] text-[#6b7280] line-clamp-3">
                                                        {desc}
                                                    </p>
                                                ) : (
                                                    <p className="mt-3 text-sm leading-[1.7] text-[#6b7280]">
                                                        {t('courses.licenciatura.defaultDescription')}
                                                    </p>
                                                )}

                                                <div className="mt-4 flex flex-wrap gap-2 text-xs text-[#4b5563]">
                                                    <span className="inline-flex items-center rounded-full bg-[#f1f5f9] px-2.5 py-1 font-medium">
                                                        {regimeLabel}
                                                    </span>

                                                    <span className="inline-flex items-center rounded-full bg-[#f1f5f9] px-2.5 py-1 font-medium">
                                                        {duration}
                                                    </span>

                                                    <span className="inline-flex items-center rounded-full bg-[#f1f5f9] px-2.5 py-1 font-medium">
                                                        {modality}
                                                    </span>

                                                    <span className="inline-flex items-center rounded-full bg-[#f1f5f9] px-2.5 py-1 font-medium">
                                                        {ects} ects
                                                    </span>
                                                </div>

                                                <div className="mt-5 text-sm text-[#6b7280]">
                                                    {course.tuition_monthly_pay ? (
                                                        <span className="font-bold text-[#1f2937]">
                                                            {course.tuition_monthly_pay}
                                                            {t('courses.perMonth')}
                                                        </span>
                                                    ) : (
                                                        <span className="font-bold text-[#1f2937]">
                                                            {t('courses.tuitionOnRequest')}
                                                        </span>
                                                    )}
                                                </div>

                                                <div className="mt-auto flex gap-3 pt-6">
                                                    <Link
                                                        href={`/courses/${course.id}`}
                                                        className="flex-1 rounded-full bg-[#0d8fe8] px-4 py-3 text-center text-sm font-bold text-white transition hover:bg-[#0a78c4]"
                                                    >
                                                        {t('courses.moreInfo')}
                                                    </Link>

                                                    <button
                                                        type="button"
                                                         className="flex-1 rounded-full border border-[#0d8fe8] bg-white px-4 py-3 text-sm font-bold text-[#0d8fe8] transition hover:bg-[#e7f3ff] hover:text-[#0a78c4]"
                                                        onClick={() => {
                                                            window.umami?.track('licenciatura_apply_click', {
                                                                course_id: course.id,
                                                            });

                                                            router.visit(route('applications.courses.apply', course));
                                                        }}
                                                    >
                                                        {t('courses.apply')}
                                                    </button>
                                                </div>
                                            </article>
                                        );
                                    })}
                                </div>

                                {totalPages > 1 && (
                                    <div className="mt-12 flex justify-center">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <button
                                                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                                disabled={currentPage === 1}
                                                className={`rounded-md border px-4 py-2 text-sm font-medium transition ${
                                                    currentPage === 1
                                                        ? 'cursor-not-allowed border-[#e5e7eb] bg-[#f9fafb] text-[#9ca3af]'
                                                        : 'border-[#dbe4ee] bg-white text-[#374151] hover:bg-[#f8fafc]'
                                                }`}
                                            >
                                                {t('pagination.previous')}
                                            </button>

                                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                                <button
                                                    key={page}
                                                    onClick={() => setCurrentPage(page)}
                                                    className={`h-[40px] min-w-[40px] rounded-md border text-sm font-medium transition ${
                                                        currentPage === page
                                                            ? 'border-[#0d8fe8] bg-[#0d8fe8] text-white'
                                                            : 'border-[#dbe4ee] bg-white text-[#374151] hover:bg-[#f8fafc]'
                                                    }`}
                                                >
                                                    {page}
                                                </button>
                                            ))}

                                            <button
                                                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                                disabled={currentPage === totalPages}
                                                className={`rounded-md border px-4 py-2 text-sm font-medium transition ${
                                                    currentPage === totalPages
                                                        ? 'cursor-not-allowed border-[#e5e7eb] bg-[#f9fafb] text-[#9ca3af]'
                                                        : 'border-[#dbe4ee] bg-white text-[#374151] hover:bg-[#f8fafc]'
                                                }`}
                                            >
                                                {t('pagination.next')}
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </section>
            </div>
        </Layout>
    );
}