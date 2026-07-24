import Image from "next/image";
import Link from "next/link";
import { BookOpen, ArrowRight } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export async function FeaturedBooks() {
  const supabase = await createClient();
  const { data: books } = await supabase.from("books").select("*").order("display_order", { ascending: true }).limit(2);

  if (!books || books.length === 0) return null; // hide the section entirely until books are added

  return (
    <section className="bg-earth-100/40 py-20 dark:bg-canopy-800/30 md:py-24">
      <div className="container-wide">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="text-sm font-semibold uppercase tracking-wide text-earth-700">Written by the Founder</span>
            <h2 className="mt-2 font-display text-3xl font-semibold text-canopy-900 dark:text-paper">Books by Kajal Kaser</h2>
          </div>
          <Link href="/books" className="inline-flex items-center gap-1 text-sm font-semibold text-canopy-700 hover:text-moss-700 dark:text-paper">
            View all books <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {books.map((book) => (
            <Link key={book.id} href="/books" className="group flex items-center gap-5 rounded-2xl border border-canopy-100 bg-white/70 p-5 transition hover:shadow-md dark:border-canopy-700 dark:bg-canopy-800/50">
              <div className="relative aspect-[3/4] w-20 shrink-0 overflow-hidden rounded-lg bg-canopy-100">
                {book.cover_image_url ? (
                  <Image src={book.cover_image_url} alt={book.title} fill className="object-contain" />
                ) : (
                  <div className="grid h-full w-full place-items-center text-canopy-300"><BookOpen size={24} /></div>
                )}
              </div>
              <div>
                <h3 className="font-display text-base font-semibold text-canopy-900 group-hover:text-moss-700 dark:text-paper">{book.title}</h3>
                {book.published_year && <p className="mt-1 text-xs text-canopy-700/60 dark:text-canopy-100/60">{book.published_year}</p>}
                {book.description && <p className="mt-2 line-clamp-2 text-sm text-canopy-700/70 dark:text-canopy-100/70">{book.description}</p>}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
