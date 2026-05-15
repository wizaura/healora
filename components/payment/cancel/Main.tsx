"use client";

import { useRouter } from "next/navigation";
import {
    CircleX,
    ArrowLeft,
    House,
    ShieldAlert,
} from "lucide-react";

export default function PaymentCancel() {
    const router = useRouter();

    return (
        <div className="m-4 rounded-2xl bg-gradient-to-b from-wellness-bg via-white to-wellness-bg py-24">

            <div className="flex items-center justify-center px-4">

                {/* Main Card */}

                <div className="w-full max-w-md rounded-[28px] border border-slate-200 bg-white shadow-xl">

                    {/* Top Section */}

                    <div className="relative rounded-t-[28px] bg-gradient-to-r from-red-500 to-rose-500 px-6 pt-8 pb-16 text-center">

                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-lg">
                            <CircleX className="h-8 w-8 text-red-500" />
                        </div>

                        <h1 className="mt-4 text-2xl font-bold text-white">
                            Payment Cancelled
                        </h1>

                        <p className="mt-2 text-sm text-white/90">
                            Your appointment booking was not completed.
                        </p>

                    </div>

                    {/* Floating Content */}

                    <div className="relative z-10 -mt-10 px-5 pb-5">

                        <div className="rounded-3xl border border-slate-100 bg-white p-5 shadow-lg">

                            <div className="flex items-start gap-3 rounded-2xl bg-red-50 px-4 py-4">

                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white">
                                    <ShieldAlert className="h-5 w-5 text-red-500" />
                                </div>

                                <div>
                                    <p className="text-sm font-semibold text-[#1F2147]">
                                        Slot not confirmed
                                    </p>

                                    <p className="mt-1 text-sm leading-6 text-slate-600">
                                        The payment was cancelled before completion.
                                        You can retry the payment or choose another
                                        available consultation slot.
                                    </p>
                                </div>

                            </div>

                        </div>

                        {/* Buttons */}

                        <div className="mt-5 space-y-3">

                            <button
                                onClick={() => router.back()}
                                className="
                                    group flex w-full items-center justify-center gap-2
                                    rounded-2xl bg-[#1F2147]
                                    px-6 py-3.5 text-sm font-semibold text-white
                                    transition hover:bg-[#181A3A]
                                "
                            >
                                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />

                                Try Again
                            </button>

                            <button
                                onClick={() => router.push("/")}
                                className="
                                    flex w-full items-center justify-center gap-2
                                    rounded-2xl border border-slate-200
                                    bg-white px-6 py-3.5 text-sm font-medium
                                    text-slate-700 transition hover:bg-slate-50
                                "
                            >
                                <House className="h-4 w-4" />

                                Go Home
                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}