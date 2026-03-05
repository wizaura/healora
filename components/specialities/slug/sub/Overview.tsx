type Props = {
    name: string;
    overview: string;
};

export default function SubSpecialityOverview({ name, overview }: Props) {
    return (
        <section className="py-24 bg-gradient-to-b from-white to-wellness-bg text-center">
            <div className="max-w-4xl mx-auto px-6">
                <h1 className="text-4xl md:text-5xl font-semibold text-navy-dark">
                    {name}
                </h1>
                <p className="mt-6 text-lg text-navy/70 leading-relaxed">
                    {overview}
                </p>
            </div>
        </section>
    );
}