"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Globe, ChevronDown, ChevronUp, BadgeCheck } from "lucide-react";
import api from "@/lib/api";

export default function DoctorSummary({ doctorId }: { doctorId: string }) {
    const [expanded, setExpanded] = useState(false);

    const { data, isLoading } = useQuery({
        queryKey: ["doctor", doctorId],
        queryFn: () =>
            api.get(`/doctor/${doctorId}`).then((res) => res.data),
    });

    console.log(data,'hd')

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
        <section className="relative m-4 rounded-3xl bg-gradient-to-b from-white to-wellness-bg py-20">
            <div className="mx-auto max-w-7xl px-6">
                <div className="grid items-center gap-16 md:grid-cols-2">

                    {/* LEFT SIDE */}
                    <div className="space-y-8 text-center">

                        <span className="inline-block rounded-full border border-navy/10 bg-white px-6 py-2 text-sm font-medium text-navy/70">
                            Doctor Profile
                        </span>

                        {/* NAME + VERIFIED */}
                        <div className="space-y-4">
                            <h1 className="text-4xl md:text-6xl font-semibold text-navy leading-tight">
                                {data.user.name}
                            </h1>

                            {data.isApproved && (
                                <div className="inline-flex items-center gap-2 text-sm text-emerald-700">
                                    <BadgeCheck size={16} />
                                    Verified Doctor
                                </div>
                            )}

                            <p className="text-navy/70 text-lg">
                                {data.qualification} • {data.experience} years experience
                            </p>
                        </div>

                        {/* SPECIALITIES */}
                        {data.specialities?.length > 0 && (
                            <div>
                                <p className="text-sm font-medium text-navy/60 mb-3">
                                    Specialities
                                </p>

                                <div className="flex flex-wrap justify-center gap-2">
                                    {data.specialities.map((s: any) => (
                                        <span
                                            key={s.speciality.id}
                                            className="rounded-full bg-navy px-4 py-1.5 text-sm text-white"
                                        >
                                            {s.speciality.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* SUB SPECIALITIES */}
                        {data.subSpecialities?.length > 0 && (
                            <div>
                                <p className="text-sm font-medium text-navy/60 mb-3">
                                    Areas of Expertise
                                </p>

                                <div className="flex flex-wrap justify-center gap-2">
                                    {data.subSpecialities.map((sub: any) => (
                                        <span
                                            key={sub.subSpeciality.id}
                                            className="rounded-full bg-navy/10 px-4 py-1.5 text-sm text-navy"
                                        >
                                            {sub.subSpeciality.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* MINI SPECIALITIES */}
                        {data.miniSpecialities?.length > 0 && (
                            <div>
                                <p className="text-sm font-medium text-navy/60 mb-3">
                                    Focus Areas
                                </p>

                                <div className="flex flex-wrap justify-center gap-2">
                                    {data.miniSpecialities.map((mini: any) => (
                                        <span
                                            key={mini.miniSpeciality.id}
                                            className="rounded-full bg-wellness-accent/20 px-4 py-1.5 text-sm text-navy"
                                        >
                                            {mini.miniSpeciality.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* LANGUAGES */}
                        {data.languages?.length > 0 && (
                            <div className="flex items-center justify-center gap-2 text-sm text-navy/70">
                                <Globe size={16} />
                                {data.languages.map((l: any) => l.language.name).join(", ")}
                            </div>
                        )}

                        {/* BIO (Expandable) */}
                        {data.bio && (
                            <div className="">
                                <button
                                    onClick={() => setExpanded(!expanded)}
                                    className="flex items-center mx-auto gap-2 text-sm font-medium text-navy"
                                >
                                    {expanded ? "Hide bio" : "Read full bio"}
                                    {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                </button>

                                {expanded && (
                                    <p className="mt-4 text-navy/70 leading-relaxed">
                                        {data.bio}
                                    </p>
                                )}
                            </div>
                        )}

                        {/* Pricing */}
                        <div className="inline-flex items-center gap-4 rounded-2xl border border-navy/10 bg-navy/5 px-6 py-4 shadow-sm">
                            <span className="text-lg font-semibold text-navy">
                                ₹{data.consultationFee}
                            </span>
                            <span className="text-sm text-navy/60">
                                per consultation
                            </span>
                        </div>

                    </div>

                    {/* RIGHT SIDE IMAGE */}
                    <div className="relative mx-auto w-full max-w-sm">
                        <div className="relative overflow-hidden rounded-3xl bg-white shadow-xl">
                            <img
                                src={data.user.image || "/doctor-placeholder.png"}
                                alt={data.user.name}
                                className="h-[460px] w-full object-cover"
                            />
                        </div>

                        <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-wellness-accent/30 blur-3xl" />
                    </div>

                </div>
            </div>
        </section>
    );
}