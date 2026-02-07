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
            <section className="py-6">
                <div className="mx-auto text-center">
                    <DoctorSummary doctorId={doctorId} />
                </div>
            </section>

            {/* ================= BOOKING CONTENT ================= */}
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
