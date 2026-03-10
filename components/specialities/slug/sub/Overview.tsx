type QA = {
    question?: string;
    answer?: string;
};

type Props = {
    name: string;
    description?: string;
    overview?: {
        headerMain?: QA;
        headerSecondary?: QA[];
        images?: {
            image1?: { url: string };
            image2?: { url: string };
        };
    };
};

export default function SubSpecialityOverview({
    name,
    description,
    overview = {}
}: Props) {

    const { headerMain, headerSecondary = [], images } = overview;

    const image = images?.image1?.url || images?.image2?.url;

    return (
        <section className="py-24 bg-white">

            <div className="max-w-6xl mx-auto px-6">

                {/* HERO */}

                <div className="grid md:grid-cols-2 gap-16 items-center">

                    {/* TEXT SIDE */}

                    <div>

                        <span className="text-xs tracking-widest text-gray-400 uppercase font-medium">
                            Medical Condition
                        </span>

                        <h1 className="mt-4 text-4xl md:text-5xl font-semibold text-navy-dark leading-tight">
                            {name}
                        </h1>

                        {description && (
                            <p className="mt-6 text-lg text-gray-600 leading-relaxed max-w-lg">
                                {description}
                            </p>
                        )}

                        {/* MAIN QUESTION */}

                        {headerMain?.question && (

                            <div className="mt-10">

                                <h2 className="text-xl font-semibold text-navy-dark mb-3">
                                    {headerMain.question}
                                </h2>

                                <p className="text-gray-600 leading-relaxed">
                                    {headerMain.answer}
                                </p>

                            </div>

                        )}

                    </div>

                    {/* IMAGE SIDE */}

                    {image && (

                        <div className="relative">

                            <div className="absolute inset-0 bg-gradient-to-tr from-white via-transparent to-white opacity-60 rounded-2xl" />

                            <img
                                src={image}
                                className="rounded-2xl shadow-lg object-cover w-full h-[380px]"
                                alt={name}
                            />

                        </div>

                    )}

                </div>

                {/* SECONDARY QUESTIONS */}

                {headerSecondary.length > 0 && (

                    <div className="mt-20 grid md:grid-cols-2 gap-8">

                        {headerSecondary.map((item, i) => (

                            <div
                                key={i}
                                className="border border-gray-100 rounded-xl p-8 bg-gray-50 hover:bg-white transition shadow-sm"
                            >

                                <h3 className="text-lg font-semibold text-navy-dark mb-3">
                                    {item.question}
                                </h3>

                                <p className="text-gray-600 leading-relaxed">
                                    {item.answer}
                                </p>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </section>
    );
}