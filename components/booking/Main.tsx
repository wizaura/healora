"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import DoctorSummary from "./DoctorSummary";
import DatePicker from "./DatePicker";
import SlotGrid from "./SlotGrid";
import BookingFooter from "./BookingFooter";

export default function BookingMainPage() {
    const { doctorId } = useParams<{ doctorId: string }>();

    const [date, setDate] = useState("");
    const [selectedSlot, setSelectedSlot] = useState<any>(null);

    return (
        <>
            {/* ================= HERO / HEADER ================= */}
            <section className="bg-gradient-to-b from-white via-white to-[#1F4BFF] py-24 m-4 rounded-3xl">
                <div className="mx-auto max-w-4xl px-6 text-center">
                    <DoctorSummary doctorId={doctorId} />
                </div>
            </section>

            {/* ================= BOOKING CONTENT ================= */}
            <section className="mx-auto max-w-4xl space-y-6 px-6 pb-32">
                <DatePicker date={date} setDate={setDate} />

                {date && (
                    <SlotGrid
                        doctorId={doctorId}
                        date={date}
                        selectedSlot={selectedSlot}
                        setSelectedSlot={setSelectedSlot}
                    />
                )}
            </section>

            <BookingFooter slot={selectedSlot} />
        </>
    );
}
