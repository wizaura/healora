"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import api from "@/lib/api";
import DoctorCard from "@/components/common/DoctorCard";

export default function AllDoctors() {
    const router = useRouter();
    const [selectedSpeciality, setSelectedSpeciality] = useState<string>("all");

    const { data: doctors = [], isLoading } = useQuery({
        queryKey: ["all-doctors"],
        queryFn: () => api.get("/doctor").then((res) => res.data),
    });

    const specialities = useMemo(() => {
        const map = new Map<string, { id: string; name: string }>();

        doctors.forEach((d: any) => {
            if (d.speciality?.id) {
                map.set(d.speciality.id, d.speciality);
            }
        });

        return Array.from(map.values());
    }, [doctors]);


    const filteredDoctors = useMemo(() => {
        if (selectedSpeciality === "all") return doctors;

        return doctors.filter(
            (d: any) => d.speciality?.id === selectedSpeciality
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
                    <span
                        className="
            inline-block mb-6 rounded-full
            border border-navy/10
            bg-white/80 backdrop-blur
            px-8 py-2
            text-sm font-medium text-navy/70
          "
                    >
                        Healora Doctors
                    </span>

                    <h1 className="text-4xl md:text-6xl font-semibold text-navy-dark">
                        Find the Right Doctor
                    </h1>

                    <p className="mx-auto mt-4 max-w-2xl text-navy/70">
                        Consult verified and experienced doctors across multiple
                        specialities — anytime, anywhere.
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

                    {specialities.map((spec) => (
                        <FilterButton
                            key={spec.id}
                            active={selectedSpeciality === spec.id}
                            onClick={() => setSelectedSpeciality(spec.id)}
                        >
                            {spec.name}
                        </FilterButton>
                    ))}
                </div>

                {/* ================= CONTENT ================= */}
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
                                No doctors found for this speciality.
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
