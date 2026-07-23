import Link from "next/link";
import { LayoutDashboard, FileText, Image as ImageIcon, Video, Users, Mail, Leaf, PenSquare, BookOpen, MessageSquare } from "lucide-react";
import { LogoutButton } from "@/components/admin/logout-button";
import { MobileAdminNav } from "@/components/admin/mobile-admin-nav";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const links = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/content", label: "Site Content", icon: PenSquare },
    { href: "/admin/blogs", label: "Blogs", icon: FileText },
    { href: "/admin/books", label: "Books", icon: BookOpen },
    { href: "/admin/gallery", label: "Gallery", icon: ImageIcon },
    { href: "/admin/videos", label: "Videos", icon: Video },
    { href: "/admin/comments", label: "Comments", icon: MessageSquare },
    { href: "/admin/volunteers", label: "Volunteers", icon: Users },
    { href: "/admin/messages", label: "Messages", icon: Mail },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-paper dark:bg-canopy-900 md:flex-row">
      <MobileAdminNav />
      <aside className="hidden w-64 flex-col border-r border-canopy-100 bg-canopy-900 p-6 text-paper md:flex">
        <div className="mb-8 flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-moss-500 text-canopy-900">
            <Leaf size={16} />
          </span>
          <span className="font-display text-base font-semibold">Parilata Admin</span>
        </div>
        <nav className="flex-1 space-y-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-canopy-100/85 hover:bg-canopy-700 hover:text-paper"
            >
              <l.icon size={17} /> {l.label}
            </Link>
          ))}
        </nav>
        <LogoutButton />
      </aside>
      <main className="flex-1 overflow-x-hidden p-4 sm:p-6 md:p-10">{children}</main>
    </div>
  );
}
