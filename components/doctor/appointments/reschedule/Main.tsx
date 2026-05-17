"use client";

import { useEffect, useState } from "react";

import { useParams }
    from "next/navigation";

import {
    CalendarDays,
    Clock3,
    CheckCircle2,
} from "lucide-react";

import { AppointmentService }
    from "@/services/appointment.service";

import DoctorRescheduleSummary
    from "./DoctorRescheduleSummary";

import DatePickerCard
    from "@/components/booking/DatePicker";

import RescheduleSlotGrid
    from "./DoctorRescheduleSlotGrid";

import DoctorRescheduleFooter
    from "./DoctorRescheduleFooter";
import api from "@/lib/api";

export default function DoctorReschedulePage() {

    const { appointmentId } =
        useParams<{
            appointmentId: string;
        }>();

    const [appointment, setAppointment] =
        useState<any>(null);

    const [date, setDate] =
        useState<Date>();

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

    const loadAppointment = async () => {

        try {

            setLoading(true);

            const appt =
                await AppointmentService.getById(
                    appointmentId
                );

            setAppointment(appt);

            const slotDate =
                new Date(appt.date);

            setDate(slotDate);

        } finally {

            setLoading(false);
        }
    };

    if (loading) {

        return (

            <div
                className="
                    min-h-screen

                    flex items-center justify-center

                    text-sm text-slate-500
                "
            >
                Loading appointment...
            </div>
        );
    }

    if (!appointment) return null;

    return (

        <div className="min-h-screen">

            <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">

                {/* TOP HEADER */}
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

                            <p className="mt-2 text-sm text-slate-500">
                                Update the patient's
                                consultation date and
                                appointment slot.
                            </p>

                        </div>

                        {/* STEPS */}
                        <div className="flex flex-wrap gap-3">

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

                        <DoctorRescheduleSummary
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
                                availableDates={availableDates}
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
            <DoctorRescheduleFooter
                appointmentId={appointmentId}

                slot={selectedSlot}

                doctorId={appointment.doctorId}

                date={date}
            />

        </div>
    );
}