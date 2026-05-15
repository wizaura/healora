"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import Loader from "../common/Loader";

export default function AppointmentSummary({
    doctorId,
    date,
    startTime,
    endTime,
}: {
    doctorId: string;
    date: string;
    startTime: string;
    endTime: string;
}) {
    const [expanded, setExpanded] = useState(false);

    const { data, isLoading } = useQuery({
        queryKey: ["doctor", doctorId],
        queryFn: () =>
            api.get(`/doctor/${doctorId}`).then((res) => res.data),
    });

    if (isLoading || !data) {
        return <Loader fullScreen />;
    }

    const dateObj = new Date(`${date}T00:00:00`);

    const formattedDate = dateObj.toLocaleDateString(undefined, {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    const time = new Date(startTime).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });

    const timeEnd = new Date(endTime).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });

    return (
        <section className="m-4 rounded-3xl bg-gradient-to-b from-white to-wellness-bg pt-20 pb-16 shadow-sm">
            <div className="mx-auto max-w-5xl px-6 text-center space-y-6">

                {/* Doctor Name */}
                <h2 className="text-3xl md:text-5xl font-semibold text-navy">
                    {data.name}
                </h2>

                {/* Specialities */}
                <div className="flex flex-wrap justify-center gap-2">
                    {data.specialities?.map((s: any) => (
                        <span
                            key={s.id}
                            className="rounded-full bg-navy/5 px-4 py-1 text-xs text-navy"
                        >
                            {s.name}
                        </span>
                    ))}
                </div>

                {/* Date + Time */}
                <div className="mx-auto flex my-6 max-w-md justify-between rounded-2xl bg-navy px-6 py-4">
                    <span className="text-sm font-medium text-white">
                        {formattedDate}
                    </span>
                    <span className="text-sm font-semibold text-white">
                        {time}
                    </span>
                </div>

                {/* Fee */}
                <div className="text-lg font-semibold text-navy">
                    Consultation Fee: {data.currencySymbol}{data.consultationFee}
                </div>

                {/* Learn More Toggle */}

                <button
                    onClick={() => setExpanded(!expanded)}
                    className="
        mx-auto flex items-center justify-center gap-2

        rounded-full

        border border-navy/10

        bg-white

        px-5 py-2.5

        text-sm font-medium text-navy

        transition

        hover:border-teal-200
        hover:bg-teal-50
    "
                >

                    {expanded
                        ? "Hide booking guide"
                        : "How booking works"}

                    {expanded
                        ? <ChevronUp size={16} />
                        : <ChevronDown size={16} />
                    }

                </button>

                {/* BOOKING GUIDE */}

                {expanded && (

                    <div
                        className="
            mx-auto mt-6 max-w-3xl

            rounded-3xl

            border border-slate-200

            bg-white

            p-5 md:p-6

            text-left

            shadow-sm
        "
                    >

                        <div className="space-y-4">

                            {/* Step 1 */}

                            <div
                                className="
                    rounded-2xl

                    border border-slate-200

                    bg-slate-50

                    p-4
                "
                            >

                                <div className="flex items-start gap-3">

                                    <div
                                        className="
                            flex h-8 w-8 shrink-0
                            items-center justify-center

                            rounded-full

                            bg-teal-100

                            text-sm font-bold
                            text-teal-700
                        "
                                    >
                                        1
                                    </div>

                                    <div>

                                        <h4 className="font-semibold text-navy">
                                            Choose your payment gateway
                                        </h4>

                                        <p className="mt-1 text-sm leading-6 text-slate-600">

                                            Select

                                            <span className="font-semibold text-navy">
                                                {" "}Razorpay{" "}
                                            </span>

                                            for Indian payments or

                                            <span className="font-semibold text-navy">
                                                {" "}Stripe{" "}
                                            </span>

                                            for international payments.

                                        </p>

                                    </div>

                                </div>

                            </div>

                            {/* Step 2 */}

                            <div
                                className="
                    rounded-2xl

                    border border-slate-200

                    bg-slate-50

                    p-4
                "
                            >

                                <div className="flex items-start gap-3">

                                    <div
                                        className="
                            flex h-8 w-8 shrink-0
                            items-center justify-center

                            rounded-full

                            bg-indigo-100

                            text-sm font-bold
                            text-indigo-700
                        "
                                    >
                                        2
                                    </div>

                                    <div>

                                        <h4 className="font-semibold text-navy">
                                            Select consultation type
                                        </h4>

                                        <p className="mt-1 text-sm leading-6 text-slate-600">

                                            You can choose between:

                                        </p>

                                        <div className="mt-3 flex flex-wrap gap-2">

                                            <span
                                                className="
                                    rounded-full

                                    border border-slate-200

                                    bg-white

                                    px-3 py-1

                                    text-xs font-medium
                                    text-slate-700
                                "
                                            >
                                                Slot Only
                                            </span>

                                            <span
                                                className="
                                    rounded-full

                                    border border-slate-200

                                    bg-white

                                    px-3 py-1

                                    text-xs font-medium
                                    text-slate-700
                                "
                                            >
                                                Consultation
                                            </span>

                                        </div>

                                    </div>

                                </div>

                            </div>

                            {/* Step 3 */}

                            <div
                                className="
                    rounded-2xl

                    border border-slate-200

                    bg-slate-50

                    p-4
                "
                            >

                                <div className="flex items-start gap-3">

                                    <div
                                        className="
                            flex h-8 w-8 shrink-0
                            items-center justify-center

                            rounded-full

                            bg-emerald-100

                            text-sm font-bold
                            text-emerald-700
                        "
                                    >
                                        3
                                    </div>

                                    <div>

                                        <h4 className="font-semibold text-navy">
                                            Choose consultation mode
                                        </h4>

                                        <p className="mt-1 text-sm leading-6 text-slate-600">

                                            If you select consultation,
                                            you can choose your preferred
                                            online meeting platform.

                                        </p>

                                        <div className="mt-3 flex flex-wrap gap-2">

                                            <span
                                                className="
                                    rounded-full

                                    border border-slate-200

                                    bg-white

                                    px-3 py-1

                                    text-xs font-medium
                                    text-slate-700
                                "
                                            >
                                                Google Meet
                                            </span>

                                            <span
                                                className="
                                    rounded-full

                                    border border-slate-200

                                    bg-white

                                    px-3 py-1

                                    text-xs font-medium
                                    text-slate-700
                                "
                                            >
                                                Zoom
                                            </span>

                                        </div>

                                    </div>

                                </div>

                            </div>

                            {/* Step 4 */}

                            <div
                                className="
                    rounded-2xl

                    border border-slate-200

                    bg-slate-50

                    p-4
                "
                            >

                                <div className="flex items-start gap-3">

                                    <div
                                        className="
                            flex h-8 w-8 shrink-0
                            items-center justify-center

                            rounded-full

                            bg-amber-100

                            text-sm font-bold
                            text-amber-700
                        "
                                    >
                                        4
                                    </div>

                                    <div>

                                        <h4 className="font-semibold text-navy">
                                            Prescription options
                                        </h4>

                                        <p className="mt-1 text-sm leading-6 text-slate-600">

                                            For

                                            <span className="font-semibold text-navy">
                                                {" "}homeopathy,
                                            </span>

                                            <span className="font-semibold text-navy">
                                                {" "}agro homeopathy
                                            </span>

                                            and

                                            <span className="font-semibold text-navy">
                                                {" "}veterinary homeopathy
                                            </span>

                                            {" "}consultations, you can request prescriptions.

                                        </p>

                                        <div className="mt-3 flex flex-wrap gap-2">

                                            <span
                                                className="
                                    rounded-full

                                    border border-slate-200

                                    bg-white

                                    px-3 py-1

                                    text-xs font-medium
                                    text-slate-700
                                "
                                            >
                                                Prescription Only
                                            </span>

                                            <span
                                                className="
                                    rounded-full

                                    border border-slate-200

                                    bg-white

                                    px-3 py-1

                                    text-xs font-medium
                                    text-slate-700
                                "
                                            >
                                                Door Delivery
                                            </span>

                                        </div>

                                    </div>

                                </div>

                            </div>

                            {/* Step 5 */}

                            <div
                                className="
                    rounded-2xl

                    border border-slate-200

                    bg-slate-50

                    p-4
                "
                            >

                                <div className="flex items-start gap-3">

                                    <div
                                        className="
                            flex h-8 w-8 shrink-0
                            items-center justify-center

                            rounded-full

                            bg-rose-100

                            text-sm font-bold
                            text-rose-700
                        "
                                    >
                                        5
                                    </div>

                                    <div>

                                        <h4 className="font-semibold text-navy">
                                            Delivery preference & payment
                                        </h4>

                                        <p className="mt-1 text-sm leading-6 text-slate-600">

                                            If you choose door delivery,
                                            you can select:

                                        </p>

                                        <div className="mt-3 flex flex-wrap gap-2">

                                            <span
                                                className="
                                    rounded-full

                                    border border-slate-200

                                    bg-white

                                    px-3 py-1

                                    text-xs font-medium
                                    text-slate-700
                                "
                                            >
                                                Fast Delivery
                                            </span>

                                            <span
                                                className="
                                    rounded-full

                                    border border-slate-200

                                    bg-white

                                    px-3 py-1

                                    text-xs font-medium
                                    text-slate-700
                                "
                                            >
                                                Normal Delivery
                                            </span>

                                        </div>

                                        <p className="mt-3 text-sm leading-6 text-slate-600">

                                            Complete your payment securely
                                            to confirm the appointment and
                                            reserve your slot.

                                        </p>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                )}

                <p className="text-sm font-medium text-emerald-700">
                    Slot reserved for limited time
                </p>
            </div>
        </section>
    );
}