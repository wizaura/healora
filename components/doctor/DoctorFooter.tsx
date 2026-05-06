"use client";

import Link from "next/link";
import { Mail, LifeBuoy } from "lucide-react";
import Image from "next/image";

const doctorLinks = {
  dashboard: [
    { name: "Dashboard", href: "/doctor/dashboard" },
    { name: "Appointments", href: "/doctor/appointments" },
    { name: "Patients", href: "/doctor/patients" },
    { name: "Availability", href: "/doctor/availability" },
  ],
  settings: [
    { name: "Profile Settings", href: "/doctor/settings" },
    { name: "Change Password", href: "/doctor/settings/security" },
  ],
};

export default function DoctorFooter() {
  return (
    <footer className="relative bg-[#0B1215] text-gray-400">

      {/* Top glow line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-teal-500/40 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 gap-14 md:grid-cols-3">

          {/* BRAND */}
          <div>
            <div className="inline-flex items-center gap-3">
              <Image
                src="/logoq.png"
                alt="Healora Logo"
                width={60}
                height={60}
                className="object-contain rounded-full"
              />
              <div className="flex flex-col leading-none gap-0.5">
                <span className="text-[35px] font-semibold font-bold tracking-tight text-wellness-bg">
                  Healora
                </span>
                <span className="text-[15px] font-semibold text-wellness-bg/60 tracking-wide -mt-1">
                  &nbsp;Wellness Centre
                </span>
              </div>
            </div>

            <p className="mt-4 max-w-sm text-sm leading-relaxed">
              Manage your appointments, patients, consultations, and earnings —
              all in one place.
            </p>
          </div>

          {/* DASHBOARD LINKS */}
          <div>
            <h4 className="mb-5 text-sm font-semibold uppercase tracking-wide text-white">
              Dashboard
            </h4>
            <ul className="space-y-3">
              {doctorLinks.dashboard.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm transition hover:text-teal-400"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* SETTINGS / SUPPORT */}
          <div>
            <h4 className="mb-5 text-sm font-semibold uppercase tracking-wide text-white">
              Settings & Support
            </h4>

            <ul className="space-y-3">
              {doctorLinks.settings.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm transition hover:text-teal-400"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}

              <li className="flex items-center gap-2 mt-4">
                <Mail size={16} className="text-teal-500" />
                <a
                  href="mailto:healorawellnesscentre@gmail.com"
                  className="hover:text-teal-400 transition text-sm"
                >
                  Support Email
                </a>
              </li>

              {/* <li className="flex items-center gap-2">
                <LifeBuoy size={16} className="text-teal-500" />
                <Link
                  href="/doctor/help"
                  className="hover:text-teal-400 transition text-sm"
                >
                  Help Center
                </Link>
              </li> */}
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-10 border-t border-white/10 pt-6 text-xs text-gray-500 flex justify-between">
          <p>© {new Date().getFullYear()} Healora Wellness Centre Doctor Panel</p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="hover:text-teal-400">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-teal-400">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}