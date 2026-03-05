"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import api from "@/lib/api";
import InlineRelationManager from "@/components/common/InlineRelationManager";

type TabType = "overview" | "content" | "mini";

export default function AdminSubSpecialityDetail() {
    const { subId } = useParams<{ subId: string }>();
    const router = useRouter();
    const [tab, setTab] = useState<TabType>("overview");

    const { data: sub, isLoading } = useQuery({
        queryKey: ["admin-sub-speciality", subId],
        queryFn: async () => {
            const res = await api.get(`/admin/sub-specialities/${subId}`);
            return res.data;
        },
        enabled: !!subId,
    });

    if (isLoading) {
        return (
            <div className="h-screen flex items-center justify-center text-sm text-navy/60">
                Loading...
            </div>
        );
    }

    if (!sub) {
        return (
            <div className="h-screen flex items-center justify-center text-red-500">
                Not found
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-wellness-bg via-white to-wellness-bg/40">

            <div className="max-w-6xl mx-auto px-8 py-16 space-y-16">

                {/* HEADER */}
                <div className="backdrop-blur-xl bg-white/60 border border-white/40 shadow-xl rounded-3xl px-10 py-10 flex justify-between items-start">

                    <div className="space-y-5">

                        <button
                            onClick={() => router.back()}
                            className="text-sm text-navy/60 hover:text-navy transition"
                        >
                            ← Back
                        </button>

                        <div className="space-y-3">
                            <h1 className="text-4xl font-semibold text-navy-dark tracking-tight">
                                {sub.name}
                            </h1>

                            <div className="flex items-center gap-4">
                                <span className="font-mono bg-white/70 backdrop-blur px-3 py-1 rounded-lg text-xs text-navy/70 border border-gray-100">
                                    /{sub.slug}
                                </span>

                                <ModeBadge hasMini={sub.hasMiniLevel} />
                                <StatusBadge active={sub.isActive} />
                            </div>
                        </div>
                    </div>

                    <Link
                        href={`/admin/sub-specialities/${subId}/edit`}
                        className="px-6 py-3 bg-gradient-to-r from-wellness-accent to-indigo-500 text-white rounded-xl text-sm font-medium shadow-lg hover:scale-[1.03] transition"
                    >
                        Edit
                    </Link>

                </div>

                {/* MAIN CARD */}
                <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/40 overflow-hidden">

                    {/* TABS */}
                    <div className="flex gap-4 px-8 pt-8">

                        {(["overview", "content", "mini"] as TabType[]).map((t) => (
                            <button
                                key={t}
                                onClick={() => setTab(t)}
                                className={`px-6 py-3 rounded-xl text-sm font-medium capitalize transition-all duration-200 ${tab === t
                                    ? "bg-wellness-accent text-white shadow-md"
                                    : "bg-white/50 text-navy/60 hover:bg-white"
                                    }`}
                            >
                                {t}
                            </button>
                        ))}

                    </div>

                    <div className="px-10 py-16">

                        {tab === "overview" && (
                            <OverviewSection sub={sub} />
                        )}

                        {tab === "content" && !sub.hasMiniLevel && (
                            <ContentSection sub={sub} />
                        )}

                        {tab === "mini" && sub.hasMiniLevel && (
                            <MiniSection sub={sub} subId={subId} />
                        )}

                        {sub.hasMiniLevel && tab === "content" && (
                            <EmptyState message="Content is managed inside mini-specialities." />
                        )}

                        {!sub.hasMiniLevel && tab === "mini" && (
                            <EmptyState message="Mini level is disabled for this sub-speciality." />
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}

/* ---------------- COMPONENTS ---------------- */

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

function ModeBadge({ hasMini }: { hasMini: boolean }) {
    return (
        <span
            className={`px-4 py-1.5 rounded-full text-xs font-medium ${hasMini
                ? "bg-indigo-100 text-indigo-700"
                : "bg-gray-100 text-navy/70"
                }`}
        >
            {hasMini ? "Mini Structure" : "Direct Content"}
        </span>
    );
}

function OverviewSection({ sub }: { sub: any }) {
    return (
        <div className="max-w-3xl space-y-6">
            <h3 className="text-xs uppercase tracking-wider font-semibold text-navy/60">
                Description
            </h3>

            <p className="text-navy/80 leading-relaxed text-base">
                {sub.description || "No description provided."}
            </p>
        </div>
    );
}

function ContentSection({ sub }: { sub: any }) {
    return (
        <div className="space-y-14">

            <InlineRelationManager
                title="Symptoms"
                items={sub.subSpecialitySymptoms?.map((s: any) => s.symptom) || []}
                fetchUrl="/settings/symptoms"
                addUrl={`/admin/sub-specialities/${sub.id}/symptoms`}
                removeUrl={`/admin/sub-specialities/${sub.id}/symptoms`}
            />

            <InlineRelationManager
                title="Causes"
                items={sub.subSpecialityCauses?.map((c: any) => c.cause) || []}
                fetchUrl="/settings/causes"
                addUrl={`/admin/sub-specialities/${sub.id}/causes`}
                removeUrl={`/admin/sub-specialities/${sub.id}/causes`}
            />

            <InlineRelationManager
                title="Risk Factors"
                items={sub.subSpecialityRiskFactors?.map((r: any) => r.riskFactor) || []}
                fetchUrl="/settings/risk-factors"
                addUrl={`/admin/sub-specialities/${sub.id}/risk-factors`}
                removeUrl={`/admin/sub-specialities/${sub.id}/risk-factors`}
            />

        </div>
    );
}

function ContentGroup({ title, items }: { title: string; items: any[] }) {
    return (
        <div className="space-y-8">

            <div className="flex justify-between items-center">
                <h3 className="text-xs uppercase tracking-[0.15em] font-semibold text-navy/50">
                    {title}
                </h3>

                <button className="text-sm text-wellness-accent hover:underline font-medium">
                    Manage
                </button>
            </div>

            {items.length === 0 ? (
                <p className="text-sm text-navy/50">
                    No items assigned.
                </p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {items.map((item: any) => (
                        <div
                            key={item.id}
                            className="bg-white border border-gray-100 rounded-2xl px-6 py-5 shadow-sm hover:shadow-md transition"
                        >
                            <p className="text-navy-dark text-sm font-medium">
                                {item.name}
                            </p>
                        </div>
                    ))}
                </div>
            )}

        </div>
    );
}

function MiniSection({ sub, subId }: { sub: any; subId: string }) {
    return (
        <div className="space-y-10">

            <div className="flex justify-end">
                <Link
                    href={`/admin/sub-specialities/${subId}/mini/new`}
                    className="px-6 py-2.5 bg-wellness-accent text-white rounded-xl text-sm font-medium shadow-sm hover:opacity-90 transition"
                >
                    Add Mini
                </Link>
            </div>

            {sub.miniSpecialities.length === 0 ? (
                <EmptyState message="No mini-specialities yet." />
            ) : (
                <div className="divide-y border border-gray-100 rounded-xl bg-white">
                    {sub.miniSpecialities.map((mini: any) => (
                        <Link
                            key={mini.id}
                            href={`/admin/mini-specialities/${mini.id}`}
                            className="block px-8 py-5 hover:bg-wellness-bg/30 transition"
                        >
                            <div className="flex justify-between items-center">
                                <span className="font-medium text-navy-dark">
                                    {mini.name}
                                </span>
                                <span className="text-sm text-navy/60">
                                    Manage →
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}

function EmptyState({ message }: { message: string }) {
    return (
        <div className="text-sm text-navy/60 bg-white/60 backdrop-blur border border-gray-100 rounded-2xl px-10 py-8 text-center shadow-sm">
            {message}
        </div>
    );
}