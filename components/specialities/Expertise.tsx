"use client";

import Image from "next/image";
import { CheckCircle2, Users, ShieldCheck } from "lucide-react";
import CTAButton from "../common/CTAButton";

export default function ExpertiseSection() {
    return (
        <section
            className="
        relative m-4 rounded-3xl
        bg-gradient-to-b from-white via-white to-wellness-bg
        py-20
      "
        >
            <div className="mx-auto max-w-7xl px-6">
                <div className="grid items-start gap-8 md:gap-20 md:grid-cols-2">

                    {/* LEFT – IMAGES */}
                    <div className="relative flex items-start">
                        {/* IMAGE 1 */}
                        <div className="relative z-10 overflow-hidden rounded-3xl shadow-xl border-8 border-white">
                            <Image
                                src="https://picsum.photos/600/600"
                                alt="Doctor"
                                width={420}
                                height={420}
                                unoptimized
                                className="
                  h-[360px] w-[360px] object-cover
                  transition-transform duration-700 hover:scale-105
                "
                            />
                        </div>

                        {/* IMAGE 2 – STEPPED */}
                        <div
                            className="
                absolute left-45 top-45 hidden
                overflow-hidden rounded-3xl
                border-8 border-white
                shadow-2xl md:block
              "
                        >
                            <Image
                                src="https://picsum.photos/601/601"
                                alt="Patient care"
                                width={420}
                                height={420}
                                unoptimized
                                className="
                  h-[380px] w-[380px] object-cover
                  transition-transform duration-700 hover:scale-105
                "
                            />
                        </div>
                    </div>

                    {/* RIGHT – CONTENT */}
                    <div>
                        <span
                            className="
                inline-block mb-4 rounded-full
                border border-navy/10
                bg-white/80 backdrop-blur
                px-8 py-2
                text-sm font-medium text-navy/70
              "
                        >
                            Expertise
                        </span>

                        <h2
                            className="
                text-4xl md:text-6xl
                font-semibold
                leading-[1.15]
                tracking-[-0.02em]
                text-navy-dark
              "
                        >
                            Trusted care for
                            <br />
                            your health.
                        </h2>

                        <p className="mt-6 max-w-lg text-navy/70 leading-relaxed">
                            Count on us for trusted care that prioritizes your health.
                            We provide personalized treatment plans, wellness consultations,
                            and continuous support to make your health journey smooth and effective.
                        </p>

                        {/* POINTS */}
                        <div className="mt-10 space-y-6 border-t border-navy/10 pt-6">
                            <div className="flex items-center gap-4 text-navy/80">
                                <Users className="text-wellness-accent" size={22} />
                                <span>Thousands of patients trust our care and expertise.</span>
                            </div>

                            <div className="flex items-center gap-4 text-navy/80">
                                <ShieldCheck className="text-wellness-accent" size={22} />
                                <span>Recognized and certified for professional excellence.</span>
                            </div>

                            <div className="flex items-center gap-4 text-navy/80">
                                <CheckCircle2 className="text-wellness-accent" size={22} />
                                <span>Proven results with consistent patient satisfaction.</span>
                            </div>
                        </div>

                        {/* CTA */}
                        <div className="mt-8">
                            <CTAButton href="/booking" label="Book Appointment" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
