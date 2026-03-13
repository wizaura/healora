"use client";

import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "@/lib/profile.api";
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

    const { data: profile, isLoading: profileLoading } = useQuery({
        queryKey: ["profile", user?.sub],
        queryFn: () => getProfile(user!.sub),
        enabled: !!user?.sub
    });

    // AFTER hooks

    if (loading) return null;

    if (!user) {
        router.replace("/login");
        return null;
    }

    if (profileLoading) return null;

    const isAdmin = user.role === "ADMIN";
    const isDoctor = user.role === "DOCTOR";
    const isPatient = user.role === "PATIENT";

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

                        {/* PHOTO */}

                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-teal-100 text-teal-700 overflow-hidden">

                            {profile?.image ? (
                                <img
                                    src={profile.image}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <User size={26} />
                            )}

                        </div>

                        {/* USER INFO */}

                        <div>
                            <h1 className="text-lg font-semibold text-slate-900">
                                {profile.name || "User"}
                            </h1>

                            <p className="text-sm text-slate-500">
                                {profile.email}
                            </p>

                            {(isAdmin || isDoctor) && (
                                <div className="mt-1 inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">

                                    {isAdmin && <ShieldCheck size={14} />}
                                    {isDoctor && <Stethoscope size={14} />}

                                    {isAdmin ? "Administrator" : "Doctor"}

                                </div>
                            )}

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


                {/* ADMIN → STOP HERE */}

                {isAdmin && null}


                {/* DOCTOR + PATIENT NAVIGATION */}

                {!isAdmin && (

                    <div className="flex flex-wrap gap-4 border-b border-slate-200 pb-4">

                        <NavItem
                            href={isDoctor ? "/doctor/profile" : "/profile"}
                            icon={<User size={16} />}
                            label="Profile"
                        />

                        <NavItem
                            href={isDoctor ? "/doctor/appointments" : "/profile/appointments"}
                            icon={<Calendar size={16} />}
                            label="Appointments"
                        />

                        <NavItem
                            href={isDoctor ? "/doctor/payments" : "/profile/payments"}
                            icon={<CreditCard size={16} />}
                            label="Payments"
                        />

                        <NavItem
                            href={"/profile/settings"}
                            icon={<Settings size={16} />}
                            label="Settings"
                        />

                    </div>

                )}


                {/* STATISTICS CARDS (NOT FOR ADMIN) */}

                {!isAdmin && (

                    <div className="grid gap-6 md:grid-cols-3">

                        <DashboardCard
                            title="Upcoming Appointments"
                            value="2"
                            description="You have 2 upcoming visits."
                        />

                        <DashboardCard
                            title="Past Visits"
                            value="8"
                            description="Completed consultations."
                        />

                        <DashboardCard
                            title="Saved Doctors"
                            value="3"
                            description="Doctors you follow."
                        />

                    </div>

                )}


                {/* QUICK ACTIONS → ONLY PATIENT */}

                {isPatient && (

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

                )}

            </div>

        </div>
    );
}


/* NAV ITEM */

function NavItem({ href, icon, label }: any) {
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

function DashboardCard({ title, value, description }: any) {
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