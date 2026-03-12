import { Globe, Layers, Lightbulb } from "lucide-react";

export default function MissionVisionSection() {
    return (
        <section className="max-w-7xl mx-auto px-6 py-8 space-y-16">

            {/* SECTION HEADER */}

            <div className="text-center max-w-3xl mx-auto space-y-4">

                <h2 className="text-3xl md:text-4xl font-semibold text-slate-900">
                    Our Mission & Vision
                </h2>

                <p className="text-slate-600 leading-relaxed">
                    Healora Wellness Centre is driven by a commitment to
                    expand access to quality healthcare and create a future
                    where expert medical guidance is available to everyone,
                    everywhere.
                </p>

            </div>


            {/* MISSION + VISION */}

            <div className="grid md:grid-cols-2 gap-8">

                {/* MISSION */}

                <div className="p-8 rounded-xl border border-slate-200 bg-white shadow-sm space-y-4">

                    <h3 className="text-xl font-semibold text-slate-900">
                        Our Mission
                    </h3>

                    <p className="text-slate-600 leading-relaxed">
                        To democratize high-quality healthcare by bridging
                        the gap between expert medical professionals and
                        patients worldwide. We are committed to providing
                        scientifically informed, patient-centered care
                        through a seamless digital platform.
                    </p>

                    <p className="text-slate-600 leading-relaxed">
                        Our goal is to ensure that distance is never a
                        barrier to healing, recovery, and long-term wellness.
                    </p>

                </div>


                {/* VISION */}

                <div className="p-8 rounded-xl border border-slate-200 bg-white shadow-sm space-y-4">

                    <h3 className="text-xl font-semibold text-slate-900">
                        Our Vision
                    </h3>

                    <p className="text-slate-600 leading-relaxed">
                        To become a global leader in integrated digital
                        wellness, creating a world where geography no longer
                        limits access to expert medical guidance.
                    </p>

                    <p className="text-slate-600 leading-relaxed">
                        We envision a future where every individual,
                        regardless of their location, has the tools and
                        professional support to achieve a balanced,
                        healthy, and vibrant life.
                    </p>

                </div>

            </div>


            {/* CORE PILLARS */}

            <div className="space-y-8">

                <div className="text-center space-y-3">

                    <h3 className="text-2xl font-semibold text-slate-900">
                        Core Pillars of Our Vision
                    </h3>

                    <p className="text-slate-600 max-w-2xl mx-auto">
                        These principles guide every service we provide and
                        shape the future of healthcare at Healora.
                    </p>

                </div>

                <div className="grid md:grid-cols-3 gap-6">

                    <PillarCard
                        icon={<Globe size={22} />}
                        title="Accessibility"
                        desc="Making world-class consultations available at your fingertips, regardless of where you live."
                    />

                    <PillarCard
                        icon={<Layers size={22} />}
                        title="Integration"
                        desc="Blending diverse disciplines—from Homeopathy to Psychology—for a complete 360° approach to health."
                    />

                    <PillarCard
                        icon={<Lightbulb size={22} />}
                        title="Innovation"
                        desc="Utilizing modern diagnostics and updated clinical knowledge to enhance traditional healing."
                    />

                </div>

            </div>

        </section>
    );
}


/* PILLAR CARD */

function PillarCard({ icon, title, desc }: any) {
    return (
        <div className="p-6 rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition space-y-3 text-center">

            <div className="w-12 h-12 mx-auto flex items-center justify-center rounded-xl bg-teal-50 text-teal-600">
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