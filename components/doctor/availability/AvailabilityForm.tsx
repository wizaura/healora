"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import api from "@/lib/api";
import DatePicker from "@/components/common/DatePicker";
import { CalendarDays, Clock, Timer } from "lucide-react";

export default function AvailabilityForm() {
    const [isOpen, setIsOpen] = useState(false);
    const [date, setDate] = useState<Date | undefined>();
    const [start, setStart] = useState("09:00");
    const [end, setEnd] = useState("17:00");
    const [duration, setDuration] = useState<30 | 60>(30);
    const [loading, setLoading] = useState(false);

    const timezone =
        Intl.DateTimeFormat().resolvedOptions().timeZone;


    const dateStr = date
        ? [
            date.getFullYear(),
            String(date.getMonth() + 1).padStart(2, "0"),
            String(date.getDate()).padStart(2, "0"),
        ].join("-")
        : null;

    const submit = async () => {
        if (!dateStr) {
            toast.error("Please select a date");
            return;
        }

        // Convert times to minutes for comparison
        const toMinutes = (t: string) => {
            const [h, m] = t.split(":").map(Number);
            return h * 60 + m;
        };

        const startMin = toMinutes(start);
        const endMin = toMinutes(end);

        if (Number.isNaN(startMin) || Number.isNaN(endMin)) {
            toast.error("Invalid time selected");
            return;
        }

        if (endMin <= startMin) {
            toast.error("End time must be later than start time");
            return;
        }

        const totalMinutes = endMin - startMin;

        if (totalMinutes < duration) {
            toast.error(
                `Time range must be at least ${duration} minutes`
            );
            return;
        }

        if (totalMinutes % duration !== 0) {
            toast.error(
                "Time range must divide evenly into slot duration"
            );
            return;
        }

        const totalSlots = totalMinutes / duration;

        if (totalSlots <= 0) {
            toast.error("No valid slots can be created");
            return;
        }

        try {
            setLoading(true);

            await api.post("/availability", {
                date: dateStr,
                startTime: start,
                endTime: end,
                slotDuration: duration,
                timezone,
            });

            toast.success(
                `Availability saved (${totalSlots} slots created)`
            );
            setIsOpen(false);
        } catch (error: any) {
            toast.error(
                error?.response?.data?.message ||
                "Failed to save availability"
            );
        } finally {
            setLoading(false);
        }
    };


    return (
        <section className="rounded-2xl">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-semibold text-[#1F2147]">
                        Availability
                    </h2>
                    <p className="text-lg text-gray-500">
                        Set when you are available
                    </p>
                </div>

                <button
                    onClick={() => setIsOpen((v) => !v)}
                    className="
                        rounded-xl bg-navy px-5 py-2.5
                        text-sm font-medium text-white
                        transition hover:bg-navy/90 cursor-pointer
                    "
                >
                    {isOpen ? "Close" : "Set availability"}
                </button>
            </div>

            {/* Collapsible Panel */}
            {isOpen && (
                <div className="mt-8 grid gap-8 md:grid-cols-2">

                    {/* LEFT — CALENDAR */}
                    <div className="rounded-2xl text-center bg-gray-50">
                        <span className="mb-4 inline-block rounded-full border border-gray-200 bg-white px-6 py-2 text-sm font-medium text-gray-600">
                            Date
                        </span>

                        <h2 className="text-2xl mb-6 font-medium tracking-[-0.02em] text-[#1F2147]">
                            Select date for availability
                        </h2>

                        <DatePicker
                            selectedDate={date ?? null}
                            selectDate={setDate}
                            isAllowedDate={() => true}
                        />
                    </div>

                    {/* RIGHT — DETAILS */}
                    <div className="space-y-6 text-center">

                        <span className="mb-4 inline-block rounded-full border border-gray-200 bg-white px-6 py-2 text-sm font-medium text-gray-600">
                            Time
                        </span>

                        {/* title */}
                        <h2 className="text-2xl mb-6 font-medium tracking-[-0.02em] text-[#1F2147]">
                            Select the time for slots
                        </h2>


                        {/* Time Range */}
                        <div className="grid grid-cols-2 gap-8">
                            <TimeSelect
                                label="Start time"
                                value={start}
                                onChange={setStart}
                            />
                            <TimeSelect
                                label="End time"
                                value={end}
                                onChange={setEnd}
                            />
                        </div>

                        {/* Slot Duration */}
                        <div className="space-y-2">
                            <p className="text-sm font-medium text-gray-700">
                                Slot duration
                            </p>

                            <div className="flex gap-3">
                                {[30, 60].map((d) => (
                                    <button
                                        key={d}
                                        type="button"
                                        onClick={() => setDuration(d as 30 | 60)}
                                        className={`
                                            flex-1 rounded-xl px-4 py-3
                                            text-sm font-medium transition
                                            ${duration === d
                                                ? "bg-navy text-white"
                                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                            }
                                        `}
                                    >
                                        {d} minutes
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Selected Summary */}
                        <div className="rounded-2xl border border-navy/10 bg-gradient-to-br from-navy/5 to-white p-5">
                            <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-navy">
                                Selected availability
                            </p>

                            <div className="flex flex-wrap gap-3">
                                <div className="flex items-center gap-2 rounded-xl bg-white px-4 py-2 shadow-sm">
                                    <CalendarDays className="h-4 w-4 text-navy" />
                                    <span className="text-sm font-semibold text-navy">
                                        {date
                                            ? date.toLocaleDateString(undefined, {
                                                weekday: "short",
                                                day: "numeric",
                                                month: "short",
                                            })
                                            : "No date"}
                                    </span>
                                </div>

                                <div className="flex items-center gap-2 rounded-xl bg-white px-4 py-2 shadow-sm">
                                    <Clock className="h-4 w-4 text-navy" />
                                    <span className="text-sm font-semibold text-navy">
                                        {start} – {end}
                                    </span>
                                </div>

                                <div className="flex items-center gap-2 rounded-xl bg-white px-4 py-2 shadow-sm">
                                    <Timer className="h-4 w-4 text-navy" />
                                    <span className="text-sm font-semibold text-navy">
                                        {duration} min slots
                                    </span>
                                </div>
                            </div>
                        </div>


                        {/* CTA */}
                        <button
                            disabled={loading || !date}
                            onClick={submit}
                            className="
                                w-full rounded-xl
                                bg-navy py-4
                                text-sm font-semibold text-white
                                transition hover:bg-navy/90
                                disabled:opacity-50
                            "
                        >
                            {loading
                                ? "Saving availability…"
                                : "Save availability"}
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
