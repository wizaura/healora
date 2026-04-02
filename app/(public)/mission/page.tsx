import CTASection from "@/components/common/CTASection";
import LeadershipSection from "@/components/mission/Leadership";
import MissionVisionSection from "@/components/mission/Main";

export default function VisionMissionPage() {
    return (
        <div>
            <MissionVisionSection />
            <LeadershipSection />
            <CTASection
                title="Take the first step towards better health"
                description="Book an appointment with trusted doctors and specialists. Personalized care, flexible scheduling, and expert guidance — all in one place."
                buttonLabel="Book Appointment"
                buttonHref="/doctors"
            />
        </div>
    )
}