"use client";

import { ArrowUpRight } from "lucide-react";
import { HeartPulse, Stethoscope, Brain, Baby } from "lucide-react";

export const specialities = [
    {
        title: "Cardiology",
        description:
            "Our dedicated cardiology team focuses on your health & comfort, delivering expert services with genuine care.",
        icon: HeartPulse,
    },
    {
        title: "Dermatology",
        description:
            "Discover personalized dermatology services focused on your skin health, featuring expert treatments.",
        icon: Stethoscope,
    },
    {
        title: "Psychiatry",
        description:
            "Comprehensive mental health care with compassionate and confidential support.",
        icon: Brain,
    },
    {
        title: "Pediatrics",
        description:
            "Gentle and expert healthcare services for infants, children, and adolescents.",
        icon: Baby,
    },
];



export default function SpecialtiesSection() {
    return (
        <section className="bg-gradient-to-b from-white via-white to-[#1F4BFF] py-20 m-4 rounded-3xl">
            <div className="mx-auto max-w-7xl px-6">

                {/* Section Header */}
                <div className="my-14 text-center">
                    <span className="inline-block mb-6 rounded-full border border-gray-200 px-8 py-2 text-md text-gray-600 font-medium">
                        Services
                    </span>
                    <h2 className="text-5xl font-medium leading-[1.15] tracking-[-0.02em] text-[#1F2147] md:text-7xl antialiased">
                        Quality Medical Services <br /> For Every Patient
                    </h2>
                </div>

                {/* Cards */}
                <div className="grid gap-8 md:grid-cols-2 max-w-5xl items-center mx-auto">
                    {specialities.map((item, i) => (
                        <div
                            key={i}
                            className="
    flex min-h-[260px] overflow-hidden rounded-3xl
    bg-white shadow-xl transition hover:scale-[1.02]
  "
                        >
                            {/* LEFT GRADIENT PANEL */}
                            <div className="relative w-44 bg-gradient-to-b m-4 rounded-2xl from-[#7F9CFF] via-[#AFC1FF] to-[#EEF2FF]">
                                <div className="absolute left-1/2 top-1/3 -translate-x-1/2">
                                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#1F4BFF] text-white shadow-lg">
                                        <item.icon size={28} />
                                    </div>
                                </div>
                            </div>

                            {/* RIGHT CONTENT */}
                            <div className="flex flex-1 flex-col justify-between px-8 py-7">
                                <div>
                                    <h3 className="mb-3 text-xl font-semibold text-gray-900">
                                        {item.title}
                                    </h3>
                                    <p className="max-w-md text-md leading-relaxed text-gray-600">
                                        {item.description}
                                    </p>
                                </div>

                                {/* BUTTON */}
                                <button
                                    className="
    mt-6 inline-flex w-fit items-center gap-3
    rounded-full border border-gray-200
    bg-white px-4 py-2 text-sm font-medium text-gray-800
    transition-all duration-300
    hover:border-[#1F4BFF] hover:bg-[#1F4BFF] hover:text-white
    group
  "
                                >
                                    Explore More

                                    <span
                                        className="
      flex h-7 w-7 items-center justify-center rounded-full
      bg-[#1F4BFF] text-white transition-all duration-300
      group-hover:bg-white group-hover:text-[#1F4BFF]
    "
                                    >
                                        <ArrowUpRight size={14} />
                                    </span>
                                </button>

                            </div>
                        </div>

                    ))}
                </div>
            </div>
        </section>
    );
}
