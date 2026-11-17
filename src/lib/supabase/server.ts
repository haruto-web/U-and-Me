import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "@/lib/database.types";
import { getSupabaseConfig } from "./config";

export async function createSupabaseServerClient(options?: {
  allowCookieWrites?: boolean;
}) {
  const config = getSupabaseConfig();

  if (!config) {
    throw new Error("Supabase is not configured. Follow SUPABASE-SETUP.md.");
  }

  const cookieStore = await cookies();

  return createServerClient<Database>(config.url, config.publishableKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        if (!options?.allowCookieWrites) {
          throw new Error(
            "Supabase tried to update cookies while rendering a page. Check the session-refresh proxy.",
          );
        }

        cookiesToSet.forEach(({ name, value, options: cookieOptions }) => {
          cookieStore.set(name, value, cookieOptions);
        });
      },
    },
  });
}
