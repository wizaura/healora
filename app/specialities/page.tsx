import CTASection from "@/components/common/CTASection";
import ExpertiseSection from "@/components/specialities/Expertise";
import SpecialtiesSection from "@/components/specialities/Main";
import ValuesSection from "@/components/specialities/Values";

export default function Specialties() {
    return (
        <div>
            <SpecialtiesSection />
            <ValuesSection />
            <ExpertiseSection />
            <CTASection
                title="Take the first step towards better health"
                description="Book an appointment with trusted doctors and specialists. Personalized care, flexible scheduling, and expert guidance — all in one place."
                buttonLabel="Book Appointment"
                buttonHref="/doctors"
            />
        </div>
    )
}