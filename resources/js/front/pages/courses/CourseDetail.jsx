import { Link, router } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import Layout from '../../layouts/layout';
import heroBackground from '../../assets/hero.png';

function getCourseText(value, lang = 'pt') {
    if (value == null) return '';
    if (typeof value === 'string') return value;
    if (typeof value === 'object') return value?.[lang] ?? value?.pt ?? value?.en ?? '';
    return String(value);
}

function getArrayValue(value) {
    if (!value) return [];
    if (Array.isArray(value)) return value;
    if (Array.isArray(value.data)) return value.data;
    return [];
}

function formatDuration(course) {
    if (course?.duration_label) return course.duration_label;
    if (course?.duration_years) {
        return course.duration_years === 1 ? '1 ano' : `${course.duration_years} anos`;
    }

    return 'Consultar';
}

function formatRegime(course) {
    if (course?.regime_label) return course.regime_label;
    if (typeof course?.study_regime === 'string') return course.study_regime;
    return course?.study_regime ? 'Pós-laboral' : 'Laboral';
}

function formatTuition(course) {
    if (course?.tuition_label) return course.tuition_label;
    if (course?.tuition_monthly_pay) return `${course.tuition_monthly_pay}€/mês`;
    return 'Consultar propina';
}

function InfoIcon({ children }) {
    return (
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#eaf5ff] text-[#0d8fe8]">
            {children}
        </span>
    );
}

function InfoItem({ icon, label, value }) {
    if (!value) return null;

    return (
        <div className="flex gap-3 border-b border-[#edf2f7] pb-4 last:border-b-0 last:pb-0">
            <InfoIcon>{icon}</InfoIcon>
            <div>
                <p className="text-[0.72rem] font-extrabold uppercase tracking-[1px] text-[#94a3b8]">
                    {label}
                </p>
                <p className="mt-1 text-sm font-semibold leading-6 text-[#1f2937]">{value}</p>
            </div>
        </div>
    );
}

function SectionTitle({ eyebrow, title, description }) {
    return (
        <div className="mb-7">
            {eyebrow ? (
                <p className="mb-2 text-[0.78rem] font-extrabold uppercase tracking-[1.3px] text-[#0d8fe8]">
                    {eyebrow}
                </p>
            ) : null}
            <h2 className="text-[clamp(1.7rem,3vw,2.35rem)] font-semibold leading-[1.15] tracking-[-0.6px] text-[#111827]">
                {title}
            </h2>
            {description ? (
                <p className="mt-3 max-w-3xl text-[0.98rem] leading-8 text-[#6b7280]">
                    {description}
                </p>
            ) : null}
        </div>
    );
}

function EmptyState({ children }) {
    return (
        <div className="rounded-[18px] border border-dashed border-[#dbe4ee] bg-[#f8fbff] p-6 text-sm leading-7 text-[#6b7280]">
            {children}
        </div>
    );
}

