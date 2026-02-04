"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
import { GoogleLogin } from "@react-oauth/google";

export default function Login() {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    const { refreshUser } = useAuth();

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
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
            const res = await api.post("/auth/login", {
                email: form.email,
                password: form.password,
            });

            toast.success("Logged in successfully 👋");
            const user = await refreshUser();

            if (!user) return;

            if (user.role === "ADMIN") {
                router.push("/admin");
            } else if (user.role === "DOCTOR") {
                router.push("/doctor");
            } else {
                router.push("/");
            }
        } catch {
            toast.error("Invalid email or password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 mt-16">
            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">

                {/* Header */}
                <div className="mb-8 text-center">
                    <h1 className="text-2xl font-semibold text-slate-900">
                        Welcome back to Healora
                    </h1>
                    <p className="mt-2 text-sm text-slate-500">
                        Login to manage your appointments and care
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Email */}
                    <div>
                        <label className="text-sm font-medium text-slate-700">
                            Email address
                        </label>
                        <div className="relative mt-1">
                            <Mail
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                size={18}
                            />
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

                    {/* Password */}
                    <div>
                        <label className="text-sm font-medium text-slate-700">
                            Password
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
                                className={`w-full rounded-lg border pl-10 pr-10 py-2.5 text-sm
                                    focus:ring-teal-500
                                    ${errors.password
                                        ? "border-red-400"
                                        : "border-slate-300 focus:border-teal-500"}`}
                            />

                            {/* Eye toggle */}
                            <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute right-3 top-1/2 -translate-y-1/2
                                text-slate-400 hover:text-slate-600"
                                aria-label={showPassword ? "Hide password" : "Show password"}
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

                    {/* Remember + Forgot */}
                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center gap-2 text-slate-600">
                            <input type="checkbox" className="rounded border-slate-300" />
                            Remember me
                        </label>

                        <Link
                            href="/forgot-password"
                            className="text-teal-600 hover:underline"
                        >
                            Forgot password?
                        </Link>
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
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                {/* Divider */}
                <div className="my-6 flex items-center gap-3">
                    <div className="h-px w-full bg-slate-200" />
                    <span className="text-xs text-slate-400">OR</span>
                    <div className="h-px w-full bg-slate-200" />
                </div>

                {/* Google Auth */}
                <GoogleLogin
                    onSuccess={async (credentialResponse) => {
                        try {
                            setLoading(true);

                            await api.post("/auth/google", {
                                token: credentialResponse.credential,
                            });

                            toast.success("Logged in with Google 👋");

                            const user = await refreshUser();
                            if (!user) return;

                            router.push("/");
                        } catch (err) {
                            toast.error("Google login failed");
                        } finally {
                            setLoading(false);
                        }
                    }}
                    onError={() => {
                        toast.error("Google authentication failed");
                    }}
                />

                {/* Footer */}
                <p className="mt-6 text-center text-sm text-slate-500">
                    Don’t have an account?{" "}
                    <Link
                        href="/register"
                        className="font-medium text-teal-600 hover:underline"
                    >
                        Create one
                    </Link>
                </p>
            </div>
        </div>
    );
}
