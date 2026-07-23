"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { UploadCloud, Trash2, Loader2, Pencil, X } from "lucide-react";

type Book = {
  id: string;
  title: string;
  description: string | null;
  cover_image_url: string | null;
  buy_link: string | null;
  published_year: string | null;
  display_order: number;
};

const empty = { title: "", description: "", cover_image_url: "", buy_link: "", published_year: "", display_order: 0 };

export default function AdminBooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const supabase = createClient();

  async function loadBooks() {
    const { data } = await supabase.from("books").select("*").order("display_order", { ascending: true });
    setBooks(data ?? []);
  }
  useEffect(() => { loadBooks(); }, []);

  function startEdit(book: Book) {
    setEditingId(book.id);
    setForm({
      title: book.title,
      description: book.description ?? "",
      cover_image_url: book.cover_image_url ?? "",
      buy_link: book.buy_link ?? "",
      published_year: book.published_year ?? "",
      display_order: book.display_order,
    });
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(empty);
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fileName = `book-${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
    const { error } = await supabase.storage.from("blog-images").upload(fileName, file);
    if (error) {
      toast.error("Upload failed: " + error.message);
      setUploading(false);
      return;
    }
    const { data } = supabase.storage.from("blog-images").getPublicUrl(fileName);
    setForm((f) => ({ ...f, cover_image_url: data.publicUrl }));
    setUploading(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title) {
      toast.error("Title is required.");
      return;
    }
    setSaving(true);
    const { error } = editingId
      ? await supabase.from("books").update(form).eq("id", editingId)
      : await supabase.from("books").insert(form);
    setSaving(false);
    if (error) {
      toast.error("Could not save: " + error.message);
      return;
    }
    toast.success(editingId ? "Book updated" : "Book added");
    cancelEdit();
    loadBooks();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this book?")) return;
    await supabase.from("books").delete().eq("id", id);
    if (editingId === id) cancelEdit();
    loadBooks();
  }

  return (
    <div className="max-w-2xl">
      <h1 className="mb-6 font-display text-2xl font-semibold text-canopy-900 dark:text-paper">Books</h1>

      <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-canopy-100 p-6 dark:border-canopy-700">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-base font-semibold text-canopy-900 dark:text-paper">
            {editingId ? "Edit Book" : "Add New Book"}
          </h2>
          {editingId && (
            <button type="button" onClick={cancelEdit} className="flex items-center gap-1 text-xs text-canopy-700/70 hover:text-canopy-900 dark:text-canopy-100/70">
              <X size={14} /> Cancel edit
            </button>
          )}
        </div>

        <input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full rounded-lg border border-canopy-200 px-4 py-2.5 text-sm outline-none focus:border-moss-500 dark:border-canopy-600 dark:bg-canopy-800 dark:text-paper" />

        <textarea placeholder="Description" rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full rounded-lg border border-canopy-200 px-4 py-2.5 text-sm outline-none focus:border-moss-500 dark:border-canopy-600 dark:bg-canopy-800 dark:text-paper" />

        <div className="grid gap-4 sm:grid-cols-2">
          <input placeholder="Buy link (Amazon, Flipkart, etc.)" value={form.buy_link} onChange={(e) => setForm({ ...form, buy_link: e.target.value })}
            className="rounded-lg border border-canopy-200 px-4 py-2.5 text-sm outline-none focus:border-moss-500 dark:border-canopy-600 dark:bg-canopy-800 dark:text-paper" />
          <input placeholder="Published year" value={form.published_year} onChange={(e) => setForm({ ...form, published_year: e.target.value })}
            className="rounded-lg border border-canopy-200 px-4 py-2.5 text-sm outline-none focus:border-moss-500 dark:border-canopy-600 dark:bg-canopy-800 dark:text-paper" />
        </div>

        <div>
          {form.cover_image_url && <img src={form.cover_image_url} alt="" className="mb-3 h-40 w-32 rounded-lg object-cover" />}
          <label className="flex w-fit cursor-pointer items-center gap-2 rounded-lg border border-dashed border-canopy-300 px-4 py-3 text-sm text-canopy-700 hover:bg-canopy-50 dark:border-canopy-600 dark:text-paper dark:hover:bg-canopy-800">
            {uploading ? <Loader2 size={16} className="animate-spin" /> : <UploadCloud size={16} />}
            {uploading ? "Uploading..." : "Upload cover image"}
            <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploading} />
          </label>
        </div>

        <button type="submit" disabled={saving}
          className="rounded-full bg-canopy-700 px-6 py-2.5 text-sm font-semibold text-paper hover:bg-moss-700 disabled:opacity-60">
          {saving ? "Saving..." : editingId ? "Update Book" : "Add Book"}
        </button>
      </form>

      <div className="mt-8 space-y-3">
        {books.map((book) => (
          <div key={book.id} className="flex items-center gap-4 rounded-lg border border-canopy-100 p-4 dark:border-canopy-700">
            {book.cover_image_url ? (
              <img src={book.cover_image_url} alt="" className="h-16 w-12 shrink-0 rounded object-cover" />
            ) : (
              <div className="h-16 w-12 shrink-0 rounded bg-canopy-100" />
            )}
            <div className="flex-1">
              <p className="font-medium text-canopy-900 dark:text-paper">{book.title}</p>
              <p className="text-xs text-canopy-700/60 dark:text-canopy-100/60">{book.published_year}</p>
            </div>
            <button onClick={() => startEdit(book)} className="rounded-lg p-2 text-canopy-700 hover:bg-canopy-50 dark:text-paper dark:hover:bg-canopy-700">
              <Pencil size={15} />
            </button>
            <button onClick={() => handleDelete(book.id)} className="rounded-lg p-2 text-red-600 hover:bg-red-50">
              <Trash2 size={15} />
            </button>
          </div>
        ))}
        {books.length === 0 && <p className="text-sm text-canopy-700/60 dark:text-canopy-100/60">No books yet — add the first one above.</p>}
      </div>
    </div>
  );
}
