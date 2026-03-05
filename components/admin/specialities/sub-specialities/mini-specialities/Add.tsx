"use client";

import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api";

type FormValues = {
    name: string;
    description?: string;
};

export default function AddMiniPage() {
    const { subId } = useParams<{ subId: string }>();
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>();

    const mutation = useMutation({
        mutationFn: async (values: FormValues) => {
            return api.post(`/admin/mini-specialities`, {
                ...values,
                subSpecialityId: subId, // 🔥 THIS WAS MISSING
            });
        },
        onSuccess: () => {
            router.push(`/admin/sub-specialities/${subId}`);
        },
    });

    const onSubmit = (values: FormValues) => {
        mutation.mutate(values);
    };

    return (
        <div className="min-h-screen bg-wellness-bg py-20">
            <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl border border-gray-100 p-12 space-y-10">

                <h1 className="text-3xl font-semibold text-navy-dark">
                    Add Mini Speciality
                </h1>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

                    <Input
                        label="Name"
                        error={errors.name?.message}
                        {...register("name", { required: "Name is required" })}
                    />

                    <Textarea
                        label="Description"
                        {...register("description")}
                    />

                    {mutation.isError && (
                        <p className="text-sm text-red-500">
                            Failed to create mini-speciality.
                        </p>
                    )}

                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="px-6 py-3 rounded-xl border border-gray-200 text-sm hover:bg-gray-50"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={mutation.isPending}
                            className="px-6 py-3 bg-wellness-accent text-white rounded-xl text-sm font-medium shadow disabled:opacity-60"
                        >
                            {mutation.isPending ? "Creating..." : "Create Mini"}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}

/* ---------------- COMPONENTS ---------------- */

function Input({ label, error, ...props }: any) {
    return (
        <div className="space-y-2">
            <label className="text-sm font-medium text-navy/70">{label}</label>
            <input
                {...props}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-wellness-accent/40"
            />
            {error && <p className="text-xs text-red-500">{error}</p>}
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