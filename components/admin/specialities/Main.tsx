"use client";

import Link from "next/link";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    getAdminSpecialities,
    toggleSpecialityStatus,
    createSpeciality,
} from "@/lib/specialities.api";

import { BadgeCheck, Ban, Plus, Pencil } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function AdminSpecialitiesPage() {

    const queryClient = useQueryClient();
    const [name, setName] = useState("");

    const { data = [], isLoading } = useQuery({
        queryKey: ["admin-specialities"],
        queryFn: getAdminSpecialities,
    });

    /* ---------- CREATE ---------- */

    const createMutation = useMutation({
        mutationFn: () => createSpeciality({ name }),

        onSuccess: () => {

            toast.success("Speciality added");

            setName("");

            queryClient.invalidateQueries({
                queryKey: ["admin-specialities"],
            });
        },

        onError: () => toast.error("Failed to add speciality"),
    });

    /* ---------- TOGGLE ---------- */

    const toggleMutation = useMutation({
        mutationFn: ({ id, isActive }: { id: string; isActive: boolean }) =>
            toggleSpecialityStatus(id, isActive),

        onSuccess: () => {

            toast.success("Status updated");

            queryClient.invalidateQueries({
                queryKey: ["admin-specialities"],
            });
        },
    });

    return (
        <div className="space-y-4">

            {/* HEADER */}

            <div>

                <h1 className="text-3xl font-semibold text-slate-900">
                    Medical Specialities
                </h1>

                <p className="mt-2 text-sm text-slate-500">
                    Manage healthcare categories in Healora
                </p>

            </div>


            {/* ADD SPECIALITY */}

            <div className="flex flex-col md:flex-row gap-4">

                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter speciality name"
                    className="flex-1 rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-teal-500/20"
                />

                <button
                    onClick={() => {

                        if (!name.trim())
                            return toast.error("Name required");

                        createMutation.mutate();
                    }}
                    className="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-5 py-3 text-sm font-medium text-white hover:bg-teal-700"
                >
                    <Plus size={16} />
                    Add
                </button>

            </div>


            {/* LIST */}

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">

                <table className="w-full text-sm">

                    <thead className="bg-slate-50 text-slate-600">

                        <tr>
                            <th className="px-8 py-4 text-left font-medium">
                                Name
                            </th>

                            <th className="px-8 py-4 text-left font-medium">
                                Slug
                            </th>

                            <th className="px-8 py-4 text-left font-medium">
                                Status
                            </th>

                            <th className="px-8 py-4 text-right font-medium">
                                Actions
                            </th>
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
                            data.map((item: any) => (

                                <tr
                                    key={item.id}
                                    className="border-t border-slate-100 hover:bg-teal-50/40"
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

                    </tbody>

                </table>

            </div>

        </div>
    );
}