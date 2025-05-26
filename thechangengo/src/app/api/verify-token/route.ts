//file handles tokens and login users.

import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';

export async function POST(request: NextRequest) {
    const token  = request.headers.get('authorization')?.split(' ')[1]; //extract token
    if (!token) {
        return NextResponse.json({ success: false, error: 'No token provided' }, { status: 400 });
    }

    try {
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error("Missing JWT Secret");
        }

        const decoded = jwt.verify(token, secret) as { id: string; email: string; role: string};
        return NextResponse.json({ success: true, admin: decoded});
        
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Invalid token' }, { status: 401 });
    }
}   