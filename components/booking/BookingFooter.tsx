"use client";

import { useRouter } from "next/navigation";

type BookingFooterProps = {
    slot: {
        id: string;
        startTime: string;
        endTime: string;
    } | null;
    doctorId: string;
    date: Date | undefined;
};

export default function BookingFooter({
    slot,
    doctorId,
    date,
}: BookingFooterProps) {
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

    return (
        <div className="sticky bottom-0 z-20 border-t border-gray-200 bg-white">
            <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">

                {/* LEFT — DATE & TIME */}
                <div className="space-y-1">
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                        Selected appointment
                    </p>

                    {/* Big date */}
                    <p className="text-lg font-semibold text-navy">
                        {dateLabel}
                    </p>

                    {/* Time */}
                    <p className="text-sm text-navy/70">
                        {startTime} – {endTime}
                    </p>
                </div>

                {/* CTA */}
                <button
                    onClick={() => {
                        router.push(
                            `/checkout?doctorId=${doctorId}&date=${dateStr}&slotId=${slot.id}&startTime=${slot.startTime}&endTime=${slot.endTime}`
                        );
                    }}
                    className="
                        rounded-xl bg-navy px-7 py-3
                        text-sm font-semibold text-white
                        transition hover:bg-navy/90
                        cursor-pointer
                    "
                >
                    Continue to payment
                </button>
            </div>
        </div>
    );
}
