"use client";

import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

const footerLinks = {
    platform: [
        { name: "Specialties", href: "#specialties" },
        { name: "Doctors", href: "#doctors" },
    ],
    company: [
        { name: "About Healora", href: "/about" },
        { name: "FAQs", href: "#faqs" },
        { name: "Blogs", href: "/blogs" },
    ],
};

export default function Footer() {
    return (
        <footer className="relative bg-[#0B1215] text-gray-400">

            {/* Top glow line */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-teal-500/40 to-transparent" />

            <div className="mx-auto max-w-7xl px-6 py-12">

                {/* MAIN GRID */}

                <div className="grid grid-cols-1 gap-14 md:grid-cols-4">

                    {/* BRAND */}

                    <div>
                        <h3 className="text-2xl font-extrabold text-white">
                            Healora
                        </h3>

                        <p className="mt-4 max-w-sm text-sm leading-relaxed">
                            A trusted doctor consultation platform connecting
                            patients with verified healthcare professionals —
                            securely and seamlessly.
                        </p>

                        <Link
                            href="/doctors"
                            className="mt-6 inline-block rounded-xl bg-gradient-to-r from-teal-600 to-emerald-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:scale-[1.03]"
                        >
                            Book an Appointment
                        </Link>
                    </div>

                    {/* PLATFORM */}

                    <div>
                        <h4 className="mb-5 text-sm font-semibold uppercase tracking-wide text-white">
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

                    {/* COMPANY */}

                    <div>
                        <h4 className="mb-5 text-sm font-semibold uppercase tracking-wide text-white">
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

                    {/* CONTACT */}

                    <div>
                        <h4 className="mb-5 text-sm font-semibold uppercase tracking-wide text-white">
                            Contact
                        </h4>

                        <ul className="space-y-4 text-sm">

                            {/* EMAIL */}
                            <li className="flex items-start gap-3">
                                <Mail className="mt-0.5 h-4 w-4 text-teal-500" />
                                <a
                                    href="mailto:healorawellnesscentre@gmail.com"
                                    className="hover:text-teal-400 transition"
                                >
                                    healorawellnesscentre@gmail.com
                                </a>
                            </li>

                            {/* ADDRESS */}
                            <li className="flex items-start gap-3">
                                <MapPin className="mt-0.5 h-4 w-4 text-teal-500" />

                                <a
                                    href="https://www.google.com/maps/search/?api=1&query=Karuvanpoyil+Koduvally+Kozhikode+Kerala+673572"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-teal-400 transition"
                                >
                                    Healora Wellness Centre<br />
                                    Karuvanpoyil<br />
                                    Karuvanpoyil (PO)<br />
                                    Koduvally, Kozhikode<br />
                                    Kerala, India<br />
                                    Pin: 673572
                                </a>

                            </li>

                        </ul>
                    </div>

                </div>


                {/* LEGAL BAR */}

                <div className="mt-8 border-t border-white/10 pt-8">

                    <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

                        {/* COPYRIGHT */}

                        <p className="text-xs text-gray-500">
                            © {new Date().getFullYear()} Healora. All rights reserved.
                        </p>

                        {/* LEGAL LINKS */}

                        <div className="flex items-center gap-6 text-xs">

                            <Link
                                href="/privacy-policy"
                                className="transition hover:text-teal-400"
                            >
                                Privacy Policy
                            </Link>

                            <Link
                                href="/terms"
                                className="transition hover:text-teal-400"
                            >
                                Terms & Conditions
                            </Link>

                            <Link
                                href="/cookies"
                                className="transition hover:text-teal-400"
                            >
                                Cookie Policy
                            </Link>

                        </div>

                        {/* CREDIT */}

                        <p className="text-xs text-gray-600">
                            Built with care for better healthcare access
                        </p>

                    </div>

                </div>

            </div>
        </footer>
    );
}