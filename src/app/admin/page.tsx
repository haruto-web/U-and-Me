import Link from "next/link";

const tools = [
  { title: "Memories", description: "Review and organize shared photos and stories.", href: "/memories", icon: "♡" },
  { title: "Letters", description: "Prepare and manage letters for each other.", href: "/letters", icon: "✉" },
  { title: "Garden & surprises", description: "Add kind messages and little activities.", href: "/garden", icon: "✿" },
];

export default function AdminPage() {
  return (
    <div className="page-stack">
      <section className="section-hero">
        <span className="eyebrow">JUST FOR THE ADMIN</span>
        <h2>Your little control corner.</h2>
        <p>Manage the content for your shared space with Eunice.</p>
      </section>
      <div className="admin-notice">
        <span aria-hidden="true">ⓘ</span>
        This preview has no sign-in or permission checks. The admin page is not private until authentication is implemented.
      </div>
      <section className="admin-grid">
        {tools.map((tool) => (
          <Link className="admin-tool panel" href={tool.href} key={tool.title}>
            <span className="admin-tool-icon" aria-hidden="true">{tool.icon}</span>
            <span>
              <strong>{tool.title}</strong>
              <small>{tool.description}</small>
            </span>
            <span className="card-arrow" aria-hidden="true">↗</span>
          </Link>
        ))}
      </section>
      <p className="preview-hint">Admin actions are visual placeholders and do not change saved content yet.</p>
    </div>
  );
}
