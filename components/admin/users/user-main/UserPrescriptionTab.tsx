"use client";

import { useState } from "react";

import { useQuery } from "@tanstack/react-query";

import api from "@/lib/api";

import Loader from "@/components/common/Loader";

import {
    ChevronLeft,
    ChevronRight,
    Download,
    FileText,
} from "lucide-react";

export default function UserPrescriptionsTab({
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
            "user-prescriptions",
            userId,
            page,
        ],

        queryFn: async () => {

            const res =
                await api.get(
                    `/admin/users/${userId}/prescriptions`,
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

    const prescriptions =
        data?.prescriptions || [];

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

                {prescriptions.map((p: any) => (

                    <div
                        key={p.id}

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

                                    {p.appointment?.doctor?.user?.name}

                                </h3>

                                <p
                                    className="
                                        mt-1

                                        text-sm

                                        text-slate-500
                                    "
                                >

                                    {new Date(
                                        p.createdAt
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

                        {/* MEDICINES */}

                        <div
                            className="
                                mt-6

                                grid grid-cols-1 gap-4
                            "
                        >

                            <ul className="list-decimal pl-5 space-y-1 text-sm">
                                {p.medicines?.map((m: any, i: number) => (
                                    <li key={i} className="text-gray-700">
                                        {m.text}
                                    </li>
                                ))}
                            </ul>
                            {p.instructions && (

                                <p
                                    className="
                                        mt-4

                                        text-sm

                                        leading-6

                                        text-slate-600
                                    "
                                >

                                    {p.instructions}

                                </p>

                            )}

                        </div>

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

/* =====================================================
   PAGINATION
   ===================================================== */

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