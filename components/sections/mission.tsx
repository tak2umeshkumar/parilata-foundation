"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Droplets, TreePine, Recycle } from "lucide-react";
import type { MissionContent } from "@/lib/site-content-types";

const icons = [TreePine, Droplets, Recycle];

export function Mission({ content }: { content: MissionContent }) {
  const pillars = [
    { icon: icons[0], title: content.pillar1_title, copy: content.pillar1_copy },
    { icon: icons[1], title: content.pillar2_title, copy: content.pillar2_copy },
    { icon: icons[2], title: content.pillar3_title, copy: content.pillar3_copy },
  ];

  return (
    <section className="container-wide py-20 md:py-28">
      <div className="grid gap-16 md:grid-cols-2 md:items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-sm font-semibold uppercase tracking-wide text-moss-700">{content.eyebrow}</span>
          <h2 className="mt-3 font-display text-3xl font-semibold text-canopy-900 dark:text-paper md:text-4xl">
            {content.heading}
          </h2>
          <p className="mt-5 text-canopy-700/90 dark:text-canopy-100/80">
            {content.body}
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {pillars.map((p) => (
              <div key={p.title}>
                <p.icon className="mb-3 text-moss-700" size={26} />
                <h3 className="font-display text-base font-semibold text-canopy-900 dark:text-paper">{p.title}</h3>
                <p className="mt-1 text-sm text-canopy-700/70 dark:text-canopy-100/70">{p.copy}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative"
        >
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-organic bg-canopy-100">
            <Image
              src={content.image_url}
              alt="Kajal Kaser, founder of Parilata Foundation, working in the field"
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-4 -left-3 max-w-[78%] rounded-2xl bg-paper p-4 shadow-xl dark:bg-canopy-800 sm:-bottom-6 sm:-left-6 sm:max-w-xs sm:p-5">
            <p className="font-display text-base italic text-canopy-900 dark:text-paper sm:text-lg">
              "{content.quote}"
            </p>
            <p className="mt-2 text-xs font-semibold text-moss-700 sm:text-sm">{content.quote_author}</p>
          </div>
        </motion.div>
      </div>

      <div className="mt-16 text-center">
        <Link
          href="/about"
          className="inline-flex items-center rounded-full border border-canopy-300 px-6 py-3 text-sm font-semibold text-canopy-800 transition hover:bg-canopy-100 dark:text-paper dark:hover:bg-canopy-700"
        >
          Read the full foundation story
        </Link>
      </div>
    </section>
  );
}
