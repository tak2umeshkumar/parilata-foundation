"use client";

import { MessageCircle, Link2, Check } from "lucide-react";
import { useState } from "react";
import { whatsappShareUrl } from "@/lib/whatsapp";

export function ShareButtons({ title, url }: { title: string; url: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable — silently ignore, WhatsApp share still works.
    }
  }

  return (
    <div className="flex gap-2">
      <a
        href={whatsappShareUrl(`Check out "${title}"`, url)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on WhatsApp"
        className="inline-flex items-center gap-1.5 rounded-full border border-canopy-200 px-3.5 py-2 text-xs font-semibold text-canopy-700 hover:bg-canopy-50 dark:border-canopy-600 dark:text-paper dark:hover:bg-canopy-800"
      >
        <MessageCircle size={14} /> Share
      </a>
      <button
        onClick={handleCopy}
        aria-label="Copy link"
        className="inline-flex items-center gap-1.5 rounded-full border border-canopy-200 px-3.5 py-2 text-xs font-semibold text-canopy-700 hover:bg-canopy-50 dark:border-canopy-600 dark:text-paper dark:hover:bg-canopy-800"
      >
        {copied ? <Check size={14} className="text-moss-600" /> : <Link2 size={14} />}
        {copied ? "Copied" : "Copy link"}
      </button>
    </div>
  );
}
