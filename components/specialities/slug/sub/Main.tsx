"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import api from "@/lib/api";

import SubSpecialityOverview from "./Overview";
import SubSpecialitySymptoms from "./Symptoms";
import SubSpecialityCauses from "./Causes";
import SubSpecialityRiskFactors from "./RiskFactors";
import SubSpecialityDoctors from "./AvailableDoctors";

import { FooterQuestions } from "./FooterQuestions";
import { QuickFacts } from "./QuickFacts";

import SpecialityCard from "@/components/common/SpecialitiesCard";

type Section = {
    id: string;
    label: string;
};

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

    const [active, setActive] = useState("overview");

    /* ================= DYNAMIC SECTIONS ================= */

    const sections: Section[] = [];

    sections.push({ id: "overview", label: "Overview" });

    if (data?.hasMiniLevel && data?.miniSpecialities?.length > 0) {
        sections.push({ id: "conditions", label: "Conditions" });
    }

    if (!data?.hasMiniLevel) {
        if (data?.symptoms?.length > 0)
            sections.push({ id: "symptoms", label: "Symptoms" });

        if (data?.causes?.length > 0)
            sections.push({ id: "causes", label: "Causes" });

        if (data?.riskFactors?.length > 0)
            sections.push({ id: "risk", label: "Risk Factors" });
    }

    if (data?.quickFacts?.length > 0)
        sections.push({ id: "quickfacts", label: "Quick Facts" });

    if (data?.overview?.footerQuestions?.length > 0)
        sections.push({ id: "faqs", label: "FAQs" });

    sections.push({ id: "doctors", label: "Doctors" });

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

            {/* ================= MINI SPECIALITIES ================= */}

            {hasMiniSpecialities && (
                <section id="conditions" className="py-12 bg-gradient-to-b from-white to-wellness-bg rounded-2xl">

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

            {/* ================= NON-MINI FLOW ================= */}

            {!data.hasMiniLevel && (
                <>
                    {data.symptoms?.length > 0 && (
                        <div id="symptoms">
                            <SubSpecialitySymptoms symptoms={data.symptoms} />
                        </div>
                    )}

                    {data.causes?.length > 0 && (
                        <div id="causes">
                            <SubSpecialityCauses causes={data.causes} />
                        </div>
                    )}

                    {data.riskFactors?.length > 0 && (
                        <div id="risk">
                            <SubSpecialityRiskFactors riskFactors={data.riskFactors} />
                        </div>
                    )}
                </>
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
                <SubSpecialityDoctors subSlug={subSlug as string} />
            </div>

        </div>
    );
}