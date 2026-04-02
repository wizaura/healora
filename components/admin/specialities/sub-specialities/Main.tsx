"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import Link from "next/link";
import api from "@/lib/api";

type TabType = "overview" | "sub";

export default function ManageSpecialityPage() {

    const { specialityId } = useParams<{ specialityId: string }>();
    const router = useRouter();
    const [tab, setTab] = useState<TabType>("overview");

    const { data: speciality, isLoading, refetch } = useQuery({
        queryKey: ["admin-speciality", specialityId],
        queryFn: async () => {
            const res = await api.get(`/admin/specialities/${specialityId}`);
            return res.data;
        },
        enabled: !!specialityId,
    });

    const toggleMutation = useMutation({
        mutationFn: async () => {
            await api.patch(`/admin/specialities/${specialityId}/status`, {
                isActive: !speciality.isActive,
            });
        },
        onSuccess: () => refetch(),
    });

    const deleteMutation = useMutation({
        mutationFn: async () => {
            await api.delete(`/admin/specialities/${specialityId}`);
        },
        onSuccess: () => {
            router.push(`/admin/specialities`);
        },
    });

    if (isLoading) {
        return (
            <div className="h-screen flex items-center justify-center text-sm text-navy/60">
                Loading...
            </div>
        );
    }

    if (!speciality) {
        return (
            <div className="h-screen flex items-center justify-center text-red-500">
                Not found
            </div>
        );
    }

    return (
        <div className="">

            {/* HEADER */}

            <div className="max-w-6xl mx-auto mb-10">

                <button
                    onClick={() => router.back()}
                    className="text-sm text-navy/60 hover:text-navy"
                >
                    ← Back
                </button>

                <div className="flex justify-between items-start mt-4">

                    <div>

                        <h1 className="text-3xl font-semibold text-navy-dark">
                            {speciality.name}
                        </h1>

                        <div className="flex items-center gap-3 mt-1">

                            <span className="text-sm text-navy/60 font-mono">
                                /{speciality.slug}
                            </span>

                        </div>

                        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-600">
                            {speciality.description}
                        </p>

                    </div>

                    <StatusBadge active={speciality.isActive} />

                </div>

                {/* ACTIONS */}

                <div className="flex gap-4 flex-wrap mt-6">

                    <Link
                        href={`/admin/specialities/${specialityId}/edit`}
                        className="px-5 py-2.5 bg-wellness-accent text-white rounded-lg text-sm font-medium"
                    >
                        Edit
                    </Link>

                    <button
                        onClick={() => toggleMutation.mutate()}
                        className="px-5 py-2.5 border border-gray-200 rounded-lg text-sm"
                    >
                        {speciality.isActive ? "Deactivate" : "Activate"}
                    </button>

                    <button
                        onClick={() => {
                            if (confirm("Delete this speciality?")) {
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

                <button
                    onClick={() => setTab("overview")}
                    className={`pb-4 transition ${tab === "overview"
                        ? "text-navy-dark border-b-2 border-wellness-accent"
                        : "text-navy/60 hover:text-navy"
                        }`}
                >
                    Overview
                </button>

                <button
                    onClick={() => setTab("sub")}
                    className={`pb-4 transition ${tab === "sub"
                        ? "text-navy-dark border-b-2 border-wellness-accent"
                        : "text-navy/60 hover:text-navy"
                        }`}
                >
                    Sub Specialities
                </button>

            </div>

            {/* CONTENT */}

            <div className="max-w-6xl mx-auto px-6 py-10 space-y-12">

                {tab === "overview" && (
                    <OverviewSection speciality={speciality} />
                )}

                {tab === "sub" && (
                    <SubSpecialitySection
                        speciality={speciality}
                        specialityId={specialityId}
                        refetch={refetch}
                    />
                )}

            </div>

        </div>
    );
}

/* ---------------- OVERVIEW ---------------- */

function OverviewSection({ speciality }: any) {

    const overview = speciality.overview ?? {};

    return (
        <div className="space-y-12">

            {overview.mainDescription && (
                <div className="text-sm text-navy/80 leading-relaxed">
                    {overview.mainDescription}
                </div>
            )}

            <div className="flex gap-4">
                {overview.images?.image1 && (
                    <img
                        src={overview.images.image1.url}
                        className="w-28 h-28 rounded-xl border border-gray-100"
                    />
                )}
                {overview.images?.image2 && (
                    <img
                        src={overview.images.image2.url}
                        className="w-50 h-24 rounded-xl border border-gray-100"
                    />
                )}
            </div>

            {overview.headerMain && (
                <OverviewBlock
                    title={overview.headerMain.question}
                    value={overview.headerMain.answer}
                />
            )}

            {overview.headerSecondary?.map((item: any, i: number) => (
                <OverviewBlock
                    key={i}
                    title={item.question}
                    value={item.answer}
                />
            ))}

            {speciality.quickFacts?.length > 0 && (

                <div>

                    <h3 className="text-sm font-semibold text-navy-dark mb-4">
                        Quick Facts
                    </h3>

                    <ul className="space-y-2 text-sm text-navy/80 list-disc pl-5">

                        {speciality.quickFacts.map((fact: any, i: number) => (
                            <li key={i}>
                                {typeof fact === "string" ? fact : fact.value}
                            </li>
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

/* ---------------- SUB SPECIALITIES ---------------- */

function SubSpecialitySection({ speciality, specialityId, refetch }: any) {

    const [name, setName] = useState("");

    const createSub = async () => {

        if (!name.trim()) return;

        await api.post(`/admin/sub-specialities`, {
            name,
            specialityId
        });

        setName("");
        refetch();
    };

    return (

        <div className="space-y-8">

            <div>

                <h3 className="text-lg font-semibold text-navy-dark">
                    Sub Specialities
                </h3>

                <p className="text-sm text-navy/60">
                    Manage sub-specialities under this speciality.
                </p>

            </div>

            {/* ADD */}

            <div className="flex gap-3">

                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Sub speciality name"
                    className="flex-1 rounded-lg border border-gray-200 px-4 py-2.5 text-sm"
                />

                <button
                    onClick={createSub}
                    className="px-5 py-2.5 bg-wellness-accent text-white rounded-lg text-sm font-medium"
                >
                    Add
                </button>

            </div>

            {/* LIST */}

            {speciality.subSpecialities?.length === 0 ? (

                <EmptyState message="No sub-specialities yet." />

            ) : (

                <div className="divide-y divide-gray-100 border border-gray-100 rounded-lg">

                    {speciality.subSpecialities.map((sub: any) => (

                        <div
                            key={sub.id}
                            className="flex justify-between items-center px-5 py-4"
                        >

                            <span className="text-sm font-medium text-navy-dark">
                                {sub.name}
                            </span>

                            <Link
                                href={`/admin/sub-specialities/${sub.id}`}
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

function EmptyState({ message }: { message: string }) {

    return (

        <div className="text-sm text-navy/60 border border-gray-100 rounded-lg px-6 py-6 text-center">
            {message}
        </div>

    );

}