"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, PlayCircle } from "lucide-react";

/**
 * Signature element: concentric "growth rings" — like a cross-section of a tree trunk,
 * each ring is a year of the foundation's work. Rings pulse gently, and the outermost
 * ring is left "unfinished" (open arc) to suggest the story is still being written.
 */
function GrowthRings() {
  const rings = [140, 190, 240, 290, 340];
  return (
    <svg viewBox="0 0 700 700" className="h-full w-full" aria-hidden="true">
      {rings.map((r, i) => (
        <circle
          key={r}
          cx="350"
          cy="350"
          r={r}
          fill="none"
          stroke={i % 2 === 0 ? "#7FA65C" : "#1F3D2E"}
          strokeOpacity={0.18 + i * 0.05}
          strokeWidth={i === rings.length - 1 ? 2 : 1.2}
          strokeDasharray={i === rings.length - 1 ? "6 10" : undefined}
          className="animate-ring-pulse"
          style={{ animationDelay: `${i * 0.6}s`, transformOrigin: "350px 350px" }}
        />
      ))}
      <circle cx="350" cy="350" r="70" fill="#1F3D2E" fillOpacity="0.08" />
      <circle cx="350" cy="350" r="30" fill="#7FA65C" fillOpacity="0.5" />
    </svg>
  );
}

export function Hero() {
  return (
    <section className="grain-texture relative overflow-hidden bg-canopy-50 dark:bg-canopy-900">
      <div className="container-wide relative z-10 grid gap-12 py-20 md:grid-cols-2 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex flex-col justify-center"
        >
          <span className="mb-5 inline-flex w-fit items-center gap-2 rounded-full bg-moss-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-moss-700">
            Every ring is a year of work
          </span>
          <h1 className="text-balance font-display text-4xl font-semibold leading-[1.08] text-canopy-900 dark:text-paper md:text-6xl">
            Stories from the ground,
            <span className="italic text-moss-700"> campaigns </span>
            for the future.
          </h1>
          <p className="mt-6 max-w-lg text-lg text-canopy-700/90 dark:text-canopy-100/80">
            Parilata Foundation documents environmental change as it happens —
            through the people restoring rivers, replanting forests, and
            rebuilding their neighborhoods, led by activist Kajal Kaser.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              href="/stories"
              className="group inline-flex items-center gap-2 rounded-full bg-canopy-700 px-7 py-3.5 font-semibold text-paper transition hover:bg-moss-700"
            >
              Read the stories
              <ArrowRight size={18} className="transition group-hover:translate-x-1" />
            </Link>
            <Link
              href="/videos"
              className="inline-flex items-center gap-2 rounded-full border border-canopy-300 px-7 py-3.5 font-semibold text-canopy-800 transition hover:bg-canopy-100 dark:text-paper dark:hover:bg-canopy-700"
            >
              <PlayCircle size={18} /> Watch the films
            </Link>
          </div>

          <dl className="mt-12 flex flex-wrap gap-x-10 gap-y-4 border-t border-canopy-100 pt-8 dark:border-canopy-700">
            <div>
              <dt className="font-display text-3xl font-semibold text-canopy-900 dark:text-paper">120+</dt>
              <dd className="text-sm text-canopy-700/70 dark:text-canopy-100/70">stories published</dd>
            </div>
            <div>
              <dt className="font-display text-3xl font-semibold text-canopy-900 dark:text-paper">34</dt>
              <dd className="text-sm text-canopy-700/70 dark:text-canopy-100/70">community campaigns</dd>
            </div>
            <div>
              <dt className="font-display text-3xl font-semibold text-canopy-900 dark:text-paper">6,500+</dt>
              <dd className="text-sm text-canopy-700/70 dark:text-canopy-100/70">trees restored</dd>
            </div>
          </dl>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
          className="relative flex items-center justify-center"
        >
          <div className="animate-float-slow h-[420px] w-[420px] max-w-full">
            <GrowthRings />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
