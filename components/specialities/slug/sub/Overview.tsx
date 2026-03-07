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
        <section className="py-24 bg-gradient-to-b from-white to-wellness-bg m-4 rounded-2xl">

            <div className="max-w-5xl mx-auto px-6">

                {/* HERO */}

                <div className="text-center my-14 max-w-3xl mx-auto">

                    <span className="inline-block text-xs font-medium tracking-wide text-wellness-accent uppercase mb-3">
                        Medical Speciality
                    </span>

                    <h1 className="text-4xl md:text-5xl font-semibold text-navy-dark">
                        {name}
                    </h1>

                    {overview.summary && (
                        <p className="mt-6 text-lg text-navy leading-relaxed">
                            {overview.summary}
                        </p>
                    )}

                </div>


                {/* QUICK FACTS */}

                {quickFacts.length > 0 && (

                    <div className="mb-20">

                        <h2 className="text-xl font-semibold text-navy-dark mb-8 text-center">
                            Quick Facts
                        </h2>

                        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">

                            {quickFacts.map((fact, i) => (

                                <div
                                    key={i}
                                    className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm"
                                >

                                    <p className="text-sm text-navy/95 leading-relaxed">
                                        {fact}
                                    </p>

                                </div>

                            ))}

                        </div>

                    </div>

                )}


                {/* WHAT IS */}

                {overview.whatIsIt && (
                    <SectionBlock
                        title={`What is ${name}?`}
                        content={overview.whatIsIt}
                    />
                )}


                {/* WHO IS AFFECTED */}

                {overview.whoIsAffected && (
                    <SectionBlock
                        title="Who is affected?"
                        content={overview.whoIsAffected}
                    />
                )}


                {/* WHEN TO SEE DOCTOR */}

                {overview.whenToSeeDoctor && (
                    <SectionHighlight
                        title="When should you see a doctor?"
                        content={overview.whenToSeeDoctor}
                    />
                )}

            </div>

        </section>
    );
}


function SectionBlock({
    title,
    content,
}: {
    title: string;
    content: string;
}) {

    return (

        <div className="mb-16">

            <h2 className="text-2xl font-semibold text-navy-dark mb-4">
                {title}
            </h2>

            <p className="text-navy/90 leading-relaxed text-base max-w-3xl">
                {content}
            </p>

        </div>

    );
}


function SectionHighlight({
    title,
    content,
}: {
    title: string;
    content: string;
}) {

    return (

        <div className="bg-white border border-gray-100 rounded-2xl p-10 shadow-sm">

            <h2 className="text-2xl font-semibold text-navy-dark mb-4">
                {title}
            </h2>

            <p className="text-navy/90 leading-relaxed max-w-3xl">
                {content}
            </p>

        </div>

    );
}