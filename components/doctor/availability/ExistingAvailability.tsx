"use client";

import api from "@/lib/api";
import { ArrowLeft, ArrowRight, EyeIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import AvailabilityModal from "./AvailabilityModal";

/* ---------- TYPES ---------- */

export type SlotStatus = "AVAILABLE" | "INACTIVE" | "BOOKED";

export type Slot = {
    id: string;
    startTimeUTC: string;
    endTimeUTC: string;
    status: SlotStatus;
};

export type Availability = {
    id: string;
    date: string;
    slots: Slot[];
};

export default function ExistingAvailability() {
    const [data, setData] = useState<Availability[]>([]);
    const [activeDay, setActiveDay] = useState<Availability | null>(null);
    const [currentMonth, setCurrentMonth] = useState(new Date());

    /* ---------- FETCH FROM BACKEND (MONTH FILTER) ---------- */

    const fetchAvailability = async (monthDate: Date) => {
        try {
            const month = monthDate.toISOString().slice(0, 7); // YYYY-MM
            const res = await api.get(`/availability/my?month=${month}`);
            setData(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchAvailability(currentMonth);
    }, [currentMonth]);

    /* ---------- MONTH SWITCH ---------- */

    const changeMonth = (offset: number) => {
        const newMonth = new Date(currentMonth);
        newMonth.setMonth(currentMonth.getMonth() + offset);
        setCurrentMonth(newMonth);
    };

    const sortedData = useMemo(() => {
        return [...data].sort(
            (a, b) =>
                new Date(a.date).getTime() -
                new Date(b.date).getTime()
        );
    }, [data]);

    return (
        <>
            <section className="rounded-3xl bg-gradient-to-br from-[#F4FBF9] to-white p-8 border border-[#E6F2EF] shadow-sm space-y-8">

                {/* Month Header */}
                <div className="flex items-center justify-between">
                    <button
                        onClick={() => changeMonth(-1)}
                        className="flex items-center gap-2 cursor-pointer px-5 py-2 rounded-xl border border-[#CDE7E2] bg-white text-[#0B2E28] text-sm hover:bg-[#F0FAF7] transition"
                    >
                        <ArrowLeft size={14} />
                        Previous
                    </button>

                    <h2 className="text-2xl font-semibold text-[#0B2E28] tracking-wide">
                        {currentMonth.toLocaleDateString(undefined, {
                            month: "long",
                            year: "numeric",
                        })}
                    </h2>

                    <button
                        onClick={() => changeMonth(1)}
                        className="flex items-center gap-2 cursor-pointer px-5 py-2 rounded-xl border border-[#CDE7E2] bg-white text-[#0B2E28] text-sm hover:bg-[#F0FAF7] transition"
                    >
                        Next
                        <ArrowRight size={14}/>
                    </button>
                </div>

                {/* Empty State */}
                {!sortedData.length && (
                    <div className="text-center py-12 text-[#5F7C76] text-sm">
                        No availability created for this month.
                    </div>
                )}

                {/* Day Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                    {sortedData.map((day) => {
                        const activeCount = day.slots.filter(
                            (s) => s.status === "AVAILABLE"
                        ).length;

                        const booked = day.slots.filter(
                            (s) => s.status === "BOOKED"
                        ).length;

                        const total = day.slots.length;

                        return (
                            <button
                                key={day.id}
                                onClick={() => setActiveDay(day)}
                                className="group rounded-2xl bg-white border border-[#E2F0ED] p-6 text-left hover:shadow-md hover:border-[#B9DED6] transition-all"
                            >
                                <div className="flex justify-between items-center mb-3">
                                    <p className="font-semibold text-[#0B2E28]">
                                        {new Date(day.date).toLocaleDateString(undefined, {
                                            weekday: "short",
                                            day: "numeric",
                                        })}
                                    </p>

                                    <EyeIcon
                                        size={18}
                                        className="cursor-pointer text-[#5F7C76] group-hover:text-[#38D6C4] transition"
                                    />
                                </div>

                                <p className="text-xs text-[#7FA6A0] mb-4">
                                    {total} slots created
                                </p>

                                <div className="flex justify-between text-xs mb-2">
                                    <span className="text-[#1F9E8E]">
                                        {activeCount} Active
                                    </span>
                                    <span className="text-[#C98B00]">
                                        {booked} Booked
                                    </span>
                                </div>

                                {/* Soft Progress Bar */}
                                <div className="h-1.5 bg-[#E6F2EF] rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-[#38D6C4] transition-all"
                                        style={{
                                            width: `${(activeCount / total) * 100}%`,
                                        }}
                                    />
                                </div>
                            </button>
                        );
                    })}
                </div>
            </section>

            {activeDay && (
                <AvailabilityModal
                    day={activeDay}
                    onClose={() => setActiveDay(null)}
                    refresh={() => fetchAvailability(currentMonth)}
                />
            )}
        </>
    );

}
