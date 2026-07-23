"use client";

import { useState } from "react";
import { toast } from "sonner";
import { MessageSquare } from "lucide-react";

type Comment = {
  id: string;
  guest_name: string | null;
  content: string;
  created_at: string;
};

export function CommentSection({ kind, id, initialComments }: { kind: "blog" | "story"; id: string; initialComments: Comment[] }) {
  const [comments] = useState(initialComments);
  const [form, setForm] = useState({ guest_name: "", guest_email: "", content: "" });
  const [submitting, setSubmitting] = useState(false);
  const [justSubmitted, setJustSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    const res = await fetch("/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ [kind === "blog" ? "blog_id" : "story_id"]: id, ...form }),
    });
    setSubmitting(false);
    if (res.ok) {
      setForm({ guest_name: "", guest_email: "", content: "" });
      setJustSubmitted(true);
      toast.success("Comment submitted — it'll appear after review.");
    } else {
      toast.error("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="mt-16 border-t border-canopy-100 pt-10 dark:border-canopy-700">
      <h2 className="flex items-center gap-2 font-display text-xl font-semibold text-canopy-900 dark:text-paper">
        <MessageSquare size={20} /> Comments {comments.length > 0 && `(${comments.length})`}
      </h2>

      <div className="mt-6 space-y-6">
        {comments.map((c) => (
          <div key={c.id} className="rounded-xl border border-canopy-100 p-4 dark:border-canopy-700">
            <div className="flex items-center justify-between">
              <p className="font-semibold text-canopy-900 dark:text-paper">{c.guest_name || "Anonymous"}</p>
              <span className="text-xs text-canopy-700/60 dark:text-canopy-100/60">{new Date(c.created_at).toLocaleDateString()}</span>
            </div>
            <p className="mt-2 text-sm text-canopy-700/80 dark:text-canopy-100/70">{c.content}</p>
          </div>
        ))}
        {comments.length === 0 && (
          <p className="text-sm text-canopy-700/60 dark:text-canopy-100/60">No comments yet — be the first to share your thoughts.</p>
        )}
      </div>

      {justSubmitted ? (
        <p className="mt-8 rounded-lg bg-moss-100 px-4 py-3 text-sm text-moss-700">
          Thanks — your comment has been submitted and will appear here once it's reviewed.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="mt-8 space-y-3">
          <h3 className="font-display text-sm font-semibold text-canopy-900 dark:text-paper">Leave a comment</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            <input required placeholder="Your name" value={form.guest_name} onChange={(e) => setForm({ ...form, guest_name: e.target.value })}
              className="rounded-lg border border-canopy-200 px-4 py-2.5 text-sm outline-none focus:border-moss-500 dark:border-canopy-600 dark:bg-canopy-800 dark:text-paper" />
            <input type="email" placeholder="Email (optional, not shown publicly)" value={form.guest_email} onChange={(e) => setForm({ ...form, guest_email: e.target.value })}
              className="rounded-lg border border-canopy-200 px-4 py-2.5 text-sm outline-none focus:border-moss-500 dark:border-canopy-600 dark:bg-canopy-800 dark:text-paper" />
          </div>
          <textarea required rows={3} placeholder="Share your thoughts..." value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })}
            className="w-full rounded-lg border border-canopy-200 px-4 py-2.5 text-sm outline-none focus:border-moss-500 dark:border-canopy-600 dark:bg-canopy-800 dark:text-paper" />
          <button type="submit" disabled={submitting}
            className="rounded-full bg-canopy-700 px-6 py-2.5 text-sm font-semibold text-paper hover:bg-moss-700 disabled:opacity-60">
            {submitting ? "Submitting..." : "Post comment"}
          </button>
        </form>
      )}
    </div>
  );
}
