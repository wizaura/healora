
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
    Phone,
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
    { name: "About Healora", href: "/about" },
    { name: "Vision & Mission", href: "/mission" },
    { name: "Homeopathy", href: "/why-homeopathy" },
    { name: "Agro Homeopathy", href: "/agro-homeopathy" },
    { name: "Veterinary Homeopathy", href: "/veterinary-homeopathy" },
    { name: "Counselling & Psychotherapy", href: "/counselling" },
    { name: "Diet & Nutrition", href: "/diet-and-nutrition" },
];

const moreItems = [
    { name: "Blogs", href: "/blog" },
    { name: "FAQs", href: "/faqs" },
    { name: "Medikits", href: "/medikits" },
    { name: "Medicine Intake", href: "/medicine-intake" },
    { name: "Consultation Process", href: "/consultation-process" },
    { name: "Career", href: "/career" },
    { name: "Contact", href: "/contact" },
];

export default function Navbar() {

    const [open, setOpen] = useState(false);
    const pathname = usePathname();
    const { user } = useAuth();

    return (
        <header className="fixed inset-x-0 top-0 z-50 bg-white/80 border-b border-gray-200 backdrop-blur-md">

            <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 md:px-6 py-2">

                {/* Logo */}
                <Link
                    href="/"
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

                {/* Desktop Nav */}
                <div className="hidden lg:flex rounded-full bg-gray-100 p-1 items-center">

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
                <div className="flex items-center gap-1 md:gap-3">

                    {user?.role === "ADMIN" && (
                        <Link
                            href="/admin"
                            className="flex items-center gap-2 rounded-full
                            border border-gray-200 bg-white px-5 py-2.5
                            text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                            <ShieldCheck size={16} />
                            <span className="hidden md:flex">Dashboard</span>
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
                            <span className="hidden md:flex">Dashboard</span>
                        </Link>
                    )}

                    {!user && (
                        <Link
                            href="/login"
                            className="flex items-center gap-2 rounded-full
                            border border-gray-200 bg-white px-5 py-2.5
                            text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                            <LogIn size={16} />
                            <span className="hidden md:flex">Login</span>
                        </Link>
                    )}
                    {user?.role === "PATIENT" && (
                        <Link
                            href="/profile"
                            className="flex items-center gap-2 rounded-full
                            border border-gray-200 bg-white px-5 py-2.5
                            text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                            <User size={16} />
                            <span className="hidden md:flex">Profile</span>
                        </Link>
                    )}

                    {/* ACTION BUTTONS */}
                    <div className="flex items-center gap-3">

                        {/* CONTACT */}
                        <div className="relative hidden md:block group">

                            <Link
                                href="/contact"
                                className="
                flex h-11 w-11
                items-center justify-center

                rounded-full

                border border-gray-200

                bg-white

                text-[#1F2147]

                shadow-sm

                transition-all duration-300

                hover:-translate-y-0.5
                hover:border-[#2F4CFF]/20
                hover:shadow-md
            "
                            >

                                <Phone
                                    size={18}
                                    className="
                    transition
                    group-hover:scale-110
                "
                                />

                            </Link>

                            {/* TOOLTIP */}
                            <div
                                className="
                pointer-events-none

                absolute left-1/2 top-[120%]
                -translate-x-1/2

                whitespace-nowrap

                rounded-lg

                bg-[#1F2147]

                px-3 py-1.5

                text-xs font-medium text-white

                shadow-lg

                opacity-0
                translate-y-1

                transition-all duration-200

                group-hover:opacity-100
                group-hover:translate-y-0
            "
                            >

                                Contact Us

                                <div
                                    className="
                    absolute left-1/2 top-0

                    h-2 w-2

                    -translate-x-1/2
                    -translate-y-1/2
                    rotate-45

                    bg-[#1F2147]
                "
                                />

                            </div>

                        </div>

                        {/* BE A DOCTOR */}
                        <div className="relative group">

                            <Link
                                href="/become-doctor"
                                className="
                relative overflow-hidden

                flex items-center gap-2

                rounded-full

                bg-gradient-to-r
                from-[#1F2147]
                to-[#2F4CFF]

                px-4 md:px-5
                py-2.5

                text-sm font-medium text-white

                shadow-md shadow-[#2F4CFF]/20

                transition-all duration-300

                hover:-translate-y-0.5
                hover:shadow-lg hover:shadow-[#2F4CFF]/30
            "
                            >

                                {/* GLOW */}
                                <div
                                    className="
                    absolute inset-0

                    bg-white/10

                    opacity-0

                    transition

                    group-hover:opacity-100
                "
                                />

                                {/* ICON */}
                                <div
                                    className="
                    relative

                    flex h-7 w-7
                    items-center justify-center

                    rounded-full

                    bg-white/15
                    backdrop-blur-sm
                "
                                >

                                    <Stethoscope size={15} />

                                </div>

                                {/* TEXT */}
                                <span className="relative hidden sm:block">
                                    Be a Doctor
                                </span>

                            </Link>

                            {/* MOBILE TOOLTIP */}
                            <div
                                className="
                pointer-events-none

                absolute left-1/2 top-[120%]
                -translate-x-1/2

                whitespace-nowrap

                rounded-lg

                bg-[#1F2147]

                px-3 py-1.5

                text-xs font-medium text-white

                shadow-lg

                opacity-0
                translate-y-1

                transition-all duration-200

                group-hover:opacity-100
                group-hover:translate-y-0

                sm:hidden
            "
                            >

                                Be a Doctor

                                <div
                                    className="
                    absolute left-1/2 top-0

                    h-2 w-2

                    -translate-x-1/2
                    -translate-y-1/2
                    rotate-45

                    bg-[#1F2147]
                "
                                />

                            </div>

                        </div>

                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setOpen(!open)}
                        className="lg:hidden"
                    >
                        {open ? <X /> : <Menu />}
                    </button>
                </div>



            </nav>


            {/* Mobile Menu */}
            {open && (
                <div className="lg:hidden bg-white shadow-lg">

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

