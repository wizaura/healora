"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, Stethoscope } from "lucide-react";
import toast from "react-hot-toast";

export default function DoctorLogin() {
    const [form, setForm] = useState({
        email: "",
        password: "",
        regId: "",
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const validate = () => {
        const newErrors: Record<string, string> = {};

        if (!form.email) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            newErrors.email = "Enter a valid email address";
        }

        if (!form.password) {
            newErrors.password = "Password is required";
        }

        if (!form.regId) {
            newErrors.regId = "Medical registration ID is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validate()) {
            toast.error("Please fix the errors below");
            return;
        }

        setLoading(true);

        try {
            // simulate hosted auth
            await new Promise((res) => setTimeout(res, 1400));

            toast.success("Welcome back, Doctor 👩‍⚕️👨‍⚕️");
            // later → router.push("/doctor/dashboard")
        } catch {
            toast.error("Invalid credentials");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 mt-16">
            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">

                {/* Header */}
                <div className="mb-8 text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center
                        rounded-xl bg-teal-100 text-teal-600">
                        <Stethoscope size={22} />
                    </div>

                    <h1 className="text-2xl font-semibold text-slate-900">
                        Doctor Login
                    </h1>

                    <p className="mt-2 text-sm text-slate-500">
                        Secure access to your Healora doctor dashboard
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Email */}
                    <div>
                        <label className="text-sm font-medium text-slate-700">
                            Work email
                        </label>
                        <div className="relative mt-1">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input
                                type="email"
                                value={form.email}
                                onChange={(e) =>
                                    setForm({ ...form, email: e.target.value })
                                }
                                className={`w-full rounded-lg border pl-10 pr-4 py-2.5 text-sm
                                focus:ring-teal-500
                                ${errors.email
                                        ? "border-red-400"
                                        : "border-slate-300 focus:border-teal-500"}`}
                            />
                        </div>
                        {errors.email && (
                            <p className="mt-1 text-xs text-red-500">
                                {errors.email}
                            </p>
                        )}
                    </div>

                    {/* Registration ID */}
                    <div>
                        <label className="text-sm font-medium text-slate-700">
                            Medical registration ID
                        </label>
                        <input
                            type="text"
                            value={form.regId}
                            onChange={(e) =>
                                setForm({ ...form, regId: e.target.value })
                            }
                            placeholder="e.g. GMC / MCI / NMC ID"
                            className={`mt-1 w-full rounded-lg border px-4 py-2.5 text-sm
                            focus:ring-teal-500
                            ${errors.regId
                                    ? "border-red-400"
                                    : "border-slate-300 focus:border-teal-500"}`}
                        />
                        {errors.regId && (
                            <p className="mt-1 text-xs text-red-500">
                                {errors.regId}
                            </p>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="text-sm font-medium text-slate-700">
                            Password
                        </label>

                        <div className="relative mt-1">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />

                            <input
                                type={showPassword ? "text" : "password"}
                                value={form.password}
                                onChange={(e) =>
                                    setForm({ ...form, password: e.target.value })
                                }
                                className={`w-full rounded-lg border pl-10 pr-10 py-2.5 text-sm
                                focus:ring-teal-500
                                ${errors.password
                                        ? "border-red-400"
                                        : "border-slate-300 focus:border-teal-500"}`}
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword((p) => !p)}
                                className="absolute right-3 top-1/2 -translate-y-1/2
                                text-slate-400 hover:text-slate-600"
                                aria-label="Toggle password visibility"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>

                        {errors.password && (
                            <p className="mt-1 text-xs text-red-500">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full rounded-lg py-3 text-sm font-semibold text-white
                        transition
                        ${loading
                                ? "bg-teal-400 cursor-not-allowed"
                                : "bg-teal-600 hover:bg-teal-700"}`}
                    >
                        {loading ? "Signing in..." : "Login as Doctor"}
                    </button>
                </form>

                {/* Footer */}
                <p className="mt-6 text-center text-sm text-slate-500">
                    Not onboarded yet?{" "}
                    <Link
                        href="/contact"
                        className="font-medium text-teal-600 hover:underline"
                    >
                        Contact Healora
                    </Link>
                </p>
            </div>
        </div>
    );
}
