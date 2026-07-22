// SERVER-ONLY. Uses lib/supabase/server.ts, which reads cookies() —
// never import this file from a "use client" component.
// Client components (e.g. app/admin/content/page.tsx) should import
// types/defaults from "@/lib/site-content-types" instead.

import { createClient } from "@/lib/supabase/server";
import {
  HERO_DEFAULTS, MISSION_DEFAULTS, ABOUT_DEFAULTS,
} from "@/lib/site-content-types";

export { HERO_DEFAULTS, MISSION_DEFAULTS, ABOUT_DEFAULTS };
export type { HeroContent, MissionContent, AboutContent } from "@/lib/site-content-types";

export async function getSiteContent<T extends Record<string, unknown>>(
  id: string,
  defaults: T
): Promise<T> {
  try {
    const supabase = await createClient();
    const { data } = await supabase.from("site_content").select("content").eq("id", id).single();
    return { ...defaults, ...(data?.content as Partial<T> | undefined) };
  } catch {
    return defaults;
  }
}
