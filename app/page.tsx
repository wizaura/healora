
import CTASection from "@/components/common/CTASection";
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
      <CTASection
        title="Take the first step towards better health"
        description="Book an appointment with trusted doctors and specialists. Personalized care, flexible scheduling, and expert guidance — all in one place."
        buttonLabel="Book Appointment"
        buttonHref="/doctors"
      />
    </div>
  );
}
