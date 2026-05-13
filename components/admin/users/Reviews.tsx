"use client";

import { useState } from "react";

import {
    useMutation,
    useQuery,
} from "@tanstack/react-query";

import {
    CheckCircle2,
    Eye,
    Star,
    X,
} from "lucide-react";

import toast from "react-hot-toast";

import api from "@/lib/api";

export default function AdminReviews() {

    const [selectedReview, setSelectedReview] =
        useState<any>(null);

    const {
        data = [],
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ["admin-reviews"],

        queryFn: async () => {

            const res =
                await api.get(
                    "/reviews/admin"
                );

            return res.data.sort(
                (a: any, b: any) => {

                    // pending first
                    if (
                        !a.isApproved &&
                        b.isApproved
                    ) {
                        return -1;
                    }

                    if (
                        a.isApproved &&
                        !b.isApproved
                    ) {
                        return 1;
                    }

                    // newest first
                    return (
                        new Date(b.createdAt).getTime() -
                        new Date(a.createdAt).getTime()
                    );
                }
            );
        },
    });

    const approveMutation =
        useMutation({

            mutationFn: async (
                reviewId: string
            ) => {

                await api.patch(
                    `/reviews/app/${reviewId}/approve`
                );
            },

            onSuccess: () => {

                toast.success(
                    "Review approved"
                );

                refetch();
            },
        });

    return (

        <div className="max-w-7xl mx-auto space-y-6">

            {/* HEADER */}
            <div>

                <h1
                    className="
                        text-2xl font-semibold
                        text-slate-900
                    "
                >
                    Reviews
                </h1>

                <p
                    className="
                        text-sm text-slate-500
                    "
                >
                    Moderate and manage
                    Healora platform reviews
                </p>

            </div>

            {/* TABLE */}
            <div
                className="
                    overflow-hidden

                    rounded-xl

                    border border-slate-200

                    bg-white

                    shadow-sm
                "
            >

                {isLoading ? (

                    <div className="p-6 text-sm text-slate-500">
                        Loading reviews...
                    </div>

                ) : (

                    <table className="w-full text-sm">

                        <thead className="bg-slate-50">

                            <tr>

                                <th className="px-6 py-4 text-left">
                                    User
                                </th>

                                <th className="px-6 py-4 text-left">
                                    Rating
                                </th>

                                <th className="px-6 py-4 text-left">
                                    Review
                                </th>

                                <th className="px-6 py-4 text-left">
                                    Date
                                </th>

                                <th className="px-6 py-4 text-left">
                                    Status
                                </th>

                                <th className="px-6 py-4 text-right">
                                    Actions
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {data.map((review: any) => (

                                <tr
                                    key={review.id}
                                    className="
                                        border-t border-slate-100

                                        hover:bg-slate-50/70
                                    "
                                >

                                    {/* USER */}
                                    <td className="px-6 py-5">

                                        <div className="font-medium text-slate-900">
                                            {
                                                review.user
                                                    ?.name
                                            }
                                        </div>

                                        <div className="text-xs text-slate-500">
                                            {
                                                review.user
                                                    ?.email
                                            }
                                        </div>

                                    </td>

                                    {/* RATING */}
                                    <td className="px-6 py-5">

                                        <div
                                            className="
                                                inline-flex items-center gap-1

                                                rounded-full

                                                bg-yellow-50

                                                px-3 py-1

                                                text-xs font-medium

                                                text-yellow-700
                                            "
                                        >

                                            <Star
                                                size={13}
                                                className="
                                                    fill-yellow-400
                                                "
                                            />

                                            {review.rating}/5

                                        </div>

                                    </td>

                                    {/* REVIEW */}
                                    <td className="px-6 py-5">

                                        <p
                                            className="
                                                max-w-sm

                                                truncate

                                                text-slate-600
                                            "
                                        >
                                            {
                                                review.review
                                            }
                                        </p>

                                    </td>

                                    {/* DATE */}
                                    <td className="px-6 py-5 text-slate-500">

                                        {new Date(
                                            review.createdAt
                                        ).toLocaleDateString()}

                                    </td>

                                    {/* STATUS */}
                                    <td className="px-6 py-5">

                                        {review.isApproved ? (

                                            <span
                                                className="
                                                    rounded-full

                                                    bg-emerald-100

                                                    px-3 py-1

                                                    text-xs font-medium

                                                    text-emerald-700
                                                "
                                            >
                                                Approved
                                            </span>

                                        ) : (

                                            <span
                                                className="
                                                    rounded-full

                                                    bg-amber-100

                                                    px-3 py-1

                                                    text-xs font-medium

                                                    text-amber-700
                                                "
                                            >
                                                Pending
                                            </span>

                                        )}

                                    </td>

                                    {/* ACTIONS */}
                                    <td className="px-6 py-5">

                                        <div
                                            className="
                                                flex items-center justify-end gap-3
                                            "
                                        >

                                            {/* VIEW */}
                                            <button
                                                onClick={() =>
                                                    setSelectedReview(
                                                        review
                                                    )
                                                }
                                                className="
                                                    flex items-center gap-1

                                                    text-slate-600
                                                    hover:text-slate-900
                                                "
                                            >

                                                <Eye size={16} />

                                                View

                                            </button>

                                            {/* APPROVE */}
                                            {!review.isApproved && (

                                                <button
                                                    onClick={() =>
                                                        approveMutation.mutate(
                                                            review.id
                                                        )
                                                    }
                                                    className="
                                                        flex items-center gap-1

                                                        text-emerald-600
                                                        hover:text-emerald-700
                                                    "
                                                >

                                                    <CheckCircle2
                                                        size={16}
                                                    />

                                                    Approve

                                                </button>

                                            )}

                                        </div>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                )}

            </div>

            {/* VIEW MODAL */}
            {selectedReview && (

                <div
                    className="
                        fixed inset-0 z-[100]

                        flex items-center justify-center

                        bg-black/50
                        backdrop-blur-sm

                        p-4
                    "
                >

                    <div
                        className="
                            relative

                            w-full max-w-xl

                            rounded-3xl

                            bg-white

                            p-8

                            shadow-2xl
                        "
                    >

                        {/* CLOSE */}
                        <button
                            onClick={() =>
                                setSelectedReview(null)
                            }
                            className="
                                absolute right-5 top-5

                                text-slate-400
                                hover:text-slate-700
                            "
                        >

                            <X size={20} />

                        </button>

                        {/* USER */}
                        <div>

                            <h2
                                className="
                                    text-2xl font-semibold

                                    text-slate-900
                                "
                            >
                                Review Details
                            </h2>

                            <p
                                className="
                                    mt-1

                                    text-sm text-slate-500
                                "
                            >
                                Submitted by{" "}
                                {
                                    selectedReview.user
                                        ?.name
                                }
                            </p>

                        </div>

                        {/* RATING */}
                        <div className="mt-6">

                            <div
                                className="
                                    inline-flex items-center gap-2

                                    rounded-2xl

                                    bg-yellow-50

                                    px-4 py-2

                                    text-yellow-700
                                "
                            >

                                <Star
                                    size={18}
                                    className="
                                        fill-yellow-400
                                    "
                                />

                                <span className="font-semibold">
                                    {
                                        selectedReview.rating
                                    }/5
                                </span>

                            </div>

                        </div>

                        {/* REVIEW */}
                        <div
                            className="
                                mt-6

                                rounded-2xl

                                border border-slate-200

                                bg-slate-50

                                p-5
                            "
                        >

                            <p
                                className="
                                    whitespace-pre-wrap

                                    leading-relaxed

                                    text-slate-700
                                "
                            >
                                {
                                    selectedReview.review
                                }
                            </p>

                        </div>

                        {/* FOOTER */}
                        <div
                            className="
                                mt-6

                                flex items-center justify-between
                            "
                        >

                            <span
                                className="
                                    text-sm text-slate-500
                                "
                            >

                                {new Date(
                                    selectedReview.createdAt
                                ).toLocaleString()}

                            </span>

                            {!selectedReview.isApproved && (

                                <button
                                    onClick={() => {

                                        approveMutation.mutate(
                                            selectedReview.id
                                        );

                                        setSelectedReview(
                                            null
                                        );
                                    }}
                                    className="
                                        rounded-xl

                                        bg-emerald-600
                                        hover:bg-emerald-700

                                        px-5 py-2.5

                                        text-sm font-medium
                                        text-white

                                        transition
                                    "
                                >
                                    Approve Review
                                </button>

                            )}

                        </div>

                    </div>

                </div>

            )}

        </div>
    );
}