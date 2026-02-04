"use client";

import { useState } from "react";
import Image from "next/image";

const values = [
    {
        id: 1,
        label: "Compassion",
        title:
            "We celebrate the unique qualities, respect & personal journeys of every patient.",
        description:
            "Personalized care plans, wellness consultations, and continuous support tailored to individual needs.",
        image: "https://picsum.photos/600/700?1",
    },
    {
        id: 2,
        label: "Respect",
        title:
            "Every interaction is guided by dignity, empathy, and understanding.",
        description:
            "We foster trust by honoring patient choices and individual healthcare journeys.",
        image: "https://picsum.photos/600/700?2",
    },
    {
        id: 3,
        label: "Integrity",
        title:
            "Honesty, transparency, and accountability define our medical practices.",
        description:
            "Ethical care and responsible decision-making are at the core of everything we do.",
        image: "https://picsum.photos/600/700?3",
    },
    {
        id: 4,
        label: "Excellence",
        title:
            "We strive for excellence through innovation, expertise, and continuous improvement.",
        description:
            "Delivering outstanding clinical outcomes and patient experiences every day.",
        image: "https://picsum.photos/600/700?4",
    },
    {
        id: 5,
        label: "Community",
        title:
            "Building meaningful relationships for healthier communities.",
        description:
            "We support communities through care, education, and long-term engagement.",
        image: "https://picsum.photos/600/700?5",
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
                    <span
                        className="
              inline-block mb-4 rounded-full
              border border-navy/10
              bg-white/80 backdrop-blur
              px-8 py-2
              text-sm font-medium text-navy/70
            "
                    >
                        Our Values
                    </span>

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
            md:grid-cols-[220px_1fr_420px]
            shadow-xl
          "
                >
                    {/* LEFT – SIDE NAV */}
                    <ul className="space-y-6">
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
                    <div className="rounded-3xl bg-wellness-bg/60 p-5 md:p-10">
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
                    <div className="relative overflow-hidden rounded-2xl">
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
