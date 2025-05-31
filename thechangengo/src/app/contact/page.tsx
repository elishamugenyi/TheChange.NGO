// app/contact/page.tsx (or wherever you place your contact us page)
'use client';

import { useState } from 'react';

export default function ContactUsPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmissionStatus('submitting');
        setErrorMessage('');

        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            setErrorMessage('All fields are required.');
            setSubmissionStatus('error');
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            setErrorMessage('Please enter a valid email address.');
            setSubmissionStatus('error');
            return;
        }

        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1500));

            // In a real application, you would send formData to your backend here:
            // const response = await fetch('/api/contact', {
            //   method: 'POST',
            //   headers: {
            //     'Content-Type': 'application/json',
            //   },
            //   body: JSON.stringify(formData),
            // });
            //
            // if (!response.ok) {
            //   throw new Error('Failed to send message.');
            // }

            setSubmissionStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' }); // Clear form
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            setErrorMessage('Failed to send message. Please try again.');
            setSubmissionStatus('error');
        }
    };

    return (
        <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto min-h-auto">
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
                    Get in Touch
                </h1>
                <p className="mt-4 text-xl text-gray-600">
                    We&apos;d love to hear from you. Please fill out the form below.
                </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-xl border border-gray-200">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Your Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-base"
                            placeholder="John Doe"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Your Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-base"
                            placeholder="you@example.com"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                            Subject
                        </label>
                        <input
                            type="text"
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-base"
                            placeholder="Regarding a donation/volunteer inquiry/general question"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                            Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            rows={5}
                            value={formData.message}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-base"
                            placeholder="Type your message here..."
                            required
                        ></textarea>
                    </div>

                    {submissionStatus === 'submitting' && (
                        <p className="text-center text-teal-600 font-medium">Sending your message...</p>
                    )}
                    {submissionStatus === 'success' && (
                        <p className="text-center text-green-600 font-medium">
                            Thank you for your message! We will get back to you soon.
                        </p>
                    )}
                    {submissionStatus === 'error' && (
                        <p className="text-center text-red-600 font-medium">
                            Error: {errorMessage || 'Something went wrong. Please try again.'}
                        </p>
                    )}

                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors duration-200"
                            disabled={submissionStatus === 'submitting'}
                        >
                            {submissionStatus === 'submitting' ? 'Sending...' : 'Send Message'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}