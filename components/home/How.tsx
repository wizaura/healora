"use client";

import { Search, CalendarCheck, CreditCard, Video } from "lucide-react";

const steps = [
    {
        title: "Find a Doctor",
        description: "Browse doctors by specialty, experience, and availability.",
        icon: Search,
        step: "01",
    },
    {
        title: "Book a Slot",
        description: "Choose a convenient date and time that fits your schedule.",
        icon: CalendarCheck,
        step: "02",
    },
    {
        title: "Secure Payment",
        description: "Pay safely through our trusted and encrypted payment system.",
        icon: CreditCard,
        step: "03",
    },
    {
        title: "Consult & Get Care",
        description: "Consult online or visit the clinic and get expert care.",
        icon: Video,
        step: "04",
    },
];

export default function HowItWorks() {
    return (
        <section className="bg-navy-dark py-24 m-4 rounded-2xl">
            <div className="mx-auto max-w-7xl px-6">

                {/* Header */}
                <div className="mb-20 text-center">
                    <h2 className="text-4xl font-semibold text-white md:text-5xl">
                        How It Works
                    </h2>
                    <p className="mt-4 text-white/70 text-lg">
                        Book a consultation in four simple steps
                    </p>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
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
                                {/* Step number */}
                                <div className="absolute right-6 top-6 text-5xl font-bold text-wellness-accent/70">
                                    {step.step}
                                </div>

                                {/* Icon */}
                                <div
                                    className="
                    flex h-14 w-14 items-center justify-center
                    rounded-xl
                    bg-gradient-to-br from-wellness-bg to-wellness-accent
                    text-navy-dark
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
                                <div className="mt-6 h-1 w-10 rounded-full bg-wellness-accent" />
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
