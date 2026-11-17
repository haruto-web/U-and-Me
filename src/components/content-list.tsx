import Link from "next/link";
import type { ContentKind, SiteContent } from "@/lib/content";

export function ContentList({
  items,
  kind,
  emptyTitle,
  emptyDescription,
  addHref,
  addLabel,
}: {
  items: SiteContent[];
  kind: ContentKind;
  emptyTitle: string;
  emptyDescription: string;
  addHref?: string;
  addLabel?: string;
}) {
  if (items.length === 0) {
    return (
      <section className="panel section-empty">
        <span className="section-empty-symbol" aria-hidden="true">
          {kind === "letter" ? "✉" : kind === "memory" ? "♡" : "✿"}
        </span>
        <h3>{emptyTitle}</h3>
        <p>{emptyDescription}</p>
        {addHref && addLabel && (
          <Link className="button button-primary" href={addHref}>
            {addLabel} <span aria-hidden="true">→</span>
          </Link>
        )}
      </section>
    );
  }

  return (
    <section className="content-card-grid" aria-label="Saved content">
      {items.map((item) => (
        <article className={`saved-content-card saved-content-${kind}`} key={item.id}>
          <div className="saved-content-meta">
            <span>{kind === "letter" ? (item.prompt || "A little letter") : "A moment to remember"}</span>
            <time dateTime={item.event_date ?? item.created_at}>
              {(item.event_date ?? item.created_at).slice(0, 10)}
            </time>
          </div>
          <h3>{item.title}</h3>
          <p>{item.body}</p>
        </article>
      ))}
    </section>
  );
}
