"use client";

import { useAuth } from "@/lib/auth-context";
import {
  Bell,
  Search,
  LogOut,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function AdminHeader() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const getTitle = () => {
    if (pathname === "/admin") return "Dashboard";
    if (pathname.includes("/admin/doctors")) return "Doctors";
    if (pathname.includes("/admin/users")) return "Patients";
    if (pathname.includes("/admin/bookings")) return "Appointments";
    if (pathname.includes("/admin/payments")) return "Payments";
    if (pathname.includes("/admin/settings")) return "Settings";
    return "Healora Admin";
  };

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="flex items-center justify-between px-6 h-16">

        {/* LEFT */}
        <div>
          <h1 className="text-lg font-semibold text-slate-900">
            {getTitle()}
          </h1>
          <p className="text-xs text-slate-500">
            Manage Healora platform
          </p>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4">

          {/* ACTIONS */}
          <div className="flex items-center gap-2">

            <Link
              href="/"
              className="hidden md:block text-sm text-slate-600 hover:text-emerald-600 transition"
            >
              View Site
            </Link>

            <button
              onClick={logout}
              className="flex items-center gap-2 rounded-lg
              border border-slate-200 bg-white px-3 py-1.5
              text-sm text-slate-700 hover:bg-slate-50 transition"
            >
              <LogOut size={16} />
              <span className="hidden md:block">Logout</span>
            </button>

            {/* Mobile Menu */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden p-1"
            >
              {open ? <X /> : <Menu />}
            </button>
          </div>

          {/* PROFILE */}
          <div className="flex items-center gap-2 cursor-pointer hover:bg-slate-100 px-3 py-1.5 rounded-lg transition">
            <div className="h-8 w-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs font-semibold">
              {"A"}
            </div>

            <div className="hidden sm:flex flex-col leading-tight">
              <span className="text-sm font-medium text-slate-800">
                Admin
              </span>
              <span className="text-xs text-slate-500">
                {"admin@healora.com"}
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* MOBILE DROPDOWN */}
      {open && (
        <div className="md:hidden px-6 pb-4 space-y-3 border-t border-slate-100 bg-white">
          <Link href="/" className="block text-sm text-slate-700">
            View Site
          </Link>
          <button
            onClick={logout}
            className="block text-sm text-red-500"
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
}