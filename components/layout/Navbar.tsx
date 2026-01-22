"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { usePathname } from "next/navigation";

const navItems = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Doctors", href: "#doctors" },
    { name: "Blog", href: "#blog" },
];

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();

    return (
        <header className="fixed inset-x-0 top-0 z-50 bg-white/80 border-b border-gray-200 backdrop-blur-md">
            <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

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
                                    ${
                                        active
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

                {/* Right CTA */}
                <div className="hidden md:flex items-center">
                    <Link
                        href="#contact"
                        className="group flex items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-[#1F2147] shadow-sm transition hover:bg-gray-50"
                    >
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2F4CFF] text-white transition group-hover:scale-105">
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
                                className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                            >
                                {item.name}
                            </Link>
                        ))}

                        <Link
                            href="#contact"
                            className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-[#2F4CFF] px-5 py-3 text-sm font-semibold text-white"
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
