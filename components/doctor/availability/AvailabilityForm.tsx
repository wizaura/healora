"use client";

import api from "@/lib/api";
import { useState } from "react";
import toast from "react-hot-toast";

export default function AvailabilityForm() {
    const [date, setDate] = useState("");
    const [start, setStart] = useState("09:00");
    const [end, setEnd] = useState("17:00");
    const [duration, setDuration] = useState<30 | 60>(30);
    const [loading, setLoading] = useState(false);

    const submit = async () => {
        if (!date) {
            toast.error("Please select a date");
            return;
        }

        try {
            setLoading(true);

            await api.post("/availability", {
                date,
                startTime: `${date}T${start}:00`,
                endTime: `${date}T${end}:00`,
                slotDuration: duration,
            });

            toast.success("Availability saved");
        } catch (error: any) {
            toast.error(
                error?.response?.data?.message || "Failed to save availability"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="rounded-xl border p-5 space-y-4 bg-white">
            <h2 className="text-lg font-semibold">Set Availability</h2>

            <input
                type="date"
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => setDate(e.target.value)}
                className="input"
            />

            <div className="flex gap-4">
                <div>
                    <label className="text-sm">Start time</label>
                    <input
                        type="time"
                        value={start}
                        onChange={(e) => setStart(e.target.value)}
                        className="input"
                    />
                </div>

                <div>
                    <label className="text-sm">End time</label>
                    <input
                        type="time"
                        value={end}
                        onChange={(e) => setEnd(e.target.value)}
                        className="input"
                    />
                </div>
            </div>

            <div>
                <p className="text-sm mb-2">Slot duration (full day)</p>
                <div className="flex gap-4">
                    {[30, 60].map((d) => (
                        <label key={d} className="flex items-center gap-2">
                            <input
                                type="radio"
                                checked={duration === d}
                                onChange={() => setDuration(d as 30 | 60)}
                            />
                            {d} minutes
                        </label>
                    ))}
                </div>
            </div>

            <button
                disabled={loading}
                onClick={submit}
                className="w-full rounded-lg bg-black text-white py-2 disabled:opacity-50"
            >
                {loading ? "Saving..." : "Save Availability"}
            </button>
        </div>
    );
}
