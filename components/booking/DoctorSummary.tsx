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
            <section className="relative m-4 rounded-3xl bg-white/60 py-24">
                <div className="mx-auto max-w-6xl px-6">
                    <div className="h-40 animate-pulse rounded-3xl bg-white/70" />
                </div>
            </section>
        );
    }

    return (
        <section
            className="
        relative m-4 rounded-2xl
        bg-gradient-to-b
        from-white via-white to-wellness-bg
        py-20
    "
        >
            <div className="mx-auto max-w-7xl px-6">
                <div className="grid items-center gap-16 md:grid-cols-2">

                    {/* LEFT — DOCTOR DETAILS */}
                    <div className="space-y-6">

                        {/* Label */}
                        <span
                            className="
                        inline-block
                        rounded-full
                        border border-navy/10
                        bg-white/80
                        px-8 py-2
                        text-sm font-medium
                        text-navy/70
                        backdrop-blur
                    "
                        >
                            Doctor Profile
                        </span>

                        {/* Name */}
                        <div className="space-y-3">
                            <h1
                                className="
                            text-4xl md:text-6xl
                            font-semibold
                            leading-[1.15]
                            tracking-[-0.02em]
                            text-navy
                        "
                            >
                                {data.user.name}
                            </h1>

                            <p className="text-md text-navy/70">
                                <span className="font-medium text-lg">{data.speciality.name}</span> • <span className="font-medium">{data.experience}</span> years experience
                            </p>
                        </div>

                        {/* Sub-specialities */}
                        {data.subSpecialities?.length > 0 && (
                            <div className="space-y-2 mx-auto text-center">
                                <p className="text-sm font-medium text-navy/60">
                                    Areas of expertise
                                </p>
                                <ul className="flex flex-wrap justify-center gap-2">
                                    {data.subSpecialities.map((sub: any) => (
                                        <li
                                            key={sub.subSpeciality.id}
                                            className="
                rounded-full
                bg-navy
                px-4 py-1.5
                text-sm
                text-wellness-bg
                shadow-sm
            "
                                        >
                                            {sub.subSpeciality.name}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Pricing & status */}
                        <div
                            className="
                        inline-flex
                        items-center
                        gap-4
                        rounded-2xl
                        border border-navy/10
                        bg-navy/10
                        px-6 py-4
                        shadow-sm
                    "
                        >
                            <span className="text-sm font-semibold text-navy">
                                ₹{data.slotFee} / consultation
                            </span>

                            <span className="h-4 w-px bg-navy/10" />

                            <span className="text-sm font-medium text-emerald-800">
                                Verified Doctor
                            </span>
                        </div>
                    </div>

                    {/* RIGHT — IMAGE */}
                    <div className="relative mx-auto w-full max-w-sm">
                        <div
                            className="
                        relative overflow-hidden
                        rounded-3xl
                        bg-white
                        shadow-xl
                    "
                        >
                            <img
                                src={data.user.image || "/doctor-placeholder.png"}
                                alt={data.user.name}
                                className="h-[440px] w-full object-cover"
                            />
                        </div>

                        {/* Accent glow */}
                        <div
                            className="
                        absolute -bottom-8 -left-8
                        h-32 w-32
                        rounded-full
                        bg-wellness-accent/30
                        blur-3xl
                    "
                        />
                    </div>

                </div>
            </div>
        </section>
    );
}
