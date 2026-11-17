import Link from "next/link";

const shortcuts = [
  {
    href: "/memories/new",
    number: "01",
    title: "Save a memory",
    description: "Add a moment you want to keep close.",
    icon: "♡",
  },
  {
    href: "/letters/new",
    number: "02",
    title: "Write a letter",
    description: "Leave a little note for each other.",
    icon: "✉",
  },
  {
    href: "/garden",
    number: "03",
    title: "Visit the garden",
    description: "Find a kind word among the flowers.",
    icon: "✿",
  },
];

export default function HomePage() {
  return (
    <div className="page-stack">
      <section className="welcome-card">
        <div className="welcome-copy">
          <span className="pill-label"><span className="tiny-heart">♡</span> A SPACE JUST FOR US</span>
          <h2>A place for all<br />our little moments.</h2>
          <p>
            The ordinary days, the big adventures, and everything in between
            deserve a place to stay.
          </p>
          <Link className="button button-light" href="/memories">
            Wander through our memories <span aria-hidden="true">→</span>
          </Link>
        </div>
        <div className="welcome-art" aria-hidden="true">
          <span className="art-sun" />
          <span className="art-orbit orbit-one" />
          <span className="art-orbit orbit-two" />
          <span className="art-heart">♡</span>
          <span className="art-spark spark-one">✦</span>
          <span className="art-spark spark-two">✧</span>
          <span className="art-caption">together, wherever</span>
        </div>
        <span className="welcome-flower flower-one" aria-hidden="true">✿</span>
        <span className="welcome-flower flower-two" aria-hidden="true">✿</span>
      </section>

      <section className="section-heading">
        <div>
          <span className="eyebrow">A FEW PLACES TO BEGIN</span>
          <h2>Make yourself at home</h2>
        </div>
        <span className="section-aside">Just the two of us <span aria-hidden="true">♡</span></span>
      </section>

      <section className="shortcut-grid" aria-label="Ways to get started">
        {shortcuts.map((item) => (
          <Link className="shortcut-card" href={item.href} key={item.number}>
            <div className="shortcut-top">
              <span className="shortcut-number">{item.number}</span>
              <span className="shortcut-icon" aria-hidden="true">{item.icon}</span>
            </div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <span className="card-arrow" aria-hidden="true">↗</span>
          </Link>
        ))}
      </section>

      <section className="lower-grid">
        <div className="panel recent-panel">
          <div className="panel-heading">
            <div>
              <span className="eyebrow">THE SCRAPBOOK</span>
              <h2>Our latest memories</h2>
            </div>
            <Link className="text-link" href="/memories">See all <span aria-hidden="true">→</span></Link>
          </div>
          <div className="empty-memory">
            <span className="empty-icon" aria-hidden="true">♡</span>
            <div>
              <strong>Your first memory is waiting</strong>
              <p>Save a photo and a few words to start your collection.</p>
            </div>
            <Link className="round-arrow" href="/memories/new" aria-label="Add the first memory">↗</Link>
          </div>
        </div>

        <div className="note-card">
          <span className="note-decoration" aria-hidden="true">✦</span>
          <span className="eyebrow">A LITTLE REMINDER</span>
          <p>Even the smallest moments become something special when they&apos;re ours.</p>
          <span className="note-signature">— for you, always <span aria-hidden="true">♡</span></span>
        </div>
      </section>

      <div className="preview-disclaimer">
        This is a local design preview. Sign-in, uploads, and saving content are not connected yet.
      </div>
    </div>
  );
}
