"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import api from "@/lib/api";

import SubSpecialityOverview from "../Overview";
import SubSpecialitySymptoms from "../Symptoms";
import SubSpecialityCauses from "../Causes";
import SubSpecialityRiskFactors from "../RiskFactors";
import SubSpecialityDoctors from "../AvailableDoctors";

import { FooterQuestions } from "../FooterQuestions";
import { QuickFacts } from "../QuickFacts";

/* ================= TYPE ================= */
type Section = {
    id: string;
    label: string;
};

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

    /* ================= HOOKS (MUST BE BEFORE RETURNS) ================= */

    const [active, setActive] = useState("overview");

    const overview = data?.overview || {};

    const sections: Section[] = data
        ? [
            { id: "overview", label: "Overview" },

            ...(data.symptoms?.length > 0
                ? [{ id: "symptoms", label: "Symptoms" }]
                : []),

            ...(data.causes?.length > 0
                ? [{ id: "causes", label: "Causes" }]
                : []),

            ...(data.riskFactors?.length > 0
                ? [{ id: "risk", label: "Risk Factors" }]
                : []),

            ...(data.quickFacts?.length > 0
                ? [{ id: "quickfacts", label: "Quick Facts" }]
                : []),

            ...(overview.footerQuestions?.length > 0
                ? [{ id: "faqs", label: "FAQs" }]
                : []),

            { id: "doctors", label: "Doctors" },
        ]
        : [];

    /* ================= SCROLL ================= */

    const scrollToSection = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    /* ================= ACTIVE TAB ================= */

    useEffect(() => {
        const handleScroll = () => {
            sections.forEach((section) => {
                const el = document.getElementById(section.id);
                if (!el) return;

                const rect = el.getBoundingClientRect();

                if (rect.top <= 120 && rect.bottom >= 120) {
                    setActive(section.id);
                }
            });
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [sections]);

    /* ================= RETURNS ================= */

    if (isLoading) {
        return (
            <div className="py-32 text-center text-navy/60">
                Loading...
            </div>
        );
    }

    if (!data) return null;

    return (
        <div className="bg-white m-4">

            {/* ================= STICKY NAV ================= */}

            <div className="sticky top-18 z-40 bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex gap-6 overflow-x-auto py-4">

                        {sections.map((section) => (
                            <button
                                key={section.id}
                                onClick={() => scrollToSection(section.id)}
                                className={`
                                    whitespace-nowrap text-sm font-medium transition
                                    ${active === section.id
                                        ? "text-navy-dark border-b-2 border-navy-dark pb-1"
                                        : "text-navy/60 hover:text-navy-dark"}
                                `}
                            >
                                {section.label}
                            </button>
                        ))}

                    </div>
                </div>
            </div>

            {/* ================= OVERVIEW ================= */}

            <div id="overview">
                <SubSpecialityOverview
                    name={data.name}
                    description={data.description}
                    overview={overview}
                />
            </div>

            {/* ================= SYMPTOMS ================= */}

            {data.symptoms?.length > 0 && (
                <div id="symptoms">
                    <SubSpecialitySymptoms symptoms={data.symptoms} />
                </div>
            )}

            {/* ================= CAUSES ================= */}

            {data.causes?.length > 0 && (
                <div id="causes">
                    <SubSpecialityCauses causes={data.causes} />
                </div>
            )}

            {/* ================= RISK ================= */}

            {data.riskFactors?.length > 0 && (
                <div id="risk">
                    <SubSpecialityRiskFactors riskFactors={data.riskFactors} />
                </div>
            )}

            {/* ================= QUICK FACTS ================= */}

            {data.quickFacts?.length > 0 && (
                <div id="quickfacts">
                    <QuickFacts facts={data.quickFacts} />
                </div>
            )}

            {/* ================= FAQ ================= */}

            {overview.footerQuestions?.length > 0 && (
                <div id="faqs">
                    <FooterQuestions questions={overview.footerQuestions} />
                </div>
            )}

            {/* ================= DOCTORS ================= */}

            <div id="doctors">
                <SubSpecialityDoctors
                    subSlug={subSlug as string}
                    miniSlug={miniSlug as string}
                />
            </div>

        </div>
    );
}