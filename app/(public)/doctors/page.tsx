import CTASection from "@/components/common/CTASection";
import AllDoctors from "@/components/doctors/Main";

export default function DoctorsPage() {
    return (
        <div>
            <AllDoctors />
            <CTASection
                title="Take the first step towards better health"
                description="Book an appointment with trusted doctors and specialists. Personalized care, flexible scheduling, and expert guidance — all in one place."
                showButton={false}
            />
        </div>
    )
}