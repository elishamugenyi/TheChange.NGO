// // lib/supabase.ts
// import { createServerClient } from '@supabase/ssr'
// import { cookies } from 'next/headers'

// export function createSupabaseServerClient() {
//     return createServerClient(
//         process.env.NEXT_PUBLIC_SUPABASE_URL!,
//         process.env.SUPABASE_SERVICE_ROLE_KEY!, // for server-side inserts
//         {
//             cookies
//         }
//     )
// }

// lib/supabase/server.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export function createClient() {
    return createClient(supabaseUrl, supabaseServiceRoleKey);
}
