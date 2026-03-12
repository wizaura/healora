import HomeopathySection from "@/components/about/Homeopathy";
import LeadershipSection from "@/components/about/Leadership";
import About from "@/components/about/Main";
import CounsellingPsychotherapySection from "@/components/about/Psychotherapy";
import MissionVisionSection from "@/components/about/VisionMission";

export default function AboutPage() {
    return (
        <div>
            <About />
            <MissionVisionSection />
            <HomeopathySection />
            <CounsellingPsychotherapySection />
            <LeadershipSection />
        </div>
    )
}