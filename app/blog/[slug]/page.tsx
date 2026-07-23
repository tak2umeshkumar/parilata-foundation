import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import type { Metadata } from "next";
import { ShareButtons } from "@/components/shared/share-buttons";
import { LikeButton } from "@/components/shared/like-button";
import { CommentSection } from "@/components/shared/comment-section";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://parilatafoundation.org";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: blog } = await supabase.from("blogs").select("meta_title, meta_description, title, excerpt").eq("slug", slug).single();
  if (!blog) return {};
  return {
    title: blog.meta_title || blog.title,
    description: blog.meta_description || blog.excerpt || undefined,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: blog } = await supabase.from("blogs").select("*").eq("slug", slug).eq("status", "published").single();

  if (!blog) notFound();

  const { data: comments } = await supabase
    .from("comments")
    .select("id, guest_name, content, created_at")
    .eq("blog_id", blog.id)
    .eq("is_approved", true)
    .order("created_at", { ascending: true });

  const postUrl = `${siteUrl}/blog/${blog.slug}`;

  return (
    <article className="container-wide max-w-3xl py-16 md:py-24">
      <h1 className="font-display text-4xl font-semibold text-canopy-900 dark:text-paper">{blog.title}</h1>
      {blog.published_at && (
        <p className="mt-2 text-sm text-canopy-700/60 dark:text-canopy-100/60">
          {new Date(blog.published_at).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}
        </p>
      )}
      {blog.featured_image && (
        <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl">
          <Image src={blog.featured_image} alt={blog.title} fill className="object-cover" />
        </div>
      )}
      <div
        className="prose prose-canopy mt-8 max-w-none text-canopy-800 dark:text-canopy-100"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />

      <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-canopy-100 pt-6 dark:border-canopy-700">
        <LikeButton kind="blog" id={blog.id} initialCount={blog.likes_count ?? 0} />
        <ShareButtons title={blog.title} url={postUrl} />
      </div>

      <CommentSection kind="blog" id={blog.id} initialComments={comments ?? []} />
    </article>
  );
}
