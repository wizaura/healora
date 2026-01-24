import CTASection from "@/components/specialities/CTA";
import ExpertiseSection from "@/components/specialities/Expertise";
import SpecialtiesSection from "@/components/specialities/Main";
import ValuesSection from "@/components/specialities/Values";

export default function Specialties() {
    return (
        <div>
            <SpecialtiesSection />
            <ValuesSection />
            <ExpertiseSection />
            <CTASection />
        </div>
    )
}