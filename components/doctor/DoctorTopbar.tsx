"use client";

import { useEffect, useRef, useState } from "react";
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
    Settings2,
    ChevronDown,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "@/lib/profile.api";

const nav = [
    { label: "Dashboard", href: "/doctor", icon: LayoutDashboard },
    { label: "Availability", href: "/doctor/availability", icon: Calendar },
    { label: "Appointments", href: "/doctor/appointments", icon: Clock },
    { label: "Patients", href: "/doctor/patients", icon: User2 },
    { label: "Blogs", href: "/doctor/blogs", icon: NotebookIcon },
];

export default function DoctorTopBar() {
    const pathname = usePathname();
    const { user, logout } = useAuth();
    const [open, setOpen] = useState(false);
    const [profileOpen, setProfileOpen] =
        useState(false);

    const profileRef =
        useRef<HTMLDivElement>(null);

    const {
        data: profileResponse,
        isLoading: profileLoading,
    } = useQuery({

        queryKey: [
            "profile",
            user?.sub,
        ],

        queryFn: () =>
            getProfile(user!.sub),

        enabled:
            !!user?.sub,
    });

    useEffect(() => {

        const handleClickOutside = (
            event: MouseEvent
        ) => {

            if (
                profileRef.current &&
                !profileRef.current.contains(
                    event.target as Node
                )
            ) {
                setProfileOpen(false);
            }
        };

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        return () => {

            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };

    }, []);

    const profile =
        profileResponse ||
        {};

    const doctorName =
        profile?.name ||
        "Doctor";

    const doctorEmail =
        profile?.email ||
        "doctor@healora.com";

    const mustChangePassword =
        profile?.mustChangePassword;

    return (
        <header className="fixed inset-x-0 top-0 z-50 bg-white/80 border-b border-gray-200 backdrop-blur-md">

            {/* Warning Banner */}
            {mustChangePassword && (
                <div className="bg-red-50 border-t border-red-200">
                    <div className="mx-auto max-w-7xl px-6 py-2 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-red-700">
                            <AlertTriangle size={14} />
                            <span>
                                Your password was set by admin. Please update it.
                            </span>
                        </div>

                        <Link
                            href="/doctor/settings"
                            className="text-sm font-semibold text-red-700 hover:underline"
                        >
                            Change Password
                        </Link>
                    </div>
                </div>
            )}

            <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">

                {/* Logo */}
                <Link
                    href="/doctor"
                    className="flex items-center gap-1"
                >
                    <Image
                        src="/logo.png"
                        alt="Healora Logo"
                        width={56}
                        height={56}
                        className="rounded-md object-cover"
                    />

                    <div className="flex flex-col leading-none gap-0.5">
                        <span className="text-[28px] font-semibold font-bold tracking-tight text-[#1F2147]">
                            Healora
                        </span>
                        <span className="text-[12px] font-semibold text-navy/60 tracking-wide -mt-1">
                            &nbsp;Wellness Centre
                        </span>
                    </div>
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
                <div className="flex items-center gap-3">

                    {/* PROFILE DROPDOWN */}
                    <div ref={profileRef} className="relative">

                        <button
                            onClick={() =>
                                setProfileOpen(!profileOpen)
                            }
                            className="
                flex items-center gap-3
                rounded-full border
                border-gray-200 bg-white
                px-2 py-1.5
                hover:bg-gray-50
                transition
            "
                        >

                            {/* Avatar */}
                            <div
                                className="
        h-9 w-9 rounded-full
        overflow-hidden
        bg-[#1F2147]/10
        flex items-center
        justify-center
    "
                            >

                                {profile?.image ? (

                                    <Image
                                        src={profile?.image}
                                        alt={doctorName}
                                        width={36}
                                        height={36}
                                        className="
                h-full w-full
                object-cover
            "
                                    />

                                ) : (

                                    <span
                                        className="
                text-sm font-semibold
                text-[#1F2147]
            "
                                    >
                                        {doctorName?.charAt(0)}
                                    </span>

                                )}

                            </div>

                            {/* Info */}
                            <div className="hidden md:flex flex-col text-left leading-tight">

                                <span
                                    className="
                        text-sm font-semibold
                        text-gray-800
                    "
                                >
                                    {profileLoading
                                        ? "Loading..."
                                        : doctorName}
                                </span>

                                <span
                                    className="
                        text-xs text-gray-500
                        max-w-[160px]
                        truncate
                    "
                                >
                                    {doctorEmail}
                                </span>

                            </div>

                            <ChevronDown
                                size={16}
                                className={`
                    hidden md:block
                    text-gray-500 transition

                    ${profileOpen
                                        ? "rotate-180"
                                        : ""
                                    }
                `}
                            />

                        </button>

                        {/* DROPDOWN */}
                        {profileOpen && (

                            <div
                                className="
                    absolute right-0 top-14
                    w-64 overflow-hidden
                    rounded-2xl border
                    border-gray-200 bg-white
                    shadow-xl
                "
                            >

                                <div className="p-4 border-b border-gray-100">

                                    <h3
                                        className="
                            text-sm font-semibold
                            text-gray-900
                        "
                                    >
                                        {doctorName}
                                    </h3>

                                    <p
                                        className="
                            text-xs text-gray-500
                            break-all mt-1
                        "
                                    >
                                        {doctorEmail}
                                    </p>

                                </div>

                                <div className="p-2">

                                    <Link
                                        href="/doctor/profile"
                                        className="
                            flex items-center gap-2
                            rounded-xl px-3 py-2.5
                            text-sm text-gray-700
                            hover:bg-gray-100
                            transition
                        "
                                    >
                                        <User size={16} />
                                        My Profile
                                    </Link>

                                    <Link
                                        href="/doctor/settings"
                                        className="
                            mt-1 flex items-center gap-2
                            rounded-xl px-3 py-2.5
                            text-sm text-gray-700
                            hover:bg-gray-100
                            transition
                        "
                                    >
                                        <Settings size={16} />
                                        Settings
                                    </Link>

                                    <Link
                                        href="/"
                                        className="
                            mt-1 flex items-center gap-2
                            rounded-xl px-3 py-2.5
                            text-sm text-gray-700
                            hover:bg-gray-100
                            transition
                        "
                                    >
                                        Public Site
                                    </Link>

                                    <button
                                        onClick={logout}
                                        className="
                            mt-1 flex w-full
                            items-center gap-2
                            rounded-xl px-3 py-2.5
                            text-sm text-red-500
                            hover:bg-red-50
                            transition
                        "
                                    >
                                        <LogOut size={16} />
                                        Logout
                                    </button>

                                </div>

                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setOpen(!open)}
                        className="md:hidden"
                    >
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