"use client";

import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export default function DoctorSummary({ doctorId }: { doctorId: string }) {
    const { data, isLoading } = useQuery({
        queryKey: ["doctor", doctorId],
        queryFn: () =>
            api.get(`/doctor/${doctorId}`).then((res) => res.data),
    });

    if (isLoading) {
        return (
            <div className="mx-auto h-32 max-w-xl animate-pulse rounded-2xl bg-white/60" />
        );
    }

    return (
        <div className="mx-auto max-w-2xl">
            <span className="inline-block mb-6 rounded-full border border-gray-200 bg-white px-6 py-2 text-sm text-gray-600 font-medium">
                Doctor
            </span>

            <h1 className="text-4xl md:text-6xl font-medium leading-[1.15] tracking-[-0.02em] text-[#1F2147]">
                {data.user.name}
            </h1>

            <p className="mx-auto mt-4 max-w-xl text-md text-gray-600">
                {data.speciality.name} • {data.experience} years experience
            </p>

            <div className="mt-6 inline-block rounded-xl bg-white px-5 py-2 text-sm font-semibold text-gray-900 shadow">
                ₹{data.slotFee} per consultation
            </div>
        </div>
    );
}
