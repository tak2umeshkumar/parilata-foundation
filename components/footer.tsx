import Link from "next/link";
import { Leaf, Instagram, Facebook, Youtube, Mail, MessageCircle } from "lucide-react";
import { getSiteContent, CONTACT_DEFAULTS } from "@/lib/site-content";

const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "91XXXXXXXXXX";

export async function Footer() {
  const content = await getSiteContent("contact_info", CONTACT_DEFAULTS);
  return (
    <footer className="border-t border-canopy-100 bg-canopy-900 text-paper">
      <div className="container-wide grid gap-10 py-16 md:grid-cols-4">
        <div>
          <div className="mb-4 flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-moss-500 text-canopy-900">
              <Leaf size={18} strokeWidth={2.5} />
            </span>
            <span className="font-display text-lg font-semibold">Parilata Foundation</span>
          </div>
          <p className="max-w-xs text-sm text-canopy-100/80">
            Stories from the ground, campaigns for the future. Founded by
            environmental activist Kajal Kaser.
          </p>
        </div>

        <div>
          <h4 className="mb-4 font-display text-sm uppercase tracking-wide text-moss-300">Explore</h4>
          <ul className="space-y-2 text-sm text-canopy-100/80">
            <li><Link href="/about" className="hover:text-paper">About</Link></li>
            <li><Link href="/blog" className="hover:text-paper">Blog</Link></li>
            <li><Link href="/stories" className="hover:text-paper">Stories</Link></li>
            <li><Link href="/books" className="hover:text-paper">Books</Link></li>
            <li><Link href="/gallery" className="hover:text-paper">Gallery</Link></li>
            <li><Link href="/videos" className="hover:text-paper">Videos</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-display text-sm uppercase tracking-wide text-moss-300">Get Involved</h4>
          <ul className="space-y-2 text-sm text-canopy-100/80">
            <li><Link href="/volunteer" className="hover:text-paper">Volunteer</Link></li>
            <li><Link href="/donate" className="hover:text-paper">Donate</Link></li>
            <li><Link href="/contact" className="hover:text-paper">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-display text-sm uppercase tracking-wide text-moss-300">Connect</h4>
          <div className="flex gap-3">
            <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer"
              aria-label="WhatsApp" className="rounded-full bg-canopy-700 p-2.5 hover:bg-moss-700">
              <MessageCircle size={16} />
            </a>
            <a href={`mailto:${content.email}`} aria-label="Email"
              className="rounded-full bg-canopy-700 p-2.5 hover:bg-moss-700">
              <Mail size={16} />
            </a>
            <a href="#" aria-label="Instagram" className="rounded-full bg-canopy-700 p-2.5 hover:bg-moss-700">
              <Instagram size={16} />
            </a>
            <a href="#" aria-label="Facebook" className="rounded-full bg-canopy-700 p-2.5 hover:bg-moss-700">
              <Facebook size={16} />
            </a>
            <a href="#" aria-label="YouTube" className="rounded-full bg-canopy-700 p-2.5 hover:bg-moss-700">
              <Youtube size={16} />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-paper/10 py-6 text-center text-xs text-canopy-100/60">
        © {new Date().getFullYear()} Parilata Foundation. All rights reserved.
      </div>
    </footer>
  );
}
