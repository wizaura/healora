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

                        <Image
                            src={doctor.imageUrl || '/doctor-placeholder.png'}
                            alt={doctor.user?.name || "Doctor"}
                            fill
                            className="object-cover"
                        />

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

                        <p className="text-xs text-navy/85 mt-1">
                            <span className="font-semibold text-sm text-gray-800">Qualifications:</span> {doctor.qualification}
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

                        <div className="flex flex-row gap-1 items-center">
                            <Clock size={14} className="mt-1" />
                            <span className="font-semibold text-md text-gray-800">Experience:</span>
                        </div>

                        <span>
                            {doctor.experience} years experience
                        </span>

                    </div>

                )}

                {doctor.languages?.length > 0 && (

                    <div className="flex items-center gap-2">

                        <div className="flex flex-row gap-1 items-center">
                            <Globe size={14} className="mt-1" />
                            <span className="font-semibold text-md text-gray-800">Language:</span>
                        </div>

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
                    w-full cursor-pointer
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