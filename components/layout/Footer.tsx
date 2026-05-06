"use client";

import Link from "next/link";
import { Mail, MapPin, Instagram, Linkedin, Youtube } from "lucide-react";
import Image from "next/image";

const footerLinks = {
    platform: [
        { name: "Specialities", href: "/specialities" },
        { name: "Doctors", href: "/doctors" },
        { name: "Why Homeopathy", href: "/why-homeopathy" },
        { name: "Agro Homeopathy", href: "/agro-homeopathy" },
        { name: "Veterinary Homeopathy", href: "/veterinary-homeopathy" },
        { name: "Counselling & Psychotherapy", href: "/counselling" },
    ],
    company: [
        { name: "About Healora", href: "/about" },
        { name: "Blogs", href: "/blog" },
        { name: "FAQs", href: "/faqs" },
        { name: "Contact", href: "/contact" },
        { name: "Career", href: "/career" },
        { name: "Medikits", href: "/medikits" },
    ],
};

export default function Footer() {
    return (
        <footer className="relative overflow-x-hidden bg-[#0B1215] text-gray-400">

            {/* Glow */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-teal-500/40 to-transparent" />

            <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12">

                {/* GRID */}
                <div className="grid grid-cols-1 gap-12 md:grid-cols-4">

                    {/* BRAND */}
                    <div className="min-w-0">
                        <div className="inline-flex items-center gap-3">
                            <Image
                                src="/logoq.png"
                                alt="Healora Logo"
                                width={60}
                                height={60}
                                className="object-contain rounded-full flex-shrink-0"
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

                        <p className="mt-4 text-sm leading-relaxed break-words">
                            A trusted doctor consultation platform connecting patients with
                            verified healthcare professionals — securely and seamlessly.
                        </p>

                        <Link
                            href="/doctors"
                            className="mt-6 inline-block rounded-xl bg-wellness-accent px-5 py-2.5 text-sm font-semibold text-navy shadow-md transition hover:scale-[1.03]"
                        >
                            Book an Appointment
                        </Link>
                    </div>

                    {/* PLATFORM */}
                    <div className="min-w-0">
                        <h4 className="mb-5 text-sm font-semibold uppercase tracking-wide text-white">
                            Platform
                        </h4>

                        <ul className="space-y-3">
                            {footerLinks.platform.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className="text-sm transition hover:text-teal-400 break-words"
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* COMPANY */}
                    <div className="min-w-0">
                        <h4 className="mb-5 text-sm font-semibold uppercase tracking-wide text-white">
                            Company
                        </h4>

                        <ul className="space-y-3">
                            {footerLinks.company.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className="text-sm transition hover:text-teal-400 break-words"
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* CONNECT */}
                    <div className="min-w-0">
                        <h4 className="mb-5 text-sm font-semibold uppercase tracking-wide text-white">
                            Connect
                        </h4>

                        <ul className="space-y-4 text-sm">

                            {/* EMAIL */}
                            <li className="flex items-start gap-3 min-w-0">
                                <Mail className="mt-0.5 h-4 w-4 text-teal-500 flex-shrink-0" />
                                <a
                                    href="mailto:healorawellnesscentre@gmail.com"
                                    className="hover:text-teal-400 transition break-all"
                                >
                                    healorawellnesscentre@gmail.com
                                </a>
                            </li>

                            {/* ADDRESS */}
                            <li className="flex items-start gap-3 min-w-0">
                                <MapPin className="mt-0.5 h-4 w-4 text-teal-500 flex-shrink-0" />

                                <a
                                    href="https://maps.app.goo.gl/ev659LvHxH6hHjMVA"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-teal-400 transition break-words"
                                >
                                    Healora Wellness Centre<br />
                                    Karuvanpoyil, Koduvally<br />
                                    Kozhikode, Kerala<br />
                                    India — 673572
                                </a>
                            </li>
                        </ul>

                        {/* SOCIAL */}
                        <div className="mt-6 flex items-center gap-4">
                            <a href="https://www.instagram.com/heal_ora_" className="hover:text-teal-400">
                                <Instagram size={18} />
                            </a>
                            <a className="hover:text-teal-400">
                                <Linkedin size={18} />
                            </a>
                            <a className="hover:text-teal-400">
                                <Youtube size={18} />
                            </a>
                        </div>
                    </div>
                </div>

                {/* LEGAL */}
                <div className="mt-10 border-t border-white/10 pt-6">

                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                        <p className="text-xs text-gray-500 text-center md:text-left">
                            © {new Date().getFullYear()} Healora Wellness Centre. All rights reserved.
                        </p>

                        <div className="flex flex-wrap justify-center gap-4 text-xs">
                            <Link href="/privacy-policy" className="hover:text-teal-400">
                                Privacy Policy
                            </Link>
                            <Link href="/terms" className="hover:text-teal-400">
                                Terms & Conditions
                            </Link>
                            <Link href="/cookie-policy" className="hover:text-teal-400">
                                Cookie Policy
                            </Link>
                        </div>

                        <p className="text-xs text-gray-600 text-center md:text-right">
                            Built with care for better healthcare access
                        </p>

                    </div>
                </div>

            </div>
        </footer>
    );
}