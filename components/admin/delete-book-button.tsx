"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

export function DeleteBookButton({ id }: { id: string }) {
  const router = useRouter();
  async function handleDelete() {
    if (!confirm("Delete this book?")) return;
    const supabase = createClient();
    const { error } = await supabase.from("books").delete().eq("id", id);
    if (error) {
      toast.error("Could not delete: " + error.message);
      return;
    }
    toast.success("Book deleted");
    router.refresh();
  }
  return (
    <button onClick={handleDelete} className="rounded-lg p-2 text-red-600 hover:bg-red-50">
      <Trash2 size={15} />
    </button>
  );
}
