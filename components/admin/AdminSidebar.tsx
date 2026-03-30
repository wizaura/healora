"use client";

import Link from "next/link";
import {
    LayoutDashboard,
    Users,
    Stethoscope,
    Calendar,
    ClipboardList,
    Settings,
    ChevronLeft,
    ChevronRight,
    Paperclip,
    Plus,
    DollarSign,
    Hospital,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Doctors", href: "/admin/doctors", icon: Stethoscope },
    { label: "Appointments", href: "/admin/appointments", icon: Calendar },
    { label: "Users", href: "/admin/users", icon: Users },
    { label: "Specialities", href: "/admin/specialities", icon: ClipboardList },
    { label: "Blogs", href: "/admin/blogs", icon: Paperclip },
    { label: "Medikits", href: "/admin/medikits", icon: Plus },
    { label: "Pharmacy", href: "/admin/pharmacy", icon: Hospital },
    { label: "Payments", href: "/admin/payments", icon: DollarSign },
    { label: "Settings", href: "/admin/settings", icon: Settings },
];

type Props = {
    collapsed: boolean;
    setCollapsed: (v: boolean) => void;
};

export default function AdminSidebar({
    collapsed,
    setCollapsed,
}: Props) {
    const pathname = usePathname();

    return (
        <aside
            className={`
        fixed inset-y-0 left-0 z-30 mt-16
        bg-white border-r border-slate-200
        transition-all duration-300
        ${collapsed ? "w-20" : "w-64"}
        flex flex-col
    `}
        >

            {/* Brand */}
            <div className="h-16 flex items-center justify-between px-4 border-gray-300 border-b shrink-0">
                {!collapsed && (
                    <span className="text-lg font-semibold text-[#1F2147]">
                        Admin
                    </span>
                )}

                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="rounded-lg p-2 hover:bg-slate-100"
                >
                    {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
                </button>
            </div>

            {/* Scrollable Nav */}
            <nav className="flex-1 overflow-y-auto px-3 py-6 space-y-1 scrollbar-hide">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`
                        group flex items-center gap-3
                        rounded-lg px-3 py-2.5
                        text-sm font-medium transition
                        ${isActive
                                    ? "bg-[#1F4BFF]/10 text-[#1F4BFF]"
                                    : "text-slate-600 hover:bg-slate-100"
                                }
                    `}
                        >
                            <Icon size={20} />

                            {!collapsed && (
                                <span className="whitespace-nowrap">
                                    {item.label}
                                </span>
                            )}
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}
