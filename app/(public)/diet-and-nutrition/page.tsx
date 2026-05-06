import CTASection from "@/components/common/CTASection";
import NutritionSection from "@/components/diet-and-nutrition/Main";

export default function DietAndNutritionPage() {
    return (
        <div>
            <NutritionSection />
            <CTASection
                title="Take the first step towards better health"
                description="Book an appointment with trusted doctors and specialists. Personalized care, flexible scheduling, and expert guidance — all in one place."
                buttonLabel="Book Appointment"
                buttonHref="/doctors"
            />
        </div>
    )
}