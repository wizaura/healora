"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRight, HeartPulse, Sparkles, Brain } from "lucide-react";

const services = [
    { title: "Orthopedics", icon: HeartPulse },
    { title: "Pediatrics", icon: Sparkles },
    { title: "Neurology", icon: Brain },
    { title: "Cardiology", icon: HeartPulse },
    { title: "Dermatology", icon: Sparkles },
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
            className="relative h-[300vh] bg-[#1F4BFF]"
        >
            {/* Sticky viewport */}
            <div className="sticky top-0 h-screen overflow-hidden">

                {/* Header */}
                <div className="mx-auto max-w-7xl px-8 pt-24 pb-16">
                    <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
                        <h2 className="text-5xl font-semibold text-white leading-tight">
                            Complete Health
                            <br />
                            Care Solutions.
                        </h2>

                        <div className="flex flex-col items-start gap-6 md:items-end md:text-right">
                            <p className="max-w-md text-white/80">
                                Modern medical services designed around your
                                health, comfort, and recovery.
                            </p>

                            <button className="flex items-center gap-3 rounded-xl bg-white px-6 py-3 font-semibold text-[#1F4BFF]">
                                View All Services
                                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#EEF2FF]">
                                    <ArrowUpRight size={16} />
                                </span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Horizontal cards */}
                <div className="relative overflow-hidden">
                    <div
                        ref={trackRef}
                        className="flex gap-10 px-24 will-change-transform"
                    >
                        {services.map((s, i) => (
                            <div
                                key={i}
                                className="w-[360px] shrink-0 rounded-3xl bg-white p-8 shadow-xl"
                            >
                                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-b from-[#4F7CFF] to-[#1F4BFF] text-white">
                                    <s.icon size={36} />
                                </div>

                                <h3 className="text-xl font-semibold text-[#1F2147]">
                                    {s.title}
                                </h3>

                                <p className="mt-4 text-gray-600">
                                    Comprehensive specialist care designed to
                                    support long-term health and recovery.
                                </p>

                                <button className="mt-8 flex items-center gap-2 font-medium text-[#1F4BFF]">
                                    Explore More
                                    <ArrowUpRight size={16} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
