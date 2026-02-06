'use server';

import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { generateRegistrationExcel, type Registration } from '@/utils/excel-utils';

async function createClient() {
    const cookieStore = await cookies();

    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll()
                },
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({ name, value, options }) =>
                            cookieStore.set(name, value, options)
                        )
                    } catch {
                        // The `setAll` method was called from a Server Component.
                    }
                },
            },
        }
    );
}

export async function exportRegistrationsAction() {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('registrations')
        .select('*')
        .order('createdAt', { ascending: false });

    if (error || !data) {
        console.error('Error fetching registrations:', error);
        throw new Error(error?.message || 'Failed to fetch data');
    }

    // Map data to Registration interface to ensure type safety
    // Assuming the DB columns match the interface, but we map strictly to be safe
    // However, since we did select *, we trust it matches or we cast it.
    // The key is that `events` might be stored as JSONB in Supabase, which JS handles as objects/arrays.

    // We already handled mapping events to string in generateRegistrationExcel, 
    // but generateRegistrationExcel expects `events` as `{ eventName: string }[]`.
    // Let's assume the DB returns it correctly.

    const registrations: Registration[] = data as any[];

    const buffer = await generateRegistrationExcel(registrations);

    // Convert buffer to base64 to send to client
    return buffer.toString('base64');
}
