'use client';

import { useState } from 'react';

export default function AddCampaignForm() {
    const [form, setForm] = useState({
        name: '',
        description: '',
        price: '',
        isRecurring: false,
    });

    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type, checked } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const price = Math.floor(Number(form.price)); // sanitize input

        const res = await fetch('/api/campaigns', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: form.name,
                description: form.description,
                price,
                isRecurring: form.isRecurring,
            }),
        });

        const data = await res.json();
        setResult(data);
        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded shadow max-w-md mx-auto">
            <h2 className="text-xl font-bold">Create a New Campaign</h2>

            <input
                type="text"
                name="name"
                placeholder="Campaign name"
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
            />

            <textarea
                name="description"
                placeholder="Description"
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
            />

            <input
                type="number"
                name="price"
                placeholder="Amount in USD (e.g. 25)"
                min="10"
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
            />

            <label className="flex items-center space-x-2">
                {/* <input
                    type="checkbox"
                    name="isRecurring"
                    checked={form.isRecurring}
                    onChange={handleChange}
                /> */}
                <span>Recurring Monthly Donation Is Under Development Only One Time Payment Campaigns Are In Progress</span>
            </label>

            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={loading}>
                {loading ? 'Creating...' : 'Create Campaign'}
            </button>

            {result && (
                <pre className="mt-4 bg-gray-100 p-2 text-sm overflow-x-auto">
                    {JSON.stringify(result, null, 2)}
                </pre>
            )}
        </form>
    );
}
