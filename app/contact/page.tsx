"use client";

import { useState } from "react";
import { toast } from "sonner";
import { MessageCircle, Mail, MapPin } from "lucide-react";

const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "91XXXXXXXXXX";

export default function ContactPage() {
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
    <div className="container-wide py-16 md:py-24">
      <h1 className="font-display text-4xl font-semibold text-canopy-900 dark:text-paper">Get in Touch</h1>
      <p className="mt-2 max-w-xl text-canopy-700/80 dark:text-canopy-100/70">
        Questions, partnership ideas, or press inquiries — we'd love to hear from you.
      </p>

      <div className="mt-12 grid gap-12 md:grid-cols-2">
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

        <div className="space-y-6">
          <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-4 rounded-xl border border-canopy-100 p-5 hover:bg-canopy-50 dark:border-canopy-700 dark:hover:bg-canopy-800">
            <MessageCircle className="text-moss-600" size={22} />
            <div>
              <p className="font-semibold text-canopy-900 dark:text-paper">WhatsApp</p>
              <p className="text-sm text-canopy-700/70 dark:text-canopy-100/70">Chat with us directly</p>
            </div>
          </a>
          <a href="mailto:hello@parilatafoundation.org"
            className="flex items-center gap-4 rounded-xl border border-canopy-100 p-5 hover:bg-canopy-50 dark:border-canopy-700 dark:hover:bg-canopy-800">
            <Mail className="text-moss-600" size={22} />
            <div>
              <p className="font-semibold text-canopy-900 dark:text-paper">Email</p>
              <p className="text-sm text-canopy-700/70 dark:text-canopy-100/70">hello@parilatafoundation.org</p>
            </div>
          </a>
          <div className="flex items-center gap-4 rounded-xl border border-canopy-100 p-5 dark:border-canopy-700">
            <MapPin className="text-moss-600" size={22} />
            <div>
              <p className="font-semibold text-canopy-900 dark:text-paper">Based in</p>
              <p className="text-sm text-canopy-700/70 dark:text-canopy-100/70">India</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
