import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import { ShareButtons } from "@/components/shared/share-buttons";
import { LikeButton } from "@/components/shared/like-button";
import { CommentSection } from "@/components/shared/comment-section";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://parilatafoundation.org";

export default async function StoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: story } = await supabase.from("stories").select("*").eq("slug", slug).eq("status", "published").single();

  if (!story) notFound();

  const { data: comments } = await supabase
    .from("comments")
    .select("id, guest_name, content, created_at")
    .eq("story_id", story.id)
    .eq("is_approved", true)
    .order("created_at", { ascending: true });

  const postUrl = `${siteUrl}/stories/${story.slug}`;

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

      <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-canopy-100 pt-6 dark:border-canopy-700">
        <LikeButton kind="story" id={story.id} initialCount={story.likes_count ?? 0} />
        <ShareButtons title={story.title} url={postUrl} />
      </div>

      <CommentSection kind="story" id={story.id} initialComments={comments ?? []} />
    </article>
  );
}
