"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import DoctorSummary from "./DoctorSummary";
import DatePickerCard from "./DatePicker";
import SlotGrid from "./SlotGrid";
import BookingFooter from "./BookingFooter";

export default function BookingMainPage() {
    const { doctorId } = useParams<{ doctorId: string }>();

    const [date, setDate] = useState<Date | undefined>(undefined);
    const [selectedSlot, setSelectedSlot] = useState<any>(null);

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

                <DatePickerCard date={date} setDate={setDate} />

                {date && (
                    <SlotGrid
                        doctorId={doctorId}
                        date={date}
                        selectedSlot={selectedSlot}
                        setSelectedSlot={setSelectedSlot}
                    />
                )}

            </section>

            <BookingFooter slot={selectedSlot} doctorId={doctorId} date={date} />
        </>
    );
}
