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

            toast.success(`Doctor created successfully`);

            toast(
                `Temporary password for ${doctor.name}: ${tempPassword}`,
                {
                    duration: 8000,
                }
            );

            setTimeout(() => {
                router.push("/admin/doctors");
            }, 1500);

        } catch (err: any) {
            toast.error(
                typeof err === "string"
                    ? err
                    : "Failed to create doctor"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-xl p-8">
            {/* Back */}
            <Link
                href="/admin"
                className="mb-6 inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900"
            >
                <ArrowLeft size={16} />
                Back to Dashboard
            </Link>

            <h1 className="mb-6 text-2xl font-semibold text-slate-900">
                Add Doctor
            </h1>

            <form onSubmit={handleSubmit} className="space-y-5">

                {/* Name */}
                <div>
                    <label className="text-sm font-medium text-slate-700">
                        Doctor Name
                    </label>
                    <div className="relative mt-1">
                        <User
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                        />
                        <input
                            type="text"
                            className="w-full rounded-lg border border-slate-300 pl-10 pr-4 py-2.5 text-sm
                            focus:border-teal-500 focus:ring-teal-500"
                            placeholder="Dr. John Doe"
                            value={form.name}
                            onChange={(e) =>
                                setForm({ ...form, name: e.target.value })
                            }
                        />
                    </div>
                </div>

                {/* Email */}
                <div>
                    <label className="text-sm font-medium text-slate-700">
                        Email Address
                    </label>
                    <div className="relative mt-1">
                        <Mail
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                        />
                        <input
                            type="email"
                            className="w-full rounded-lg border border-slate-300 pl-10 pr-4 py-2.5 text-sm
                            focus:border-teal-500 focus:ring-teal-500"
                            placeholder="doctor@healora.com"
                            value={form.email}
                            onChange={(e) =>
                                setForm({ ...form, email: e.target.value })
                            }
                        />
                    </div>
                </div>

                {/* Speciality */}
                <div>
                    <label className="text-sm font-medium text-slate-700">
                        Speciality
                    </label>
                    <div className="relative mt-1">
                        <Stethoscope
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                        />
                        <input
                            type="text"
                            className="w-full rounded-lg border border-slate-300 pl-10 pr-4 py-2.5 text-sm
                            focus:border-teal-500 focus:ring-teal-500"
                            placeholder="Cardiology"
                            value={form.speciality}
                            onChange={(e) =>
                                setForm({ ...form, speciality: e.target.value })
                            }
                        />
                    </div>
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-xl bg-teal-600 py-3
                    text-sm font-semibold text-white
                    transition hover:bg-teal-700 disabled:opacity-60"
                >
                    {loading ? "Creating..." : "Create Doctor"}
                </button>
            </form>
        </div>
    );
}
