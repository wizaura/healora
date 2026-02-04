"use client";

import { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import CTAButton from "../common/CTAButton";
import SpecialityCard from "../common/SpecialitiesCard";
import { getActiveSpecialities } from "@/lib/specialities.api";
import { specialityIcons } from "@/lib/speciality-icons";

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
        description: "Professional guidance for emotional and mental wellbeing.",
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


export default function ServicesScrollSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    const { data = DUMMY_SPECIALITIES, isError } = useQuery({
        queryKey: ["specialities", "home"],
        queryFn: getActiveSpecialities,
        retry: false,
    });

    const services = data.slice(0, 4);

    useEffect(() => {
        const onScroll = () => {
            if (window.innerWidth < 768) return;
            if (!sectionRef.current || !trackRef.current) return;

            const section = sectionRef.current;
            const track = trackRef.current;

            const rect = section.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            const totalScroll = rect.height - viewportHeight;

            const scrolled = Math.min(Math.max(-rect.top, 0), totalScroll);
            const progress = scrolled / totalScroll;

            const maxTranslate =
                track.scrollWidth - window.innerWidth + 160;

            track.style.transform = `translateX(-${progress * maxTranslate}px)`;
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <section
            ref={sectionRef}
            className="
        relative m-4 rounded-xl
        bg-gradient-to-b
        from-wellness-bg
        via-white
        to-wellness-bg
        py-16
        md:h-[350vh] md:py-0
      "
        >
            {/* Sticky viewport */}
            <div className="relative md:sticky md:top-0 overflow-hidden mb-20">

                {/* Header */}
                <div className="mx-auto max-w-6xl px-8 pt-20 pb-16">
                    <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
                        <h2 className="text-3xl font-semibold text-navy-dark leading-tight md:text-6xl">
                            Complete Health
                            <br />
                            Care Solutions.
                        </h2>

                        <div className="flex flex-col items-start gap-6 md:items-end md:text-right">
                            <p className="max-w-md text-navy/80 text-lg">
                                Modern medical services designed around your
                                health, comfort, and recovery.
                            </p>

                            <CTAButton
                                label="View All Specialities"
                                href="/specialities"
                                variant="light"
                            />
                        </div>
                    </div>
                </div>

                {/* Horizontal cards */}
                <div className="relative overflow-hidden">
                    <div
                        ref={trackRef}
                        className="
              flex flex-col gap-3 px-6 py-6
              md:flex-row md:gap-6 md:px-24 md:py-3
              will-change-transform
            "
                    >
                        {services.map((s: any) => {
                            const Icon =
                                specialityIcons[s.icon] ||
                                specialityIcons.HeartPulse;

                            return (
                                <SpecialityCard
                                    key={s.id}
                                    name={s.name}
                                    description={s.description}
                                    icon={Icon}
                                    slug={s.slug}
                                    subSpecialities={s.subSpecialities}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
