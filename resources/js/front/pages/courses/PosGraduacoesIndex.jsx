import Layout from '../../layouts/layout';
import { useTranslation } from 'react-i18next';
import { Link, router, Head } from '@inertiajs/react';
import { useEffect, useMemo, useState } from 'react';
import { route } from 'ziggy-js';

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

function isPosGraduacaoCourse(course, lang) {
    const categoryTitle = getCourseText(
        course.course_category?.title ?? course.courseCategory?.title ?? course.category,
        lang
    );

    const searchableText = normalizeText([
        getCourseText(course.title, lang),
        getCourseText(course.title, 'pt'),
        getCourseText(course.title, 'en'),
        categoryTitle,
        course.slug,
        course.type,
        course.course_type,
    ].join(' '));

    return (
        searchableText.includes('pos-graduacao') ||
        searchableText.includes('pos-graduacoes') ||
        searchableText.includes('pos graduacao') ||
        searchableText.includes('pos graduacoes') ||
        searchableText.includes('postgraduate') ||
        searchableText.includes('post graduate') ||
        searchableText.includes('especializacao')
    );
}

export default function PosGraduacoesIndex({ courses, filters = {} }) {
    const { i18n } = useTranslation();
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

    const posGraduacaoCourseItems = useMemo(() => {
        return courseItems.filter((course) => isPosGraduacaoCourse(course, lang));
    }, [courseItems, lang]);

    const sortedCourseItems = useMemo(() => {
        const items = [...posGraduacaoCourseItems];

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
    }, [posGraduacaoCourseItems, sortBy, lang]);

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
        router.get(
            window.location?.pathname ?? '/courses/pos-graduacoes',
            {
                q: next.q ?? query ?? undefined,
            },
            { preserveScroll: true, preserveState: true, replace: true }
        );
    };

    return (
        <Layout title="Pós-Graduações">
            <Head title="Pós-Graduações" />

            <div className="w-full bg-[#f5f8fc] text-[#1f2937]">
                <section className="relative overflow-hidden bg-gradient-to-br from-[#0d8fe8] to-[#38b6ff] pt-40 pb-20 text-white">
                    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 sm:px-6 lg:px-8">
                        <div className="max-w-3xl">
                            <p className="mb-4 text-[0.85rem] font-extrabold uppercase tracking-[1.5px] text-white/90">
                                ISTEC PORTO
                            </p>

                            <h1 className="text-[clamp(2.2rem,4vw,3.8rem)] font-extrabold leading-[1.08] tracking-[-1px]">
                                Pós-Graduações
                            </h1>

                            <p className="mt-5 max-w-2xl text-[1.05rem] leading-[1.8] text-white/90">
                                Descobre as pós-graduações do ISTEC Porto e aprofunda competências
                                especializadas com formação orientada para a evolução profissional.
                            </p>
                        </div>
                    </div>

                    <div className="absolute right-[-120px] bottom-[-80px] h-[320px] w-[320px] rounded-full bg-white/10 blur-xl"></div>
                </section>

                <section className="relative -mt-10 z-10">
                    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="rounded-[26px] border border-[#dbe4ee] bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.06)] sm:p-8">
                            <p className="mb-3 inline-block text-[0.8rem] font-extrabold uppercase tracking-[1.2px] text-[#0d8fe8]">
                                Sobre as pós-graduações
                            </p>

                            <h2 className="mb-4 text-[clamp(1.8rem,3vw,2.4rem)] font-semibold leading-[1.15] tracking-[-0.5px] text-[#1f2937]">
                                Formação avançada para reforçar competências profissionais
                            </h2>

                            <div className="max-w-4xl space-y-4 text-[0.98rem] leading-[1.8] text-[#6b7280]">
                                <p>
                                    As pós-graduações destinam-se a quem procura atualizar,
                                    aprofundar ou especializar conhecimentos numa área concreta,
                                    respondendo às necessidades atuais do mercado de trabalho.
                                </p>

                                <p>
                                    No ISTEC Porto, estes percursos valorizam a aplicação prática,
                                    a proximidade ao contexto profissional e o desenvolvimento de
                                    competências técnicas relevantes.
                                </p>

                                <p>
                                    A oferta de pós-graduações é pensada para profissionais,
                                    diplomados e estudantes que pretendem diferenciar o seu perfil e
                                    continuar a evoluir na sua área de atuação.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-12">
                    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                            <div>
                                <p className="mb-[10px] inline-block text-[0.8rem] font-extrabold uppercase tracking-[1.2px] text-[#0d8fe8]">
                                    Oferta de pós-graduações
                                </p>

                                <h2 className="text-[clamp(1.8rem,3vw,2.4rem)] leading-[1.15] tracking-[-0.5px] text-[#1f2937]">
                                    Encontra a pós-graduação certa para ti
                                </h2>
                            </div>

                            <div className="text-sm text-[#6b7280]">
                                <span className="font-bold text-[#1f2937]">{resultsCount}</span>{' '}
                                {resultsCount === 1 ? 'pós-graduação encontrada' : 'pós-graduações encontradas'}
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
                                    onChange={(e) => setQuery(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') applyFilters({ q: e.currentTarget.value });
                                    }}
                                    placeholder="Pesquisar pós-graduações..."
                                    className="w-full rounded-[18px] border border-[#dbe4ee] bg-white px-11 py-4 pr-32 text-sm text-[#1f2937] outline-none focus:ring-2 focus:ring-[#0d8fe8]"
                                />

                                <div className="absolute right-2 top-1/2 -translate-y-1/2">
                                    <button
                                        type="button"
                                        onClick={() => applyFilters({ q: query })}
                                        className="rounded-full bg-[#0d8fe8] px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#0a78c4]"
                                    >
                                        Pesquisar
                                    </button>
                                </div>
                            </div>

                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="w-full rounded-[18px] border border-[#dbe4ee] bg-white px-4 py-4 text-sm text-[#1f2937] outline-none focus:ring-2 focus:ring-[#0d8fe8]"
                            >
                                <option value="relevance">Mais relevantes</option>
                                <option value="name_asc">Nome A-Z</option>
                                <option value="name_desc">Nome Z-A</option>
                            </select>
                        </div>
                    </div>
                </section>

                <section className="pb-16">
                    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                        {sortedCourseItems.length === 0 ? (
                            <div className="rounded-[20px] border border-dashed border-[#dbe4ee] bg-white p-10 text-center text-sm text-[#6b7280] shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
                                Não foram encontradas pós-graduações com os filtros aplicados.
                            </div>
                        ) : (
                            <>
                                <div className="grid grid-cols-1 gap-[22px] sm:grid-cols-2 xl:grid-cols-3">
                                    {paginatedCourseItems.map((course) => {
                                        const title = getCourseText(course.title, lang);
                                        const desc = getCourseText(course.description, lang);
                                        const duration = course.duration_years
                                            ? `${course.duration_years} anos`
                                            : '1 ano';
                                        const regimeLabel = course.study_regime ? 'Pós-laboral' : 'Laboral';

                                        return (
                                            <article
                                                key={course.id}
                                                className="flex h-full flex-col rounded-[20px] border border-[#dbe4ee] bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_34px_rgba(13,143,232,0.12)]"
                                            >
                                                <span className="inline-flex self-start rounded-full bg-[#eaf5ff] px-3 py-[6px] text-[0.8rem] font-extrabold text-[#0d8fe8]">
                                                    Pós-Graduação
                                                </span>

                                                <h3 className="mt-[14px] text-[1.2rem] font-semibold leading-[1.3] text-[#1f2937]">
                                                    {title}
                                                </h3>

                                                {desc ? (
                                                    <p className="mt-3 text-sm leading-[1.7] text-[#6b7280] line-clamp-3">
                                                        {desc}
                                                    </p>
                                                ) : (
                                                    <p className="mt-3 text-sm leading-[1.7] text-[#6b7280]">
                                                        Pós-graduação com formação especializada, prática e orientada para a valorização profissional.
                                                    </p>
                                                )}

                                                <div className="mt-4 flex flex-wrap gap-2 text-xs text-[#4b5563]">
                                                    <span className="inline-flex items-center rounded-full bg-[#f1f5f9] px-2.5 py-1 font-medium">
                                                        {regimeLabel}
                                                    </span>

                                                    <span className="inline-flex items-center rounded-full bg-[#f1f5f9] px-2.5 py-1 font-medium">
                                                        {duration}
                                                    </span>

                                                    {course.tuition_months ? (
                                                        <span className="inline-flex items-center rounded-full bg-[#f1f5f9] px-2.5 py-1 font-medium">
                                                            {course.tuition_months} meses
                                                        </span>
                                                    ) : null}
                                                </div>

                                                <div className="mt-5 text-sm text-[#6b7280]">
                                                    {course.tuition_monthly_pay ? (
                                                        <span className="font-bold text-[#1f2937]">
                                                            {course.tuition_monthly_pay}€/mês
                                                        </span>
                                                    ) : (
                                                        <span className="font-bold text-[#1f2937]">Consultar propina</span>
                                                    )}
                                                </div>

                                                <div className="mt-auto flex gap-3 pt-6">
                                                    <Link
                                                        href={route('courses.show', course.id)}
                                                        className="flex-1 rounded-full bg-[#0d8fe8] px-4 py-3 text-center text-sm font-bold text-white transition hover:bg-[#0a78c4]"
                                                    >
                                                        Mais Informações
                                                    </Link>

                                                    <button
                                                        type="button"
                                                        className="flex-1 rounded-full border border-[rgba(13,143,232,0.22)] bg-transparent px-4 py-3 text-sm font-bold text-[#0d8fe8] transition hover:bg-[#eaf5ff]"
                                                        onClick={() => {
                                                            window.umami?.track('pos_graduacao_apply_click', {
                                                                course_id: course.id,
                                                            });

                                                            router.visit(route('applications.applyCourse', course));
                                                        }}
                                                    >
                                                        Candidatar-me
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
                                                Anterior
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
                                                Seguinte
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
