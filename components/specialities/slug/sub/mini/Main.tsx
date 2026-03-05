"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

import SubSpecialityOverview from "../Overview";
import SubSpecialitySymptoms from "../Symptoms";
import SubSpecialityCauses from "../Causes";
import SubSpecialityRiskFactors from "../RiskFactors";
import SubSpecialityDoctors from "../AvailableDoctors";

export default function MiniSpeciality() {
    const params = useParams();

    const subSlug = Array.isArray(params.subSlug)
        ? params.subSlug[0]
        : params.subSlug;

    const miniSlug = Array.isArray(params.miniSlug)
        ? params.miniSlug[0]
        : params.miniSlug;

    const { data } = useQuery({
        queryKey: ["mini-speciality", subSlug, miniSlug],
        queryFn: async () => {
            const res = await api.get(
                `/mini-specialities/mini/${miniSlug}`
            );
            return res.data;
        },
        enabled: !!subSlug && !!miniSlug,
        retry: false,
    });

    if (!data) return null;

    return (
        <div className="bg-white">
            <SubSpecialityOverview
                name={data.name}
                overview={data.overview}
            />

            <SubSpecialitySymptoms symptoms={data.symptoms} />

            <SubSpecialityCauses causes={data.causes} />

            <SubSpecialityRiskFactors
                riskFactors={data.riskFactors}
            />

            <SubSpecialityDoctors
                subSlug={miniSlug as string}
            />
        </div>
    );
}