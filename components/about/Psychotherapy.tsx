"use client";

import { MessageCircle, Users, ShieldCheck, HeartHandshake, Brain, Sparkles } from "lucide-react";

export default function CounsellingPsychotherapySection() {
    return (

        <section className="max-w-7xl mx-auto px-6 py-12 space-y-20">

            {/* HEADER */}

            <div className="text-center space-y-4">

                <h2 className="text-3xl md:text-4xl font-semibold text-[#0B2E28]">
                    Counselling & Psychotherapy
                </h2>

                <p className="text-[#5F7C76] max-w-3xl mx-auto">
                    At Healora Wellness Centre, we believe that true wellness
                    comes from the balance of physical health and mental resilience.
                </p>

            </div>


            {/* WHY IT MATTERS */}

            <div className="grid md:grid-cols-2 gap-12 items-start">

                <div className="space-y-6 text-[#375A54] leading-relaxed">

                    <h3 className="text-2xl font-semibold text-[#0B2E28]">
                        Why Counselling and Psychotherapy Matter
                    </h3>

                    <p>
                        Counselling and psychotherapy are not just about
                        navigating crises. They are proactive tools that
                        enhance self-awareness, improve relationships,
                        and empower individuals to manage life’s
                        challenges with confidence.
                    </p>

                    <p>
                        By offering a safe and confidential space to
                        explore thoughts and emotions, these services
                        help uncover the root causes of distress and
                        support deep personal healing.
                    </p>

                    <p>
                        Whether addressing anxiety, depression, or simply
                        seeking personal growth, professional guidance
                        provides evidence-based strategies to create
                        long-term emotional stability.
                    </p>

                </div>


                <div className="space-y-6 text-[#375A54] leading-relaxed">

                    <h3 className="text-2xl font-semibold text-[#0B2E28]">
                        Your Mind Deserves the Same Care as Your Body
                    </h3>

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

                </div>

            </div>


            {/* BENEFIT CARDS */}

            <div className="space-y-12">

                <div className="text-center space-y-3">

                    <h3 className="text-2xl font-semibold text-[#0B2E28]">
                        How Counselling Helps You
                    </h3>

                </div>


                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                    <Card
                        icon={<MessageCircle size={20} />}
                        title="Release the Weight"
                        desc="Talk openly about stress, anxiety, or sadness in a supportive and judgment-free environment."
                    />

                    <Card
                        icon={<Users size={20} />}
                        title="Build Better Connections"
                        desc="Improve communication and strengthen relationships with family, friends, and loved ones."
                    />

                    <Card
                        icon={<Brain size={20} />}
                        title="Find Your Strength"
                        desc="Develop practical strategies to manage life’s challenges with calm and confidence."
                    />

                    <Card
                        icon={<HeartHandshake size={20} />}
                        title="Navigate Life’s Challenges"
                        desc="Receive support for everything from daily stress to deeper emotional struggles."
                    />

                    <Card
                        icon={<ShieldCheck size={20} />}
                        title="Break the Stigma"
                        desc="Normalize mental health care and make seeking support as natural as any routine check-up."
                    />

                    <Card
                        icon={<Sparkles size={20} />}
                        title="Empower Growth"
                        desc="Gain tools to lead a balanced, intentional, and fulfilling life."
                    />

                </div>

            </div>


            {/* WHY CHOOSE US */}

            <div className="text-center space-y-4 max-w-3xl mx-auto">

                <h3 className="text-2xl font-semibold text-[#0B2E28]">
                    Why Choose Healora
                </h3>

                <p className="text-[#5F7C76] leading-relaxed">
                    At Healora Wellness Centre, we place humanity at the
                    heart of technology. Our platform combines empathy,
                    privacy, and clinical excellence to provide integrated
                    care that supports both mind and body.
                </p>

                <p className="text-[#375A54] font-medium">
                    Welcome to Healora — where your journey toward a
                    balanced and fulfilling life begins.
                </p>

            </div>

        </section>
    );
}


/* CARD */

function Card({ icon, title, desc }: any) {
    return (

        <div className="p-6 rounded-2xl border border-[#CDE7E2] bg-white shadow-sm hover:shadow-md transition space-y-3">

            <div className="w-10 h-10 rounded-lg bg-[#E8FBF8] text-[#38D6C4] flex items-center justify-center">
                {icon}
            </div>

            <h4 className="font-semibold text-[#0B2E28]">
                {title}
            </h4>

            <p className="text-sm text-[#5F7C76] leading-relaxed">
                {desc}
            </p>

        </div>

    );
}