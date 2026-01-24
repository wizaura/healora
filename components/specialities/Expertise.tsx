"use client";

import Image from "next/image";
import { CheckCircle2, Users, ShieldCheck, ArrowUpRight } from "lucide-react";
import CTAButton from "../common/CTAButton";

export default function ExpertiseSection() {
    return (
        <section className="bg-gradient-to-b from-white via-white to-[#9FE2BF] py-20 m-4 rounded-3xl">
            <div className="mx-auto max-w-7xl px-6">
                <div className="grid items-start gap-16 md:grid-cols-2">

                    {/* LEFT – IMAGES */}
                    <div className="relative flex items-start">
                        {/* IMAGE 1 */}
                        <div className="z-10 overflow-hidden rounded-3xl shadow-lg">
                            <Image
                                src="https://picsum.photos/600/600"
                                alt="Doctor"
                                width={420}
                                height={420}
                                unoptimized
                                className="h-[420px] w-[420px] object-cover"
                            />
                        </div>

                        {/* IMAGE 2 – STEPPED */}
                        <div className="absolute left-24 top-32 hidden overflow-hidden rounded-3xl border-8 border-white shadow-xl md:block">
                            <Image
                                src="https://picsum.photos/601/601"
                                alt="Patient care"
                                width={420}
                                height={420}
                                unoptimized
                                className="h-[400px] w-[400px] object-cover"
                            />
                        </div>
                    </div>


                    {/* RIGHT – CONTENT */}
                    <div>
                        <span className="inline-block rounded-full mb-4 border border-gray-300 px-8 py-2 text-md text-gray-600">
                            Expertise
                        </span>

                        <h2 className="text-4xl font-medium leading-[1.15] tracking-[-0.02em] text-[#1F2147] md:text-6xl antialiased">
                            Trusted care for <br /> your health.
                        </h2>

                        <p className="mt-6 max-w-lg text-gray-600">
                            Count on us for trusted care that prioritizes your health.
                            We provide personalized treatment plans, wellness consultations,
                            and continuous support to make your health journey smooth and effective.
                        </p>

                        <div className="mt-8 space-y-5 border-gray-300 border-t pt-6">
                            <div className="flex items-center gap-3 text-gray-700">
                                <Users className="text-[#1F4BFF]" size={20} />
                                <span>Many patients trust our services and expertise.</span>
                            </div>

                            <div className="flex items-center gap-3 text-gray-700">
                                <ShieldCheck className="text-[#1F4BFF]" size={20} />
                                <span>Recognized officially for our professional expertise.</span>
                            </div>

                            <div className="flex items-center gap-3 text-gray-700">
                                <CheckCircle2 className="text-[#1F4BFF]" size={20} />
                                <span>Proven success in delivering outstanding results.</span>
                            </div>
                        </div>

                        <div className="mt-6">
                            <CTAButton href="/booking" label="Book Appointment" />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
