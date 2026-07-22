import Image from "next/image";
import { getSiteContent, ABOUT_DEFAULTS } from "@/lib/site-content";

export const metadata = { title: "About" };

const timeline = [
  { year: "2019", event: "Parilata Foundation founded by Kajal Kaser after a community lake clean-up in her hometown." },
  { year: "2021", event: "First large-scale reforestation drive — 1,200 native saplings planted." },
  { year: "2023", event: "Launched school outreach program on plastic reduction, reaching 40 schools." },
  { year: "2026", event: "120+ published stories and 6,500+ trees restored across partner communities." },
];

export default async function AboutPage() {
  const content = await getSiteContent("about_page", ABOUT_DEFAULTS);

  return (
    <div className="container-wide py-16 md:py-24">
      <div className="max-w-2xl">
        <span className="text-sm font-semibold uppercase tracking-wide text-moss-700">About Us</span>
        <h1 className="mt-2 font-display text-4xl font-semibold text-canopy-900 dark:text-paper">{content.intro_heading}</h1>
        <p className="mt-5 text-canopy-700/90 dark:text-canopy-100/80">
          {content.intro_body}
        </p>
      </div>

      <div className="mt-16 grid gap-10 md:grid-cols-2">
        <div className="rounded-2xl border border-canopy-100 p-8 dark:border-canopy-700">
          <h2 className="font-display text-xl font-semibold text-canopy-900 dark:text-paper">Vision</h2>
          <p className="mt-3 text-canopy-700/80 dark:text-canopy-100/70">
            {content.vision}
          </p>
        </div>
        <div className="rounded-2xl border border-canopy-100 p-8 dark:border-canopy-700">
          <h2 className="font-display text-xl font-semibold text-canopy-900 dark:text-paper">Mission</h2>
          <p className="mt-3 text-canopy-700/80 dark:text-canopy-100/70">
            {content.mission}
          </p>
        </div>
      </div>

      <div className="mt-16 grid gap-12 md:grid-cols-2 md:items-center">
        <div className="relative aspect-[4/5] overflow-hidden rounded-organic bg-canopy-100">
          <Image src={content.founder_image_url} alt={content.founder_name} fill className="object-cover" />
        </div>
        <div>
          <h2 className="font-display text-2xl font-semibold text-canopy-900 dark:text-paper">{content.founder_name}</h2>
          <p className="mt-3 text-canopy-700/80 dark:text-canopy-100/70">
            {content.founder_body}
          </p>
        </div>
      </div>

      <div className="mt-20">
        <h2 className="font-display text-2xl font-semibold text-canopy-900 dark:text-paper">Milestones</h2>
        <div className="mt-8 space-y-8 border-l-2 border-canopy-100 pl-8 dark:border-canopy-700">
          {timeline.map((t) => (
            <div key={t.year} className="relative">
              <span className="absolute -left-[38px] top-1 h-3 w-3 rounded-full bg-moss-500" />
              <p className="font-display text-lg font-semibold text-moss-700">{t.year}</p>
              <p className="mt-1 text-canopy-700/80 dark:text-canopy-100/70">{t.event}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
