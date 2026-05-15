"use client";

import {
    useSearchParams,
    useRouter,
} from "next/navigation";

import { useState } from "react";

import {
    Lock,
    Eye,
    EyeOff,
    ShieldCheck,
    HeartPulse,
} from "lucide-react";

import api from "@/lib/api";

import toast from "react-hot-toast";

import Link from "next/link";

import { getApiError } from "@/lib/util";

export default function ResetPassword() {

    const params =
        useSearchParams();

    const router =
        useRouter();

    const token =
        params.get("token");

    const [form, setForm] =
        useState({
            password: "",
            confirmPassword: "",
        });

    const [showPassword,
        setShowPassword] =
        useState(false);

    const [showConfirm,
        setShowConfirm] =
        useState(false);

    const [loading,
        setLoading] =
        useState(false);

    const submit = async (
        e: any
    ) => {

        e.preventDefault();

        if (!form.password) {

            toast.error(
                "Password is required"
            );

            return;
        }

        if (
            form.password.length < 6
        ) {

            toast.error(
                "Password must be at least 6 characters"
            );

            return;
        }

        if (
            form.password !==
            form.confirmPassword
        ) {

            toast.error(
                "Passwords do not match"
            );

            return;
        }

        setLoading(true);

        try {

            await api.post(
                "/auth/reset-password",
                {
                    token,
                    password:
                        form.password,
                }
            );

            toast.success(
                "Password reset successful"
            );

            router.push("/login");

        } catch (err: any) {

            toast.error(
                getApiError(err)
            );

        } finally {

            setLoading(false);
        }
    };

    /* INVALID TOKEN */

    if (!token) {

        return (

            <div className="m-4 min-h-screen rounded-2xl bg-gradient-to-b from-wellness-bg via-white to-wellness-bg py-16 md:py-24">

                <div className="flex items-center justify-center px-4">

                    <div className="w-full max-w-md rounded-[28px] border border-slate-200 bg-white shadow-xl">

                        {/* Header */}

                        <div className="relative rounded-t-[28px] bg-gradient-to-r from-red-500 to-rose-500 px-6 pt-8 pb-16 text-center">

                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-lg">

                                <ShieldCheck className="h-8 w-8 text-red-500" />

                            </div>

                            <h1 className="mt-4 text-2xl font-bold text-white">
                                Invalid Reset Link
                            </h1>

                            <p className="mt-2 text-sm text-white/90">
                                This password reset link is invalid or has expired.
                            </p>

                        </div>

                        {/* Floating */}

                        <div className="relative z-10 -mt-10 px-5 pb-5">

                            <div className="rounded-3xl border border-slate-100 bg-white p-6 text-center shadow-lg">

                                <p className="text-sm leading-6 text-slate-600">
                                    Please request a new password reset link to continue securely.
                                </p>

                                <Link
                                    href="/forgot-password"
                                    className="
                                        mt-5 inline-flex items-center justify-center

                                        rounded-2xl

                                        bg-gradient-to-r
                                        from-red-500
                                        to-rose-500

                                        px-5 py-3

                                        text-sm font-semibold text-white

                                        transition

                                        hover:scale-[1.02]
                                    "
                                >
                                    Request New Link
                                </Link>

                            </div>

                        </div>

                    </div>

                </div>

            </div>
        );
    }

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
                            Reset Password
                        </h1>

                        <p className="mt-2 text-sm text-white/90">
                            Create a strong new password for your Healora account.
                        </p>

                    </div>

                    {/* Floating Content */}

                    <div className="relative z-10 -mt-10 px-5 pb-5">

                        <div className="rounded-3xl border border-slate-100 bg-white p-5 shadow-lg">

                            {/* Info */}

                            <div className="mb-5 flex items-start gap-3 rounded-2xl bg-teal-50 px-4 py-4">

                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white">

                                    <ShieldCheck className="h-5 w-5 text-teal-600" />

                                </div>

                                <div>

                                    <p className="text-sm font-semibold text-[#1F2147]">
                                        Secure password update
                                    </p>

                                    <p className="mt-1 text-sm leading-6 text-slate-600">
                                        Choose a strong password to keep your Healora account secure.
                                    </p>

                                </div>

                            </div>

                            {/* FORM */}

                            <form
                                onSubmit={submit}
                                className="space-y-5"
                            >

                                {/* PASSWORD */}

                                <div>

                                    <label className="text-sm font-semibold text-slate-700">
                                        New password
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

                                            value={
                                                form.password
                                            }

                                            onChange={(e) =>
                                                setForm({
                                                    ...form,
                                                    password:
                                                        e.target.value,
                                                })
                                            }

                                            placeholder="Enter new password"

                                            className="
                                                w-full rounded-2xl border
                                                border-slate-200

                                                py-3 pl-11 pr-11

                                                text-sm

                                                outline-none
                                                transition

                                                placeholder:text-slate-400

                                                focus:border-teal-500
                                                focus:ring-4
                                                focus:ring-teal-100
                                            "
                                        />

                                        <button
                                            type="button"

                                            onClick={() =>
                                                setShowPassword(
                                                    !showPassword
                                                )
                                            }

                                            className="
                                                absolute right-4 top-1/2
                                                -translate-y-1/2

                                                text-slate-400
                                                transition

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

                                </div>

                                {/* CONFIRM */}

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

                                            value={
                                                form.confirmPassword
                                            }

                                            onChange={(e) =>
                                                setForm({
                                                    ...form,
                                                    confirmPassword:
                                                        e.target.value,
                                                })
                                            }

                                            placeholder="Confirm your password"

                                            className="
                                                w-full rounded-2xl border
                                                border-slate-200

                                                py-3 pl-11 pr-11

                                                text-sm

                                                outline-none
                                                transition

                                                placeholder:text-slate-400

                                                focus:border-teal-500
                                                focus:ring-4
                                                focus:ring-teal-100
                                            "
                                        />

                                        <button
                                            type="button"

                                            onClick={() =>
                                                setShowConfirm(
                                                    !showConfirm
                                                )
                                            }

                                            className="
                                                absolute right-4 top-1/2
                                                -translate-y-1/2

                                                text-slate-400
                                                transition

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
                                        ? "Resetting password..."
                                        : "Reset Password"}

                                </button>

                            </form>

                        </div>

                        {/* Footer */}

                        <p className="mt-7 text-center text-sm text-slate-500">

                            Remember your password?{" "}

                            <Link
                                href="/login"
                                className="
                                    font-semibold
                                    text-teal-600
                                    hover:text-teal-700
                                "
                            >
                                Back to login
                            </Link>

                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
}