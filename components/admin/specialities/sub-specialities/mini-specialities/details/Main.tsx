"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import Link from "next/link";
import api from "@/lib/api";
import RelationSection from "@/components/common/RelationManager";

type TabType = "overview" | "symptoms" | "causes" | "risk";

export default function ManageMiniPage() {
    const { miniId } = useParams<{ miniId: string }>();
    const router = useRouter();
    const [tab, setTab] = useState<TabType>("overview");

    const { data: mini, isLoading, refetch } = useQuery({
        queryKey: ["admin-mini", miniId],
        queryFn: async () => {
            const res = await api.get(`/admin/mini-specialities/${miniId}`);
            return res.data;
        },
        enabled: !!miniId,
    });

    const toggleMutation = useMutation({
        mutationFn: async () => {
            await api.patch(`/admin/mini-specialities/${miniId}/status`, {
                isActive: !mini.isActive,
            });
        },
        onSuccess: () => refetch(),
    });

    const deleteMutation = useMutation({
        mutationFn: async () => {
            await api.delete(`/admin/mini-specialities/${miniId}`);
        },
        onSuccess: () => {
            router.push(`/admin/sub-specialities/${mini.subSpecialityId}`);
        },
    });

    if (isLoading) {
        return (
            <div className="h-screen flex items-center justify-center text-sm text-navy/60">
                Loading...
            </div>
        );
    }

    if (!mini) {
        return (
            <div className="h-screen flex items-center justify-center text-red-500">
                Mini not found
            </div>
        );
    }

    return (
        <div className="py-16">

            {/* HEADER */}

            <div className="max-w-6xl mx-auto px-6 mb-10">

                <button
                    onClick={() => router.back()}
                    className="text-sm text-navy/60 hover:text-navy"
                >
                    ← Back
                </button>

                <div className="flex justify-between items-start mt-4">

                    <div>
                        <h1 className="text-3xl font-semibold text-navy-dark">
                            {mini.name}
                        </h1>

                        <p className="text-sm text-navy/60 font-mono mt-1">
                            /{mini.slug}
                        </p>
                    </div>

                    <StatusBadge active={mini.isActive} />

                </div>

                {/* ACTIONS */}

                <div className="flex gap-4 flex-wrap mt-6">

                    <Link
                        href={`/admin/mini-specialities/${miniId}/edit`}
                        className="px-5 py-2.5 bg-wellness-accent text-white rounded-lg text-sm font-medium"
                    >
                        Edit
                    </Link>

                    <button
                        onClick={() => toggleMutation.mutate()}
                        className="px-5 py-2.5 border border-gray-200 rounded-lg text-sm"
                    >
                        {mini.isActive ? "Deactivate" : "Activate"}
                    </button>

                    <button
                        onClick={() => {
                            if (confirm("Delete this mini-speciality?")) {
                                deleteMutation.mutate();
                            }
                        }}
                        className="px-5 py-2.5 bg-red-500 text-white rounded-lg text-sm"
                    >
                        Delete
                    </button>

                </div>

            </div>

            {/* TABS */}

            <div className="max-w-6xl mx-auto px-6 border-b border-gray-100 flex gap-8 text-sm font-medium">

                {["overview", "symptoms", "causes", "risk"].map((t) => (

                    <button
                        key={t}
                        onClick={() => setTab(t as TabType)}
                        className={`pb-4 capitalize transition ${tab === t
                            ? "text-navy-dark border-b-2 border-wellness-accent"
                            : "text-navy/60 hover:text-navy"
                            }`}
                    >
                        {t === "risk" ? "Risk Factors" : t}
                    </button>

                ))}

            </div>

            {/* CONTENT */}

            <div className="max-w-6xl mx-auto px-6 py-10 space-y-12">

                {tab === "overview" && (
                    <OverviewSection mini={mini} />
                )}

                {tab === "symptoms" && (
                    <RelationSection
                        title="Symptoms"
                        items={mini.miniSpecialitySymptoms}
                        fetchUrl="/settings/symptoms"
                        addUrl={`/admin/mini-specialities/${miniId}/symptoms`}
                        removeUrl={`/admin/mini-specialities/${miniId}/symptoms`}
                        descriptionUrl={`/admin/mini-specialities/${miniId}/symptoms`}
                        refetchMini={refetch}
                    />
                )}

                {tab === "causes" && (
                    <RelationSection
                        title="Causes"
                        items={mini.miniSpecialityCauses}
                        fetchUrl="/settings/causes"
                        addUrl={`/admin/mini-specialities/${miniId}/causes`}
                        removeUrl={`/admin/mini-specialities/${miniId}/causes`}
                        descriptionUrl={`/admin/mini-specialities/${miniId}/causes`}
                        refetchMini={refetch}
                    />
                )}

                {tab === "risk" && (
                    <RelationSection
                        title="Risk Factors"
                        items={mini.miniSpecialityRiskFactors}
                        fetchUrl="/settings/risk-factors"
                        addUrl={`/admin/mini-specialities/${miniId}/risk-factors`}
                        removeUrl={`/admin/mini-specialities/${miniId}/risk-factors`}
                        descriptionUrl={`/admin/mini-specialities/${miniId}/risk-factors`}
                        refetchMini={refetch}
                    />
                )}

            </div>

        </div>
    );
}

/* ---------------- OVERVIEW ---------------- */

function OverviewSection({ mini }: any) {
    return (
        <div className="space-y-10">

            <OverviewBlock title="Summary" value={mini.overview?.summary} />

            <OverviewBlock title="What is it?" value={mini.overview?.whatIsIt} />

            <OverviewBlock
                title="Who is affected?"
                value={mini.overview?.whoIsAffected}
            />

            <OverviewBlock
                title="When to see a doctor?"
                value={mini.overview?.whenToSeeDoctor}
            />

            {mini.quickFacts?.length > 0 && (
                <div>

                    <h3 className="text-sm font-semibold text-navy-dark mb-4">
                        Quick Facts
                    </h3>

                    <ul className="space-y-2 text-sm text-navy/80 list-disc pl-5">
                        {mini.quickFacts.map((fact: string, i: number) => (
                            <li key={i}>{fact}</li>
                        ))}
                    </ul>

                </div>
            )}

        </div>
    );
}

function OverviewBlock({ title, value }: any) {
    return (
        <div>
            <h3 className="text-sm font-semibold text-navy-dark mb-2">
                {title}
            </h3>

            <p className="text-sm text-navy/80 leading-relaxed">
                {value || "Not provided"}
            </p>
        </div>
    );
}

/* ---------------- STATUS BADGE ---------------- */

function StatusBadge({ active }: { active: boolean }) {
    return (
        <span
            className={`px-4 py-1.5 rounded-full text-xs font-medium ${active
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-600"
                }`}
        >
            {active ? "Active" : "Inactive"}
        </span>
    );
}