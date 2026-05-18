"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import DoctorSummary from "./DoctorSummary";
import DatePickerCard from "./DatePicker";
import SlotGrid from "./SlotGrid";
import BookingFooter from "./BookingFooter";
import api from "@/lib/api";
import { CalendarDays } from "lucide-react";

export default function BookingMainPage() {
    const { doctorId } = useParams<{ doctorId: string }>();

    const [date, setDate] = useState<Date | undefined>(undefined);
    const [selectedSlot, setSelectedSlot] = useState<any>(null);
    const [availableDates, setAvailableDates] =
        useState<string[]>([]);
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    useEffect(() => {

        const fetchAvailableDays = async () => {

            try {

                const current =
                    date || new Date();

                const month = [
                    current.getFullYear(),
                    String(
                        current.getMonth() + 1
                    ).padStart(2, "0"),
                ].join("-");

                const res = await api.get(
                    "/availability/days",
                    {
                        params: {
                            doctorId,
                            month,
                            timezone,
                        },
                    }
                );

                const dates =
                    res.data.map(
                        (d: any) => d.date
                    );

                setAvailableDates(dates);

                if (
                    !date &&
                    dates.length
                ) {

                    const firstAvailable =
                        new Date(dates[0]);

                    setDate(firstAvailable);
                }

            } catch (err) {

                console.error(
                    "Failed to fetch available days",
                    err
                );
            }
        };

        fetchAvailableDays();

    }, [doctorId, timezone]);

    return (
        <>
            {/* ================= HERO / HEADER ================= */}
            <section className="py-2">
                <div className="mx-auto text-center">
                    <DoctorSummary doctorId={doctorId} />
                </div>
            </section>

            {/* ================= BOOKING CONTENT ================= */}
            <section className="mx-auto px-4 pb-6">

                <div
                    className="
        flex flex-col md:flex-row
        items-center justify-center
        gap-3
        text-sm
        text-navy/70
        bg-wellness-bg/60
        border border-navy/10
        rounded-xl
        px-4 py-3
        text-center
    "
                >

                    <span className="font-medium text-navy">
                        How to book:
                    </span>

                    <span>
                        Select a <strong>date</strong>
                    </span>

                    <span className="hidden md:block text-navy/30">•</span>

                    <span>
                        Choose an available <strong>time slot</strong>
                    </span>

                    <span className="hidden md:block text-navy/30">•</span>

                    <span>
                        Confirm your <strong>appointment</strong>
                    </span>

                </div>

            </section>


            <section className="mx-auto grid grid-cols-1 md:grid-cols-2 max-w-7xl space-y-4 px-6 pb-16">

                <DatePickerCard date={date} setDate={setDate} availableDates={availableDates} />

                {date ? (

                    <SlotGrid
                        doctorId={doctorId}

                        date={date}

                        selectedSlot={selectedSlot}

                        setSelectedSlot={setSelectedSlot}

                        timezone={timezone}
                    />

                ) : (

                    <div
                        className="
            flex flex-col
            items-center
            justify-center

            rounded-3xl

            bg-white

            px-6 py-12

            text-center
        "
                    >

                        <div
                            className="
                flex h-16 w-16
                items-center
                justify-center

                rounded-full

                bg-navy
            "
                        >

                            <CalendarDays
                                className="
                    h-8 w-8

                    text-white
                "
                            />

                        </div>

                        <h3
                            className="
                mt-5

                text-xl
                font-semibold

                text-slate-900
            "
                        >

                            No Available Slots This Month

                        </h3>

                        <p
                            className="
                mt-3

                max-w-md

                text-sm
                leading-7

                text-slate-500
            "
                        >

                            This doctor currently has no
                            available consultation slots
                            for the selected month.

                            You may try another doctor
                            or check back later for
                            newly added availability.

                        </p>

                    </div>
                )}

            </section>

            <BookingFooter slot={selectedSlot} doctorId={doctorId} date={date} />
        </>
    );
}
