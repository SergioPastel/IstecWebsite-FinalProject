import Layout from "../../layouts/Layout";
import { useTranslation } from 'react-i18next';
import { useForm, usePage } from '@inertiajs/react';

export default function ContactsIndex({ contacts }) {
    const { t } = useTranslation();
    const { csrf_token } = usePage().props;

    const contactForm = useForm({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const applicationForm = useForm({
        course_id: '',
        full_name: '',
        email: '',
        phone: '',
        birth_date: '',
        academic_level: '',
        motivation: '',
        cv_file: null,
    });

    const submitContact = (event) => {
        event.preventDefault();
        contactForm.post('/contacts');
    };

    const submitApplication = (event) => {
        event.preventDefault();
        applicationForm.post('/applications', { forceFormData: true });
    };

    return (
        <Layout>
            <div className="container mx-auto p-6 space-y-12">
                <div>
                    <h1 className="text-3xl font-bold mb-4">{t('Contact form')}</h1>
                    <form onSubmit={submitContact} className="space-y-4 bg-white shadow rounded-lg p-6">
                        <input type="hidden" name="_token" value={csrf_token} />
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                type="text"
                                value={contactForm.data.name}
                                onChange={e => contactForm.setData('name', e.target.value)}
                                className="mt-1 block w-full border rounded-md p-2"
                            />
                            {contactForm.errors.name && <p className="text-sm text-red-600">{contactForm.errors.name}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                value={contactForm.data.email}
                                onChange={e => contactForm.setData('email', e.target.value)}
                                className="mt-1 block w-full border rounded-md p-2"
                            />
                            {contactForm.errors.email && <p className="text-sm text-red-600">{contactForm.errors.email}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Subject</label>
                            <input
                                type="text"
                                value={contactForm.data.subject}
                                onChange={e => contactForm.setData('subject', e.target.value)}
                                className="mt-1 block w-full border rounded-md p-2"
                            />
                            {contactForm.errors.subject && <p className="text-sm text-red-600">{contactForm.errors.subject}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Message</label>
                            <textarea
                                value={contactForm.data.message}
                                onChange={e => contactForm.setData('message', e.target.value)}
                                className="mt-1 block w-full border rounded-md p-2"
                                rows={4}
                            />
                            {contactForm.errors.message && <p className="text-sm text-red-600">{contactForm.errors.message}</p>}
                        </div>

                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-md"
                            disabled={contactForm.processing}
                        >
                            Send Contact
                        </button>
                    </form>
                </div>

                <div>
                    <h1 className="text-3xl font-bold mb-4">{t('Application form')}</h1>
                    <form onSubmit={submitApplication} className="space-y-4 bg-white shadow rounded-lg p-6" encType="multipart/form-data">
                        <input type="hidden" name="_token" value={csrf_token} />
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Course ID</label>
                            <input
                                type="text"
                                value={applicationForm.data.course_id}
                                onChange={e => applicationForm.setData('course_id', e.target.value)}
                                className="mt-1 block w-full border rounded-md p-2"
                            />
                            {applicationForm.errors.course_id && <p className="text-sm text-red-600">{applicationForm.errors.course_id}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Full name</label>
                            <input
                                type="text"
                                value={applicationForm.data.full_name}
                                onChange={e => applicationForm.setData('full_name', e.target.value)}
                                className="mt-1 block w-full border rounded-md p-2"
                            />
                            {applicationForm.errors.full_name && <p className="text-sm text-red-600">{applicationForm.errors.full_name}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                value={applicationForm.data.email}
                                onChange={e => applicationForm.setData('email', e.target.value)}
                                className="mt-1 block w-full border rounded-md p-2"
                            />
                            {applicationForm.errors.email && <p className="text-sm text-red-600">{applicationForm.errors.email}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Phone</label>
                            <input
                                type="text"
                                value={applicationForm.data.phone}
                                onChange={e => applicationForm.setData('phone', e.target.value)}
                                className="mt-1 block w-full border rounded-md p-2"
                            />
                            {applicationForm.errors.phone && <p className="text-sm text-red-600">{applicationForm.errors.phone}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Birth date</label>
                            <input
                                type="date"
                                value={applicationForm.data.birth_date}
                                onChange={e => applicationForm.setData('birth_date', e.target.value)}
                                className="mt-1 block w-full border rounded-md p-2"
                            />
                            {applicationForm.errors.birth_date && <p className="text-sm text-red-600">{applicationForm.errors.birth_date}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Academic level</label>
                            <input
                                type="text"
                                value={applicationForm.data.academic_level}
                                onChange={e => applicationForm.setData('academic_level', e.target.value)}
                                className="mt-1 block w-full border rounded-md p-2"
                            />
                            {applicationForm.errors.academic_level && <p className="text-sm text-red-600">{applicationForm.errors.academic_level}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Motivation</label>
                            <textarea
                                value={applicationForm.data.motivation}
                                onChange={e => applicationForm.setData('motivation', e.target.value)}
                                className="mt-1 block w-full border rounded-md p-2"
                                rows={4}
                            />
                            {applicationForm.errors.motivation && <p className="text-sm text-red-600">{applicationForm.errors.motivation}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">CV file</label>
                            <input
                                type="file"
                                accept=".pdf,.doc,.docx"
                                onChange={e => applicationForm.setData('cv_file', e.target.files[0])}
                                className="mt-1 block w-full"
                            />
                            {applicationForm.errors.cv_file && <p className="text-sm text-red-600">{applicationForm.errors.cv_file}</p>}
                        </div>

                        <button
                            type="submit"
                            className="px-4 py-2 bg-green-600 text-white rounded-md"
                            disabled={applicationForm.processing}
                        >
                            Send Application
                        </button>
                    </form>
                </div>
            </div>
        </Layout>
    );
}
