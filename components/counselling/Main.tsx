"use client";

import {
    MessageCircle,
    Users,
    ShieldCheck,
    HeartHandshake,
    Brain,
    Sparkles
} from "lucide-react";

export default function CounsellingPsychotherapy() {

    return (

        <section className="m-4 rounded-2xl px-6 py-24 bg-gradient-to-b from-white via-white to-wellness-bg">

            <div className="max-w-7xl mx-auto">
                {/* HERO HEADER */}

                <div className="mb-20 text-center">

                    <h1
                        className="
                    text-4xl md:text-6xl
                    font-semibold
                    leading-[1.15]
                    tracking-[-0.02em]
                    text-navy
                    "
                    >
                        Counselling & Psychotherapy
                        <br />
                        Caring for the Mind and Emotions
                    </h1>

                    <p
                        className="
                    mt-6
                    text-lg
                    text-slate-600
                    max-w-2xl
                    mx-auto
                    leading-relaxed
                    "
                    >
                        At Healora Wellness Centre, we believe that true wellness
                        comes from the balance of physical health and mental
                        resilience. Counselling and psychotherapy provide
                        a supportive environment where individuals can explore
                        emotions, overcome challenges, and develop healthier ways
                        of thinking and living.
                    </p>

                </div>



                {/* WHY IT MATTERS */}

                <div className="grid md:grid-cols-2 gap-12 mb-24">

                    <div className="space-y-5 text-slate-600 leading-relaxed">

                        <h2 className="text-2xl font-semibold text-slate-900">
                            Why Counselling and Psychotherapy Matter
                        </h2>

                        <p>
                            Counselling and psychotherapy are not only for
                            navigating crises. They are proactive tools that
                            enhance self-awareness, improve relationships,
                            and empower individuals to manage life’s
                            challenges with confidence.
                        </p>

                        <p>
                            By offering a safe and confidential space to
                            explore thoughts and emotions, therapy helps
                            uncover the root causes of emotional distress
                            and supports deep personal healing.
                        </p>

                        <p>
                            Whether addressing anxiety, depression, or simply
                            seeking personal growth, professional guidance
                            provides evidence-based strategies to create
                            long-term emotional stability.
                        </p>

                    </div>


                    <div className="space-y-5 text-slate-600 leading-relaxed">

                        <h2 className="text-2xl font-semibold text-slate-900">
                            Your Mind Deserves the Same Care as Your Body
                        </h2>

                        <p>
                            Just as we visit doctors for physical health,
                            mental wellbeing deserves equal attention.
                            Counselling and psychotherapy are not only
                            for major challenges but for anyone seeking
                            clarity, balance, and emotional strength.
                        </p>

                        <p>
                            Think of therapy as a mental tune-up that
                            helps you think clearer, feel lighter,
                            and navigate life with greater confidence.
                        </p>

                        <p>
                            Seeking help is a sign of strength and
                            self-awareness — a step toward building a
                            healthier and more fulfilling life.
                        </p>

                    </div>

                </div>



                {/* BENEFITS */}

                <div className="mb-24">

                    <div className="text-center mb-14">

                        <h2 className="text-3xl font-semibold text-slate-900">
                            How Counselling Helps You
                        </h2>

                        <p className="text-slate-600 max-w-2xl mx-auto mt-4">
                            Professional counselling provides practical tools,
                            emotional support, and personal insights that help
                            individuals navigate life with confidence and
                            resilience.
                        </p>

                    </div>


                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

                        <FeatureCard
                            icon={<MessageCircle size={22} />}
                            title="Release the Weight"
                            desc="Talk openly about stress, anxiety, or sadness in a supportive and judgment-free environment."
                        />

                        <FeatureCard
                            icon={<Users size={22} />}
                            title="Build Better Connections"
                            desc="Improve communication and strengthen relationships with family and loved ones."
                        />

                        <FeatureCard
                            icon={<Brain size={22} />}
                            title="Find Your Strength"
                            desc="Develop practical strategies to manage life’s challenges with calm and confidence."
                        />

                        <FeatureCard
                            icon={<HeartHandshake size={22} />}
                            title="Navigate Life’s Challenges"
                            desc="Receive support for everything from daily stress to deeper emotional struggles."
                        />

                        <FeatureCard
                            icon={<ShieldCheck size={22} />}
                            title="Break the Stigma"
                            desc="Normalize mental health care and encourage open conversations about wellbeing."
                        />

                        <FeatureCard
                            icon={<Sparkles size={22} />}
                            title="Empower Growth"
                            desc="Gain tools to lead a balanced, intentional, and fulfilling life."
                        />

                    </div>

                </div>



                {/* WHY CHOOSE HEALORA */}

                <div className="text-center max-w-3xl mx-auto">

                    <h2 className="text-3xl font-semibold text-slate-900 mb-6">
                        Why Choose Healora
                    </h2>

                    <p className="text-slate-600 leading-relaxed mb-4">
                        At Healora Wellness Centre, we place humanity at the
                        heart of technology. Our platform combines empathy,
                        privacy, and clinical excellence to provide integrated
                        care that supports both mind and body.
                    </p>

                    <p className="text-slate-700 font-medium">
                        Welcome to Healora — where your journey toward a
                        balanced and fulfilling life begins.
                    </p>

                </div>
            </div>

        </section>

    );
}



/* FEATURE CARD */

function FeatureCard({ icon, title, desc }: any) {

    return (

        <div
            className="
            p-8
            rounded-2xl
            border border-slate-200
            bg-white
            shadow-sm
            hover:shadow-md
            transition
            space-y-4
            "
        >

            <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center">
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