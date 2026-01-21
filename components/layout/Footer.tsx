"use client";

import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

const footerLinks = {
    platform: [
        { name: "Specialties", href: "#specialties" },
        { name: "Doctors", href: "#doctors" },
        { name: "How it Works", href: "#how-it-works" },
        { name: "Reviews", href: "#reviews" },
    ],
    company: [
        { name: "About Healora", href: "/about" },
        { name: "FAQs", href: "#faqs" },
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms & Conditions", href: "/terms" },
    ],
};

export default function Footer() {
    return (
        <footer className="relative bg-[#0B1215] text-gray-400">
            {/* Top glow */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-teal-500/40 to-transparent" />

            <div className="mx-auto max-w-7xl px-6 py-20">

                <div className="grid grid-cols-1 gap-16 md:grid-cols-4">

                    {/* Brand */}
                    <div>
                        <h3 className="text-2xl font-extrabold text-white">
                            Healora
                        </h3>
                        <p className="mt-4 max-w-sm text-sm leading-relaxed">
                            A trusted doctor consultation platform designed to
                            connect patients with verified healthcare
                            professionals — securely and seamlessly.
                        </p>

                        <Link
                            href="/book"
                            className="mt-6 inline-block rounded-xl bg-gradient-to-r from-teal-600 to-emerald-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:scale-[1.03]"
                        >
                            Book an Appointment
                        </Link>
                    </div>

                    {/* Platform */}
                    <div>
                        <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white">
                            Platform
                        </h4>
                        <ul className="space-y-3">
                            {footerLinks.platform.map((item) => (
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

                    {/* Company */}
                    <div>
                        <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white">
                            Company
                        </h4>
                        <ul className="space-y-3">
                            {footerLinks.company.map((item) => (
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

                    {/* Contact */}
                    <div>
                        <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white">
                            Contact
                        </h4>

                        <ul className="space-y-4 text-sm">
                            <li className="flex items-start gap-3">
                                <Mail className="mt-0.5 h-4 w-4 text-teal-500" />
                                support@healora.com
                            </li>
                            <li className="flex items-start gap-3">
                                <Phone className="mt-0.5 h-4 w-4 text-teal-500" />
                                +91 90000 00000
                            </li>
                            <li className="flex items-start gap-3">
                                <MapPin className="mt-0.5 h-4 w-4 text-teal-500" />
                                India
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom */}
                <div className="mt-20 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 text-xs md:flex-row">
                    <p>
                        © {new Date().getFullYear()} Healora. All rights reserved.
                    </p>

                    <p className="text-gray-500">
                        Built with care for better healthcare access
                    </p>
                </div>
            </div>
        </footer>
    );
}
