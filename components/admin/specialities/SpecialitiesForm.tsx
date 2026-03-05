"use client";

import { useState, useEffect } from "react";
import { createSpeciality, updateSpeciality } from "@/lib/specialities.api";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface Props {
    mode: "create" | "edit";
    initialData?: {
        id: string;
        name: string;
        description?: string;
        icon?: string;
    };
}

export default function SpecialityForm({ mode, initialData }: Props) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [icon, setIcon] = useState("");

    useEffect(() => {
        if (mode === "edit" && initialData) {
            setName(initialData.name || "");
            setDescription(initialData.description || "");
            setIcon(initialData.icon || "");
        }
    }, [mode, initialData]);

    const handleSubmit = async () => {
        if (!name.trim()) {
            return toast.error("Speciality name is required");
        }

        setLoading(true);

        try {
            if (mode === "create") {
                await createSpeciality({ name, description, icon });
                toast.success("Speciality created successfully");
            } else if (mode === "edit" && initialData) {
                await updateSpeciality(initialData.id, {
                    name,
                    description,
                    icon,
                });
                toast.success("Speciality updated successfully");
            }

            router.push("/admin/specialities");
        } catch {
            toast.error("Operation failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mx-auto max-w-2xl rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
            <h2 className="mb-6 text-2xl font-semibold text-slate-900">
                {mode === "create" ? "Create Speciality" : "Edit Speciality"}
            </h2>

            <div className="space-y-6">
                {/* Name */}
                <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                        Speciality Name
                    </label>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Cardiology"
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none"
                    />
                </div>

                {/* Icon */}
                <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                        Icon Key
                    </label>
                    <input
                        value={icon}
                        onChange={(e) => setIcon(e.target.value)}
                        placeholder="e.g. HeartPulse"
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none"
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                        Description
                    </label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={4}
                        placeholder="Short description shown to patients"
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none"
                    />
                </div>
            </div>

            {/* Footer */}
            <div className="mt-8 flex justify-end gap-4">
                <button
                    onClick={() => router.back()}
                    className="rounded-xl px-5 py-2 text-sm text-slate-600 hover:bg-slate-100"
                >
                    Cancel
                </button>

                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="rounded-xl bg-teal-600 px-6 py-2 text-sm font-medium text-white shadow hover:bg-teal-700 disabled:opacity-60"
                >
                    {loading
                        ? "Saving..."
                        : mode === "create"
                            ? "Create"
                            : "Update"}
                </button>
            </div>
        </div>
    );
}