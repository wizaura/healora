"use client";

import { useQuery } from "@tanstack/react-query";
import { getActiveSpecialities } from "@/lib/specialities.api";
import { specialityIcons } from "@/lib/speciality-icons";
import SpecialityCard from "../common/SpecialitiesCard";

const DUMMY_SPECIALITIES = [
    {
        id: "s1",
        name: "Homeopathy",
        slug: "homeopathy",
        description: "Natural and holistic treatment focused on long-term healing.",
        icon: "Leaf",
        subSpecialities: [],
    },
    {
        id: "s2",
        name: "Agro-Homeopathy",
        slug: "agro-homeopathy",
        description: "Eco-friendly plant and crop care through homeopathy.",
        icon: "Sprout",
        subSpecialities: [],
    },
    {
        id: "s3",
        name: "Veterinary Homeopathy",
        slug: "veterinary-homeopathy",
        description: "Gentle and effective animal healthcare solutions.",
        icon: "Dog",
        subSpecialities: [],
    },
    {
        id: "s4",
        name: "Counseling",
        slug: "counseling",
        description: "Professional guidance for emotional and mental wellbeing.\t \n \nnnn \n nn \n mm",
        icon: "MessageCircle",
        subSpecialities: [],
    },
    {
        id: "s5",
        name: "Psychology",
        slug: "psychology",
        description: "Evidence-based mental health assessment and therapy.",
        icon: "Brain",
        subSpecialities: [],
    },
    {
        id: "s6",
        name: "Fitness",
        slug: "fitness",
        description: "Personalized fitness plans for strength and recovery.",
        icon: "Dumbbell",
        subSpecialities: [],
    },
    {
        id: "s7",
        name: "Diet & Nutrition",
        slug: "diet-nutrition",
        description: "Balanced nutrition plans tailored to your lifestyle.",
        icon: "Apple",
        subSpecialities: [],
    },
    {
        id: "s8",
        name: "Physiotherapy",
        slug: "physiotherapy",
        description: "Rehabilitation and mobility care by certified therapists.",
        icon: "Activity",
        subSpecialities: [],
    },
    {
        id: "s9",
        name: "Naturopathy",
        slug: "naturopathy",
        description: "Drug-free healing using natural therapies.",
        icon: "Leaf",
        subSpecialities: [],
    },
];

export default function SpecialtiesSection() {
    const { data = DUMMY_SPECIALITIES, isLoading, isError } = useQuery({
        queryKey: ["specialities"],
        queryFn: getActiveSpecialities,
        retry: false,
    });

    if (isLoading) {
        return (
            <section className="py-24 text-center text-navy/60">
                Loading specialities…
            </section>
        );
    }

    return (
        <section
            className="
        relative m-4 rounded-3xl
        bg-gradient-to-b
        from-white via-wellness-bg to-wellness-bg
        py-20
      "
        >
            <div className="mx-auto max-w-7xl px-6">

                {/* Header */}
                <div className="mb-20 text-center">
                    <span
                        className="
              inline-block mb-6
              rounded-full
              border border-navy/10
              bg-white/80
              px-8 py-2
              text-sm font-medium
              text-navy/70
              backdrop-blur
            "
                    >
                        Specialities
                    </span>

                    <h2
                        className="
              text-4xl md:text-6xl
              font-semibold
              leading-[1.15]
              tracking-[-0.02em]
              text-navy
            "
                    >
                        Quality Medical Services
                        <br />
                        For Every Patient
                    </h2>
                </div>

                {/* Cards */}
                <div className="mx-auto grid max-w-5xl gap-4 md:gap-6 md:grid-cols-2">
                    {data.map((item: any) => {
                        const Icon =
                            specialityIcons[item.icon] || specialityIcons.HeartPulse;

                        return (
                            <SpecialityCard
                                key={item.id}
                                name={item.name}
                                description={item.description}
                                icon={Icon}
                                slug={item.slug}
                                subSpecialities={item.subSpecialities}
                            />
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
