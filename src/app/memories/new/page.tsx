import { ContentForm } from "@/components/content-form";

export default function NewMemoryPage() {
  return (
    <ContentForm
      title="Save a little moment."
      description="Add a title, a photo, and the story you want the two of you to remember."
      kind="memory"
      includePhoto
      messageLabel="The memory"
    />
  );
}
