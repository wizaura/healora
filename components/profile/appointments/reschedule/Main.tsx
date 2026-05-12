"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import api from "@/lib/api";

import AppointmentSummary
    from "./AppointmentSummary";

import DatePickerCard
    from "@/components/booking/DatePicker";

import RescheduleFooter
    from "./RescheduleFooter";

import RescheduleSlotGrid
    from "./RescheduleSlotGrid";

import {
    CalendarDays,
    Clock3,
    CheckCircle2,
} from "lucide-react";
import Loader from "@/components/common/Loader";

export default function ReschedulePage() {

    const { appointmentId } =
        useParams<{
            appointmentId: string;
        }>();

    const [appointment, setAppointment] =
        useState<any>(null);

    const [date, setDate] =
        useState<Date | undefined>();

    const [selectedSlot, setSelectedSlot] =
        useState<any>(null);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        loadAppointment();

    }, []);

    const loadAppointment = async () => {

        try {

            setLoading(true);

            const res = await api.get(
                `/appointments/${appointmentId}`
            );

            const appt = res.data;

            setAppointment(appt);

            const slotDate =
                new Date(appt.date);

            setDate(slotDate);

        } finally {

            setLoading(false);
        }
    };

    /* ---------------- LOADING ---------------- */

    if (loading) {

        return <Loader fullScreen />
    }

    if (!appointment) return null;

    return (

        <div className="min-h-screen pt-12">

            <div className="max-w-5xl mx-auto space-y-6">

                {/* HEADER */}
                <div
                    className="
                        rounded-lg
                        border border-slate-200

                        bg-white

                        px-6 py-5

                        shadow-sm
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
                        <div>

                            <h1 className="text-2xl font-semibold text-slate-900">
                                Reschedule Appointment
                            </h1>

                            <p className="text-sm text-slate-500 mt-2">
                                Choose a new consultation date
                                and available time slot.
                            </p>

                        </div>

                        {/* STEPS */}
                        <div className="flex flex-wrap gap-3">

                            {/* STEP */}
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

                                <span className="text-sm font-medium text-slate-700">
                                    Select Date
                                </span>

                            </div>

                            {/* STEP */}
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

                                <span className="text-sm font-medium text-slate-700">
                                    Choose Slot
                                </span>

                            </div>

                            {/* STEP */}
                            <div
                                className="
                                    flex items-center gap-2

                                    rounded-lg

                                    border border-slate-200

                                    bg-slate-50

                                    px-4 py-2.5
                                "
                            >

                                <CheckCircle2
                                    size={16}
                                    className="text-emerald-600"
                                />

                                <span className="text-sm font-medium text-slate-700">
                                    Confirm
                                </span>

                            </div>

                        </div>

                    </div>

                </div>

                {/* SUMMARY */}
                <div
                    className="
                        rounded-lg
                        border border-slate-200

                        bg-white

                        shadow-sm

                        overflow-hidden
                    "
                >

                    <div
                        className="
                            border-b border-slate-100

                            px-5 py-4

                            bg-slate-50/50
                        "
                    >

                        <h2 className="text-sm font-semibold text-slate-900">
                            Current Appointment
                        </h2>

                    </div>

                    <div className="p-5">

                        <AppointmentSummary
                            appointment={appointment}
                        />

                    </div>

                </div>

                {/* CONTENT */}
                <div
                    className="
                        grid grid-cols-1
                        xl:grid-cols-2

                        gap-6
                    "
                >

                    {/* DATE */}
                    <div
                        className="
                            rounded-lg
                            border border-slate-200

                            bg-white

                            shadow-sm

                            overflow-hidden
                        "
                    >

                        <div className="p-5">

                            <DatePickerCard
                                date={date}
                                setDate={setDate}
                            />

                        </div>

                    </div>

                    {/* SLOT */}
                    <div
                        className="
                            rounded-lg
                            border border-slate-200

                            bg-white

                            shadow-sm

                            overflow-hidden
                        "
                    >
                        <div className="p-5">

                            {date ? (

                                <RescheduleSlotGrid
                                    doctorId={
                                        appointment.doctorId
                                    }

                                    date={date}

                                    currentSlotId={
                                        appointment.slotId
                                    }

                                    selectedSlot={selectedSlot}

                                    setSelectedSlot={
                                        setSelectedSlot
                                    }
                                />

                            ) : (

                                <div
                                    className="
                                        rounded-lg

                                        border border-dashed border-slate-300

                                        py-14

                                        text-center
                                    "
                                >

                                    <p className="text-sm text-slate-500">
                                        Select a date to
                                        view available slots
                                    </p>

                                </div>

                            )}

                        </div>

                    </div>

                </div>

            </div>

            {/* FOOTER */}
            <RescheduleFooter
                appointmentId={appointmentId}

                slot={selectedSlot}

                doctorId={appointment.doctorId}

                date={date}
            />

        </div>
    );
}