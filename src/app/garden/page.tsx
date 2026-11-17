import { getSiteContent } from "@/lib/content-data";

const flowers = [
  { name: "A little joy", flower: "✿", color: "flower-pink" },
  { name: "A soft reminder", flower: "❀", color: "flower-yellow" },
  { name: "A kind thought", flower: "✿", color: "flower-lilac" },
  { name: "Just because", flower: "❀", color: "flower-peach" },
];

export default async function GardenPage() {
  const messages = await getSiteContent("garden_message");

  return (
    <div className="page-stack">
      <section className="section-hero">
        <span className="eyebrow">A GARDEN FOR TWO</span>
        <h2>Pick a flower, find a thought.</h2>
        <p>A small garden of kind words for the days you need one.</p>
      </section>
      <section className="flower-grid">
        {flowers.map((item, index) => (
          <button className="flower-card" key={item.name} type="button" disabled>
            <span className={`flower-art ${item.color}`} aria-hidden="true">{item.flower}</span>
            <strong>{item.name}</strong>
            <small>{messages[index]?.title ?? "A message will bloom here"}</small>
            {messages[index] && <span className="flower-message">{messages[index].body}</span>}
          </button>
        ))}
      </section>
      <p className="preview-hint centered">Flower interactions will be added in a later step.</p>
    </div>
  );
}
