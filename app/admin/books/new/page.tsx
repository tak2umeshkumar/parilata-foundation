import { BookForm } from "@/components/admin/book-form";

export default function NewBookPage() {
  return (
    <div>
      <h1 className="mb-6 font-display text-2xl font-semibold text-canopy-900 dark:text-paper">Add Book</h1>
      <BookForm />
    </div>
  );
}
