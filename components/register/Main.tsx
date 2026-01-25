"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Lock, User, EyeOff, Eye } from "lucide-react";
import toast from "react-hot-toast";

export default function Register() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const validate = () => {
        const newErrors: Record<string, string> = {};

        if (!form.name.trim()) {
            newErrors.name = "Full name is required";
        }

        if (!form.email) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            newErrors.email = "Enter a valid email address";
        }

        if (!form.password) {
            newErrors.password = "Password is required";
        } else if (form.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters";
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
            // fake delay to feel hosted
            await new Promise((res) => setTimeout(res, 1500));

            toast.success("Account created successfully 🎉");
            setForm({ name: "", email: "", password: "" });

            // later → router.push("/login")
        } catch {
            toast.error("Something went wrong. Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 mt-20">
            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">

                {/* Header */}
                <div className="mb-8 text-center">
                    <h1 className="text-2xl font-semibold text-slate-900">
                        Create your Healora account
                    </h1>
                    <p className="mt-2 text-sm text-slate-500">
                        Book doctors, manage appointments, stay healthy
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Name */}
                    <div>
                        <label className="text-sm font-medium text-slate-700">
                            Full name
                        </label>
                        <div className="relative mt-1">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input
                                type="text"
                                value={form.name}
                                onChange={(e) =>
                                    setForm({ ...form, name: e.target.value })
                                }
                                className={`w-full rounded-lg border pl-10 pr-4 py-2.5 text-sm
                                    focus:ring-teal-500
                                    ${errors.name ? "border-red-400" : "border-slate-300 focus:border-teal-500"}`}
                            />
                        </div>
                        {errors.name && (
                            <p className="mt-1 text-xs text-red-500">{errors.name}</p>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="text-sm font-medium text-slate-700">
                            Email address
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
                                    ${errors.email ? "border-red-400" : "border-slate-300 focus:border-teal-500"}`}
                            />
                        </div>
                        {errors.email && (
                            <p className="mt-1 text-xs text-red-500">{errors.email}</p>
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
                        {loading ? "Creating account..." : "Create account"}
                    </button>
                </form>

                {/* Divider */}
                <div className="my-6 flex items-center gap-3">
                    <div className="h-px w-full bg-slate-200" />
                    <span className="text-xs text-slate-400">OR</span>
                    <div className="h-px w-full bg-slate-200" />
                </div>

                {/* Google */}
                <button
                    onClick={() => toast("Google auth coming soon")}
                    className="flex w-full items-center justify-center gap-3 rounded-lg
                    border border-slate-300 py-2.5 text-sm font-medium text-slate-700
                    hover:bg-slate-50"
                >
                    <img src="/google.svg" alt="Google" className="h-5 w-5" />
                    Sign up with Google
                </button>

                {/* Footer */}
                <p className="mt-6 text-center text-sm text-slate-500">
                    Already have an account?{" "}
                    <Link href="/login" className="font-medium text-teal-600 hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}
