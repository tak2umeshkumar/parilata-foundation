"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Quote, HandHeart, HeartHandshake } from "lucide-react";

const galleryPreview = [
  "https://images.unsplash.com/photo-1440342359743-84fcb8c21f21?w=600&q=80",
  "https://images.unsplash.com/photo-1466692476868-9ee5a3a3e93b?w=600&q=80",
  "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&q=80",
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe8f?w=600&q=80",
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=80",
  "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=600&q=80",
];

const testimonials = [
  { name: "Ritika Sharma", role: "Volunteer, Lake Revival Drive", quote: "I came for one Saturday clean-up and stayed for two years. Parilata makes it easy to actually show up." },
  { name: "Devendra Patil", role: "Local Farmer, Reforestation Project", quote: "They didn't just plant trees and leave. They came back every season to check on them, and on us." },
  { name: "Anaya Verma", role: "Teacher, School Plastic Pledge", quote: "Our students still talk about the day Kajal visited. It changed how they see their own street." },
];

export function GalleryPreview() {
  return (
    <section className="bg-canopy-50 py-20 dark:bg-canopy-900/40 md:py-24">
      <div className="container-wide">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="text-sm font-semibold uppercase tracking-wide text-moss-700">In the Field</span>
            <h2 className="mt-2 font-display text-3xl font-semibold text-canopy-900 dark:text-paper">Photo Gallery</h2>
          </div>
          <Link href="/gallery" className="text-sm font-semibold text-canopy-700 hover:text-moss-700 dark:text-paper">
            Open full gallery →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {galleryPreview.map((src, i) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className={`relative overflow-hidden rounded-xl ${i === 0 ? "col-span-2 row-span-2 aspect-square md:aspect-auto" : "aspect-square"}`}
            >
              <Image src={src} alt="Field work photo" fill className="object-cover transition hover:scale-105" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Testimonials() {
  return (
    <section className="container-wide py-20 md:py-24">
      <div className="mb-12 text-center">
        <span className="text-sm font-semibold uppercase tracking-wide text-moss-700">Voices</span>
        <h2 className="mt-2 font-display text-3xl font-semibold text-canopy-900 dark:text-paper">From the Community</h2>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {testimonials.map((t) => (
          <div key={t.name} className="rounded-2xl border border-canopy-100 bg-white/60 p-7 dark:border-canopy-700 dark:bg-canopy-800/40">
            <Quote className="mb-4 text-moss-500" size={28} />
            <p className="font-display text-lg italic leading-relaxed text-canopy-900 dark:text-paper">"{t.quote}"</p>
            <p className="mt-5 text-sm font-semibold text-canopy-900 dark:text-paper">{t.name}</p>
            <p className="text-xs text-canopy-700/60 dark:text-canopy-100/60">{t.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function VolunteerDonateCTA() {
  return (
    <section className="container-wide grid gap-6 pb-20 md:grid-cols-2 md:pb-28">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="rounded-3xl bg-canopy-700 p-10 text-paper"
      >
        <HandHeart size={30} className="mb-4 text-moss-300" />
        <h3 className="font-display text-2xl font-semibold">Volunteer with us</h3>
        <p className="mt-3 max-w-sm text-canopy-100/80">
          Clean-ups, plantation drives, school workshops — there's a role for
          whatever time you can give.
        </p>
        <Link href="/volunteer" className="mt-6 inline-flex rounded-full bg-moss-500 px-6 py-3 font-semibold text-canopy-900 hover:bg-moss-300">
          Join as a volunteer
        </Link>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="rounded-3xl bg-earth-700 p-10 text-paper"
      >
        <HeartHandshake size={30} className="mb-4 text-earth-100" />
        <h3 className="font-display text-2xl font-semibold">Support the work</h3>
        <p className="mt-3 max-w-sm text-earth-100/85">
          Every rupee funds saplings, water-testing kits, and the volunteers
          who show up on the ground.
        </p>
        <Link href="/donate" className="mt-6 inline-flex rounded-full bg-paper px-6 py-3 font-semibold text-earth-700 hover:bg-earth-100">
          Donate now
        </Link>
      </motion.div>
    </section>
  );
}
