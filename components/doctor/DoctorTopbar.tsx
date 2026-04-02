"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    User,
    Calendar,
    Clock,
    User2,
    AlertTriangle,
    Menu,
    X,
    LogOut,
    NotebookIcon,
    Settings,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "@/lib/profile.api";

const nav = [
    { label: "Dashboard", href: "/doctor", icon: LayoutDashboard },
    { label: "Profile", href: "/doctor/profile", icon: User },
    { label: "Availability", href: "/doctor/availability", icon: Calendar },
    { label: "Appointments", href: "/doctor/appointments", icon: Clock },
    { label: "Patients", href: "/doctor/patients", icon: User2 },
    { label: "Blogs", href: "/doctor/blogs", icon: NotebookIcon },
];

export default function DoctorTopBar() {
    const pathname = usePathname();
    const { user, logout } = useAuth();
    const [open, setOpen] = useState(false);

    const { data: profile } = useQuery({
        queryKey: ["profile", user?.sub],
        queryFn: () => getProfile(user!.sub),
        enabled: !!user?.sub,
    });

    return (
        <header className="fixed inset-x-0 top-0 z-50 bg-white/80 border-b border-gray-200 backdrop-blur-md">

            {/* Warning Banner */}
            {profile?.mustChangePassword && (
                <div className="bg-red-50 border-t border-red-200">
                    <div className="mx-auto max-w-7xl px-6 py-2 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-red-700">
                            <AlertTriangle size={14} />
                            <span>
                                Your password was set by admin. Please update it.
                            </span>
                        </div>

                        <Link
                            href="/doctor/profile/settings"
                            className="text-sm font-semibold text-red-700 hover:underline"
                        >
                            Change Password
                        </Link>
                    </div>
                </div>
            )}

            <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">

                {/* Logo */}
                <Link href="/doctor" className="flex items-center gap-2">
                    <Image
                        src="/logo.png"
                        alt="Healora Logo"
                        width={42}
                        height={42}
                        className="rounded-md object-cover"
                    />
                    <span className="text-xl font-semibold tracking-tight text-[#1F2147]">
                        Healora Doctor
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex rounded-full bg-gray-100 p-1 items-center">
                    {nav.map(({ href, label, icon: Icon }) => {
                        const active =
                            href === "/doctor"
                                ? pathname === "/doctor"
                                : pathname.startsWith(href);

                        return (
                            <Link
                                key={href}
                                href={href}
                                className={`px-4 py-2 text-sm font-medium rounded-full flex items-center gap-2 transition
                ${active
                                        ? "bg-[#1F2147] text-white shadow-sm"
                                        : "text-gray-600 hover:text-[#1F2147]"
                                    }`}
                            >
                                <Icon size={16} />
                                {label}
                            </Link>
                        );
                    })}
                </div>

                {/* Right Side */}
                <div className="flex items-center gap-2">
                    <Link
                        href="/"
                        className="hidden md:flex text-sm text-gray-600 hover:text-[#1F2147]"
                    >
                        Public Site
                    </Link>

                    <button
                        onClick={logout}
                        className="flex items-center gap-2 rounded-full
              border border-gray-200 bg-white px-4 py-2
              text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        <LogOut size={16} />
                        <span className="hidden md:flex">Logout</span>
                    </button>

                    {/* Mobile Menu Button */}
                    <button onClick={() => setOpen(!open)} className="md:hidden">
                        {open ? <X /> : <Menu />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            {open && (
                <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
                    <div className="space-y-2 px-6 py-4">
                        {nav.map(({ href, label }) => (
                            <Link
                                key={href}
                                href={href}
                                onClick={() => setOpen(false)}
                                className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                            >
                                {label}
                            </Link>
                        ))}

                        <button
                            onClick={logout}
                            className="w-full text-left rounded-lg px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
}