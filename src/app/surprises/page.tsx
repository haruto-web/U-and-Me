import { ContentList } from "@/components/content-list";
import { getSiteContent } from "@/lib/content-data";

export default async function SurprisesPage() {
  const surprises = await getSiteContent("surprise");
  const compliments = await getSiteContent("compliment");

  return (
    <div className="page-stack">
      <section className="section-hero">
        <span className="eyebrow">A LITTLE SPARK OF FUN</span>
        <h2>Something unexpected.</h2>
        <p>Tiny surprises and playful moments to make an ordinary visit feel special.</p>
      </section>
      <h3 className="subsection-title">Surprises</h3>
      <ContentList
        emptyDescription="Little surprises will show up here when they are ready."
        emptyTitle="A surprise is hiding here"
        items={surprises}
        kind="surprise"
      />
      {compliments.length > 0 && (
        <section className="panel compliments-panel">
          <span className="eyebrow">A FEW KIND WORDS</span>
          <div className="compliment-grid">
            {compliments.map((item) => (
              <blockquote key={item.id}>
                <span aria-hidden="true">“</span>
                <p>{item.body}</p>
                <cite>{item.title}</cite>
              </blockquote>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
