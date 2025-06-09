// app/donate/prod/[priceId]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchClientSecret } from '../../../actions/stripe';
import {
    EmbeddedCheckoutProvider,
    EmbeddedCheckout,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function CheckoutPage() {
    const { priceId } = useParams();
    const [clientSecret, setClientSecret] = useState<string | null>(null);

    useEffect(() => {
        const getClientSecret = async () => {
            const secret = await fetchClientSecret(priceId as string);
            setClientSecret(secret);
        };

        getClientSecret();
    }, [priceId]);

    return (
        <div className="p-6">
            <h1 className="text-xl font-bold mb-4">Processing your donation...</h1>
            {clientSecret && stripePromise && (
                <EmbeddedCheckoutProvider
                    stripe={stripePromise}
                    options={{ clientSecret }}
                >
                    <EmbeddedCheckout />
                </EmbeddedCheckoutProvider>
            )}
        </div>
    );
}
