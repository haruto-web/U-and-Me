import "server-only";

import type { ContentKind } from "@/lib/content";
import { requireMember } from "@/lib/auth";

export async function getSiteContent(kind?: ContentKind) {
  const { supabase } = await requireMember();
  let query = supabase
    .from("site_content")
    .select("id, kind, title, body, recipient_id, prompt, event_date, created_by, created_at, updated_at")
    .order("created_at", { ascending: false });

  if (kind) {
    query = query.eq("kind", kind);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Could not load shared content.", error);
    throw new Error("Could not load your shared content. Please try again.");
  }

  return data ?? [];
}

export async function getOtherMembers() {
  const { supabase, user } = await requireMember();
  const { data, error } = await supabase
    .from("profiles")
    .select("id, email")
    .eq("is_member", true)
    .neq("id", user.id)
    .order("email");

  if (error) {
    console.error("Could not load shared-space members.", error);
    throw new Error("Could not load the shared-space members. Please try again.");
  }

  return data ?? [];
}
