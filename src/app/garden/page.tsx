const flowers = [
  { name: "A little joy", flower: "✿", color: "flower-pink" },
  { name: "A soft reminder", flower: "❀", color: "flower-yellow" },
  { name: "A kind thought", flower: "✿", color: "flower-lilac" },
  { name: "Just because", flower: "❀", color: "flower-peach" },
];

export default function GardenPage() {
  return (
    <div className="page-stack">
      <section className="section-hero">
        <span className="eyebrow">A GARDEN FOR TWO</span>
        <h2>Pick a flower, find a thought.</h2>
        <p>A small garden of kind words for the days you need one.</p>
      </section>
      <section className="flower-grid">
        {flowers.map((item) => (
          <button className="flower-card" key={item.name} type="button" disabled>
            <span className={`flower-art ${item.color}`} aria-hidden="true">{item.flower}</span>
            <strong>{item.name}</strong>
            <small>Messages will bloom here</small>
          </button>
        ))}
      </section>
      <p className="preview-hint centered">The garden is a visual preview for now; messages and interactions will be added later.</p>
    </div>
  );
}
