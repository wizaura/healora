"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  User,
  Calendar,
  Settings,
  CreditCard,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";

export default function ProfileHeader() {
  const pathname = usePathname();
  const { user } = useAuth();

  const isDoctor = user?.role === "DOCTOR";

  const nav = [
    {
      label: "Profile",
      href: isDoctor ? "/doctor/profile" : "/profile",
      icon: User,
    },
    {
      label: "Appointments",
      href: isDoctor ? "/doctor/appointments" : "/profile/appointments",
      icon: Calendar,
    },
    {
      label: "Payments",
      href: isDoctor ? "/doctor/payments" : "/profile/payments",
      icon: CreditCard,
    },
    {
      label: "Settings",
      href: "/profile/settings",
      icon: Settings,
    },
  ];

  return (
    <div className="flex mx-6 justify-center">
      {/* Scroll Container */}
      <div className="overflow-x-auto no-scrollbar">
        {/* Pill Container */}
        <div className="flex gap-2 bg-slate-100 p-1 rounded-xl w-max">
          {nav.map(({ href, label, icon: Icon }) => {
            const active =
              href === "/profile"
                ? pathname === href
                : pathname.startsWith(href);

            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-2 whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition
                ${
                  active
                    ? "bg-[#1F2147] text-white shadow-sm"
                    : "text-slate-600 hover:bg-white"
                }`}
              >
                <Icon size={16} />
                {label}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}