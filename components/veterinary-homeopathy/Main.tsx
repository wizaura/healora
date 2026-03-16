"use client";

import {
    HeartPulse,
    PawPrint,
    ShieldCheck,
    Activity,
    Sparkles,
    Leaf
} from "lucide-react";

export default function VeterinaryHomeopathy() {

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
                        Veterinary Homeopathy
                        <br />
                        Natural Healing for Animals
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
                        Veterinary homeopathy is a holistic complementary therapy
                        that uses highly diluted natural remedies to stimulate
                        healing in animals. It focuses on individualized,
                        gentle, and non-toxic treatment for pets and livestock.
                    </p>

                </div>



                {/* INTRO SECTION */}

                <div className="grid md:grid-cols-2 gap-12 mb-24 items-start">

                    <div className="space-y-4 text-slate-600 leading-relaxed">

                        <h2 className="text-2xl font-semibold text-slate-900">
                            What is Veterinary Homeopathy?
                        </h2>

                        <p>
                            Veterinary homeopathy applies the same principles
                            used in human homeopathy but adapts them for animals
                            such as dogs, cats, horses, cattle, birds, and other pets.
                        </p>

                        <p>
                            In this system, natural substances are prepared in
                            extremely small doses and given to animals to help
                            stimulate their body’s natural healing ability.
                        </p>

                        <p>
                            It is commonly used for a variety of health concerns,
                            including skin conditions, digestive issues,
                            injuries, behavioral stress, and joint problems.
                        </p>

                    </div>


                    {/* CONDITIONS TREATED */}

                    <div className="p-8 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-4">

                        <h3 className="text-xl font-semibold text-slate-900">
                            Conditions Often Treated
                        </h3>

                        <ul className="list-disc pl-6 space-y-2 text-slate-600">

                            <li>Skin problems and allergies</li>

                            <li>Digestive disorders</li>

                            <li>Injuries and recovery support</li>

                            <li>Stress or behavioral issues</li>

                            <li>Joint and mobility problems</li>

                        </ul>

                    </div>

                </div>



                {/* ANIMALS SECTION */}

                <div className="mb-24">

                    <div className="text-center mb-14">

                        <h2 className="text-3xl font-semibold text-slate-900">
                            Animals Commonly Treated
                        </h2>

                        <p className="text-slate-600 max-w-2xl mx-auto mt-4">
                            Veterinary homeopathy can be used for a wide variety
                            of domestic animals, pets, and livestock.
                        </p>

                    </div>

                    <div className="grid md:grid-cols-3 gap-8">

                        <AnimalCard
                            icon={<PawPrint size={22} />}
                            title="Pets"
                            desc="Dogs, cats, rabbits, birds, and other household animals."
                        />

                        <AnimalCard
                            icon={<Activity size={22} />}
                            title="Horses"
                            desc="Used in equine care for injuries, joint issues, and stress."
                        />

                        <AnimalCard
                            icon={<Leaf size={22} />}
                            title="Farm Animals"
                            desc="Cattle, goats, sheep, and livestock in sustainable farming."
                        />

                    </div>

                </div>



                {/* HOW IT WORKS */}

                <div className="mb-24">

                    <div className="text-center mb-14">

                        <h2 className="text-3xl font-semibold text-slate-900">
                            How Veterinary Homeopathy Works
                        </h2>

                        <p className="text-slate-600 max-w-2xl mx-auto mt-4">
                            Treatment is based on the classical homeopathic
                            philosophy of stimulating the body’s natural
                            healing response.
                        </p>

                    </div>


                    <div className="grid md:grid-cols-3 gap-8">

                        <FeatureCard
                            icon={<Sparkles size={22} />}
                            title="Like Cures Like"
                            desc="A substance causing symptoms in a healthy animal may be used in diluted form to treat similar symptoms."
                        />

                        <FeatureCard
                            icon={<HeartPulse size={22} />}
                            title="Individualized Care"
                            desc="Veterinarians evaluate behavior, eating habits, temperament, and environment before selecting remedies."
                        />

                        <FeatureCard
                            icon={<ShieldCheck size={22} />}
                            title="Natural Healing"
                            desc="Remedies stimulate the animal’s natural healing mechanisms to restore balance."
                        />

                    </div>

                </div>



                {/* BENEFITS */}

                <div className="mb-24">

                    <div className="text-center mb-14">

                        <h2 className="text-3xl font-semibold text-slate-900">
                            Benefits of Veterinary Homeopathy
                        </h2>

                    </div>


                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

                        <BenefitCard
                            text="Gentle and non-invasive treatment"
                        />

                        <BenefitCard
                            text="Can be used for many animal species"
                        />

                        <BenefitCard
                            text="Often used alongside conventional veterinary care"
                        />

                        <BenefitCard
                            text="Remedies are simple and easy to administer"
                        />

                    </div>

                </div>



                {/* KEY ASPECTS */}

                <div>

                    <div className="text-center mb-14">

                        <h2 className="text-3xl font-semibold text-slate-900">
                            Key Aspects of Veterinary Homeopathy
                        </h2>

                    </div>

                    <div className="grid md:grid-cols-3 gap-8">

                        <FeatureCard
                            icon={<PawPrint size={22} />}
                            title="Applications"
                            desc="Used for behavioral issues, chronic illnesses, skin diseases, and livestock conditions."
                        />

                        <FeatureCard
                            icon={<Sparkles size={22} />}
                            title="Methodology"
                            desc="Treatments are individualized based on the animal’s symptoms and environment."
                        />

                        <FeatureCard
                            icon={<ShieldCheck size={22} />}
                            title="Integrative Approach"
                            desc="Often combined with conventional veterinary medicine for better care."
                        />

                    </div>

                </div>
            </div>

        </section>

    );
}



/* FEATURE CARD */

function FeatureCard({ icon, title, desc }: any) {

    return (

        <div className="p-8 rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition space-y-4">

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



/* ANIMAL CARD */

function AnimalCard({ icon, title, desc }: any) {

    return (

        <div className="p-8 rounded-2xl border border-slate-200 bg-white shadow-sm text-center space-y-4">

            <div className="w-10 h-10 mx-auto rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center">
                {icon}
            </div>

            <h4 className="font-semibold text-slate-900">
                {title}
            </h4>

            <p className="text-sm text-slate-600">
                {desc}
            </p>

        </div>

    );
}



/* BENEFIT CARD */

function BenefitCard({ text }: any) {

    return (

        <div className="p-6 rounded-xl border border-slate-200 bg-white shadow-sm text-center text-slate-600 text-sm">
            {text}
        </div>

    );
}