import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Image from "next/image";

export default async function StoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: story } = await supabase.from("stories").select("*").eq("slug", slug).eq("status", "published").single();

  if (!story) notFound();

  return (
    <article className="container-wide max-w-3xl py-16 md:py-24">
      <span className="text-sm font-semibold uppercase tracking-wide text-moss-700">{story.story_type} story</span>
      <h1 className="mt-2 font-display text-4xl font-semibold text-canopy-900 dark:text-paper">{story.title}</h1>
      {story.location && <p className="mt-2 text-sm text-canopy-700/60 dark:text-canopy-100/60">{story.location}</p>}
      {story.featured_image && (
        <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl">
          <Image src={story.featured_image} alt={story.title} fill className="object-cover" />
        </div>
      )}
      <div className="prose prose-canopy mt-8 max-w-none text-canopy-800 dark:text-canopy-100" dangerouslySetInnerHTML={{ __html: story.content }} />
    </article>
  );
}
