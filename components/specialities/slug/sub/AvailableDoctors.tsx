"use client";

import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import DoctorCard from "@/components/common/DoctorCard";
import { useRouter } from "next/navigation";

type Props = {
    subSlug: string;
    miniSlug?: string;
};

export default function SubSpecialityDoctors({ subSlug, miniSlug }: Props) {

    const router = useRouter();

    const { data: doctors = [] } = useQuery({
        queryKey: ["doctors", subSlug, miniSlug],
        queryFn: async () => {

            if (miniSlug) {
                const res = await api.get(`/doctor/${miniSlug}/doctors`);
                return res.data;
            }

            const res = await api.get(`/doctor/${subSlug}/doctors`);
            return res.data;

        },
        enabled: !!subSlug,
        retry: false,
    });

    return (
        <section className="py-20 bg-wellness-bg m-4 rounded-2xl">

            <div className="max-w-7xl mx-auto px-6">

                {/* HEADER */}

                <div className="text-center mb-16">

                    <span className="text-xs uppercase tracking-wider text-wellness-accent font-semibold">
                        Medical Specialists
                    </span>

                    <h2 className="text-3xl font-semibold text-navy-dark mt-2">
                        Available Doctors
                    </h2>

                    <p className="text-navy/60 text-sm mt-3 max-w-xl mx-auto">
                        Connect with experienced doctors who specialize in treating
                        this condition and receive professional medical guidance.
                    </p>

                </div>


                {/* DOCTOR GRID */}

                {doctors.length > 0 ? (

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

                        {doctors.map((doc: any) => (

                            <DoctorCard
                                key={doc.id}
                                doctor={doc}
                                onBook={(id) => router.push(`/booking/${id}`)}
                            />

                        ))}

                    </div>

                ) : (

                    /* EMPTY STATE */

                    <div className="bg-white border border-gray-100 rounded-2xl p-12 text-center shadow-sm">

                        <p className="text-navy/60 text-sm">
                            No doctors are currently available for this speciality.
                        </p>

                    </div>

                )}

            </div>

        </section>
    );
}