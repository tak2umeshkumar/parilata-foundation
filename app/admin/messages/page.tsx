import { createClient } from "@/lib/supabase/server";

export default async function AdminMessagesPage() {
  const supabase = await createClient();
  const { data: messages } = await supabase.from("contact_messages").select("*").order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="mb-6 font-display text-2xl font-semibold text-canopy-900 dark:text-paper">Contact Messages</h1>
      <div className="space-y-4">
        {(messages ?? []).map((m) => (
          <div key={m.id} className="rounded-xl border border-canopy-100 p-5 dark:border-canopy-700">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-semibold text-canopy-900 dark:text-paper">{m.name} <span className="font-normal text-canopy-700/60">· {m.email}</span></p>
              <span className="text-xs text-canopy-700/60 dark:text-canopy-100/60">{new Date(m.created_at).toLocaleDateString()}</span>
            </div>
            {m.subject && <p className="mt-1 text-sm font-medium text-canopy-800 dark:text-paper">{m.subject}</p>}
            <p className="mt-2 text-sm text-canopy-700/70 dark:text-canopy-100/70">{m.message}</p>
          </div>
        ))}
        {(!messages || messages.length === 0) && <p className="text-canopy-700/60 dark:text-canopy-100/60">No messages yet.</p>}
      </div>
    </div>
  );
}
