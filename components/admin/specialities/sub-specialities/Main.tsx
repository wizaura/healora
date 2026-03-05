"use client";

import { useParams, useRouter } from "next/navigation";
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
import {
    ArrowLeft,
    Plus,
    Layers,
    BadgeCheck,
    Ban,
} from "lucide-react";

export default function AdminSpecialityDetail() {
    const { specialityId } = useParams<{ specialityId: string }>();
    const router = useRouter();
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

            {/* Overview */}
            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-10 shadow-xl">

                {/* Subtle background accent */}
                <div className="absolute -top-20 -right-20 h-56 w-56 rounded-full bg-teal-50 blur-3xl opacity-60" />

                <div className="relative flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">

                    {/* Left Content */}
                    <div className="space-y-6">

                        {/* Header Row */}
                        <div className="flex items-start gap-5">
                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-50 to-teal-100 shadow-inner">
                                <Layers className="text-teal-600" size={28} />
                            </div>

                            <div>
                                <h1 className="text-3xl font-semibold text-slate-900 tracking-tight">
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

                        {/* Description */}
                        <p className="max-w-2xl text-sm leading-relaxed text-slate-600">
                            {speciality.description ||
                                "No description provided for this speciality."}
                        </p>

                        {/* Meta Info */}
                        <div className="flex flex-wrap items-center gap-6 pt-2 text-sm">

                            <div className="rounded-xl bg-slate-50 px-4 py-2">
                                <span className="text-slate-500">Sub-specialities</span>
                                <div className="text-lg font-semibold text-slate-900">
                                    {subs.length}
                                </div>
                            </div>

                            <div>
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
                    </div>

                    {/* Right Action Panel */}
                    <div className="flex flex-col gap-3">
                        <Link
                            href={`/admin/specialities/${specialityId}/edit`}
                            className="rounded-xl bg-teal-600 px-6 py-3 text-sm font-medium text-white shadow-md transition hover:bg-teal-700"
                        >
                            Edit Speciality
                        </Link>

                        <Link
                            href={`/admin/specialities`}
                            className="rounded-xl border border-slate-200 px-6 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
                        >
                            Back to List
                        </Link>
                    </div>
                </div>
            </div>

            {/* Sub Specialities Section */}
            <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-lg">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-xl font-semibold text-slate-900">
                        Sub-Specialities
                    </h2>
                </div>

                {/* Add Section */}
                <div className="mb-8 rounded-2xl border border-slate-200 bg-slate-50 p-6">
                    <div className="flex flex-col md:flex-row gap-4 md:items-center">
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

                {/* Table */}
                <div className="overflow-hidden rounded-2xl border border-slate-200">
                    <table className="w-full text-sm">
                        <thead className="bg-slate-100 text-slate-600">
                            <tr>
                                <th className="px-8 py-4 text-left font-medium">Name</th>
                                <th className="px-8 py-4 text-left font-medium">
                                    Mini Level
                                </th>
                                <th className="px-8 py-4 text-left font-medium">Status</th>
                                <th className="px-8 py-4 text-right font-medium">
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {subs.map((sub: any) => (
                                <tr
                                    key={sub.id}
                                    className="border-t border-slate-100 hover:bg-teal-50/40 transition"
                                >
                                    <td className="px-8 py-5 font-medium text-slate-900">
                                        {sub.name}
                                    </td>

                                    <td className="px-8 py-5 text-slate-600">
                                        {sub.hasMiniLevel ? "Yes" : "No"}
                                    </td>

                                    <td className="px-8 py-5">
                                        {sub.isActive ? (
                                            <span className="text-green-600 text-xs font-medium">
                                                Active
                                            </span>
                                        ) : (
                                            <span className="text-red-600 text-xs font-medium">
                                                Inactive
                                            </span>
                                        )}
                                    </td>

                                    <td className="px-8 py-5 text-right">
                                        <div className="flex justify-end gap-6 text-xs font-medium">
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
                                                className="text-teal-600 hover:underline"
                                            >
                                                Manage
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}

                            {subs.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={4}
                                        className="px-8 py-14 text-center text-slate-400"
                                    >
                                        No sub-specialities created yet
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}