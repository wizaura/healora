"use client";

import { useEffect, useMemo, useState } from "react";
import api from "@/lib/api";
import { Clock10 } from "lucide-react";

/* ---------- TYPES ---------- */

type Slot = {
    id: string;
    startTime: string; // ISO UTC
    endTime: string;   // ISO UTC
    duration: 30 | 60;
};

type Props = {
    doctorId: string;
    date: Date | undefined;
    selectedSlot: Slot | null;
    setSelectedSlot: (slot: Slot | null) => void;
};

/* ---------- COMPONENT ---------- */

export default function SlotGrid({
    doctorId,
    date,
    selectedSlot,
    setSelectedSlot,
}: Props) {
    const [slots, setSlots] = useState<Slot[]>([]);
    const [loading, setLoading] = useState(false);
    const [duration, setDuration] = useState<30 | 60>(30);

    /* ---------- DATE STRING ---------- */
    const dateStr = date
        ? [
            date.getFullYear(),
            String(date.getMonth() + 1).padStart(2, "0"),
            String(date.getDate()).padStart(2, "0"),
        ].join("-")
        : null;

    /* ---------- FETCH SLOTS ---------- */
    useEffect(() => {
        if (!doctorId || !dateStr) return;

        const fetchSlots = async () => {
            try {
                setLoading(true);
                setSelectedSlot(null);

                const res = await api.get("/availability/slots", {
                    params: { doctorId, date: dateStr },
                });

                // Map backend → UI
                const mapped: Slot[] = res.data.map((s: any) => {
                    const start = new Date(s.startTimeUTC);
                    const end = new Date(s.endTimeUTC);

                    const diffMinutes =
                        (end.getTime() - start.getTime()) / (1000 * 60);

                    return {
                        id: s.id,
                        startTime: s.startTimeUTC,
                        endTime: s.endTimeUTC,
                        duration: diffMinutes as 30 | 60,
                    };
                });


                setSlots(mapped);
            } catch (err) {
                console.error("Failed to fetch slots", err);
                setSlots([]);
            } finally {
                setLoading(false);
            }
        };

        fetchSlots();
    }, [doctorId, dateStr, setSelectedSlot]);

    /* ---------- FILTER BY DURATION ---------- */
    const visibleSlots = useMemo(
        () => slots.filter((s) => s.duration === duration),
        [slots, duration]
    );

    /* ---------- LOADING ---------- */
    if (loading) {
        return (
            <div className="rounded-3xl border border-navy/10 bg-white p-8 text-center">
                <p className="text-sm font-medium text-navy/60">
                    Fetching available slots…
                </p>
            </div>
        );
    }

    /* ---------- GRID ---------- */
    return (
        <div className="rounded-2xl bg-white p-6">
            <div className="mx-auto max-w-lg text-center">

                <span className="mb-4 inline-block rounded-full border border-gray-200 bg-white px-6 py-2 text-sm font-medium text-gray-600">
                    Time Slots
                </span>

                <h2 className="text-2xl font-medium tracking-[-0.02em] text-[#1F2147]">
                    Choose a time slot
                </h2>

                {/* Duration selector */}
                <div className="my-6 flex justify-center gap-3">
                    {[30, 60].map((d) => (
                        <button
                            key={d}
                            onClick={() => {
                                setDuration(d as 30 | 60);
                                setSelectedSlot(null);
                            }}
                            className={`
                                rounded-full px-5 py-2 text-sm font-medium transition
                                ${duration === d
                                    ? "bg-navy text-white shadow"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }
                            `}
                        >
                            {d} min
                        </button>
                    ))}
                </div>

                {/* Slot cards */}
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                    {!visibleSlots.length && (
                        <div className="col-span-full flex h-64 items-center justify-center">
                            <div className="text-center space-y-3">

                                {/* Icon */}
                                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-navy/5">
                                    <span className="text-2xl text-navy/40"><Clock10 /></span>
                                </div>

                                {/* Text */}
                                <p className="text-base font-semibold text-navy">
                                    No {duration}-minute slots
                                </p>

                                <p className="text-sm text-navy/50">
                                    Try a different duration or date
                                </p>
                            </div>
                        </div>
                    )}

                    {visibleSlots.map((slot) => {
                        const start = formatTime(slot.startTime);
                        const end = formatTime(slot.endTime);
                        const isSelected = selectedSlot?.id === slot.id;

                        return (
                            <button
                                key={slot.id}
                                onClick={() =>
                                    setSelectedSlot(isSelected ? null : slot)
                                }
                                className={`
                    rounded-xl border px-4 py-4
                    text-sm font-semibold transition
                    ${isSelected
                                        ? "border-navy bg-navy text-white shadow"
                                        : "border-gray-200 bg-white text-navy hover:border-navy/40"
                                    }
                `}
                            >
                                <div>{start}</div>
                                <div className="text-xs opacity-70">
                                    → {end}
                                </div>
                            </button>
                        );
                    })}
                </div>

                {/* Timezone info */}
                <p className="mt-4 text-xs text-gray-500">
                    Times shown in your local timezone (
                    {Intl.DateTimeFormat().resolvedOptions().timeZone})
                </p>
            </div>
        </div>
    );
}

/* ---------- HELPERS ---------- */

const formatTime = (utc: string) => {
    const d = new Date(utc);
    return d.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });
};
