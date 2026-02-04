"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

type Slot = {
    startTime: string;
    endTime: string;
};

export default function SlotGrid({
    doctorId,
    date,
    selectedSlot,
    setSelectedSlot,
}: any) {
    const [slots, setSlots] = useState<Slot[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchSlots = async () => {
            setLoading(true);
            const res = await api.get("/availability/slots", {
                params: { doctorId, date },
            });
            setSlots(res.data);
            setLoading(false);
        };

        fetchSlots();
    }, [doctorId, date]);

    if (loading) {
        return (
            <div className="rounded-2xl border bg-white p-6 text-sm text-gray-500">
                Fetching available slots…
            </div>
        );
    }

    if (!slots.length) {
        return (
            <div className="rounded-2xl border bg-white p-6 text-sm text-gray-500">
                No slots available for this date
            </div>
        );
    }

    return (
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-sm font-medium text-gray-700">
                Available time slots
            </h3>

            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
                {slots.map((slot, idx) => {
                    const time = new Date(slot.startTime).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    });

                    const isSelected =
                        selectedSlot?.startTime === slot.startTime;

                    return (
                        <button
                            key={idx}
                            onClick={() => setSelectedSlot(slot)}
                            className={`rounded-xl border px-4 py-2 text-sm font-medium transition
                ${isSelected
                                    ? "bg-black text-white border-black"
                                    : "bg-white hover:border-black"
                                }`}
                        >
                            {time}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
