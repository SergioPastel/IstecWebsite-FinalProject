import { useForm } from "@inertiajs/react";

export default function CourseCreateForm({ categories }) {
    const { data, setData, post, processing, errors } = useForm({
        course_category_id: "",
        media_id: "",
        title: { pt: "", en: "" },
        description: { pt: "", en: "" },
        professional_outcomes: { pt: "", en: "" },
        duration_years: 1,
        study_regime: 0,
        tuition_monthly_pay: 0,
        tuition_months: 10,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("courses.store"));
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-4xl p-6 mx-auto space-y-8 rounded-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Title (PT) */}
                <div className="flex flex-col gap-2">
                    <label className="font-semibold text-brand-black">Título (PT)</label>
                    <input
                        type="text"
                        value={data.title.pt}
                        onChange={e => setData('title', { ...data.title, pt: e.target.value })}
                        className={`p-2 border rounded border-brand-border focus:ring-2 focus:ring-brand-secondary outline-none ${errors['title.pt'] ? 'border-red-500' : ''}`}
                    />
                    {errors['title.pt'] && <span className="text-red-500 text-sm">{errors['title.pt']}</span>}
                </div>

                {/* Title (EN) */}
                <div className="flex flex-col gap-2">
                    <label className="font-semibold text-brand-black">Title (EN)</label>
                    <input
                        type="text"
                        value={data.title.en}
                        onChange={e => setData('title', { ...data.title, en: e.target.value })}
                        className={`p-2 border rounded border-brand-border focus:ring-2 focus:ring-brand-secondary outline-none ${errors['title.en'] ? 'border-red-500' : ''}`}
                    />
                    {/* Fixed the typo here: changed errors['title.pt'] to errors['title.en'] */}
                    {errors['title.en'] && <span className="text-red-500 text-sm">{errors['title.en']}</span>}
                </div>

                {/* Category Selection */}
                <div className="flex flex-col gap-2">
                    <label className="font-semibold text-brand-black">Category</label>
                    <select
                        value={data.course_category_id}
                        onChange={e => setData('course_category_id', e.target.value)}
                        className="p-2 border rounded border-brand-border bg-white"
                    >
                        <option value="">Select a Category</option>
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>
                                {cat.title.en || cat.title.pt}
                            </option>
                        ))}
                    </select>
                    {errors.course_category_id && <span className="text-red-500 text-sm">{errors.course_category_id}</span>}
                </div>

                {/* Duration */}
                <div className="flex flex-col gap-2">
                    <label className="font-semibold text-brand-black">Duration (Years)</label>
                    <input
                        type="number"
                        value={data.duration_years}
                        onChange={e => setData('duration_years', e.target.value)}
                        className="p-2 border rounded border-brand-border"
                    />
                    {errors.duration_years && <span className="text-red-500 text-sm">{errors.duration_years}</span>}
                </div>

                {/* Study Regime */}
                <div className="flex flex-col gap-2">
                    <label className="font-semibold text-brand-black">Study Regime</label>
                    <select
                        value={data.study_regime}
                        onChange={e => setData('study_regime', parseInt(e.target.value))}
                        className="p-2 border rounded border-brand-border bg-white"
                    >
                        <option value={0}>Working Hours</option>
                        <option value={1}>After-working Hours</option>
                    </select>
                </div>
            </div>

            {/* Description (PT) */}
            <div className="flex flex-col gap-2">
                <label className="font-semibold text-brand-black">Description (PT)</label>
                <textarea
                    rows="4"
                    value={data.description.pt}
                    onChange={e => setData('description', { ...data.description, pt: e.target.value })}
                    className="p-2 border rounded border-brand-border"
                />
                {errors['description.pt'] && <span className="text-red-500 text-sm">{errors['description.pt']}</span>}
            </div>

            <button
                type="submit"
                disabled={processing}
                className="w-full md:w-auto px-8 py-3 bg-brand-primary text-white font-bold rounded-lg hover:bg-brand-secondary transition-colors disabled:opacity-50"
            >
                {processing ? 'Saving...' : 'Create Course'}
            </button>
        </form>
    );
}
