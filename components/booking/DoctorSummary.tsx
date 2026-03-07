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

    console.log(data, 'hd')

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
                <div className="grid items-start gap-16 md:grid-cols-2">

                    {/* LEFT SIDE */}
                    <div className="space-y-5 text-center md:text-left">

                        <span className="inline-block rounded-full border border-navy/10 bg-white px-5 py-1.5 text-xs font-medium text-navy/70">
                            Doctor Profile
                        </span>

                        {/* NAME */}
                        <div className="space-y-2">
                            <h1 className="text-3xl md:text-5xl font-semibold text-navy leading-tight">
                                {data.user.name}
                            </h1>

                            {data.isApproved && (
                                <div className="inline-flex items-center gap-2 text-sm text-emerald-700">
                                    <BadgeCheck size={16} />
                                    Verified Doctor
                                </div>
                            )}

                            <p className="text-navy/70 text-base">
                                {data.qualification} • {data.experience} years experience
                            </p>
                        </div>

                        {/* PRIMARY SPECIALITY */}
                        {data.specialities?.length > 0 && (
                            <div>
                                <p className="text-xs font-medium text-navy/60 mb-2">
                                    Specialities
                                </p>

                                <div className="flex flex-wrap justify-center md:justify-start gap-2">

                                    {data.specialities.map((s: any) => (

                                        <span
                                            key={s.speciality.id}
                                            className="
                        rounded-full
                        bg-navy
                        px-4
                        py-1
                        text-sm
                        text-white
                    "
                                        >
                                            {s.speciality.name}
                                        </span>

                                    ))}

                                </div>
                            </div>
                        )}

                        {/* KEY EXPERTISE (limited) */}
                        {(data.subSpecialities?.length || data.miniSpecialities?.length) > 0 && (
                            <div>
                                <p className="text-xs font-medium text-navy/60 mb-2">
                                    Key Expertise
                                </p>

                                <div className="flex flex-wrap justify-center md:justify-start gap-2">
                                    {[
                                        ...data.subSpecialities.slice(0, 2),
                                        ...data.miniSpecialities.slice(0, 2)
                                    ].map((item: any, i: number) => (

                                        <span
                                            key={i}
                                            className="rounded-full bg-navy/10 px-3 py-1 text-xs text-navy"
                                        >
                                            {item.subSpeciality?.name || item.miniSpeciality?.name}
                                        </span>

                                    ))}
                                </div>
                            </div>
                        )}

                        {/* LANGUAGES */}
                        {data.languages?.length > 0 && (
                            <div className="flex items-center justify-center md:justify-start gap-2 text-sm text-navy/70">
                                <Globe size={15} />
                                {data.languages.map((l: any) => l.language.name).join(", ")}
                            </div>
                        )}

                        {/* BIO */}
                        {data.bio && (
                            <div className="pt-2">

                                <button
                                    onClick={() => setExpanded(!expanded)}
                                    className="flex items-center gap-2 text-sm font-medium text-navy"
                                >
                                    {expanded ? "Hide bio" : "Read full bio"}
                                    {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                </button>

                                {expanded && (
                                    <div className="mt-4 space-y-4">

                                        <p className="text-navy/70 text-sm leading-relaxed">
                                            {data.bio}
                                        </p>

                                        {/* EXTENDED EXPERTISE */}
                                        {(data.subSpecialities?.length > 0 ||
                                            data.miniSpecialities?.length > 0) && (

                                                <div>

                                                    <p className="text-xs font-medium text-navy/60 mb-2">
                                                        Areas of Expertise
                                                    </p>

                                                    <div className="flex flex-wrap gap-2">

                                                        {data.subSpecialities.map((s: any) => (
                                                            <span
                                                                key={s.subSpeciality.id}
                                                                className="rounded-full bg-navy/10 px-3 py-1 text-xs text-navy"
                                                            >
                                                                {s.subSpeciality.name}
                                                            </span>
                                                        ))}

                                                        {data.miniSpecialities.map((m: any) => (
                                                            <span
                                                                key={m.miniSpeciality.id}
                                                                className="rounded-full bg-wellness-accent/20 px-3 py-1 text-xs text-navy"
                                                            >
                                                                {m.miniSpeciality.name}
                                                            </span>
                                                        ))}

                                                    </div>

                                                </div>

                                            )}

                                    </div>
                                )}

                            </div>
                        )}

                        {/* PRICE */}
                        <div className="inline-flex items-center gap-3 rounded-xl border border-navy/10 bg-navy/5 px-5 py-3 shadow-sm">
                            <span className="text-lg font-semibold text-navy">
                                ₹{data.consultationFee}
                            </span>
                            <span className="text-xs text-navy/60">
                                per consultation
                            </span>
                        </div>

                    </div>

                    {/* RIGHT SIDE IMAGE */}
                    <div className="relative mx-auto w-full max-w-sm md:sticky md:top-36 self-start">

                        <div className="relative overflow-hidden rounded-3xl bg-white shadow-xl">

                            <img
                                src={data.imageUrl || "/doctor-placeholder.png"}
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