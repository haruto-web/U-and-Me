import type { ContentKind } from "@/lib/database.types";

export const contentKinds = [
  "memory",
  "letter",
  "garden_message",
  "compliment",
  "surprise",
  "special",
] as const;

export type { ContentKind };

export type SiteContent =
  import("@/lib/database.types").Database["public"]["Tables"]["site_content"]["Row"];

export const contentKindLabels: Record<ContentKind, string> = {
  memory: "Memory",
  letter: "Letter",
  garden_message: "Garden message",
  compliment: "Compliment",
  surprise: "Surprise",
  special: "Special page",
};

export const contentKindPluralLabels: Record<ContentKind, string> = {
  memory: "Memories",
  letter: "Letters",
  garden_message: "Garden messages",
  compliment: "Compliments",
  surprise: "Surprises",
  special: "Special pages",
};

export function isContentKind(value: string): value is ContentKind {
  return contentKinds.some((kind) => kind === value);
}
