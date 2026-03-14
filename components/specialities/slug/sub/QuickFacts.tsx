import { CheckCircle2 } from "lucide-react";

export function QuickFacts({ facts }: any) {

    if (!facts?.length) return null;

    return (

        <section className="py-6 bg-gradient-to-b from-white my-4 to-wellness-bg rounded-2xl">

            <div className="max-w-6xl mx-auto px-6">

                {/* HEADER */}

                <div className="text-center mb-16">

                    <h2 className="text-3xl md:text-4xl font-semibold text-navy-dark">
                        Quick Facts
                    </h2>

                    <p className="text-navy/70 mt-4 max-w-2xl mx-auto">
                        Important highlights and key medical insights about this condition.
                    </p>

                </div>


                {/* FACT GRID */}

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">

                    {facts.map((fact: any, i: number) => (

                        <div
                            key={i}
                            className="
                            group
                            bg-white
                            border border-navy/10
                            rounded-2xl
                            p-6
                            shadow-sm
                            transition
                            hover:shadow-md
                            hover:-translate-y-1
                            flex
                            items-start
                            gap-4
                            "
                        >

                            {/* ICON */}

                            <div
                                className="
                                w-9 h-9
                                rounded-lg
                                bg-wellness-bg
                                text-navy
                                flex
                                items-center
                                justify-center
                                flex-shrink-0
                                "
                            >
                                <CheckCircle2 size={18} />
                            </div>

                            {/* TEXT */}

                            <p className="text-navy/90 leading-relaxed">

                                {typeof fact === "string"
                                    ? fact
                                    : fact.value}

                            </p>

                        </div>

                    ))}

                </div>

            </div>

        </section>

    );
}