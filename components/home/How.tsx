"use client";

import {
    Stethoscope,
    CalendarCheck,
    CreditCard,
    Video,
} from "lucide-react";
import CTAButton from "../common/CTAButton";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

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

    useEffect(() => {
        AOS.init({
            duration: 800,
            easing: "ease-out-cubic",
            once: true,
        });
    }, []);

    return (
        <section
            data-aos="fade-up"
            className="bg-gradient-to-b from-wellness-bg via-white to-wellness-bg py-20 m-4 rounded-2xl"
        >
            <div className="mx-auto max-w-7xl px-6">

                {/* HEADER */}
                <div className="mx-auto pb-8">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

                        <h2
                            data-aos="fade-up"
                            data-aos-delay="100"
                            className="text-4xl font-semibold text-navy-dark leading-tight md:text-6xl"
                        >
                            How It Works
                        </h2>

                        <div
                            data-aos="fade-up"
                            data-aos-delay="200"
                            className="flex flex-col items-start gap-6 md:items-end md:text-right"
                        >
                            <p className="max-w-md text-navy/80 text-base md:text-lg">
                                Experience seamless online consultation with 
                                Healora in just a few simple steps
                            </p>

                            <div data-aos="zoom-in" data-aos-delay="300">
                                <CTAButton
                                    label="View Full Process"
                                    href="/consultation-process"
                                    variant="light"
                                />
                            </div>
                        </div>

                    </div>
                </div>

                {/* CARDS */}
                <div className="grid grid-cols-1 gap-4 md:gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {steps.map((step, index) => {
                        const Icon = step.icon;

                        return (
                            <div
                                key={index}
                                data-aos="fade-up"
                                data-aos-delay={100 + index * 100}
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
                                {/* ICON */}
                                <div
                                    className="
                                        flex h-14 w-14 items-center justify-center
                                        rounded-xl bg-navy text-white
                                        shadow-md
                                        transition-transform duration-300
                                        group-hover:scale-110
                                    "
                                >
                                    <Icon size={26} />
                                </div>

                                {/* CONTENT */}
                                <h3 className="mt-6 text-lg font-semibold text-navy">
                                    {step.title}
                                </h3>

                                <p className="mt-3 text-sm leading-relaxed text-navy/70">
                                    {step.description}
                                </p>

                                {/* ACCENT */}
                                <div className="mt-6 h-1 w-10 rounded-full bg-wellness-accent group-hover:w-16 transition-all" />
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}