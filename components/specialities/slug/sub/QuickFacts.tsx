export function QuickFacts({ facts }: any) {

    if (!facts.length) return null;

    return (

        <section className="py-20 bg-wellness-bg">

            <div className="max-w-5xl mx-auto px-6">

                <h2 className="text-2xl font-semibold text-navy-dark mb-10 text-center">
                    Quick Facts
                </h2>

                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">

                    {facts.map((fact: any, i: number) => (

                        <div
                            key={i}
                            className="bg-white border rounded-xl p-6 shadow-sm"
                        >

                            {typeof fact === "string"
                                ? fact
                                : fact.value}

                        </div>

                    ))}

                </div>

            </div>

        </section>

    );
}