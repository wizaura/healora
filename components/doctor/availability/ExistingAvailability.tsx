"use client";

import api from "@/lib/api";
import { EyeIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

/* ---------- TYPES ---------- */

type Availability = {
    date: string; // YYYY-MM-DD
    startTimeUTC: string;
    endTimeUTC: string;
    slotDuration: number;
};

/* ---------- COMPONENT ---------- */

export default function ExistingAvailability() {
    const [data, setData] = useState<Availability[]>([]);
    const [activeDate, setActiveDate] = useState<string | null>(null);

    useEffect(() => {
        const fetchAvailability = async () => {
            try {
                const res = await api.get("/availability/my");
                setData(res.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchAvailability();
    }, []);

    /* ---------- GROUP & SORT BY DATE ---------- */
    const normalizeDate = (value: string) => {
        const d = new Date(value);
        return [
            d.getFullYear(),
            String(d.getMonth() + 1).padStart(2, "0"),
            String(d.getDate()).padStart(2, "0"),
        ].join("-");
    };
    const groupedByDate = useMemo(() => {
        const map: Record<string, Availability[]> = {};

        data.forEach((a) => {
            const normalizedDate = normalizeDate(a.date);

            if (!map[normalizedDate]) {
                map[normalizedDate] = [];
            }

            map[normalizedDate].push(a);
        });

        // sort slots within each day
        Object.values(map).forEach((slots) =>
            slots.sort(
                (a, b) =>
                    new Date(a.startTimeUTC).getTime() -
                    new Date(b.startTimeUTC).getTime()
            )
        );

        return Object.entries(map).sort(
            ([dateA], [dateB]) =>
                new Date(dateA).getTime() - new Date(dateB).getTime()
        );
    }, [data]);



    if (!groupedByDate.length) return null;

    return (
        <>
            {/* ================= DAY LIST ================= */}
            <section className="rounded-3xl border border-navy/10 bg-white p-6 space-y-5">
                <h2 className="text-lg font-semibold text-navy">
                    Your Availability
                </h2>

                <div className="space-y-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {groupedByDate.map(([date, slots]) => {
                        const dateObj = new Date(`${date}T00:00:00`);

                        console.log(date, 'dtO');

                        const dateLabel = dateObj.toLocaleDateString(undefined, {
                            weekday: "long",
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                        });

                        return (
                            <button
                                key={date}
                                onClick={() => setActiveDate(date)}
                                className="
                    w-full rounded-2xl border border-gray-200
                    bg-gray-50 px-5 py-4 text-left cursor-pointer
                    transition hover:bg-navy/5 hover:border-navy/20
                "
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-base font-medium text-navy">
                                            {dateLabel}
                                        </p>
                                        <p className="text-sm text-navy/60">
                                            {slots.length} slot
                                            {slots.length > 1 ? "s" : ""}
                                        </p>
                                    </div>

                                    <span className="rounded-full text-xs text-navy">
                                        <EyeIcon  className="w-5 h-5"/>
                                    </span>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </section>

            {/* ================= MODAL ================= */}
            {activeDate && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                    <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-xl">

                        <h3 className="mb-1 text-xl font-semibold text-navy">
                            Availability
                        </h3>

                        <p className="mb-4 text-sm text-navy/60">
                            {new Date(
                                `${activeDate}T00:00:00`
                            ).toLocaleDateString(undefined, {
                                weekday: "long",
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                            })}
                        </p>

                        <div className="space-y-3">
                            {groupedByDate
                                .find(([d]) => d === activeDate)?.[1]
                                .map((slot, i) => (
                                    <div
                                        key={i}
                                        className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 px-4 py-3"
                                    >
                                        <div>
                                            <p className="text-sm font-medium text-navy">
                                                {formatTime(slot.startTimeUTC)} –{" "}
                                                {formatTime(slot.endTimeUTC)}
                                            </p>
                                        </div>

                                        <span className="rounded-full bg-navy/10 px-3 py-1 text-xs font-semibold text-navy">
                                            {slot.slotDuration} min
                                        </span>
                                    </div>
                                ))}
                        </div>

                        <div className="mt-6 flex justify-end">
                            <button
                                onClick={() => setActiveDate(null)}
                                className="
                                    rounded-xl border border-gray-200
                                    px-4 py-2 text-sm font-medium
                                    text-gray-700 hover:bg-gray-100
                                "
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

/* ---------- HELPERS ---------- */

const formatTime = (utc: string) =>
    new Date(utc).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });
