"use server";

import { revalidatePath } from "next/cache";
import { isContentKind } from "@/lib/content";
import { requireAdmin, requireMember } from "@/lib/auth";

export type AdminActionState = { error: string | null; success: string | null };

const emptyState: AdminActionState = { error: null, success: null };
const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
type ParsedContent =
  | {
      value: {
        kind: import("@/lib/database.types").ContentKind;
        title: string;
        body: string;
        recipient_id: string | null;
        prompt: string | null;
        event_date: string | null;
      };
    }
  | { error: string };

function readContent(formData: FormData): ParsedContent {
  const kindValue = String(formData.get("kind") ?? "");
  const title = String(formData.get("title") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();
  const recipientId = String(formData.get("recipient_id") ?? "").trim();
  const prompt = String(formData.get("prompt") ?? "").trim();
  const dateValue = String(formData.get("event_date") ?? "").trim();
  const event_date = dateValue || null;

  if (!isContentKind(kindValue)) {
    return { error: "Choose a valid content type." };
  }
  if (!title || title.length > 120 || !body || body.length > 10000) {
    return { error: "Add a title (up to 120 characters) and text (up to 10,000 characters)." };
  }
  if (prompt.length > 240) {
    return { error: "Prompts are limited to 240 characters." };
  }
  if (event_date && (!/^\d{4}-\d{2}-\d{2}$/.test(event_date) || Number.isNaN(Date.parse(`${event_date}T00:00:00Z`)))) {
    return { error: "Enter a valid date." };
  }

  return {
    value: {
      kind: kindValue,
      title,
      body,
      recipient_id: recipientId || null,
      prompt: prompt || null,
      event_date,
    },
  };
}

function revalidateContentPages() {
  for (const path of ["/", "/admin", "/memories", "/letters", "/garden", "/surprises", "/special"]) {
    revalidatePath(path);
  }
}

export async function createSiteContent(
  _previousState: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  const { supabase, user } = await requireAdmin();
  const parsed = readContent(formData);

  if (!("value" in parsed)) {
    return { ...emptyState, error: parsed.error };
  }
  if (parsed.value.kind === "letter" && !parsed.value.recipient_id) {
    return { ...emptyState, error: "Choose an active member as the letter recipient." };
  }

  const recipientError = await verifyRecipient(supabase, parsed.value.recipient_id);
  if (recipientError) {
    return { ...emptyState, error: recipientError };
  }

  const { error } = await supabase.from("site_content").insert({
    ...parsed.value,
    created_by: user.id,
  });

  if (error) {
    console.error("Could not create site content.", error);
    return { ...emptyState, error: "Could not save this item. Check the Supabase setup and try again." };
  }

  revalidateContentPages();
  return { ...emptyState, success: "Saved." };
}

export async function updateSiteContent(
  _previousState: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  const { supabase } = await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const parsed = readContent(formData);

  if (!uuidPattern.test(id)) {
    return { ...emptyState, error: "This item has an invalid ID." };
  }
  if (!("value" in parsed)) {
    return { ...emptyState, error: parsed.error };
  }
  if (parsed.value.kind === "letter" && !parsed.value.recipient_id) {
    return { ...emptyState, error: "Choose an active member as the letter recipient." };
  }

  const recipientError = await verifyRecipient(supabase, parsed.value.recipient_id);
  if (recipientError) {
    return { ...emptyState, error: recipientError };
  }

  const { data, error } = await supabase
    .from("site_content")
    .update(parsed.value)
    .eq("id", id)
    .select("id")
    .maybeSingle();

  if (error || !data) {
    if (error) {
    console.error("Could not update site content.", error);
    }
    return { ...emptyState, error: "Could not update this item. Check the Supabase setup and try again." };
  }

  revalidateContentPages();
  return { ...emptyState, success: "Updated." };
}

export async function deleteSiteContent(
  _previousState: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  const { supabase } = await requireAdmin();
  const id = String(formData.get("id") ?? "");

  if (!uuidPattern.test(id)) {
    return { ...emptyState, error: "This item has an invalid ID." };
  }

  const { data, error } = await supabase
    .from("site_content")
    .delete()
    .eq("id", id)
    .select("id")
    .maybeSingle();

  if (error || !data) {
    if (error) {
    console.error("Could not delete site content.", error);
    }
    return { ...emptyState, error: "Could not delete this item. Check the Supabase setup and try again." };
  }

  revalidateContentPages();
  return { ...emptyState, success: "Deleted." };
}

export async function createMemberContent(
  _previousState: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  const { supabase, user } = await requireMember();
  const kind = String(formData.get("kind") ?? "");
  const title = String(formData.get("title") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();
  const recipientId = String(formData.get("recipient_id") ?? "").trim();
  const prompt = String(formData.get("prompt") ?? "").trim();
  const dateValue = String(formData.get("event_date") ?? "").trim();
  const event_date = dateValue || null;

  if (kind !== "memory" && kind !== "letter") {
    return { ...emptyState, error: "You can only add a memory or a letter here." };
  }
  if (!title || title.length > 120 || !body || body.length > 10000) {
    return { ...emptyState, error: "Add a title (up to 120 characters) and text (up to 10,000 characters)." };
  }
  if (prompt.length > 240) {
    return { ...emptyState, error: "Prompts are limited to 240 characters." };
  }
  if (kind === "letter" && (!uuidPattern.test(recipientId) || recipientId === user.id)) {
    return { ...emptyState, error: "Choose the other member as the letter recipient." };
  }
  if (event_date && (!/^\d{4}-\d{2}-\d{2}$/.test(event_date) || Number.isNaN(Date.parse(`${event_date}T00:00:00Z`)))) {
    return { ...emptyState, error: "Enter a valid date." };
  }
  if (kind === "letter" && recipientId.length > 36) {
    return { ...emptyState, error: "Choose a valid member as the letter recipient." };
  }

  const { error } = await supabase.from("site_content").insert({
    kind,
    title,
    body,
    recipient_id: recipientId || null,
    prompt: prompt || null,
    event_date,
    created_by: user.id,
  });

  if (error) {
    console.error("Could not save member content.", error);
    return { ...emptyState, error: "Could not save this item. Check the Supabase setup and try again." };
  }

  revalidateContentPages();
  return { ...emptyState, success: "Saved to your shared space." };
}

async function verifyRecipient(
  supabase: Awaited<ReturnType<typeof requireAdmin>>["supabase"],
  recipientId: string | null,
) {
  if (!recipientId) {
    return null;
  }

  if (!uuidPattern.test(recipientId)) {
    return "Choose a valid member as the recipient.";
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("id")
    .eq("id", recipientId)
    .eq("is_member", true)
    .maybeSingle();

  if (error) {
    console.error("Could not verify the letter recipient.", error);
    return "Could not verify the recipient. Please try again.";
  }

  return data ? null : "Choose an active member as the letter recipient.";
}
