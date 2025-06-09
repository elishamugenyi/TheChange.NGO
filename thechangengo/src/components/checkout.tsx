'use client'

import {
    EmbeddedCheckout,
    EmbeddedCheckoutProvider
} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

import { fetchClientSecret } from '../app/actions/stripe'

const stripePromise = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  : null;

export default function Checkout() {
    return (
        <div id= "checkout" >
        <EmbeddedCheckoutProvider
        stripe={ stripePromise }
    options = {{ fetchClientSecret }
}
      >
    <EmbeddedCheckout />
    </EmbeddedCheckoutProvider>
    </div>
  )
}