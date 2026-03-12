export function FooterQuestions({ questions }: any) {

    if (!questions?.length) return null;

    return (

        <section className="py-12 bg-white">

            <div className="max-w-5xl mx-auto px-6 space-y-16">

                {questions.map((item: any, i: number) => (

                    <div key={i} className="text-center space-y-6">

                        <h2 className="text-2xl md:text-3xl font-semibold text-navy-dark leading-snug">
                            {item.question}
                        </h2>

                        <p className="text-navy/80 leading-relaxed max-w-3xl mx-auto text-lg">
                            {item.answer}
                        </p>

                    </div>

                ))}

            </div>

        </section>

    );
}