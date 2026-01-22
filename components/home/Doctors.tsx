"use client";

import { ArrowUpRight } from "lucide-react";
import { useState } from "react";

const doctors = [
    {
        name: "Dr. Samuel Kim",
        specialty: "Dermatologist",
        avatar: "https://i.pravatar.cc/300?img=12",
    },
    {
        name: "Dr. Emily Davis",
        specialty: "Endocrinologist",
        avatar: "https://i.pravatar.cc/300?img=32",
    },
    {
        name: "Dr. Ema Thomson",
        specialty: "Dermatologist",
        avatar: "https://i.pravatar.cc/300?img=47",
    },
    {
        name: "Dr. Oliver Johnson",
        specialty: "Psychiatrist",
        avatar: "https://i.pravatar.cc/300?img=58",
    },
];

export default function DoctorsProjection() {
    const [leftDoctor, setLeftDoctor] = useState(doctors[0]);
    const [rightDoctor, setRightDoctor] = useState(doctors[1]);
    const [slot, setSlot] = useState<"left" | "right">("left");

    const handleSelect = (doctor: typeof doctors[0]) => {
        if (slot === "left") {
            setLeftDoctor(doctor);
            setSlot("right");
        } else {
            setRightDoctor(doctor);
            setSlot("left");
        }
    };

    return (
        <section className="bg-gradient-to-b m-4 rounded-xl from-[#ADE8F4]/50 to-[#1F4BFF] py-16">
            <div className="mx-auto max-w-5xl px-6">

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3 items-start">

                    {/* LEFT CARD */}
                    <DoctorCard doctor={leftDoctor} />

                    {/* CENTER LIST */}
                    <div className="relative z-10 rounded-3xl bg-white/90 p-6 shadow-xl backdrop-blur">
                        <ul className="space-y-5">
                            {doctors.map((doc) => (
                                <li
                                    key={doc.name}
                                    onClick={() => handleSelect(doc)}
                                    className="flex cursor-pointer items-center gap-4 rounded-xl px-4 py-4 transition bg-gray-100 hover:bg-[#E0EAFF]"
                                >
                                    <img
                                        src={doc.avatar}
                                        className="h-10 w-10 rounded-full object-cover"
                                    />
                                    <div>
                                        <p className="font-medium text-[#1F2147]">
                                            {doc.name}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {doc.specialty}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* RIGHT CARD */}
                    <DoctorCard doctor={rightDoctor} />
                </div>
            </div>
        </section>
    );
}

/* ------------------ Doctor Card ------------------ */

function DoctorCard({
    doctor,
}: {
    doctor: {
        name: string;
        specialty: string;
        avatar: string;
    };
}) {
    return (
        <div
            className="
        group relative m-auto w-[300px] overflow-hidden p-3
        rounded-3xl bg-white shadow-[0_30px_60px_-20px_rgba(0,0,0,0.25)]
        transition-all duration-500
        hover:-translate-y-2
    "
        >
            {/* Top info pill */}
            <div
                className="
            relative z-10 mb-3 flex items-center justify-between
            rounded-2xl bg-white/95 px-4 py-2
            shadow-md backdrop-blur
        "
            >
                <div className="flex items-center gap-3">
                    <img
                        src={doctor.avatar}
                        className="h-9 w-9 rounded-full object-cover ring-2 ring-[#EEF2FF]"
                    />
                    <div className="text-left">
                        <p className="text-sm font-semibold text-[#1F2147] leading-tight">
                            {doctor.name}
                        </p>
                        <p className="text-xs text-gray-500">
                            {doctor.specialty}
                        </p>
                    </div>
                </div>

                {/* Go to Doctor */}
                <div
                    className="
                group/action flex h-9 w-9 cursor-pointer items-center justify-center
                rounded-full bg-[#EEF2FF] text-[#2F4CFF]
                transition-all duration-300
                hover:bg-[#2F4CFF] hover:text-white
            "
                    title="View doctor profile"
                >
                    <ArrowUpRight
                        size={16}
                        className="
                    transition-transform duration-300
                    group-hover/action:translate-x-[2px]
                    group-hover/action:-translate-y-[2px]
                "
                    />
                </div>
            </div>

            {/* Image Area */}
            <div className="relative rounded-2xl h-[320px] w-full overflow-hidden">
                <img
                    src={doctor.avatar}
                    alt={doctor.name}
                    className="
                h-full w-full object-cover
                transition-transform duration-700
                group-hover:scale-[1.05]
            "
                />

                {/* Soft gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#3B82F6]/35" />
            </div>

            {/* Bottom glow */}
            {/* <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#3B82F6]/70 to-transparent" /> */}
        </div>

    );
}

