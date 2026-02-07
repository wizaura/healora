"use client";

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
    const { data, isLoading } = useQuery({
        queryKey: ["doctor", doctorId],
        queryFn: () =>
            api.get(`/doctor/${doctorId}`).then((res) => res.data),
    });

    if (isLoading) {
        return (
            <div className="mx-auto max-w-4xl rounded-2xl bg-white/60 p-16 text-center">
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
        <section
            className="
                relative m-4 rounded-2xl
                bg-gradient-to-b
                from-white via-white to-wellness-bg
                py-20
            "
        >
            <div className="mx-auto max-w-5xl px-6 text-center space-y-6">

                <span className="inline-block rounded-full border border-navy/10 bg-white/80 px-8 py-2 text-sm font-medium text-navy/70">
                    Appointment summary
                </span>

                <h2 className="text-3xl md:text-6xl font-semibold text-navy">
                    {data.user.name}
                </h2>

                <p className="text-navy inline bg-wellness-accent px-4 py-2 rounded-full">
                    <span className="font-medium">{data.speciality.name}</span>
                </p>

                <div className="mx-auto flex my-6 max-w-md justify-between rounded-2xl bg-navy px-6 py-4">
                    <span className="text-sm font-medium text-wellness-bg">
                        {formattedDate}
                    </span>
                    <span className="text-sm font-semibold text-wellness-bg">
                        {time} - {timeEnd}
                    </span>
                </div>

                <p className="text-sm font-medium text-emerald-800">
                    Slot reserved for limited time
                </p>
            </div>
        </section>
    );
}
