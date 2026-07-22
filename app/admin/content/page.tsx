"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { UploadCloud, Loader2, Save } from "lucide-react";
import {
  HERO_DEFAULTS, MISSION_DEFAULTS, ABOUT_DEFAULTS, CONTACT_DEFAULTS, DONATE_DEFAULTS,
  type HeroContent, type MissionContent, type AboutContent, type ContactInfo, type DonateInfo,
} from "@/lib/site-content-types";

function Field({ label, value, onChange, textarea = false, rows = 3 }: {
  label: string; value: string; onChange: (v: string) => void; textarea?: boolean; rows?: number;
}) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-canopy-800 dark:text-paper">{label}</label>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={rows}
          className="w-full rounded-lg border border-canopy-200 px-4 py-2.5 text-sm outline-none focus:border-moss-500 dark:border-canopy-600 dark:bg-canopy-800 dark:text-paper"
        />
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-lg border border-canopy-200 px-4 py-2.5 text-sm outline-none focus:border-moss-500 dark:border-canopy-600 dark:bg-canopy-800 dark:text-paper"
        />
      )}
    </div>
  );
}

function ImageField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  const [uploading, setUploading] = useState(false);
  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const supabase = createClient();
    const fileName = `site-${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
    const { error } = await supabase.storage.from("blog-images").upload(fileName, file);
    if (error) {
      toast.error("Upload failed: " + error.message);
      setUploading(false);
      return;
    }
    const { data } = supabase.storage.from("blog-images").getPublicUrl(fileName);
    onChange(data.publicUrl);
    setUploading(false);
  }
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-canopy-800 dark:text-paper">{label}</label>
      {value && <img src={value} alt="" className="mb-3 h-40 w-full rounded-lg object-cover" />}
      <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-canopy-300 px-4 py-3 text-sm text-canopy-700 hover:bg-canopy-50 dark:border-canopy-600 dark:text-paper dark:hover:bg-canopy-800">
        {uploading ? <Loader2 size={16} className="animate-spin" /> : <UploadCloud size={16} />}
        {uploading ? "Uploading..." : "Click to upload a new image"}
        <input type="file" accept="image/*" className="hidden" onChange={handleUpload} disabled={uploading} />
      </label>
    </div>
  );
}

async function saveSection(id: string, content: Record<string, unknown>) {
  const supabase = createClient();
  const { error } = await supabase.from("site_content").upsert({ id, content, updated_at: new Date().toISOString() });
  if (error) {
    toast.error("Could not save: " + error.message);
    return false;
  }
  toast.success("Saved — refresh the live site to see it.");
  return true;
}

export default function AdminContentPage() {
  const [hero, setHero] = useState<HeroContent>(HERO_DEFAULTS);
  const [mission, setMission] = useState<MissionContent>(MISSION_DEFAULTS);
  const [about, setAbout] = useState<AboutContent>(ABOUT_DEFAULTS);
  const [contact, setContact] = useState<ContactInfo>(CONTACT_DEFAULTS);
  const [donate, setDonate] = useState<DonateInfo>(DONATE_DEFAULTS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data } = await supabase.from("site_content").select("id, content").in("id", ["home_hero", "home_mission", "about_page", "contact_info", "donate_info"]);
      const map = Object.fromEntries((data ?? []).map((r) => [r.id, r.content]));
      if (map.home_hero) setHero({ ...HERO_DEFAULTS, ...map.home_hero });
      if (map.home_mission) setMission({ ...MISSION_DEFAULTS, ...map.home_mission });
      if (map.about_page) setAbout({ ...ABOUT_DEFAULTS, ...map.about_page });
      if (map.contact_info) setContact({ ...CONTACT_DEFAULTS, ...map.contact_info });
      if (map.donate_info) setDonate({ ...DONATE_DEFAULTS, ...map.donate_info });
      setLoading(false);
    }
    load();
  }, []);

  function upd<T>(setter: React.Dispatch<React.SetStateAction<T>>, key: keyof T) {
    return (v: string) => setter((prev) => ({ ...prev, [key]: v }));
  }

  async function handleSave(id: string, content: Record<string, unknown>) {
    setSaving(id);
    await saveSection(id, content);
    setSaving(null);
  }

  if (loading) {
    return <div className="flex items-center gap-2 text-canopy-700/70 dark:text-canopy-100/70"><Loader2 className="animate-spin" size={18} /> Loading current content...</div>;
  }

  return (
    <div className="max-w-3xl space-y-12">
      <div>
        <h1 className="font-display text-2xl font-semibold text-canopy-900 dark:text-paper">Site Content</h1>
        <p className="mt-1 text-sm text-canopy-700/70 dark:text-canopy-100/70">
          Edit the text and images shown on the Home and About pages. Changes appear on the live site as soon as you save.
        </p>
      </div>

      {/* HOME — HERO */}
      <section className="space-y-4 border-t border-canopy-100 pt-8 dark:border-canopy-700">
        <h2 className="font-display text-lg font-semibold text-canopy-900 dark:text-paper">Home Page — Hero Section</h2>
        <Field label="Small badge text" value={hero.badge} onChange={upd(setHero, "badge")} />
        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="Heading (first part)" value={hero.heading_pre} onChange={upd(setHero, "heading_pre")} />
          <Field label="Heading (italic word)" value={hero.heading_italic} onChange={upd(setHero, "heading_italic")} />
          <Field label="Heading (last part)" value={hero.heading_post} onChange={upd(setHero, "heading_post")} />
        </div>
        <Field label="Description paragraph" value={hero.description} onChange={upd(setHero, "description")} textarea rows={3} />
        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="Stat 1 value" value={hero.stat1_value} onChange={upd(setHero, "stat1_value")} />
          <Field label="Stat 1 label" value={hero.stat1_label} onChange={upd(setHero, "stat1_label")} />
          <div />
          <Field label="Stat 2 value" value={hero.stat2_value} onChange={upd(setHero, "stat2_value")} />
          <Field label="Stat 2 label" value={hero.stat2_label} onChange={upd(setHero, "stat2_label")} />
          <div />
          <Field label="Stat 3 value" value={hero.stat3_value} onChange={upd(setHero, "stat3_value")} />
          <Field label="Stat 3 label" value={hero.stat3_label} onChange={upd(setHero, "stat3_label")} />
        </div>
        <button onClick={() => handleSave("home_hero", hero)} disabled={saving === "home_hero"}
          className="inline-flex items-center gap-2 rounded-full bg-canopy-700 px-6 py-2.5 text-sm font-semibold text-paper hover:bg-moss-700 disabled:opacity-60">
          <Save size={15} /> {saving === "home_hero" ? "Saving..." : "Save Hero Section"}
        </button>
      </section>

      {/* HOME — MISSION */}
      <section className="space-y-4 border-t border-canopy-100 pt-8 dark:border-canopy-700">
        <h2 className="font-display text-lg font-semibold text-canopy-900 dark:text-paper">Home Page — Mission Section</h2>
        <Field label="Eyebrow label" value={mission.eyebrow} onChange={upd(setMission, "eyebrow")} />
        <Field label="Heading" value={mission.heading} onChange={upd(setMission, "heading")} textarea rows={2} />
        <Field label="Body paragraph" value={mission.body} onChange={upd(setMission, "body")} textarea rows={3} />
        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="Pillar 1 title" value={mission.pillar1_title} onChange={upd(setMission, "pillar1_title")} />
          <Field label="Pillar 2 title" value={mission.pillar2_title} onChange={upd(setMission, "pillar2_title")} />
          <Field label="Pillar 3 title" value={mission.pillar3_title} onChange={upd(setMission, "pillar3_title")} />
          <Field label="Pillar 1 text" value={mission.pillar1_copy} onChange={upd(setMission, "pillar1_copy")} textarea rows={2} />
          <Field label="Pillar 2 text" value={mission.pillar2_copy} onChange={upd(setMission, "pillar2_copy")} textarea rows={2} />
          <Field label="Pillar 3 text" value={mission.pillar3_copy} onChange={upd(setMission, "pillar3_copy")} textarea rows={2} />
        </div>
        <ImageField label="Founder / field photo" value={mission.image_url} onChange={upd(setMission, "image_url")} />
        <Field label="Quote" value={mission.quote} onChange={upd(setMission, "quote")} textarea rows={2} />
        <Field label="Quote attribution" value={mission.quote_author} onChange={upd(setMission, "quote_author")} />
        <button onClick={() => handleSave("home_mission", mission)} disabled={saving === "home_mission"}
          className="inline-flex items-center gap-2 rounded-full bg-canopy-700 px-6 py-2.5 text-sm font-semibold text-paper hover:bg-moss-700 disabled:opacity-60">
          <Save size={15} /> {saving === "home_mission" ? "Saving..." : "Save Mission Section"}
        </button>
      </section>

      {/* ABOUT PAGE */}
      <section className="space-y-4 border-t border-canopy-100 pt-8 dark:border-canopy-700">
        <h2 className="font-display text-lg font-semibold text-canopy-900 dark:text-paper">About Page</h2>
        <Field label="Intro heading" value={about.intro_heading} onChange={upd(setAbout, "intro_heading")} />
        <Field label="Intro paragraph" value={about.intro_body} onChange={upd(setAbout, "intro_body")} textarea rows={4} />
        <Field label="Vision text" value={about.vision} onChange={upd(setAbout, "vision")} textarea rows={2} />
        <Field label="Mission text" value={about.mission} onChange={upd(setAbout, "mission")} textarea rows={2} />
        <Field label="Founder name / title" value={about.founder_name} onChange={upd(setAbout, "founder_name")} />
        <Field label="Founder bio" value={about.founder_body} onChange={upd(setAbout, "founder_body")} textarea rows={4} />
        <ImageField label="Founder photo" value={about.founder_image_url} onChange={upd(setAbout, "founder_image_url")} />
        <p className="text-xs text-canopy-700/60 dark:text-canopy-100/60">
          Note: the Milestones timeline below the founder section isn't editable here yet — say the word if you'd like that added too.
        </p>
        <button onClick={() => handleSave("about_page", about)} disabled={saving === "about_page"}
          className="inline-flex items-center gap-2 rounded-full bg-canopy-700 px-6 py-2.5 text-sm font-semibold text-paper hover:bg-moss-700 disabled:opacity-60">
          <Save size={15} /> {saving === "about_page" ? "Saving..." : "Save About Page"}
        </button>
      </section>

      {/* CONTACT PAGE */}
      <section className="space-y-4 border-t border-canopy-100 pt-8 dark:border-canopy-700">
        <h2 className="font-display text-lg font-semibold text-canopy-900 dark:text-paper">Contact Page &amp; Footer Email</h2>
        <p className="text-xs text-canopy-700/60 dark:text-canopy-100/60">
          This email is shown on the Contact page and in the site footer. The WhatsApp number is set separately, in Vercel's environment variables (NEXT_PUBLIC_WHATSAPP_NUMBER), since changing it requires a redeploy either way.
        </p>
        <Field label="Contact email address" value={contact.email} onChange={upd(setContact, "email")} />
        <Field label="Location shown on Contact page" value={contact.location} onChange={upd(setContact, "location")} />
        <button onClick={() => handleSave("contact_info", contact)} disabled={saving === "contact_info"}
          className="inline-flex items-center gap-2 rounded-full bg-canopy-700 px-6 py-2.5 text-sm font-semibold text-paper hover:bg-moss-700 disabled:opacity-60">
          <Save size={15} /> {saving === "contact_info" ? "Saving..." : "Save Contact Info"}
        </button>
      </section>

      {/* DONATE PAGE */}
      <section className="space-y-4 border-t border-canopy-100 pt-8 dark:border-canopy-700">
        <h2 className="font-display text-lg font-semibold text-canopy-900 dark:text-paper">Donate Page</h2>
        <Field label="UPI ID" value={donate.upi_id} onChange={upd(setDonate, "upi_id")} />
        <Field label="Intro paragraph" value={donate.intro_text} onChange={upd(setDonate, "intro_text")} textarea rows={2} />
        <button onClick={() => handleSave("donate_info", donate)} disabled={saving === "donate_info"}
          className="inline-flex items-center gap-2 rounded-full bg-canopy-700 px-6 py-2.5 text-sm font-semibold text-paper hover:bg-moss-700 disabled:opacity-60">
          <Save size={15} /> {saving === "donate_info" ? "Saving..." : "Save Donate Info"}
        </button>
      </section>
    </div>
  );
}
