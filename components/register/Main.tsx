"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Lock, User, EyeOff, Eye, HeartPulse, ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { getApiError } from "@/lib/util";
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "@/lib/auth-context";

export default function Register() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const router = useRouter();

    const { refreshUser } = useAuth();

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

        if (!form.confirmPassword) {
            newErrors.confirmPassword = "Please confirm your password";
        } else if (form.password !== form.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (
        e: React.FormEvent
    ) => {

        e.preventDefault();

        if (!validate()) {

            toast.error(
                "Please fix the errors below"
            );

            return;
        }

        setLoading(true);

        try {

            await api.post(
                "/auth/register",
                {

                    name:
                        form.name,

                    email:
                        form.email,

                    password:
                        form.password,
                }
            );

            toast.success(
                "Account created successfully 🎉"
            );

            /* =========================================
               REFRESH USER
               ========================================= */

            const user =
                await refreshUser();

            if (!user) return;

            /* =========================================
               REDIRECTS
               ========================================= */

            const redirectUrl =
                sessionStorage.getItem(
                    "afterLoginRedirect"
                );

            const loginFrom =
                sessionStorage.getItem(
                    "loginFrom"
                );

            sessionStorage.removeItem(
                "afterLoginRedirect"
            );

            sessionStorage.removeItem(
                "loginFrom"
            );

            /* =========================================
               PRIORITY REDIRECTS
               ========================================= */

            if (redirectUrl) {

                router.replace(
                    redirectUrl
                );

                return;
            }

            if (loginFrom) {

                router.replace(
                    loginFrom
                );

                return;
            }

            /* =========================================
               DEFAULT USER REDIRECT
               ========================================= */

            router.replace("/");

        } catch (err: any) {

            toast.error(
                getApiError(err)
            );

        } finally {

            setLoading(false);
        }
    };

    return (
        <div className="m-4 min-h-screen rounded-2xl bg-gradient-to-b from-wellness-bg via-white to-wellness-bg py-16 md:py-24">

            <div className="flex items-center justify-center px-4">

                <div className="w-full max-w-xl rounded-[28px] border border-slate-200 bg-white shadow-xl">

                    {/* Header */}

                    <div className="relative rounded-t-[28px] bg-gradient-to-r from-teal-500 to-emerald-600 px-6 pt-8 pb-16 text-center">

                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-lg">

                            <HeartPulse className="h-8 w-8 text-emerald-600" />

                        </div>

                        <h1 className="mt-4 text-2xl font-bold text-white">
                            Create Account
                        </h1>

                        <p className="mt-2 text-sm text-white/90">
                            Start your wellness journey with Healora today.
                        </p>

                    </div>

                    {/* Floating Content */}

                    <div className="relative z-10 -mt-10 px-5 pb-5">

                        <div className="rounded-3xl border border-slate-100 bg-white p-5 shadow-lg">

                            {/* Info Box */}

                            <div className="mb-5 flex items-start gap-3 rounded-2xl bg-emerald-50 px-4 py-4">

                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white">

                                    <ShieldCheck className="h-5 w-5 text-emerald-600" />

                                </div>

                                <div>

                                    <p className="text-sm font-semibold text-[#1F2147]">
                                        Secure registration
                                    </p>

                                    <p className="mt-1 text-sm leading-6 text-slate-600">
                                        Your account information is encrypted and securely protected.
                                    </p>

                                </div>

                            </div>

                            {/* FORM */}

                            <form
                                onSubmit={handleSubmit}
                                className="space-y-4"
                            >

                                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                                    {/* NAME */}

                                    <div>

                                        <label className="text-sm font-semibold text-slate-700">
                                            Full name
                                        </label>

                                        <div className="relative mt-2">

                                            <User
                                                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                                size={18}
                                            />

                                            <input
                                                type="text"
                                                value={form.name}
                                                onChange={(e) => {
                                                    setErrors({
                                                        ...errors,
                                                        name: ""
                                                    })
                                                    setForm({
                                                        ...form,
                                                        name: e.target.value,
                                                    })
                                                }}
                                                placeholder="Enter your full name"
                                                className={`
                        w-full rounded-xl border
                        py-3 pl-11 pr-4 text-sm
                        outline-none transition

                        ${errors.name
                                                        ? `
                                border-red-400
                                focus:border-red-400
                                focus:ring-4 focus:ring-red-100
                            `
                                                        : `
                                border-slate-200
                                focus:border-teal-500
                                focus:ring-4 focus:ring-teal-100
                            `
                                                    }
                    `}
                                            />

                                        </div>

                                        {errors.name && (
                                            <p className="mt-1.5 text-xs text-red-500">
                                                {errors.name}
                                            </p>
                                        )}

                                    </div>

                                    {/* EMAIL */}

                                    <div>

                                        <label className="text-sm font-semibold text-slate-700">
                                            Email address
                                        </label>

                                        <div className="relative mt-2">

                                            <Mail
                                                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                                size={18}
                                            />

                                            <input
                                                type="email"
                                                value={form.email}
                                                onChange={(e) => {
                                                    setErrors({
                                                        ...errors,
                                                        email: ""
                                                    })
                                                    setForm({
                                                        ...form,
                                                        email: e.target.value,
                                                    })
                                                }}
                                                placeholder="Enter your email"
                                                className={`
                        w-full rounded-xl border
                        py-3 pl-11 pr-4 text-sm
                        outline-none transition

                        ${errors.email
                                                        ? `
                                border-red-400
                                focus:border-red-400
                                focus:ring-4 focus:ring-red-100
                            `
                                                        : `
                                border-slate-200
                                focus:border-teal-500
                                focus:ring-4 focus:ring-teal-100
                            `
                                                    }
                    `}
                                            />

                                        </div>

                                        {errors.email && (
                                            <p className="mt-1.5 text-xs text-red-500">
                                                {errors.email}
                                            </p>
                                        )}

                                    </div>

                                    {/* PASSWORD */}

                                    <div>

                                        <label className="text-sm font-semibold text-slate-700">
                                            Password
                                        </label>

                                        <div className="relative mt-2">

                                            <Lock
                                                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                                size={18}
                                            />

                                            <input
                                                type={
                                                    showPassword
                                                        ? "text"
                                                        : "password"
                                                }
                                                value={form.password}
                                                onChange={(e) => {
                                                    setErrors({
                                                        ...errors,
                                                        password: ""
                                                    })
                                                    setForm({
                                                        ...form,
                                                        password: e.target.value,
                                                    })
                                                }}
                                                placeholder="Create a password"
                                                className={`
                        w-full rounded-xl border
                        py-3 pl-11 pr-11 text-sm
                        outline-none transition

                        ${errors.password
                                                        ? `
                                border-red-400
                                focus:border-red-400
                                focus:ring-4 focus:ring-red-100
                            `
                                                        : `
                                border-slate-200
                                focus:border-teal-500
                                focus:ring-4 focus:ring-teal-100
                            `
                                                    }
                    `}
                                            />

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setShowPassword(
                                                        (prev) => !prev
                                                    )
                                                }
                                                className="
                        absolute right-4 top-1/2
                        -translate-y-1/2
                        text-slate-400 transition
                        hover:text-slate-600
                    "
                                            >

                                                {showPassword ? (
                                                    <EyeOff size={18} />
                                                ) : (
                                                    <Eye size={18} />
                                                )}

                                            </button>

                                        </div>

                                        {errors.password && (
                                            <p className="mt-1.5 text-xs text-red-500">
                                                {errors.password}
                                            </p>
                                        )}

                                    </div>

                                    {/* CONFIRM PASSWORD */}

                                    <div>

                                        <label className="text-sm font-semibold text-slate-700">
                                            Confirm password
                                        </label>

                                        <div className="relative mt-2">

                                            <Lock
                                                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                                size={18}
                                            />

                                            <input
                                                type={
                                                    showConfirm
                                                        ? "text"
                                                        : "password"
                                                }
                                                value={form.confirmPassword}
                                                onChange={(e) => {
                                                    setErrors({
                                                        ...errors,
                                                        confirmPassword: ""
                                                    })
                                                    setForm({
                                                        ...form,
                                                        confirmPassword:
                                                            e.target.value,
                                                    })
                                                }}
                                                placeholder="Confirm your password"
                                                className={`
                        w-full rounded-xl border
                        py-3 pl-11 pr-11 text-sm
                        outline-none transition

                        ${errors.confirmPassword
                                                        ? `
                                border-red-400
                                focus:border-red-400
                                focus:ring-4 focus:ring-red-100
                            `
                                                        : `
                                border-slate-200
                                focus:border-teal-500
                                focus:ring-4 focus:ring-teal-100
                            `
                                                    }
                    `}
                                            />

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setShowConfirm(
                                                        (prev) => !prev
                                                    )
                                                }
                                                className="
                        absolute right-4 top-1/2
                        -translate-y-1/2
                        text-slate-400 transition
                        hover:text-slate-600
                    "
                                            >

                                                {showConfirm ? (
                                                    <EyeOff size={18} />
                                                ) : (
                                                    <Eye size={18} />
                                                )}

                                            </button>

                                        </div>

                                        {errors.confirmPassword && (
                                            <p className="mt-1.5 text-xs text-red-500">
                                                {errors.confirmPassword}
                                            </p>
                                        )}

                                    </div>

                                </div>

                                {/* SUBMIT */}

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`
            w-full rounded-2xl py-3.5
            text-sm font-semibold text-white
            transition-all

            ${loading
                                            ? `
                    cursor-not-allowed
                    bg-teal-400
                `
                                            : `
                    bg-gradient-to-r
                    from-teal-600
                    to-emerald-600

                    hover:scale-[1.01]

                    hover:shadow-lg
                    hover:shadow-teal-100
                `
                                        }
        `}
                                >

                                    {loading
                                        ? "Creating account..."
                                        : "Create account"}

                                </button>

                            </form>

                        </div>

                        {/* Divider */}

                        <div className="my-6 flex items-center gap-3">

                            <div className="h-px w-full bg-slate-200" />

                            <span className="text-xs font-medium text-slate-400">
                                OR
                            </span>

                            <div className="h-px w-full bg-slate-200" />

                        </div>

                        {/* GOOGLE */}

                        <div className="overflow-hidden rounded-2xl">

                            <GoogleLogin
                                onSuccess={async (
                                    credentialResponse
                                ) => {

                                    try {

                                        setLoading(true);

                                        await api.post(
                                            "/auth/google",
                                            {
                                                token:
                                                    credentialResponse.credential,
                                            }
                                        );

                                        toast.success(
                                            "Logged in with Google 👋"
                                        );

                                        const user =
                                            await refreshUser();

                                        if (!user) return;

                                        router.push("/");

                                    } catch {

                                        toast.error(
                                            "Google login failed"
                                        );

                                    } finally {

                                        setLoading(false);
                                    }
                                }}

                                onError={() => {
                                    toast.error(
                                        "Google authentication failed"
                                    );
                                }}
                            />

                        </div>

                        {/* FOOTER */}

                        <p className="mt-7 text-center text-sm text-slate-500">

                            Already have an account?{" "}

                            <Link
                                href="/login"
                                className="
                                font-semibold
                                text-teal-600
                                hover:text-teal-700
                            "
                            >
                                Login
                            </Link>

                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
}