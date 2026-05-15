"use client";

import { useState } from "react";

import {
    Mail,
    ShieldCheck,
    HeartPulse,
} from "lucide-react";

import Link from "next/link";

import api from "@/lib/api";

import toast from "react-hot-toast";

import { getApiError } from "@/lib/util";

export default function ForgotPassword() {

    const [email, setEmail] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const submit = async (
        e: any
    ) => {

        e.preventDefault();

        if (!email) {

            toast.error(
                "Please enter your email"
            );

            return;
        }

        setLoading(true);

        try {

            const res =
                await api.post(
                    "/auth/forgot-password",
                    { email }
                );

            toast.success(
                res.data.message
            );

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

                <div className="w-full max-w-md rounded-[28px] border border-slate-200 bg-white shadow-xl">

                    {/* Header */}

                    <div className="relative rounded-t-[28px] bg-gradient-to-r from-teal-500 to-cyan-500 px-6 pt-8 pb-16 text-center">

                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-lg">

                            <HeartPulse className="h-8 w-8 text-teal-600" />

                        </div>

                        <h1 className="mt-4 text-2xl font-bold text-white">
                            Forgot Password
                        </h1>

                        <p className="mt-2 text-sm text-white/90">
                            Reset your Healora account password securely.
                        </p>

                    </div>

                    {/* Floating Content */}

                    <div className="relative z-10 -mt-10 px-5 pb-5">

                        <div className="rounded-3xl border border-slate-100 bg-white p-5 shadow-lg">

                            {/* Info Box */}

                            <div className="mb-5 flex items-start gap-3 rounded-2xl bg-teal-50 px-4 py-4">

                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white">

                                    <ShieldCheck className="h-5 w-5 text-teal-600" />

                                </div>

                                <div>

                                    <p className="text-sm font-semibold text-[#1F2147]">
                                        Secure password recovery
                                    </p>

                                    <p className="mt-1 text-sm leading-6 text-slate-600">
                                        Enter your email and we’ll send you a secure password reset link.
                                    </p>

                                </div>

                            </div>

                            {/* FORM */}

                            <form
                                onSubmit={submit}
                                className="space-y-5"
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

                                            value={email}

                                            onChange={(e) =>
                                                setEmail(
                                                    e.target.value
                                                )
                                            }

                                            placeholder="Enter your email"

                                            className="
                                                w-full rounded-2xl border
                                                border-slate-200

                                                py-3 pl-11 pr-4

                                                text-sm

                                                outline-none
                                                transition

                                                placeholder:text-slate-400

                                                focus:border-teal-500
                                                focus:ring-4
                                                focus:ring-teal-100
                                            "
                                        />

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
                                        ? "Sending reset link..."
                                        : "Send Reset Link"}

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