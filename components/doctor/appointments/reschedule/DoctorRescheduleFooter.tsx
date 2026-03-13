"use client";

import api from "@/lib/api";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function DoctorRescheduleFooter({
    appointmentId,
    slot,
    doctorId,
    date,
}: any) {

    const router = useRouter();

    if (!slot || !date) return null;

    const dateLabel = date.toLocaleDateString(undefined, {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    const startTime = new Date(slot.startTime).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });

    const endTime = new Date(slot.endTime).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });

    const dateStr = [
        date.getFullYear(),
        String(date.getMonth() + 1).padStart(2, "0"),
        String(date.getDate()).padStart(2, "0"),
    ].join("-");

    const handleReschedule = async () => {

        try {

            await api.post(`/appointments/${appointmentId}/doctor-reschedule`, {
                slotId: slot.id,
                date: dateStr
            });

            toast.success("Appointment rescheduled");

            router.push("/doctor/appointments");

        } catch {

            toast.error("Failed to reschedule appointment");

        }

    };

    return (
        <div className="sticky bottom-0 z-20 border-t border-gray-200 bg-white">

            <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">

                <div className="space-y-1">

                    <p className="text-xs uppercase tracking-wide text-gray-400">
                        New Appointment Time
                    </p>

                    <p className="text-lg font-semibold text-navy">
                        {dateLabel}
                    </p>

                    <p className="text-sm text-navy/70">
                        {startTime} – {endTime}
                    </p>

                </div>

                <button
                    onClick={handleReschedule}
                    className="rounded-xl bg-navy px-7 py-3 text-sm font-semibold text-white hover:bg-navy/90"
                >
                    Confirm Reschedule
                </button>

            </div>

        </div>
    );
}