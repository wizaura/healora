import CTASection from "@/components/common/CTASection";
import MiniSpeciality from "@/components/specialities/slug/sub/mini/Main";

export default function MiniSpecialityPage() {
    return (
        <div>
            <MiniSpeciality />
            <CTASection
                title="Take the first step towards better health"
                description="Book an appointment with trusted doctors and specialists. Personalized care, flexible scheduling, and expert guidance — all in one place."
                buttonLabel="Book Appointment"
                buttonHref="/doctors"
            />
        </div>
    )
}