"use client";

import Image from "next/image";
import {
    ArrowUpRight,
    BadgeCheck,
    Stethoscope,
    Globe,
    Clock
} from "lucide-react";

type DoctorCardProps = {
    doctor: any;
    onBook?: (doctorId: string) => void;
};

export default function DoctorCard({ doctor, onBook }: DoctorCardProps) {

    return (
        <div
            className="
            group
            relative
            bg-white
            border border-gray-100
            rounded-xl
            p-6
            shadow-sm
            transition-all
            duration-300
            hover:-translate-y-1
            hover:shadow-xl
        "
        >

            {/* HEADER */}

            <div className="flex items-center gap-4">

                {/* DOCTOR IMAGE */}

                <div
                    className="
                    relative
                    w-20 h-20
                    rounded-full
                    overflow-hidden
                    ring-4 ring-wellness-bg
                    shadow-sm
                    flex-shrink-0
                "
                >

                    {doctor.imageUrl ? (

                        <Image
                            src={doctor.imageUrl}
                            alt={doctor.user?.name || "Doctor"}
                            fill
                            className="object-cover"
                        />

                    ) : (

                        <div
                            className="
                            w-full h-full
                            flex items-center justify-center
                            bg-wellness-bg
                            text-navy
                        "
                        >
                            <Stethoscope size={30} />
                        </div>

                    )}

                    {/* ONLINE INDICATOR (optional future feature) */}

                    {/* 
                    <span className="absolute bottom-1 right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                    */}

                </div>


                {/* NAME + QUALIFICATION */}

                <div className="flex-1">

                    <div className="flex items-center gap-2">

                        <h3 className="font-semibold text-navy-dark text-lg">
                            {doctor.user?.name}
                        </h3>

                        {doctor.isApproved && (

                            <span
                                className="
                                inline-flex items-center gap-1
                                text-xs
                                text-green-600
                            "
                            >
                                <BadgeCheck size={14} />
                            </span>

                        )}

                    </div>

                    {doctor.qualification && (

                        <p className="text-xs text-navy/60 mt-1">
                            {doctor.qualification}
                        </p>

                    )}

                </div>

            </div>


            {/* SPECIALITIES */}

            {doctor.specialities?.length > 0 && (

                <div className="mt-5 flex flex-wrap gap-2">

                    {doctor.specialities.map((s: any) => (

                        <span
                            key={s.speciality?.id}
                            className="
                            text-xs
                            px-3 py-1
                            rounded-full
                            bg-wellness-bg
                            text-navy
                        "
                        >
                            {s.speciality?.name}
                        </span>

                    ))}

                </div>

            )}


            {/* META INFO */}

            <div className="mt-5 space-y-2 text-sm text-navy/70">

                {doctor.experience && (

                    <div className="flex items-center gap-2">

                        <Clock size={14} />

                        <span>
                            {doctor.experience} years experience
                        </span>

                    </div>

                )}

                {doctor.languages?.length > 0 && (

                    <div className="flex items-center gap-2">

                        <Globe size={14} />

                        <span>
                            {doctor.languages
                                .map((l: any) => l.language.name)
                                .join(", ")}
                        </span>

                    </div>

                )}

            </div>


            {/* CTA */}

            <div className="mt-6 pt-4 border-t border-gray-100">

                <button
                    onClick={() => onBook?.(doctor.id)}
                    className="
                    w-full
                    flex items-center justify-center gap-2
                    rounded-xl
                    bg-navy
                    text-white
                    text-sm
                    font-medium
                    py-2.5
                    transition
                    hover:bg-navy-dark
                "
                >

                    Book Appointment

                    <ArrowUpRight size={16} />

                </button>

            </div>

        </div>
    );
}