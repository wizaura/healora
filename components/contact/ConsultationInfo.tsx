"use client";

import { CalendarCheck, MessageCircle, HeartPulse } from "lucide-react";

export default function ConsultationInfoSection() {

    return (

        <section className="m-4 rounded-2xl px-6 pb-16 bg-gradient-to-b from-white via-white to-wellness-bg">

            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-14">

                    <h2 className="text-2xl md:text-4xl font-semibold text-slate-900">
                        How Online Consultation Works
                    </h2>

                    <p className="text-slate-600 mt-4 max-w-2xl mx-auto">
                        Our online consultation process is simple and designed
                        to make professional healthcare accessible from anywhere.
                    </p>

                </div>


                <div className="grid md:grid-cols-3 gap-8">

                    <StepCard
                        icon={<MessageCircle size={22} />}
                        title="Send Your Request"
                        desc="Contact us or book through our doctor page to begin your consultation."
                    />

                    <StepCard
                        icon={<CalendarCheck size={22} />}
                        title="Schedule Consultation"
                        desc="Choose a suitable time for your appointment with one of our specialists."
                    />

                    <StepCard
                        icon={<HeartPulse size={22} />}
                        title="Receive Personalized Care"
                        desc="Get expert guidance, treatment plans, and follow-up support."
                    />

                </div>

            </div>
        </section>

    );

}



/* STEP CARD */

function StepCard({ icon, title, desc }: any) {

    return (

        <div className="p-8 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-4 text-center">

            <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center mx-auto">
                {icon}
            </div>

            <h3 className="font-semibold text-slate-900">
                {title}
            </h3>

            <p className="text-sm text-slate-600 leading-relaxed">
                {desc}
            </p>

        </div>

    );

}