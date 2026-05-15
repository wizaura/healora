"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/lib/api";
import Loader from "../common/Loader";
import {
    CalendarDays,
    Clock3,
    CircleCheckBig,
    Stethoscope,
    ArrowRight,
} from "lucide-react";

type AppointmentDetails = {
    doctorName: string;
    date: string;
    startTime: string;
    endTime: string;
};

export default function BookingSuccess() {
    const { appointmentId } = useParams();
    const router = useRouter();

    const [data, setData] =
        useState<AppointmentDetails | null>(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!appointmentId) return;

        const fetchDetails = async () => {
            try {
                const res = await api.get(
                    `/appointments/${appointmentId}`
                );

                setData(res.data);
            } catch (err) {
                console.error(
                    "Failed to load appointment",
                    err
                );
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
    }, [appointmentId]);

    if (loading) {
        return <Loader fullScreen />;
    }

    if (!data) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#F7FAFC] px-4">
                <div className="rounded-3xl border border-red-100 bg-white px-8 py-10 text-center shadow-sm">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                        <span className="text-2xl">⚠️</span>
                    </div>

                    <h2 className="text-xl font-semibold text-[#1F2147]">
                        Booking not found
                    </h2>

                    <p className="mt-2 text-sm text-slate-500">
                        We couldn't find your appointment
                        details.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="m-4 rounded-2xl bg-gradient-to-b from-wellness-bg via-white to-wellness-bg py-16">

            <div className="flex items-center justify-center px-4">

                {/* Main Card */}

                <div className="w-full max-w-md rounded-[28px] border border-slate-200 bg-white shadow-xl">

                    {/* Top Section */}

                    <div className="relative bg-gradient-to-r from-emerald-500 to-teal-600 px-6 pt-8 pb-16 text-center rounded-t-[28px]">

                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-lg">
                            <CircleCheckBig className="h-8 w-8 text-emerald-600" />
                        </div>

                        <h1 className="mt-4 text-2xl font-bold text-white">
                            Appointment Confirmed
                        </h1>

                        <p className="mt-2 text-sm text-white/90">
                            Your booking has been successfully scheduled.
                        </p>

                    </div>

                    {/* Floating Content */}

                    <div className="relative z-10 -mt-10 px-5 pb-5">

                        <div className="rounded-3xl border border-slate-100 bg-white p-5 shadow-lg">

                            {/* Doctor */}

                            <div className="flex items-center gap-3 border-b border-slate-100 pb-5">

                                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-teal-50">
                                    <Stethoscope className="h-5 w-5 text-teal-600" />
                                </div>

                                <div>
                                    <p className="text-xs text-slate-500">
                                        Doctor
                                    </p>

                                    <h3 className="text-base font-semibold text-[#1F2147]">
                                        {data.doctorName}
                                    </h3>
                                </div>

                            </div>

                            {/* Details */}

                            <div className="mt-5 space-y-3">

                                <div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3">

                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
                                        <CalendarDays className="h-5 w-5 text-blue-600" />
                                    </div>

                                    <div>
                                        <p className="text-xs text-slate-500">
                                            Appointment Date
                                        </p>

                                        <p className="text-sm font-semibold text-[#1F2147]">
                                            {data.date}
                                        </p>
                                    </div>

                                </div>

                                <div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3">

                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100">
                                        <Clock3 className="h-5 w-5 text-emerald-600" />
                                    </div>

                                    <div>
                                        <p className="text-xs text-slate-500">
                                            Consultation Time
                                        </p>

                                        <p className="text-sm font-semibold text-[#1F2147]">
                                            {data.startTime} - {data.endTime}
                                        </p>
                                    </div>

                                </div>

                            </div>

                        </div>

                        {/* Buttons */}

                        <div className="mt-5 space-y-3">

                            <button
                                onClick={() =>
                                    router.replace("/profile/appointments")
                                }
                                className="
                                group flex w-full items-center justify-center gap-2
                                rounded-2xl bg-[#1F2147]
                                px-6 py-3.5 text-sm font-semibold text-white
                                transition hover:bg-[#181A3A]
                            "
                            >
                                View My Appointments

                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </button>

                            <button
                                onClick={() => router.push("/")}
                                className="
                                w-full rounded-2xl border border-slate-200
                                bg-white px-6 py-3.5 text-sm font-medium
                                text-slate-700 transition hover:bg-slate-50
                            "
                            >
                                Back to Home
                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}