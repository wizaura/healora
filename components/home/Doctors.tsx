"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const doctors = [
    {
        name: "Dr. Anil Kumar",
        specialty: "Cardiologist",
        experience: "12+ years experience",
        avatar: "https://i.pravatar.cc/150?img=32",
    },
    {
        name: "Dr. Sneha Menon",
        specialty: "Dermatologist",
        experience: "9+ years experience",
        avatar: "https://i.pravatar.cc/150?img=47",
    },
    {
        name: "Dr. Rahul Verma",
        specialty: "Pediatrician",
        experience: "10+ years experience",
        avatar: "https://i.pravatar.cc/150?img=12",
    },
    {
        name: "Dr. Meera Nair",
        specialty: "General Physician",
        experience: "8+ years experience",
        avatar: "https://i.pravatar.cc/150?img=58",
    },
];

export default function DoctorsCarousel() {
    const [active, setActive] = useState(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const next = () =>
        setActive((prev) => (prev === doctors.length - 1 ? 0 : prev + 1));

    const prev = () =>
        setActive((prev) => (prev === 0 ? doctors.length - 1 : prev - 1));

    const startAuto = () => {
        stopAuto();
        intervalRef.current = setInterval(next, 4000);
    };

    const stopAuto = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };

    useEffect(() => {
        startAuto();
        return () => stopAuto();
    }, []);

    return (
        <section className="overflow-hidden bg-white py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6">

                {/* Header */}
                <div className="mb-14 text-center">
                    <h2 className="text-4xl font-bold text-gray-900">
                        Our Doctors
                    </h2>
                    <p className="mt-3 text-gray-600">
                        Consult with trusted and experienced professionals
                    </p>
                </div>

                {/* Carousel */}
                {/* Carousel */}
                <div
                    className="relative mx-auto max-w-full overflow-hidden"
                    onMouseEnter={stopAuto}
                    onMouseLeave={startAuto}
                >
                    {/* Viewport (hard clip) */}
                    <div className="relative flex w-full items-center justify-center overflow-hidden">

                        {/* Left Arrow */}
                        <button
                            onClick={prev}
                            className="absolute left-2 z-20 rounded-full bg-white p-3 shadow-md hover:bg-gray-100 sm:left-4 md:left-8"
                        >
                            <ChevronLeft />
                        </button>

                        {/* Cards Track */}
                        <div
                            className="relative flex items-center justify-center"
                            style={{ width: "100%", maxWidth: "100vw" }}
                        >
                            {[-1, 0, 1].map((offset) => {
                                const index =
                                    (active + offset + doctors.length) % doctors.length;

                                const doctor = doctors[index];
                                const isCenter = offset === 0;

                                return (
                                    <div
                                        key={index}
                                        className={`
                            relative shrink-0 transition-all duration-500
                            ${isCenter
                                                ? "z-10 opacity-100 scale-100"
                                                : "pointer-events-none hidden md:block opacity-40 scale-90"
                                            }
                        `}
                                        style={{
                                            width: "min(280px, 85vw)", // 👈 CRITICAL
                                        }}
                                    >
                                        <div
                                            className={`
                                relative mt-12 rounded-[28px] bg-white p-6 pt-16 text-center shadow-xl
                                ${isCenter
                                                    ? "ring-2 ring-teal-500/20"
                                                    : ""
                                                }
                            `}
                                        >
                                            {/* Avatar */}
                                            <div className="absolute left-1/2 top-0 z-20 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-teal-400 to-emerald-500 p-1 shadow-xl">
                                                <img
                                                    src={doctor.avatar}
                                                    alt={doctor.name}
                                                    className="h-full w-full rounded-full object-cover bg-white"
                                                />
                                            </div>

                                            {/* Glow */}
                                            {isCenter && (
                                                <div className="pointer-events-none absolute inset-0 rounded-[28px] bg-gradient-to-b from-teal-50/60 to-transparent" />
                                            )}

                                            <h3 className="mt-6 text-lg font-semibold text-gray-900">
                                                {doctor.name}
                                            </h3>

                                            <p className="text-sm font-medium text-teal-700">
                                                {doctor.specialty}
                                            </p>

                                            <p className="mt-2 text-xs text-gray-500">
                                                {doctor.experience}
                                            </p>

                                            <div className="mx-auto mt-4 h-px w-12 bg-teal-200" />

                                            {isCenter && (
                                                <button className="mt-5 w-full rounded-xl bg-gradient-to-r from-teal-600 to-emerald-500 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:scale-[1.03]">
                                                    Book Appointment
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Right Arrow */}
                        <button
                            onClick={next}
                            className="absolute right-2 z-20 rounded-full bg-white p-3 shadow-md hover:bg-gray-100 sm:right-4 md:right-8"
                        >
                            <ChevronRight />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
