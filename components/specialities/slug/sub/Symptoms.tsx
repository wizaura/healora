import Image from "next/image";
import { Activity } from "lucide-react";

type Item = {
    id: string;
    name: string;
    description: string;
    imageUrl?: string | null;
};

export default function SubSpecialitySymptoms({ symptoms }: { symptoms: Item[] }) {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-6xl mx-auto px-6">
                <h2 className="text-3xl font-semibold text-navy-dark mb-12 text-center">
                    Common Symptoms
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
                    {symptoms.map((symptom) => (
                        <div
                            key={symptom.id}
                            className="p-8 rounded-2xl bg-wellness-bg shadow-md hover:shadow-lg transition"
                        >
                            {/* Image */}
                            <div className="mb-5 flex justify-center">
                                {symptom.imageUrl ? (
                                    <div className="relative w-24 h-24">
                                        <Image
                                            src={symptom.imageUrl}
                                            alt={symptom.name}
                                            fill
                                            className="object-contain rounded-xl"
                                        />
                                    </div>
                                ) : (
                                    <Activity size={32} className="text-navy" />
                                )}
                            </div>

                            <h3 className="text-xl font-semibold text-navy-dark text-center">
                                {symptom.name}
                            </h3>

                            <p className="mt-3 text-navy/70 text-sm leading-relaxed text-center">
                                {symptom.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}