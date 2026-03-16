"use client";

import { HeartPulse, Apple, Brain, Dumbbell } from "lucide-react";

export default function HealoraAboutSection() {

    return (

        <section className="m-4 rounded-2xl px-6 pb-24 bg-gradient-to-b from-white via-white to-wellness-bg">

            <div className="max-w-7xl mx-auto space-y-24">
                {/* STORY */}

                <div className="grid md:grid-cols-2 gap-16 items-center">

                    <div className="space-y-5 text-slate-700 text-md md:text-lg leading-relaxed">

                        <h2 className="text-2xl md:text-4xl font-semibold text-navy">
                            Our Story
                        </h2>

                        <p>
                            At Healora Wellness Centre, our name reflects our
                            promise — Healing and Wellness. We believe
                            healthcare should be accessible, compassionate,
                            and centered around the individual.
                        </p>

                        <p>
                            Founded by experienced healthcare professionals,
                            Healora was created as a digital consultation hub
                            where patients can receive expert guidance
                            regardless of where they live.
                        </p>

                        <p>
                            By combining traditional healing systems with
                            modern medical insights, we aim to provide care
                            that supports both physical and emotional wellbeing.
                        </p>

                    </div>


                    <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm">

                        <img
                            src="/hero-1.jpg"
                            alt="Healora Wellness"
                            className="w-full h-[380px] object-cover"
                        />

                    </div>

                </div>



                {/* HOLISTIC ECOSYSTEM */}

                <div>

                    <div className="text-center mb-14">

                        <h2 className="text-2xl md:text-4xl font-semibold text-navy">
                            Our Holistic Ecosystem
                        </h2>

                        <p className="text-slate-600 max-w-2xl mx-auto mt-4">
                            Our multidisciplinary team works together to
                            support every aspect of health and wellbeing.
                        </p>

                    </div>


                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

                        <Card
                            icon={<HeartPulse size={22} />}
                            title="Medical Experts"
                            desc="Experienced homeopathic doctors delivering personalized care."
                        />

                        <Card
                            icon={<Apple size={22} />}
                            title="Nutrition & Vitality"
                            desc="Professional dietitians guiding sustainable healthy habits."
                        />

                        <Card
                            icon={<Brain size={22} />}
                            title="Mental Wellbeing"
                            desc="Compassionate psychologists supporting emotional health."
                        />

                        <Card
                            icon={<Dumbbell size={22} />}
                            title="Physical Strength"
                            desc="Fitness trainers and physiotherapists improving mobility."
                        />

                    </div>

                </div>



                {/* WHAT SETS US APART */}

                <div>

                    <div className="text-center mb-14">

                        <h2 className="text-2xl md:text-4xl font-semibold text-navy">
                            What Sets Healora Apart
                        </h2>

                    </div>


                    <div className="grid md:grid-cols-3 gap-8">

                        <FeatureCard
                            title="Scientifically Informed Care"
                            desc="Traditional healing philosophies supported by modern medical knowledge."
                        />

                        <FeatureCard
                            title="Patient-Centered Philosophy"
                            desc="Every treatment plan is carefully tailored to the individual."
                        />

                        <FeatureCard
                            title="Healthcare Without Borders"
                            desc="Our digital-first platform allows care to reach patients anywhere."
                        />

                    </div>

                </div>

                {/* MOTTO */}

                <div className="max-w-4xl mx-auto text-center">

                    <div
                        className="
        p-10
        rounded-3xl
        border border-slate-200
        bg-slate-50
        shadow-sm
        "
                    >

                        <h3 className="text-xl md:text-3xl font-semibold text-navy mb-4">
                            Our Motto
                        </h3>

                        <p className="text-slate-600 text-lg leading-relaxed">

                            Quality healthcare should never be limited by geography.
                            Healora bridges the distance between patients and doctors
                            — one consultation at a time.

                        </p>

                    </div>

                </div>




                {/* HUMANITY INTEGRATED */}

                <div className="grid md:grid-cols-2 gap-16 items-center">

                    <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm">

                        <img
                            src="/hero-2.jpeg"
                            alt="Healora Community"
                            className="w-full h-[380px] object-cover"
                        />

                    </div>

                    <div className="space-y-5 text-slate-800 leading-relaxed text-md md:text-lg">

                        <h2 className="text-2xl md:text-4xl font-semibold text-navy">
                            Humanity, Integrated
                        </h2>

                        <p>
                            Healthcare should never feel fragmented.
                            For too long, individuals have had to visit
                            multiple places to address different aspects
                            of wellbeing.
                        </p>

                        <p>
                            Healora integrates counselling, psychotherapy,
                            nutrition, and medical expertise into a single
                            seamless ecosystem designed to support the
                            whole person.
                        </p>

                    </div>

                </div>

            </div>

        </section>

    );

}



/* CARD */

function Card({ icon, title, desc }: any) {

    return (

        <div className="p-8 rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition space-y-4 text-center">

            <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center mx-auto">
                {icon}
            </div>

            <h4 className="font-semibold text-slate-900">
                {title}
            </h4>

            <p className="text-sm text-slate-600 leading-relaxed">
                {desc}
            </p>

        </div>

    );

}



/* FEATURE CARD */

function FeatureCard({ title, desc }: any) {

    return (

        <div className="p-8 rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition">

            <h4 className="font-semibold text-slate-900 mb-2">
                {title}
            </h4>

            <p className="text-sm text-slate-600 leading-relaxed">
                {desc}
            </p>

        </div>

    );

}