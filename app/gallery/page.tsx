import Image from "next/image";
import { createClient } from "@/lib/supabase/server";

export const metadata = { title: "Gallery" };

export default async function GalleryPage() {
  const supabase = await createClient();
  const { data: images } = await supabase.from("gallery_images").select("*").order("created_at", { ascending: false });

  return (
    <div className="container-wide py-16 md:py-24">
      <h1 className="font-display text-4xl font-semibold text-canopy-900 dark:text-paper">Photo Gallery</h1>
      <p className="mt-2 text-canopy-700/80 dark:text-canopy-100/70">Moments from the field.</p>

      <div className="mt-10 columns-2 gap-4 md:columns-3">
        {(images ?? []).map((img) => (
          <div key={img.id} className="mb-4 break-inside-avoid overflow-hidden rounded-xl">
            <Image src={img.image_url} alt={img.title || ""} width={500} height={500} className="w-full object-cover" />
          </div>
        ))}
        {(!images || images.length === 0) && (
          <p className="col-span-full py-16 text-center text-canopy-700/60 dark:text-canopy-100/60">
            No photos uploaded yet.
          </p>
        )}
      </div>
    </div>
  );
}
