import CTASection from "@/components/common/CTASection";
import SubSpecialityDetailPage from "@/components/specialities/slug/sub/Main";

export default function SubSpecialityPage() {
    return (
        <div>
            <SubSpecialityDetailPage />
            <CTASection
                title="Take the first step towards better health"
                description="Book an appointment with trusted doctors and specialists. Personalized care, flexible scheduling, and expert guidance — all in one place."
                buttonLabel="Book Appointment"
                buttonHref="/doctors"
            />
        </div>
    )
}