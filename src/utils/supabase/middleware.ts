import { createServerClient } from "@supabase/ssr"
import { type NextRequest, NextResponse } from "next/server"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

export async function updateSession(
  request: NextRequest,
  response: NextResponse = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })
) {
  if (!supabaseUrl || !supabaseKey) {
    return response
  }

  let supabaseResponse = response

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))

        cookiesToSet.forEach(({ name, value, options }) => {
          supabaseResponse.cookies.set(name, value, options)
        })
      },
    },
  })

  // Required by Supabase SSR: calling getUser refreshes expired auth sessions.
  await supabase.auth.getUser()

  return supabaseResponse
}
