"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { UploadCloud, Trash2, Loader2 } from "lucide-react";

type GalleryImage = { id: string; title: string | null; image_url: string };

export default function AdminGalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [uploading, setUploading] = useState(false);
  const supabase = createClient();

  async function loadImages() {
    const { data } = await supabase.from("gallery_images").select("id, title, image_url").order("created_at", { ascending: false });
    setImages(data ?? []);
  }

  useEffect(() => { loadImages(); }, []);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fileName = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
    const { error: uploadError } = await supabase.storage.from("gallery").upload(fileName, file);
    if (uploadError) {
      toast.error(uploadError.message);
      setUploading(false);
      return;
    }
    const { data } = supabase.storage.from("gallery").getPublicUrl(fileName);
    const { error: insertError } = await supabase.from("gallery_images").insert({ image_url: data.publicUrl, title: file.name });
    setUploading(false);
    if (insertError) {
      toast.error(insertError.message);
      return;
    }
    toast.success("Image added");
    loadImages();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this image?")) return;
    await supabase.from("gallery_images").delete().eq("id", id);
    loadImages();
  }

  return (
    <div>
      <h1 className="mb-6 font-display text-2xl font-semibold text-canopy-900 dark:text-paper">Gallery</h1>

      <label className="mb-8 flex w-fit cursor-pointer items-center gap-2 rounded-lg border border-dashed border-canopy-300 px-5 py-3 text-sm text-canopy-700 hover:bg-canopy-50 dark:border-canopy-600 dark:text-paper dark:hover:bg-canopy-800">
        {uploading ? <Loader2 size={16} className="animate-spin" /> : <UploadCloud size={16} />}
        {uploading ? "Uploading..." : "Upload image"}
        <input type="file" accept="image/*" className="hidden" onChange={handleUpload} disabled={uploading} />
      </label>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {images.map((img) => (
          <div key={img.id} className="group relative aspect-square overflow-hidden rounded-lg">
            <img src={img.image_url} alt={img.title || ""} className="h-full w-full object-cover" />
            <button onClick={() => handleDelete(img.id)} className="absolute right-2 top-2 rounded-full bg-red-600/90 p-1.5 text-white opacity-0 transition group-hover:opacity-100">
              <Trash2 size={13} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
