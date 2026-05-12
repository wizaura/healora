"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

import AddInvestigationModal
    from "./AddInvestigationModal";

import ConfirmModal
    from "@/components/common/ConfirmModal";

import InvestigationViewModal
    from "./InvestigationViewModal";

import {
    Trash2,
    FileText,
} from "lucide-react";

import { toast }
    from "react-hot-toast";
import Loader from "@/components/common/Loader";

export default function InvestigationsSection({
    isDoctor,
    patientId,
}: any) {

    const [deletingId, setDeletingId] =
        useState<string | null>(null);

    const [confirmOpen, setConfirmOpen] =
        useState(false);

    const [selectedDeleteId, setSelectedDeleteId] =
        useState<string | null>(null);

    const [selectedInvestigation, setSelectedInvestigation] =
        useState<any>(null);

    /* ---------------- QUERY ---------------- */

    const {
        data = [],
        refetch,
        isLoading,
    } = useQuery({

        queryKey: [
            "investigations",
            patientId,
        ],

        queryFn: async () => {

            const url = isDoctor

                ? `/consultations/investigations/patient/${patientId}`

                : `/consultations/investigations/me`;

            const res =
                await api.get(url);

            return res.data;
        },
    });

    /* ---------------- DELETE FLOW ---------------- */

    const openDeleteConfirm = (
        id: string
    ) => {

        setSelectedDeleteId(id);
        setConfirmOpen(true);
    };

    const handleDelete = async () => {

        if (!selectedDeleteId) return;

        try {

            setDeletingId(
                selectedDeleteId
            );

            await api.delete(
                `/consultations/investigations/${selectedDeleteId}`
            );

            toast.success(
                "Deleted successfully"
            );

            refetch();

        } catch {

            toast.error(
                "Failed to delete"
            );

        } finally {

            setDeletingId(null);

            setConfirmOpen(false);

            setSelectedDeleteId(null);
        }
    };

    if(isLoading){
      return <Loader fullScreen />
    }

    return (

        <div className="min-h-screen py-12">

            <div className="max-w-5xl mx-auto px-6 space-y-5">

                {/* TOP BAR */}
                <div
                    className="
                        rounded-lg
                        border border-slate-200

                        bg-white

                        px-5 py-4

                        flex flex-col lg:flex-row
                        lg:items-center
                        lg:justify-between

                        gap-5

                        shadow-sm
                    "
                >

                    {/* LEFT */}
                    <div className="space-y-1">

                        <h2 className="text-lg font-semibold text-slate-900">
                            Investigations & Medical Records
                        </h2>

                        <p className="text-sm text-slate-500">

                            Showing{" "}

                            <span className="font-medium text-slate-700">
                                {data?.length || 0}
                            </span>{" "}

                            records

                        </p>

                    </div>

                    {/* RIGHT */}
                    <div className="flex items-center gap-3">

                        {/* STATS */}
                        <div
                            className="
                                rounded-lg

                                bg-slate-50
                                border border-slate-200

                                px-4 py-3

                                min-w-[120px]
                            "
                        >

                            <p className="text-xs text-slate-500">
                                Total Records
                            </p>

                            <p className="mt-1 text-xl font-semibold text-slate-800">
                                {data?.length || 0}
                            </p>

                        </div>

                        {/* ADD */}
                        {!isDoctor && (

                            <AddInvestigationModal
                                onSaved={refetch}
                            />

                        )}

                    </div>

                </div>

                {/* LOADING */}
                {isLoading && (

                    <div className="space-y-4">

                        {[1, 2, 3].map((i) => (

                            <div
                                key={i}
                                className="
                                    rounded-lg
                                    border border-slate-200

                                    bg-white

                                    p-5

                                    animate-pulse

                                    shadow-sm
                                "
                            >

                                <div className="h-4 w-40 bg-slate-200 rounded mb-4" />

                                <div className="h-3 w-full bg-slate-100 rounded mb-2" />

                                <div className="h-3 w-2/3 bg-slate-100 rounded" />

                            </div>

                        ))}

                    </div>

                )}

                {/* EMPTY */}
                {!isLoading &&
                    data?.length === 0 && (

                        <div
                            className="
                                rounded-lg

                                border border-dashed border-slate-300

                                bg-white

                                py-16 px-6

                                text-center

                                shadow-sm
                            "
                        >

                            <div
                                className="
                                    h-14 w-14

                                    rounded-full

                                    bg-slate-100

                                    flex items-center justify-center

                                    mx-auto mb-4
                                "
                            >

                                <FileText
                                    size={24}
                                    className="text-slate-400"
                                />

                            </div>

                            <h3 className="text-sm font-medium text-slate-700">
                                No investigations uploaded
                            </h3>

                            <p className="text-sm text-slate-500 mt-1">
                                Medical records and reports
                                will appear here.
                            </p>

                        </div>

                    )}

                {/* LIST */}
                <div className="space-y-4">

                    {data?.map((inv: any) => {

                        const canDelete =

                            (!isDoctor &&
                                inv.createdByRole === "PATIENT")

                            ||

                            (isDoctor &&
                                inv.createdByRole === "DOCTOR");

                        return (

                            <div
                                key={inv.id}

                                onClick={() =>
                                    setSelectedInvestigation(inv)
                                }

                                className="
                                    rounded-lg
                                    border border-slate-200

                                    bg-white

                                    p-5

                                    shadow-sm
                                    hover:shadow-md

                                    transition

                                    cursor-pointer

                                    space-y-4
                                "
                            >

                                {/* TOP */}
                                <div className="flex items-start justify-between gap-4">

                                    <div>

                                        <p className="text-sm font-medium text-slate-800">
                                            Investigation Record
                                        </p>

                                        <p className="text-xs text-slate-500 mt-1">

                                            {new Date(
                                                inv.createdAt
                                            ).toLocaleString()}

                                        </p>

                                    </div>

                                    <div className="flex items-center gap-3">

                                        <span
                                            className="
                                                inline-flex items-center

                                                rounded-full

                                                bg-slate-100

                                                px-3 py-1

                                                text-xs font-medium text-slate-600
                                            "
                                        >

                                            {inv.createdByRole}

                                        </span>

                                        {canDelete && (

                                            <button
                                                onClick={(e) => {

                                                    e.stopPropagation();

                                                    openDeleteConfirm(
                                                        inv.id
                                                    );
                                                }}

                                                disabled={
                                                    deletingId === inv.id
                                                }

                                                className="
                                                    h-9 w-9

                                                    rounded-lg

                                                    flex items-center justify-center

                                                    text-red-500
                                                    hover:bg-red-50

                                                    transition
                                                "
                                            >

                                                <Trash2 size={16} />

                                            </button>

                                        )}

                                    </div>

                                </div>

                                {/* NOTE */}
                                {inv.note && (

                                    <div
                                        className="
                                            rounded-lg

                                            bg-slate-50
                                            border border-slate-100

                                            p-4
                                        "
                                    >

                                        <p className="text-sm leading-relaxed text-slate-700">
                                            {inv.note}
                                        </p>

                                    </div>

                                )}

                                {/* IMAGES */}
                                {inv.images?.length > 0 && (

                                    <div className="flex gap-3 flex-wrap">

                                        {inv.images.map((img: any) => (

                                            <img
                                                key={img.id}

                                                src={img.imageUrl}

                                                className="
                                                    h-24 w-24

                                                    rounded-lg

                                                    border border-slate-200

                                                    object-cover

                                                    hover:scale-[1.02]

                                                    transition
                                                "
                                            />

                                        ))}

                                    </div>

                                )}

                            </div>

                        );
                    })}

                </div>

            </div>

            {/* VIEW MODAL */}
            {selectedInvestigation && (

                <InvestigationViewModal
                    investigation={selectedInvestigation}
                    onClose={() =>
                        setSelectedInvestigation(null)
                    }
                />

            )}

            {/* DELETE CONFIRM */}
            <ConfirmModal
                open={confirmOpen}

                title="Delete Investigation"

                message="
                    This action cannot be undone.
                    Are you sure you want to
                    delete this investigation?
                "

                confirmText="Delete"

                cancelText="Cancel"

                variant="danger"

                loading={!!deletingId}

                onCancel={() => {

                    setConfirmOpen(false);

                    setSelectedDeleteId(null);
                }}

                onConfirm={handleDelete}
            />

        </div>
    );
}