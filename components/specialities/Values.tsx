"use client";

import { useState } from "react";
import Image from "next/image";

const values = [
    {
        id: 1,
        label: "Compassion",
        title:
            "Care that puts people first.",
        description:
            "We provide thoughtful support and personalized healthcare for every patient.",
        image: "/healora-main-1.jpeg",
    },

    {
        id: 2,
        label: "Respect",
        title:
            "Every patient matters.",
        description:
            "We treat everyone with dignity, empathy, and understanding.",
        image: "/values-respect.jpeg",
    },

    {
        id: 3,
        label: "Integrity",
        title:
            "Honest and ethical care.",
        description:
            "Transparency and trust guide every medical decision we make.",
        image: "/values-integrity.jpeg",
    },

    {
        id: 4,
        label: "Excellence",
        title:
            "Committed to better outcomes.",
        description:
            "We continuously improve care through expertise and innovation.",
        image: "/values-excellence.jpeg",
    },

    {
        id: 5,
        label: "Community",
        title:
            "Supporting healthier lives together.",
        description:
            "We build strong connections through accessible and compassionate healthcare.",
        image: "/values-community.jpeg",
    },
];

export default function ValuesSection() {
    const [active, setActive] = useState(0);
    const current = values[active];

    return (
        <section
            className="
        relative m-4 rounded-3xl
        bg-gradient-to-b from-wellness-bg via-white to-wellness-bg
        py-20
      "
        >
            <div className="mx-auto max-w-7xl px-6">

                {/* HEADER */}
                <div className="mb-20 text-center">

                    <h2 className="text-4xl md:text-6xl font-semibold text-navy-dark">
                        Values that guide our care
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl text-lg text-navy/70">
                        Our principles shape how we deliver personalized healthcare,
                        continuous support, and trusted medical experiences.
                    </p>
                </div>

                {/* MAIN GRID */}
                <div
                    className="
    mx-auto grid max-w-6xl gap-4 md:gap-8
    rounded-3xl bg-white p-4 md:p-8
    grid-cols-1 md:grid-cols-2 lg:grid-cols-[200px_1fr_380px]
    shadow-xl
  "
                >
                    {/* LEFT – SIDE NAV */}
                    <ul className="space-y-6 min-w-0">
                        {values.map((item, index) => (
                            <li
                                key={item.id}
                                onClick={() => setActive(index)}
                                className="group cursor-pointer"
                            >
                                <div className="flex items-center gap-4">
                                    <span
                                        className={`
                      h-[2px] w-6 transition-all
                      ${active === index
                                                ? "bg-wellness-accent"
                                                : "bg-transparent group-hover:bg-navy/30"}
                    `}
                                    />
                                    <span
                                        className={`
                      text-lg transition
                      ${active === index
                                                ? "font-medium text-navy"
                                                : "text-navy/50 group-hover:text-navy"}
                    `}
                                    >
                                        {item.label}
                                    </span>
                                </div>
                            </li>
                        ))}
                    </ul>

                    {/* CENTER – CONTENT */}
                    <div className="rounded-3xl bg-wellness-bg/60 p-5 md:p-10 min-w-0">
                        <span className="text-sm text-navy/40">
                            {String(current.id).padStart(2, "0")} / 05
                        </span>

                        <h3 className="mt-4 text-2xl font-medium leading-snug text-navy-dark">
                            {current.title}
                        </h3>

                        <p className="mt-6 text-navy/70 leading-relaxed">
                            {current.description}
                        </p>
                    </div>

                    {/* RIGHT – IMAGE */}
                    <div className="relative overflow-hidden rounded-2xl w-full min-w-0">
                        <Image
                            src={current.image}
                            alt={current.label}
                            width={420}
                            height={520}
                            unoptimized
                            className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                        />

                        {/* Soft overlay */}
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/20 via-transparent to-transparent" />
                    </div>
                </div>
            </div>
        </section>
    );
}
