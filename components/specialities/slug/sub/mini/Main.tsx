"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

import SubSpecialityOverview from "../Overview";
import SubSpecialitySymptoms from "../Symptoms";
import SubSpecialityCauses from "../Causes";
import SubSpecialityRiskFactors from "../RiskFactors";
import SubSpecialityDoctors from "../AvailableDoctors";

import { FooterQuestions } from "../FooterQuestions";
import { QuickFacts } from "../QuickFacts";

export default function MiniSpeciality() {

    const params = useParams();

    const subSlug =
        typeof params.subSlug === "string"
            ? params.subSlug
            : params.subSlug?.[0];

    const miniSlug =
        typeof params.miniSlug === "string"
            ? params.miniSlug
            : params.miniSlug?.[0];

    const { data, isLoading } = useQuery({
        queryKey: ["mini-speciality", miniSlug],
        queryFn: async () => {
            const res = await api.get(`/mini-specialities/mini/${miniSlug}`);
            return res.data;
        },
        enabled: !!miniSlug,
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

    return (
        <div className="bg-white">

            {/* HEADER + HEADER QUESTIONS */}

            <SubSpecialityOverview
                name={data.name}
                description={data.description}
                overview={overview}
            />

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
                <SubSpecialityRiskFactors
                    riskFactors={data.riskFactors}
                />
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

            {/* DOCTORS */}

            <SubSpecialityDoctors
                subSlug={subSlug as string}
                miniSlug={miniSlug as string}
            />

        </div>
    );
}