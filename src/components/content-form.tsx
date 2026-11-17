"use client";

import { useActionState } from "react";
import { createMemberContent, type AdminActionState } from "@/app/admin/actions";

type ContentFormProps = {
  title: string;
  description: string;
  kind: "memory" | "letter";
  recipients?: { id: string; email: string | null }[];
  includePhoto?: boolean;
  messageLabel?: string;
};

export function ContentForm({
  title,
  description,
  kind,
  recipients = [],
  includePhoto = false,
  messageLabel = "Your words",
}: ContentFormProps) {
  const [state, formAction, pending] = useActionState(createMemberContent, {
    error: null,
    success: null,
  } satisfies AdminActionState);

  return (
    <div className="page-stack">
      <section className="section-hero">
        <span className="eyebrow">A LITTLE SOMETHING TO KEEP</span>
        <h2>{title}</h2>
        <p>{description}</p>
      </section>
      <form action={formAction} className="panel content-form">
        <input name="kind" type="hidden" value={kind} />
        <label>
          <span>Title</span>
          <input maxLength={120} name="title" placeholder="Give this a little name" required />
        </label>
        {kind === "memory" && (
          <label>
            <span>When was it? (optional)</span>
            <input name="event_date" type="date" />
          </label>
        )}
        {includePhoto && (
          <label>
            <span>Photo</span>
            <input name="photo" type="file" accept="image/*" disabled />
            <small>Photo uploads will be available when storage is connected.</small>
          </label>
        )}
        {kind === "letter" && (
          <>
            <label>
              <span>Who is this letter for?</span>
              <select defaultValue="" name="recipient_id" required>
                <option disabled value="">Choose the other member</option>
                {recipients.map((recipient) => (
                  <option key={recipient.id} value={recipient.id}>
                    {recipient.email ?? "Shared-space member"}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span>Envelope prompt (optional)</span>
              <input maxLength={240} name="prompt" placeholder="Open when you need a smile..." />
            </label>
          </>
        )}
        <label>
          <span>{messageLabel}</span>
          <textarea maxLength={10000} name="body" rows={6} placeholder="Write from the heart..." required />
        </label>
        <div className="form-footer">
          <span>Only you and the intended recipient can view private letters.</span>
          <button className="button button-primary" type="submit" disabled={pending}>
            {pending ? "Saving..." : "Save to our space"} <span aria-hidden="true">♡</span>
          </button>
        </div>
        {state.error && <p className="form-error" role="alert">{state.error}</p>}
        {state.success && <p className="form-success" role="status">{state.success}</p>}
      </form>
    </div>
  );
}
