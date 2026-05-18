"use client";

import { useEffect, useState } from "react";

import {
    useSearchParams,
    useRouter,
} from "next/navigation";

import api from "@/lib/api";

import Loader from "../../common/Loader";

import {
    CalendarDays,
    Clock3,
    CircleCheckBig,
    Stethoscope,
    ArrowRight,
    Pill,
} from "lucide-react";

type PaymentSuccessData = {

    type:
    | "APPOINTMENT"
    | "PRESCRIPTION";

    doctorName: string;

    date?: string;

    startTime?: string;

    endTime?: string;

    totalAmount?: string;

    currency?: string;
};

export default function PaymentSuccess() {

    const searchParams =
        useSearchParams();

    const router =
        useRouter();

    const type =
        searchParams.get("type");

    const id =
        searchParams.get("id");

    const [data, setData] =
        useState<PaymentSuccessData | null>(null);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        if (!id || !type) return;

        const fetchDetails =
            async () => {

                try {

                    const endpoint =

                        type === "PRESCRIPTION"

                            ? `/consultations/my-bills/${id}`

                            : `/appointments/${id}`;

                    const res =
                        await api.get(
                            endpoint
                        );

                    setData({
                        ...res.data,
                        type:
                            type as any,
                    });

                } catch (err) {

                    console.error(
                        "Failed to load payment success",
                        err
                    );

                } finally {

                    setLoading(false);
                }
            };

        fetchDetails();

    }, [id, type]);

    if (loading) {
        return <Loader fullScreen />;
    }

    if (!data) {

        return (

            <div className="
                flex min-h-screen
                items-center justify-center
                bg-[#F7FAFC]
                px-4
            ">

                <div className="
                    rounded-3xl
                    border border-red-100
                    bg-white
                    px-8 py-10
                    text-center
                    shadow-sm
                ">

                    <div className="
                        mx-auto mb-4
                        flex h-16 w-16
                        items-center justify-center
                        rounded-full
                        bg-red-100
                    ">
                        ⚠️
                    </div>

                    <h2 className="
                        text-xl font-semibold
                        text-[#1F2147]
                    ">
                        Details not found
                    </h2>

                </div>

            </div>
        );
    }

    const isPrescription =
        data.type === "PRESCRIPTION";

    return (

        <div className="
            m-4 rounded-2xl
            bg-gradient-to-b
            from-wellness-bg
            via-white
            to-wellness-bg
            py-16
        ">

            <div className="
                flex items-center
                justify-center
                px-4
            ">

                <div className="
                    w-full max-w-md
                    rounded-[28px]
                    border border-slate-200
                    bg-white
                    shadow-xl
                ">

                    {/* Header */}

                    <div className="
                        relative
                        rounded-t-[28px]
                        bg-gradient-to-r
                        from-emerald-500
                        to-teal-600
                        px-6 pt-8 pb-16
                        text-center
                    ">

                        <div className="
                            mx-auto
                            flex h-16 w-16
                            items-center justify-center
                            rounded-full
                            bg-white
                            shadow-lg
                        ">

                            <CircleCheckBig
                                className="
                                    h-8 w-8
                                    text-emerald-600
                                "
                            />

                        </div>

                        <h1 className="
                            mt-4
                            text-2xl
                            font-bold
                            text-white
                        ">

                            {isPrescription

                                ? "Prescription Payment Successful"

                                : "Appointment Confirmed"}

                        </h1>

                        <p className="
                            mt-2
                            text-sm
                            text-white/90
                        ">

                            {isPrescription

                                ? "Your prescription payment has been completed."

                                : "Your booking has been successfully scheduled."}

                        </p>

                    </div>

                    {/* Content */}

                    <div className="
                        relative z-10
                        -mt-10
                        px-5 pb-5
                    ">

                        <div className="
                            rounded-3xl
                            border border-slate-100
                            bg-white
                            p-5
                            shadow-lg
                        ">

                            {/* Doctor */}

                            <div className="
                                flex items-center
                                gap-3
                                border-b
                                border-slate-100
                                pb-5
                            ">

                                <div className="
                                    flex h-11 w-11
                                    items-center justify-center
                                    rounded-2xl
                                    bg-teal-50
                                ">

                                    <Stethoscope
                                        className="
                                            h-5 w-5
                                            text-teal-600
                                        "
                                    />

                                </div>

                                <div>

                                    <p className="
                                        text-xs
                                        text-slate-500
                                    ">
                                        Doctor
                                    </p>

                                    <h3 className="
                                        text-base
                                        font-semibold
                                        text-[#1F2147]
                                    ">
                                        {data.doctorName}
                                    </h3>

                                </div>

                            </div>

                            {/* Appointment */}

                            {!isPrescription && (

                                <div className="
                                    mt-5
                                    space-y-3
                                ">

                                    <div className="
                                        flex items-center
                                        gap-3
                                        rounded-2xl
                                        bg-slate-50
                                        px-4 py-3
                                    ">

                                        <div className="
                                            flex h-10 w-10
                                            items-center justify-center
                                            rounded-xl
                                            bg-blue-100
                                        ">

                                            <CalendarDays
                                                className="
                                                    h-5 w-5
                                                    text-blue-600
                                                "
                                            />

                                        </div>

                                        <div>

                                            <p className="
                                                text-xs
                                                text-slate-500
                                            ">
                                                Appointment Date
                                            </p>

                                            <p className="
                                                text-sm
                                                font-semibold
                                                text-[#1F2147]
                                            ">
                                                {data.date}
                                            </p>

                                        </div>

                                    </div>

                                    <div className="
                                        flex items-center
                                        gap-3
                                        rounded-2xl
                                        bg-slate-50
                                        px-4 py-3
                                    ">

                                        <div className="
                                            flex h-10 w-10
                                            items-center justify-center
                                            rounded-xl
                                            bg-emerald-100
                                        ">

                                            <Clock3
                                                className="
                                                    h-5 w-5
                                                    text-emerald-600
                                                "
                                            />

                                        </div>

                                        <div>

                                            <p className="
                                                text-xs
                                                text-slate-500
                                            ">
                                                Consultation Time
                                            </p>

                                            <p className="
                                                text-sm
                                                font-semibold
                                                text-[#1F2147]
                                            ">
                                                {data.startTime}
                                                {" - "}
                                                {data.endTime}
                                            </p>

                                        </div>

                                    </div>

                                </div>
                            )}

                            {/* Prescription */}

                            {isPrescription && (

                                <div className="
        mt-5
        rounded-2xl
        bg-slate-50
        p-4
    ">

                                    <div className="
            flex items-center
            justify-between
        ">

                                        <div className="
                flex items-center
                gap-3
            ">

                                            <div className="
                    flex h-10 w-10
                    items-center justify-center
                    rounded-xl
                    bg-teal-100
                ">

                                                <Pill
                                                    className="
                            h-5 w-5
                            text-teal-600
                        "
                                                />

                                            </div>

                                            <div>

                                                <p className="
                        text-xs
                        text-slate-500
                    ">
                                                    Prescription Payment
                                                </p>

                                                <p className="
                        text-sm
                        font-semibold
                        text-[#1F2147]
                    ">
                                                    Successfully Paid
                                                </p>

                                            </div>

                                        </div>

                                        <div className="text-right">

                                            <p className="
                    text-xs
                    text-slate-500
                ">
                                                Total Amount
                                            </p>

                                            <p className="
                    text-lg
                    font-bold
                    text-[#1F2147]
                ">
                                                {data.currency}
                                                {" "}
                                                {data.totalAmount}
                                            </p>

                                        </div>

                                    </div>

                                </div>
                            )}

                        </div>

                        {/* Buttons */}

                        <div className="
                            mt-5
                            space-y-3
                        ">

                            <button
                                onClick={() =>
                                    router.replace(
                                        isPrescription ? "/profile/payments" : "/profile/appointments?fromPayment=true"
                                    )
                                }

                                className="
                                    group
                                    flex w-full
                                    items-center justify-center
                                    gap-2

                                    rounded-2xl

                                    bg-[#1F2147]

                                    px-6 py-3.5

                                    text-sm font-semibold
                                    text-white

                                    transition
                                    hover:bg-[#181A3A]
                                "
                            >

                                View Details

                                <ArrowRight
                                    className="
                                        h-4 w-4
                                        transition-transform
                                        group-hover:translate-x-1
                                    "
                                />

                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}