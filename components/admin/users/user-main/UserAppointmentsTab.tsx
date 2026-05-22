"use client";

import { useState } from "react";

import { useQuery } from "@tanstack/react-query";

import api from "@/lib/api";

import Loader from "@/components/common/Loader";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function UserAppointmentsTab({
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
            "user-appointments",
            userId,
            page,
        ],

        queryFn: async () => {

            const res =
                await api.get(
                    `/admin/users/${userId}/appointments`,
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

    const appointments =
        data?.appointments || [];

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

            <div className="p-6 space-y-5">

                {appointments.map((a: any) => (

                    <div
                        key={a.id}

                        className="
                            rounded-2xl

                            border border-slate-200
                            
                            bg-slate-50/60
                            
                            p-6
                        "
                    >

                        <div
                            className="
                                flex flex-col gap-6

                                lg:flex-row
                                lg:items-center
                                lg:justify-between
                                "
                        >

                            <div>

                                <h3 className="text-lg font-semibold text-slate-900">
                                    {a.doctor?.user?.name}
                                </h3>

                                <p className="mt-1 text-sm text-slate-500">
                                    {a.doctor?.speciality?.name}
                                </p>

                            </div>

                            <div className="flex flex-wrap gap-2">

                                <Badge>
                                    Status: {a.status}
                                </Badge>

                                <Badge>
                                    Meeting Type: {a.meetingType}
                                </Badge>

                                <Badge>
                                    Delivery: {a.deliveryMode}
                                </Badge>

                            </div>

                        </div>

                        <div
                            className="
                            mt-6
                            
                                grid grid-cols-1 gap-4

                                md:grid-cols-4
                                "
                        >

                            <MiniInfo
                                label="Appointment Date"

                                value={new Date(
                                    a.slot?.startTimeUTC
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
                            />

                            <MiniInfo
                                label="Payment Amount"

                                value={`${a.currency} ${(

                                    (a.slotPaymentStatus === "PAID" ? a.slotFee : 0) +

                                    (a.consultationPaymentStatus === "PAID" ? a.consultationFee : 0) +

                                    (a.deliveryMode === "PRESCRIPTION" ? a.prescriptionFee : 0)

                                ).toFixed(2)}`}
                            />

                            <MiniInfo
                                label="Slot Payment Status"
                                value={a.slotPaymentStatus}
                            />
                            <MiniInfo
                                label="Consultation Payment Status"
                                value={a.consultationPaymentStatus}
                            />

                        </div>

                    </div>

                ))}

            </div>

            {/* PAGINATION */}

            <Pagination
                pagination={pagination}
                setPage={setPage}
            />

        </div>
    );
}

function Badge({ children }: any) {

    return (

        <span
            className="
                rounded-full

                bg-teal-100

                px-3 py-1

                text-xs font-medium

                text-teal-700
            "
        >

            {children}

        </span>
    );
}

function MiniInfo({
    label,
    value,
}: any) {

    return (

        <div>

            <p className="text-xs uppercase tracking-wide text-slate-400">
                {label}
            </p>

            <p className="mt-2 text-sm font-medium text-slate-900">
                {value}
            </p>

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