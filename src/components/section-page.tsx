import Link from "next/link";

type SectionPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  emptyTitle: string;
  emptyDescription: string;
  actionLabel?: string;
  actionHref?: string;
  symbol?: string;
};

export function SectionPage({
  eyebrow,
  title,
  description,
  emptyTitle,
  emptyDescription,
  actionLabel,
  actionHref,
  symbol = "♡",
}: SectionPageProps) {
  return (
    <div className="page-stack">
      <section className="section-hero">
        <span className="eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
        <p>{description}</p>
      </section>
      <section className="panel section-empty">
        <span className="section-empty-symbol" aria-hidden="true">{symbol}</span>
        <h3>{emptyTitle}</h3>
        <p>{emptyDescription}</p>
        {actionLabel && actionHref && (
          <Link className="button button-primary" href={actionHref}>
            {actionLabel} <span aria-hidden="true">→</span>
          </Link>
        )}
        <span className="preview-hint">Preview only — content will be saved after the backend is connected.</span>
      </section>
    </div>
  );
}
