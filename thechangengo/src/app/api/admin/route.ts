//file retrieves data to populate admin dashboard.

import { NextResponse } from "next/server";
import { supabase } from "../../lib/db";

//fetch all users from user_profiles table endpoint
export async function GET() {
    try {
        const { data, error } = await supabase.from('user_profiles').select('*');
        if (error) {
            return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
        }
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching users:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
//edit or update endpoint for user profile
export async function PUT(request: Request) {
    try {
        const body = await request.json();
        const { user_id, ...updateData } = body;
        const { data, error } = await supabase.from('user_profiles').update(updateData).eq('id', user_id);
        if (error) {
            return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
        }
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error updating user:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
//delete endpoint for user profile
export async function DELETE(request: Request) {
    try {
        const body = await request.json();
        const { user_id } = body;
        const { data, error } = await supabase.from('user_profiles').delete().eq('id', user_id);
        if (error) {
            return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
        }
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error deleting user:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

