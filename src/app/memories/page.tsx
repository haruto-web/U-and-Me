import { ContentList } from "@/components/content-list";
import { getSiteContent } from "@/lib/content-data";

export default async function MemoriesPage() {
  const memories = await getSiteContent("memory");

  return (
    <div className="page-stack">
      <section className="section-hero">
        <span className="eyebrow">OUR SCRAPBOOK</span>
        <h2>Little moments, kept close.</h2>
        <p>Collect the photos, stories, and ordinary days that make your story yours.</p>
      </section>
      <ContentList
        addHref="/memories/new"
        addLabel="Add a memory"
        emptyDescription="Add a photo and a few words about a moment you want to remember."
        emptyTitle="Your scrapbook starts here"
        items={memories}
        kind="memory"
      />
    </div>
  );
}
