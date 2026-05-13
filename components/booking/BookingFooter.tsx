"use client";

import api from "@/lib/api";
import { getApiError } from "@/lib/util";

import { useRouter } from "next/navigation";

import toast from "react-hot-toast";

import {
    CalendarDays,
    Clock3,
    ShieldCheck,
    X,
} from "lucide-react";

import { useState } from "react";

type BookingFooterProps = {
    slot: {
        id: string;
        startTime: string;
        endTime: string;
    } | null;

    doctorId: string;

    date: Date | undefined;
};

export default function BookingFooter({
    slot,
    doctorId,
    date,
}: BookingFooterProps) {

    const router = useRouter();

    const [loading, setLoading] =
        useState(false);

    const [showLoginModal, setShowLoginModal] =
        useState(false);

    if (!slot || !date) return null;

    const dateLabel =
        date.toLocaleDateString(
            undefined,
            {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
            }
        );

    const startTime =
        new Date(
            slot.startTime
        ).toLocaleTimeString(
            [],
            {
                hour: "2-digit",
                minute: "2-digit",
            }
        );

    const endTime =
        new Date(
            slot.endTime
        ).toLocaleTimeString(
            [],
            {
                hour: "2-digit",
                minute: "2-digit",
            }
        );

    const dateStr = [

        date.getFullYear(),

        String(
            date.getMonth() + 1
        ).padStart(2, "0"),

        String(
            date.getDate()
        ).padStart(2, "0"),

    ].join("-");

    const handleContinue = async () => {

        try {

            setLoading(true);

            await api.post(
                "/appointments/lock-slot",
                {
                    doctorId,
                    slotId: slot.id,
                    date: dateStr,
                }
            );

            router.push(
                `/checkout?doctorId=${doctorId}&date=${dateStr}&slotId=${slot.id}&startTime=${slot.startTime}&endTime=${slot.endTime}`
            );

        } catch (err: any) {

            console.log(err);

            const message =
                getApiError(err);

            // SHOW LOGIN MODAL
            if (

                err?.response?.status === 401 ||

                message === "LOGIN_REQUIRED" ||

                message?.includes("401")

            ) {

                setShowLoginModal(true);

                return;
            }

            toast.error(message);
        } finally {

            setLoading(false);
        }
    };

    return (

        <>

            {/* FOOTER */}
            <div
                className="
        sticky bottom-0 z-20

        border-t border-slate-200

        bg-white/95
        backdrop-blur

        shadow-[0_-4px_20px_rgba(0,0,0,0.04)]
    "
            >

                <div
                    className="
            mx-auto
            max-w-7xl
            px-6 py-4
        "
                >

                    <div
                        className="
                flex flex-col lg:flex-row
                lg:items-center
                lg:justify-between
                gap-5
            "
                    >

                        {/* LEFT */}
                        <div className="space-y-4">

                            {/* HEADER */}
                            <div className="flex items-center gap-2">

                                <div
                                    className="
                            flex h-8 w-8
                            items-center justify-center
                            rounded-full
                            bg-emerald-100
                        "
                                >
                                    <ShieldCheck
                                        size={16}
                                        className="text-emerald-600"
                                    />
                                </div>

                                <div>
                                    <p className="text-sm font-semibold text-slate-900">
                                        Appointment Selected
                                    </p>

                                    <p className="text-xs text-slate-500">
                                        Your consultation slot will be reserved temporarily
                                    </p>
                                </div>

                            </div>

                            {/* DETAILS */}
                            <div className="flex flex-wrap gap-3">

                                {/* DATE */}
                                <div
                                    className="
                            flex items-center gap-3

                            rounded-lg

                            border border-slate-200

                            bg-slate-50

                            px-4 py-3
                        "
                                >

                                    <div
                                        className="
                                flex h-9 w-9
                                items-center justify-center
                                rounded-full
                                bg-teal-100
                            "
                                    >
                                        <CalendarDays
                                            size={16}
                                            className="text-teal-700"
                                        />
                                    </div>

                                    <div className="text-left">
                                        <p className="text-xs text-slate-500">
                                            Appointment Date
                                        </p>

                                        <p className="text-sm font-medium text-slate-800">
                                            {dateLabel}
                                        </p>
                                    </div>

                                </div>

                                {/* TIME */}
                                <div
                                    className="
                            flex items-center gap-3

                            rounded-lg

                            border border-slate-200

                            bg-slate-50

                            px-4 py-3
                        "
                                >

                                    <div
                                        className="
                                flex h-9 w-9
                                items-center justify-center
                                rounded-full
                                bg-indigo-100
                            "
                                    >
                                        <Clock3
                                            size={16}
                                            className="text-indigo-700"
                                        />
                                    </div>

                                    <div className="text-left">
                                        <p className="text-xs text-slate-500">
                                            Consultation Time
                                        </p>

                                        <p className="text-sm font-medium text-slate-800">
                                            {startTime}
                                        </p>
                                    </div>

                                </div>

                            </div>

                        </div>

                        {/* BUTTON */}
                        <button
                            onClick={handleContinue}
                            disabled={loading}
                            className="
                    inline-flex items-center justify-center gap-2

                    rounded-lg

                    bg-[#1F2147]
                    hover:bg-[#151736]

                    disabled:opacity-60

                    px-7 py-3.5

                    text-sm font-semibold text-white

                    shadow-lg shadow-[#1F2147]/10

                    transition-all duration-200
                "
                        >

                            {loading
                                ? "Checking..."
                                : "Continue to Payment"}

                        </button>

                    </div>

                </div>

            </div>

            {/* LOGIN MODAL */}
            {showLoginModal && (

                <div
                    className="
                        fixed inset-0 z-50

                        bg-black/50
                        backdrop-blur-sm

                        flex items-center justify-center

                        p-4
                    "
                >

                    <div
                        className="
                            relative

                            w-full max-w-md

                            rounded-xl

                            border border-slate-200

                            bg-white

                            p-6

                            shadow-2xl
                        "
                    >

                        {/* CLOSE */}
                        <button
                            onClick={() =>
                                setShowLoginModal(false)
                            }

                            className="
                                absolute top-4 right-4

                                h-9 w-9

                                rounded-lg

                                flex items-center justify-center

                                hover:bg-slate-100

                                transition
                            "
                        >

                            <X
                                size={18}
                                className="text-slate-500"
                            />

                        </button>

                        {/* ICON */}
                        <div
                            className="
                                h-14 w-14

                                rounded-full

                                bg-teal-100

                                flex items-center justify-center

                                mx-auto
                            "
                        >

                            <ShieldCheck
                                size={26}
                                className="text-teal-700"
                            />

                        </div>

                        {/* CONTENT */}
                        <div className="mt-5 text-center">

                            <h2 className="text-xl font-semibold text-slate-900">
                                Login Required
                            </h2>

                            <p className="mt-2 text-sm leading-relaxed text-slate-500">
                                Please login to securely
                                reserve your appointment
                                slot and continue with
                                payment.
                            </p>

                        </div>

                        {/* WHY LOGIN */}
                        <div
                            className="
                                mt-5

                                rounded-lg

                                border border-slate-200

                                bg-slate-50

                                p-4
                            "
                        >

                            <p className="text-sm font-medium text-slate-800">
                                Why login?
                            </p>

                            <ul
                                className="
                                    mt-3

                                    space-y-2

                                    text-sm text-slate-600
                                "
                            >

                                <li>
                                    • Secure your appointment slot
                                </li>

                                <li>
                                    • Access prescriptions & history
                                </li>

                                <li>
                                    • Manage reschedules easily
                                </li>

                                <li>
                                    • Receive consultation updates
                                </li>

                            </ul>

                        </div>

                        {/* ACTIONS */}
                        <div className="mt-6 flex gap-3">

                            <button
                                onClick={() =>
                                    setShowLoginModal(false)
                                }

                                className="
                                    flex-1

                                    rounded-lg

                                    border border-slate-200

                                    px-4 py-2.5

                                    text-sm font-medium text-slate-700

                                    hover:bg-slate-50

                                    transition
                                "
                            >
                                Cancel
                            </button>

                            <button
                                onClick={() => {

                                    const redirectUrl =
                                        `/checkout?doctorId=${doctorId}&date=${dateStr}&slotId=${slot.id}&startTime=${slot.startTime}&endTime=${slot.endTime}`;

                                    sessionStorage.setItem(
                                        "afterLoginRedirect",
                                        redirectUrl
                                    );

                                    sessionStorage.setItem(
                                        "loginFrom",
                                        window.location.pathname
                                    );

                                    router.push("/login");
                                }}

                                className="
                                    flex-1

                                    rounded-lg

                                    bg-teal-600
                                    hover:bg-teal-700

                                    px-4 py-2.5

                                    text-sm font-medium text-white

                                    transition
                                "
                            >
                                Login
                            </button>

                        </div>

                    </div>

                </div>

            )}

        </>
    );
}