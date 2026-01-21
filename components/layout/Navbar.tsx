"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navItems = [
    { name: "Home", href: "/" },
    { name: "Specialties", href: "#specialties" },
    { name: "Doctors", href: "#doctors" },
    { name: "How it Works", href: "#how-it-works" },
    { name: "Reviews", href: "#reviews" },
    { name: "FAQs", href: "#faqs" },
];

export default function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <header className="fixed inset-x-0 top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
            <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

                {/* Logo */}
                <Link
                    href="/"
                    className="text-2xl font-extrabold tracking-tight text-teal-700"
                >
                    Healora
                </Link>

                {/* Desktop Nav */}
                <ul className="hidden items-center gap-8 md:flex">
                    {navItems.map((item) => (
                        <li key={item.name}>
                            <Link
                                href={item.href}
                                className="text-sm font-medium text-gray-700 transition hover:text-teal-600"
                            >
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Actions */}
                <div className="hidden items-center gap-4 md:flex">
                    <Link
                        href="/login"
                        className="text-sm font-medium text-gray-700 hover:text-teal-600"
                    >
                        Login
                    </Link>

                    <Link
                        href="/book"
                        className="rounded-xl bg-gradient-to-r from-teal-600 to-emerald-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:scale-[1.03]"
                    >
                        Book Appointment
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
                <div className="md:hidden">
                    <div className="space-y-4 bg-white px-6 pb-6 pt-4 font-medium shadow-lg">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => setOpen(false)}
                                className="block text-sm font-medium text-gray-700 hover:text-teal-600"
                            >
                                {item.name}
                            </Link>
                        ))}

                        <div className="mt-4 flex flex-col gap-6">
                            <Link
                                href="/login"
                                className="text-center text-sm font-medium text-gray-700"
                            >
                                Login
                            </Link>

                            <Link
                                href="/book"
                                className="rounded-xl bg-gradient-to-r from-teal-600 to-emerald-500 px-5 py-3 text-center text-sm font-semibold text-white shadow-md"
                            >
                                Book Appointment
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
