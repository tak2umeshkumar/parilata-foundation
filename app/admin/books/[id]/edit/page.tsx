import { createClient } from "@/lib/supabase/server";
import { BookForm } from "@/components/admin/book-form";
import { notFound } from "next/navigation";

export default async function EditBookPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: book } = await supabase.from("books").select("*").eq("id", id).single();

  if (!book) notFound();

  return (
    <div>
      <h1 className="mb-6 font-display text-2xl font-semibold text-canopy-900 dark:text-paper">Edit Book</h1>
      <BookForm initial={book} />
    </div>
  );
}
