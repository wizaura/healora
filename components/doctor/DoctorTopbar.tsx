"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    User,
    Calendar,
    Clock,
} from "lucide-react";

const nav = [
    { label: "Dashboard", href: "/doctor", icon: LayoutDashboard },
    { label: "Profile", href: "/doctor/profile", icon: User },
    { label: "Availability", href: "/doctor/availability", icon: Calendar },
    { label: "Appointments", href: "/doctor/appointments", icon: Clock },
];

export default function DoctorTopBar() {
    const pathname = usePathname();

    return (
        <header className="fixed top-0 inset-x-0 z-40 bg-white border-b border-slate-200 mt-20">
            <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">

                {/* Navigation */}
                <nav className="flex items-center gap-6">
                    {nav.map(({ href, label, icon: Icon }) => {
                        const active =
                            pathname === href || pathname.startsWith(href + "/");

                        return (
                            <Link
                                key={href}
                                href={href}
                                className={`
                                    flex items-center gap-2 px-3 py-2
                                    text-sm font-medium rounded-lg transition
                                    ${
                                        active
                                            ? "bg-teal-50 text-teal-700"
                                            : "text-slate-600 hover:bg-slate-100"
                                    }
                                `}
                            >
                                <Icon size={16} />
                                {label}
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </header>
    );
}
