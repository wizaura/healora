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

    const [availableDates, setAvailableDates] =
        useState<string[]>([]);

    const [loading, setLoading] =
        useState(true);

    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

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

    useEffect(() => {

        const fetchAvailableDays = async () => {

            if (!appointment) {
                return;
            }

            try {

                const current =
                    date || new Date();

                const month = [
                    current.getFullYear(),
                    String(
                        current.getMonth() + 1
                    ).padStart(2, "0"),
                ].join("-");

                const res = await api.get(
                    "/availability/days",
                    {
                        params: {
                            doctorId: appointment.doctorId,
                            month,
                            timezone,
                        },
                    }
                );

                const dates =
                    res.data.map(
                        (d: any) => d.date
                    );

                setAvailableDates(dates);

                if (
                    !date &&
                    dates.length
                ) {

                    const firstAvailable =
                        new Date(dates[0]);

                    setDate(firstAvailable);
                }

            } catch (err) {

                console.error(
                    "Failed to fetch available days",
                    err
                );
            }
        };

        fetchAvailableDays();

    }, [appointment, timezone]);

    /* ---------------- LOADING ---------------- */

    if (loading) {

        return <Loader fullScreen />
    }

    if (!appointment) return null;

    return (

        <div className="min-h-screen">

            <div className="max-w-7xl mx-auto space-y-6">

                {/* HEADER */}
                <div
                    className="
                        rounded-2xl
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
                        <div className="flex flex-wrap items-center gap-5 text-sm text-slate-500">

                            {/* STEP */}

                            <div className="flex items-center gap-2">

                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-50">
                                    <CalendarDays
                                        size={15}
                                        className="text-teal-600"
                                    />
                                </div>

                                <span className="font-medium">
                                    Select Date
                                </span>

                            </div>

                            <div className="h-1 w-1 rounded-full bg-slate-300" />

                            {/* STEP */}

                            <div className="flex items-center gap-2">

                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-50">
                                    <Clock3
                                        size={15}
                                        className="text-indigo-600"
                                    />
                                </div>

                                <span className="font-medium">
                                    Choose Slot
                                </span>

                            </div>

                            <div className="h-1 w-1 rounded-full bg-slate-300" />

                            {/* STEP */}

                            <div className="flex items-center gap-2">

                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50">
                                    <CheckCircle2
                                        size={15}
                                        className="text-emerald-600"
                                    />
                                </div>

                                <span className="font-medium">
                                    Confirm Booking
                                </span>

                            </div>

                        </div>

                    </div>

                </div>

                {/* SUMMARY */}
                <div
                    className="
                        rounded-2xl
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
                            rounded-2xl
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
                                availableDates={availableDates}
                            />

                        </div>

                    </div>

                    {/* SLOT */}
                    <div
                        className="
                            rounded-2xl
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
                                    timezone={timezone}
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