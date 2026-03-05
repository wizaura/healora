"use client";

import Image from "next/image";
import { ArrowUpRight, BadgeCheck, Stethoscope, Globe } from "lucide-react";

type DoctorCardProps = {
    doctor: any;
    onBook?: (doctorId: string) => void;
};

export default function DoctorCard({ doctor, onBook }: DoctorCardProps) {
    return (
        <div
            className="
                group flex min-h-[280px] overflow-hidden
                rounded-3xl bg-white
                shadow-[0_20px_50px_-15px_rgba(0,0,0,0.15)]
                transition-all duration-300
                hover:-translate-y-1 hover:shadow-xl
                flex-col sm:flex-row
            "
        >
            {/* LEFT PANEL */}
            <div
                className="
                    relative flex items-center justify-center
                    m-4 h-32 sm:h-auto sm:w-44
                    rounded-2xl
                    bg-gradient-to-b
                    from-wellness-bg via-white to-white
                "
            >
                {doctor.imageUrl ? (
                    <div className="relative h-20 w-20 rounded-full overflow-hidden shadow-md">
                        <Image
                            src={doctor.imageUrl}
                            alt={doctor.user?.name || "Doctor"}
                            fill
                            className="object-cover"
                        />
                    </div>
                ) : (
                    <div
                        className="
                            flex h-16 w-16 items-center justify-center
                            rounded-full bg-navy text-wellness-accent
                            shadow-md
                        "
                    >
                        <Stethoscope size={26} />
                    </div>
                )}
            </div>

            {/* RIGHT CONTENT */}
            <div className="flex flex-1 flex-col justify-between px-6 py-6">
                {/* TOP */}
                <div>
                    {/* NAME + VERIFIED */}
                    <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-xl font-semibold text-navy-dark">
                            {doctor.user?.name}
                        </h3>

                        {doctor.isApproved && (
                            <span
                                className="
                                    inline-flex items-center gap-1
                                    rounded-full bg-wellness-bg
                                    px-2 py-1 text-xs font-medium
                                    text-navy
                                "
                            >
                                <BadgeCheck size={12} />
                                Verified
                            </span>
                        )}
                    </div>

                    {/* SPECIALITIES */}
                    <div className="mt-3 flex flex-wrap gap-2">
                        {doctor.specialities?.map((s: any) => (
                            <span
                                key={s.speciality?.id}
                                className="rounded-full bg-navy/5 px-3 py-1 text-xs text-navy"
                            >
                                {s.speciality?.name}
                            </span>
                        ))}
                    </div>

                    {/* LANGUAGES */}
                    {doctor.languages?.length > 0 && (
                        <div className="mt-3 flex items-center gap-2 text-xs text-navy/60">
                            <Globe size={14} />
                            {doctor.languages
                                .map((l: any) => l.language.name)
                                .join(", ")}
                        </div>
                    )}

                    {/* EXPERIENCE */}
                    <p className="mt-4 text-sm text-navy/70">
                        {doctor.qualification} • {doctor.experience} yrs experience
                    </p>
                </div>

                {/* FOOTER */}
                <div
                    className="
                        mt-6 flex items-center justify-between gap-4
                        border-t border-navy/10 pt-4
                    "
                >
                    <button
                        onClick={() => onBook?.(doctor.id)}
                        className="
                            group inline-flex items-center gap-2
                            rounded-full
                            border border-navy/20
                            bg-white
                            px-5 py-2
                            text-sm font-semibold
                            text-navy
                            transition-all
                            hover:bg-navy hover:text-white hover:border-navy
                        "
                    >
                        Book Appointment

                        <span
                            className="
                                flex h-7 w-7 items-center justify-center
                                rounded-full bg-navy text-white
                                transition-all
                                group-hover:bg-white group-hover:text-navy
                            "
                        >
                            <ArrowUpRight size={14} />
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
}