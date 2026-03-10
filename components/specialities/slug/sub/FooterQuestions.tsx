export function FooterQuestions({ questions }: any) {

    if (!questions.length) return null;

    return (

        <section className="py-20">

            <div className="max-w-5xl mx-auto px-6 space-y-12">

                {questions.map((item: any, i: number) => (

                    <div key={i}>

                        <h2 className="text-2xl font-semibold text-navy-dark mb-4">
                            {item.question}
                        </h2>

                        <p className="text-navy/90 leading-relaxed">
                            {item.answer}
                        </p>

                    </div>

                ))}

            </div>

        </section>

    );
}