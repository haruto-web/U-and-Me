import { ContentForm } from "@/components/content-form";
import { getOtherMembers } from "@/lib/content-data";

export default async function NewLetterPage() {
  const recipients = await getOtherMembers();

  return (
    <ContentForm
      title="Write from the heart."
      description="A note for each other, for a certain day or simply because."
      kind="letter"
      recipients={recipients}
      messageLabel="Your letter"
    />
  );
}
