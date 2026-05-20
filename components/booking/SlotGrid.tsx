"use client";

import { useEffect, useMemo, useState } from "react";
import api from "@/lib/api";
import { Clock10 } from "lucide-react";

/* ---------- TYPES ---------- */

type Slot = {
    id: string;
    startTime: string;
    endTime: string;
    duration: 30 | 60;
    category: "FIRST_TIME" | "FOLLOW_UP";
};

type Props = {
    doctorId: string;
    date: Date | undefined;
    selectedSlot: Slot | null;
    setSelectedSlot: (slot: Slot | null) => void;
    timezone: string;
};

/* ---------- COMPONENT ---------- */

export default function SlotGrid({
    doctorId,
    date,
    selectedSlot,
    setSelectedSlot,
    timezone,
}: Props) {

    const [slots, setSlots] =
        useState<Slot[]>([]);

    const [loading, setLoading] =
        useState(false);

    const [
        selectedCategory,

        setSelectedCategory,
    ] = useState<
        "FOLLOW_UP" |
        "FIRST_TIME"
    >("FIRST_TIME");

    /* ---------- DATE STRING ---------- */

    const dateStr = date

        ? [

            date.getFullYear(),

            String(
                date.getMonth() + 1
            ).padStart(2, "0"),

            String(
                date.getDate()
            ).padStart(2, "0"),

        ].join("-")

        : null;

    /* ---------- FETCH SLOTS ---------- */

    useEffect(() => {

        if (
            !doctorId ||

            !dateStr
        ) {

            return;
        }

        const fetchSlots =
            async () => {

                try {

                    setLoading(true);

                    const res =
                        await api.get(

                            "/availability/slots",

                            {
                                params: {

                                    doctorId,

                                    date:
                                        dateStr,

                                    timezone,
                                },
                            }
                        );

                    const mapped: Slot[] =

                        res.data.map(
                            (s: any) => {

                                const start =
                                    new Date(
                                        s.startTimeUTC
                                    );

                                const end =
                                    new Date(
                                        s.endTimeUTC
                                    );

                                const diffMinutes =
                                    (
                                        end.getTime()

                                        -

                                        start.getTime()
                                    )

                                    /

                                    (
                                        1000 * 60
                                    );

                                return {

                                    id: s.id,

                                    startTime:
                                        s.startTimeUTC,

                                    endTime:
                                        s.endTimeUTC,

                                    duration:
                                        diffMinutes as
                                        30 | 60,

                                    category:
                                        s.category,
                                };
                            }
                        );

                    /* ---------- SORT ---------- */

                    const sorted =

                        [...mapped].sort(

                            (a, b) => {

                                const aTime =
                                    new Date(
                                        a.startTime
                                    ).getTime();

                                const bTime =
                                    new Date(
                                        b.startTime
                                    ).getTime();

                                /* ---------- EARLIER FIRST ---------- */

                                if (
                                    aTime !==
                                    bTime
                                ) {

                                    return (
                                        aTime -
                                        bTime
                                    );
                                }

                                /* ---------- SAME TIME -> PREFER FIRST VISIT ---------- */

                                if (

                                    a.category ===
                                    "FIRST_TIME"

                                    &&

                                    b.category !==
                                    "FIRST_TIME"
                                ) {

                                    return -1;
                                }

                                if (

                                    b.category ===
                                    "FIRST_TIME"

                                    &&

                                    a.category !==
                                    "FIRST_TIME"
                                ) {

                                    return 1;
                                }

                                return 0;
                            }
                        );

                    setSlots(sorted);

                } catch (err) {

                    console.error(
                        "Failed to fetch slots",
                        err
                    );

                    setSlots([]);

                } finally {

                    setLoading(false);
                }
            };

        fetchSlots();

    }, [

        doctorId,

        dateStr,

        timezone,
    ]);

    /* ---------- VISIBLE SLOTS ---------- */

    const visibleSlots =
        useMemo(() => {

            return slots.filter(

                (slot) =>

                    slot.category ===
                    selectedCategory
            );

        }, [

            slots,

            selectedCategory,
        ]);

    /* ---------- AUTO SELECT ---------- */

    useEffect(() => {

        if (
            !slots.length
        ) {

            setSelectedSlot(
                null
            );

            return;
        }

        /* ---------- PREFER CURRENT CATEGORY ---------- */

        const preferred =
            visibleSlots[0];

        if (preferred) {

            setSelectedSlot(
                preferred
            );

            return;
        }

        /* ---------- FALLBACK ---------- */

        const fallback =
            slots[0];

        setSelectedSlot(
            fallback
        );

        /* ---------- SYNC CATEGORY ---------- */

        setSelectedCategory(
            fallback.category
        );

        /* ---------- FALLBACK ---------- */

        setSelectedSlot(
            slots[0]
        );

    }, [

        visibleSlots,

        slots,

        setSelectedSlot,
    ]);

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

    /* ---------- UI ---------- */

    return (

        <div className="rounded-2xl bg-white p-6">

            <div className="mx-auto max-w-2xl text-center">

                <span className="mb-4 inline-block rounded-full border border-gray-200 bg-white px-6 py-2 text-sm font-medium text-gray-600">
                    Time Slots
                </span>

                <h2 className="text-2xl font-medium tracking-[-0.02em] text-[#1F2147]">
                    Choose a time slot
                </h2>

                {/* CATEGORY SELECTOR */}

                <div className="mt-6 flex justify-center gap-3">
                    <button
                        onClick={() => {
                            setSelectedCategory(
                                "FIRST_TIME"
                            );

                            setSelectedSlot(
                                null
                            );
                        }}
                        className={`
                                rounded-full px-5 py-2 text-sm font-medium transition
    
                                ${selectedCategory === "FIRST_TIME"
                                ? "bg-blue-600 text-white shadow"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }
                            `}
                    >
                        First Visit
                    </button>

                    <button
                        onClick={() => {
                            setSelectedCategory(
                                "FOLLOW_UP"
                            );

                            setSelectedSlot(
                                null
                            );
                        }}
                        className={`
                            rounded-full px-5 py-2 text-sm font-medium transition

                            ${selectedCategory === "FOLLOW_UP"
                                ? "bg-emerald-600 text-white shadow"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }
                        `}
                    >
                        Follow Up
                    </button>


                </div>

                {/* SLOT HEADER */}

                <div className="mt-8 mb-5 flex items-center justify-between">

                    <div className="flex items-center gap-3">

                        <span
                            className={`
                                rounded-full px-4 py-1.5 text-xs font-semibold

                                ${selectedCategory === "FIRST_TIME"
                                    ? "bg-blue-100 text-blue-700"
                                    : "bg-emerald-100 text-emerald-700"
                                }
                            `}
                        >
                            {selectedCategory ===
                                "FIRST_TIME"
                                ? "First Visit"
                                : "Follow Up"}
                        </span>

                        <p className="text-sm text-gray-500">

                            {selectedCategory ===
                                "FIRST_TIME"
                                ? "New patient consultation"
                                : "Review consultation"}

                        </p>

                    </div>

                    <span className="text-xs text-gray-400">
                        {visibleSlots.length} slots
                    </span>

                </div>

                {/* SLOT GRID */}

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">

                    {!visibleSlots.length && (

                        <div className="col-span-full flex h-64 items-center justify-center">

                            <div className="text-center space-y-3">

                                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-navy/5">

                                    <span className="text-2xl text-navy/40">
                                        <Clock10 />
                                    </span>

                                </div>

                                <p className="text-base font-semibold text-navy">
                                    No slots available
                                </p>

                                <p className="text-sm text-navy/50">

                                    {selectedCategory === "FOLLOW_UP"
                                        ? "Try a First Time consultation slot or choose another date"
                                        : "Try a Follow Up slot or choose another date"}

                                </p>

                            </div>

                        </div>

                    )}

                    {visibleSlots.map((slot) => {

                        const start =
                            formatTime(
                                slot.startTime
                            );

                        const isSelected =
                            selectedSlot?.id ===
                            slot.id;

                        return (

                            <button
                                key={slot.id}
                                onClick={() =>
                                    setSelectedSlot(
                                        isSelected
                                            ? null
                                            : slot
                                    )
                                }
                                className={`
                                    group relative overflow-hidden
                                    rounded-2xl border px-4 py-4
                                    transition-all duration-200

                                    ${isSelected
                                        ? "border-navy bg-navy text-white shadow-lg scale-[1.02]"
                                        : "border-gray-200 bg-white hover:border-navy/30 hover:shadow-sm"
                                    }
                                `}
                            >

                                <div className="space-y-1">

                                    <p
                                        className={`
                                            text-lg font-semibold

                                            ${isSelected
                                                ? "text-white"
                                                : "text-[#1F2147]"
                                            }
                                        `}
                                    >
                                        {start}
                                    </p>

                                </div>

                            </button>

                        );
                    })}

                </div>

                {/* TIMEZONE */}

                <p className="mt-6 text-xs text-gray-500">

                    Times shown in your local timezone (
                    {
                        Intl.DateTimeFormat()
                            .resolvedOptions()
                            .timeZone
                    })

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