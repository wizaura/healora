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
        <div className="min-h-screen bg-wellness-bg py-20">
            <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">

                {/* HEADER */}
                <div className="p-12 border-b border-gray-100 space-y-6">

                    <div className="flex justify-between items-start">
                        <div>
                            <button
                                onClick={() => router.back()}
                                className="text-sm text-navy/60 hover:text-navy"
                            >
                                ← Back
                            </button>

                            <h1 className="text-3xl font-semibold text-navy-dark mt-3">
                                {mini.name}
                            </h1>

                            <p className="text-sm text-navy/60 font-mono">
                                /{mini.slug}
                            </p>
                        </div>

                        <StatusBadge active={mini.isActive} />
                    </div>

                    {/* ACTIONS */}
                    <div className="flex gap-4 flex-wrap">
                        <Link
                            href={`/admin/mini-specialities/${miniId}/edit`}
                            className="px-6 py-2.5 bg-wellness-accent text-white rounded-xl text-sm font-medium"
                        >
                            Edit
                        </Link>

                        <button
                            onClick={() => toggleMutation.mutate()}
                            className="px-6 py-2.5 border border-gray-200 rounded-xl text-sm"
                        >
                            {mini.isActive ? "Deactivate" : "Activate"}
                        </button>

                        <button
                            onClick={() => {
                                if (confirm("Delete this mini-speciality?")) {
                                    deleteMutation.mutate();
                                }
                            }}
                            className="px-6 py-2.5 bg-red-500 text-white rounded-xl text-sm"
                        >
                            Delete
                        </button>
                    </div>

                </div>

                {/* TABS */}
                <div className="flex gap-6 px-10 pt-6 border-b border-gray-100 text-sm font-medium">
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

                {/* TAB CONTENT */}
                <div className="p-10 space-y-10">

                    {tab === "overview" && (
                        <OverviewSection mini={mini} />
                    )}

                    {tab === "symptoms" && (
                        <RelationSection
                            title="Symptoms"
                            items={mini.miniSpecialitySymptoms?.map((s: any) => s.symptom)}
                            fetchUrl="/settings/symptoms"
                            addUrl={`/admin/mini-specialities/${miniId}/symptoms`}
                            removeUrl={`/admin/mini-specialities/${miniId}/symptoms`}
                            refetchMini={refetch}
                        />
                    )}

                    {tab === "causes" && (
                        <RelationSection
                            title="Causes"
                            items={mini.miniSpecialityCauses?.map((c: any) => c.cause)}
                            fetchUrl="/settings/causes"
                            addUrl={`/admin/mini-specialities/${miniId}/causes`}
                            removeUrl={`/admin/mini-specialities/${miniId}/causes`}
                            refetchMini={refetch}
                        />
                    )}

                    {tab === "risk" && (
                        <RelationSection
                            title="Risk Factors"
                            items={mini.miniSpecialityRiskFactors?.map((r: any) => r.riskFactor)}
                            fetchUrl="/settings/risk-factors"
                            addUrl={`/admin/mini-specialities/${miniId}/risk-factors`}
                            removeUrl={`/admin/mini-specialities/${miniId}/risk-factors`}
                            refetchMini={refetch}
                        />
                    )}

                </div>
            </div>
        </div>
    );
}

/* ---------------- COMPONENTS ---------------- */

function OverviewSection({ mini }: any) {
    return (
        <div>
            <h3 className="text-xs uppercase tracking-wider text-navy/50 font-semibold mb-3">
                Description
            </h3>
            <p className="text-navy/80 text-sm">
                {mini.description || "No description provided."}
            </p>
        </div>
    );
}

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