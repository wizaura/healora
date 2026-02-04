"use client";

import { useState, useEffect } from "react";
import { createSpeciality, updateSpeciality } from "@/lib/specialities.api";
import toast from "react-hot-toast";

export default function SpecialityModal({
    open,
    onClose,
    initialData,
    onSuccess,
}: {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
    initialData?: any;
}) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [icon, setIcon] = useState("");
    const [loading, setLoading] = useState(false);

    const inputClass = `
        w-full rounded-lg border border-slate-300
        bg-white px-3 py-2 text-sm text-slate-900
        placeholder:text-slate-400
        transition-all duration-200
        hover:border-slate-400
        focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20
        focus:outline-none
    `;


    // ✅ SYNC STATE ON EDIT
    useEffect(() => {
        if (open && initialData) {
            setName(initialData.name || "");
            setDescription(initialData.description || "");
            setIcon(initialData.icon || "");
        }

        // ✅ RESET ON ADD
        if (open && !initialData) {
            setName("");
            setDescription("");
            setIcon("");
        }
    }, [open, initialData]);

    if (!open) return null;

    const handleSubmit = async () => {
        if (!name.trim()) {
            toast.error("Name is required");
            return;
        }

        setLoading(true);
        try {
            if (initialData) {
                await updateSpeciality(initialData.id, {
                    name,
                    description,
                    icon,
                });
                toast.success("Speciality updated");
            } else {
                await createSpeciality({ name, description, icon });
                toast.success("Speciality created");
            }

            onSuccess();
            onClose();
        } catch {
            toast.error("Operation failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-2xl bg-white shadow-xl">
                {/* Header */}
                <div className="border-b border-gray-300 px-6 py-4">
                    <h2 className="text-lg font-semibold text-slate-900">
                        {initialData ? "Edit Speciality" : "Add Speciality"}
                    </h2>
                    <p className="text-sm text-slate-500">
                        Configure speciality details shown to users
                    </p>
                </div>

                {/* Body */}
                <div className="space-y-4 px-6 py-5">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            Speciality Name
                        </label>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. Cardiology"
                            className={inputClass}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            Icon Key
                        </label>
                        <input
                            value={icon}
                            onChange={(e) => setIcon(e.target.value)}
                            placeholder="e.g. HeartPulse"
                            className={inputClass}
                        />
                        <p className="mt-1 text-xs text-slate-400">
                            Must match an icon key from your icon map
                        </p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            Description
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Short description for users"
                            rows={3}
                            className={inputClass}
                        />
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-end gap-3 border-t border-gray-300 px-6 py-4">
                    <button
                        onClick={onClose}
                        className="rounded-lg px-4 py-2 text-sm text-slate-600 hover:bg-slate-100"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="rounded-lg bg-teal-600 px-5 py-2 text-sm font-medium text-white hover:bg-teal-700 disabled:opacity-60"
                    >
                        {loading ? "Saving..." : "Save"}
                    </button>
                </div>
            </div>
        </div>
    );
}
