"use client";

import { HeartPulse, Sparkles, Baby, Stethoscope } from "lucide-react";

const specialties = [
    {
        title: "Cardiology",
        description: "Advanced heart care by certified specialists.",
        image:
            "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80",
        icon: HeartPulse,
    },
    {
        title: "Dermatology",
        description: "Skin & hair care with modern treatments.",
        image:
            "https://images.unsplash.com/photo-1580281658629-7bafc30c7b74?auto=format&fit=crop&w=800&q=80",
        icon: Sparkles,
    },
    {
        title: "Pediatrics",
        description: "Gentle and expert care for the children.",
        image:
            "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=800&q=80",
        icon: Baby,
    },
    {
        title: "General Medicine",
        description: "Primary care for everyday health needs.",
        image:
            "https://images.unsplash.com/photo-1550831107-1553da8c8464?auto=format&fit=crop&w=800&q=80",
        icon: Stethoscope,
    },
];

export default function SpecialtiesSection() {
    return (
        <section className="bg-[#0E4F52] py-20">
            <div className="mx-auto max-w-7xl px-6">

                {/* Header */}
                <div className="mb-20 text-center">
                    <h2 className="text-4xl font-bold text-white">
                        Specialties
                    </h2>
                    <p className="mt-3 text-teal-100">
                        Personalized care across trusted medical fields
                    </p>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {specialties.map((item, index) => {
                        const Icon = item.icon;

                        return (
                            <div key={index} className="group relative text-center">

                                {/* Image Card */}
                                <div className="relative mx-auto h-48 w-full max-w-[320px] overflow-hidden rounded-3xl bg-white shadow-xl transition duration-500 group-hover:-translate-y-3 group-hover:shadow-2xl">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                                </div>

                                {/* Floating Icon (between cards) */}
                                <div className="relative z-20 mx-auto -mt-6 flex h-14 w-14 items-center justify-center rounded-full bg-teal-600 text-white shadow-lg ring-4 ring-[#0E4F52] transition group-hover:scale-110">
                                    <Icon size={24} />
                                </div>

                                {/* Text Card */}
                                <div className="relative z-10 mx-auto -mt-6 max-w-[280px] rounded-2xl bg-white/95 p-6 pt-10 shadow-lg backdrop-blur transition group-hover:shadow-xl">
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        {item.title}
                                    </h3>
                                    <p className="mt-2 text-sm text-gray-600">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}
