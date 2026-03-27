import CTASection from "@/components/common/CTASection";
import Medikits from "@/components/medikits/Main";

export default function MedikitsPage() {
    return (
        <div>
            <Medikits />
            <CTASection
                title="Take the first step towards better health"
                description="Book an appointment with trusted doctors and specialists. Personalized care, flexible scheduling, and expert guidance — all in one place."
                buttonLabel="Book Appointment"
                buttonHref="/doctors"
            />
        </div>
    )
}