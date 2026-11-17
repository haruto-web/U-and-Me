import { redirect } from "next/navigation";
import { getSupabaseConfig } from "@/lib/supabase/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function requireMember() {
  if (!getSupabaseConfig()) {
    redirect("/login?error=configuration");
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect("/login");
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("is_member, is_admin")
    .eq("id", user.id)
    .maybeSingle();

  if (profileError) {
    console.error("Could not load the signed-in user's profile.", profileError);
    throw new Error("Could not verify account access. Please try again.");
  }

  if (!profile?.is_member) {
    redirect("/login?error=not_authorized");
  }

  return { supabase, user, isAdmin: profile.is_admin };
}

export async function requireAdmin() {
  const access = await requireMember();

  if (!access.isAdmin) {
    redirect("/");
  }

  return access;
}
