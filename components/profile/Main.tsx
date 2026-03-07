"use client";

import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
    User,
    ShieldCheck,
    Stethoscope,
    LogOut,
    Calendar,
    Settings,
    CreditCard,
} from "lucide-react";

export default function Profile() {
    const { user, logout, loading } = useAuth();
    const router = useRouter();

    if (loading) return null;

    if (!user) {
        router.replace("/login");
        return null;
    }

    const roleLabel =
        user.role === "ADMIN"
            ? "Administrator"
            : user.role === "DOCTOR"
                ? "Doctor"
                : "Patient";

    const roleIcon =
        user.role === "ADMIN" ? (
            <ShieldCheck size={16} />
        ) : user.role === "DOCTOR" ? (
            <Stethoscope size={16} />
        ) : (
            <User size={16} />
        );

    const handleLogout = async () => {
        await logout();
        router.push("/login");
    };

    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-16">

            <div className="mx-auto max-w-5xl px-6 space-y-8">

                {/* PROFILE HEADER */}

                <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                    <div className="flex items-center gap-4">

                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-teal-100 text-teal-700">
                            <User size={26} />
                        </div>

                        <div>
                            <h1 className="text-lg font-semibold text-slate-900">
                                Welcome back
                            </h1>

                            <div className="mt-1 inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                                {roleIcon}
                                {roleLabel}
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600"
                    >
                        <LogOut size={16} />
                        Logout
                    </button>

                </div>

                {/* NAVIGATION */}

                <div className="flex flex-wrap gap-4 border-b border-slate-200 pb-4">

                    <NavItem
                        href="/profile"
                        icon={<User size={16} />}
                        label="Profile"
                    />

                    <NavItem
                        href="/profile/appointments"
                        icon={<Calendar size={16} />}
                        label="My Appointments"
                    />

                    <NavItem
                        href="/profile/payments"
                        icon={<CreditCard size={16} />}
                        label="Payments"
                    />

                    <NavItem
                        href="/profile/settings"
                        icon={<Settings size={16} />}
                        label="Settings"
                    />

                </div>

                {/* DASHBOARD CONTENT */}

                <div className="grid gap-6 md:grid-cols-3">

                    {/* UPCOMING APPOINTMENTS */}

                    <DashboardCard
                        title="Upcoming Appointments"
                        value="2"
                        description="You have 2 upcoming visits."
                    />

                    {/* PAST VISITS */}

                    <DashboardCard
                        title="Past Visits"
                        value="8"
                        description="Completed consultations."
                    />

                    {/* SAVED DOCTORS */}

                    <DashboardCard
                        title="Saved Doctors"
                        value="3"
                        description="Doctors you follow."
                    />

                </div>

                {/* QUICK ACTIONS */}

                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                    <h2 className="text-sm font-semibold text-slate-900 mb-4">
                        Quick Actions
                    </h2>

                    <div className="flex flex-wrap gap-4">

                        <Link
                            href="/doctors"
                            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                        >
                            Book Appointment
                        </Link>

                        <Link
                            href="/profile/appointments"
                            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                        >
                            View Appointments
                        </Link>

                        <Link
                            href="/profile/settings"
                            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                        >
                            Edit Profile
                        </Link>

                    </div>

                </div>

            </div>

        </div>
    );
}

/* NAV ITEM */

function NavItem({
    href,
    icon,
    label,
}: {
    href: string;
    icon: React.ReactNode;
    label: string;
}) {
    return (
        <Link
            href={href}
            className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
            {icon}
            {label}
        </Link>
    );
}

/* DASHBOARD CARD */

function DashboardCard({
    title,
    value,
    description,
}: {
    title: string;
    value: string;
    description: string;
}) {
    return (
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

            <p className="text-sm text-slate-500">{title}</p>

            <p className="mt-2 text-2xl font-semibold text-slate-900">
                {value}
            </p>

            <p className="mt-1 text-xs text-slate-500">
                {description}
            </p>

        </div>
    );
}