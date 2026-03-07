"use client";

import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useQuery, useMutation } from "@tanstack/react-query";
import api from "@/lib/api";
import { useEffect } from "react";

type FormValues = {
    name: string;
    slug: string;

    overview: {
        summary: string;
        whatIsIt: string;
        whoIsAffected: string;
        whenToSeeDoctor: string;
    };

    quickFacts: string;

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

            return {
                ...res.data,
                quickFacts: res.data.quickFacts?.join("\n") ?? "",
            };
        },
    });

    useEffect(() => {
        if (data) reset(data);
    }, [data, reset]);

    const mutation = useMutation({
        mutationFn: async (values: FormValues) => {

            const payload = {
                ...values,
                quickFacts: values.quickFacts
                    .split("\n")
                    .map(v => v.trim())
                    .filter(Boolean),
            };

            await api.patch(`/admin/sub-specialities/${subId}`, payload);
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
        <div className="py-16">

            {/* PAGE HEADER */}

            <div className="max-w-5xl mx-auto px-6 mb-12">
                <h1 className="text-3xl font-semibold text-navy-dark">
                    Edit Sub Speciality
                </h1>

                <p className="text-sm text-navy/60 mt-2">
                    Update information for this sub-speciality.
                </p>
            </div>

            {/* FORM */}

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="max-w-5xl mx-auto px-6 space-y-12"
            >

                {/* BASIC INFO */}

                <SectionTitle title="Basic Information" />

                <div className="space-y-6">

                    <Input label="Name" {...register("name")} />

                    <Input label="Slug" {...register("slug")} />

                </div>

                {/* OVERVIEW */}

                <SectionTitle title="Overview Content" />

                <div className="space-y-6">

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

                </div>

                {/* QUICK FACTS */}

                <SectionTitle title="Quick Facts" />

                <Textarea
                    label="Quick Facts (one per line)"
                    rows={5}
                    {...register("quickFacts")}
                />

                {/* SETTINGS */}

                <SectionTitle title="Settings" />

                <div className="flex flex-col gap-4">
                    <Checkbox label="Active" {...register("isActive")} />

                    <Checkbox
                        label="Has Mini Level"
                        {...register("hasMiniLevel")}
                    />
                </div>

                {/* ACTIONS */}

                <div className="flex justify-end gap-4 pt-8 border-t border-gray-100">

                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="cursor-pointer px-6 py-3 rounded-lg border border-gray-200 hover:bg-gray-200 text-sm"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="cursor-pointer px-6 py-3 bg-wellness-accent text-white rounded-lg text-sm font-medium shadow-sm hover:opacity-90"
                    >
                        Save Changes
                    </button>

                </div>

            </form>
        </div>
    );
}

/* ---------- Components ---------- */

function SectionTitle({ title }: { title: string }) {
    return (
        <div className="border-b border-gray-100 pb-3">
            <h2 className="text-lg font-semibold text-navy-dark">
                {title}
            </h2>
        </div>
    );
}

function Input({ label, ...props }: any) {
    return (
        <div className="space-y-2">
            <label className="text-sm font-medium text-navy-dark">
                {label}
            </label>

            <input
                {...props}
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-wellness-accent"
            />
        </div>
    );
}

function Textarea({ label, rows = 4, ...props }: any) {
    return (
        <div className="space-y-2">
            <label className="text-sm font-medium text-navy-dark">
                {label}
            </label>

            <textarea
                rows={rows}
                {...props}
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-wellness-accent"
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