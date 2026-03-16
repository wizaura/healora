"use client";

import { useState } from "react";
import { Mail } from "lucide-react";
import Link from "next/link";
import api from "@/lib/api";
import toast from "react-hot-toast";
import { getApiError } from "@/lib/util";

export default function ForgotPassword() {

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const submit = async (e: any) => {
        e.preventDefault();

        if (!email) {
            toast.error("Please enter your email");
            return;
        }

        setLoading(true);

        try {

            const res = await api.post("/auth/forgot-password", { email });

            toast.success(res.data.message);

        } catch (err: any) {
            toast.error(getApiError(err));
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
                        Forgot your password?
                    </h1>

                    <p className="mt-2 text-sm text-slate-500">
                        Enter your email and we’ll send you a reset link
                    </p>

                </div>

                {/* Form */}

                <form onSubmit={submit} className="space-y-5">

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
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="w-full rounded-lg border border-slate-300 pl-10 pr-4 py-2.5 text-sm focus:border-teal-500 focus:ring-teal-500"
                            />

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
                        {loading ? "Sending..." : "Send Reset Link"}
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