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
                const res = await api.get(
                    `/doctor/${miniSlug}/doctors`
                );
                return res.data;
            }

            const res = await api.get(
                `/doctor/${subSlug}/doctors`
            );
            return res.data;
        },
        enabled: !!subSlug,
        retry: false,
    });

    return (
        <section className="py-24 bg-wellness-bg">
            <div className="max-w-6xl mx-auto px-6">
                <h2 className="text-3xl font-semibold text-navy-dark mb-12 text-center">
                    Available Doctors
                </h2>

                <div className="grid md:grid-cols-2 gap-10">
                    {doctors.map((doc: any) => (
                        <DoctorCard 
                        key={doc.id} 
                        doctor={doc} 
                        onBook={(id) => router.push(`/booking/${id}`)}
                        />
                    ))}
                </div>

                {doctors.length === 0 && (
                    <p className="text-center text-navy/60">
                        No doctors available currently.
                    </p>
                )}
            </div>
        </section>
    );
}