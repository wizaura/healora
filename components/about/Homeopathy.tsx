"use client";

import { Leaf, ShieldCheck, UserCheck, HeartPulse, Activity, Sparkles } from "lucide-react";

export default function HomeopathySection() {
    return (

        <section className="max-w-7xl mx-auto px-6 py-12 space-y-20">

            {/* HEADER */}

            <div className="text-center space-y-4">

                <h2 className="text-3xl md:text-4xl font-semibold text-[#0B2E28]">
                    Why Homeopathy
                </h2>

                <p className="text-[#5F7C76] max-w-3xl mx-auto">
                    Homeopathy is a refined system of natural medicine that focuses
                    on restoring balance within the body and stimulating its
                    inherent healing abilities.
                </p>

            </div>


            {/* HISTORY SECTION */}

            <div className="grid md:grid-cols-2 gap-12 items-start text-md">

                <div className="space-y-2 text-[#375A54] leading-relaxed">

                    <h3 className="text-2xl font-semibold text-[#0B2E28]">
                        History of Homeopathy
                    </h3>

                    <p>
                        Homeopathy is a sophisticated system of natural medicine
                        that has been refined for over two centuries, offering
                        a holistic alternative to conventional medical
                        approaches.
                    </p>

                    <p>
                        The roots of Homeopathy trace back to the
                        16th-century pioneer <strong>Paracelsus</strong>,
                        who observed that substances capable of causing
                        symptoms could also be used to cure them.
                    </p>

                    <p>
                        This principle was later formalized by the German
                        physician <strong>Dr. Samuel Hahnemann </strong>
                        in 1807 as the <em>Law of Similars</em> —
                        the philosophy that “like cures like”.
                    </p>

                    <p>
                        Hahnemann introduced a compassionate medical
                        approach based on three fundamental principles:
                    </p>

                    <ul className="list-disc pl-6 space-y-2">

                        <li>
                            <strong>Minimum Dose:</strong> Highly diluted
                            remedies stimulate healing without toxic effects.
                        </li>

                        <li>
                            <strong>Single Remedy:</strong> Focused medicines
                            are used rather than complex mixtures.
                        </li>

                        <li>
                            <strong>The Whole Person:</strong> Illness is seen
                            as a combination of physical, emotional, and
                            mental factors.
                        </li>

                    </ul>

                    <p>
                        Today, homeopathy continues to provide personalized
                        care by addressing the underlying imbalance rather
                        than simply suppressing symptoms.
                    </p>

                </div>


                {/* HAHNEMANN IMAGE */}

                <div className="flex flex-col items-center text-center">

                    <div className="rounded-3xl overflow-hidden border border-[#CDE7E2] shadow-sm">

                        <img
                            src="/hahnemann.jpg"
                            alt="Dr Samuel Hahnemann"
                            className="w-full h-[360px] object-cover"
                        />

                    </div>

                    <p className="mt-4 font-medium text-[#0B2E28]">
                        Dr. Samuel Hahnemann
                    </p>

                </div>

            </div>


            {/* BENEFITS SECTION */}

            <div className="space-y-12">

                <div className="text-center space-y-3">

                    <h3 className="text-2xl font-semibold text-[#0B2E28]">
                        Benefits of Homeopathic Treatment
                    </h3>

                    <p className="text-[#5F7C76] max-w-3xl mx-auto">
                        Homeopathy focuses on the entire individual
                        rather than isolated symptoms, encouraging
                        long-term wellness through natural healing.
                    </p>

                </div>


                {/* BENEFIT CARDS */}

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                    <BenefitCard
                        icon={<UserCheck size={20} />}
                        title="Individualized Treatment"
                        desc="Every patient receives a personalized plan considering physical, mental, and emotional factors."
                    />

                    <BenefitCard
                        icon={<Leaf size={20} />}
                        title="Gentle Formulations"
                        desc="Derived mainly from natural substances and prepared in highly diluted forms."
                    />

                    <BenefitCard
                        icon={<HeartPulse size={20} />}
                        title="Holistic Wellness"
                        desc="Targets the constitutional balance of the body rather than temporary symptom suppression."
                    />

                    <BenefitCard
                        icon={<ShieldCheck size={20} />}
                        title="Safe Treatment"
                        desc="Generally considered safe when used appropriately, even for infants and elderly patients."
                    />

                    <BenefitCard
                        icon={<Activity size={20} />}
                        title="Long-lasting Relief"
                        desc="Encourages the body’s natural healing response for sustainable wellness."
                    />

                    <BenefitCard
                        icon={<Sparkles size={20} />}
                        title="Complementary Care"
                        desc="Can work alongside conventional medicine to enhance overall wellbeing."
                    />

                </div>

            </div>

        </section>
    );
}


/* BENEFIT CARD */

function BenefitCard({ icon, title, desc }: any) {
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