"use client";

import Link from "next/link";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    getAdminSpecialities,
    toggleSpecialityStatus,
} from "@/lib/specialities.api";
import {
    BadgeCheck,
    Ban,
    Plus,
    Pencil,
    Search,
} from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function AdminSpecialitiesPage() {
    const queryClient = useQueryClient();
    const [search, setSearch] = useState("");

    const { data = [], isLoading } = useQuery({
        queryKey: ["admin-specialities"],
        queryFn: getAdminSpecialities,
    });

    const toggleMutation = useMutation({
        mutationFn: ({ id, isActive }: { id: string; isActive: boolean }) =>
            toggleSpecialityStatus(id, isActive),
        onSuccess: () => {
            toast.success("Status updated");
            queryClient.invalidateQueries({
                queryKey: ["admin-specialities"],
            });
        },
        onError: () => toast.error("Failed to update status"),
    });

    const filtered = data.filter((item: any) =>
        item.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="pt-20 px-6">
            {/* Header */}
            <div className="mb-10 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-semibold text-slate-900">
                        Medical Specialities
                    </h1>
                    <p className="mt-2 text-sm text-slate-500">
                        Manage and organize Healora’s healthcare categories
                    </p>
                </div>

                <Link
                    href="/admin/specialities/new"
                    className="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-5 py-3 text-sm font-medium text-white shadow-md transition hover:bg-teal-700"
                >
                    <Plus size={16} />
                    Add Speciality
                </Link>
            </div>

            {/* Search Bar */}
            <div className="mb-6 flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                <Search size={16} className="text-slate-400" />
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search specialities..."
                    className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
                />
            </div>

            {/* Premium Table */}
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg">
                <table className="w-full text-sm">
                    <thead className="bg-slate-50 text-slate-600">
                        <tr>
                            <th className="px-8 py-4 text-left font-medium">Name</th>
                            <th className="px-8 py-4 text-left font-medium">Slug</th>
                            <th className="px-8 py-4 text-left font-medium">Status</th>
                            <th className="px-8 py-4 text-right font-medium">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {isLoading && (
                            <tr>
                                <td
                                    colSpan={4}
                                    className="px-8 py-16 text-center text-slate-400"
                                >
                                    Loading specialities...
                                </td>
                            </tr>
                        )}

                        {!isLoading &&
                            filtered.map((item: any) => (
                                <tr
                                    key={item.id}
                                    className="border-t border-slate-100 transition hover:bg-teal-50/40"
                                >
                                    <td className="px-8 py-5 font-medium text-slate-900">
                                        {item.name}
                                    </td>

                                    <td className="px-8 py-5 text-slate-500">
                                        /{item.slug}
                                    </td>

                                    <td className="px-8 py-5">
                                        {item.isActive ? (
                                            <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                                                <BadgeCheck size={14} />
                                                Active
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-2 rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700">
                                                <Ban size={14} />
                                                Inactive
                                            </span>
                                        )}
                                    </td>

                                    <td className="px-8 py-5 text-right">
                                        <div className="flex justify-end gap-6 text-xs font-medium">
                                            <button
                                                onClick={() =>
                                                    toggleMutation.mutate({
                                                        id: item.id,
                                                        isActive: !item.isActive,
                                                    })
                                                }
                                                className={
                                                    item.isActive
                                                        ? "text-red-600 hover:underline"
                                                        : "text-green-600 hover:underline"
                                                }
                                            >
                                                {item.isActive ? "Disable" : "Enable"}
                                            </button>

                                            <Link
                                                href={`/admin/specialities/${item.id}/edit`}
                                                className="inline-flex items-center gap-1 text-slate-600 hover:underline"
                                            >
                                                <Pencil size={14} />
                                                Edit
                                            </Link>

                                            <Link
                                                href={`/admin/specialities/${item.id}`}
                                                className="text-teal-600 hover:underline"
                                            >
                                                Manage
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}

                        {!isLoading && filtered.length === 0 && (
                            <tr>
                                <td
                                    colSpan={4}
                                    className="px-8 py-16 text-center text-slate-400"
                                >
                                    No specialities found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}