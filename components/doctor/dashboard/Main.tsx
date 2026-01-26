"use client";

import { useAuth } from "@/lib/auth-context";
import Link from "next/link";
import {
    User,
    Calendar,
    Clock,
    ArrowUpRight,
} from "lucide-react";

export default function DoctorDashboard() {
    const { user } = useAuth();

    return (
        <div className="p-8 pt-24">

            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-semibold text-slate-900">
                    Welcome back 👋
                </h1>
                <p className="mt-1 text-sm text-slate-600">
                    Manage your profile and availability
                </p>
            </div>

            {/* Cards */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

                {/* Profile */}
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="mb-4 flex h-10 w-10 items-center justify-center
                        rounded-lg bg-teal-100 text-teal-700">
                        <User size={18} />
                    </div>

                    <h3 className="text-sm font-medium text-slate-700">
                        Profile
                    </h3>
                    <p className="mt-1 text-xs text-slate-500">
                        Complete your professional details
                    </p>

                    <Link
                        href="/doctor/profile"
                        className="mt-4 inline-flex items-center gap-1
                        text-sm font-medium text-teal-600"
                    >
                        Edit Profile
                        <ArrowUpRight size={14} />
                    </Link>
                </div>

                {/* Slots */}
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="mb-4 flex h-10 w-10 items-center justify-center
                        rounded-lg bg-indigo-100 text-indigo-700">
                        <Calendar size={18} />
                    </div>

                    <h3 className="text-sm font-medium text-slate-700">
                        Availability
                    </h3>
                    <p className="mt-1 text-xs text-slate-500">
                        Set your consultation slots
                    </p>

                    <Link
                        href="/doctor/slots"
                        className="mt-4 inline-flex items-center gap-1
                        text-sm font-medium text-indigo-600"
                    >
                        Manage Slots
                        <ArrowUpRight size={14} />
                    </Link>
                </div>

                {/* Appointments (placeholder) */}
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="mb-4 flex h-10 w-10 items-center justify-center
                        rounded-lg bg-orange-100 text-orange-700">
                        <Clock size={18} />
                    </div>

                    <h3 className="text-sm font-medium text-slate-700">
                        Appointments
                    </h3>
                    <p className="mt-1 text-xs text-slate-500">
                        View upcoming consultations
                    </p>

                    <span className="mt-4 inline-block text-xs text-slate-400">
                        Coming soon
                    </span>
                </div>
            </div>
        </div>
    );
}
