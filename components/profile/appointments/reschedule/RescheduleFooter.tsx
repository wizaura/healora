"use client";

import api from "@/lib/api";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import {
    CalendarDays,
    Clock3,
    CheckCircle2,
} from "lucide-react";

import { useState } from "react";
import { getApiError } from "@/lib/util";

export default function RescheduleFooter({
    appointmentId,
    slot,
    doctorId,
    date,
}: any) {

    const router = useRouter();

    const [loading, setLoading] =
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

    const handleReschedule = async () => {

        try {

            setLoading(true);

            await api.post(
                `/appointments/${appointmentId}/reschedule`,
                {
                    slotId: slot.id,
                    date: dateStr,
                }
            );

            toast.success(
                "Appointment rescheduled"
            );

            router.push(
                "/profile/appointments"
            );

        } catch(err) {

            toast.error(getApiError(err));

        } finally {

            setLoading(false);
        }
    };

    return (

        <div
            className="
                sticky bottom-0 z-30

                mx-auto mt-6

                max-w-5xl

                px-6 py-4 rounded-xl

                border-t border-slate-200

                bg-white/95
                backdrop-blur

                shadow-[0_-4px_20px_rgba(0,0,0,0.04)]
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
                <div className="space-y-3">

                    <div className="flex items-center gap-2">

                        <CheckCircle2
                            size={18}
                            className="text-emerald-600"
                        />

                        <p className="text-sm font-semibold text-slate-900">
                            New Appointment Selected
                        </p>

                    </div>

                    <div className="flex flex-wrap gap-3">

                        {/* DATE */}
                        <div
                            className="
                                    flex items-center gap-2

                                    rounded-lg

                                    border border-slate-200

                                    bg-slate-50

                                    px-4 py-2.5
                                "
                        >

                            <CalendarDays
                                size={16}
                                className="text-teal-600"
                            />

                            <span className="text-sm text-slate-700">
                                {dateLabel}
                            </span>

                        </div>

                        {/* TIME */}
                        <div
                            className="
                                    flex items-center gap-2

                                    rounded-lg

                                    border border-slate-200

                                    bg-slate-50

                                    px-4 py-2.5
                                "
                        >

                            <Clock3
                                size={16}
                                className="text-indigo-600"
                            />

                            <span className="text-sm text-slate-700">
                                {startTime}
                                {" – "}
                                {endTime}
                            </span>

                        </div>

                    </div>

                </div>

                {/* BUTTON */}
                <button
                    onClick={handleReschedule}

                    disabled={loading}

                    className="
                            inline-flex items-center justify-center gap-2

                            rounded-lg

                            bg-[#1F2147]
                            hover:bg-[#151736]

                            disabled:opacity-60

                            px-6 py-3

                            text-sm font-medium text-white

                            transition
                        "
                >

                    <CheckCircle2 size={16} />

                    {loading
                        ? "Rescheduling..."
                        : "Confirm Reschedule"}

                </button>

            </div>

        </div>
    );
}