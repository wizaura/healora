"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { ArrowLeft, User, Mail, Stethoscope } from "lucide-react";
import api from "@/lib/api";

export default function AddDoctorPage() {
    const router = useRouter();

    const [form, setForm] = useState({
        name: "",
        email: "",
        speciality: "",
    });

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!form.name || !form.email || !form.speciality) {
            toast.error("All fields are required");
            return;
        }

        try {
            setLoading(true);

            const res = await api.post("/admin/doctors", {
                name: form.name,
                email: form.email,
                speciality: form.speciality,
            });

            const { doctor, tempPassword } = res.data;

            toast.success("Doctor created successfully");

            toast(
                `Temporary password for ${doctor.name}: ${tempPassword}`,
                { duration: 8000 }
            );

            setTimeout(() => {
                router.push("/admin/doctors");
            }, 1500);

        } catch {
            toast.error("Failed to create doctor");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mx-auto max-w-xl p-8 pt-24">
            {/* Back */}
            <Link
                href="/admin/doctors"
                className="mb-6 inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900"
            >
                <ArrowLeft size={16} />
                Back to Doctors
            </Link>

            {/* Card */}
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
                {/* Header */}
                <div className="border-b border-slate-200 px-6 py-5">
                    <h1 className="text-xl font-semibold text-slate-900">
                        Add Doctor
                    </h1>
                    <p className="mt-1 text-sm text-slate-500">
                        Create a doctor account and assign speciality
                    </p>
                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="space-y-5 px-6 py-6"
                >
                    {/* Name */}
                    <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700">
                            Doctor Name
                        </label>
                        <div className="relative">
                            <User
                                size={18}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                            />
                            <input
                                type="text"
                                placeholder="Dr. John Doe"
                                value={form.name}
                                onChange={(e) =>
                                    setForm({ ...form, name: e.target.value })
                                }
                                className="
                                    w-full rounded-xl border border-slate-300
                                    bg-white px-10 py-2.5 text-sm
                                    transition
                                    focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20
                                "
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700">
                            Email Address
                        </label>
                        <div className="relative">
                            <Mail
                                size={18}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                            />
                            <input
                                type="email"
                                placeholder="doctor@healora.com"
                                value={form.email}
                                onChange={(e) =>
                                    setForm({ ...form, email: e.target.value })
                                }
                                className="
                                    w-full rounded-xl border border-slate-300
                                    bg-white px-10 py-2.5 text-sm
                                    transition
                                    focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20
                                "
                            />
                        </div>
                    </div>

                    {/* Speciality */}
                    <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700">
                            Speciality
                        </label>
                        <div className="relative">
                            <Stethoscope
                                size={18}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                            />
                            <input
                                type="text"
                                placeholder="Cardiology"
                                value={form.speciality}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        speciality: e.target.value,
                                    })
                                }
                                className="
                                    w-full rounded-xl border border-slate-300
                                    bg-white px-10 py-2.5 text-sm
                                    transition
                                    focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20
                                "
                            />
                        </div>
                        <p className="mt-1 text-xs text-slate-400">
                            Must match an existing speciality
                        </p>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="
                            mt-4 w-full rounded-xl
                            bg-teal-600 py-3
                            text-sm font-semibold text-white
                            transition
                            hover:bg-teal-700 hover:shadow-md
                            active:scale-[0.99]
                            disabled:opacity-60
                        "
                    >
                        {loading ? "Creating Doctor..." : "Create Doctor"}
                    </button>
                </form>
            </div>
        </div>
    );
}
