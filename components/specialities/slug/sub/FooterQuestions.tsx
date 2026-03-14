import { HelpCircle } from "lucide-react";

export function FooterQuestions({ questions }: any) {

    if (!questions?.length) return null;

    return (

        <section className="py-20 bg-gradient-to-b from-wellness-bg to-white rounded-2xl">

            <div className="max-w-6xl mx-auto px-6">

                {/* Section Header */}

                <div className="text-center mb-16">

                    <h2 className="text-3xl md:text-4xl font-semibold text-navy-dark">
                        Frequently Asked Questions
                    </h2>

                    <p className="mt-4 text-navy/70 max-w-xl mx-auto">
                        Learn more about this speciality and how our experts
                        help you achieve better health outcomes.
                    </p>

                </div>

                {/* Questions Grid */}

                <div className="grid md:grid-cols-2 gap-3 sm:gap-8">

                    {questions.map((item: any, i: number) => (

                        <div
                            key={i}
                            className="
                                group
                                bg-white
                                border border-gray-100
                                rounded-2xl
                                p-8
                                shadow-sm
                                hover:shadow-lg
                                transition
                            "
                        >

                            {/* Question */}

                            <div className="flex items-start gap-3 mb-4">

                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-wellness-accent/10 text-wellness-accent">

                                    <HelpCircle size={18} />

                                </div>

                                <h3 className="text-lg font-semibold text-navy-dark leading-snug">
                                    {item.question}
                                </h3>

                            </div>

                            {/* Answer */}

                            <p className="text-navy/80 leading-relaxed text-sm md:text-base">
                                {item.answer}
                            </p>

                        </div>

                    ))}

                </div>

            </div>

        </section>

    );
}