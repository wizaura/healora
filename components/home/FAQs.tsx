"use client";

import { useState } from "react";
import { HelpCircle } from "lucide-react";

const faqs = [
    {
        question: "Why should I choose Healora?",
        answer:
            "Healora offers verified doctors, transparent pricing, secure payments, and flexible consultation options — all in one trusted healthcare platform.",
    },
    {
        question: "Are doctors on Healora verified?",
        answer:
            "Yes. Every doctor goes through credential verification, experience checks, and continuous quality reviews before joining Healora.",
    },
    {
        question: "Can I consult doctors online?",
        answer:
            "Absolutely. Healora supports secure online consultations along with in-clinic visits, giving you full flexibility.",
    },
    {
        question: "Is payment secure on Healora?",
        answer:
            "Yes. Payments are encrypted and processed via industry-standard secure gateways to protect your data.",
    },
    {
        question: "Can I reschedule or cancel appointments?",
        answer:
            "Yes. Appointments can be rescheduled or cancelled easily within the allowed time window from your account.",
    },
];

export default function FAQsSection() {
    const [active, setActive] = useState(0);

    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-[#E6FBF6] via-white to-[#F0FFFC] py-20">
            {/* Background glow */}
            <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-teal-300/20 blur-3xl" />
            <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-emerald-300/20 blur-3xl" />

            <div className="relative mx-auto max-w-7xl px-6">

                {/* Header */}
                <div className="mb-12 text-center">
                    <h2 className="text-4xl font-bold text-gray-900">
                        FAQs — Why Healora
                    </h2>
                    <p className="mt-3 text-gray-600">
                        Clear answers to help you book with confidence
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">

                    {/* Questions Stack */}
                    <div className="flex flex-col gap-4">
                        {faqs.map((faq, index) => (
                            <button
                                key={index}
                                onClick={() => setActive(index)}
                                className={`group flex items-center gap-4 rounded-xl p-5 text-left transition-all
                                    ${active === index
                                        ? "bg-white shadow-lg scale-[1.02]"
                                        : "bg-white/60 opacity-70 hover:opacity-100"
                                    }`}
                            >
                                <div
                                    className={`flex h-10 w-10 items-center justify-center rounded-full
                                        ${active === index
                                            ? "bg-teal-600 text-white"
                                            : "bg-teal-100 text-teal-600"
                                        }`}
                                >
                                    <HelpCircle size={20} />
                                </div>

                                <span className="font-medium text-gray-900">
                                    {faq.question}
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* Active Answer Card */}
                    <div className="relative flex items-center justify-center">
                        {/* Glow backdrop */}
                        <div className="absolute h-72 w-72 rounded-full bg-teal-300/20 blur-3xl" />

                        <div className="relative w-full max-w-lg rounded-[32px] bg-white p-10 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.25)] transition-all duration-500">

                            {/* Top Accent */}
                            <div className="absolute inset-x-0 top-0 h-1.5 rounded-t-[32px] bg-gradient-to-r from-teal-500 to-emerald-500" />

                            {/* Quote mark */}
                            <div className="absolute -top-6 left-8 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-teal-600 to-emerald-500 text-white shadow-lg">
                                <span className="text-2xl font-bold">?</span>
                            </div>

                            {/* Content */}
                            <h3 className="mt-6 text-xl font-semibold leading-snug text-gray-900">
                                {faqs[active].question}
                            </h3>

                            <p className="mt-4 text-gray-600 leading-relaxed">
                                {faqs[active].answer}
                            </p>

                            {/* Bottom meta */}
                            <div className="mt-8 flex items-center justify-between">
                                <div className="h-px w-16 bg-gradient-to-r from-teal-400 to-emerald-400" />
                                <span className="text-xs font-medium text-teal-600">
                                    Healora Care
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
