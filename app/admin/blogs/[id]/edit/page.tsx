import { createClient } from "@/lib/supabase/server";
import { BlogForm } from "@/components/admin/blog-form";
import { notFound } from "next/navigation";

export default async function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: blog } = await supabase.from("blogs").select("*").eq("id", id).single();

  if (!blog) notFound();

  return (
    <div>
      <h1 className="mb-6 font-display text-2xl font-semibold text-canopy-900 dark:text-paper">Edit Post</h1>
      <BlogForm initial={blog} />
    </div>
  );
}
