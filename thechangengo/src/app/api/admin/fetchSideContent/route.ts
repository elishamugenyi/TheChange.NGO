import { NextResponse } from "next/server";
import { supabase } from "../../../lib/db";

export async function GET() {
    try {
        const { data, error } = await supabase.from('page_content').select('*').neq('title', 'User Configuration');
        if (error) {
            return NextResponse.json({ error: 'Failed to fetch page content' }, { status: 500 });
        }
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching page content:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
} 