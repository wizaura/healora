"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import Link from "next/link";
import api from "@/lib/api";
import RelationSection from "@/components/common/RelationManager";
import { refresh } from "next/cache";

type TabType = "overview" | "symptoms" | "causes" | "risk" | "mini";

export default function ManageSubSpecialityPage() {

    const { subId } = useParams<{ subId: string }>();
    const router = useRouter();
    const [tab, setTab] = useState<TabType>("overview");

    const { data: sub, isLoading, refetch } = useQuery({
        queryKey: ["admin-sub-speciality", subId],
        queryFn: async () => {
            const res = await api.get(`/admin/sub-specialities/${subId}`);
            return res.data;
        },
        enabled: !!subId,
    });

    const toggleMutation = useMutation({
        mutationFn: async () => {
            await api.patch(`/admin/sub-specialities/${subId}/status`, {
                isActive: !sub.isActive,
            });
        },
        onSuccess: () => refetch(),
    });

    const deleteMutation = useMutation({
        mutationFn: async () => {
            await api.delete(`/admin/sub-specialities/${subId}`);
        },
        onSuccess: () => {
            router.push(`/admin/specialities/${sub.specialityId}`);
        },
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

    const tabs: TabType[] = sub.hasMiniLevel
        ? ["overview", "mini"]
        : ["overview", "symptoms", "causes", "risk"];

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
                            {sub.name}
                        </h1>

                        <div className="flex items-center gap-3 mt-1">

                            <span className="text-sm text-navy/60 font-mono">
                                /{sub.slug}
                            </span>

                            <ModeBadge hasMini={sub.hasMiniLevel} />

                        </div>

                    </div>

                    <StatusBadge active={sub.isActive} />

                </div>

                {/* ACTIONS */}

                <div className="flex gap-4 flex-wrap mt-6">

                    <Link
                        href={`/admin/sub-specialities/${subId}/edit`}
                        className="px-5 py-2.5 bg-wellness-accent text-white rounded-lg text-sm font-medium"
                    >
                        Edit
                    </Link>

                    <button
                        onClick={() => toggleMutation.mutate()}
                        className="px-5 py-2.5 border border-gray-200 rounded-lg text-sm"
                    >
                        {sub.isActive ? "Deactivate" : "Activate"}
                    </button>

                    <button
                        onClick={() => {
                            if (confirm("Delete this sub-speciality?")) {
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

                {tabs.map((t) => (

                    <button
                        key={t}
                        onClick={() => setTab(t as TabType)}
                        className={`pb-4 capitalize transition ${tab === t
                            ? "text-navy-dark border-b-2 border-wellness-accent"
                            : "text-navy/60 hover:text-navy"
                            }`}
                    >
                        {t === "risk"
                            ? "Risk Factors"
                            : t}
                    </button>

                ))}

            </div>

            {/* CONTENT */}

            <div className="max-w-6xl mx-auto px-6 py-10 space-y-12">

                {tab === "overview" && (
                    <OverviewSection sub={sub} />
                )}

                {tab === "symptoms" && (
                    <RelationSection
                        title="Symptoms"
                        items={sub.subSpecialitySymptoms}
                        fetchUrl="/settings/symptoms"
                        addUrl={`/admin/sub-specialities/${subId}/symptoms`}
                        removeUrl={`/admin/sub-specialities/${subId}/symptoms`}
                        descriptionUrl={`/admin/sub-specialities/${subId}/symptoms`}
                        refetchMini={refetch}
                    />
                )}

                {tab === "causes" && (
                    <RelationSection
                        title="Causes"
                        items={sub.subSpecialityCauses}
                        fetchUrl="/settings/causes"
                        addUrl={`/admin/sub-specialities/${subId}/causes`}
                        removeUrl={`/admin/sub-specialities/${subId}/causes`}
                        descriptionUrl={`/admin/sub-specialities/${subId}/causes`}
                        refetchMini={refetch}
                    />
                )}

                {tab === "risk" && (
                    <RelationSection
                        title="Risk Factors"
                        items={sub.subSpecialityRiskFactors}
                        fetchUrl="/settings/risk-factors"
                        addUrl={`/admin/sub-specialities/${subId}/risk-factors`}
                        removeUrl={`/admin/sub-specialities/${subId}/risk-factors`}
                        descriptionUrl={`/admin/sub-specialities/${subId}/risk-factors`}
                        refetchMini={refetch}
                    />
                )}

                {tab === "mini" && (
                    sub.hasMiniLevel ? (
                        <MiniSection sub={sub} subId={subId} refetch={refetch} />
                    ) : (
                        <EmptyState message="Mini level is disabled for this sub-speciality." />
                    )
                )}

            </div>

        </div>
    );
}

/* ---------------- OVERVIEW ---------------- */

function OverviewSection({ sub }: any) {

    const overview = sub.overview ?? {};

    return (
        <div className="space-y-12">

            {/* MAIN DESCRIPTION */}

            {overview.mainDescription && (
                <div className="text-sm text-navy/80 leading-relaxed">
                    {overview.mainDescription}
                </div>
            )}

            {/* IMAGE 1 */}

            <div className="flex flex-row gap-4">
                {overview.images?.image1?.url && (
                    <img
                        src={overview.images.image1.url}
                        className="w-24 h-24 rounded-xl border border-gray-100"
                        alt="Sub speciality"
                    />
                )}

                {overview.images?.image2 && (
                    <img
                        src={`${overview.images.image2.url}`}
                        className="w-24 h-24 rounded-xl border border-gray-100"
                    />
                )}
            </div>

            {/* HEADER MAIN QUESTION */}

            {overview.headerMain && (
                <OverviewBlock
                    title={overview.headerMain.question}
                    value={overview.headerMain.answer}
                />
            )}

            {/* HEADER SECONDARY QUESTIONS */}

            {overview.headerSecondary?.length > 0 && (
                <div className="space-y-8">

                    {overview.headerSecondary.map((item: any, i: number) => (
                        <OverviewBlock
                            key={i}
                            title={item.question}
                            value={item.answer}
                        />
                    ))}

                </div>
            )}

            {/* QUICK FACTS */}

            {sub.quickFacts?.length > 0 && (
                <div>
                    <h3 className="text-sm font-semibold text-navy-dark mb-4">
                        Quick Facts
                    </h3>

                    <ul className="space-y-2 text-sm text-navy/80 list-disc pl-5">
                        {sub.quickFacts.map((fact: any, i: number) => (
                            <li key={i}>
                                {typeof fact === "string" ? fact : fact.value}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* FOOTER QUESTIONS */}

            {overview.footerQuestions?.length > 0 && (
                <div className="space-y-8">

                    {overview.footerQuestions.map((item: any, i: number) => (
                        <OverviewBlock
                            key={i}
                            title={item.question}
                            value={item.answer}
                        />
                    ))}

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

/* ---------------- MINI SECTION ---------------- */

function MiniSection({ sub, subId, refetch }: any) {

    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);

    const createMini = async () => {

        if (!name.trim()) return;

        try {

            setLoading(true);

            await api.post(`/admin/mini-specialities`, {
                name,
                subSpecialityId: subId
            });

            setName("");
            refetch();

        } finally {
            setLoading(false);
        }

    };

    return (
        <div className="space-y-8">

            {/* HEADER */}

            <div className="flex justify-between items-center">

                <div>
                    <h3 className="text-lg font-semibold text-navy-dark">
                        Mini Specialities
                    </h3>

                    <p className="text-sm text-navy/60">
                        Manage mini-level conditions for this sub-speciality.
                    </p>
                </div>

            </div>

            {/* ADD MINI */}

            <div className="flex gap-3">

                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Mini speciality name"
                    className="flex-1 rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-wellness-accent"
                />

                <button
                    onClick={createMini}
                    disabled={loading}
                    className="px-5 py-2.5 bg-wellness-accent text-white rounded-lg text-sm font-medium"
                >
                    {loading ? "Adding..." : "Add Mini"}
                </button>

            </div>

            {/* LIST */}

            {sub.miniSpecialities.length === 0 ? (

                <EmptyState message="No mini-specialities yet." />

            ) : (

                <div className="divide-y divide-gray-100 border border-gray-100 rounded-lg">

                    {sub.miniSpecialities.map((mini: any) => (

                        <div
                            key={mini.id}
                            className="flex justify-between items-center px-5 py-4"
                        >

                            <span className="text-sm font-medium text-navy-dark">
                                {mini.name}
                            </span>

                            <Link
                                href={`/admin/mini-specialities/${mini.id}`}
                                className="text-sm text-wellness-accent hover:underline"
                            >
                                Manage
                            </Link>

                        </div>

                    ))}

                </div>

            )}

        </div>
    );
}

/* ---------------- BADGES ---------------- */

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
            className={`px-3 py-1 rounded-full text-xs font-medium ${hasMini
                ? "bg-indigo-100 text-indigo-700"
                : "bg-gray-100 text-navy/70"
                }`}
        >
            {hasMini ? "Mini Structure" : "Direct Content"}
        </span>
    );
}

function EmptyState({ message }: { message: string }) {
    return (
        <div className="text-sm text-navy/60 border border-gray-100 rounded-lg px-6 py-6 text-center">
            {message}
        </div>
    );
}