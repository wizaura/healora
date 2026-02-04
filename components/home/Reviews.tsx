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
        <section className="bg-gradient-to-bl from-wellness-bg via-white to-wellness-bg py-24 m-4 rounded-2xl">
            <div className="mx-auto max-w-7xl px-6">

                {/* Header */}
                <div className="mb-20 text-center">
                    <h2 className="text-4xl font-semibold text-navy md:text-5xl">
                        What Our Patients Say
                    </h2>
                    <p className="mt-4 text-navy/70 text-lg">
                        Real experiences from people who trusted Healora
                    </p>
                </div>

                {/* Reviews */}
                <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
                    {reviews.map((item, index) => (
                        <div
                            key={index}
                            className="
                group relative
                rounded-tl-4xl rounded-br-4xl rounded-tr-md rounded-bl-md bg-white
                p-8
                shadow-[0_25px_50px_-20px_rgba(0,0,0,0.25)]
                transition-all duration-500
                hover:-translate-y-2
                hover:shadow-[0_35px_70px_-20px_rgba(0,0,0,0.35)]
                hover:ring-1 hover:ring-wellness-accent/30
              "
                        >
                            {/* Floating avatar */}
                            <div
                                className="
                  absolute z-10 -top-6 left-8
                  h-14 w-14 rounded-full
                  bg-wellness-bg p-1
                  shadow-md
                "
                            >
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
                                                ? "fill-wellness-accent text-wellness-accent"
                                                : "text-gray-300"
                                        }
                                    />
                                ))}
                            </div>

                            {/* Review text */}
                            <p className="mt-4 text-sm leading-relaxed text-navy/70">
                                “{item.review}”
                            </p>

                            {/* Divider */}
                            <div className="mt-6 h-px w-full bg-gray-100" />

                            {/* User */}
                            <div className="mt-4">
                                <p className="font-semibold text-navy">
                                    {item.name}
                                </p>
                                <p className="text-xs text-navy/60">
                                    {item.role}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
