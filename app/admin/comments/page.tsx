"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { Check, Trash2, MessageSquare } from "lucide-react";

type CommentRow = {
  id: string;
  guest_name: string | null;
  guest_email: string | null;
  content: string;
  is_approved: boolean;
  created_at: string;
  blog_id: string | null;
  story_id: string | null;
  blogs: { title: string; slug: string } | null;
  stories: { title: string; slug: string } | null;
};

export default function AdminCommentsPage() {
  const [comments, setComments] = useState<CommentRow[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  async function loadComments() {
    const { data } = await supabase
      .from("comments")
      .select("*, blogs(title, slug), stories(title, slug)")
      .order("created_at", { ascending: false });
    setComments((data as CommentRow[]) ?? []);
    setLoading(false);
  }
  useEffect(() => { loadComments(); }, []);

  async function handleApprove(id: string) {
    const { error } = await supabase.from("comments").update({ is_approved: true }).eq("id", id);
    if (error) { toast.error(error.message); return; }
    toast.success("Comment approved — now visible on the site");
    loadComments();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this comment permanently?")) return;
    await supabase.from("comments").delete().eq("id", id);
    loadComments();
  }

  if (loading) return <p className="text-canopy-700/70 dark:text-canopy-100/70">Loading comments...</p>;

  return (
    <div>
      <h1 className="mb-6 font-display text-2xl font-semibold text-canopy-900 dark:text-paper">Comments</h1>
      <div className="space-y-4">
        {comments.map((c) => {
          const post = c.blogs || c.stories;
          const postType = c.blog_id ? "Blog" : "Story";
          return (
            <div key={c.id} className={`rounded-xl border p-5 ${c.is_approved ? "border-canopy-100 dark:border-canopy-700" : "border-earth-300 bg-earth-100/30 dark:border-earth-500"}`}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-canopy-900 dark:text-paper">{c.guest_name || "Anonymous"}</p>
                  {!c.is_approved && (
                    <span className="rounded-full bg-earth-300 px-2 py-0.5 text-xs font-semibold text-earth-700">Pending review</span>
                  )}
                </div>
                <span className="text-xs text-canopy-700/60 dark:text-canopy-100/60">{new Date(c.created_at).toLocaleDateString()}</span>
              </div>
              {post && (
                <p className="mt-1 flex items-center gap-1 text-xs text-canopy-700/60 dark:text-canopy-100/60">
                  <MessageSquare size={12} /> {postType}: {post.title}
                </p>
              )}
              <p className="mt-2 text-sm text-canopy-700/80 dark:text-canopy-100/70">{c.content}</p>
              <div className="mt-3 flex gap-2">
                {!c.is_approved && (
                  <button onClick={() => handleApprove(c.id)}
                    className="inline-flex items-center gap-1 rounded-full bg-moss-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-moss-700">
                    <Check size={13} /> Approve
                  </button>
                )}
                <button onClick={() => handleDelete(c.id)}
                  className="inline-flex items-center gap-1 rounded-full border border-red-200 px-4 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50">
                  <Trash2 size={13} /> Delete
                </button>
              </div>
            </div>
          );
        })}
        {comments.length === 0 && <p className="text-canopy-700/60 dark:text-canopy-100/60">No comments yet.</p>}
      </div>
    </div>
  );
}
