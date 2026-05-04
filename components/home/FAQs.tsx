"use client";

import { useEffect, useState } from "react";
import { HelpCircle } from "lucide-react";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";
import CTAButton from "../common/CTAButton";

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

    useEffect(() => {
        AOS.init({
            duration: 800,
            easing: "ease-out-cubic",
            once: true,
        });
    }, []);

    return (
        <section className="relative m-4 rounded-xl bg-gradient-to-b from-wellness-bg via-white to-wellness-bg py-20">

            <div className="mx-auto max-w-6xl px-4">

                {/* HEADER (like speciality) */}
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-center mb-16">

                    <h2
                        data-aos="fade-up"
                        className="text-4xl md:text-6xl font-semibold text-navy-dark leading-[1.1]"
                    >
                        Frequently Asked
                        <br />
                        Questions.
                    </h2>

                    <div
                        data-aos="fade-up"
                        data-aos-delay="150"
                        className="flex flex-col gap-6 md:items-end md:text-right max-w-md ml-auto"
                    >
                        <p className="text-navy/70 text-base md:text-lg">
                            Everything you need to know about Healora and how it works.
                        </p>

                        <div data-aos="zoom-in" data-aos-delay="300">
                            <CTAButton
                                label="View All FAQs"
                                href="/faq"
                                variant="light"
                            />
                        </div>
                    </div>

                </div>

                {/* CONTENT */}
                <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">

                    {/* QUESTIONS */}
                    <div className="flex flex-col gap-3">
                        {faqs.map((faq, index) => (
                            <button
                                key={index}
                                onClick={() => setActive(index)}
                                className={`
                  group flex items-center gap-4 rounded-xl px-4 py-2 text-left transition-all
                  ${active === index
                                        ? "bg-white shadow-md scale-[1.02]"
                                        : "bg-white/60 hover:bg-white opacity-80"
                                    }
                `}
                            >
                                <div
                                    className={`
                    flex h-10 w-10 items-center justify-center rounded-full transition
                    ${active === index
                                            ? "bg-wellness-accent text-white"
                                            : "bg-wellness-bg text-navy"
                                        }
                  `}
                                >
                                    <HelpCircle size={20} />
                                </div>

                                <span className="font-medium text-navy">
                                    {faq.question}
                                </span>
                            </button>
                        ))}
                    </div>

                    <div
                        data-aos="fade-left"
                        className="relative flex items-start justify-center"
                    >
                        {/* Background glow */}
                        <div className="absolute w-72 h-72 bg-wellness-accent/20 blur-3xl rounded-full" />

                        <div
                            className="
                                relative w-full max-w-lg
                                rounded-3xl
                                bg-white p-8
                                shadow-[0_20px_60px_-10px_rgba(0,0,0,0.2)]
                                min-h-[280px]
                                flex flex-col justify-between
                                overflow-hidden
                            "
                        >
                            {/* Top accent line */}
                            <div className="absolute top-0 left-0 right-0 h-1.5 bg-wellness-accent" />

                            {/* Floating icon */}
                            <div className="absolute z-40 top-3 left-2 w-8 h-8 flex items-center justify-center rounded-full bg-wellness-accent text-white shadow-lg text-lg font-bold">
                                ?
                            </div>

                            {/* Content */}
                            <div className="mt-6">
                                <h3 className="text-xl md:text-2xl font-semibold text-navy leading-snug">
                                    {faqs[active].question}
                                </h3>

                                <p className="mt-4 text-navy/70 leading-relaxed text-[15px]">
                                    {faqs[active].answer}
                                </p>
                            </div>

                            {/* Bottom section */}
                            <div className="mt-8 flex items-center justify-between">
                                <div className="h-[2px] w-20 bg-wellness-accent/60 rounded-full" />

                                <span className="text-xs font-medium text-navy/50">
                                    {active + 1} / {faqs.length}
                                </span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}