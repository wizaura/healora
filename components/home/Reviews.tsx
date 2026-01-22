"use client";

import { Star } from "lucide-react";

const reviews = [
    {
        name: "Anjali R.",
        role: "Patient",
        rating: 5,
        review:
            "Booking an appointment was incredibly easy. The doctor was very professional and explained everything clearly.",
        avatar: "https://i.pravatar.cc/100?img=15",
    },
    {
        name: "Rahul M.",
        role: "Patient",
        rating: 4,
        review:
            "Healora saved me a lot of time. The online consultation experience was smooth and secure.",
        avatar: "https://i.pravatar.cc/100?img=23",
    },
    {
        name: "Sneha K.",
        role: "Patient",
        rating: 5,
        review:
            "Very clean interface and trusted doctors. Payment and booking were seamless.",
        avatar: "https://i.pravatar.cc/100?img=32",
    },
];

export default function ReviewsSection() {
    return (
        <section className="bg-[#F6FFFD] py-20">
            <div className="mx-auto max-w-7xl px-6">

                {/* Header */}
                <div className="mb-20 text-center">
                    <h2 className="text-4xl font-bold text-gray-900">
                        What Our Patients Say
                    </h2>
                    <p className="mt-3 text-gray-600">
                        Real experiences from people who trusted Healora
                    </p>
                </div>

                {/* Reviews */}
                <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
                    {reviews.map((item, index) => (
                        <div
                            key={index}
                            className="group relative rounded-3xl bg-white p-8 shadow-xl transition hover:-translate-y-2 hover:shadow-2xl"
                        >
                            {/* Floating avatar */}
                            <div className="absolute z-10 -top-6 left-8 h-14 w-14 rounded-full bg-teal-100 p-1 shadow-md">
                                <img
                                    src={item.avatar}
                                    alt={item.name}
                                    className="h-full w-full rounded-full object-cover"
                                />
                            </div>

                            {/* Stars */}
                            <div className="mt-6 flex gap-1">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Star
                                        key={i}
                                        size={16}
                                        className={
                                            i < item.rating
                                                ? "fill-[#9FE2BF] text-[#9FE2BF]"
                                                : "text-gray-300"
                                        }
                                    />
                                ))}
                            </div>

                            {/* Review text */}
                            <p className="mt-4 text-sm text-gray-600 leading-relaxed">
                                “{item.review}”
                            </p>

                            {/* Divider */}
                            <div className="mt-6 h-px w-full bg-gray-100" />

                            {/* User */}
                            <div className="mt-4">
                                <p className="font-semibold text-gray-900">
                                    {item.name}
                                </p>
                                <p className="text-xs text-gray-500">
                                    {item.role}
                                </p>
                            </div>

                            {/* Accent glow */}
                            <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-transparent transition group-hover:ring-teal-400/30" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
