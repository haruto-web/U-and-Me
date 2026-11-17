import { AdminContentManager } from "@/components/admin-content-manager";
import { requireAdmin } from "@/lib/auth";

export default async function AdminPage() {
  const { supabase } = await requireAdmin();
  const [{ data, error }, { data: members, error: membersError }] = await Promise.all([
    supabase
      .from("site_content")
      .select("id, kind, title, body, recipient_id, prompt, event_date, created_by, created_at, updated_at")
      .order("created_at", { ascending: false }),
    supabase
      .from("profiles")
      .select("id, email")
      .eq("is_member", true)
      .order("email"),
  ]);

  if (error || membersError) {
    if (error) {
      console.error("Could not load admin content.", error);
    }
    if (membersError) {
      console.error("Could not load admin member list.", membersError);
    }
    throw new Error("Could not load the admin dashboard. Please try again.");
  }

  return (
    <div className="page-stack">
      <section className="section-hero">
        <span className="eyebrow">JUST FOR THE ADMIN</span>
        <h2>Your little control corner.</h2>
        <p>Create, update, and remove shared memories, letters, garden notes, and surprises.</p>
      </section>
      <div className="admin-notice">
        <span aria-hidden="true">✓</span>
        Admin access is checked on the server and again by Supabase database policies.
      </div>
      <AdminContentManager items={data ?? []} members={members ?? []} />
    </div>
  );
}
