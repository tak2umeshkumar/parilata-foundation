"use client";

import { useState } from "react";
import { MessageCircle, Facebook, Twitter, Link2, Check } from "lucide-react";
import { whatsappShareUrl, facebookShareUrl, twitterShareUrl } from "@/lib/whatsapp";

export function ShareButtons({ title, url }: { title: string; url: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="flex items-center gap-2">
      <a href={whatsappShareUrl(title, url)} target="_blank" rel="noopener noreferrer" aria-label="Share on WhatsApp"
        className="rounded-full bg-canopy-50 p-2.5 text-canopy-700 transition hover:bg-moss-100 hover:text-moss-700 dark:bg-canopy-800 dark:text-paper">
        <MessageCircle size={16} />
      </a>
      <a href={facebookShareUrl(url)} target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook"
        className="rounded-full bg-canopy-50 p-2.5 text-canopy-700 transition hover:bg-moss-100 hover:text-moss-700 dark:bg-canopy-800 dark:text-paper">
        <Facebook size={16} />
      </a>
      <a href={twitterShareUrl(title, url)} target="_blank" rel="noopener noreferrer" aria-label="Share on X / Twitter"
        className="rounded-full bg-canopy-50 p-2.5 text-canopy-700 transition hover:bg-moss-100 hover:text-moss-700 dark:bg-canopy-800 dark:text-paper">
        <Twitter size={16} />
      </a>
      <button onClick={handleCopy} aria-label="Copy link"
        className="rounded-full bg-canopy-50 p-2.5 text-canopy-700 transition hover:bg-moss-100 hover:text-moss-700 dark:bg-canopy-800 dark:text-paper">
        {copied ? <Check size={16} className="text-moss-600" /> : <Link2 size={16} />}
      </button>
    </div>
  );
}
