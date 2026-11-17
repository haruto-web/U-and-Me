import { SectionPage } from "@/components/section-page";

export default function LettersPage() {
  return (
    <SectionPage
      eyebrow="WORDS FROM THE HEART"
      title="Letters for you."
      description="Little notes to open whenever you need a smile, a reminder, or a bit of closeness."
      emptyTitle="A blank page, just for you"
      emptyDescription="Write the first letter. You can make it a surprise for the other person to open."
      actionLabel="Write a letter"
      actionHref="/letters/new"
      symbol="✉"
    />
  );
}
