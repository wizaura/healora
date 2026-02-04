"use client";

import { useState } from "react";
import {
    createSubSpeciality,
    getAdminSubSpecialities,
    toggleSubSpecialityStatus,
    updateSubSpeciality,
} from "@/lib/specialities.api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function SubSpecialitiesModal({
    open,
    onClose,
    speciality,
}: {
    open: boolean;
    onClose: () => void;
    speciality: any;
}) {
    const [name, setName] = useState("");
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editingName, setEditingName] = useState("");
    const queryClient = useQueryClient();

    const { data = [], isLoading } = useQuery({
        queryKey: ["sub-specialities", speciality?.id],
        queryFn: () => getAdminSubSpecialities(speciality.id),
        enabled: open,
    });

    if (!open) return null;

    const refresh = () =>
        queryClient.invalidateQueries({
            queryKey: ["sub-specialities", speciality.id],
        });

    const addSub = async () => {
        if (!name.trim()) return toast.error("Name required");

        try {
            await createSubSpeciality({
                name,
                specialityId: speciality.id,
            });
            toast.success("Sub-speciality added");
            setName("");
            refresh();
        } catch {
            toast.error("Failed to add sub-speciality");
        }
    };

    const saveEdit = async (id: string) => {
        if (!editingName.trim()) return;

        try {
            await updateSubSpeciality(id, { name: editingName });
            toast.success("Sub-speciality updated");
            setEditingId(null);
            setEditingName("");
            refresh();
        } catch {
            toast.error("Update failed");
        }
    };

    const toggleStatus = async (id: string, isActive: boolean) => {
        try {
            await toggleSubSpecialityStatus(id, isActive);
            toast.success(isActive ? "Enabled" : "Disabled");
            refresh();
        } catch {
            toast.error("Action failed");
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
            <div className="w-full max-w-lg rounded-xl bg-white p-6">
                <h2 className="mb-4 text-lg font-semibold">
                    Sub-Specialities – {speciality.name}
                </h2>

                {/* Add */}
                <div className="flex gap-2 mb-4">
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="New sub-speciality"
                        className="flex-1 rounded-lg border px-3 py-2"
                    />
                    <button
                        onClick={addSub}
                        className="rounded-lg bg-teal-600 px-4 py-2 text-sm text-white"
                    >
                        Add
                    </button>
                </div>

                {/* List */}
                <ul className="space-y-2 max-h-64 overflow-auto">
                    {isLoading && (
                        <li className="text-sm text-slate-400">Loading…</li>
                    )}

                    {data.map((s: any) => (
                        <li
                            key={s.id}
                            className="flex items-center justify-between rounded-lg border px-3 py-2"
                        >
                            {editingId === s.id ? (
                                <input
                                    value={editingName}
                                    onChange={(e) => setEditingName(e.target.value)}
                                    className="flex-1 rounded border px-2 py-1 text-sm"
                                />
                            ) : (
                                <span className="text-sm">{s.name}</span>
                            )}

                            <div className="flex items-center gap-3">
                                {editingId === s.id ? (
                                    <button
                                        onClick={() => saveEdit(s.id)}
                                        className="text-xs text-teal-600"
                                    >
                                        Save
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => {
                                            setEditingId(s.id);
                                            setEditingName(s.name);
                                        }}
                                        className="text-xs text-slate-600"
                                    >
                                        Edit
                                    </button>
                                )}

                                <button
                                    onClick={() => toggleStatus(s.id, !s.isActive)}
                                    className={`text-xs ${s.isActive ? "text-red-600" : "text-green-600"
                                        }`}
                                >
                                    {s.isActive ? "Disable" : "Enable"}
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>

                <div className="mt-5 text-right">
                    <button
                        onClick={onClose}
                        className="text-sm text-slate-500 hover:underline"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
