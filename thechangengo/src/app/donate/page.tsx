// app/donate/prod/page.tsx
import { supabase } from '../lib/supabaseClient';
import Link from 'next/link';

export default async function DonateProdPage() {
    const { data: campaigns, error } = await supabase
        .from('campaigns')
        .select('id, name, price, stripe_price_id');

    if (error) {
        return <p className="text-red-500">Failed to load campaigns: {error.message}</p>;
    }

    return (
        <div className="p-6 space-y-4">
            <h1 className="text-2xl font-bold">Support a Campaign</h1>
            {campaigns?.map((campaign) => (
                <div key={campaign.stripe_price_id} className="border p-4 rounded shadow">
                    <h2 className="text-lg font-semibold">{campaign.name}</h2>
                    <p>Amount: ₹{Number(campaign.price) / 100}</p>
                    <Link
                        href={`/donate/${campaign.stripe_price_id}`}
                        className="inline-block mt-2 px-4 py-2 bg-green-600 text-white rounded"
                    >
                        I want to support
                    </Link>
                </div>
            ))}
        </div>
    );
}
