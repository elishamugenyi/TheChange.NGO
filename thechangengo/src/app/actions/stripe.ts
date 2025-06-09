'use server'

import { headers } from 'next/headers'
import { stripe } from '../lib/stripe'

export async function fetchClientSecret(priceId: string) {
    const origin = (await headers()).get('origin') || 'http://localhost:3000'

    const session = await stripe.checkout.sessions.create({
        ui_mode: 'embedded',
        line_items: [
            {
                price: priceId, // Use the dynamic price ID here
                quantity: 1
            }
        ],
        mode: 'payment',
        return_url: `${origin}/return?session_id={CHECKOUT_SESSION_ID}`,
    })

    return session.client_secret
}
