"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

import SubSpecialityOverview from "./Overview";
import SubSpecialitySymptoms from "./Symptoms";
import SubSpecialityCauses from "./Causes";
import SubSpecialityRiskFactors from "./RiskFactors";
import SubSpecialityDoctors from "./AvailableDoctors";

import { FooterQuestions } from "./FooterQuestions";
import { QuickFacts } from "./QuickFacts";

import SpecialityCard from "@/components/common/SpecialitiesCard";

export default function SubSpecialityDetailPage() {

    const params = useParams();

    const specialitySlug =
        typeof params.slug === "string" ? params.slug : params.slug?.[0];

    const subSlug =
        typeof params.subSlug === "string" ? params.subSlug : params.subSlug?.[0];

    const { data, isLoading } = useQuery({
        queryKey: ["sub-speciality", subSlug],
        queryFn: async () => {
            const res = await api.get(`/sub-specialities/slug/${subSlug}`);
            return res.data;
        },
        enabled: !!subSlug,
        retry: false,
    });

    if (isLoading) {
        return (
            <div className="py-32 text-center text-navy/60">
                Loading...
            </div>
        );
    }

    if (!data) return null;

    const overview = data.overview || {};

    const hasMiniSpecialities =
        data.hasMiniLevel &&
        Array.isArray(data.miniSpecialities) &&
        data.miniSpecialities.length > 0;

    return (
        <div className="bg-white m-4">

            {/* HEADER / OVERVIEW */}

            <SubSpecialityOverview
                name={data.name}
                description={data.description}
                overview={overview}
            />


            {/* MINI SPECIALITIES */}

            {hasMiniSpecialities && (

                <section className="py-12 bg-gradient-to-b from-white to-wellness-bg rounded-2xl">

                    <div className="max-w-6xl mx-auto px-6 text-center">

                        <h2 className="text-3xl font-semibold text-navy-dark mb-4">
                            Conditions Under {data.name}
                        </h2>

                        <p className="max-w-2xl mx-auto text-navy/70 mb-12">
                            Explore specific conditions and related treatments under this speciality.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                            {data.miniSpecialities.map((mini: any) => (

                                <SpecialityCard
                                    key={mini.id}
                                    name={mini.name}
                                    description={mini.description}
                                    imageUrl={mini.overview?.images?.image1?.url}
                                    slug={`${specialitySlug}/${subSlug}/${mini.slug}`}
                                />

                            ))}

                        </div>

                    </div>

                </section>

            )}


            {!data.hasMiniLevel && (
                <>
                    {/* SYMPTOMS */}

                    {data.symptoms?.length > 0 && (
                        <SubSpecialitySymptoms symptoms={data.symptoms} />
                    )}


                    {/* CAUSES */}

                    {data.causes?.length > 0 && (
                        <SubSpecialityCauses causes={data.causes} />
                    )}


                    {/* RISK FACTORS */}

                    {data.riskFactors?.length > 0 && (
                        <SubSpecialityRiskFactors riskFactors={data.riskFactors} />
                    )}
                </>
            )}


            {/* FOOTER QUESTIONS */}

            {overview.footerQuestions?.length > 0 && (
                <FooterQuestions
                    questions={overview.footerQuestions}
                />
            )}


            {/* QUICK FACTS */}

            {data.quickFacts?.length > 0 && (
                <QuickFacts facts={data.quickFacts} />
            )}


            {/* AVAILABLE DOCTORS */}

            <SubSpecialityDoctors subSlug={subSlug as string} />

        </div>
    );
}