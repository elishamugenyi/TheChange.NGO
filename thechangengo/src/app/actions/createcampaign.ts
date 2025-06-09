'use server'

import { stripe } from '../lib/stripe'
import { createSupabaseServerClient } from '../lib/supabase'

export async function createCampaign({
    name,
    description,
    amount
}: {
    name: string
    description: string
    amount: number
}) {
    // Create product in Stripe
    const product = await stripe.products.create({ name, description })

    // Create price
    const price = await stripe.prices.create({
        product: product.id,
        unit_amount: amount,
        currency: 'inr'
    })

    // Create Supabase client
    const supabase = createSupabaseServerClient()

    // Insert into Supabase
    const { data, error } = await supabase
        .from('campaigns')
        .insert({
            name,
            description,
            amount,
            stripe_product_id: product.id,
            stripe_price_id: price.id
        })
        .select()
        .single()

    if (error) {
        console.error('Supabase error:', error)
        throw new Error('Could not create campaign')
    }

    return data
}
