"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/lib/api";

import DoctorRescheduleSummary from "./DoctorRescheduleSummary";
import DatePickerCard from "@/components/booking/DatePicker";
import RescheduleSlotGrid from "./DoctorRescheduleSlotGrid";
import DoctorRescheduleFooter from "./DoctorRescheduleFooter";

export default function DoctorReschedulePage() {

    const { appointmentId } = useParams<{ appointmentId: string }>();

    const [appointment, setAppointment] = useState<any>(null);
    const [date, setDate] = useState<Date>();
    const [selectedSlot, setSelectedSlot] = useState<any>(null);

    useEffect(() => {
        loadAppointment();
    }, []);

    const loadAppointment = async () => {

        const res = await api.get(`/appointments/${appointmentId}`);

        const appt = res.data;

        setAppointment(appt);

        const slotDate = new Date(appt.date);

        setDate(slotDate);
    };

    if (!appointment) return null;

    return (
        <div className="max-w-7xl mx-auto">

            {/* SUMMARY */}

            <section className="py-2">
                <div className="mx-auto text-center">
                    <DoctorRescheduleSummary appointment={appointment} />
                </div>
            </section>

            {/* INSTRUCTIONS */}

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
                        Reschedule Appointment
                    </span>

                    <span>Select a new date</span>

                    <span className="hidden md:block text-navy/30">•</span>

                    <span>Choose an available slot</span>

                    <span className="hidden md:block text-navy/30">•</span>

                    <span>Confirm the new time</span>

                </div>

            </section>

            {/* CONTENT */}

            <section className="mx-auto grid grid-cols-1 md:grid-cols-2 max-w-7xl space-y-4 px-6 pb-16">

                <DatePickerCard
                    date={date}
                    setDate={setDate}
                />

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

            {/* FOOTER */}

            <DoctorRescheduleFooter
                appointmentId={appointmentId}
                slot={selectedSlot}
                doctorId={appointment.doctorId}
                date={date}
            />

        </div>
    );
}