"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import api from "@/lib/api";
import DoctorCard from "@/components/common/DoctorCard";

export default function AllDoctors() {

    const router = useRouter();

    const [selectedSpeciality, setSelectedSpeciality] = useState<string>("homeopathy");

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
            bg-gradient-to-b from-white via-white to-wellness-bg
            py-24
        "
        >

            <div className="mx-auto max-w-7xl px-6">

                {/* ================= HEADER ================= */}

                <div className="mb-20 text-center">

                    <h1 className="text-4xl md:text-6xl font-semibold text-navy-dark">
                        Find the Right Doctor
                    </h1>

                    <p className="mx-auto mt-6 max-w-2xl text-lg text-navy/70 leading-relaxed">
                        Connect with experienced and verified healthcare professionals
                        across multiple specialities. Whether you need holistic
                        homeopathic care, nutritional guidance, counselling support,
                        or wellness consultations — Healora helps you find the right
                        doctor for your needs.
                    </p>

                </div>


                {/* ================= FILTER ================= */}

                <div className="mb-16 flex flex-wrap justify-center gap-3">

                    <FilterButton
                        active={selectedSpeciality === "all"}
                        onClick={() => setSelectedSpeciality("all")}
                    >
                        All
                    </FilterButton>

                    {specialities.map((spec: any) => (

                        <FilterButton
                            key={spec.id}
                            active={selectedSpeciality === spec.slug}
                            onClick={() => setSelectedSpeciality(spec.slug)}
                        >
                            {spec.name}
                        </FilterButton>

                    ))}

                </div>


                {/* ================= DOCTORS GRID ================= */}

                <div className="mx-auto max-w-5xl">

                    <div className="grid gap-10 md:grid-cols-2">

                        {filteredDoctors.map((doc: any) => (

                            <DoctorCard
                                key={doc.id}
                                doctor={doc}
                                onBook={(id) => router.push(`/booking/${id}`)}
                            />

                        ))}

                        {filteredDoctors.length === 0 && (

                            <div
                                className="
                                col-span-full rounded-3xl bg-white p-12
                                text-center text-navy/60 shadow
                            "
                            >
                                No doctors available for this speciality.
                            </div>

                        )}

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