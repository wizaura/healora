import Image from "next/image";
import { Activity } from "lucide-react";

type Item = {
    id: string;
    name: string;
    description: string;
    imageUrl?: string | null;
};

export default function SubSpecialityRiskFactors({ riskFactors }: { riskFactors: Item[] }) {
    return (
        <section className="py-20 bg-white">

            <div className="max-w-6xl mx-auto px-6">

                {/* HEADER */}

                <div className="text-center mb-14">

                    <span className="text-xs uppercase tracking-wider text-wellness-accent font-semibold">
                        Risk Factors Information
                    </span>

                    <h2 className="text-3xl font-semibold text-navy-dark mt-2">
                        Common Risk Factors
                    </h2>

                    <p className="text-navy/60 text-sm mt-3 max-w-xl mx-auto">
                        Certain lifestyle habits, health conditions, or environmental factors
                        may increase the likelihood of developing this condition.
                    </p>

                </div>


                {/* GRID */}

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

                    {riskFactors.map((riskFactor) => (

                        <div
                            key={riskFactor.id}
                            className="
                                group
                                bg-white
                                border border-gray-100
                                rounded-2xl
                                p-6
                                text-center
                                shadow-sm
                                hover:shadow-md
                                hover:-translate-y-1
                                transition
                            "
                        >

                            {/* IMAGE */}

                            <div className="flex justify-center mb-5">

                                <div
                                    className="
                                        w-32 h-32
                                        rounded-full
                                        bg-wellness-bg
                                        flex items-center justify-center
                                        group-hover:bg-wellness-accent/10
                                        transition
                                    "
                                >

                                    {riskFactor.imageUrl ? (

                                        <div className="relative w-24 h-24">

                                            <Image
                                                src={riskFactor.imageUrl}
                                                alt={riskFactor.name}
                                                fill
                                                className="object-contain"
                                            />

                                        </div>

                                    ) : (

                                        <Activity
                                            size={40}
                                            className="text-navy/70"
                                        />

                                    )}

                                </div>

                            </div>


                            {/* TITLE */}

                            <h3 className="font-semibold text-navy-dark text-sm">
                                {riskFactor.name}
                            </h3>


                            {/* DESCRIPTION */}

                            <p className="mt-2 text-xs text-navy/60 leading-relaxed">
                                {riskFactor.description}
                            </p>

                        </div>

                    ))}

                </div>

            </div>

        </section>
    );
}