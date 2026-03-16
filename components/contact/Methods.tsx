"use client";

import Link from "next/link";
import { Mail, CalendarCheck, MapPin } from "lucide-react";

export default function ContactMethods() {
    return (

        <section className="max-w-7xl mx-auto px-6 pb-16">

            <div className="grid md:grid-cols-3 gap-8">

                <ContactCard
                    icon={<Mail size={22} />}
                    title="Email Us"
                    desc="For general enquiries, appointment requests, or service information."
                    info="healorawellnesscentre@gmail.com"
                    href="mailto:healorawellnesscentre@gmail.com"
                />

                <ContactCard
                    icon={<CalendarCheck size={22} />}
                    title="Online Consultation"
                    desc="Book a virtual consultation with our specialists from anywhere."
                    info="Schedule an appointment"
                    href="/doctors"
                />

                <ContactCard
                    icon={<MapPin size={22} />}
                    title="Visit Our Clinic"
                    desc="You are welcome to visit our wellness centre during consultation hours."
                    info="Healora Wellness Centre, calicut"
                    href="https://maps.google.com/?q=Kozhikode"
                />

            </div>

        </section>

    );
}



/* CONTACT CARD */

function ContactCard({ icon, title, desc, info, href }: any) {

    return (

        <Link href={href} target={href.startsWith("http") ? "_blank" : undefined}>

            <div
                className="
                group
                p-8
                rounded-2xl
                border border-slate-200
                bg-white
                shadow-sm
                hover:shadow-md
                hover:-translate-y-1
                transition
                space-y-4
                text-center
                cursor-pointer
                "
            >

                <div
                    className="
                    w-10 h-10
                    rounded-lg
                    bg-teal-50
                    text-teal-600
                    flex items-center justify-center
                    mx-auto
                    "
                >
                    {icon}
                </div>

                <h3 className="font-semibold text-slate-900">
                    {title}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed">
                    {desc}
                </p>

                <p className="text-sm font-medium text-slate-900 group-hover:text-emerald-600">
                    {info}
                </p>

            </div>

        </Link>

    );
}