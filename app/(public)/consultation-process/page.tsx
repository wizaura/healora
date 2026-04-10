import CTASection from "@/components/common/CTASection";
import ConsultationProcess from "@/components/consultation-process/Main";

export default function ConsultationProcessPage() {
    return (
        <div>
            <ConsultationProcess />
            <CTASection
                title="Take the first step towards better health"
                description="Book an appointment with trusted doctors and specialists. Personalized care, flexible scheduling, and expert guidance — all in one place."
                buttonLabel="Book Appointment"
                buttonHref="/doctors"
            />
        </div>
    )
}