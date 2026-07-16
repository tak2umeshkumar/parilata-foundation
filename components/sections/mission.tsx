"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Droplets, TreePine, Recycle } from "lucide-react";

const pillars = [
  { icon: TreePine, title: "Reforestation", copy: "Native-species tree planting with the communities who'll tend them." },
  { icon: Droplets, title: "Water Revival", copy: "Cleaning and reviving lakes, ponds, and rivers choked by waste." },
  { icon: Recycle, title: "Waste & Awareness", copy: "School programs and neighborhood drives that turn habits around." },
];

export function Mission() {
  return (
    <section className="container-wide py-20 md:py-28">
      <div className="grid gap-16 md:grid-cols-2 md:items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-sm font-semibold uppercase tracking-wide text-moss-700">Our Mission</span>
          <h2 className="mt-3 font-display text-3xl font-semibold text-canopy-900 dark:text-paper md:text-4xl">
            We believe change is told story by story, not slogan by slogan.
          </h2>
          <p className="mt-5 text-canopy-700/90 dark:text-canopy-100/80">
            Parilata Foundation works at the intersection of journalism and
            grassroots action — documenting environmental damage honestly,
            and standing alongside the people repairing it. Every campaign we
            run starts with a story from the field.
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
              src="https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=900&q=80"
              alt="Kajal Kaser, founder of Parilata Foundation, working in the field"
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 rounded-2xl bg-paper p-5 shadow-xl dark:bg-canopy-800">
            <p className="font-display text-lg italic text-canopy-900 dark:text-paper">
              "The forest doesn't need our pity. It needs our hands."
            </p>
            <p className="mt-2 text-sm font-semibold text-moss-700">— Kajal Kaser, Founder</p>
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
