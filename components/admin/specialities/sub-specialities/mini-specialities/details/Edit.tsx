"use client";

import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useQuery, useMutation } from "@tanstack/react-query";
import api from "@/lib/api";
import { useEffect } from "react";
import toast from "react-hot-toast";

type FormValues = {
    name: string;
    description?: string;
};

export default function EditMiniPage() {
    const { miniId } = useParams<{ miniId: string }>();
    const router = useRouter();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormValues>();

    /* ---------------- FETCH MINI ---------------- */

    const { data, isLoading } = useQuery({
        queryKey: ["admin-mini", miniId],
        queryFn: async () => {
            const res = await api.get(`/admin/mini-specialities/${miniId}`);
            return res.data;
        },
        enabled: !!miniId,
    });

    useEffect(() => {
        if (data) {
            reset({
                name: data.name,
                description: data.description || "",
            });
        }
    }, [data, reset]);

    /* ---------------- UPDATE ---------------- */

    const mutation = useMutation({
        mutationFn: async (values: FormValues) => {
            await api.patch(`/admin/mini-specialities/${miniId}`, values);
        },
        onSuccess: () => {
            toast.success("Mini-speciality updated");
            router.push(`/admin/mini-specialities/${miniId}`);
        },
        onError: () => {
            toast.error("Failed to update");
        },
    });

    const onSubmit = (values: FormValues) => {
        mutation.mutate(values);
    };

    if (isLoading) {
        return (
            <div className="h-screen flex items-center justify-center text-sm text-navy/60">
                Loading...
            </div>
        );
    }

    if (!data) return null;

    return (
        <div className="min-h-screen bg-wellness-bg py-20">
            <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl border border-gray-100 p-12 space-y-10">

                <h1 className="text-3xl font-semibold text-navy-dark">
                    Edit Mini Speciality
                </h1>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

                    <Input
                        label="Name"
                        error={errors.name?.message}
                        {...register("name", { required: "Name is required" })}
                    />

                    <Textarea
                        label="Description"
                        error={errors.description?.message}
                        {...register("description")}
                    />

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
                            disabled={mutation.isPending}
                            className="px-6 py-3 bg-wellness-accent text-white rounded-xl text-sm font-medium shadow disabled:opacity-60"
                        >
                            {mutation.isPending ? "Saving..." : "Save Changes"}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}

/* ---------------- REUSABLE COMPONENTS ---------------- */

import { forwardRef } from "react";

/* -------- INPUT -------- */

const Input = forwardRef<
    HTMLInputElement,
    {
        label: string;
        error?: string;
    } & React.InputHTMLAttributes<HTMLInputElement>
>(({ label, error, ...props }, ref) => {
    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-navy-dark">
                {label}
            </label>

            <input
                ref={ref}
                {...props}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-wellness-accent focus:outline-none"
            />

            {error && (
                <p className="text-xs text-red-500">{error}</p>
            )}
        </div>
    );
});

Input.displayName = "Input";

/* -------- TEXTAREA -------- */

const Textarea = forwardRef<
    HTMLTextAreaElement,
    {
        label: string;
        error?: string;
    } & React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ label, error, ...props }, ref) => {
    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-navy-dark">
                {label}
            </label>

            <textarea
                ref={ref}
                {...props}
                rows={4}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm resize-none focus:ring-2 focus:ring-wellness-accent focus:outline-none"
            />

            {error && (
                <p className="text-xs text-red-500">{error}</p>
            )}
        </div>
    );
});

Textarea.displayName = "Textarea";