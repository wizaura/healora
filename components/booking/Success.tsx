"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/lib/api";

type AppointmentDetails = {
    doctorName: string;
    date: string;
    startTime: string;
    endTime: string;
};

export default function BookingSuccess() {
    const { appointmentId } = useParams();
    const router = useRouter();

    const [data, setData] = useState<AppointmentDetails | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!appointmentId) return;

        const fetchDetails = async () => {
            try {
                const res = await api.get(`/appointments/${appointmentId}`);
                setData(res.data);
            } catch (err) {
                console.error("Failed to load appointment", err);
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
    }, [appointmentId]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-navy/60">
                Loading booking details…
            </div>
        );
    }

    if (!data) {
        return (
            <div className="min-h-screen flex items-center justify-center text-red-500">
                Booking not found
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-wellness-bg px-4">
            <div className="max-w-md w-full rounded-3xl bg-white p-8 text-center shadow-sm">

                {/* Success icon */}
                <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-600 text-2xl">
                    ✓
                </div>

                <h1 className="text-2xl font-semibold text-navy">
                    Slot booked successfully
                </h1>

                <p className="mt-2 text-sm text-navy/60">
                    Your appointment has been confirmed.
                </p>

                {/* Details */}
                <div className="mt-6 rounded-2xl bg-wellness-bg px-6 py-4 text-left text-sm">
                    <div className="flex justify-between">
                        <span className="text-navy/60">Doctor</span>
                        <span className="font-medium text-navy">
                            {data.doctorName}
                        </span>
                    </div>

                    <div className="flex justify-between mt-2">
                        <span className="text-navy/60">Date</span>
                        <span className="font-medium text-navy">
                            {data.date}
                        </span>
                    </div>

                    <div className="flex justify-between mt-2">
                        <span className="text-navy/60">Time</span>
                        <span className="font-medium text-navy">
                            {data.startTime} – {data.endTime}
                        </span>
                    </div>
                </div>

                <p className="mt-4 text-xs text-navy/50">
                    Consultation fee will be paid directly to the doctor.
                </p>

                <button
                    onClick={() => router.replace("/profile/appointments")}
                    className="mt-6 w-full rounded-xl bg-navy py-3 text-white font-medium"
                >
                    View my appointments
                </button>
            </div>
        </div>
    );
}
