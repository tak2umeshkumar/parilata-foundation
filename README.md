# Parilata Foundation — Website Platform

Environmental blog & storytelling platform for the Parilata Foundation, founded by Kajal Kaser.
Built with Next.js 15 (App Router), TypeScript, Tailwind CSS, Framer Motion, and Supabase.

This delivery is **Phase 1**: a fully working, deployable foundation — home page, design
system, layout shell, database schema, and the API/integration wiring. Phase 2 (below) adds
the remaining content pages and the admin dashboard on top of this same structure.

---

## ✅ What's included in this phase

- Next.js 15 App Router project, TypeScript strict mode
- Full design system: Tailwind tokens (`tailwind.config.ts`) — forest green / earth brown /
  sky blue / moss palette, Fraunces (display) + Manrope (body) typography
- Responsive, animated **Home page**: hero (signature "growth rings" motif), mission, featured
  blogs, featured stories, gallery preview, testimonials, volunteer + donate CTAs
- Dark/light theme via `next-themes`
- PWA support via `next-pwa` + manifest
- SEO: dynamic metadata, OpenGraph/Twitter cards, JSON-LD `NGO` schema, `sitemap.xml`, `robots.txt`
- **Complete Supabase schema** (`supabase/schema.sql`) covering every table in the spec:
  profiles/users, blogs, stories, categories, tags, comments, gallery, videos, donations,
  volunteer applications, contact messages — with Row Level Security policies and storage buckets
- Supabase client helpers (browser, server, admin/service-role) in `lib/supabase/`
- WhatsApp + social share URL generator (`lib/whatsapp.ts`)
- Working API routes for the Contact form and Volunteer form (Zod-validated, RLS-safe)

## 🗂 Folder structure

```
parilata-foundation/
├── app/
│   ├── layout.tsx          # root layout, fonts, metadata, JSON-LD
│   ├── page.tsx            # home page
│   ├── globals.css
│   ├── sitemap.ts
│   ├── robots.ts
│   └── api/
│       ├── contact/route.ts
│       └── volunteer/route.ts
├── components/
│   ├── navbar.tsx
│   ├── footer.tsx
│   ├── theme-provider.tsx
│   └── sections/
│       ├── hero.tsx
│       ├── mission.tsx
│       ├── featured-content.tsx
│       └── gallery-testimonials-cta.tsx
├── lib/
│   ├── supabase/{client,server}.ts
│   └── whatsapp.ts
├── supabase/
│   └── schema.sql           # run this once in Supabase SQL editor
├── public/
│   └── manifest.json
├── tailwind.config.ts
├── next.config.mjs
└── .env.example
```

## 🚀 Local setup

```bash
npm install
cp .env.example .env.local     # fill in your Supabase keys
npm run dev
```

## 🗄 Supabase setup

1. Create a free project at [supabase.com](https://supabase.com).
2. Open **SQL Editor** → paste the contents of `supabase/schema.sql` → Run.
   This creates all tables, RLS policies, and storage buckets in one pass.
3. Go to **Project Settings → API** and copy:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY` (keep secret, server-only)
4. Go to **Authentication → Providers** and enable Email (or Google) sign-in.
5. After your own admin account signs up once, promote it in SQL Editor:
   ```sql
   update public.profiles set role = 'admin' where id = 'your-auth-user-uuid';
   ```

## ☁️ Deploy to Vercel (free tier)

1. Push this project to a GitHub repo.
2. Go to [vercel.com/new](https://vercel.com/new) → import the repo.
3. Add the same environment variables from `.env.local` in Vercel's
   **Project Settings → Environment Variables**.
4. Deploy. Vercel auto-detects Next.js — no build config changes needed.
5. Add your custom domain under **Project Settings → Domains** (optional).

## 📊 Free hosting stack recap

| Layer      | Service                | Free tier limit (as of writing — verify current limits) |
|------------|------------------------|-----------------------------------------------------------|
| Frontend   | Vercel                 | Generous hobby tier, auto SSL/CDN                          |
| Database   | Supabase Postgres      | 500MB DB, 50k monthly active users                         |
| Storage    | Supabase Storage       | 1GB storage, 2GB egress/month                               |
| Analytics  | Google Analytics (GA4) | Free, unlimited                                             |

---

## 🧭 Phase 2 roadmap (not yet built — next steps)

The remaining pages follow the exact same pattern as the Home page (Server Components fetching
from Supabase, shared `Navbar`/`Footer`, same design tokens), so they can be added incrementally:

- `/about` — foundation history, vision/mission, founder profile, achievements timeline
- `/blog` + `/blog/[slug]` — listing with search/filter/pagination, rich single-post view,
  comments, related posts, WhatsApp/social share buttons (helpers already in `lib/whatsapp.ts`)
- `/stories` + `/stories/[slug]` — same pattern, filtered by `story_type`
- `/gallery` — masonry layout (`react-photo-album`, already in `package.json`) + lightbox
- `/videos` + `/videos/[slug]` — embedded player grid
- `/contact` — form wired to the existing `/api/contact` route, map embed, WhatsApp button
- `/volunteer` — form wired to the existing `/api/volunteer` route
- `/donate` — UPI ID + QR code placeholder, thank-you page
- `/admin/*` — dashboard behind Supabase Auth + `profiles.role = 'admin'` check:
  analytics, blog/story CRUD with the TipTap rich-text editor (already installed), image/video
  upload to Supabase Storage, category/tag/user/comment management, contact & volunteer inboxes

Say the word and I'll build out any of these next — happy to do the admin dashboard or the
blog engine first if that's the higher priority piece for you.
