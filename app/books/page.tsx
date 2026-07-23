import Image from "next/image";
import { BookOpen } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { ShareButtons } from "@/components/shared/share-buttons";

export const metadata = { title: "Books" };

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://parilatafoundation.org";

export default async function BooksPage() {
  const supabase = await createClient();
  const { data: books } = await supabase.from("books").select("*").order("display_order", { ascending: true });

  return (
    <div className="container-wide py-16 md:py-24">
      <span className="text-sm font-semibold uppercase tracking-wide text-moss-700">Written by Kajal Kaser</span>
      <h1 className="mt-2 font-display text-4xl font-semibold text-canopy-900 dark:text-paper">Books</h1>
      <p className="mt-3 max-w-xl text-canopy-700/80 dark:text-canopy-100/70">
        On women, land, and the work of repair — available to read and share.
      </p>

      <div className="mt-12 grid gap-10 md:grid-cols-2">
        {(books ?? []).map((book) => (
          <div key={book.id} className="flex flex-col overflow-hidden rounded-2xl border border-canopy-100 bg-white/60 dark:border-canopy-700 dark:bg-canopy-800/40 sm:flex-row">
            <div className="relative aspect-[3/4] w-full shrink-0 bg-canopy-100 sm:w-48">
              {book.cover_image_url ? (
                <Image src={book.cover_image_url} alt={book.title} fill className="object-cover" />
              ) : (
                <div className="grid h-full w-full place-items-center text-canopy-300">
                  <BookOpen size={40} />
                </div>
              )}
            </div>
            <div className="flex flex-1 flex-col p-6">
              <div className="flex items-start justify-between gap-2">
                <h2 className="font-display text-xl font-semibold text-canopy-900 dark:text-paper">{book.title}</h2>
                {book.published_year && (
                  <span className="shrink-0 rounded-full bg-moss-100 px-2.5 py-0.5 text-xs font-semibold text-moss-700">{book.published_year}</span>
                )}
              </div>
              {book.description && (
                <p className="mt-3 flex-1 text-sm text-canopy-700/80 dark:text-canopy-100/70">{book.description}</p>
              )}
              <div className="mt-5 flex flex-wrap items-center gap-3">
                {book.buy_link && (
                  <a href={book.buy_link} target="_blank" rel="noopener noreferrer"
                    className="rounded-full bg-canopy-700 px-5 py-2.5 text-sm font-semibold text-paper transition hover:bg-moss-700">
                    Buy the book
                  </a>
                )}
                <ShareButtons title={`${book.title} — by Kajal Kaser`} url={`${siteUrl}/books`} />
              </div>
            </div>
          </div>
        ))}
        {(!books || books.length === 0) && (
          <p className="col-span-full py-16 text-center text-canopy-700/60 dark:text-canopy-100/60">
            No books added yet — add them from /admin/books.
          </p>
        )}
      </div>
    </div>
  );
}
