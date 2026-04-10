"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  User,
  Calendar,
  Settings,
  CreditCard,
  FileText,
} from "lucide-react";

export default function ProfileHeader() {
  const pathname = usePathname();

  const nav = [
    {
      label: "Profile",
      href: "/profile",
      icon: User,
    },
    {
      label: "Appointments",
      href: "/profile/appointments",
      icon: Calendar,
    },
    {
      label: "Payments",
      href: "/profile/payments",
      icon: CreditCard,
    },
    {
      label: "Investigations",
      href: "/profile/investigations",
      icon: FileText,
    },
    {
      label: "Settings",
      href: "/profile/settings",
      icon: Settings,
    },
  ];

  return (
    <div className="flex mx-6 justify-center">
      <div className="overflow-x-auto no-scrollbar">
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