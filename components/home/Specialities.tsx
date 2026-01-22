"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRight, HeartPulse, Sparkles, Brain } from "lucide-react";
import CTAButton from "../common/CTAButton";

const services = [
    {
        title: "Orthopedics",
        icon: HeartPulse,
        description:
            "Specialized care for bones, joints, and muscles—focused on restoring mobility, reducing pain, and supporting active lifestyles.",
    },
    {
        title: "Pediatrics",
        icon: Sparkles,
        description:
            "Compassionate pediatric care tailored to children’s unique health needs, supporting healthy growth and long-term well-being.",
    },
    {
        title: "Neurology",
        icon: Brain,
        description:
            "Advanced neurological care for brain, spine, and nervous system conditions, guided by precision diagnostics and expert specialists.",
    },
    {
        title: "Cardiology",
        icon: HeartPulse,
        description:
            "Comprehensive heart care focused on prevention, diagnosis, and treatment—supporting lifelong cardiovascular health.",
    },
    {
        title: "Dermatology",
        icon: Sparkles,
        description:
            "Personalized skin and hair treatments designed to enhance skin health, confidence, and long-term care outcomes.",
    },
];


export default function ServicesScrollSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const onScroll = () => {
            if (!sectionRef.current || !trackRef.current) return;

            const section = sectionRef.current;
            const track = trackRef.current;

            const rect = section.getBoundingClientRect();
            const viewportHeight = window.innerHeight;

            // Section scroll progress (0 → 1)
            const start = 0; // when section top hits viewport top
            const end = rect.height - viewportHeight; // sticky duration

            const scrolled = Math.min(
                Math.max(-rect.top, start),
                end
            );

            const progress = scrolled / end;


            const maxTranslate =
                track.scrollWidth - window.innerWidth + 160;

            track.style.transform = `translateX(-${progress * maxTranslate}px)`;
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative h-[350vh] bg-gradient-to-b m-4 rounded-xl from-[#1F4BFF] to-[#9FE2BF]"
        >
            {/* Sticky viewport */}
            <div className="sticky top-0 h-screen/80 overflow-hidden mb-20">

                {/* Header */}
                <div className="mx-auto max-w-6xl px-8 pt-20 pb-16">
                    <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
                        <h2 className="text-3xl font-semibold text-white leading-tight md:text-6xl">
                            Complete Health
                            <br />
                            Care Solutions.
                        </h2>

                        <div className="flex flex-col items-start gap-6 md:items-end md:text-right">
                            <p className="max-w-md text-white/80 text-lg">
                                Modern medical services designed around your
                                health, comfort, and recovery.
                            </p>

                            <CTAButton label="View All Services" href="/services" className="bg-white text-blue-900" />
                        </div>
                    </div>
                </div>

                {/* Horizontal cards */}
                <div className="relative overflow-hidden">
                    <div
                        ref={trackRef}
                        className="flex gap-6 px-24 py-3 will-change-transform"
                    >
                        {services.map((s, i) => (
                            <div
                                key={i}
                                className="
        w-[460px] shrink-0 overflow-hidden rounded-3xl
        bg-white shadow-xl transition hover:scale-[1.03]
    "
                            >
                                <div className="grid h-full grid-cols-[190px_1fr]">

                                    {/* LEFT ICON PANEL */}
                                    <div className="flex items-center m-4 justify-center rounded-xl bg-gradient-to-b from-[#7F9CFF] to-[#E6ECFF]">
                                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#1F4BFF] text-white shadow-lg">
                                            <s.icon size={30} />
                                        </div>
                                    </div>

                                    {/* RIGHT CONTENT */}
                                    <div className="flex flex-col justify-between p-6">

                                        <div>
                                            <h3 className="text-lg font-semibold text-[#1F2147]">
                                                {s.title}
                                            </h3>

                                            <p className="mt-3 text-base leading-relaxed text-gray-600">
                                                {s.description}
                                            </p>
                                        </div>

                                        {/* CTA */}
                                        <button
                                            className="
                    cursor-pointer group mt-6 inline-flex w-fit items-center gap-2
                    rounded-full border border-gray-200
                    px-4 py-2 text-sm font-medium
                    text-[#1F4BFF] transition
                    hover:bg-[#1F4BFF] hover:text-white
                "
                                        >
                                            Explore More
                                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1F4BFF] text-white group-hover:text-[#1F4BFF] group-hover:bg-white">
                                                <ArrowUpRight size={14} />
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
