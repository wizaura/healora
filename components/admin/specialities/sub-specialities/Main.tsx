"use client";

import { useParams } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    getAdminSpecialityById,
    getAdminSubSpecialities,
    createSubSpeciality,
    toggleSubSpecialityStatus,
} from "@/lib/specialities.api";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { Plus, Layers, BadgeCheck, Ban } from "lucide-react";

export default function AdminSpecialityDetail() {

    const { specialityId } = useParams<{ specialityId: string }>();
    const queryClient = useQueryClient();

    const [newSubName, setNewSubName] = useState("");
    const [hasMiniLevel, setHasMiniLevel] = useState(false);

    const { data: speciality, isLoading: loadingSpec } = useQuery({
        queryKey: ["admin-speciality", specialityId],
        queryFn: () => getAdminSpecialityById(specialityId),
        enabled: !!specialityId,
    });

    const { data: subs = [], isLoading: loadingSubs } = useQuery({
        queryKey: ["admin-sub-specialities", specialityId],
        queryFn: () => getAdminSubSpecialities(specialityId),
        enabled: !!specialityId,
    });

    const addSubMutation = useMutation({
        mutationFn: () =>
            createSubSpeciality({
                name: newSubName,
                specialityId,
                hasMiniLevel,
            }),
        onSuccess: () => {
            toast.success("Sub-speciality added");
            setNewSubName("");
            setHasMiniLevel(false);

            queryClient.invalidateQueries({
                queryKey: ["admin-sub-specialities", specialityId],
            });
        },
    });

    const toggleSubMutation = useMutation({
        mutationFn: ({
            subId,
            isActive,
        }: {
            subId: string;
            isActive: boolean;
        }) => toggleSubSpecialityStatus(subId, isActive),
        onSuccess: () => {
            toast.success("Status updated");

            queryClient.invalidateQueries({
                queryKey: ["admin-sub-specialities", specialityId],
            });
        },
    });

    if (loadingSpec || loadingSubs) {
        return (
            <div className="p-10 text-sm text-slate-500">
                Loading speciality details...
            </div>
        );
    }

    if (!speciality) {
        return <div className="p-10 text-red-500">Speciality not found</div>;
    }

    return (
        <div className="py-20 px-6 space-y-10">

            {/* SPECIALITY OVERVIEW */}

            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-10 shadow-xl">

                <div className="absolute -top-20 -right-20 h-56 w-56 rounded-full bg-teal-50 blur-3xl opacity-60" />

                <div className="relative flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">

                    <div className="space-y-6">

                        <div className="flex items-start gap-5">

                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-50 to-teal-100 shadow-inner">
                                <Layers className="text-teal-600" size={28} />
                            </div>

                            <div>

                                <h1 className="text-3xl font-semibold text-slate-900">
                                    {speciality.name}
                                </h1>

                                <p className="mt-2 text-sm text-slate-500">
                                    Slug:

                                    <span className="ml-2 rounded-md bg-slate-100 px-2 py-1 font-mono text-xs text-slate-700">
                                        /{speciality.slug}
                                    </span>
                                </p>

                            </div>

                        </div>

                        <p className="max-w-2xl text-sm leading-relaxed text-slate-600">
                            {speciality.description ||
                                "No description provided for this speciality."}
                        </p>

                        <div className="flex items-center gap-6 text-sm">

                            <div className="rounded-xl bg-slate-50 px-4 py-2">
                                <span className="text-slate-500">
                                    Sub-specialities
                                </span>

                                <div className="text-lg font-semibold text-slate-900">
                                    {subs.length}
                                </div>
                            </div>

                            {speciality.isActive ? (
                                <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-xs font-medium text-green-700">
                                    <BadgeCheck size={14} />
                                    Active
                                </span>
                            ) : (
                                <span className="inline-flex items-center gap-2 rounded-full bg-red-100 px-4 py-2 text-xs font-medium text-red-700">
                                    <Ban size={14} />
                                    Inactive
                                </span>
                            )}

                        </div>

                    </div>

                    <div className="flex flex-col gap-3">

                        <Link
                            href={`/admin/specialities/${specialityId}/edit`}
                            className="rounded-xl bg-teal-600 px-6 py-3 text-sm font-medium text-white shadow-md hover:bg-teal-700"
                        >
                            Edit Speciality
                        </Link>

                        <Link
                            href={`/admin/specialities`}
                            className="rounded-xl border border-slate-200 px-6 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50"
                        >
                            Back to List
                        </Link>

                    </div>

                </div>

            </div>

            {/* SUB SPECIALITIES */}

            <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-lg space-y-8">

                <div className="flex items-center justify-between">

                    <h2 className="text-xl font-semibold text-slate-900">
                        Sub-Specialities
                    </h2>

                    <span className="text-sm text-slate-500">
                        {subs.length} total
                    </span>

                </div>

                {/* ADD SUB */}

                <div className="border border-slate-200 rounded-2xl p-6 bg-slate-50">

                    <div className="flex flex-col md:flex-row gap-4">

                        <input
                            value={newSubName}
                            onChange={(e) => setNewSubName(e.target.value)}
                            placeholder="Enter sub-speciality name"
                            className="flex-1 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none"
                        />

                        <label className="flex items-center gap-2 text-sm text-slate-600">
                            <input
                                type="checkbox"
                                checked={hasMiniLevel}
                                onChange={(e) => setHasMiniLevel(e.target.checked)}
                            />
                            Has Mini Level
                        </label>

                        <button
                            onClick={() => {
                                if (!newSubName.trim())
                                    return toast.error("Name required");

                                addSubMutation.mutate();
                            }}
                            className="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-5 py-3 text-sm font-medium text-white hover:bg-teal-700 transition"
                        >
                            <Plus size={16} />
                            Add Sub
                        </button>

                    </div>

                </div>

                {/* SUB LIST */}

                {subs.length === 0 ? (

                    <div className="text-sm text-slate-400 text-center py-12 border border-slate-200 rounded-xl">
                        No sub-specialities created yet
                    </div>

                ) : (

                    <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl">

                        {subs.map((sub: any) => (

                            <div
                                key={sub.id}
                                className="flex items-center justify-between px-6 py-5 hover:bg-slate-50 transition"
                            >

                                <div className="space-y-1">

                                    <div className="font-medium text-slate-900">
                                        {sub.name}
                                    </div>

                                    <div className="flex items-center gap-3 text-xs text-slate-500">

                                        <span className="font-mono">
                                            /{sub.slug}
                                        </span>

                                        {sub.hasMiniLevel && (
                                            <span className="px-2 py-0.5 rounded bg-indigo-100 text-indigo-600">
                                                Mini Structure
                                            </span>
                                        )}

                                    </div>

                                </div>

                                <div className="flex items-center gap-6 text-sm">

                                    {sub.isActive ? (
                                        <span className="text-green-600 font-medium">
                                            Active
                                        </span>
                                    ) : (
                                        <span className="text-red-500 font-medium">
                                            Inactive
                                        </span>
                                    )}

                                    <button
                                        onClick={() =>
                                            toggleSubMutation.mutate({
                                                subId: sub.id,
                                                isActive: !sub.isActive,
                                            })
                                        }
                                        className={
                                            sub.isActive
                                                ? "text-red-600 hover:underline"
                                                : "text-green-600 hover:underline"
                                        }
                                    >
                                        {sub.isActive ? "Disable" : "Enable"}
                                    </button>

                                    <Link
                                        href={`/admin/sub-specialities/${sub.id}`}
                                        className="text-teal-600 hover:underline font-medium"
                                    >
                                        Manage
                                    </Link>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </div>
    );
}