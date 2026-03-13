import { Navbar } from "@/components/organisms/Navbar";
import { Hero } from "@/components/organisms/Hero";
import { FeatureSection } from "@/components/organisms/FeatureSection";
import { StatsSection } from "@/components/organisms/StatsSection";
import { Carousel } from "@/components/organisms/Carousel";
import { MediaSection } from "@/components/organisms/MediaSection";
import { Testimonials } from "@/components/organisms/Testimonials";
import { FAQSection } from "@/components/organisms/FAQSection";
import { CTASection } from "@/components/organisms/CTASection";
import { Footer } from "@/components/organisms/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <FeatureSection />
      <StatsSection />
      <Carousel />
      <MediaSection />
      <Testimonials />
      <FAQSection />
      <CTASection />
      <Footer />
    </main>
  );
}
