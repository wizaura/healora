"use client";

import { Leaf, Sprout, ShieldCheck, Droplets, FlaskConical, Globe } from "lucide-react";

export default function AgroHomeopathy() {

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
                        Agro-Homoeopathy
                        <br />
                        Sustainable Healing for Plants
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
                        Agro-homoeopathy is an emerging scientific approach that applies
                        the principles of classical homeopathy to agriculture. It uses
                        highly diluted natural remedies to strengthen plants, improve
                        soil health, and protect crops without harming the environment.
                    </p>

                </div>



                {/* INTRO SECTION */}

                <div className="grid md:grid-cols-2 gap-12 mb-24 items-start">

                    <div className="space-y-4 text-slate-600 leading-relaxed">

                        <h2 className="text-2xl font-semibold text-slate-900">
                            What is Agro-Homoeopathy?
                        </h2>

                        <p>
                            Agro-homoeopathy is a modern extension of the classical
                            homeopathic principle <strong>“Like Cures Like.”</strong>
                            It uses highly diluted and potentised substances to
                            enhance plant immunity, control diseases, and improve
                            plant vitality.
                        </p>

                        <p>
                            Unlike chemical fertilizers or pesticides, agro-homoeopathic
                            remedies are <strong>non-toxic, eco-friendly, and sustainable</strong>.
                            They work by stimulating the plant’s natural resistance and
                            improving overall ecological balance.
                        </p>

                        <p>
                            This method is increasingly explored in sustainable farming
                            because it helps improve crop health without damaging soil,
                            water systems, or beneficial organisms.
                        </p>

                    </div>


                    {/* KEY POINTS */}

                    <div className="grid gap-4">

                        <InfoCard
                            icon={<Sprout size={20} />}
                            title="Plant Health"
                            desc="Strengthens plants from within, improving resistance to pests and diseases."
                        />

                        <InfoCard
                            icon={<Leaf size={20} />}
                            title="Natural Farming"
                            desc="Supports chemical-free agriculture and sustainable crop production."
                        />

                        <InfoCard
                            icon={<Globe size={20} />}
                            title="Environmental Safety"
                            desc="Remedies are biodegradable and do not harm soil organisms or ecosystems."
                        />

                    </div>

                </div>



                {/* HOW IT WORKS */}

                <div className="mb-24">

                    <div className="text-center mb-14">

                        <h2 className="text-3xl font-semibold text-slate-900">
                            How Agro-Homoeopathy Works
                        </h2>

                        <p className="text-slate-600 max-w-2xl mx-auto mt-4">
                            Instead of directly attacking pests, agro-homoeopathy
                            strengthens the internal vitality of plants so they can
                            naturally resist disease and environmental stress.
                        </p>

                    </div>


                    <div className="grid md:grid-cols-3 gap-8">

                        <FeatureCard
                            icon={<ShieldCheck size={22} />}
                            title="Strengthening Plant Immunity"
                            desc="Remedies enhance the plant’s internal health, making it naturally resistant to pests and diseases."
                        />

                        <FeatureCard
                            icon={<Droplets size={22} />}
                            title="Ecosystem Approach"
                            desc="Considers soil quality, climate conditions, and surrounding flora when selecting remedies."
                        />

                        <FeatureCard
                            icon={<FlaskConical size={22} />}
                            title="Potentized Remedies"
                            desc="Highly diluted preparations (such as 6X or 12CH) stimulate systemic healing responses in plants."
                        />

                    </div>

                </div>



                {/* APPLICATION METHODS */}

                <div className="mb-24">

                    <div className="text-center mb-14">

                        <h2 className="text-3xl font-semibold text-slate-900">
                            How Remedies Are Applied
                        </h2>

                        <p className="text-slate-600 max-w-2xl mx-auto mt-4">
                            Agro-homoeopathic medicines are easy to apply and require
                            only small quantities to be effective in agricultural use.
                        </p>

                    </div>


                    <div className="grid md:grid-cols-2 gap-10">

                        <div className="p-10 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-4">

                            <h3 className="text-xl font-semibold text-slate-900">
                                Application Methods
                            </h3>

                            <ul className="list-disc pl-6 space-y-2 text-slate-600">

                                <li>Foliar sprays applied directly to plant leaves.</li>

                                <li>Root irrigation through watering systems.</li>

                                <li>Seed treatment before sowing.</li>

                                <li>Application during early plant growth stages.</li>

                            </ul>

                        </div>


                        <div className="p-10 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-4">

                            <h3 className="text-xl font-semibold text-slate-900">
                                Preparation Method
                            </h3>

                            <p className="text-slate-600">
                                A common preparation involves mixing about
                                <strong> 20 drops of the remedy into 1 litre of water</strong>,
                                shaking the mixture (succussion) around 50 times,
                                and then diluting it further in larger sprayers.
                            </p>

                            <p className="text-slate-600">
                                Non-chlorinated water such as rainwater or well
                                water is preferred because chlorine may neutralize
                                the energetic properties of the remedy.
                            </p>

                        </div>

                    </div>

                </div>



                {/* BENEFITS */}

                <div>

                    <div className="text-center mb-14">

                        <h2 className="text-3xl font-semibold text-slate-900">
                            Benefits of Agro-Homoeopathy
                        </h2>

                        <p className="text-slate-600 max-w-2xl mx-auto mt-4">
                            Agro-homoeopathy promotes healthier crops while
                            maintaining ecological balance and sustainable farming.
                        </p>

                    </div>


                    <div className="grid md:grid-cols-3 gap-8">

                        <FeatureCard
                            icon={<Leaf size={22} />}
                            title="Chemical-Free Agriculture"
                            desc="Reduces reliance on pesticides and fertilizers."
                        />

                        <FeatureCard
                            icon={<ShieldCheck size={22} />}
                            title="Safe Food Production"
                            desc="Leaves no toxic residues on crops or in soil."
                        />

                        <FeatureCard
                            icon={<Globe size={22} />}
                            title="Sustainable Farming"
                            desc="Supports biodiversity and soil ecosystem health."
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

        <div className="
        p-8
        rounded-2xl
        border border-slate-200
        bg-white
        shadow-sm
        hover:shadow-md
        transition
        space-y-4
        ">

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



/* INFO CARD */

function InfoCard({ icon, title, desc }: any) {

    return (

        <div className="
        p-6
        rounded-xl
        border border-slate-200
        bg-white
        shadow-sm
        flex gap-4
        items-start
        ">

            <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center">
                {icon}
            </div>

            <div>
                <h4 className="font-semibold text-slate-900">
                    {title}
                </h4>

                <p className="text-sm text-slate-600 leading-relaxed">
                    {desc}
                </p>
            </div>

        </div>

    );
}