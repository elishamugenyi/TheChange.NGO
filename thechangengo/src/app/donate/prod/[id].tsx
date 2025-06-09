'use client'

import { useEffect, useState } from 'react'
import { fetchClientSecret } from '../../actions/stripe'

export default function DonateButton({ priceId }: { priceId: string }) {
    const [clientSecret, setClientSecret] = useState<string | null>(null)

    useEffect(() => {
        const createSession = async () => {
            const secret = await fetchClientSecret(priceId)
            setClientSecret(secret)
        }

        createSession()
    }, [priceId])

    return (
        <div>
            <button className="btn-primary">Proceed to Payment</button>
            {clientSecret && <p>Client secret: {clientSecret}</p>}
        </div>
    )
}
