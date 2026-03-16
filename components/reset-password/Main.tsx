"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";
import api from "@/lib/api";
import toast from "react-hot-toast";
import Link from "next/link";
import { getApiError } from "@/lib/util";

export default function ResetPassword() {

    const params = useSearchParams();
    const router = useRouter();

    const token = params.get("token");

    const [form, setForm] = useState({
        password: "",
        confirmPassword: ""
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [loading, setLoading] = useState(false);

    const submit = async (e: any) => {

        e.preventDefault();

        if (!form.password) {
            toast.error("Password is required");
            return;
        }

        if (form.password.length < 6) {
            toast.error("Password must be at least 6 characters");
            return;
        }

        if (form.password !== form.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        setLoading(true);

        try {

            await api.post("/auth/reset-password", {
                token,
                password: form.password
            });

            toast.success("Password reset successful");

            router.push("/login");

        } catch (err: any) {
            toast.error(getApiError(err));
        } finally {
            setLoading(false);
        }
    };

    if (!token) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 mt-16">

                <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg text-center">

                    <h1 className="text-xl font-semibold text-slate-900">
                        Invalid reset link
                    </h1>

                    <p className="mt-2 text-sm text-slate-500">
                        This password reset link is invalid or has expired.
                    </p>

                    <Link
                        href="/forgot-password"
                        className="inline-block mt-6 text-teal-600 font-medium hover:underline"
                    >
                        Request a new reset link
                    </Link>

                </div>

            </div>
        );
    }

    return (

        <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 mt-16">

            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">

                {/* Header */}

                <div className="mb-8 text-center">

                    <h1 className="text-2xl font-semibold text-slate-900">
                        Reset your password
                    </h1>

                    <p className="mt-2 text-sm text-slate-500">
                        Enter a new password for your account
                    </p>

                </div>

                {/* Form */}

                <form onSubmit={submit} className="space-y-5">

                    {/* Password */}

                    <div>

                        <label className="text-sm font-medium text-slate-700">
                            New Password
                        </label>

                        <div className="relative mt-1">

                            <Lock
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                size={18}
                            />

                            <input
                                type={showPassword ? "text" : "password"}
                                value={form.password}
                                onChange={(e) =>
                                    setForm({ ...form, password: e.target.value })
                                }
                                className="w-full rounded-lg border border-slate-300 pl-10 pr-10 py-2.5 text-sm focus:border-teal-500 focus:ring-teal-500"
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>

                        </div>

                    </div>


                    {/* Confirm Password */}

                    <div>

                        <label className="text-sm font-medium text-slate-700">
                            Confirm Password
                        </label>

                        <div className="relative mt-1">

                            <Lock
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                size={18}
                            />

                            <input
                                type={showConfirm ? "text" : "password"}
                                value={form.confirmPassword}
                                onChange={(e) =>
                                    setForm({ ...form, confirmPassword: e.target.value })
                                }
                                className="w-full rounded-lg border border-slate-300 pl-10 pr-10 py-2.5 text-sm focus:border-teal-500 focus:ring-teal-500"
                            />

                            <button
                                type="button"
                                onClick={() => setShowConfirm(!showConfirm)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                            >
                                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>

                        </div>

                    </div>


                    {/* Submit */}

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full rounded-lg py-3 text-sm font-semibold text-white transition
                        ${loading
                                ? "bg-teal-400 cursor-not-allowed"
                                : "bg-teal-600 hover:bg-teal-700"
                            }`}
                    >
                        {loading ? "Resetting..." : "Reset Password"}
                    </button>

                </form>


                {/* Footer */}

                <p className="mt-6 text-center text-sm text-slate-500">

                    Remember your password?{" "}

                    <Link
                        href="/login"
                        className="font-medium text-teal-600 hover:underline"
                    >
                        Back to login
                    </Link>

                </p>

            </div>

        </div>
    );
}