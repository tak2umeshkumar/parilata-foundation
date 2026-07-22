import { Hero } from "@/components/sections/hero";
import { Mission } from "@/components/sections/mission";
import { FeaturedContent } from "@/components/sections/featured-content";
import { GalleryPreview, Testimonials, VolunteerDonateCTA } from "@/components/sections/gallery-testimonials-cta";
import { getSiteContent, HERO_DEFAULTS, MISSION_DEFAULTS } from "@/lib/site-content";

export default async function HomePage() {
  const [heroContent, missionContent] = await Promise.all([
    getSiteContent("home_hero", HERO_DEFAULTS),
    getSiteContent("home_mission", MISSION_DEFAULTS),
  ]);

  return (
    <>
      <Hero content={heroContent} />
      <Mission content={missionContent} />
      <FeaturedContent
        heading="Featured Blogs"
        subheading="From the Blog"
        basePath="/blog"
        viewAllHref="/blog"
      />
      <FeaturedContent
        heading="Featured Stories"
        subheading="Environmental Stories"
        basePath="/stories"
        viewAllHref="/stories"
      />
      <GalleryPreview />
      <Testimonials />
      <VolunteerDonateCTA />
    </>
  );
}
