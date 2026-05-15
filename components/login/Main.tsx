"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, ShieldCheck, HeartPulse } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
import { GoogleLogin } from "@react-oauth/google";
import { getApiError } from "@/lib/util";

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
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
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
                timezone: timezone
            });

            toast.success("Logged in successfully 👋");
            const user = await refreshUser();

            if (!user) return;

            const redirectUrl =
                sessionStorage.getItem(
                    "afterLoginRedirect"
                );

            const loginFrom =
                sessionStorage.getItem(
                    "loginFrom"
                );

            // clear storage
            sessionStorage.removeItem(
                "afterLoginRedirect"
            );

            sessionStorage.removeItem(
                "loginFrom"
            );

            if (redirectUrl) {

                router.replace(redirectUrl);

                return;
            }

            if (loginFrom) {

                router.replace(loginFrom);

                return;
            }

            if (user.role === "ADMIN") {

                router.replace("/admin");

            } else if (user.role === "DOCTOR") {

                router.replace("/doctor");

            } else {

                router.replace("/");
            }
        } catch (err: any) {
            toast.error(getApiError(err));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="m-4 min-h-screen rounded-2xl bg-gradient-to-b from-wellness-bg via-white to-wellness-bg py-16 md:py-24">

            <div className="flex items-center justify-center px-4">

                <div className="w-full max-w-md rounded-[28px] border border-slate-200 bg-white shadow-xl">

                    {/* Header */}

                    <div className="relative rounded-t-[28px] bg-gradient-to-r from-teal-500 to-cyan-500 px-6 pt-8 pb-16 text-center">

                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-lg">

                            <HeartPulse className="h-8 w-8 text-teal-600" />

                        </div>

                        <h1 className="mt-4 text-2xl font-bold text-white">
                            Welcome Back
                        </h1>

                        <p className="mt-2 text-sm text-white/90">
                            Login to continue your wellness journey with Healora.
                        </p>

                    </div>

                    {/* Floating Content */}

                    <div className="relative z-10 -mt-10 px-5 pb-5">

                        <div className="rounded-3xl border border-slate-100 bg-white p-5 shadow-lg">

                            {/* FORM */}

                            <form
                                onSubmit={handleSubmit}
                                className="space-y-5 mt-3"
                            >

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
                                            }
                                            }
                                            placeholder="Enter your email"
                                            className={`
                                            w-full rounded-2xl border
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
                                            }
                                            }
                                            placeholder="Enter your password"
                                            className={`
                                            w-full rounded-2xl border
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

                                {/* Forgot */}

                                <div className="flex items-center justify-end">

                                    <Link
                                        href="/forgot-password"
                                        className="
                                        inline-flex items-center gap-2

                                        rounded-full

                                        bg-teal-50

                                        px-4 py-2

                                        text-sm font-medium

                                        text-teal-700

                                        transition

                                        hover:bg-teal-100
                                    "
                                    >
                                        Forgot password?
                                    </Link>

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
                                            to-cyan-600

                                            hover:scale-[1.01]

                                            hover:shadow-lg
                                            hover:shadow-teal-100
                                        `
                                        }
                                `}
                                >

                                    {loading
                                        ? "Logging in..."
                                        : "Login"}

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

                            Don’t have an account?{" "}

                            <Link
                                href="/register"
                                className="
                                font-semibold
                                text-teal-600
                                hover:text-teal-700
                            "
                            >
                                Create one
                            </Link>

                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
}
