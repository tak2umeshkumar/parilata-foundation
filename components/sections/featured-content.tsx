"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export type ContentItem = {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
};

const blogs: ContentItem[] = [
  { slug: "reviving-kalindi-lake", title: "How a Dead Lake Came Back to Life", excerpt: "Six months, 40 volunteers, and one stubborn belief that Kalindi Lake could breathe again.", image: "https://images.unsplash.com/photo-1758599669317-efd787d954ef?w=800&q=80", category: "Water", date: "Jun 2026" },
  { slug: "school-plastic-pledge", title: "The School That Banned Single-Use Plastic", excerpt: "Students led the change before the district caught up. Here's how they did it.", image: "https://images.unsplash.com/photo-1758599669327-83d310882929?w=800&q=80", category: "Waste", date: "May 2026" },
  { slug: "monsoon-plantation-drive", title: "Planting 3,000 Saplings Before the Monsoon", excerpt: "A race against the first rains, and the community that showed up anyway.", image: "https://images.unsplash.com/photo-1780840883415-6babdeaf9d70?w=800&q=80", category: "Reforestation", date: "Apr 2026" },
];

function ContentCard({ item, href }: { item: ContentItem; href: string }) {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group overflow-hidden rounded-2xl border border-canopy-100 bg-white/60 shadow-sm dark:border-canopy-700 dark:bg-canopy-800/40"
    >
      <Link href={href} className="block">
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
          />
          <span className="absolute left-4 top-4 rounded-full bg-canopy-900/80 px-3 py-1 text-xs font-semibold text-paper backdrop-blur">
            {item.category}
          </span>
        </div>
        <div className="p-6">
          <p className="text-xs font-medium uppercase tracking-wide text-canopy-700/60 dark:text-canopy-100/60">{item.date}</p>
          <h3 className="mt-2 font-display text-lg font-semibold leading-snug text-canopy-900 group-hover:text-moss-700 dark:text-paper">
            {item.title}
          </h3>
          <p className="mt-2 text-sm text-canopy-700/70 dark:text-canopy-100/70">{item.excerpt}</p>
          <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-moss-700">
            Read story <ArrowUpRight size={14} />
          </span>
        </div>
      </Link>
    </motion.article>
  );
}

export function FeaturedContent({
  heading,
  subheading,
  basePath,
  viewAllHref,
}: {
  heading: string;
  subheading: string;
  basePath: string;
  viewAllHref: string;
}) {
  return (
    <section className="container-wide py-20 md:py-24">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="text-sm font-semibold uppercase tracking-wide text-moss-700">{subheading}</span>
          <h2 className="mt-2 font-display text-3xl font-semibold text-canopy-900 dark:text-paper">{heading}</h2>
        </div>
        <Link href={viewAllHref} className="text-sm font-semibold text-canopy-700 hover:text-moss-700 dark:text-paper">
          View all →
        </Link>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {blogs.map((b) => (
          <ContentCard key={b.slug} item={b} href={`${basePath}/${b.slug}`} />
        ))}
      </div>
    </section>
  );
}
