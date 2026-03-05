"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import api from "@/lib/api";
import SpecialityCard from "../../common/SpecialitiesCard";
import { Activity } from "lucide-react";

const DUMMY_SPECIALITY = {
    id: "sp1",
    name: "Homeopathy",
    description:
        "Natural and holistic treatment focused on long-term healing.",
    subSpecialities: [
        { id: "sub1", name: "General Homeopathy", slug: "general-homeopathy" },
        { id: "sub2", name: "Chronic Care", slug: "chronic-care" },
        { id: "sub3", name: "Pediatric Homeopathy", slug: "pediatric-homeopathy" },
    ],
};

export default function SubSpecialitiesPage() {
    const params = useParams();
    const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;

    const { data: speciality = DUMMY_SPECIALITY, isError } = useQuery({
        queryKey: ["speciality", slug],
        queryFn: async () => {
            const res = await api.get(`/specialities/${slug}`);
            return res.data;
        },
        retry: false,
    });

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
                        Speciality
                    </span>

                    <h1 className="text-4xl md:text-6xl font-semibold text-navy-dark">
                        {speciality?.name}
                    </h1>

                    <p className="mx-auto mt-4 max-w-2xl text-navy/70">
                        {speciality?.description ||
                            "Explore available sub-specialities under this field."}
                    </p>

                    {isError && (
                        <p className="mt-4 text-sm text-navy/50">
                            Showing sample data while we reconnect…
                        </p>
                    )}
                </div>

                {/* ================= SUB SPECIALITIES ================= */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">

                    {speciality?.subSpecialities?.map((sub: any) => (
                        <SpecialityCard
                            key={sub.id}
                            name={sub.name}
                            description={sub.description}
                            icon={Activity}
                            slug={`${slug}/${sub.slug || sub.id}`}
                        />
                    ))}

                    {speciality?.subSpecialities?.length === 0 && (
                        <div className="text-center text-navy/60">
                            No sub-specialities available yet.
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}