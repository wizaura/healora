"use client";

import {
    CalendarDays,
    Clock3,
    UserRound,
} from "lucide-react";

export default function DoctorRescheduleSummary({
    appointment,
}: any) {

    return (

        <div
            className="
                flex flex-col lg:flex-row
                lg:items-center
                lg:justify-between

                gap-6
            "
        >

            {/* LEFT */}
            <div className="flex items-center gap-5">

                {/* PATIENT IMAGE */}
                <div
                    className="
                        relative

                        h-24 w-24

                        overflow-hidden

                        rounded-lg

                        border border-slate-200

                        bg-slate-100

                        shrink-0
                    "
                >

                    {appointment?.user?.image ? (

                        <img
                            src={
                                appointment.user.image
                            }

                            alt={
                                appointment.user.name
                            }

                            className="
                                h-full w-full

                                object-cover
                            "
                        />

                    ) : (

                        <div
                            className="
                                flex h-full w-full
                                items-center justify-center
                            "
                        >

                            <UserRound
                                size={34}
                                className="text-slate-400"
                            />

                        </div>

                    )}

                </div>

                {/* INFO */}
                <div className="space-y-3">

                    <div>

                        <span
                            className="
                                inline-flex items-center

                                rounded-full

                                border border-indigo-200

                                bg-indigo-50

                                px-3 py-1

                                text-xs font-medium
                                text-indigo-700
                            "
                        >
                            Patient Appointment
                        </span>

                    </div>

                    <div>

                        <h1 className="text-2xl font-semibold text-slate-900">
                            {
                                appointment.user?.name
                            }
                        </h1>

                        <p className="mt-1 text-sm text-slate-500">
                            Reschedule consultation
                            appointment
                        </p>

                    </div>

                    {/* DATE + TIME */}
                    <div className="flex flex-wrap gap-2">

                        <div
                            className="
                                flex items-center gap-2

                                rounded-lg

                                border border-slate-200

                                bg-white

                                px-3 py-2
                            "
                        >

                            <CalendarDays
                                size={15}
                                className="text-teal-600"
                            />

                            <span className="text-sm text-slate-700">
                                {appointment.date}
                            </span>

                        </div>

                        <div
                            className="
                                flex items-center gap-2

                                rounded-lg

                                border border-slate-200

                                bg-white

                                px-3 py-2
                            "
                        >

                            <Clock3
                                size={15}
                                className="text-indigo-600"
                            />

                            <span className="text-sm text-slate-700">
                                {
                                    appointment.startTime
                                }
                                {" – "}
                                {
                                    appointment.endTime
                                }
                            </span>

                        </div>

                    </div>

                </div>

            </div>

            {/* RIGHT */}
            <div
                className="
                    rounded-lg

                    border border-slate-200

                    bg-slate-50

                    px-5 py-4

                    min-w-[220px]
                "
            >

                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Current Status
                </p>

                <div className="mt-2 flex items-center gap-2">

                    <div
                        className="
                            h-2.5 w-2.5

                            rounded-full

                            bg-emerald-500
                        "
                    />

                    <p className="text-sm font-medium text-slate-800">
                        {
                            appointment.status
                        }
                    </p>

                </div>

            </div>

        </div>
    );
}