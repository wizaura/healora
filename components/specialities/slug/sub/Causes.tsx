import Image from "next/image";
import { Activity } from "lucide-react";

type Item = {
    id: string;
    name: string;
    description?: string;
    imageUrl?: string | null;
};

export default function SubSpecialityCauses({ causes }: { causes: Item[] }) {

    if (!causes || causes.length === 0) return null;

    return (
        <section className="py-20 bg-white">

            <div className="max-w-6xl mx-auto px-6">

                {/* HEADER */}

                <div className="text-center mb-14">

                    <span className="text-xs uppercase tracking-wider text-wellness-accent font-semibold">
                        Causes Information
                    </span>

                    <h2 className="text-3xl font-semibold text-navy-dark mt-2">
                        Common Causes
                    </h2>

                    <p className="text-navy/60 text-sm mt-3 max-w-xl mx-auto">
                        Understanding the underlying causes helps doctors diagnose conditions
                        accurately and choose the most effective treatment.
                    </p>

                </div>

                {/* GRID */}

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

                    {causes.map((cause) => (

                        <div
                            key={cause.id}
                            className="
                                group
                                bg-white
                                border border-gray-100
                                rounded-2xl
                                p-6
                                text-center
                                shadow-sm
                                hover:shadow-md
                                hover:-translate-y-1
                                transition
                            "
                        >

                            {/* IMAGE */}

                            <div className="flex justify-center mb-5">

                                <div
                                    className="
                                        w-28 h-28
                                        rounded-full
                                        bg-wellness-bg
                                        flex items-center justify-center
                                        group-hover:bg-wellness-accent/10
                                        transition
                                    "
                                >

                                    {cause.imageUrl ? (

                                        <div className="relative w-20 h-20">

                                            <Image
                                                src={cause.imageUrl}
                                                alt={cause.name}
                                                fill
                                                className="object-contain"
                                            />

                                        </div>

                                    ) : (

                                        <Activity
                                            size={36}
                                            className="text-navy/70"
                                        />

                                    )}

                                </div>

                            </div>

                            {/* TITLE */}

                            <h3 className="font-semibold text-navy-dark text-sm">
                                {cause.name}
                            </h3>

                            {/* DESCRIPTION */}

                            {cause.description && (
                                <p className="mt-2 text-xs text-navy/60 leading-relaxed">
                                    {cause.description}
                                </p>
                            )}

                        </div>

                    ))}

                </div>

            </div>

        </section>
    );
}