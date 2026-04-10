"use client";

import { Clock, User } from "lucide-react";

export default function TodayPanel({ appointments, onSelect }: any) {

    const today = new Date();

    const todayAppointments = appointments
        .filter((appt: any) => {
            const date = new Date(appt.slot.startTimeUTC);
            return (
                appt.status === "CONFIRMED" &&
                date.getDate() === today.getDate() &&
                date.getMonth() === today.getMonth() &&
                date.getFullYear() === today.getFullYear()
            );
        })
        .sort(
            (a: any, b: any) =>
                new Date(a.slot.startTimeUTC).getTime() -
                new Date(b.slot.startTimeUTC).getTime()
        );

    const getStatusColor = (status: string) => {
        switch (status) {
            case "CONFIRMED":
                return "bg-emerald-50 text-emerald-700";
            case "PENDING":
                return "bg-amber-50 text-amber-700";
            case "COMPLETED":
                return "bg-blue-50 text-blue-700";
            case "CANCELLED":
                return "bg-red-50 text-red-600";
            default:
                return "bg-gray-100 text-gray-600";
        }
    };

    const now = new Date().getTime();

    return (
        <div className="px-6 py-4 bg-white rounded-xl border border-gray-100 shadow-sm">

            {/* HEADER */}
            <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-gray-800">
                    Today's Appointments
                </h2>

                <span className="text-xs text-gray-400">
                    {todayAppointments.length} scheduled
                </span>
            </div>

            {todayAppointments.length === 0 ? (
                <div className="text-center py-8 text-gray-400 text-sm">
                    No appointments today
                </div>
            ) : (
                <div className="space-y-3 max-h-[320px] overflow-y-auto pr-1">

                    {todayAppointments.map((appt: any) => {

                        const start = new Date(appt.slot.startTimeUTC);
                        const end = new Date(appt.slot.endTimeUTC);

                        const isNext =
                            start.getTime() > now &&
                            !todayAppointments.some(
                                (a: any) =>
                                    new Date(a.slot.startTimeUTC).getTime() > now &&
                                    new Date(a.slot.startTimeUTC).getTime() < start.getTime()
                            );

                        return (
                            <div
                                key={appt.id}
                                className={`
                                p-3 rounded-xl border flex justify-between items-center
                                ${isNext ? "border-blue-200 bg-blue-50/40" : "border-gray-100"}
                                `}
                            >

                                {/* LEFT */}
                                <div className="flex items-center gap-3">

                                    <div className="p-2 bg-gray-50 rounded-lg">
                                        <Clock size={16} className="text-gray-500" />
                                    </div>

                                    <div>

                                        <div className="text-sm font-semibold text-gray-800">
                                            {start.toLocaleTimeString("en-IN", {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}

                                            {" – "}

                                            {end.toLocaleTimeString("en-IN", {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                        </div>

                                        <div className="flex items-center gap-1 text-sm text-gray-600">
                                            <User size={12} />
                                            {appt.user?.name}
                                        </div>

                                    </div>

                                </div>

                                {/* RIGHT */}
                                <div className="flex flex-col items-end gap-1">

                                    <span
                                        className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(
                                            appt.status
                                        )}`}
                                    >
                                        {appt.status}
                                    </span>

                                    <button
                                        onClick={() => onSelect(appt)}
                                        className="px-4 py-0.5 text-sm font-medium rounded-md bg-wellness-accent text-white hover:bg-wellness-accent/80 transition"
                                    >
                                        View
                                    </button>

                                    {isNext && (
                                        <span className="text-[10px] text-blue-600 font-medium">
                                            Next
                                        </span>
                                    )}

                                </div>

                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}