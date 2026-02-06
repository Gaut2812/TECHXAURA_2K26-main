import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const error = searchParams.get('error')
  const error_description = searchParams.get('error_description')

  // Handle OAuth errors
  if (error) {
    return NextResponse.redirect(
      new URL(`/auth?error=${error}&error_description=${error_description}`, request.url)
    )
  }

  if (code) {
    const cookieStore = await cookies()
    const supabase = createServerClient(
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
            } catch (error) {
              // The `set` method was called from a Server Component.
              // This can be ignored if you have middleware refreshing
              // user sessions.
            }
          },
        },
      }
    )

    // Exchange the code for a session
    const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)

    if (!exchangeError) {
      // Redirect to dashboard on success
      return NextResponse.redirect(new URL('/dashboard', request.url))
    } else {
      // Return to auth page with error details
      console.error('[OAuth Callback Error]', exchangeError)
      return NextResponse.redirect(
        new URL(`/auth?error=${encodeURIComponent(exchangeError.message || 'OAuth failed')}`, request.url)
      )
    }
  }

  // Return to auth page on error (no code provided)
  return NextResponse.redirect(new URL('/auth?error=no_code', request.url))
}
