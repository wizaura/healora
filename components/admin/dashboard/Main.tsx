"use client";

import Link from "next/link";
import {
    Users,
    Stethoscope,
    IndianRupee,
    ArrowUpRight,
} from "lucide-react";

const cards = [
    {
        title: "Doctors",
        value: "12",
        icon: Users,
        href: "/admin/doctors",
    },
    {
        title: "Specialities",
        value: "8",
        icon: Stethoscope,
        href: "/admin/specialities",
    },
    {
        title: "Slot Fee",
        value: "₹500",
        icon: IndianRupee,
        href: "/admin/settings",
    },
];

export default function AdminDashboard() {
    return (
        <div className="p-8 pt-24">
            <h1 className="mb-6 text-2xl font-semibold text-slate-900">
                Admin Dashboard
            </h1>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {cards.map((card) => {
                    const Icon = card.icon;

                    return (
                        <Link
                            key={card.title}
                            href={card.href}
                            className="group rounded-2xl border border-slate-200 bg-white p-6
              shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-slate-500">{card.title}</p>
                                    <p className="mt-1 text-2xl font-semibold text-slate-900">
                                        {card.value}
                                    </p>
                                </div>

                                <div className="flex h-10 w-10 items-center justify-center rounded-lg
                bg-teal-100 text-teal-700 group-hover:bg-teal-600 group-hover:text-white">
                                    <Icon size={18} />
                                </div>
                            </div>

                            <div className="mt-4 flex items-center gap-1 text-sm text-teal-600">
                                View details
                                <ArrowUpRight size={14} />
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
