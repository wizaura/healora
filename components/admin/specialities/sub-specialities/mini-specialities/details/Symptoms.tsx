"use client";

import { useParams } from "next/navigation";
import { useQuery, useMutation } from "@tanstack/react-query";
import api from "@/lib/api";

export default function ManageMiniSymptomsPage() {
    const { miniId } = useParams<{ miniId: string }>();

    const { data } = useQuery({
        queryKey: ["mini-symptoms", miniId],
        queryFn: async () => {
            const res = await api.get(`/admin/mini-specialities/${miniId}`);
            return res.data;
        },
    });

    const addMutation = useMutation({
        mutationFn: async (symptomId: string) => {
            await api.post(
                `/admin/mini-specialities/${miniId}/symptoms`,
                { symptomId }
            );
        },
    });

    if (!data) return null;

    return (
        <div className="p-12">

            <h1 className="text-2xl font-semibold mb-8">
                Manage Symptoms
            </h1>

            <div className="space-y-4">
                {data.miniSpecialitySymptoms?.map((s: any) => (
                    <div key={s.id} className="border p-4 rounded-xl">
                        {s.symptom.name}
                    </div>
                ))}
            </div>

        </div>
    );
}