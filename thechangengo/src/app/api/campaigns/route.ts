// app/api/campaigns/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createCampaign } from '../../lib/stripeSupabase';

export async function POST(req: NextRequest) {
    
    const { name, description, price, isRecurring } = await req.json();
    try {
        const isRecurring = false;    
        const result = await createCampaign({ name, description, price, isRecurring });
        return NextResponse.json({ success: true, result });
    } catch (err: any) {
        return NextResponse.json({ success: false, message: err.message }, { status: 500 });
    }
}