export default function CourseDetail({ course = {} }) {
    const [activeTab, setActiveTab] = useState('overview');

    const title = getCourseText(course.title) || 'Nome do curso';
    const category = getCourseText(course.category) || 'Curso';
    const description = getCourseText(course.description) || 'Descrição do curso a definir.';
    // const objectives = getCourseText(course.objectives) || getCourseText(course.goals);
    // const accessConditions = getCourseText(course.access_conditions) || getCourseText(course.accessConditions);
    const professionalOutcomes = course.professional_outcomes; // it's a json/array

    const outcomesList = (professionalOutcomes).split(",").map(item => item.trim()); // splits the array

    const semesters = getArrayValue(course.semesters);
    const duration = formatDuration(course);
    const regime = formatRegime(course);
    const tuition = formatTuition(course);
    const ects = course.semesters
    .flatMap(semester => semester.subjects)
    .reduce((sum, subject) => sum + subject.ects, 0);

    // const ects = course.ects ?? course.total_ects ?? (category.toLowerCase().includes('licenciatura') ? '180 ECTS' : null);
    const schedule = course.schedule || regime;
    const heroImage = course.image || course.hero_image || heroBackground;

    const tabs = useMemo(() => [
        { id: 'overview', label: 'Apresentação' },
        { id: 'plan', label: 'Plano de estudos' },
        { id: 'outcomes', label: 'Saídas profissionais' },
    ], []);

    const breadcrumbs = [
        { label: 'Home', href: '/' },
        { label: 'Cursos', href: '/courses' },
        { label: title },
    ];

    const handleApply = () => {
        window.umami?.track('course_detail_apply_click', {
            course_id: course.id,
        });

        if (typeof route === 'function') {
            router.visit(route('applications.courses.apply', course));
            return;
        }

        router.visit('/applications/applyCourse');
    };

    return (
        <Layout title={title}>
            <div
                className="w-full overflow-x-hidden bg-[#f5f8fc] text-[#1f2937]"
                onClick={() => window.dispatchEvent(new Event('closeDropdowns'))}
            >
                <section className="relative mt-[120px] overflow-hidden bg-[#0d8fe8] text-white">
                    <div className="absolute inset-0">
                        <img
                            src={heroImage}
                            alt=""
                            className="h-full w-full object-cover opacity-30 mix-blend-multiply"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#0c73b7] via-[#0d8fe8]/90 to-[#38b6ff]/75" />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_28%,rgba(255,255,255,0.18),transparent_34%)]" />
                    </div>

                    <div className="relative mx-auto flex min-h-[330px] w-full max-w-[1600px] items-end px-6 pb-16 pt-20">
                        <div className="max-w-4xl">
                            <p className="mb-4 text-[0.82rem] font-extrabold uppercase tracking-[1.5px] text-white/85">
                                Formação avançada em tecnologia e inovação
                            </p>
                            <span className="mb-4 inline-flex rounded-full bg-white/15 px-4 py-2 text-xs font-extrabold uppercase tracking-[1.2px] backdrop-blur">
                                {category}
                            </span>
                            <h1 className="text-[clamp(2.35rem,5vw,4.8rem)] font-extrabold leading-[1.04] tracking-[-1.5px]">
                                {title}
                            </h1>
                            <p className="mt-5 max-w-3xl text-[1.05rem] leading-8 text-white/90">
                                {description}
                            </p>
                        </div>
                    </div>
                </section>

                <main className="mx-auto grid w-full max-w-[1600px] grid-cols-1 gap-8 px-6 py-10 lg:grid-cols-[minmax(0,1fr)_360px]">
                    <section className="min-w-0">
                        <nav className="mb-6 flex flex-wrap items-center gap-2 text-xs font-semibold text-[#94a3b8]">
                            {breadcrumbs.map((item, index) => (
                                <span key={`${item.label}-${index}`} className="flex items-center gap-2">
                                    {item.href ? (
                                        <Link href={item.href} className="transition hover:text-[#0d8fe8]">
                                            {item.label}
                                        </Link>
                                    ) : (
                                        <span className="text-[#1f2937]">{item.label}</span>
                                    )}
                                    {index < breadcrumbs.length - 1 ? <span>/</span> : null}
                                </span>
                            ))}
                        </nav>

                        <div className="overflow-hidden rounded-[22px] border border-[#dbe4ee] bg-white shadow-[0_8px_24px_rgba(15,23,42,0.06)]">
                            <div className="flex gap-1 overflow-x-auto border-b border-[#edf2f7] bg-white px-2 pt-2">
                                {tabs.map((tab) => {
                                    const isActive = activeTab === tab.id;

                                    return (
                                        <button
                                            key={tab.id}
                                            type="button"
                                            onClick={() => setActiveTab(tab.id)}
                                            className={[
                                                'whitespace-nowrap rounded-t-[16px] px-5 py-4 text-sm font-bold transition',
                                                isActive
                                                    ? 'bg-[#eaf5ff] text-[#0d8fe8] shadow-[inset_0_-3px_0_#0d8fe8]'
                                                    : 'text-[#6b7280] hover:bg-[#f5f8fc] hover:text-[#0d8fe8]',
                                            ].join(' ')}
                                        >
                                            {tab.label}
                                        </button>
                                    );
                                })}
                            </div>

                            <div className="p-6 sm:p-8 lg:p-10">
                                {activeTab === 'overview' ? (
                                    <div>
                                        <SectionTitle
                                            eyebrow="Apresentação"
                                            title="Um percurso pensado para o teu futuro"
                                            description="Este modelo organiza a informação essencial do curso de forma clara, com destaque para apresentação, objetivos, plano curricular, acesso e saídas profissionais."
                                        />

                                        <div className="space-y-5 text-[1rem] leading-8 text-[#4b5563]">
                                            <p>{description}</p>                                            
                                        </div>

                                        <div className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-3">
                                            <div className="rounded-[18px] bg-[#f5f8fc] p-5">
                                                <p className="text-[0.72rem] font-extrabold uppercase tracking-[1px] text-[#0d8fe8]">Duração</p>
                                                <p className="mt-2 text-xl font-bold text-[#111827]">{duration}</p>
                                            </div>
                                            <div className="rounded-[18px] bg-[#f5f8fc] p-5">
                                                <p className="text-[0.72rem] font-extrabold uppercase tracking-[1px] text-[#0d8fe8]">Regime</p>
                                                <p className="mt-2 text-xl font-bold text-[#111827]">{regime}</p>
                                            </div>
                                            <div className="rounded-[18px] bg-[#f5f8fc] p-5">
                                                <p className="text-[0.72rem] font-extrabold uppercase tracking-[1px] text-[#0d8fe8]">Propina</p>
                                                <p className="mt-2 text-xl font-bold text-[#111827]">{tuition}</p>
                                            </div>
                                        </div>
                                    </div>
                                ) : null}

                                {activeTab === 'plan' ? (
                                    <div>
                                        <SectionTitle
                                            eyebrow="Plano de estudos"
                                            title="Organização curricular"
                                            description="Área preparada para listar semestres e unidades curriculares associadas ao curso."
                                        />

                                        {semesters.length > 0 ? (
                                            <div className="space-y-5">
                                                {semesters.map((semester, index) => {
                                                    const subjects = getArrayValue(semester.subjects);
                                                    const semesterNumber = semester.semester_number ?? index + 1;

                                                    return (
                                                        <div key={semester.id ?? semesterNumber} className="rounded-[18px] border border-[#dbe4ee] bg-[#fbfdff] p-5">
                                                            <h3 className="text-lg font-bold text-[#111827]">
                                                                {semesterNumber}.º Semestre
                                                            </h3>

                                                            {subjects.length > 0 ? (
                                                                <div className="mt-4 overflow-hidden rounded-[14px] border border-[#edf2f7] bg-white">
                                                                    {subjects.map((subject) => (
                                                                        <div
                                                                            key={subject.id ?? subject.name}
                                                                            className="flex items-center justify-between gap-4 border-b border-[#edf2f7] px-4 py-3 text-sm last:border-b-0"
                                                                        >
                                                                            <span className="font-semibold text-[#374151]">
                                                                                {getCourseText(subject.name) || 'Unidade curricular'}
                                                                            </span>
                                                                            {subject.ects ? (
                                                                                <span className="rounded-full bg-[#eaf5ff] px-3 py-1 text-xs font-bold text-[#0d8fe8]">
                                                                                    {subject.ects} ECTS
                                                                                </span>
                                                                            ) : null}
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            ) : (
                                                                <p className="mt-3 text-sm leading-7 text-[#6b7280]">
                                                                    Unidades curriculares a definir.
                                                                </p>
                                                            )}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        ) : (
                                            <EmptyState>
                                                O plano de estudos ainda não foi carregado para este curso.
                                            </EmptyState>
                                        )}
                                    </div>
                                ) : null}                                

                                {activeTab === 'outcomes' ? (
                                    <div>
                                        <SectionTitle
                                            eyebrow="Saídas profissionais"
                                            title="Possíveis percursos após o curso"
                                        />
                                        
                                        {outcomesList.length > 0 ? (
                                        <ul className="list-disc pl-5 text-[1rem] leading-8 text-[#4b5563]">
                                            {outcomesList.map((outcome, index) => (
                                                <li key={index}>{outcome}</li>
                                            ))}
                                        </ul>
                                        ) : 
                                        (
                                            <EmptyState>
                                                As saídas profissionais serão apresentadas aqui quando estiverem associadas ao curso.
                                            </EmptyState>
                                        )}
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    </section>

                    <aside className="lg:sticky lg:top-32 lg:self-start">
                        <div className="rounded-[22px] border border-[#dbe4ee] bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.06)]">
                            <p className="mb-5 text-[0.78rem] font-extrabold uppercase tracking-[1.3px] text-[#0d8fe8]">
                                Informação do curso
                            </p>

                            <div className="space-y-4">                                
                                <InfoItem
                                    label="Horário"
                                    value={schedule}
                                    icon={(
                                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <circle cx="12" cy="12" r="9" />
                                            <path d="M12 7v5l3 2" />
                                        </svg>
                                    )}
                                />
                                <InfoItem
                                    label="Modalidade"
                                    value={course.modality || 'Presencial'}
                                    icon={(
                                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M3 21h18" />
                                            <path d="M5 21V7l7-4 7 4v14" />
                                            <path d="M9 21v-7h6v7" />
                                        </svg>
                                    )}
                                />
                                <InfoItem
                                    label="Duração"
                                    value={duration}
                                    icon={(
                                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M4 6h16M4 12h16M4 18h10" />
                                        </svg>
                                    )}
                                />
                                <InfoItem
                                    label="ECTS"
                                    value={ects}
                                    icon={(
                                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M12 3l8 4-8 4-8-4 8-4Z" />
                                            <path d="M4 11l8 4 8-4" />
                                            <path d="M4 15l8 4 8-4" />
                                        </svg>
                                    )}
                                />                                
                            </div>

                            <div className="mt-7 space-y-3 border-t border-[#edf2f7] pt-6">
                                <button
                                    type="button"
                                    onClick={handleApply}
                                    className="flex w-full items-center justify-center rounded-[12px] bg-[#0d8fe8] px-5 py-3 text-sm font-extrabold text-white shadow-[0_10px_24px_rgba(13,143,232,0.22)] transition hover:-translate-y-0.5 hover:bg-[#0a78c4]"
                                >
                                    Candidatar agora
                                </button>
                                <Link
                                    href="/contacts"
                                    className="flex w-full items-center justify-center rounded-[12px] border border-[#0d8fe8]/25 px-5 py-3 text-sm font-extrabold text-[#0d8fe8] transition hover:bg-[#eaf5ff]"
                                >
                                    Pedir mais informações
                                </Link>
                            </div>
                        </div>
                    </aside>
                </main>
            </div>
        </Layout>
    );
}
