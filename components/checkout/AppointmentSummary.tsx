"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Globe } from "lucide-react";
import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export default function AppointmentSummary({
    doctorId,
    date,
    startTime,
    endTime,
}: {
    doctorId: string;
    date: string;
    startTime: string;
    endTime: string;
}) {
    const [expanded, setExpanded] = useState(false);

    const { data, isLoading } = useQuery({
        queryKey: ["doctor", doctorId],
        queryFn: () =>
            api.get(`/doctor/${doctorId}`).then((res) => res.data),
    });

    if (isLoading) {
        return (
            <div className="mx-auto max-w-4xl rounded-3xl bg-white p-16 text-center shadow">
                Loading appointment…
            </div>
        );
    }

    const dateObj = new Date(`${date}T00:00:00`);

    const formattedDate = dateObj.toLocaleDateString(undefined, {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    const time = new Date(startTime).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });

    const timeEnd = new Date(endTime).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });

    return (
        <section className="m-4 rounded-3xl bg-gradient-to-b from-white to-wellness-bg py-16 shadow-sm">
            <div className="mx-auto max-w-5xl px-6 text-center space-y-6">

                <span className="inline-block rounded-full border border-navy/10 bg-white px-6 py-2 text-sm font-medium text-navy/70">
                    Appointment summary
                </span>

                <h2 className="text-3xl md:text-5xl font-semibold text-navy">
                    {data.user.name}
                </h2>

                {/* Specialities */}
                <div className="flex flex-wrap justify-center gap-2">
                    {data.specialities?.map((s: any) => (
                        <span
                            key={s.speciality.id}
                            className="rounded-full bg-navy/5 px-4 py-1 text-xs text-navy"
                        >
                            {s.speciality.name}
                        </span>
                    ))}
                </div>

                {/* Date + Time */}
                <div className="mx-auto flex my-6 max-w-md justify-between rounded-2xl bg-navy px-6 py-4">
                    <span className="text-sm font-medium text-white">
                        {formattedDate}
                    </span>
                    <span className="text-sm font-semibold text-white">
                        {time} - {timeEnd}
                    </span>
                </div>

                {/* Learn More Toggle */}
                <button
                    onClick={() => setExpanded(!expanded)}
                    className="flex items-center justify-center gap-2 text-sm text-navy font-medium mx-auto"
                >
                    {expanded ? "Hide details" : "Learn more"}
                    {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>

                {expanded && (
                    <div className="mt-6 space-y-4 text-sm text-navy/70 max-w-2xl mx-auto">

                        {/* Sub & Mini */}
                        {data.subSpecialities?.length > 0 && (
                            <p>
                                <strong>Sub-specialities:</strong>{" "}
                                {data.subSpecialities.map((s: any) => s.subSpeciality.name).join(", ")}
                            </p>
                        )}

                        {data.miniSpecialities?.length > 0 && (
                            <p>
                                <strong>Mini-specialities:</strong>{" "}
                                {data.miniSpecialities.map((m: any) => m.miniSpeciality.name).join(", ")}
                            </p>
                        )}

                        {/* Languages */}
                        {data.languages?.length > 0 && (
                            <p className="flex items-center justify-center gap-2">
                                <Globe size={14} />
                                {data.languages.map((l: any) => l.language.name).join(", ")}
                            </p>
                        )}

                        {/* Bio */}
                        {data.bio && (
                            <p className="italic text-navy/60">
                                "{data.bio}"
                            </p>
                        )}
                    </div>
                )}

                <p className="text-sm font-medium text-emerald-700">
                    Slot reserved for limited time
                </p>
            </div>
        </section>
    );
}