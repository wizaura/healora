"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Globe, ChevronDown, ChevronUp, BadgeCheck } from "lucide-react";
import api from "@/lib/api";
import Link from "next/link";

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
        <section className="relative m-4 rounded-3xl bg-gradient-to-b from-white to-wellness-bg pt-20 pb-12">
            <div className="mx-auto max-w-7xl px-6">
                <div className="grid items-start gap-16 md:grid-cols-2">

                    {/* LEFT SIDE */}
                    <div className="space-y-2 text-center md:text-left">

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

                            <div className="text-md text-navy/90 space-y-1">
                                <p>
                                    <span className="font-medium text-lg text-navy">Qualification:</span>{" "}
                                    {data.qualification}
                                </p>

                                <p>
                                    <span className="font-medium text-lg text-navy">Experience:</span>{" "}
                                    {data.experience} Years
                                </p>
                            </div>
                        </div>

                        {/* PRIMARY SPECIALITY */}

                        {data.specialities?.length > 0 && (
                            <div>
                                <p className="text-xs font-medium text-navy/60 mb-2">
                                    Specialities
                                </p>

                                <div className="flex flex-wrap justify-center md:justify-start gap-2">

                                    {data.specialities.map((s: any) => (

                                        <Link
                                            key={s.speciality.id}
                                            href={`/specialities/${s.speciality.slug}`}
                                            className="
            rounded-full
            bg-navy
            px-4
            py-1
            text-sm
            text-white
            transition
            hover:bg-wellness-accent
          "
                                        >
                                            {s.speciality.name}
                                        </Link>

                                    ))}

                                </div>
                            </div>
                        )}

                        {/* KEY EXPERTISE (limited) */}

                        {data.subSpecialities?.length && (
                            <div>
                                <p className="text-xs font-medium text-navy/60 mb-2">
                                    Key Expertise
                                </p>

                                <div className="flex flex-wrap justify-center md:justify-start gap-2">

                                    {[
                                        ...data.subSpecialities.slice(0, 2),
                                    ].map((item: any, i: number) => {

                                        const name =
                                            item.subSpeciality?.name;
                                        const slug =
                                            item.subSpeciality?.slug;

                                        const specialitySlug =
                                            data.specialities?.[0]?.speciality?.slug;

                                        return (
                                            <Link
                                                key={i}
                                                href={`/specialities/${specialitySlug}/${slug}`}
                                                className="
              rounded-full
              bg-navy/10
              px-3
              py-1
              text-xs
              text-navy
              transition
              hover:bg-wellness-accent
              hover:text-white
            "
                                            >
                                                {name}
                                            </Link>
                                        );
                                    })}

                                </div>
                            </div>
                        )}

                        {/* LANGUAGES */}
                        {data.languages?.length > 0 && (
                            <div className="flex items-center justify-center md:justify-start gap-2 text-sm text-navy/70">
                                <span className="font-medium text-lg text-navy">Languages:</span>{" "}
                                {data.languages.map((l: any) => l.language.name).join(", ")}
                            </div>
                        )}

                        {/* PRICE */}
                        <div className="inline-flex items-center gap-3 rounded-xl border border-navy/10 bg-navy/5 px-5 py-3 shadow-sm">
                            <span className="text-lg font-semibold text-navy">
                                ₹{data.consultationFee}
                            </span>
                            <span className="text-sm text-navy/80">
                                per consultation
                            </span>
                        </div>

                        {/* BIO */}
                        {data.bio && (
                            <div className="pt-2">

                                <button
                                    onClick={() => setExpanded(!expanded)}
                                    className="flex items-center gap-2 text-md font-medium text-navy"
                                >
                                    {expanded ? "Hide bio" : "Read full bio"}
                                    {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                </button>

                                {expanded && (
                                    <div className="mt-4 space-y-4">

                                        <p className="whitespace-pre-wrap text-navy/90 text-md leading-relaxed">
                                            {data.bio}
                                        </p>

                                        {/* EXTENDED EXPERTISE */}
                                        {data.miniSpecialities?.length > 0 && (

                                            <div>

                                                <p className="text-xs font-medium text-navy/60 mb-2">
                                                    Areas of Expertise
                                                </p>

                                                <div className="flex flex-wrap gap-2">

                                                    {/* Mini Specialities (Clickable) */}
                                                    {data.miniSpecialities.map((m: any) => {

                                                        const specialitySlug =
                                                            data.specialities?.[0]?.speciality?.slug;

                                                        const subSlug =
                                                            m.miniSpeciality?.subSpeciality?.slug;

                                                        const miniSlug =
                                                            m.miniSpeciality?.slug;

                                                        return (
                                                            <Link
                                                                key={m.miniSpeciality.id}
                                                                href={`/specialities/${specialitySlug}/${subSlug}/${miniSlug}`}
                                                                className="
              rounded-full
              bg-wellness-accent/20
              px-3
              py-1
              text-xs
              text-navy
              transition
              hover:bg-wellness-accent
              hover:text-white
            "
                                                            >
                                                                {m.miniSpeciality.name}
                                                            </Link>
                                                        );
                                                    })}

                                                </div>

                                            </div>

                                        )}

                                    </div>
                                )}

                            </div>
                        )}


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