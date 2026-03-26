
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
    ChevronDown,
    AlertTriangle,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "@/lib/profile.api";
import Image from "next/image";

const navItems = [
    { name: "Home", href: "/" },
    { name: "Specialities", href: "/specialities" },
    { name: "Doctors", href: "/doctors" },
];

const aboutItems = [
    { name: "About", href: "/about" },
    { name: "Vision & Mission", href: "/mission" },
    { name: "Why Homeopathy", href: "/why-homeopathy" },
    { name: "Agro Homeopathy", href: "/agro-homeopathy" },
    { name: "Veterinary Homeopathy", href: "/veterinary-homeopathy" },
    { name: "Counselling & Psychotherapy", href: "/counselling" },
];

const moreItems = [
    { name: "Blogs", href: "/blog" },
    { name: "FAQs", href: "/faqs" },
    { name: "Medikits", href: "/medikits" },
    { name: "Contact", href: "/contact" },
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

            {/* Password warning */}
            {profile?.mustChangePassword && (
                <div className="bg-red-50 border-t border-red-200">
                    <div className="mx-auto max-w-7xl px-6 flex items-center justify-between">

                        <div className="flex items-center gap-2 text-sm text-red-700">
                            <AlertTriangle size={14} />
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
            )}

            <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">

                {/* Logo */}
                <Link
                    href="/"
                    className="flex items-center gap-2">
                    <Image
                        src="/logo.png"
                        alt="Healora Logo"
                        width={49}
                        height={49}
                        className="rounded-md object-cover" />
                    <span className="text-2xl font-semibold tracking-tight mb-2 text-[#1F2147]">
                        Healora
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex rounded-full bg-gray-100 p-1 items-center">

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
                                    }`}
                            >
                                {item.name}
                            </Link>
                        );
                    })}

                    {/* About Dropdown */}
                    <div className="relative group">

                        <button
                            className="px-5 py-2 text-sm font-medium rounded-full
    text-gray-600 hover:text-[#1F2147]
    flex items-center gap-1 transition"
                        >
                            About
                            <ChevronDown
                                size={14}
                                className="transition-transform group-hover:rotate-180"
                            />
                        </button>

                        <div className="absolute top-full left-0 w-full h-3"></div>

                        <div
                            className="absolute top-full left-0 mt-1 w-60
    rounded-xl bg-white border border-gray-200 shadow-xl
    opacity-0 invisible translate-y-2
    transition-all duration-200
    group-hover:opacity-100 group-hover:visible group-hover:translate-y-0"
                        >

                            <div className="py-2">

                                {aboutItems.map((item) => (

                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className="flex items-center justify-between
          px-4 py-2.5 text-sm text-gray-700
          hover:bg-gray-50 transition"
                                    >
                                        {item.name}

                                        <ArrowUpRight size={14} className="opacity-50" />

                                    </Link>

                                ))}

                            </div>

                        </div>

                    </div>


                    {/* More Dropdown */}
                    <div className="relative group">

                        <button
                            className="px-5 py-2 text-sm font-medium rounded-full
                            text-gray-600 hover:text-[#1F2147]
                            flex items-center gap-1 transition"
                        >
                            More
                            <ChevronDown
                                size={14}
                                className="transition-transform group-hover:rotate-180"
                            />
                        </button>

                        {/* hover bridge */}
                        <div className="absolute top-full left-0 w-full h-3"></div>

                        <div
                            className="absolute top-full left-0 mt-1 w-52
                            rounded-xl bg-white border border-gray-200 shadow-xl
                            opacity-0 invisible translate-y-2
                            transition-all duration-200
                            group-hover:opacity-100 group-hover:visible group-hover:translate-y-0"
                        >

                            <div className="py-2">

                                {moreItems.map((item) => (

                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className="flex items-center justify-between
                                        px-4 py-2.5 text-sm text-gray-700
                                        hover:bg-gray-50 transition"
                                    >
                                        {item.name}

                                        <ArrowUpRight size={14} className="opacity-50" />
                                    </Link>

                                ))}

                            </div>

                        </div>

                    </div>

                </div>


                {/* Right Side */}
                <div className="flex items-center gap-3">

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

                    <Link
                        href="/contact"
                        className="group flex items-center gap-2 rounded-full
                        border border-gray-200 bg-white px-5 py-2.5
                        text-sm font-medium text-[#1F2147] shadow-sm
                        transition hover:bg-gray-50"
                    >
                        <span
                            className="flex h-6 w-6 items-center justify-center
                            rounded-full bg-[#2F4CFF] text-white
                            transition group-hover:scale-105"
                        >
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

                        <div className="border-t border-gray-200 pt-3">

                            <p className="text-xs font-semibold text-gray-400 px-2 mb-2">
                                ABOUT
                            </p>

                            {aboutItems.map((item) => (

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

                        </div>

                        <div className="border-t border-gray-200 pt-3">

                            <p className="text-xs font-semibold text-gray-400 px-2 mb-2">
                                MORE
                            </p>

                            {moreItems.map((item) => (

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

                        </div>

                    </div>

                </div>
            )}

        </header>
    );
}

