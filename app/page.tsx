import DoctorsSlider from "@/components/home/Doctors";
import FAQsSection from "@/components/home/FAQs";
import HomeHero from "@/components/home/Hero";
import HowItWorks from "@/components/home/How";
import ReviewsSection from "@/components/home/Reviews";
import SpecialtiesSection from "@/components/home/Specialities";

export default function Home() {
  return (
    <div>
      <HomeHero />
      <SpecialtiesSection />
      <DoctorsSlider />
      <HowItWorks />
      <ReviewsSection />
      <FAQsSection />
    </div>
  );
}
