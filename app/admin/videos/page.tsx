"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";

type Video = { id: string; title: string; video_url: string };

export default function AdminVideosPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const supabase = createClient();

  async function loadVideos() {
    const { data } = await supabase.from("videos").select("id, title, video_url").order("created_at", { ascending: false });
    setVideos(data ?? []);
  }
  useEffect(() => { loadVideos(); }, []);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!title || !url) return;
    const slug = title.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
    const { error } = await supabase.from("videos").insert({ title, video_url: url, slug });
    if (error) { toast.error(error.message); return; }
    toast.success("Video added");
    setTitle(""); setUrl("");
    loadVideos();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this video?")) return;
    await supabase.from("videos").delete().eq("id", id);
    loadVideos();
  }

  return (
    <div>
      <h1 className="mb-6 font-display text-2xl font-semibold text-canopy-900 dark:text-paper">Videos</h1>

      <form onSubmit={handleAdd} className="mb-8 flex flex-wrap gap-3">
        <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)}
          className="rounded-lg border border-canopy-200 px-4 py-2.5 text-sm outline-none focus:border-moss-500 dark:border-canopy-600 dark:bg-canopy-800 dark:text-paper" />
        <input placeholder="Embed URL (YouTube/Vimeo)" value={url} onChange={(e) => setUrl(e.target.value)}
          className="flex-1 min-w-[240px] rounded-lg border border-canopy-200 px-4 py-2.5 text-sm outline-none focus:border-moss-500 dark:border-canopy-600 dark:bg-canopy-800 dark:text-paper" />
        <button type="submit" className="rounded-full bg-canopy-700 px-5 py-2.5 text-sm font-semibold text-paper hover:bg-moss-700">Add</button>
      </form>

      <div className="space-y-3">
        {videos.map((v) => (
          <div key={v.id} className="flex items-center justify-between rounded-lg border border-canopy-100 px-4 py-3 dark:border-canopy-700">
            <div>
              <p className="font-medium text-canopy-900 dark:text-paper">{v.title}</p>
              <p className="text-xs text-canopy-700/60 dark:text-canopy-100/60">{v.video_url}</p>
            </div>
            <button onClick={() => handleDelete(v.id)} className="rounded-lg p-2 text-red-600 hover:bg-red-50"><Trash2 size={15} /></button>
          </div>
        ))}
      </div>
    </div>
  );
}
