import { createClient } from "@/lib/supabase/server";

// Default content shown until an admin edits it via /admin/content.
// Fetched content is merged over these defaults field-by-field, so a
// partially-filled row never breaks the page.

export type HeroContent = {
  badge: string;
  heading_pre: string;
  heading_italic: string;
  heading_post: string;
  description: string;
  stat1_value: string;
  stat1_label: string;
  stat2_value: string;
  stat2_label: string;
  stat3_value: string;
  stat3_label: string;
};

export const HERO_DEFAULTS: HeroContent = {
  badge: "Every ring is a year of work",
  heading_pre: "Stories from the ground,",
  heading_italic: "campaigns",
  heading_post: "for the future.",
  description:
    "Parilata Foundation documents environmental change as it happens — through the people restoring rivers, replanting forests, and rebuilding their neighborhoods, led by activist Kajal Kaser.",
  stat1_value: "120+",
  stat1_label: "stories published",
  stat2_value: "34",
  stat2_label: "community campaigns",
  stat3_value: "6,500+",
  stat3_label: "trees restored",
};

export type MissionContent = {
  eyebrow: string;
  heading: string;
  body: string;
  pillar1_title: string;
  pillar1_copy: string;
  pillar2_title: string;
  pillar2_copy: string;
  pillar3_title: string;
  pillar3_copy: string;
  image_url: string;
  quote: string;
  quote_author: string;
};

export const MISSION_DEFAULTS: MissionContent = {
  eyebrow: "Our Mission",
  heading: "We believe change is told story by story, not slogan by slogan.",
  body:
    "Parilata Foundation works at the intersection of journalism and grassroots action — documenting environmental damage honestly, and standing alongside the people repairing it. Every campaign we run starts with a story from the field.",
  pillar1_title: "Reforestation",
  pillar1_copy: "Native-species tree planting with the communities who'll tend them.",
  pillar2_title: "Water Revival",
  pillar2_copy: "Cleaning and reviving lakes, ponds, and rivers choked by waste.",
  pillar3_title: "Waste & Awareness",
  pillar3_copy: "School programs and neighborhood drives that turn habits around.",
  image_url: "https://images.unsplash.com/photo-1758599669327-83d310882929?w=900&q=80",
  quote: "The forest doesn't need our pity. It needs our hands.",
  quote_author: "— Kajal Kaser, Founder",
};

export type AboutContent = {
  intro_heading: string;
  intro_body: string;
  vision: string;
  mission: string;
  founder_name: string;
  founder_body: string;
  founder_image_url: string;
};

export const ABOUT_DEFAULTS: AboutContent = {
  intro_heading: "Our Story",
  intro_body:
    "Parilata Foundation began with a single question: what happens if you document environmental damage honestly, and then stay to help fix it? Founded by activist Kajal Kaser, we work directly with communities on reforestation, water revival, and waste reduction — and tell the story of that work as it happens, not after the fact.",
  vision: "A future where every community has the tools and the story to protect the land around it.",
  mission: "To document environmental change honestly, and stand alongside the people repairing it.",
  founder_name: "Kajal Kaser, Founder",
  founder_body:
    "Kajal has spent the last several years working directly with communities on reforestation and water revival projects, combining hands-on fieldwork with storytelling to build lasting local support for environmental action.",
  founder_image_url: "https://images.unsplash.com/photo-1758599669327-83d310882929?w=900&q=80",
};

export async function getSiteContent<T extends Record<string, unknown>>(
  id: string,
  defaults: T
): Promise<T> {
  try {
    const supabase = await createClient();
    const { data } = await supabase.from("site_content").select("content").eq("id", id).single();
    return { ...defaults, ...(data?.content as Partial<T> | undefined) };
  } catch {
    // No row yet, or Supabase not reachable at build time — fall back to defaults.
    return defaults;
  }
}
