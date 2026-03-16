import CTASection from "@/components/home/CTA";
import DoctorsSlider from "@/components/home/Doctors";
import FAQsSection from "@/components/home/FAQs";
import GreetingBanner from "@/components/home/GreetingBanner";
import HomeHero from "@/components/home/Hero";
import HowItWorks from "@/components/home/How";
import ReviewsSection from "@/components/home/Reviews";
import SpecialtiesSection from "@/components/home/Specialities";

export default function Home() {
  return (
    <div>
      <HomeHero />
      <DoctorsSlider />
      <SpecialtiesSection />
      <GreetingBanner />
      <HowItWorks />
      <ReviewsSection />
      <FAQsSection />
      <CTASection />
    </div>
  );
}
