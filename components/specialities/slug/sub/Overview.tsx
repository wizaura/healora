import Image from "next/image";

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
    overview = {},
}: Props) {

    const { headerMain, headerSecondary = [], images } = overview;

    const image =
        images?.image1?.url ||
        "/placeholder-medical.jpg";

    const image2 =
        images?.image2?.url ||
        "/placeholder-medical.jpg";

    const firstSecondary = headerSecondary[0];
    const remainingQuestions = headerSecondary.slice(1);

    return (
        <section className="bg-white pt-20">

            {/* HERO HEADER */}

            <div
                className="relative h-[240px] md:h-[320px] flex items-center justify-center text-center rounded-xl mx-4 sm:mx-0"
                style={{
                    backgroundImage: `url(${image2})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >

                <div className="absolute inset-0 bg-black/50 rounded-xl" />

                <div className="relative z-10 max-w-3xl px-6">

                    <h1 className="text-4xl md:text-6xl font-semibold text-white tracking-[-0.02em]">
                        {name}
                    </h1>

                    {description && (
                        <p className="mt-6 text-smtext-lg text-white/90 leading-relaxed">
                            {description}
                        </p>
                    )}

                </div>

            </div>

            {/* MAIN CONTENT */}

            <div className="max-w-7xl mx-auto px-6 py-20 space-y-6 sm:space-y-16">

                {/* TOP ROW */}

                <div className="grid md:grid-cols-3 gap-12 items-center">

                    {/* MAIN QUESTION */}

                    {headerMain?.question && (

                        <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-md transition">

                            <h2 className="text-xl font-semibold text-navy-dark mb-4">
                                {headerMain.question}
                            </h2>

                            <p className="text-gray-600 leading-relaxed">
                                {headerMain.answer}
                            </p>

                        </div>

                    )}

                    {/* CENTER IMAGE */}

                    <div className="relative rounded-2xl overflow-hidden shadow-lg">

                        {/* Image */}

                        <Image
                            src={image}
                            alt={name}
                            width={500}
                            height={360}
                            className="object-cover w-full h-[360px]"
                        />

                        {/* Blend Overlay */}

                        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-white/60 pointer-events-none" />

                    </div>
                    {/* FIRST HEADER QUESTION */}

                    {firstSecondary?.question && (

                        <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-md transition">

                            <h3 className="text-xl font-semibold text-navy-dark mb-4">
                                {firstSecondary.question}
                            </h3>

                            <p className="text-gray-600 leading-relaxed">
                                {firstSecondary.answer}
                            </p>

                        </div>

                    )}

                </div>


                {/* EXTRA HEADER QUESTIONS */}

                {remainingQuestions.length > 0 && (

                    <div className="grid md:grid-cols-1 gap-8">

                        {remainingQuestions.map((item, index) => (

                            <div
                                key={index}
                                className="
                  bg-gray-50
                  border border-gray-100
                  rounded-2xl
                  p-8 text-center
                  shadow-sm
                  hover:shadow-md
                  transition
                "
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