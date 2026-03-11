"use client";

import { useState } from "react";
import api from "@/lib/api";
import toast from "react-hot-toast";

type Props = {
    doctor?: any;
    onSuccess: () => void;
    onClose: () => void;
};

export default function DoctorForm({ doctor, onSuccess, onClose }: Props) {

    const [name, setName] = useState(doctor?.name || "");
    const [email, setEmail] = useState(doctor?.email || "");

    const [certificate, setCertificate] = useState<File | null>(null);
    const [certificatePreview, setCertificatePreview] = useState<string | null>(
        doctor?.certificateUrl || null
    );

    const [saving, setSaving] = useState(false);

    const handleCertificateChange = (file: File | null) => {
        setCertificate(file);

        if (file) {
            setCertificatePreview(URL.createObjectURL(file));
        }
    };

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

            const formData = new FormData();

            formData.append("name", name);
            formData.append("email", email);

            if (certificate) {
                formData.append("certificate", certificate);
            }

            if (doctor) {

                await api.patch(`/admin/doctors/${doctor.id}`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });

                toast.success("Doctor updated");

            } else {

                const res = await api.post("/admin/doctors", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
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

                {/* CERTIFICATE */}
                {/* CERTIFICATE */}
                <div className="space-y-3 md:col-span-2">

                    <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                        Doctor Certificate
                    </label>

                    <input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={(e) =>
                            handleCertificateChange(e.target.files?.[0] || null)
                        }
                        className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm file:mr-3 file:px-3 file:py-1 file:rounded-md file:border-0 file:bg-slate-100 file:text-sm file:cursor-pointer"
                    />

                    {/* FILE PREVIEW */}
                    {certificatePreview && (

                        <div className="border rounded-lg p-3 bg-slate-50 flex items-center justify-between">

                            <div className="flex items-center gap-3">

                                {/* ICON */}
                                {certificatePreview.includes("pdf") ? (
                                    <span className="text-red-500 text-xl">📄</span>
                                ) : (
                                    <img
                                        src={certificatePreview}
                                        className="w-12 h-12 object-cover rounded-md border"
                                    />
                                )}

                                {/* FILE NAME */}
                                <div className="text-sm text-slate-700 truncate max-w-xs">
                                    {certificate?.name || "Existing Certificate"}
                                </div>

                            </div>

                            <div className="flex items-center gap-3">

                                <a
                                    href={certificatePreview}
                                    target="_blank"
                                    className="text-blue-600 text-sm hover:underline"
                                >
                                    View
                                </a>

                                <button
                                    type="button"
                                    onClick={() => {
                                        setCertificate(null);
                                        setCertificatePreview(null);
                                    }}
                                    className="text-red-600 text-sm hover:underline"
                                >
                                    Remove
                                </button>

                            </div>

                        </div>

                    )}

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