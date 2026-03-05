"use client";

import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useQuery, useMutation } from "@tanstack/react-query";
import api from "@/lib/api";
import { useEffect } from "react";

type FormValues = {
    name: string;
    slug: string;
    description: string;
    isActive: boolean;
    hasMiniLevel: boolean;
};

export default function EditSubSpecialityPage() {
    const { subId } = useParams<{ subId: string }>();
    const router = useRouter();

    const { register, handleSubmit, reset } = useForm<FormValues>();

    const { data } = useQuery({
        queryKey: ["admin-sub-speciality", subId],
        queryFn: async () => {
            const res = await api.get(`/admin/sub-specialities/${subId}`);
            return res.data;
        },
    });

    useEffect(() => {
        if (data) {
            reset(data);
        }
    }, [data, reset]);

    const mutation = useMutation({
        mutationFn: async (values: FormValues) => {
            await api.patch(`/admin/sub-specialities/${subId}`, values);
        },
        onSuccess: () => {
            router.push(`/admin/sub-specialities/${subId}`);
        },
    });

    const onSubmit = (values: FormValues) => {
        mutation.mutate(values);
    };

    if (!data) return null;

    return (
        <div className="min-h-screen bg-wellness-bg py-20">
            <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl border border-gray-100 p-12 space-y-10">

                <h1 className="text-3xl font-semibold text-navy-dark">
                    Edit Sub-Speciality
                </h1>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

                    <Input label="Name" {...register("name")} />

                    <Input label="Slug" {...register("slug")} />

                    <Textarea label="Description" {...register("description")} />

                    <Checkbox label="Active" {...register("isActive")} />

                    <Checkbox label="Has Mini Level" {...register("hasMiniLevel")} />

                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="px-6 py-3 rounded-xl border border-gray-200 text-sm"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="px-6 py-3 bg-wellness-accent text-white rounded-xl text-sm font-medium shadow"
                        >
                            Save Changes
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}

/* ---- Reusable Components ---- */

function Input({ label, ...props }: any) {
    return (
        <div className="space-y-2">
            <label className="text-sm font-medium text-navy/70">{label}</label>
            <input
                {...props}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-wellness-accent/40"
            />
        </div>
    );
}

function Textarea({ label, ...props }: any) {
    return (
        <div className="space-y-2">
            <label className="text-sm font-medium text-navy/70">{label}</label>
            <textarea
                rows={4}
                {...props}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-wellness-accent/40"
            />
        </div>
    );
}

function Checkbox({ label, ...props }: any) {
    return (
        <div className="flex items-center gap-3">
            <input type="checkbox" {...props} className="h-4 w-4" />
            <label className="text-sm text-navy/70">{label}</label>
        </div>
    );
}