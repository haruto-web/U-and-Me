import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import type { Database } from "@/lib/database.types";
import { getSupabaseConfig } from "./config";

export async function updateSession(request: NextRequest) {
  const config = getSupabaseConfig();

  if (!config) {
    return {
      configured: false as const,
      failed: false as const,
      response: NextResponse.next({ request }),
    };
  }

  let response = NextResponse.next({ request });
  const supabase = createServerClient<Database>(config.url, config.publishableKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet, headers) {
        cookiesToSet.forEach(({ name, value }) => {
          request.cookies.set(name, value);
        });
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
        for (const [name, value] of Object.entries(headers)) {
          response.headers.set(name, value);
        }
      },
    },
  });

  const { data, error } = await supabase.auth.getClaims();

  if (error && error.name !== "AuthSessionMissingError") {
    console.error("Could not verify the Supabase session.", error);
    return {
      configured: true as const,
      failed: true as const,
      response: NextResponse.json(
        { error: "Could not verify your session. Please try again." },
        { status: 503, headers: { "Cache-Control": "private, no-store" } },
      ),
    };
  }

  response.headers.set("Cache-Control", "private, no-store, max-age=0");

  return {
    configured: true as const,
    failed: false as const,
    response,
    userId: data?.claims?.sub,
    supabase,
  };
}
