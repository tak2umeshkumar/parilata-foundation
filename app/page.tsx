import { Hero } from "@/components/sections/hero";
import { Mission } from "@/components/sections/mission";
import { FeaturedContent } from "@/components/sections/featured-content";
import { GalleryPreview, Testimonials, VolunteerDonateCTA } from "@/components/sections/gallery-testimonials-cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Mission />
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
