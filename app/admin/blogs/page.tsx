import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Plus, Pencil } from "lucide-react";
import { DeleteBlogButton } from "@/components/admin/delete-blog-button";

export default async function AdminBlogsPage() {
  const supabase = await createClient();
  const { data: blogs } = await supabase
    .from("blogs")
    .select("id, title, status, created_at")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold text-canopy-900 dark:text-paper">Blogs</h1>
        <Link href="/admin/blogs/new" className="inline-flex items-center gap-2 rounded-full bg-canopy-700 px-5 py-2.5 text-sm font-semibold text-paper hover:bg-moss-700">
          <Plus size={16} /> New post
        </Link>
      </div>

      <div className="overflow-x-auto rounded-xl border border-canopy-100 dark:border-canopy-700">
        <table className="w-full min-w-[560px] text-sm">
          <thead className="bg-canopy-50 text-left text-canopy-700/70 dark:bg-canopy-800 dark:text-canopy-100/70">
            <tr>
              <th className="px-4 py-3 font-medium">Title</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Created</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {(blogs ?? []).map((b) => (
              <tr key={b.id} className="border-t border-canopy-100 dark:border-canopy-700">
                <td className="px-4 py-3 text-canopy-900 dark:text-paper">{b.title}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${b.status === "published" ? "bg-moss-100 text-moss-700" : "bg-earth-100 text-earth-700"}`}>
                    {b.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-canopy-700/70 dark:text-canopy-100/70">
                  {new Date(b.created_at).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-2">
                    <Link href={`/admin/blogs/${b.id}/edit`} className="rounded-lg p-2 text-canopy-700 hover:bg-canopy-50 dark:text-paper dark:hover:bg-canopy-700">
                      <Pencil size={15} />
                    </Link>
                    <DeleteBlogButton id={b.id} />
                  </div>
                </td>
              </tr>
            ))}
            {(!blogs || blogs.length === 0) && (
              <tr><td colSpan={4} className="px-4 py-8 text-center text-canopy-700/60 dark:text-canopy-100/60">No blog posts yet. Create your first one.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
