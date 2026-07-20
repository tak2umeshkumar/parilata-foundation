"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { UploadCloud, Loader2 } from "lucide-react";

type BlogFormValues = {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image: string;
  status: "draft" | "published";
  meta_title: string;
  meta_description: string;
};

const empty: BlogFormValues = {
  title: "", slug: "", excerpt: "", content: "", featured_image: "",
  status: "draft", meta_title: "", meta_description: "",
};

function slugify(text: string) {
  return text.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
}

export function BlogForm({ initial }: { initial?: Partial<BlogFormValues> }) {
  const router = useRouter();
  const [values, setValues] = useState<BlogFormValues>({ ...empty, ...initial });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  function update<K extends keyof BlogFormValues>(key: K, value: BlogFormValues[K]) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const supabase = createClient();
    const fileName = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;

    const { error } = await supabase.storage.from("blog-images").upload(fileName, file);
    if (error) {
      toast.error("Image upload failed: " + error.message);
      setUploading(false);
      return;
    }
    const { data } = supabase.storage.from("blog-images").getPublicUrl(fileName);
    update("featured_image", data.publicUrl);
    setUploading(false);
    toast.success("Image uploaded");
  }

  async function handleSubmit(status: "draft" | "published") {
    if (!values.title || !values.content) {
      toast.error("Title and content are required.");
      return;
    }
    setSaving(true);
    const supabase = createClient();
    const slug = values.slug || slugify(values.title);
    const payload = { ...values, slug, status, published_at: status === "published" ? new Date().toISOString() : null };

    const { error } = values.id
      ? await supabase.from("blogs").update(payload).eq("id", values.id)
      : await supabase.from("blogs").insert(payload);

    setSaving(false);
    if (error) {
      toast.error("Could not save: " + error.message);
      return;
    }
    toast.success(status === "published" ? "Published!" : "Draft saved");
    router.push("/admin/blogs");
    router.refresh();
  }

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <label className="mb-1 block text-sm font-medium text-canopy-800 dark:text-paper">Title</label>
        <input
          value={values.title}
          onChange={(e) => update("title", e.target.value)}
          placeholder="How a Dead Lake Came Back to Life"
          className="w-full rounded-lg border border-canopy-200 px-4 py-2.5 text-sm outline-none focus:border-moss-500 dark:border-canopy-600 dark:bg-canopy-800 dark:text-paper"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-canopy-800 dark:text-paper">URL slug</label>
        <input
          value={values.slug}
          onChange={(e) => update("slug", slugify(e.target.value))}
          placeholder="auto-generated from title if left blank"
          className="w-full rounded-lg border border-canopy-200 px-4 py-2.5 text-sm outline-none focus:border-moss-500 dark:border-canopy-600 dark:bg-canopy-800 dark:text-paper"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-canopy-800 dark:text-paper">Featured image</label>
        {values.featured_image && (
          <img src={values.featured_image} alt="" className="mb-3 h-40 w-full rounded-lg object-cover" />
        )}
        <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-canopy-300 px-4 py-3 text-sm text-canopy-700 hover:bg-canopy-50 dark:border-canopy-600 dark:text-paper dark:hover:bg-canopy-800">
          {uploading ? <Loader2 size={16} className="animate-spin" /> : <UploadCloud size={16} />}
          {uploading ? "Uploading..." : "Click to upload image"}
          <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploading} />
        </label>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-canopy-800 dark:text-paper">Excerpt</label>
        <textarea
          value={values.excerpt}
          onChange={(e) => update("excerpt", e.target.value)}
          rows={2}
          placeholder="A one or two sentence summary shown on listing pages"
          className="w-full rounded-lg border border-canopy-200 px-4 py-2.5 text-sm outline-none focus:border-moss-500 dark:border-canopy-600 dark:bg-canopy-800 dark:text-paper"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-canopy-800 dark:text-paper">Content</label>
        <textarea
          value={values.content}
          onChange={(e) => update("content", e.target.value)}
          rows={14}
          placeholder="Write the full post here. Basic HTML tags like <p>, <b>, <img>, <a> are supported."
          className="w-full rounded-lg border border-canopy-200 px-4 py-2.5 text-sm outline-none focus:border-moss-500 dark:border-canopy-600 dark:bg-canopy-800 dark:text-paper"
        />
        <p className="mt-1 text-xs text-canopy-700/60 dark:text-canopy-100/60">
          Tip: a full rich-text (WYSIWYG) editor can be swapped in here later — this textarea accepts raw HTML in the meantime.
        </p>
      </div>

      <details className="rounded-lg border border-canopy-100 p-4 dark:border-canopy-700">
        <summary className="cursor-pointer text-sm font-medium text-canopy-800 dark:text-paper">SEO settings (optional)</summary>
        <div className="mt-4 space-y-3">
          <input
            value={values.meta_title}
            onChange={(e) => update("meta_title", e.target.value)}
            placeholder="Meta title"
            className="w-full rounded-lg border border-canopy-200 px-4 py-2 text-sm outline-none focus:border-moss-500 dark:border-canopy-600 dark:bg-canopy-800 dark:text-paper"
          />
          <textarea
            value={values.meta_description}
            onChange={(e) => update("meta_description", e.target.value)}
            rows={2}
            placeholder="Meta description"
            className="w-full rounded-lg border border-canopy-200 px-4 py-2 text-sm outline-none focus:border-moss-500 dark:border-canopy-600 dark:bg-canopy-800 dark:text-paper"
          />
        </div>
      </details>

      <div className="flex gap-3">
        <button
          onClick={() => handleSubmit("draft")}
          disabled={saving}
          className="rounded-full border border-canopy-300 px-6 py-3 text-sm font-semibold text-canopy-800 hover:bg-canopy-50 disabled:opacity-60 dark:text-paper dark:hover:bg-canopy-800"
        >
          Save draft
        </button>
        <button
          onClick={() => handleSubmit("published")}
          disabled={saving}
          className="rounded-full bg-canopy-700 px-6 py-3 text-sm font-semibold text-paper hover:bg-moss-700 disabled:opacity-60"
        >
          {saving ? "Saving..." : "Publish"}
        </button>
      </div>
    </div>
  );
}
