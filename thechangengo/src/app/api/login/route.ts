//handle login and authentication

import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { supabase } from "../../lib/db";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();
    if (!username || !password) {
      return NextResponse.json({ error: 'Username and password required' }, { status: 400 });
    }

    //console.log("Connecting to DB...");
    const { data, error } = await supabase
      .from('user_credentials')
      .select('id, user_name, password_hash, role')
      .eq('user_name', username)
      .single();
    //console.log("DB Query Result:", { data, error });

    if (error || !data) {
      return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
    }

    // Compare password
    const passwordMatch = await bcrypt.compare(password, data.password_hash);
    //console.log("Password match:", passwordMatch);
    if (!passwordMatch) {
      return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
    }

    // Create JWT token
    const token = jwt.sign(
      {
        id: data.id,
        user_name: data.user_name,
        role: data.role,
      },
      process.env.JWT_SECRET || 'changeme',
      { expiresIn: '1h' }
    );

    //console.log("JWT Payload:", { id: data.id, user_name: data.user_name, role: data.role });
    //console.log("JWT Token:", token);

    return NextResponse.json({ success: true, token, role: data.role });
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}


