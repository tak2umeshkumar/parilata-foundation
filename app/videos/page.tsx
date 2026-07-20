import { createClient } from "@/lib/supabase/server";

export const metadata = { title: "Videos" };

export default async function VideosPage() {
  const supabase = await createClient();
  const { data: videos } = await supabase.from("videos").select("*").order("created_at", { ascending: false });

  return (
    <div className="container-wide py-16 md:py-24">
      <h1 className="font-display text-4xl font-semibold text-canopy-900 dark:text-paper">Videos</h1>
      <p className="mt-2 text-canopy-700/80 dark:text-canopy-100/70">Films from our campaigns and community work.</p>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {(videos ?? []).map((v) => (
          <div key={v.id} className="overflow-hidden rounded-2xl border border-canopy-100 dark:border-canopy-700">
            <div className="aspect-video">
              <iframe src={v.video_url} title={v.title} className="h-full w-full" allowFullScreen />
            </div>
            <div className="p-4">
              <h2 className="font-display font-semibold text-canopy-900 dark:text-paper">{v.title}</h2>
              {v.description && <p className="mt-1 text-sm text-canopy-700/70 dark:text-canopy-100/70">{v.description}</p>}
            </div>
          </div>
        ))}
        {(!videos || videos.length === 0) && (
          <p className="col-span-full py-16 text-center text-canopy-700/60 dark:text-canopy-100/60">
            No videos uploaded yet.
          </p>
        )}
      </div>
    </div>
  );
}
