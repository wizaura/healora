"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import AppointmentSummary from "./AppointmentSummary";
import DatePickerCard from "@/components/booking/DatePicker";
import RescheduleFooter from "./RescheduleFooter";
import api from "@/lib/api";
import RescheduleSlotGrid from "./RescheduleSlotGrid";

export default function ReschedulePage() {

    const { appointmentId } = useParams<{ appointmentId: string }>();

    const [appointment, setAppointment] = useState<any>(null);

    const [date, setDate] = useState<Date | undefined>();
    const [selectedSlot, setSelectedSlot] = useState<any>(null);

    useEffect(() => {
        loadAppointment();
    }, []);

    const loadAppointment = async () => {

        const res = await api.get(`/appointments/${appointmentId}`);

        console.log(res.data,'da')

        const appt = res.data;

        setAppointment(appt);

        const slotDate = new Date(appt.date);

        setDate(slotDate);
    };

    if (!appointment) return null;

    return (
        <>
            {/* SUMMARY */}

            <section className="py-2">
                <div className="mx-auto text-center">
                    <AppointmentSummary appointment={appointment} />
                </div>
            </section>

            {/* HOW TO */}

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
        "
                >

                    <span className="font-medium text-navy">
                        Reschedule:
                    </span>

                    <span>Select a new date</span>

                    <span className="hidden md:block text-navy/30">•</span>

                    <span>Choose another slot</span>

                    <span className="hidden md:block text-navy/30">•</span>

                    <span>Confirm reschedule</span>

                </div>

            </section>

            {/* CONTENT */}

            <section className="mx-auto grid grid-cols-1 md:grid-cols-2 max-w-7xl space-y-4 px-6 pb-16">

                <DatePickerCard date={date} setDate={setDate} />

                {date && (

                    <RescheduleSlotGrid
                        doctorId={appointment.doctorId}
                        date={date}
                        currentSlotId={appointment.slotId}
                        selectedSlot={selectedSlot}
                        setSelectedSlot={setSelectedSlot}
                    />

                )}

            </section>

            <RescheduleFooter
                appointmentId={appointmentId}
                slot={selectedSlot}
                doctorId={appointment.doctorId}
                date={date}
            />
        </>
    );
}