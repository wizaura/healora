"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    getAdminSpecialities,
    toggleSpecialityStatus,
} from "@/lib/specialities.api";
import { BadgeCheck, Ban } from "lucide-react";
import toast from "react-hot-toast";
import { useState } from "react";
import SpecialityModal from "./SpecialitiesModal";
import SubSpecialitiesModal from "./SubSpecialitiesModal";

export default function AdminSpecialities() {
    const queryClient = useQueryClient();

    const { data = [], isLoading } = useQuery({
        queryKey: ["admin-specialities"],
        queryFn: getAdminSpecialities,
    });

    const [editItem, setEditItem] = useState<any | null>(null);
    const [subItem, setSubItem] = useState<any | null>(null);
    const [isAddOpen, setIsAddOpen] = useState(false);

    const toggleMutation = useMutation({
        mutationFn: ({ id, isActive }: { id: string; isActive: boolean }) =>
            toggleSpecialityStatus(id, isActive),
        onSuccess: () => {
            toast.success("Status updated");
            queryClient.invalidateQueries({ queryKey: ["admin-specialities"] });
        },
        onError: () => toast.error("Failed to update status"),
    });

    if (isLoading) {
        return <div className="p-6">Loading specialities...</div>;
    }

    return (
        <div className="p-6 pt-24">
            {/* Header */}
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-slate-900">
                        Specialities
                    </h1>
                    <p className="mt-1 text-sm text-slate-500">
                        Manage all medical specialities available on Healora
                    </p>
                </div>

                <button
                    onClick={() => setIsAddOpen(true)}
                    className="rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700"
                >
                    + Add Speciality
                </button>
            </div>

            {/* Table */}
            <div className="rounded-2xl border border-gray-300 bg-white shadow-sm overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-green-100 text-slate-600">
                        <tr>
                            <th className="px-4 py-3 text-left">Name</th>
                            <th className="px-4 py-3 text-left">Slug</th>
                            <th className="px-4 py-3 text-left">Status</th>
                            <th className="px-4 py-3 text-right">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.map((item: any) => (
                            <tr
                                key={item.id}
                                className="border-t border-gray-300 hover:bg-slate-50 transition"
                            >
                                <td className="px-4 py-3 font-medium text-slate-900">
                                    {item.name}
                                </td>

                                <td className="px-4 py-3 text-sm text-slate-500">
                                    /{item.slug}
                                </td>

                                <td className="px-4 py-3">
                                    {item.isActive ? (
                                        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-700">
                                            <BadgeCheck size={14} className="mr-1" />
                                            Active
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-1 text-xs font-medium text-red-700">
                                            <Ban size={14} className="mr-1" />
                                            Inactive
                                        </span>
                                    )}
                                </td>

                                <td className="px-4 py-3 text-right">
                                    <div className="inline-flex items-center gap-4">
                                        <button
                                            onClick={() =>
                                                toggleMutation.mutate({
                                                    id: item.id,
                                                    isActive: !item.isActive,
                                                })
                                            }
                                            className={`text-xs font-medium ${item.isActive
                                                    ? "text-red-600 hover:underline"
                                                    : "text-green-600 hover:underline"
                                                }`}
                                        >
                                            {item.isActive ? "Disable" : "Enable"}
                                        </button>

                                        <button
                                            onClick={() => setEditItem(item)}
                                            className="text-xs text-slate-600 hover:underline"
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={() => setSubItem(item)}
                                            className="text-xs text-indigo-600 hover:underline"
                                        >
                                            Manage Sub
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}

                        {data.length === 0 && (
                            <tr>
                                <td
                                    colSpan={4}
                                    className="px-4 py-10 text-center text-slate-500"
                                >
                                    No specialities found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Add */}
            <SpecialityModal
                open={isAddOpen}
                onClose={() => setIsAddOpen(false)}
                onSuccess={() =>
                    queryClient.invalidateQueries({ queryKey: ["admin-specialities"] })
                }
            />

            {/* Edit */}
            <SpecialityModal
                open={!!editItem}
                initialData={editItem}
                onClose={() => setEditItem(null)}
                onSuccess={() =>
                    queryClient.invalidateQueries({ queryKey: ["admin-specialities"] })
                }
            />

            {/* Sub-specialities */}
            <SubSpecialitiesModal
                open={!!subItem}
                speciality={subItem}
                onClose={() => setSubItem(null)}
            />
        </div>
    );
}
