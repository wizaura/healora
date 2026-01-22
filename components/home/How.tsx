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
        <section className="bg-[#9FE2BF] m-4 py-20 rounded-xl">
            <div className="mx-auto max-w-7xl px-6">

                {/* Header */}
                <div className="mb-20 text-center">
                    <h2 className="text-4xl font-bold text-[#0B1215]">
                        How It Works
                    </h2>
                    <p className="mt-3 text-[#0B1215]/70">
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
                                    group relative bg-white p-8 shadow-xl transition-all duration-500
                                    rounded-tl-4xl rounded-br-4xl rounded-tr-md rounded-bl-md
                                    hover:-translate-y-2 hover:shadow-2xl
                                    hover:ring-1 hover:ring-[#1F4BFF]/20
                                "
                            >
                                {/* Step number */}
                                <div className="absolute right-6 top-6 text-5xl font-bold text-[#9FE2BF]">
                                    {step.step}
                                </div>

                                {/* Icon */}
                                <div
                                    className="
                                        flex h-14 w-14 items-center justify-center rounded-xl
                                        bg-gradient-to-br from-[#1F4BFF] to-[#4F7CFF]
                                        text-white shadow-lg transition group-hover:scale-110
                                    "
                                >
                                    <Icon size={26} />
                                </div>

                                {/* Content */}
                                <h3 className="mt-6 text-lg font-semibold text-[#0B1215]">
                                    {step.title}
                                </h3>

                                <p className="mt-3 text-sm text-[#0B1215]/70">
                                    {step.description}
                                </p>

                                {/* Accent line */}
                                <div className="mt-6 h-1 w-10 rounded-full bg-gradient-to-r from-[#1F4BFF] to-[#4F7CFF]" />
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
