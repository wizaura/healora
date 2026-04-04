"use client";

import { Bell, Search, Plus, ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";

export default function AdminHeader() {
  const pathname = usePathname();

  const getTitle = () => {
    if (pathname === "/admin") return "Dashboard";
    if (pathname.includes("/admin/doctors")) return "Doctors";
    if (pathname.includes("/admin/users")) return "Users";
    if (pathname.includes("/admin/bookings")) return "Bookings";
    if (pathname.includes("/admin/payments")) return "Payments";
    if (pathname.includes("/admin/settings")) return "Settings";
    return "Admin Panel";
  };

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200">
      <div className="flex items-center justify-between px-6 h-16">

        {/* LEFT - TITLE */}
        <div>
          <h1 className="text-lg font-semibold text-slate-900">
            {getTitle()}
          </h1>
          <p className="text-xs text-slate-500">
            Manage your platform
          </p>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4">

          {/* NOTIFICATIONS */}
          <button className="relative p-2 rounded-lg hover:bg-slate-100">
            <Bell size={18} className="text-slate-600" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>

          {/* PROFILE */}
          <div className="flex items-center gap-2 cursor-pointer hover:bg-slate-100 px-3 py-1.5 rounded-lg">
            <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-semibold">
              A
            </div>
            <span className="text-sm font-medium text-slate-700 hidden sm:block">
              Admin
            </span>
            <ChevronDown size={16} className="text-slate-500" />
          </div>

        </div>
      </div>
    </header>
  );
}