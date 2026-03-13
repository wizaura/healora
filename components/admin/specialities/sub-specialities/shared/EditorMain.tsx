"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import api from "@/lib/api";

import BasicInfoSection from "./BasicInfoSection";
import ImageSection from "./ImageSection";
import HeaderMainSection from "./HeaderMain";
import QAListSection from "./DynamicQA";
import QuickFactsSection from "./QuickFacts";

type QA = {
    question: string;
    answer: string;
};

type QuickFact = {
    value: string;
};

export type FormValues = {
    name: string;
    slug: string;
    description: string;

    headerMain: QA;

    headerSecondary: QA[];

    footerQuestions: QA[];

    quickFacts: QuickFact[];

    image1?: FileList;
    image2?: FileList;
};

export default function ConditionEditor({ id, type }: any) {

    const router = useRouter();

    const form = useForm<FormValues>({
        defaultValues: {
            name: "",
            slug: "",
            description: "",

            headerMain: { question: "", answer: "" },
            headerSecondary: [],
            footerQuestions: [],
            quickFacts: []
        }
    });

    const { reset, handleSubmit } = form;

    /* ---------------- ENTITY URL ---------------- */

    const baseUrl =
        type === "speciality"
            ? `/admin/specialities/${id}`
            : type === "sub"
                ? `/admin/sub-specialities/${id}`
                : `/admin/mini-specialities/${id}`;

    const title =
        type === "speciality"
            ? "Edit Speciality"
            : type === "sub"
                ? "Edit Sub Speciality"
                : "Edit Condition";

    /* ---------------- FETCH DATA ---------------- */

    const { data } = useQuery({
        queryKey: ["condition", id],
        queryFn: async () => {

            const res = await api.get(baseUrl);
            const item = res.data;
            const overview = item.overview ?? {};

            return {
                name: item.name,
                slug: item.slug,
                description: item.description,

                headerMain: overview.headerMain ?? { question: "", answer: "" },
                headerSecondary: overview.headerSecondary ?? [],
                footerQuestions: overview.footerQuestions ?? [],

                quickFacts:
                    item.quickFacts?.map((v: string) => ({ value: v })) ?? [],

                existingImages: overview.images ?? {}
            };
        },
        enabled: !!id
    });

    useEffect(() => {
        if (data) reset(data);
    }, [data]);

    /* ---------------- UPDATE ---------------- */

    const mutation = useMutation({
        mutationFn: async (values: any) => {

            const formData = new FormData();

            formData.append("name", values.name);
            formData.append("description", values.description);

            formData.append("headerMain", JSON.stringify(values.headerMain));
            formData.append("headerSecondary", JSON.stringify(values.headerSecondary));
            formData.append("footerQuestions", JSON.stringify(values.footerQuestions));

            values.quickFacts.forEach((f: any) =>
                formData.append("quickFacts", f.value)
            );

            if (values.image1?.[0]) formData.append("image1", values.image1[0]);
            if (values.image2?.[0]) formData.append("image2", values.image2[0]);

            await api.patch(baseUrl, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
        },

        onSuccess() {
            router.push(baseUrl);
        }
    });

    const onSubmit = (values: FormValues) => mutation.mutate(values);

    const cancelRoute =
        type === "speciality"
            ? `/admin/specialities/${id}`
            : type === "sub"
                ? `/admin/sub-specialities/${id}`
                : `/admin/mini-specialities/${id}`;

    if (!data) return null;

    return (

        <div className="py-16">

            <div className="max-w-5xl mx-auto px-6 space-y-12">

                <h1 className="text-3xl font-semibold">
                    {title}
                </h1>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">

                    <BasicInfoSection form={form} />

                    <ImageSection
                        form={form}
                        existingImages={data.existingImages}
                    />

                    <HeaderMainSection form={form} />

                    <QAListSection
                        form={form}
                        name="headerSecondary"
                        title="Header Questions"
                    />

                    <QAListSection
                        form={form}
                        name="footerQuestions"
                        title="Footer Questions"
                    />

                    <QuickFactsSection form={form} />

                    <div className="flex justify-end gap-4 pt-8 border-t border-gray-100">

                        <button
                            type="button"
                            disabled={mutation.isPending}
                            onClick={() => router.replace(cancelRoute)}
                            className="px-6 py-3 rounded-lg border border-gray-200 hover:bg-gray-200 text-sm"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={mutation.isPending}
                            className="flex items-center gap-2 px-6 py-3 bg-wellness-accent text-white rounded-lg text-sm font-medium disabled:opacity-60"
                        >
                            {mutation.isPending && (
                                <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                            )}

                            {mutation.isPending ? "Saving..." : "Save Changes"}
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}

export function SectionTitle({ title }: { title: string }) {
    return (
        <div className="border-b border-gray-100 pb-3">
            <h2 className="text-lg font-semibold text-navy-dark">
                {title}
            </h2>
        </div>
    );
}

export function Input({ label, ...props }: any) {
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

export function Textarea({ label, rows = 4, ...props }: any) {
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

export function FileInput({ label, ...props }: any) {
    return (
        <div className="space-y-2">

            <label className="text-sm font-medium text-navy-dark">
                {label}
            </label>

            <input
                type="file"
                {...props}
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm"
            />

        </div>
    );
}