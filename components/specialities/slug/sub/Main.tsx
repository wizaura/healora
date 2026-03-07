"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

import SubSpecialityOverview from "./Overview";
import SubSpecialitySymptoms from "./Symptoms";
import SubSpecialityCauses from "./Causes";
import SubSpecialityRiskFactors from "./RiskFactors";
import SubSpecialityDoctors from "./AvailableDoctors";
import SpecialityCard from "@/components/common/SpecialitiesCard";

import { Activity } from "lucide-react";

export default function SubSpecialityDetailPage() {

    const params = useParams();

    const specialitySlug = Array.isArray(params.slug)
        ? params.slug[0]
        : params.slug;

    const subSlug = Array.isArray(params.subSlug)
        ? params.subSlug[0]
        : params.subSlug;

    const { data } = useQuery({
        queryKey: ["sub-speciality", subSlug],
        queryFn: async () => {
            const res = await api.get(`/sub-specialities/slug/${subSlug}`);
            return res.data;
        },
        retry: false,
    });

    if (!data) return null;

    const hasMiniSpecialities =
        data.miniSpecialities && data.miniSpecialities.length > 0;

    return (
        <div className="bg-white">

            {/* MINI SPECIALITIES */}

            {hasMiniSpecialities ? (

                <section className="py-24 bg-gradient-to-b from-white to-wellness-bg">

                    <div className="max-w-6xl mx-auto px-6 text-center">

                        <h1 className="text-4xl font-semibold text-navy-dark mb-6">
                            {data.name}
                        </h1>

                        <p className="max-w-2xl mx-auto text-navy/70 mb-16">
                            Explore specific conditions under {data.name}.
                        </p>

                        <div className="flex flex-col gap-8 items-center">

                            {data.miniSpecialities.map((mini: any) => (

                                <SpecialityCard
                                    key={mini.id}
                                    name={mini.name}
                                    description={mini.overview?.summary || ""}
                                    icon={Activity}
                                    slug={`${specialitySlug}/${subSlug}/${mini.slug}`}
                                />

                            ))}

                        </div>

                    </div>

                </section>

            ) : (

                <>
                    <SubSpecialityOverview
                        name={data.name}
                        overview={data.overview || {}}
                        quickFacts={data.quickFacts || []}
                    />

                    <SubSpecialitySymptoms symptoms={data.symptoms} />

                    <SubSpecialityCauses causes={data.causes} />

                    <SubSpecialityRiskFactors riskFactors={data.riskFactors} />

                    <SubSpecialityDoctors subSlug={subSlug as string} />
                </>
            )}

        </div>
    );
}