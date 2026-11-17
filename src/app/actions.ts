"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type AuthActionState = { error: string | null };

export async function signIn(
  _previousState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (!email || !password || password.length > 256) {
    return { error: "Enter the email and password for your account." };
  }

  const supabase = await createSupabaseServerClient({ allowCookieWrites: true });
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error || !data.user) {
    return { error: "The email or password is incorrect." };
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("is_member")
    .eq("id", data.user.id)
    .maybeSingle();

  if (profileError) {
    console.error("Could not verify account membership after sign-in.", profileError);
    await supabase.auth.signOut();
    return { error: "Could not verify account access. Please try again." };
  }

  if (!profile?.is_member) {
    await supabase.auth.signOut();
    return { error: "This account has not been enabled for the shared space." };
  }

  redirect("/");
}

export async function signOut() {
  const supabase = await createSupabaseServerClient({ allowCookieWrites: true });
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Could not sign out.", error);
    throw new Error("Could not sign out. Please try again.");
  }

  redirect("/login");
}
