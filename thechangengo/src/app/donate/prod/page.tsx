// import Checkout from '../../../components/checkout'

// export default function Page() {
//     return (
//         <div id="checkout">
//             <Checkout />
//         </div>
//     )
// }

// pages/donate/prod.tsx
'use client';

import { useRouter } from 'next/navigation';

const campaigns = [
    {
        id: 'price_1RY3Ji4GcDSlaxvHxi5NcJEq', // Stripe Price ID
        name: 'Educate a Child',
        amount: 1000,
        currency: 'inr',
    },
    {
        id: 'price_1RY3k04GcDSlaxvHzDgfZ9u9',
        name: 'Feed the Hungry',
        amount: 2000,
        currency: 'inr',
    },
];

export default function DonateProdPage() {
    const router = useRouter();

    return (
        <div className="p-6 space-y-4">
            <h1 className="text-2xl font-bold">Support a Campaign</h1>
            {campaigns.map((campaign) => (
                <div key={campaign.id} className="border p-4 rounded shadow">
                    <h2 className="text-lg font-semibold">{campaign.name}</h2>
                    <p>Amount: ₹{campaign.amount / 100}</p>
                    <button
                        onClick={() => router.push(`/donate/prod/${campaign.id}`)}
                        className="mt-2 px-4 py-2 bg-green-600 text-white rounded"
                    >
                        I want to support
                    </button>
                </div>
            ))}
        </div>
    );
}
