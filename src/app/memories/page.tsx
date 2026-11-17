import { SectionPage } from "@/components/section-page";

export default function MemoriesPage() {
  return (
    <SectionPage
      eyebrow="OUR SCRAPBOOK"
      title="Little moments, kept close."
      description="Collect the photos, stories, and ordinary days that make your story yours."
      emptyTitle="Your scrapbook starts here"
      emptyDescription="Add a photo and a few words about a moment you want to remember."
      actionLabel="Add a memory"
      actionHref="/memories/new"
      symbol="♡"
    />
  );
}
