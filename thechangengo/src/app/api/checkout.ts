// // app/api/checkout/route.ts
// import Stripe from 'stripe';
// import { NextRequest, NextResponse } from 'next/server';

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//     apiVersion: '2025-05-28.basil',
// });

// export async function POST(req: NextRequest) {
//     const formData = await req.formData();
//     const amount = parseFloat(formData.get('amount') as string);
//     const price_id = formData.get('price_id') as string;
//     const isRecurring = formData.get('isrecurring') === 'true'; // expects "true" or "false" string

//     if (isNaN(amount) || amount < 10) {
//         return NextResponse.json({ error: 'Minimum amount is $10' }, { status: 400 });
//     }

//     const amountInCents = Math.round(amount * 100);

//     // Create dynamic price
//     const price = await stripe.prices.create({
//         currency: 'usd',
//         unit_amount: amountInCents,
//         recurring: isRecurring ? { interval: 'month' } : undefined,
//         product_data: {
//             name: `Donation - ${isRecurring ? 'Monthly' : 'One-Time'} - ${price_id}`,
//         },
//     });

//     // Create the appropriate Checkout session
//     const session = await stripe.checkout.sessions.create({
//         mode: isRecurring ? 'subscription' : 'payment',
//         line_items: [
//             {
//                 price: price.id,
//                 quantity: 1,
//             },
//         ],
//         success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/thank-you`,
//         cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/donate`,
//     });

//     return NextResponse.redirect(session.url!, { status: 303 });
// }
