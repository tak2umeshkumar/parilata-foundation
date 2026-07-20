import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";

export const metadata = { title: "Stories" };

export default async function StoriesPage() {
  const supabase = await createClient();
  const { data: stories } = await supabase
    .from("stories")
    .select("id, title, slug, excerpt, featured_image, story_type, published_at")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  return (
    <div className="container-wide py-16 md:py-24">
      <h1 className="font-display text-4xl font-semibold text-canopy-900 dark:text-paper">Stories</h1>
      <p className="mt-2 max-w-xl text-canopy-700/80 dark:text-canopy-100/70">
        Environmental, success, and community stories from the field.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {(stories ?? []).map((s) => (
          <Link key={s.id} href={`/stories/${s.slug}`} className="group overflow-hidden rounded-2xl border border-canopy-100 bg-white/60 dark:border-canopy-700 dark:bg-canopy-800/40">
            <div className="relative aspect-[16/10] overflow-hidden bg-canopy-100">
              {s.featured_image && <Image src={s.featured_image} alt={s.title} fill className="object-cover transition group-hover:scale-105" />}
              <span className="absolute left-3 top-3 rounded-full bg-canopy-900/80 px-3 py-1 text-xs font-semibold capitalize text-paper">{s.story_type}</span>
            </div>
            <div className="p-5">
              <h2 className="font-display text-lg font-semibold text-canopy-900 group-hover:text-moss-700 dark:text-paper">{s.title}</h2>
              {s.excerpt && <p className="mt-2 text-sm text-canopy-700/70 dark:text-canopy-100/70">{s.excerpt}</p>}
            </div>
          </Link>
        ))}
        {(!stories || stories.length === 0) && (
          <p className="col-span-full py-16 text-center text-canopy-700/60 dark:text-canopy-100/60">No stories published yet.</p>
        )}
      </div>
    </div>
  );
}
