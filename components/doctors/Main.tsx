"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import api from "@/lib/api";
import DoctorCard from "@/components/common/DoctorCard";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export default function AllDoctors() {

    const router = useRouter();

    const [selectedSpeciality, setSelectedSpeciality] = useState<string>("homeopathy");

    useEffect(() => {
        AOS.init({
            duration: 800,
            easing: "ease-out-cubic",
            once: true,
        });
    }, []);

    /* ================= DOCTORS ================= */

    const { data: doctors = [], isLoading } = useQuery({
        queryKey: ["all-doctors"],
        queryFn: () => api.get("/doctor").then(res => res.data),
    });

    /* ================= SPECIALITIES ================= */

    const { data: specialities = [] } = useQuery({
        queryKey: ["specialities"],
        queryFn: () => api.get("/specialities").then(res => res.data),
    });

    /* ================= FILTERED DOCTORS ================= */

    const filteredDoctors = useMemo(() => {

        if (selectedSpeciality === "all") return doctors;

        return doctors.filter((doctor: any) =>
            doctor.specialities?.some(
                (s: any) => s.speciality?.slug === selectedSpeciality
            )
        );

    }, [doctors, selectedSpeciality]);


    if (isLoading) {
        return (
            <section className="py-24 text-center text-gray-500">
                Loading doctors...
            </section>
        );
    }


    return (

        <section
            className="
            relative m-4 rounded-3xl
            bg-gradient-to-b from-white via-white to-wellness-bg pb-24
        "
        >


            {/* ================= HEADER (UPDATED LIKE SPECIALITY) ================= */}

            <div className="relative overflow-hidden rounded-3xl mb-12">

                {/* BG IMAGE */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="/hero-2.jpeg"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />
                </div>

                {/* CONTENT */}
                <div className="relative z-10 py-24 px-6 text-center max-w-5xl mx-auto">

                    <h1
                        data-aos="fade-up"
                        data-aos-delay="100"
                        className="text-4xl md:text-6xl font-semibold leading-[1.15] tracking-[-0.02em] text-white"
                    >
                        Find the Right Doctor
                        <br />
                        For Your Care
                    </h1>

                    <p
                        data-aos="fade-up"
                        data-aos-delay="200"
                        className="mt-6 text-lg text-white/90 max-w-2xl mx-auto leading-relaxed"
                    >
                        Connect with experienced and verified healthcare professionals
                        across multiple specialities. Whether you need holistic
                        homeopathic care, nutritional guidance, counselling support,
                        or wellness consultations — Healora helps you find the right
                        doctor for your needs.
                    </p>

                </div>

                {/* WAVE */}
                <div className="absolute bottom-0 left-0 w-full z-10 leading-none">
                    <svg
                        viewBox="0 0 1440 120"
                        className="w-full h-[80px]"
                        preserveAspectRatio="none"
                    >
                        <path
                            d="M0,40 C240,120 480,0 720,40 C960,80 1200,0 1440,40 L1440,120 L0,120 Z"
                            fill="white"
                        />
                    </svg>
                </div>

            </div>

            <div className="mx-auto max-w-7xl">

                {/* ================= FILTER ================= */}

                <div className="mb-16 flex flex-wrap justify-center gap-3">

                    <div data-aos="fade-up" data-aos-delay="100">
                        <FilterButton
                            active={selectedSpeciality === "all"}
                            onClick={() => setSelectedSpeciality("all")}
                        >
                            All
                        </FilterButton>
                    </div>

                    {specialities.map((spec: any, index: number) => (

                        <div
                            key={spec.id}
                            data-aos="fade-up"
                            data-aos-delay={150 + index * 50}
                        >
                            <FilterButton
                                active={selectedSpeciality === spec.slug}
                                onClick={() => setSelectedSpeciality(spec.slug)}
                            >
                                {spec.name}
                            </FilterButton>
                        </div>

                    ))}

                </div>


                {/* ================= DOCTORS GRID ================= */}

                <div className="mx-auto">

                    <div className="grid gap-6 md:grid-cols-3">

                        {filteredDoctors.map((doc: any, index: number) => (

                            <div
                                key={doc.id}
                                data-aos="fade-up"
                                data-aos-delay={100 + index * 80}
                            >
                                <DoctorCard
                                    doctor={doc}
                                    onBook={(id) => router.push(`/booking/${id}`)}
                                />
                            </div>

                        ))}

                    </div>

                </div>

            </div>

        </section>

    );

}


/* ================= FILTER BUTTON ================= */

function FilterButton({
    children,
    active,
    onClick,
}: {
    children: React.ReactNode;
    active?: boolean;
    onClick?: () => void;
}) {

    return (

        <button
            onClick={onClick}
            className={`
            rounded-full px-6 py-2 text-sm font-medium
            transition-all duration-300 ease-out
            backdrop-blur
            ${active
                    ? "bg-navy text-white border border-navy shadow-md"
                    : "bg-white/80 text-navy/70 border border-navy/20 hover:border-navy hover:text-navy"
                }
        `}
        >
            {children}
        </button>

    );

}