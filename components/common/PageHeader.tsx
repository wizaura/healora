"use client";

type Props = {
    title: string;
    subtitle?: string;
};

export default function PageHeader({ title, subtitle }: Props) {
    return (
        <section className="max-w-7xl mx-auto px-6 pt-24">

            <div className="mb-20 text-center">

                <h1
                    className="
                    text-4xl md:text-6xl
                    font-semibold
                    leading-[1.15]
                    tracking-[-0.02em]
                    text-navy
                    "
                >
                    {title}
                </h1>

                {subtitle && (
                    <p
                        className="
                        mt-6
                        text-lg
                        text-slate-600
                        max-w-2xl
                        mx-auto
                        leading-relaxed
                        "
                    >
                        {subtitle}
                    </p>
                )}

            </div>

        </section>
    );
}