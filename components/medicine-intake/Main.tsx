"use client";

import { Pill, Clock, ShieldCheck, PawPrint, Leaf } from "lucide-react";

export default function MedicineInstructions() {
  return (
    <section className="m-4 rounded-2xl px-6 py-24 bg-gradient-to-b from-white via-white to-wellness-bg">

      <div className="max-w-7xl mx-auto">

        {/* HERO */}
        <div className="mb-20 text-center">
          <h1 className="text-4xl md:text-6xl font-semibold leading-[1.15] tracking-[-0.02em] text-navy">
            Instructions for Using
            <br />
            Homeopathic Medicines
          </h1>

          <p className="mt-6 text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Follow these simple guidelines to ensure maximum effectiveness of your
            homeopathic medicines for humans, animals, and plants.
          </p>
        </div>

        {/* COMMON INSTRUCTIONS */}
        <Section
          title="Common Instructions"
          items={[
            "Do not touch medicines by hand. Use the cap to transfer pills directly to the tongue.",
            "Take medicines 10 minutes before or after eating, drinking, or brushing.",
            "Can be taken any time unless specified. Maintain a minimum 2-hour gap between doses.",
            "No food restrictions unless advised by your doctor.",
            "Same color caps = same medicine. Use one bottle at a time.",
            "Different colored bottles can be taken together.",
          ]}
          icon={<Pill size={22} />}
        />

        {/* ANIMALS */}
        <Section
          title="Only for Animal Patients"
          items={[
            "Dogs usually accept pills easily once they recognize the sweet taste.",
            "If needed, mix medicines with food.",
            "For cats or difficult cases, dissolve in water and give via syringe (without needle).",
          ]}
          icon={<PawPrint size={22} />}
        />

        {/* PLANTS */}
        <Section
          title="Only for Plants"
          items={[
            "Apply via foliar spray, root irrigation, or seed treatment.",
            "Mix 20 drops in 1 litre water, shake 50 times, then dilute further for spraying.",
            "Use non-chlorinated water (rain/well water) for best results.",
          ]}
          icon={<Leaf size={22} />}
        />

      </div>
    </section>
  );
}

/* REUSABLE SECTION */

function Section({ title, items, icon }: any) {
  return (
    <div className="mb-20">

      <div className="text-center mb-12">
        <h2 className="text-3xl font-semibold text-slate-900">
          {title}
        </h2>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {items.map((item: string, i: number) => (
          <div
            key={i}
            className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition space-y-4"
          >
            <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center">
              {icon}
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              {item}
            </p>
          </div>
        ))}

      </div>
    </div>
  );
}