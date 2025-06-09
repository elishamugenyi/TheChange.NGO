// app/return/page.tsx
import { redirect } from 'next/navigation';
import { stripe } from '../lib/stripe';

export default async function ReturnPage({ searchParams }: { searchParams: { session_id?: string } }) {
    const session_id = searchParams?.session_id;

    if (!session_id) {
        throw new Error('Please provide a valid session_id (`cs_test_...`)');
    }

    const session = await stripe.checkout.sessions.retrieve(session_id, {
        expand: ['line_items', 'payment_intent'],
    });

    const customerEmail = session.customer_details?.email;
    const status = session.status;

    if (status === 'open') {
        return redirect('/');
    }

    if (status === 'complete') {
        return (
            <section className="p-6">
                <h1 className="text-xl font-semibold mb-4">🎉 Thank You!</h1>
                <p>
                    We appreciate your support! A confirmation email will be sent to{' '}
                    <strong>{customerEmail}</strong>.
                </p>
                <p className="mt-4">If you have any questions, email us at <a href="mailto:orders@example.com" className="text-blue-600 underline">orders@example.com</a>.</p>
            </section>
        );
    }

    return (
        <section className="p-6">
            <h1 className="text-xl font-semibold mb-4">⚠️ Something went wrong</h1>
            <p>We couldn&apos;t confirm your donation session.</p>
        </section>
    );
}
