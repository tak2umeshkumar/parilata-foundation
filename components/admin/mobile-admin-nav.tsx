"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, LayoutDashboard, FileText, Image as ImageIcon, Video, Users, Mail, Leaf } from "lucide-react";
import { LogoutButton } from "@/components/admin/logout-button";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/blogs", label: "Blogs", icon: FileText },
  { href: "/admin/gallery", label: "Gallery", icon: ImageIcon },
  { href: "/admin/videos", label: "Videos", icon: Video },
  { href: "/admin/volunteers", label: "Volunteers", icon: Users },
  { href: "/admin/messages", label: "Messages", icon: Mail },
];

export function MobileAdminNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="sticky top-0 z-40 flex items-center justify-between border-b border-canopy-100 bg-canopy-900 px-4 py-3.5 text-paper md:hidden">
      <div className="flex items-center gap-2">
        <span className="grid h-7 w-7 place-items-center rounded-full bg-moss-500 text-canopy-900">
          <Leaf size={14} />
        </span>
        <span className="font-display text-sm font-semibold">Parilata Admin</span>
      </div>
      <button aria-label="Open admin menu" onClick={() => setOpen(true)} className="p-1.5">
        <Menu size={22} />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 bg-canopy-900">
          <div className="flex items-center justify-between px-4 py-3.5">
            <span className="font-display text-sm font-semibold">Menu</span>
            <button aria-label="Close admin menu" onClick={() => setOpen(false)} className="p-1.5">
              <X size={22} />
            </button>
          </div>
          <nav className="flex flex-col gap-1 px-4 pt-2">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 rounded-lg px-3 py-3.5 text-base ${pathname === l.href ? "bg-canopy-700 text-paper" : "text-canopy-100/85"}`}
              >
                <l.icon size={19} /> {l.label}
              </Link>
            ))}
            <div className="mt-2 border-t border-paper/10 pt-2">
              <LogoutButton />
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}
