"use client";

import { HeartPulse, Apple, Brain, Dumbbell } from "lucide-react";

export default function HealoraAboutSection() {

    return (

        <section
            className="
            relative
            bg-gradient-to-b
            from-white
            via-white
            to-wellness-bg
            py-24 m-4 rounded-2xl
        "
        >

            <div className="max-w-7xl mx-auto px-6 space-y-24 py-12">


                {/* HERO / STORY */}

                <div className="grid md:grid-cols-2 gap-16 items-center">

                    {/* TEXT */}

                    <div className="space-y-6 text-center md:text-left">

                        <span
                            className="
                            inline-block
                            text-xs
                            tracking-wide
                            font-medium
                            bg-navy
                            text-white
                            px-4 py-1.5
                            rounded-full
                        "
                        >
                            About Healora
                        </span>

                        <h2
                            className="
                            text-3xl md:text-4xl lg:text-5xl
                            font-semibold
                            text-navy-dark
                            leading-tight
                        "
                        >
                            Why Healora Wellness Centre
                        </h2>

                        <p className="text-lg text-navy/90 leading-relaxed max-w-xl mx-auto md:mx-0">

                            At
                            <span className="font-semibold text-emerald-700 ml-1">
                                Healora Wellness Centre
                            </span>
                            , our name is our promise — Healing & Wellness.

                            We believe quality healthcare should be a right,
                            not a privilege determined by geography.

                        </p>

                        <p className="text-navy/90 leading-relaxed max-w-xl mx-auto md:mx-0">

                            Founded by highly qualified medical professionals,
                            Healora is an online consultation hub designed to
                            provide expert care wherever you are in the world.

                        </p>

                    </div>


                    {/* IMAGE */}

                    <div className="relative">

                        <div
                            className="
                            absolute -inset-6
                            bg-gradient-to-tr
                            from-white
                            via-weness-bg
                            to-white
                            rounded-3xl
                            blur-2xl
                        "
                        />

                        <div
                            className="
                            relative
                            rounded-3xl
                            overflow-hidden
                            border border-navy/10
                            shadow-lg
                        "
                        >

                            <img
                                src="/hero-1.jpg"
                                className="w-full h-[380px] object-cover"
                                alt="Healora Wellness"
                            />

                        </div>

                    </div>

                </div>


                {/* HOLISTIC ECOSYSTEM */}

                <div className="space-y-10 text-center">

                    <div className="space-y-3 max-w-3xl mx-auto">

                        <h3 className="text-3xl font-semibold text-navy-dark">
                            Our Holistic Ecosystem
                        </h3>

                        <p className="text-navy/90 text-lg">
                            We care for the whole individual. Our multi-disciplinary
                            team works together to support every aspect of health
                            and wellbeing.
                        </p>

                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

                        <Card
                            icon={<HeartPulse size={22} />}
                            title="Medical Experts"
                            desc="Specialized homeopathic doctors delivering personalized treatment."
                        />

                        <Card
                            icon={<Apple size={22} />}
                            title="Nutrition & Vitality"
                            desc="Professional dietitians helping you build sustainable healthy habits."
                        />

                        <Card
                            icon={<Brain size={22} />}
                            title="Mental Wellbeing"
                            desc="Compassionate counsellors and psychologists supporting emotional health."
                        />

                        <Card
                            icon={<Dumbbell size={22} />}
                            title="Physical Strength"
                            desc="Fitness trainers and physiotherapists improving mobility and strength."
                        />

                    </div>

                </div>


                {/* WHAT SETS US APART */}

                <div className="space-y-10 text-center">

                    <div className="max-w-3xl mx-auto space-y-3">

                        <h3 className="text-3xl font-semibold text-navy-dark">
                            What Sets Us Apart
                        </h3>

                        <p className="text-navy/90 text-lg">
                            Healora is built on science, empathy and accessibility
                            to ensure every patient receives meaningful care.
                        </p>

                    </div>

                    <div className="grid md:grid-cols-3 gap-8 text-left">

                        <FeatureCard
                            title="Scientifically Informed Care"
                            desc="Traditional healing philosophies combined with modern diagnostic insights."
                        />

                        <FeatureCard
                            title="Patient-Centered Philosophy"
                            desc="Every treatment plan is tailored to the individual."
                        />

                        <FeatureCard
                            title="Healthcare Without Borders"
                            desc="Our digital-first platform ensures care reaches patients everywhere."
                        />

                    </div>

                </div>


                {/* MOTTO */}

                <div
                    className="
                    bg-gradient-to-br
                    from-white
                    via-wellness-bg
                    to-white
                    border border-navy/10
                    rounded-3xl
                    p-10
                    text-center
                    space-y-4
                "
                >

                    <h3 className="text-xl font-semibold text-navy-dark">
                        Our Motto
                    </h3>

                    <p className="text-navy/90 max-w-3xl mx-auto text-lg">

                        Quality healthcare should never be limited by geography.
                        Healora bridges the distance between patients and doctors
                        — one consultation at a time.

                    </p>

                </div>


                {/* HUMANITY INTEGRATED */}

                <div className="grid md:grid-cols-2 gap-12 items-center">

                    <div
                        className="
                        rounded-3xl
                        overflow-hidden
                        border border-navy/10
                        shadow-sm
                    "
                    >
                        <img
                            src="/hero-2.jpeg"
                            className="w-full h-full object-cover"
                            alt="Healora Community"
                        />
                    </div>

                    <div className="space-y-5 text-center md:text-left">

                        <h3 className="text-3xl font-semibold text-navy-dark">
                            Humanity, Integrated
                        </h3>

                        <p className="text-navy/90 leading-relaxed text-lg max-w-xl mx-auto md:mx-0">

                            Healthcare shouldn’t feel fragmented. For too long,
                            people had to visit multiple places for different
                            aspects of wellbeing.

                        </p>

                        <p className="text-navy/90 leading-relaxed max-w-xl mx-auto md:mx-0">

                            Healora integrates counselling, psychotherapy and
                            medical expertise into one seamless ecosystem.

                        </p>

                    </div>

                </div>


            </div>

        </section>

    );

}


/* ECOSYSTEM CARD */

function Card({ icon, title, desc }: any) {

    return (

        <div
            className="
            p-6
            rounded-2xl
            border border-navy/10
            bg-white
            shadow-sm
            hover:shadow-md
            transition
            space-y-3
            text-center
        "
        >

            <div
                className="
                w-12 h-12
                rounded-xl
                bg-wellness-bg
                text-navy
                flex items-center justify-center
                mx-auto
            "
            >
                {icon}
            </div>

            <h4 className="font-semibold text-navy-dark">
                {title}
            </h4>

            <p className="text-sm text-navy/70 leading-relaxed">
                {desc}
            </p>

        </div>

    );

}


/* FEATURE CARD */

function FeatureCard({ title, desc }: any) {

    return (

        <div
            className="
            rounded-2xl
            border border-navy/10
            bg-white
            p-6
            shadow-sm
            hover:-translate-y-1
            hover:shadow-lg
            transition
        "
        >

            <h4 className="font-semibold text-navy-dark mb-2">
                {title}
            </h4>

            <p className="text-sm text-navy/70 leading-relaxed">
                {desc}
            </p>

        </div>

    );

}