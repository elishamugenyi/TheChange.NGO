// app/api/checkout/route.ts
import Stripe from 'stripe';
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '../../lib/supabase';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-05-28.basil',
});

export async function POST(req: NextRequest) {
    const formData = await req.formData();
    const amount = parseFloat(formData.get('amount') as string);
    const price_id = formData.get('price_id') as string;

    if (isNaN(amount) || amount < 10) {
        return NextResponse.json({ error: 'Minimum amount is $10' }, { status: 400 });
    }

    const supabase = createClient();

    // 🔍 Lookup campaign by stripe_price_id
    const { data: campaign, error } = await supabase
        .from('campaigns')
        .select('is_recurring')
        .eq('stripe_price_id', price_id)
        .single();

    if (error || !campaign) {
        return NextResponse.json({ error: 'Campaign not found or missing is_recurring' }, { status: 404 });
    }

    const isRecurring = campaign.is_recurring;
    const amountInCents = Math.round(amount * 100);

    // ✅ Create a new price dynamically
    const price = await stripe.prices.create({
        currency: 'usd',
        unit_amount: amountInCents,
        product_data: {
            name: `Donation - ${isRecurring ? 'Monthly' : 'One-Time'} - ${price_id}`,
        },
        recurring: isRecurring ? { interval: 'month' } : undefined,
    });

    const session = await stripe.checkout.sessions.create({
        mode: isRecurring ? 'subscription' : 'payment',
        line_items: [{ price: price.id, quantity: 1 }],
        success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/thank-you`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/donate`,
    });

    return NextResponse.redirect(session.url!, { status: 303 });
}
