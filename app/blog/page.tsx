import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";

export const metadata = { title: "Blog" };

export default async function BlogListPage() {
  const supabase = await createClient();
  const { data: blogs } = await supabase
    .from("blogs")
    .select("id, title, slug, excerpt, featured_image, published_at")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  return (
    <div className="container-wide py-16 md:py-24">
      <h1 className="font-display text-4xl font-semibold text-canopy-900 dark:text-paper">Blog</h1>
      <p className="mt-2 max-w-xl text-canopy-700/80 dark:text-canopy-100/70">
        Field notes, campaign updates, and lessons from the ground.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {(blogs ?? []).map((b) => (
          <Link key={b.id} href={`/blog/${b.slug}`} className="group overflow-hidden rounded-2xl border border-canopy-100 bg-white/60 dark:border-canopy-700 dark:bg-canopy-800/40">
            <div className="relative aspect-[16/10] overflow-hidden bg-canopy-100">
              {b.featured_image && (
                <Image src={b.featured_image} alt={b.title} fill className="object-cover transition group-hover:scale-105" />
              )}
            </div>
            <div className="p-5">
              <h2 className="font-display text-lg font-semibold text-canopy-900 group-hover:text-moss-700 dark:text-paper">{b.title}</h2>
              {b.excerpt && <p className="mt-2 text-sm text-canopy-700/70 dark:text-canopy-100/70">{b.excerpt}</p>}
            </div>
          </Link>
        ))}
        {(!blogs || blogs.length === 0) && (
          <p className="col-span-full py-16 text-center text-canopy-700/60 dark:text-canopy-100/60">
            No posts published yet — check back soon.
          </p>
        )}
      </div>
    </div>
  );
}
