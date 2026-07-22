"use client";

import { useState } from "react";
import { toast } from "sonner";

export function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSubmitting(false);
    if (res.ok) {
      toast.success("Message sent — we'll get back to you soon.");
      setForm({ name: "", email: "", subject: "", message: "" });
    } else {
      toast.error("Something went wrong. Please try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input required placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="w-full rounded-lg border border-canopy-200 px-4 py-3 text-sm outline-none focus:border-moss-500 dark:border-canopy-600 dark:bg-canopy-800 dark:text-paper" />
      <input required type="email" placeholder="Email address" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="w-full rounded-lg border border-canopy-200 px-4 py-3 text-sm outline-none focus:border-moss-500 dark:border-canopy-600 dark:bg-canopy-800 dark:text-paper" />
      <input placeholder="Subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}
        className="w-full rounded-lg border border-canopy-200 px-4 py-3 text-sm outline-none focus:border-moss-500 dark:border-canopy-600 dark:bg-canopy-800 dark:text-paper" />
      <textarea required rows={5} placeholder="Your message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
        className="w-full rounded-lg border border-canopy-200 px-4 py-3 text-sm outline-none focus:border-moss-500 dark:border-canopy-600 dark:bg-canopy-800 dark:text-paper" />
      <button type="submit" disabled={submitting}
        className="rounded-full bg-canopy-700 px-7 py-3 text-sm font-semibold text-paper hover:bg-moss-700 disabled:opacity-60">
        {submitting ? "Sending..." : "Send message"}
      </button>
    </form>
  );
}
