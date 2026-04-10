"use client";

import {
    Stethoscope,
    CalendarCheck,
    CreditCard,
    Video,
    ArrowRight
} from "lucide-react";
import Link from "next/link";
import CTAButton from "../common/CTAButton";

const steps = [
    {
        title: "Choose Doctor / Specialty",
        description:
            "Select a doctor directly or choose your condition first and find the right specialist.",
        icon: Stethoscope,
    },
    {
        title: "Book Your Slot",
        description:
            "Pick your preferred date and time. First sessions are 60 minutes, follow-ups 30 minutes.",
        icon: CalendarCheck,
    },
    {
        title: "Secure Your Appointment",
        description:
            "Pay slot fee or full consultation using Razorpay (India) or Stripe (International).",
        icon: CreditCard,
    },
    {
        title: "Consult Online",
        description:
            "Attend your session via Google Meet or Zoom and receive personalized care.",
        icon: Video,
    },
];

export default function HowItWorks() {
    return (
        <section className="bg-gradient-to-b from-wellness-bg via-white to-wellness-bg py-20 m-4 rounded-2xl">
            <div className="mx-auto max-w-7xl px-6">

                {/* Header */}
                <div className="mx-auto pb-8">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <h2 className="text-4xl font-semibold text-navy-dark leading-tight md:text-6xl">
                            How It Works
                        </h2>

                        <div className="flex flex-col items-start gap-6 md:items-end md:text-right">
                            <p className="max-w-md text-navy/80 text-base md:text-lg">
                                Experience seamless online consultation with 
                                Healora in just a few simple steps
                            </p>

                            <CTAButton
                                label="View Full Process"
                                href="/consultation-process"
                                variant="light"
                            />
                        </div>
                    </div>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 gap-4 md:gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {steps.map((step, index) => {
                        const Icon = step.icon;

                        return (
                            <div
                                key={index}
                                className="
                                group relative
                                rounded-tl-4xl rounded-br-4xl rounded-tr-md rounded-bl-md bg-white
                                p-8
                                shadow-[0_25px_50px_-20px_rgba(0,0,0,0.25)]
                                transition-all duration-500
                                hover:-translate-y-2
                                hover:shadow-[0_35px_70px_-20px_rgba(0,0,0,0.35)]
                                hover:ring-1 hover:ring-wellness-accent/30
                            "
                            >
                                {/* Icon */}
                                <div
                                    className="
                                    flex h-14 w-14 items-center justify-center
                                    rounded-xl
                                    bg-navy
                                    text-white
                                    shadow-md
                                    transition-transform duration-300
                                    group-hover:scale-110
                                "
                                >
                                    <Icon size={26} />
                                </div>

                                {/* Content */}
                                <h3 className="mt-6 text-lg font-semibold text-navy">
                                    {step.title}
                                </h3>

                                <p className="mt-3 text-sm leading-relaxed text-navy/70">
                                    {step.description}
                                </p>

                                {/* Accent line */}
                                <div className="mt-6 h-1 w-10 rounded-full bg-wellness-accent group-hover:w-16 transition-all" />
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}