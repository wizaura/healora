"use client";

import { useQuery } from "@tanstack/react-query";
import { getActiveSpecialities } from "@/lib/specialities.api";
import { specialityIcons } from "@/lib/speciality-icons";
import SpecialityCard from "../common/SpecialitiesCard";
import { useMemo, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function SpecialtiesSection() {
    const { data, isLoading } = useQuery({
        queryKey: ["specialities"],
        queryFn: getActiveSpecialities,
        retry: false,
    });

    useEffect(() => {
        AOS.init({
            duration: 800,
            easing: "ease-out-cubic",
            once: true,
        });
    }, []);

    const sortedSpecialities = useMemo(() => {
        if (!Array.isArray(data)) return [];

        const exactHomeopathy: typeof data = [];
        const haveHomeopathy: typeof data = [];
        const others: typeof data = [];

        data.forEach((item) => {
            const name = item?.name?.trim().toLowerCase();

            if (name === "homeopathy") {
                exactHomeopathy.push(item);
            } else if (name?.includes("homeopathy")) {
                haveHomeopathy.push(item);
            } else {
                others.push(item);
            }
        });

        return [...exactHomeopathy, ...others, ...haveHomeopathy];
    }, [data]);

    if (isLoading) {
        return (
            <section className="py-24 text-center text-navy/60">
                Loading specialities…
            </section>
        );
    }

    return (
        <section className="relative m-4 rounded-3xl overflow-hidden">


            {/* HEADER BG IMAGE */}
            <div className="relative overflow-hidden">

                {/* BG IMAGE */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="/hero-2.jpeg"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" />
                </div>

                {/* CONTENT */}
                <div className="relative z-10 py-24 px-6 text-center max-w-5xl mx-auto">

                    <h2
                        data-aos="fade-up"
                        data-aos-delay="100"
                        className="text-4xl md:text-6xl font-semibold leading-[1.15] tracking-[-0.02em] text-white"
                    >
                        Quality Medical Services
                        <br />
                        For Every Patient
                    </h2>

                    <p
                        data-aos="fade-up"
                        data-aos-delay="200"
                        className="mt-6 text-lg text-white/90 max-w-2xl mx-auto leading-relaxed"
                    >
                        Discover our range of holistic healthcare services designed
                        to address physical, mental, and emotional wellbeing. Our
                        specialists provide personalized treatments to help you
                        achieve lasting health and balance.
                    </p>

                </div>

                {/* ✅ WAVE (FIXED POSITION) */}
                <div className="absolute bottom-0 left-0 w-full z-10 leading-none">
                    <svg
                        viewBox="0 0 1440 120"
                        className="w-full h-[80px] md:h-[80px]"
                        preserveAspectRatio="none"
                    >
                        <path
                            d="M0,40 C240,120 480,0 720,40 C960,80 1200,0 1440,40 L1440,120 L0,120 Z"
                            fill="white"
                        />
                    </svg>
                </div>

            </div>

            {/* CARDS */}
            <div className="bg-gradient-to-b from-white to-wellness-bg py-16 px-4">
                <div className="max-w-5xl lg:max-w-7xl mx-auto">

                    <div className="mx-auto grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">

                        {sortedSpecialities.map((item: any, index: number) => {
                            const Icon =
                                specialityIcons[item.icon] || specialityIcons.HeartPulse;

                            return (
                                <div
                                    key={item.id}
                                    data-aos="fade-up"
                                    data-aos-delay={100 + index * 100}
                                >
                                    <SpecialityCard
                                        name={item.name}
                                        description={item.description}
                                        imageUrl={item.overview?.images?.image1?.url}
                                        slug={item.slug}
                                    />
                                </div>
                            );
                        })}

                    </div>

                </div>
            </div>
        </section>
    );
}