"use client";

import { useState } from "react";
import { toast } from "sonner";

const AREAS = ["Reforestation", "Water clean-ups", "School workshops", "Event support", "Social media / content"];

export default function VolunteerPage() {
  const [form, setForm] = useState({ full_name: "", email: "", phone: "", city: "", availability: "", message: "" });
  const [areas, setAreas] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);

  function toggleArea(a: string) {
    setAreas((prev) => (prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (areas.length === 0) {
      toast.error("Please select at least one area of interest.");
      return;
    }
    setSubmitting(true);
    const res = await fetch("/api/volunteer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, areas_of_interest: areas }),
    });
    setSubmitting(false);
    if (res.ok) {
      toast.success("Application received — we'll reach out soon.");
      setForm({ full_name: "", email: "", phone: "", city: "", availability: "", message: "" });
      setAreas([]);
    } else {
      toast.error("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="container-wide max-w-2xl py-16 md:py-24">
      <h1 className="font-display text-4xl font-semibold text-canopy-900 dark:text-paper">Volunteer</h1>
      <p className="mt-2 text-canopy-700/80 dark:text-canopy-100/70">
        Tell us a bit about yourself and where you'd like to help.
      </p>

      <form onSubmit={handleSubmit} className="mt-10 space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <input required placeholder="Full name" value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })}
            className="rounded-lg border border-canopy-200 px-4 py-3 text-sm outline-none focus:border-moss-500 dark:border-canopy-600 dark:bg-canopy-800 dark:text-paper" />
          <input required type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="rounded-lg border border-canopy-200 px-4 py-3 text-sm outline-none focus:border-moss-500 dark:border-canopy-600 dark:bg-canopy-800 dark:text-paper" />
          <input placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="rounded-lg border border-canopy-200 px-4 py-3 text-sm outline-none focus:border-moss-500 dark:border-canopy-600 dark:bg-canopy-800 dark:text-paper" />
          <input placeholder="City" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })}
            className="rounded-lg border border-canopy-200 px-4 py-3 text-sm outline-none focus:border-moss-500 dark:border-canopy-600 dark:bg-canopy-800 dark:text-paper" />
        </div>

        <div>
          <p className="mb-2 text-sm font-medium text-canopy-800 dark:text-paper">Areas of interest</p>
          <div className="flex flex-wrap gap-2">
            {AREAS.map((a) => (
              <button type="button" key={a} onClick={() => toggleArea(a)}
                className={`rounded-full border px-4 py-2 text-sm ${areas.includes(a) ? "border-moss-600 bg-moss-100 text-moss-700" : "border-canopy-200 text-canopy-700 dark:border-canopy-600 dark:text-paper"}`}>
                {a}
              </button>
            ))}
          </div>
        </div>

        <input placeholder="Availability (e.g. weekends, evenings)" value={form.availability} onChange={(e) => setForm({ ...form, availability: e.target.value })}
          className="w-full rounded-lg border border-canopy-200 px-4 py-3 text-sm outline-none focus:border-moss-500 dark:border-canopy-600 dark:bg-canopy-800 dark:text-paper" />
        <textarea rows={4} placeholder="Anything else you'd like us to know?" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full rounded-lg border border-canopy-200 px-4 py-3 text-sm outline-none focus:border-moss-500 dark:border-canopy-600 dark:bg-canopy-800 dark:text-paper" />

        <button type="submit" disabled={submitting}
          className="rounded-full bg-canopy-700 px-7 py-3 text-sm font-semibold text-paper hover:bg-moss-700 disabled:opacity-60">
          {submitting ? "Submitting..." : "Submit application"}
        </button>
      </form>
    </div>
  );
}
