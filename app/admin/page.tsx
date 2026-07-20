import { createClient } from "@/lib/supabase/server";
import { FileText, MessageSquare, Users, Image as ImageIcon } from "lucide-react";

export default async function AdminDashboard() {
  const supabase = await createClient();

  const [{ count: blogCount }, { count: msgCount }, { count: volCount }, { count: imgCount }] = await Promise.all([
    supabase.from("blogs").select("*", { count: "exact", head: true }),
    supabase.from("contact_messages").select("*", { count: "exact", head: true }).eq("is_read", false),
    supabase.from("volunteer_applications").select("*", { count: "exact", head: true }).eq("status", "new"),
    supabase.from("gallery_images").select("*", { count: "exact", head: true }),
  ]);

  const stats = [
    { label: "Total Blogs", value: blogCount ?? 0, icon: FileText },
    { label: "Unread Messages", value: msgCount ?? 0, icon: MessageSquare },
    { label: "New Volunteer Applications", value: volCount ?? 0, icon: Users },
    { label: "Gallery Images", value: imgCount ?? 0, icon: ImageIcon },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-canopy-900 dark:text-paper">Dashboard</h1>
      <p className="mt-1 text-sm text-canopy-700/70 dark:text-canopy-100/70">Welcome back. Here's what's happening.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border border-canopy-100 bg-white p-5 dark:border-canopy-700 dark:bg-canopy-800">
            <s.icon className="mb-3 text-moss-600" size={22} />
            <p className="font-display text-2xl font-semibold text-canopy-900 dark:text-paper">{s.value}</p>
            <p className="text-sm text-canopy-700/70 dark:text-canopy-100/70">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
