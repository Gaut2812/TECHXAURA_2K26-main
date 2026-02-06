'use server';

import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { generateTeamExcel, type TeamMember } from '@/utils/excel-utils';

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
                        // This can be ignored if you have middleware refreshing
                        // user sessions.
                    }
                },
            },
        }
    );
}

export async function saveTeamMember(formData: FormData) {
    const supabase = await createClient();

    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone_number = formData.get('phone_number') as string;
    const screenshot_url = formData.get('screenshot_url') as string;

    if (!name || !email || !phone_number) {
        return { error: 'Missing required fields' };
    }

    const { error } = await supabase
        .from('team_members')
        .insert({
            name,
            email,
            phone_number,
            screenshot_url,
        });

    if (error) {
        console.error('Error saving team member:', error);
        return { error: error.message };
    }

    return { success: true };
}

export async function exportTeamMembersAction() {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('team_members')
        .select('name, email, phone_number, screenshot_url');

    if (error || !data) {
        console.error('Error fetching members:', error);
        throw new Error(error?.message || 'Failed to fetch data');
    }

    const members: TeamMember[] = data.map((d: any) => ({
        name: d.name,
        email: d.email,
        phone_number: d.phone_number,
        screenshot_url: d.screenshot_url,
    }));

    const buffer = await generateTeamExcel(members);

    // Convert buffer to base64 to send to client
    return buffer.toString('base64');
}
