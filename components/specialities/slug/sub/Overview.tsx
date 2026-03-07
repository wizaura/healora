type Props = {
    name: string;
    overview?: {
        summary?: string;
        whatIsIt?: string;
        whoIsAffected?: string;
        whenToSeeDoctor?: string;
    };
    quickFacts?: string[];
};

export default function SubSpecialityOverview({
    name,
    overview = {},
    quickFacts = [],
}: Props) {

    return (
        <section className="py-24 bg-gradient-to-b from-white to-wellness-bg">

            <div className="max-w-6xl mx-auto px-6 space-y-20">

                {/* HERO HEADER */}

                <div className="text-center max-w-3xl mx-auto">

                    <h1 className="text-4xl md:text-5xl font-semibold text-navy-dark">
                        {name}
                    </h1>

                    {overview.summary && (
                        <p className="mt-6 text-lg text-navy/70 leading-relaxed">
                            {overview.summary}
                        </p>
                    )}

                </div>

                {/* QUICK FACTS */}

                {quickFacts.length > 0 && (

                    <div className="bg-white border rounded-2xl shadow-sm p-10">

                        <h2 className="text-xl font-semibold text-navy-dark mb-6">
                            Quick Facts
                        </h2>

                        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">

                            {quickFacts.map((fact, i) => (

                                <div
                                    key={i}
                                    className="flex items-start gap-3"
                                >

                                    <div className="w-2 h-2 mt-2 rounded-full bg-wellness-accent"></div>

                                    <p className="text-sm text-navy/80 leading-relaxed">
                                        {fact}
                                    </p>

                                </div>

                            ))}

                        </div>

                    </div>

                )}

                {/* INFORMATION GRID */}

                <div className="grid md:grid-cols-2 gap-8">

                    {overview.whatIsIt && (
                        <InfoCard
                            title={`What is ${name}?`}
                            content={overview.whatIsIt}
                        />
                    )}

                    {overview.whoIsAffected && (
                        <InfoCard
                            title="Who is affected?"
                            content={overview.whoIsAffected}
                        />
                    )}

                    {overview.whenToSeeDoctor && (
                        <InfoCard
                            title="When should you see a doctor?"
                            content={overview.whenToSeeDoctor}
                            full
                        />
                    )}

                </div>

            </div>

        </section>
    );
}

/* ---------------- INFO CARD ---------------- */

function InfoCard({
    title,
    content,
    full,
}: {
    title: string;
    content: string;
    full?: boolean;
}) {
    return (
        <div
            className={`bg-white border rounded-2xl p-8 shadow-sm ${
                full ? "md:col-span-2" : ""
            }`}
        >
            <h3 className="text-lg font-semibold text-navy-dark mb-3">
                {title}
            </h3>

            <p className="text-navy/70 leading-relaxed text-sm">
                {content}
            </p>
        </div>
    );
}