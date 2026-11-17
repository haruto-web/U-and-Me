import { getSiteContent } from "@/lib/content-data";

export default async function SpecialPage() {
  const pages = await getSiteContent("special");
  const story = pages[0];

  return (
    <div className="page-stack">
      <section className="section-hero">
        <span className="eyebrow">OUR STORY</span>
        <h2>{story?.title ?? "A little place for us."}</h2>
        <p>{story?.body ?? "A personal page for the words, photos, and reasons behind this little world."}</p>
      </section>
      {!story && (
        <section className="panel section-empty">
          <span className="section-empty-symbol" aria-hidden="true">∞</span>
          <h3>Made with you in mind</h3>
          <p>This page will hold your personal message and favorite photos.</p>
        </section>
      )}
    </div>
  );
}
