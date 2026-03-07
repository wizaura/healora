"use client";

import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useQuery, useMutation } from "@tanstack/react-query";
import api from "@/lib/api";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { forwardRef } from "react";

type FormValues = {
    name: string;

    overview: {
        summary: string;
        whatIsIt: string;
        whoIsAffected: string;
        whenToSeeDoctor: string;
    };

    quickFacts: string;
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

    /* ---------------- FETCH ---------------- */

    const { data, isLoading } = useQuery({
        queryKey: ["admin-mini", miniId],
        queryFn: async () => {
            const res = await api.get(`/admin/mini-specialities/${miniId}`);

            return {
                ...res.data,
                quickFacts: res.data.quickFacts?.join("\n") ?? "",
            };
        },
        enabled: !!miniId,
    });

    useEffect(() => {
        if (data) reset(data);
    }, [data, reset]);

    /* ---------------- UPDATE ---------------- */

    const mutation = useMutation({
        mutationFn: async (values: FormValues) => {

            const payload = {
                ...values,
                quickFacts: values.quickFacts
                    .split("\n")
                    .map(v => v.trim())
                    .filter(Boolean),
            };

            await api.patch(`/admin/mini-specialities/${miniId}`, payload);
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
        <div className="py-16">

            {/* PAGE HEADER */}

            <div className="max-w-4xl mx-auto px-6 mb-12">
                <h1 className="text-3xl font-semibold text-navy-dark">
                    Edit Mini Speciality
                </h1>

                <p className="text-sm text-navy/60 mt-2">
                    Update medical information for this condition.
                </p>
            </div>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="max-w-4xl mx-auto px-6 space-y-6"
            >

                {/* BASIC */}

                <SectionTitle title="Basic Information" />

                <Input
                    label="Name"
                    error={errors.name?.message}
                    {...register("name", { required: "Name is required" })}
                />

                {/* OVERVIEW */}

                <SectionTitle title="Overview Content" />

                <Textarea
                    label="Summary"
                    {...register("overview.summary")}
                />

                <Textarea
                    label="What is it?"
                    {...register("overview.whatIsIt")}
                />

                <Textarea
                    label="Who is affected?"
                    {...register("overview.whoIsAffected")}
                />

                <Textarea
                    label="When should someone see a doctor?"
                    {...register("overview.whenToSeeDoctor")}
                />

                {/* QUICK FACTS */}

                <SectionTitle title="Quick Facts" />

                <Textarea
                    label="Quick Facts (one per line)"
                    rows={5}
                    {...register("quickFacts")}
                />

                {/* ACTIONS */}

                <div className="flex justify-end gap-4 pt-8 border-t border-gray-100">

                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="cursor-pointer hover:bg-gray-200 px-6 py-3 rounded-lg border border-gray-200 text-sm"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        disabled={mutation.isPending}
                        className="cursor-pointer px-6 py-3 bg-wellness-accent text-white rounded-lg text-sm font-medium shadow-sm hover:opacity-90 disabled:opacity-60"
                    >
                        {mutation.isPending ? "Saving..." : "Save Changes"}
                    </button>

                </div>

            </form>
        </div>
    );
}

/* ---------------- COMPONENTS ---------------- */

function SectionTitle({ title }: { title: string }) {
    return (
        <div className="border-b border-gray-100 pb-3">
            <h2 className="text-lg font-semibold text-navy-dark">
                {title}
            </h2>
        </div>
    );
}

const Input = forwardRef<
    HTMLInputElement,
    { label: string; error?: string } & React.InputHTMLAttributes<HTMLInputElement>
>(({ label, error, ...props }, ref) => (
    <div className="space-y-2">
        <label className="text-sm font-medium text-navy-dark">
            {label}
        </label>

        <input
            ref={ref}
            {...props}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-wellness-accent focus:outline-none"
        />

        {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
));

Input.displayName = "Input";

const Textarea = forwardRef<
    HTMLTextAreaElement,
    { label: string; error?: string } & React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ label, error, ...props }, ref) => (
    <div className="space-y-2">
        <label className="text-sm font-medium text-navy-dark">
            {label}
        </label>

        <textarea
            ref={ref}
            {...props}
            rows={4}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm resize-none focus:ring-2 focus:ring-wellness-accent focus:outline-none"
        />

        {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
));

Textarea.displayName = "Textarea";