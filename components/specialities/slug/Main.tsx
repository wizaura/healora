"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import api from "@/lib/api";

import SpecialityCard from "../../common/SpecialitiesCard";

import SpecialityOverview from "../slug/sub/Overview";
import { QuickFacts } from "../slug/sub/QuickFacts";
import { FooterQuestions } from "../slug/sub/FooterQuestions";
import { useEffect, useState } from "react";

const DUMMY_SPECIALITY = {
    id: "sp1",
    name: "Homeopathy",
    description:
        "Natural and holistic treatment focused on long-term healing.",
    overview: {},
    quickFacts: [],
    subSpecialities: [
        { id: "sub1", name: "General Homeopathy", slug: "general-homeopathy" },
        { id: "sub2", name: "Chronic Care", slug: "chronic-care" },
        { id: "sub3", name: "Pediatric Homeopathy", slug: "pediatric-homeopathy" },
    ],
};

export default function SpecialityPage() {

    const sections = [
        { id: "overview", label: "Overview" },
        { id: "treatments", label: "Treatments" },
        { id: "quickfacts", label: "Quick Facts" },
        { id: "faqs", label: "FAQs" },
    ];

    const scrollToSection = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    const [active, setActive] = useState("overview");

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
    }, []);

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

    const overview = speciality?.overview || {};

    return (
        <div className="bg-white m-4">

            <div className="sticky top-18 z-40 bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex gap-6 overflow-x-auto py-4 scrollbar-hide">

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

            {/* OVERVIEW */}
            <div id="overview">
                <SpecialityOverview
                    name={speciality.name}
                    description={speciality.description}
                    overview={overview}
                />
            </div>


            {/* ================= SUB SPECIALITIES ================= */}

            <section
                id="treatments"
                className="
                relative rounded-3xl
                bg-white
                py-12
                "
            >
                <div className="mx-auto max-w-7xl px-6">

                    <div className="mb-16 text-center">

                        <h2 className="text-3xl md:text-4xl font-semibold text-navy-dark">
                            Areas of Treatment
                        </h2>

                        <p className="mx-auto mt-4 max-w-2xl text-navy/70">
                            Explore specialised treatment areas under {speciality.name}.
                        </p>

                        {isError && (
                            <p className="mt-4 text-sm text-navy/50">
                                Showing sample data while we reconnect…
                            </p>
                        )}

                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                        {speciality?.subSpecialities?.map((sub: any) => (
                            <SpecialityCard
                                key={sub.id}
                                name={sub.name}
                                description={sub.description}
                                imageUrl={sub.overview?.images?.image1?.url}
                                slug={`${slug}/${sub.slug || sub.id}`}
                            />
                        ))}

                        {speciality?.subSpecialities?.length === 0 && (
                            <div className="col-span-full text-center text-navy/60">
                                No sub-specialities available yet.
                            </div>
                        )}

                    </div>

                </div>
            </section>

            {/* FOOTER QUESTIONS */}

            {overview?.footerQuestions?.length > 0 && (
                <div id="faqs">
                    <FooterQuestions questions={overview.footerQuestions} />
                </div>
            )}

            {/* QUICK FACTS */}

            {speciality?.quickFacts?.length > 0 && (
                <div id="quickfacts">
                    <QuickFacts facts={speciality.quickFacts} />
                </div>
            )}
        </div>
    );
}