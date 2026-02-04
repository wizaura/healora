"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import api from "@/lib/api";
import DoctorCard from "@/components/common/DoctorCard";

const DUMMY_SPECIALITY = {
    id: "sp1",
    name: "Homeopathy",
    description:
        "Natural and holistic treatment focused on long-term healing.",
    subSpecialities: [
        { id: "sub1", name: "General Homeopathy" },
        { id: "sub2", name: "Chronic Care" },
        { id: "sub3", name: "Pediatric Homeopathy" },
    ],
};

const DUMMY_DOCTORS = [
    {
        id: "d1",
        user: { name: "Dr. Ananya Rao" },
        speciality: { name: "Homeopathy" },
        subSpecialities: [{ id: "sub1" }],
        slotFee: "500",
        avatar: "/doctor-placeholder.png",
    },
    {
        id: "d2",
        user: { name: "Dr. Arjun Menon" },
        speciality: { name: "Homeopathy" },
        subSpecialities: [{ id: "sub2" }],
        slotFee: "500",
        avatar: "/doctor-placeholder.png",
    },
    {
        id: "d3",
        user: { name: "Dr. Kavya Nair" },
        speciality: { name: "Homeopathy" },
        subSpecialities: [{ id: "sub3" }],
        slotFee: "500",
        avatar: "/doctor-placeholder.png",
    },
];


export default function DoctorsBySpeciality() {
    const params = useParams();
    const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
    const router = useRouter();

    const [activeSub, setActiveSub] = useState<string | null>(null);

    /* ---------------- Speciality ---------------- */
    const { data: speciality = DUMMY_SPECIALITY, isError: specialityError } = useQuery({
        queryKey: ["speciality", slug],
        queryFn: async () => {
            const res = await api.get(`/specialities/${slug}`);
            console.log(res.data, "gg");
            return res.data;
        },
        retry: false,
    });


    /* ---------------- Doctors ---------------- */
    const { data: doctors = DUMMY_DOCTORS, isLoading, isError: doctorsError } = useQuery({
        queryKey: ["doctors", slug],
        queryFn: async () => {
            const res = await api.get(`/specialities/${slug}/doctors`);
            console.log(res.data);
            return res.data;
        },
        retry: false,
    });



    /* ---------------- Filtered doctors ---------------- */
    const filteredDoctors =
        activeSub === null
            ? []
            : doctors.filter((doc: any) =>
                doc.subSpecialities?.some(
                    (s: any) => s.id === activeSub
                )
            );





    if (isLoading) {
        return (
            <section className="py-24 text-center text-navy/60">
                Loading doctors…
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
                        Doctors
                    </span>

                    <h1 className="text-4xl md:text-6xl font-semibold text-navy-dark">
                        {speciality?.name}
                    </h1>

                    <p className="mx-auto mt-4 max-w-2xl text-navy/70">
                        {speciality?.description ||
                            "Consult verified and experienced doctors in this speciality."}
                    </p>

                    {/* ---------------- Sub-specialities ---------------- */}
                    {speciality?.subSpecialities?.length > 0 && (
                        <div className="mt-8 flex flex-wrap justify-center gap-3">
                            {speciality.subSpecialities.map((sub: any) => (
                                <button
                                    key={sub.id}
                                    onClick={() => setActiveSub(sub.id)}
                                    className={`
                    rounded-full px-5 py-2 text-sm font-medium transition
                    border
                    ${activeSub === sub.id
                                            ? "bg-navy text-white border-navy"
                                            : "bg-white text-navy/70 border-navy/20 hover:border-navy"
                                        }
                  `}
                                >
                                    {sub.name}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {(specialityError || doctorsError) && (
                    <p className="mt-3 text-sm text-navy/50">
                        Showing sample doctors while we reconnect…
                    </p>
                )}

                {/* ================= CONTENT ================= */}
                <div className="mx-auto max-w-5xl">

                    {/* No sub selected */}
                    {activeSub === null && (
                        <div
                            className="
                rounded-3xl bg-white p-12 text-center
                shadow-xl
                text-navy/70
              "
                        >
                            <p className="text-lg font-medium">
                                Select a sub-speciality to view available doctors
                            </p>
                        </div>
                    )}

                    {/* Doctors */}
                    {activeSub !== null && (
                        <div className="grid gap-10 md:grid-cols-2">
                            {filteredDoctors.map((doc: any) => (
                                <DoctorCard
                                    key={doc.id}
                                    doctor={doc}
                                    onBook={(id) => router.push(`/booking/${id}`)}
                                />
                            ))}

                            {/* No doctors */}
                            {filteredDoctors.length === 0 && (
                                <div
                                    className="
                    col-span-full rounded-3xl bg-white p-12
                    text-center text-navy/60 shadow
                  "
                                >
                                    No doctors available for this sub-speciality yet.
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
