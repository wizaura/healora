"use client";

import { useState } from "react";
import Image from "next/image";

const values = [
    {
        id: 1,
        label: "Compassion",
        title:
            "We celebrate the unique qualities, respect & personal journeys of every resident in all our engagements.",
        description:
            "We offer a range of services tailored to your needs, including personalized treatment plans, wellness consultations, and ongoing support.",
        image: "https://picsum.photos/600/700?1",
    },
    {
        id: 2,
        label: "Respect",
        title:
            "We honor the unique qualities and journeys of each resident, treating every interaction with compassion.",
        description:
            "Compassion-driven services with personalized treatment plans and wellness consultations tailored to your unique needs.",
        image: "https://picsum.photos/600/700?2",
    },
    {
        id: 3,
        label: "Integrity",
        title:
            "We act with honesty, transparency, and accountability in everything we do.",
        description:
            "Our commitment to integrity ensures trust, ethical care, and responsible medical practices.",
        image: "https://picsum.photos/600/700?3",
    },
    {
        id: 4,
        label: "Excellence",
        title:
            "We strive for excellence in healthcare delivery through innovation and expertise.",
        description:
            "By continuously improving, we deliver outstanding clinical outcomes and experiences.",
        image: "https://picsum.photos/600/700?4",
    },
    {
        id: 5,
        label: "Community",
        title:
            "We build meaningful relationships and support healthier communities.",
        description:
            "Our approach strengthens community trust through care, education, and engagement.",
        image: "https://picsum.photos/600/700?5",
    },
];

export default function ValuesSection() {
    const [active, setActive] = useState(0);
    const current = values[active];

    return (
        <section className="bg-gradient-to-b from-white via-white to-[#1F4BFF] py-24 m-4 rounded-3xl">
            <div className="mx-auto max-w-7xl px-6">

                {/* HEADER */}
                <div className="mb-16 text-center">
                    <span className="inline-block rounded-full mb-4 border border-gray-300 px-8 py-2 font-medium text-md text-gray-600">
                        Our Values
                    </span>
                    <h2 className="text-4xl font-semibold text-[#1F2147]  md:text-6xl">
                        Values guide us
                    </h2>
                    <p className="mx-auto mt-4 text-lg max-w-2xl text-gray-700">
                        Our core values shape our approach to providing customized services,
                        such as individualized treatment plans and continuous support.
                    </p>
                </div>

                {/* MAIN GRID */}
                <div className="grid gap-8 max-w-6xl mx-auto md:grid-cols-[220px_1fr_420px] bg-white p-6 rounded-3xl">

                    {/* LEFT – SIDE NAV */}
                    <div className="relative">

                        <ul className="space-y-6 pl-6">
                            {values.map((item, index) => (
                                <li
                                    key={item.id}
                                    onClick={() => setActive(index)}
                                    className="group cursor-pointer"
                                >
                                    <div className="flex items-center gap-4">
                                        <span
                                            className={`h-[2px] w-6 transition-all ${active === index
                                                ? "bg-[#1F4BFF]"
                                                : "bg-transparent group-hover:bg-gray-300"
                                                }`}
                                        />
                                        <span
                                            className={`text-lg transition ${active === index
                                                ? "font-medium text-[#1F4BFF]"
                                                : "text-gray-500 group-hover:text-gray-800"
                                                }`}
                                        >
                                            {item.label}
                                        </span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* CENTER – CONTENT */}
                    <div className="rounded-3xl bg-[#F8FAFF] p-10">
                        <span className="text-sm text-gray-400">
                            {String(current.id).padStart(2, "0")} / 05
                        </span>

                        <h3 className="mt-4 text-2xl font-medium leading-snug text-[#1F2147]">
                            {current.title}
                        </h3>

                        <p className="mt-6 text-gray-600">
                            {current.description}
                        </p>
                    </div>

                    {/* RIGHT – IMAGE */}
                    <div className="overflow-hidden rounded-2xl">
                        <Image
                            src={current.image}
                            alt={current.label}
                            width={420}
                            height={520}
                            unoptimized
                            className="h-full w-full object-cover"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
