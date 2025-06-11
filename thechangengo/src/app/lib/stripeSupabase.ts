import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-05-28.basil',
});
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function createCampaign({
    name,
    description,
    price,         // received in dollars
    isRecurring,
}: {
    name: string;
    description: string;
    price: number;
    isRecurring: boolean;
}) {
    // Convert to cents and validate
    const dollars = Math.floor(price);
    if (dollars < 10) throw new Error('Minimum donation amount is $10');
    const amountInCents = dollars * 100;

    // 1. Create Stripe Product
    const product = await stripe.products.create({ name, description });

    // 2. Create Stripe Price in cents
    const stripePrice = await stripe.prices.create({
        currency: 'usd',
        unit_amount: amountInCents,
        product: product.id,
        ...(isRecurring ? { recurring: { interval: 'month' } } : {}),
    });

    // 3. Insert into Supabase, storing cents
    const { data, error } = await supabase
        .from('campaigns')
        .insert([
            {
                name,
                description,
                price: amountInCents,           // store cents
                stripe_product_id: product.id,
                stripe_price_id: stripePrice.id,
                is_recurring: isRecurring,
            },
        ])
        .select(); // return inserted row
    if (error) throw new Error(error.message);

    return { supabaseData: data, stripeProduct: product, stripePrice };
}
