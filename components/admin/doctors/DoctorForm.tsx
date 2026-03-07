"use client";

import { useState } from "react";
import api from "@/lib/api";
import toast from "react-hot-toast";

type Props = {
    doctor?: any;
    onSuccess: () => void;
    onClose: () => void;
};

export default function DoctorForm({
    doctor,
    onSuccess,
    onClose,
}: Props) {

    const [name, setName] = useState(doctor?.name || "");
    const [email, setEmail] = useState(doctor?.email || "");
    const [saving, setSaving] = useState(false);

    const handleSubmit = async () => {

        if (!name.trim()) {
            toast.error("Doctor name is required");
            return;
        }

        if (!email.trim()) {
            toast.error("Email is required");
            return;
        }

        try {
            setSaving(true);

            if (doctor) {

                await api.patch(`/admin/doctors/${doctor.id}`, {
                    name,
                    email,
                });

                toast.success("Doctor updated");

            } else {

                const res = await api.post("/admin/doctors", {
                    name,
                    email,
                });

                toast.success("Doctor created");

                if (res.data?.tempPassword) {
                    toast(
                        `Temporary password: ${res.data.tempPassword}`,
                        { duration: 7000 }
                    );
                }
            }

            onSuccess();

        } catch (err: any) {
            toast.error(err?.response?.data?.message || "Error");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">

            {/* Title */}
            <h3 className="text-lg font-semibold mb-6">
                {doctor ? "Edit Doctor" : "Add Doctor"}
            </h3>

            {/* FORM GRID */}
            <div className="grid md:grid-cols-2 gap-6">

                {/* NAME */}
                <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                        Doctor Name
                    </label>

                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm"
                        placeholder="Dr. John Doe"
                    />
                </div>

                {/* EMAIL */}
                <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                        Email
                    </label>

                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm"
                        placeholder="doctor@healora.com"
                    />
                </div>

            </div>

            {/* ACTIONS */}
            <div className="flex justify-end gap-3 pt-6 border-t border-gray-300 mt-6">

                <button
                    onClick={onClose}
                    className="cursor-pointer bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-md text-sm"
                >
                    Cancel
                </button>

                <button
                    onClick={handleSubmit}
                    disabled={saving}
                    className="cursor-pointer bg-teal-600 hover:bg-teal-800 text-white px-4 py-2 rounded-md text-sm disabled:opacity-60"
                >
                    {saving
                        ? doctor
                            ? "Updating..."
                            : "Creating..."
                        : doctor
                        ? "Update"
                        : "Create"}
                </button>

            </div>

        </div>
    );
}