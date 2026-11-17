"use client";

import { useActionState } from "react";
import {
  createSiteContent,
  deleteSiteContent,
  updateSiteContent,
  type AdminActionState,
} from "@/app/admin/actions";
import {
  contentKindLabels,
  contentKindPluralLabels,
  contentKinds,
  type ContentKind,
  type SiteContent,
} from "@/lib/content";

const initialState: AdminActionState = { error: null, success: null };
type MemberOption = { id: string; email: string | null };

function ActionMessage({ state }: { state: AdminActionState }) {
  if (state.error) {
    return <p className="form-error" role="alert">{state.error}</p>;
  }
  if (state.success) {
    return <p className="form-success" role="status">{state.success}</p>;
  }
  return null;
}

function ContentFields({
  item,
  kind,
  members,
}: {
  item?: SiteContent;
  kind: ContentKind;
  members: MemberOption[];
}) {
  return (
    <>
      <label>
        <span>Title</span>
        <input
          defaultValue={item?.title}
          maxLength={120}
          name="title"
          required
        />
      </label>
      <label>
        <span>Message or description</span>
        <textarea
          defaultValue={item?.body}
          maxLength={10000}
          name="body"
          required
          rows={4}
        />
      </label>
      <div className="admin-fields-row">
        {kind === "letter" && (
          <label>
            <span>Recipient</span>
            <select defaultValue={item?.recipient_id ?? ""} name="recipient_id" required>
              <option disabled value="">Choose a member</option>
              {members.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.email ?? "Shared-space member"}
                </option>
              ))}
            </select>
          </label>
        )}
        <label>
          <span>Date (optional)</span>
          <input defaultValue={item?.event_date ?? ""} name="event_date" type="date" />
        </label>
      </div>
      <label>
        <span>Envelope prompt / note (optional)</span>
        <input defaultValue={item?.prompt ?? ""} maxLength={240} name="prompt" />
      </label>
    </>
  );
}

function CreateContentForm({
  kind,
  members,
}: {
  kind: ContentKind;
  members: MemberOption[];
}) {
  const [state, formAction, pending] = useActionState(createSiteContent, initialState);

  return (
    <form action={formAction} className="admin-content-form">
      <input name="kind" type="hidden" value={kind} />
      <ContentFields kind={kind} members={members} />
      <ActionMessage state={state} />
      <button className="button button-primary" disabled={pending} type="submit">
        {pending ? "Saving..." : `Add ${contentKindLabels[kind].toLowerCase()}`}
      </button>
    </form>
  );
}

function ContentItemEditor({
  item,
  members,
}: {
  item: SiteContent;
  members: MemberOption[];
}) {
  const [updateState, updateAction, updating] = useActionState(updateSiteContent, initialState);
  const [deleteState, deleteAction, deleting] = useActionState(deleteSiteContent, initialState);

  return (
    <details className="admin-item">
      <summary>
        <span>
          <strong>{item.title}</strong>
          <small>{item.created_at.slice(0, 10)}</small>
        </span>
        <span className="admin-item-chevron" aria-hidden="true">⌄</span>
      </summary>
      <form action={updateAction} className="admin-content-form">
        <input name="id" type="hidden" value={item.id} />
        <input name="kind" type="hidden" value={item.kind} />
        <ContentFields item={item} kind={item.kind} members={members} />
        <ActionMessage state={updateState} />
        <button className="button button-primary" disabled={updating} type="submit">
          {updating ? "Saving..." : "Save changes"}
        </button>
      </form>
      <form action={deleteAction} className="delete-content-form">
        <input name="id" type="hidden" value={item.id} />
        <ActionMessage state={deleteState} />
        <button className="delete-button" disabled={deleting} type="submit">
          {deleting ? "Deleting..." : "Delete this item"}
        </button>
      </form>
    </details>
  );
}

export function AdminContentManager({
  items,
  members,
}: {
  items: SiteContent[];
  members: MemberOption[];
}) {
  return (
    <div className="admin-content-sections">
      {contentKinds.map((kind) => {
        const kindItems = items.filter((item) => item.kind === kind);

        return (
          <section className="admin-content-section panel" key={kind}>
            <div className="admin-content-heading">
              <div>
                <span className="eyebrow">MANAGE SHARED CONTENT</span>
                <h3>{contentKindPluralLabels[kind]} <span>({kindItems.length})</span></h3>
              </div>
              <span className="admin-tool-icon" aria-hidden="true">
                {kind === "memory" ? "♡" : kind === "letter" ? "✉" : "✿"}
              </span>
            </div>
            <CreateContentForm kind={kind} members={members} />
            {kindItems.length > 0 ? (
              <div className="admin-items">
                {kindItems.map((item) => (
                  <ContentItemEditor item={item} key={item.id} members={members} />
                ))}
              </div>
            ) : (
              <p className="admin-empty">Nothing here yet.</p>
            )}
          </section>
        );
      })}
    </div>
  );
}
