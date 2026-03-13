"use client";

import { useState } from "react";
import Link from "next/link";
import {
    Menu,
    X,
    ArrowUpRight,
    LogIn,
    User,
    Stethoscope,
    ShieldCheck,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "@/lib/profile.api";
import { AlertTriangle } from "lucide-react";

const navItems = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Specialities", href: "/specialities" },
    { name: "Doctors", href: "/doctors" },
    { name: "Blog", href: "/blog" },
];

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();
    const { user } = useAuth();

    const { data: profile } = useQuery({
        queryKey: ["profile", user?.sub],
        queryFn: () => getProfile(user!.sub),
        enabled: !!user?.sub,
    });

    return (
        <header className="fixed inset-x-0 top-0 z-50 bg-white/80 border-b border-gray-200 backdrop-blur-md">
            {/* {profile?.mustChangePassword && (
                <div className="bg-red-50 border-t border-red-200">
                    <div className="mx-auto max-w-7xl px-6 py-2 flex items-center justify-between">
            
                        <div className="flex items-center gap-2 text-sm text-red-700">
                            <AlertTriangle size={16} />
                            <span>
                                Your password was set by an administrator. Please update it for security.
                            </span>
                        </div>
            
                        <Link
                            href="/profile/settings"
                            className="text-sm font-semibold text-red-700 hover:underline"
                        >
                            Change Password
                        </Link>
            
                    </div>
                </div>
            )} */}
            <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">

                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <span className="text-2xl font-semibold tracking-tight text-[#1F2147]">
                        Healora
                    </span>
                </Link>

                {/* Center Pill Nav (Desktop) */}
                <div className="hidden md:flex rounded-full bg-gray-100 p-1">
                    {navItems.map((item) => {
                        const active = pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`px-5 py-2 text-sm font-medium rounded-full transition
                                    ${active
                                        ? "bg-[#1F2147] text-white shadow-sm"
                                        : "text-gray-600 hover:text-[#1F2147]"
                                    }
                                `}
                            >
                                {item.name}
                            </Link>
                        );
                    })}
                </div>

                {/* Right CTA (Desktop) */}
                <div className="hidden md:flex items-center gap-3">

                    {/* Role-based links */}
                    {user?.role === "ADMIN" && (
                        <Link
                            href="/admin"
                            className="flex items-center gap-2 rounded-full
                            border border-gray-200 bg-white px-5 py-2.5
                            text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                            <ShieldCheck size={16} />
                            Admin
                        </Link>
                    )}

                    {user?.role === "DOCTOR" && (
                        <Link
                            href="/doctor"
                            className="flex items-center gap-2 rounded-full
                            border border-gray-200 bg-white px-5 py-2.5
                            text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                            <Stethoscope size={16} />
                            Dashboard
                        </Link>
                    )}

                    {/* Login / Profile */}
                    {!user ? (
                        <Link
                            href="/login"
                            className="flex items-center gap-2 rounded-full
                            border border-gray-200 bg-white px-5 py-2.5
                            text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                            <LogIn size={16} />
                            Login
                        </Link>
                    ) : (
                        <Link
                            href="/profile"
                            className="flex items-center gap-2 rounded-full
                            border border-gray-200 bg-white px-5 py-2.5
                            text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                            <User size={16} />
                            Profile
                        </Link>
                    )}

                    {/* Contact */}
                    <Link
                        href="#contact"
                        className="group flex items-center gap-2 rounded-full
                        border border-gray-200 bg-white px-5 py-2.5
                        text-sm font-medium text-[#1F2147] shadow-sm
                        transition hover:bg-gray-50"
                    >
                        <span className="flex h-8 w-8 items-center justify-center
                        rounded-full bg-[#2F4CFF] text-white transition group-hover:scale-105">
                            <ArrowUpRight size={16} />
                        </span>
                        Contact Us
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setOpen(!open)}
                    className="md:hidden"
                >
                    {open ? <X /> : <Menu />}
                </button>
            </nav>


            {/* Mobile Menu */}
            {open && (
                <div className="md:hidden bg-white shadow-lg">
                    <div className="space-y-3 px-6 py-6">

                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => setOpen(false)}
                                className="block rounded-lg px-4 py-2
                                text-sm font-medium text-gray-700 hover:bg-gray-100"
                            >
                                {item.name}
                            </Link>
                        ))}

                        {/* Role-based mobile links */}
                        {user?.role === "ADMIN" && (
                            <Link
                                href="/admin"
                                onClick={() => setOpen(false)}
                                className="flex items-center justify-center gap-2
                                rounded-xl border border-gray-200 px-5 py-3
                                text-sm font-semibold text-gray-700"
                            >
                                <ShieldCheck size={16} />
                                Admin
                            </Link>
                        )}

                        {user?.role === "DOCTOR" && (
                            <Link
                                href="/doctor"
                                onClick={() => setOpen(false)}
                                className="flex items-center justify-center gap-2
                                rounded-xl border border-gray-200 px-5 py-3
                                text-sm font-semibold text-gray-700"
                            >
                                <Stethoscope size={16} />
                                Doctor Dashboard
                            </Link>
                        )}

                        {!user ? (
                            <Link
                                href="/login"
                                onClick={() => setOpen(false)}
                                className="flex items-center justify-center gap-2
                                rounded-xl border border-gray-200 px-5 py-3
                                text-sm font-semibold text-gray-700"
                            >
                                <LogIn size={16} />
                                Login
                            </Link>
                        ) : (
                            <Link
                                href="/profile"
                                onClick={() => setOpen(false)}
                                className="flex items-center justify-center gap-2
                                rounded-xl border border-gray-200 px-5 py-3
                                text-sm font-semibold text-gray-700"
                            >
                                <User size={16} />
                                Profile
                            </Link>
                        )}

                        {/* Contact */}
                        <Link
                            href="#contact"
                            onClick={() => setOpen(false)}
                            className="flex items-center justify-center gap-2
                            rounded-xl bg-[#2F4CFF] px-5 py-3
                            text-sm font-semibold text-white"
                        >
                            Contact Us
                            <ArrowUpRight size={16} />
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}
