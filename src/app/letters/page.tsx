import { ContentList } from "@/components/content-list";
import { getSiteContent } from "@/lib/content-data";

export default async function LettersPage() {
  const letters = await getSiteContent("letter");

  return (
    <div className="page-stack">
      <section className="section-hero">
        <span className="eyebrow">WORDS FROM THE HEART</span>
        <h2>Letters for you.</h2>
        <p>Little notes to open whenever you need a smile, a reminder, or a bit of closeness.</p>
      </section>
      <ContentList
        addHref="/letters/new"
        addLabel="Write a letter"
        emptyDescription="Write the first letter. You can make it a surprise for the other person to open."
        emptyTitle="A blank page, just for you"
        items={letters}
        kind="letter"
      />
    </div>
  );
}
