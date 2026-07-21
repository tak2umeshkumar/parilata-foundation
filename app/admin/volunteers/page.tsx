import { createClient } from "@/lib/supabase/server";

export default async function AdminVolunteersPage() {
  const supabase = await createClient();
  const { data: apps } = await supabase.from("volunteer_applications").select("*").order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="mb-6 font-display text-2xl font-semibold text-canopy-900 dark:text-paper">Volunteer Applications</h1>
      <div className="space-y-4">
        {(apps ?? []).map((a) => (
          <div key={a.id} className="rounded-xl border border-canopy-100 p-5 dark:border-canopy-700">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-semibold text-canopy-900 dark:text-paper">{a.full_name}</p>
              <span className="text-xs text-canopy-700/60 dark:text-canopy-100/60">{new Date(a.created_at).toLocaleDateString()}</span>
            </div>
            <p className="mt-1 text-sm text-canopy-700/80 dark:text-canopy-100/70">{a.email} {a.phone ? `· ${a.phone}` : ""} {a.city ? `· ${a.city}` : ""}</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {(a.areas_of_interest ?? []).map((area: string) => (
                <span key={area} className="rounded-full bg-moss-100 px-2.5 py-0.5 text-xs text-moss-700">{area}</span>
              ))}
            </div>
            {a.message && <p className="mt-3 text-sm text-canopy-700/70 dark:text-canopy-100/70">{a.message}</p>}
          </div>
        ))}
        {(!apps || apps.length === 0) && <p className="text-canopy-700/60 dark:text-canopy-100/60">No applications yet.</p>}
      </div>
    </div>
  );
}
