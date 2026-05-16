"use client";

import { useState } from "react";

import { useQuery } from "@tanstack/react-query";

import api from "@/lib/api";

import Loader from "@/components/common/Loader";

import {
    ImageIcon,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

export default function UserInvestigationsTab({
    userId,
}: any) {

    const [page, setPage] =
        useState(1);

    const limit = 10;

    const {
        data,
        isLoading,
    } = useQuery({

        queryKey: [
            "user-investigations",
            userId,
            page,
        ],

        queryFn: async () => {

            const res =
                await api.get(
                    `/admin/users/${userId}/investigations`,
                    {
                        params: {
                            page,
                            limit,
                        },
                    }
                );

            return res.data;
        },
    });

    if (isLoading) {
        return <Loader fullScreen />;
    }

    const investigations =
        data?.investigations || [];

    const pagination =
        data?.pagination;

    return (

        <div
            className="
                rounded-2xl

                border border-slate-200

                bg-white

                shadow-sm
            "
        >

            <div className="space-y-5 p-6">

                {investigations.map((i: any) => (

                    <div
                        key={i.id}

                        className="
                            rounded-2xl

                            border border-slate-200

                            bg-slate-50/60

                            p-6
                        "
                    >

                        <div
                            className="
                                flex flex-col gap-5

                                lg:flex-row
                                lg:items-center
                                lg:justify-between
                            "
                        >

                            <div>

                                <h3
                                    className="
                                        text-lg font-semibold

                                        text-slate-900
                                    "
                                >

                                    {i.doctorUser?.name}

                                </h3>

                                <p
                                    className="
        mt-1

        text-sm

        text-slate-500
    "
                                >

                                    {new Date(
                                        i.createdAt
                                    ).toLocaleString(
                                        "en-GB",
                                        {
                                            year: "numeric",
                                            month: "short",
                                            day: "numeric",

                                            hour: "numeric",
                                            minute: "2-digit",

                                            hour12: true,
                                        }
                                    )}

                                </p>

                            </div>

                        </div>

                        {i.note && (

                            <div
                                className="
                                    mt-6

                                    rounded-2xl

                                    border border-slate-200

                                    bg-white

                                    p-5
                                "
                            >

                                <p
                                    className="
                                        whitespace-pre-wrap

                                        text-sm

                                        leading-7

                                        text-slate-700
                                    "
                                >

                                    {i.note}

                                </p>

                            </div>

                        )}

                        {/* IMAGES */}

                        {i.images?.length > 0 && (

                            <div
                                className="
                                    mt-6

                                    grid grid-cols-2 gap-4

                                    md:grid-cols-4
                                "
                            >

                                {i.images.map(
                                    (img: any) => (

                                        <a
                                            key={img.id}

                                            href={img.imageUrl}

                                            target="_blank"

                                            className="
                                                group

                                                overflow-hidden

                                                rounded-2xl

                                                border border-slate-200

                                                bg-white
                                            "
                                        >

                                            <img
                                                src={img.imageUrl}

                                                className="
                                                    h-40 w-full

                                                    object-cover

                                                    transition

                                                    group-hover:scale-105
                                                "
                                            />

                                        </a>

                                    )
                                )}

                            </div>

                        )}

                    </div>

                ))}

            </div>

            <Pagination
                pagination={pagination}
                setPage={setPage}
            />

        </div>
    );
}

function Pagination({
    pagination,
    setPage,
}: any) {

    if (!pagination) return null;

    return (

        <div
            className="
                flex items-center justify-between

                border-t border-slate-200

                px-6 py-5
            "
        >

            <p
                className="
                    text-sm

                    text-slate-500
                "
            >

                Page {pagination.page} of {pagination.totalPages}

            </p>

            <div className="flex gap-2">

                <button
                    disabled={!pagination.hasPrev}

                    onClick={() =>
                        setPage(
                            (p: number) => p - 1
                        )
                    }

                    className="
                        flex h-10 w-10
                        items-center justify-center

                        rounded-xl

                        border border-slate-200

                        transition

                        hover:bg-slate-100

                        disabled:opacity-40
                    "
                >

                    <ChevronLeft size={16} />

                </button>

                <button
                    disabled={!pagination.hasNext}

                    onClick={() =>
                        setPage(
                            (p: number) => p + 1
                        )
                    }

                    className="
                        flex h-10 w-10
                        items-center justify-center

                        rounded-xl

                        border border-slate-200

                        transition

                        hover:bg-slate-100

                        disabled:opacity-40
                    "
                >

                    <ChevronRight size={16} />

                </button>

            </div>

        </div>
    );
}