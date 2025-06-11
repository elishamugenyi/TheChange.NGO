// import Stripe from 'stripe';
// import { createClient } from '@supabase/supabase-js';

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
// const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

// export default async function handler(req, res) {
//     if (req.method !== 'POST') {
//         return res.status(405).json({ message: 'Method not allowed' });
//     }

//     try {
//         const { name, description, price } = req.body;

//         // Create product in Stripe
//         const stripeProduct = await stripe.products.create({
//             name,
//             description,
//         });

//         // Create price for the product
//         const stripePrice = await stripe.prices.create({
//             product: stripeProduct.id,
//             unit_amount: Math.round(price * 100), // Stripe uses cents
//             currency: 'usd',
//         });

//         // Save to Supabase
//         const { data, error } = await supabase
//             .from('campaigns')
//             .insert({
//                 name,
//                 description,
//                 price,
//                 stripe_product_id: stripeProduct.id,
//                 stripe_price_id: stripePrice.id,
//             })
//             .select()
//             .single();

//         if (error) throw error;

//         res.status(200).json({ message: 'Campaign added successfully', campaign: data });
//     } catch (error) {
//         console.error('Error adding campaign:', error);
//         res.status(500).json({ message: 'Error adding campaign', error: error.message });
//     }
// }