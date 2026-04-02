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

  /* ---------- FETCH FROM BACKEND ---------- */

  const fetchAvailability = async (monthDate: Date) => {
    try {
      const month = monthDate.toISOString().slice(0, 7);
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

  /* ---------- MERGE SAME DATES ---------- */

  const sortedData = useMemo(() => {
    const grouped: Record<string, Availability> = {};

    data.forEach((item) => {
      if (!grouped[item.date]) {
        grouped[item.date] = {
          id: item.date,
          date: item.date,
          slots: [],
        };
      }

      grouped[item.date].slots.push(...item.slots);
    });

    return Object.values(grouped).sort(
      (a, b) =>
        new Date(a.date).getTime() -
        new Date(b.date).getTime()
    );
  }, [data]);

  /* ---------- DATE HELPERS ---------- */

  const isPastDate = (dateStr: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const date = new Date(dateStr);
    date.setHours(0, 0, 0, 0);

    return date < today;
  };

  const isToday = (dateStr: string) => {
    const today = new Date();
    const date = new Date(dateStr);

    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  return (
    <>
      <section className="rounded-3xl bg-gradient-to-br from-[#F4FBF9] to-white p-4 md:p-8 border border-[#E6F2EF] shadow-sm space-y-8">

        {/* Month Header */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => changeMonth(-1)}
            className="flex items-center gap-2 px-5 py-2 rounded-xl border border-[#CDE7E2] bg-white text-[#0B2E28] text-sm hover:bg-[#F0FAF7] transition"
          >
            <ArrowLeft size={14} />
            Previous
          </button>

          <h2 className="text-base md:text-2xl font-semibold text-[#0B2E28]">
            {currentMonth.toLocaleDateString(undefined, {
              month: "long",
              year: "numeric",
            })}
          </h2>

          <button
            onClick={() => changeMonth(1)}
            className="flex items-center gap-2 px-5 py-2 rounded-xl border border-[#CDE7E2] bg-white text-[#0B2E28] text-sm hover:bg-[#F0FAF7] transition"
          >
            Next
            <ArrowRight size={14} />
          </button>
        </div>

        {/* Empty State */}
        {!sortedData.length && (
          <div className="text-center py-12 text-[#5F7C76] text-sm">
            No availability created for this month.
          </div>
        )}

        {/* Day Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6">
          {sortedData.map((day) => {
            const past = isPastDate(day.date);
            const today = isToday(day.date);

            const activeCount = day.slots.filter(
              (s) => s.status === "AVAILABLE"
            ).length;

            const booked = day.slots.filter(
              (s) => s.status === "BOOKED"
            ).length;

            const total = day.slots.length;
            const progress = total ? (activeCount / total) * 100 : 0;

            return (
              <button
                key={day.id}
                onClick={() => {
                  if (!past) setActiveDay(day);
                }}
                disabled={past}
                className={`
                  group rounded-2xl border p-5 text-left transition-all
                  ${past
                    ? "bg-slate-100 border-slate-200 opacity-60 cursor-not-allowed"
                    : "bg-white border-[#E2F0ED] hover:shadow-md hover:border-[#B9DED6]"
                  }
                  ${today ? "ring-2 ring-[#38D6C4]" : ""}
                `}
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
                    className="text-[#5F7C76] group-hover:text-[#38D6C4]"
                  />
                </div>

                {past && (
                  <p className="text-xs text-red-500 mb-2">
                    Past date
                  </p>
                )}

                {today && !past && (
                  <p className="text-xs text-[#38D6C4] mb-2 font-medium">
                    Today
                  </p>
                )}

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

                {/* Progress Bar */}
                <div className="h-1.5 bg-[#E6F2EF] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#38D6C4]"
                    style={{ width: `${progress}%` }}
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