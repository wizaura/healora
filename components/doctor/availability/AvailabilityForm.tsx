"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import api from "@/lib/api";
import DatePicker from "@/components/common/DatePicker";
import { CalendarDays, Clock, Timer } from "lucide-react";
import { DateRange } from "react-day-picker";

export default function AvailabilityForm() {
    const [isOpen, setIsOpen] = useState(false);
    const [range, setRange] = useState<DateRange | undefined>();
    const [start, setStart] = useState("09:00");
    const [end, setEnd] = useState("17:00");
    const [duration, setDuration] = useState<30 | 60>(30);
    const [loading, setLoading] = useState(false);

    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const formatDate = (date: Date) =>
        [
            date.getFullYear(),
            String(date.getMonth() + 1).padStart(2, "0"),
            String(date.getDate()).padStart(2, "0"),
        ].join("-");

    const submit = async () => {
        if (!range?.from || !range?.to) {
            toast.error("Please select a date range");
            return;
        }

        const toMinutes = (t: string) => {
            const [h, m] = t.split(":").map(Number);
            return h * 60 + m;
        };

        const startMin = toMinutes(start);
        const endMin = toMinutes(end);

        if (endMin <= startMin) {
            toast.error("End time must be later than start time");
            return;
        }

        const totalMinutes = endMin - startMin;

        if (totalMinutes < duration || totalMinutes % duration !== 0) {
            toast.error("Invalid slot duration for selected time range");
            return;
        }

        const days =
            Math.floor(
                (range.to.getTime() - range.from.getTime()) /
                (1000 * 60 * 60 * 24)
            ) + 1;

        const slotsPerDay = totalMinutes / duration;
        const totalSlots = slotsPerDay * days;

        try {
            setLoading(true);

            await api.post("/availability/range", {
                startDate: formatDate(range.from),
                endDate: formatDate(range.to),
                startTime: start,
                endTime: end,
                slotDuration: duration,
                timezone,
            });

            toast.success(
                `Availability saved (${totalSlots} slots across ${days} days)`
            );

            setIsOpen(false);
            setRange(undefined);
        } catch (error: any) {
            toast.error(error.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const daysSelected =
        range?.from && range?.to
            ? Math.floor(
                (range.to.getTime() - range.from.getTime()) /
                (1000 * 60 * 60 * 24)
            ) + 1
            : 0;

    return (
        <section className="rounded-2xl">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-semibold text-[#1F2147]">
                        Availability
                    </h2>
                    <p className="text-lg text-gray-500">
                        Set availability for multiple days
                    </p>
                </div>

                <button
                    onClick={() => setIsOpen((v) => !v)}
                    className="rounded-xl bg-navy px-5 py-2.5 text-sm font-medium text-white hover:bg-navy/90"
                >
                    {isOpen ? "Close" : "Set availability"}
                </button>
            </div>

            {isOpen && (
                <div className="mt-8 grid gap-8 md:grid-cols-2">

                    {/* LEFT — RANGE CALENDAR */}
                    <div className="rounded-2xl text-center bg-gray-50">
                        <h2 className="text-2xl mb-6 font-medium text-[#1F2147]">
                            Select time & slot duration
                        </h2>

                        <DatePicker
                            mode="range"
                            selectedRange={range}
                            selectRange={setRange}
                        />
                    </div>

                    {/* RIGHT — DETAILS */}
                    <div className="space-y-6 text-center">

                        <h2 className="text-2xl font-medium text-[#1F2147]">
                            Select time & slot duration
                        </h2>

                        <div className="grid grid-cols-2 gap-8">
                            <TimeSelect label="Start time" value={start} onChange={setStart} />
                            <TimeSelect label="End time" value={end} onChange={setEnd} />
                        </div>

                        <div className="flex gap-3">
                            {[30, 60].map((d) => (
                                <button
                                    key={d}
                                    type="button"
                                    onClick={() => setDuration(d as 30 | 60)}
                                    className={`flex-1 rounded-xl px-4 py-3 text-sm font-medium ${duration === d
                                        ? "bg-navy text-white"
                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                        }`}
                                >
                                    {d} minutes
                                </button>
                            ))}
                        </div>

                        {/* Summary */}
                        <div className="rounded-2xl border bg-white p-5 shadow-sm">
                            <div className="flex flex-wrap gap-3 justify-center">

                                <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-xl">
                                    <CalendarDays className="h-4 w-4 text-navy" />
                                    <span className="text-sm font-semibold text-navy">
                                        {daysSelected > 0
                                            ? `${daysSelected} days selected`
                                            : "No dates selected"}
                                    </span>
                                </div>

                                <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-xl">
                                    <Clock className="h-4 w-4 text-navy" />
                                    {start} – {end}
                                </div>

                                <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-xl">
                                    <Timer className="h-4 w-4 text-navy" />
                                    {duration} min slots
                                </div>

                            </div>
                        </div>

                        <button
                            disabled={loading || !range?.from || !range?.to}
                            onClick={submit}
                            className="w-full rounded-xl bg-navy py-4 text-sm font-semibold text-white disabled:opacity-50"
                        >
                            {loading ? "Saving…" : "Save availability"}
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
}

/* ---------- TIME SELECT ---------- */

const generateTimes = () => {
    const times: string[] = [];
    for (let h = 0; h < 24; h++) {
        for (let m = 0; m < 60; m += 30) {
            times.push(
                `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`
            );
        }
    }
    return times;
};

const TIME_OPTIONS = generateTimes();

function TimeSelect({
    label,
    value,
    onChange,
}: {
    label: string;
    value: string;
    onChange: (v: string) => void;
}) {
    return (
        <div className="space-y-3">
            <p className="text-sm font-medium text-gray-700">
                {label}
            </p>

            <div className="flex gap-2 overflow-x-auto pb-1">
                {TIME_OPTIONS.map((t) => {
                    const active = value === t;

                    return (
                        <button
                            key={t}
                            type="button"
                            onClick={() => onChange(t)}
                            className={`
                                min-w-[72px]
                                rounded-xl px-4 py-2
                                text-sm font-medium
                                transition
                                ${active
                                    ? "bg-navy text-white shadow"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }
                            `}
                        >
                            {t}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
