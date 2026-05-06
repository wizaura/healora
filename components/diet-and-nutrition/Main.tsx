"use client";

import {
    Leaf,
    Brain,
    Activity,
    HeartPulse,
    Sparkles,
    Utensils,
    ShieldCheck,
    Users,
    FlaskConical,
} from "lucide-react";

export default function NutritionSection() {
    return (
        <section className="m-4 rounded-2xl px-4 sm:px-6 pt-20 pb-8 bg-gradient-to-b from-white via-white to-wellness-bg">

            <div className="max-w-7xl mx-auto">

                {/* HERO */}
                <div className="mb-20 text-center">
                    <h1 className="text-3xl sm:text-4xl md:text-6xl font-semibold text-navy leading-[1.1] break-words">
                        Nutrition & Wellness
                    </h1>

                    <p className="mt-6 text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
                        Welcome to the foundational pillar of your health journey. At Healora Wellness Centre,
                        we believe that nutrition is not just about "eating well" — it is about fueling your body's unique potential.
                    </p>
                </div>

                {/* FUELING */}
                <Section
                    title="Fueling Your Best Self"
                    icon={<Sparkles size={22} />}
                    items={[
                        "Nutrition is the cornerstone of a vibrant life.",
                        "Every meal is an opportunity to nourish your cells, balance your hormones, and sharpen your mind.",
                        "In a world of conflicting dietary trends and quick fixes, we focus on sustainable wellness.",
                        "True health comes from harmony between what you enjoy and what your body needs.",
                    ]}
                />

                {/* WHY DIET MATTERS */}
                <div className="mb-12 max-w-3xl mx-auto text-center">

                    <div className="items-center justify-center gap-2 mb-4 text-teal-600">
                        <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900">
                            Why Your Diet Matters
                        </h2>
                    </div>

                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                        What you eat influences nearly every aspect of your daily existence. Proper nutrition
                        is the primary defense against chronic illness and the catalyst for peak performance.
                    </p>

                </div>

                {/* BENEFITS */}
                <div className="mb-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                    <MiniCard
                        icon={<Activity size={20} />}
                        title="Energy Management"
                        desc="Stable blood sugar levels mean no more afternoon crashes."
                    />

                    <MiniCard
                        icon={<Brain size={20} />}
                        title="Mental Clarity"
                        desc="Nutrient-dense foods support cognitive function and emotional resilience."
                    />

                    <MiniCard
                        icon={<Leaf size={20} />}
                        title="Longevity"
                        desc="Balanced diets reduce lifestyle diseases and support healthy aging."
                    />

                    <MiniCard
                        icon={<Utensils size={20} />}
                        title="Physical Strength"
                        desc="Protein and micronutrients support muscle repair and bone health."
                    />

                </div>

                {/* APPROACH */}
                <div className="mb-20">

                    {/* HEADER */}
                    <div className="max-w-3xl mx-auto text-center mb-12">

                        <div className="flex items-center justify-center gap-2 mb-4 text-teal-600">
                            <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900">
                                How Our Nutrition Approach Helps
                            </h2>
                        </div>

                        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                            Transitioning to a healthier lifestyle can feel overwhelming. We bridge the gap between
                            clinical knowledge and your kitchen table.
                        </p>

                    </div>

                    {/* CARDS */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                        {/* CARD 1 */}
                        <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition space-y-3">
                            <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center">
                                1
                            </div>

                            <h4 className="font-medium text-slate-900">
                                Correcting Imbalances
                            </h4>

                            <p className="text-sm text-slate-600 leading-relaxed">
                                We identify nutritional gaps that may be causing fatigue, digestive issues, or skin concerns.
                            </p>
                        </div>

                        {/* CARD 2 */}
                        <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition space-y-3">
                            <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center">
                                2
                            </div>

                            <h4 className="font-medium text-slate-900">
                                Simplified Science
                            </h4>

                            <p className="text-sm text-slate-600 leading-relaxed">
                                We break down complex nutritional concepts into actionable, everyday habits.
                            </p>
                        </div>

                        {/* CARD 3 */}
                        <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition space-y-3">
                            <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center">
                                3
                            </div>

                            <h4 className="font-medium text-slate-900">
                                Sustainable Change
                            </h4>

                            <p className="text-sm text-slate-600 leading-relaxed">
                                Our methods focus on adding value to your diet rather than removing things, ensuring you never feel deprived.
                            </p>
                        </div>

                    </div>
                </div>

                {/* WHY HEALORA */}
                <Section
                    title="Why Choose Healora Wellness Centre"
                    icon={<ShieldCheck size={22} />}
                    items={[
                        "At Healora, we don’t believe in one-size-fits-all meal plans. We treat every individual as a unique biological system.",
                        "Evidence-Based Guidance: Our recommendations are rooted in the latest nutritional science and food safety standards.",
                        "Holistic Integration: We look at the big picture—how your diet interacts with your sleep, stress levels, and activity.",
                        "Authentic Support: We provide the accountability and empathy needed to navigate the challenges of lifestyle change.",
                        "Community-Focused: Join a movement of individuals dedicated to bettering themselves, one meal at a time.",
                    ]}
                />

            </div>
        </section>
    );
}

/* SECTION */

function Section({ title, items, icon }: any) {
    return (
        <div className="mb-12">

            <div className="text-center mb-12">
                <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 break-words">
                    {title}
                </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                {items.map((item: string, i: number) => (
                    <div
                        key={i}
                        className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition space-y-4 min-w-0"
                    >
                        <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center">
                            {icon}
                        </div>

                        <p className="text-sm text-slate-600 leading-relaxed break-words">
                            {item}
                        </p>
                    </div>
                ))}

            </div>
        </div>
    );
}

/* MINI CARDS */

function MiniCard({ icon, title, desc }: any) {
    return (
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition text-center space-y-3">

            <div className="w-10 h-10 mx-auto rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center">
                {icon}
            </div>

            <h4 className="font-medium text-slate-900">{title}</h4>

            <p className="text-sm text-slate-600">{desc}</p>

        </div>
    );
}