"use client";

import { ArrowUpRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import Link from "next/link";
import CTAButton from "../common/CTAButton";
import AOS from "aos";
import "aos/dist/aos.css";

/* ------------------ TYPES ------------------ */

type Doctor = {
    id: string;
    imageUrl: string | null;
    user: {
        name: string;
    };
    specialities: {
        speciality: {
            name: string;
        };
    }[];
};

export default function DoctorsProjection() {

    const { data: doctors = [], isLoading } = useQuery<Doctor[]>({
        queryKey: ["home-doctors"],
        queryFn: () => api.get("/doctor/home").then(res => res.data),
        retry: false,
    });

    const [slot, setSlot] = useState<"left" | "right">("left");
    const [leftDoctor, setLeftDoctor] = useState<Doctor | null>(null);
    const [rightDoctor, setRightDoctor] = useState<Doctor | null>(null);

    useEffect(() => {
        AOS.init({
            duration: 800,
            easing: "ease-out-cubic",
            once: true,
        });
    }, []);

    const handleSelect = (doctor: Doctor) => {
        if (slot === "left") {
            setLeftDoctor(doctor);
            setSlot("right");
        } else {
            setRightDoctor(doctor);
            setSlot("left");
        }

        // refresh animations when content changes
        setTimeout(() => AOS.refresh(), 100);
    };

    if (isLoading) {
        return (
            <section className="py-20 text-center text-navy">
                Loading doctors…
            </section>
        );
    }

    return (
        <section
            data-aos="fade-up"
            className="m-4 rounded-2xl bg-gradient-to-b from-white via-wellness-bg/50 to-wellness-bg pt-6 pb-20"
        >
            <div className="mx-auto max-w-6xl px-6">

                <div className="grid grid-cols-1 gap-4 md:gap-6 md:grid-cols-3 items-center">

                    {/* LEFT CARD */}
                    <div data-aos="fade-right" data-aos-delay="200">
                        <DoctorCard doctor={leftDoctor} />
                    </div>

                    {/* CENTER LIST */}
                    <div
                        data-aos="fade-up"
                        data-aos-delay="100"
                        className="relative rounded-2xl bg-white/40 backdrop-blur-xl border border-white/30 p-4 shadow-xs"
                    >

                        <ul className="space-y-3">

                            {doctors.slice(0, 4).map((doc, index) => (
                                <li
                                    key={doc.id}
                                    data-aos="fade-up"
                                    data-aos-delay={150 + index * 100}
                                    onClick={() => handleSelect(doc)}
                                    className="
                                        flex cursor-pointer items-center gap-4
                                        rounded-xl px-4 py-3
                                        bg-white shadow-xl
                                        hover:bg-gray-50
                                        transition
                                    "
                                >
                                    <img
                                        src={doc.imageUrl || "/doctor-placeholder.png"}
                                        className="h-10 w-10 rounded-full object-cover"
                                    />

                                    <div>
                                        <p className="font-medium text-lg text-gray-900">
                                            {doc.user.name}
                                        </p>

                                        <p className="text-md text-gray-600">
                                            {doc.specialities?.[0]?.speciality?.name || "General"}
                                        </p>
                                    </div>
                                </li>
                            ))}

                            {/* CTA */}
                            <li
                                data-aos="zoom-in"
                                data-aos-delay="500"
                                className="flex justify-center"
                            >
                                <CTAButton
                                    label="View All Doctors"
                                    href="/doctors"
                                    variant="light"
                                />
                            </li>

                        </ul>
                    </div>

                    {/* RIGHT CARD */}
                    <div data-aos="fade-left" data-aos-delay="200">
                        <DoctorCard doctor={rightDoctor} />
                    </div>

                </div>

            </div>
        </section>
    );
}

/* ------------------ DOCTOR CARD ------------------ */

function DoctorCard({ doctor }: { doctor: Doctor | null }) {

    if (!doctor) {
        return (
            <div
                data-aos="fade-up"
                className="m-auto w-[300px] rounded-2xl bg-blur border border-gray-100 shadow-md p-10 text-center text-navy/50"
            >
                Select a doctor
            </div>
        );
    }

    return (
        <div
            data-aos="fade-up"
            className="
                group m-auto w-[300px] overflow-hidden
                rounded-2xl bg-navy
                shadow-[0_30px_60px_-20px_rgba(0,0,0,0.25)]
                transition-all duration-500
                hover:-translate-y-2
            "
        >

            {/* TOP */}
            <div className="flex items-center justify-between p-4">

                <div className="flex items-center gap-3">

                    <img
                        src={doctor.imageUrl || "/doctor-placeholder.png"}
                        className="h-10 w-10 rounded-full object-cover ring-2 ring-wellness-accent/30"
                    />

                    <div>
                        <p className="text-xl font-semibold text-gray-200">
                            {doctor.user.name}
                        </p>

                        <p className="text-md text-gray-400">
                            {doctor.specialities?.[0]?.speciality?.name || "General"}
                        </p>
                    </div>

                </div>

                <Link
                    href={`/booking/${doctor.id}`}
                    className="
                        flex h-9 w-9 items-center justify-center
                        rounded-full bg-wellness-bg
                        text-navy cursor-pointer
                        hover:bg-wellness-accent hover:text-white
                        transition
                    "
                >
                    <ArrowUpRight size={16} />
                </Link>

            </div>

            {/* IMAGE */}
            <div className="relative h-[320px] overflow-hidden rounded-xl mx-3 mb-3">

                <img
                    src={doctor.imageUrl || "/doctor-placeholder.png"}
                    className="
                        h-full w-full object-cover
                        transition-transform duration-700
                        group-hover:scale-105
                    "
                />

                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-wellness-accent/30" />

            </div>

        </div>
    );
}