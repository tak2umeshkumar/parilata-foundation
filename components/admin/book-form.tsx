"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { UploadCloud, Loader2 } from "lucide-react";

type BookFormValues = {
  id?: string;
  title: string;
  description: string;
  cover_image: string;
  buy_link: string;
  price: string;
  display_order: number;
};

const empty: BookFormValues = { title: "", description: "", cover_image: "", buy_link: "", price: "", display_order: 0 };

export function BookForm({ initial }: { initial?: Partial<BookFormValues> }) {
  const router = useRouter();
  const [values, setValues] = useState<BookFormValues>({ ...empty, ...initial });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  function update<K extends keyof BookFormValues>(key: K, value: BookFormValues[K]) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const supabase = createClient();
    const fileName = `book-${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
    const { error } = await supabase.storage.from("blog-images").upload(fileName, file);
    if (error) {
      toast.error("Image upload failed: " + error.message);
      setUploading(false);
      return;
    }
    const { data } = supabase.storage.from("blog-images").getPublicUrl(fileName);
    update("cover_image", data.publicUrl);
    setUploading(false);
    toast.success("Cover uploaded");
  }

  async function handleSubmit() {
    if (!values.title || !values.buy_link) {
      toast.error("Title and buy link are required.");
      return;
    }
    setSaving(true);
    const supabase = createClient();
    const { error } = values.id
      ? await supabase.from("books").update(values).eq("id", values.id)
      : await supabase.from("books").insert(values);

    setSaving(false);
    if (error) {
      toast.error("Could not save: " + error.message);
      return;
    }
    toast.success("Saved");
    router.push("/admin/books");
    router.refresh();
  }

  return (
    <div className="max-w-xl space-y-6">
      <div>
        <label className="mb-1 block text-sm font-medium text-canopy-800 dark:text-paper">Book title</label>
        <input
          value={values.title}
          onChange={(e) => update("title", e.target.value)}
          placeholder="e.g. Roots and Rivers: Women Reclaiming the Land"
          className="w-full rounded-lg border border-canopy-200 px-4 py-2.5 text-sm outline-none focus:border-moss-500 dark:border-canopy-600 dark:bg-canopy-800 dark:text-paper"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-canopy-800 dark:text-paper">Cover image</label>
        {values.cover_image && (
          <img src={values.cover_image} alt="" className="mb-3 h-48 w-32 rounded-lg object-cover shadow" />
        )}
        <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-canopy-300 px-4 py-3 text-sm text-canopy-700 hover:bg-canopy-50 dark:border-canopy-600 dark:text-paper dark:hover:bg-canopy-800">
          {uploading ? <Loader2 size={16} className="animate-spin" /> : <UploadCloud size={16} />}
          {uploading ? "Uploading..." : "Click to upload cover"}
          <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploading} />
        </label>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-canopy-800 dark:text-paper">Description</label>
        <textarea
          value={values.description}
          onChange={(e) => update("description", e.target.value)}
          rows={4}
          placeholder="A short blurb about the book"
          className="w-full rounded-lg border border-canopy-200 px-4 py-2.5 text-sm outline-none focus:border-moss-500 dark:border-canopy-600 dark:bg-canopy-800 dark:text-paper"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-canopy-800 dark:text-paper">Price (optional, any format)</label>
          <input
            value={values.price}
            onChange={(e) => update("price", e.target.value)}
            placeholder="e.g. ₹399"
            className="w-full rounded-lg border border-canopy-200 px-4 py-2.5 text-sm outline-none focus:border-moss-500 dark:border-canopy-600 dark:bg-canopy-800 dark:text-paper"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-canopy-800 dark:text-paper">Display order</label>
          <input
            type="number"
            value={values.display_order}
            onChange={(e) => update("display_order", Number(e.target.value))}
            className="w-full rounded-lg border border-canopy-200 px-4 py-2.5 text-sm outline-none focus:border-moss-500 dark:border-canopy-600 dark:bg-canopy-800 dark:text-paper"
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-canopy-800 dark:text-paper">Buy link</label>
        <input
          value={values.buy_link}
          onChange={(e) => update("buy_link", e.target.value)}
          placeholder="https://www.amazon.in/dp/..."
          className="w-full rounded-lg border border-canopy-200 px-4 py-2.5 text-sm outline-none focus:border-moss-500 dark:border-canopy-600 dark:bg-canopy-800 dark:text-paper"
        />
        <p className="mt-1 text-xs text-canopy-700/60 dark:text-canopy-100/60">
          Link to wherever it's sold — Amazon, Flipkart, the publisher's site, or your own store.
        </p>
      </div>

      <button
        onClick={handleSubmit}
        disabled={saving}
        className="rounded-full bg-canopy-700 px-6 py-3 text-sm font-semibold text-paper hover:bg-moss-700 disabled:opacity-60"
      >
        {saving ? "Saving..." : "Save book"}
      </button>
    </div>
  );
}
