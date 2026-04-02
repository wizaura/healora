import AgroHomeopathy from "@/components/agro-homeopathy/Main";
import CTASection from "@/components/common/CTASection";

export default function AgroHomeopathyPage() {
    return (
        <div>
            <AgroHomeopathy />
            <CTASection
                title="Take the first step towards better health"
                description="Book an appointment with trusted doctors and specialists. Personalized care, flexible scheduling, and expert guidance — all in one place."
                buttonLabel="Book Appointment"
                buttonHref="/doctors"
            />
        </div>
    )
}