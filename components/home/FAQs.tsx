"use client";

import { useEffect, useState } from "react";
import { HelpCircle } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import CTAButton from "../common/CTAButton";

const faqs = [
  {
    question: "Why should I choose Healora?",
    answer:
      "Healora offers verified doctors, transparent pricing, secure payments, and flexible consultation options, all in one trusted healthcare platform.",
  },
  {
    question: "Are doctors on Healora verified?",
    answer:
      "Yes. Every doctor goes through credential verification, experience checks, and continuous quality reviews before joining Healora.",
  },
  {
    question: "Is payment secure on Healora?",
    answer:
      "Yes. Payments are encrypted and processed via industry-standard secure gateways to protect your data.",
  },
  {
    question: "Can I reschedule or cancel appointments?",
    answer:
      "Yes. Appointments can be rescheduled once and cancelled anytime directly from your account.",
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
    <section className="relative overflow-x-hidden m-4 rounded-xl bg-gradient-to-b from-wellness-bg via-white to-wellness-bg py-20">

      <div className="mx-auto max-w-7xl px-4 sm:px-6">

        {/* HEADER */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-center mb-16">

          <h2 className="text-3xl sm:text-4xl md:text-6xl font-semibold text-navy-dark leading-[1.1] break-words">
            Frequently Asked <br /> Questions.
          </h2>

          <div className="flex flex-col gap-6 md:items-end md:text-right max-w-md ml-auto min-w-0">
            <p className="text-navy/70 text-sm sm:text-base md:text-lg break-words">
              Everything you need to know about Healora and how it works.
            </p>

            <CTAButton
              label="View All FAQs"
              href="/faqs"
              variant="primary"
            />
          </div>
        </div>

        {/* CONTENT */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">

          {/* QUESTIONS */}
          <div className="flex flex-col gap-3 min-w-0">
            {faqs.map((faq, index) => (
              <button
                key={index}
                onClick={() => setActive(index)}
                className={`
                  w-full min-w-0
                  group flex items-center gap-4
                  rounded-xl px-4 py-3 text-left
                  transition-all
                  ${active === index
                    ? "bg-white shadow-md scale-[1.02]"
                    : "bg-white/60 hover:bg-white opacity-80"}
                `}
              >
                <div
                  className={`
                    flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full
                    ${active === index
                      ? "bg-wellness-accent text-white"
                      : "bg-wellness-bg text-navy"}
                  `}
                >
                  <HelpCircle size={20} />
                </div>

                <span className="font-medium text-navy truncate">
                  {faq.question}
                </span>
              </button>
            ))}
          </div>

          {/* ANSWER CARD */}
          <div className="relative flex items-start justify-center min-w-0">

            {/* Glow (clipped) */}
            <div className="absolute inset-0 flex justify-center pointer-events-none">
              <div className="w-72 h-72 bg-wellness-accent/20 blur-3xl rounded-full max-w-full" />
            </div>

            <div className="relative w-full max-w-lg rounded-3xl bg-white p-6 sm:p-8 shadow-[0_20px_60px_-10px_rgba(0,0,0,0.2)] min-h-[260px] flex flex-col justify-between overflow-hidden">

              {/* Top line */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-wellness-accent" />

              {/* Icon */}
              <div className="absolute top-3 left-3 w-8 h-8 flex items-center justify-center rounded-full bg-wellness-accent text-white shadow-lg text-sm font-bold">
                ?
              </div>

              {/* Content */}
              <div className="mt-8 min-w-0">
                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-navy leading-snug break-words">
                  {faqs[active].question}
                </h3>

                <p className="mt-4 text-navy/70 leading-relaxed text-sm sm:text-[15px] break-words">
                  {faqs[active].answer}
                </p>
              </div>

              {/* Footer */}
              <div className="mt-6 flex items-center justify-between">
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