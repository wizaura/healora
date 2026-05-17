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
    ShieldCheck,
    CalendarDays,
} from "lucide-react";

import { toast }
    from "react-hot-toast";

import Loader
    from "@/components/common/Loader";

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

    const [
        selectedInvestigation,
        setSelectedInvestigation,
    ] = useState<any>(null);

    /* =====================================================
       QUERY
       ===================================================== */

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

    /* =====================================================
       DELETE FLOW
       ===================================================== */

    const openDeleteConfirm = (
        id: string
    ) => {

        setSelectedDeleteId(id);

        setConfirmOpen(true);
    };

    const handleDelete =
        async () => {

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

    if (isLoading) {

        return <Loader fullScreen />;
    }

    return (

        <div className="space-y-8">

            {/* =====================================================
               HEADER
               ===================================================== */}

            <div
                className="
                    overflow-hidden

                    rounded-2xl

                    border border-slate-200

                    bg-white

                    shadow-sm
                "
            >

                <div
                    className="
                        border-b border-slate-200

                        bg-gradient-to-r
                        from-wellness-bg/90
                        via-wellness-bg/50
                        to-white

                        px-8 py-7
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

                        {/* LEFT */}

                        <div>

                            <div
                                className="
                                    inline-flex items-center gap-2

                                    rounded-full

                                    border border-teal-100

                                    bg-white

                                    px-3 py-1

                                    text-xs font-semibold

                                    uppercase tracking-wide

                                    text-teal-700
                                "
                            >

                                Medical Records

                            </div>

                            <h1
                                className="
                                    mt-4

                                    text-3xl font-semibold

                                    tracking-[-0.03em]

                                    text-slate-900
                                "
                            >

                                Investigations Reports

                            </h1>

                            <p
                                className="
                                    mt-2

                                    max-w-2xl

                                    text-sm leading-6

                                    text-slate-500
                                "
                            >

                                Securely manage laboratory reports,
                                scans, prescriptions, and investigation
                                records in one place.

                            </p>

                        </div>

                        {/* RIGHT */}

                        <div className="flex flex-row gap-4">

                            {/* TOTAL */}

                            <div
                                className="
                                    rounded-2xl

                                    border border-slate-200

                                    bg-white

                                    px-5 py-2

                                    shadow-sm

                                    min-w-[150px]
                                "
                            >

                                <p
                                    className="
                                        text-xs font-medium

                                        uppercase tracking-wide

                                        text-slate-400
                                    "
                                >

                                    Total Records

                                </p>

                                <p
                                    className="
                                        mt-2

                                        text-3xl font-semibold

                                        text-slate-900
                                    "
                                >

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

                </div>

                {/* =====================================================
                   CONTENT
                   ===================================================== */}

                <div className="p-6 md:p-8">

                    {/* =====================================================
                       EMPTY
                       ===================================================== */}

                    {data?.length === 0 && (

                        <div
                            className="
                                rounded-2xl

                                border border-dashed border-slate-300

                                bg-white

                                py-20 px-6

                                text-center

                                shadow-sm
                            "
                        >

                            <div
                                className="
                                    mx-auto mb-5

                                    flex h-16 w-16
                                    items-center justify-center

                                    rounded-full

                                    bg-slate-100
                                "
                            >

                                <FileText
                                    size={28}
                                    className="text-slate-400"
                                />

                            </div>

                            <h3
                                className="
                                    text-lg font-semibold

                                    text-slate-800
                                "
                            >

                                No investigations uploaded

                            </h3>

                            <p
                                className="
                                    mt-2

                                    text-sm leading-6

                                    text-slate-500
                                "
                            >

                                eg: Scanning  reports, Blood reports , X-rays,
                                etc will appear here.

                            </p>

                        </div>

                    )}

                    {/* =====================================================
                       LIST
                       ===================================================== */}

                    <div className="space-y-6">

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
                                        overflow-hidden

                                        rounded-2xl

                                        border border-slate-200

                                        bg-white

                                        shadow-sm

                                        transition-all duration-300

                                        hover:-translate-y-1
                                        hover:shadow-lg

                                        cursor-pointer
                                    "
                                >

                                    <div className="p-6 space-y-6">

                                        {/* =====================================================
                                           TOP
                                           ===================================================== */}

                                        <div
                                            className="
                                                flex flex-col gap-5

                                                lg:flex-row
                                                lg:items-start
                                                lg:justify-between
                                            "
                                        >

                                            {/* LEFT */}

                                            <div className="space-y-4">

                                                <div
                                                    className="
                                                        flex flex-wrap
                                                        items-center
                                                        gap-3
                                                    "
                                                >

                                                    <div
                                                        className="
                                                            flex h-12 w-12
                                                            items-center justify-center

                                                            rounded-2xl

                                                            bg-navy

                                                            text-white
                                                        "
                                                    >

                                                        <FileText size={20} />

                                                    </div>

                                                    <div>

                                                        <h3
                                                            className="
                                                                text-xl font-semibold

                                                                text-slate-900
                                                            "
                                                        >

                                                            Investigation Record

                                                        </h3>

                                                        <div
                                                            className="
                                                                mt-1

                                                                flex flex-wrap items-center gap-2

                                                                text-sm text-slate-500
                                                            "
                                                        >

                                                            <CalendarDays size={14} />

                                                            {new Date(
                                                                inv.createdAt
                                                            ).toLocaleString()}

                                                        </div>

                                                    </div>

                                                </div>

                                                {/* BADGE */}

                                                <div
                                                    className="
                                                        inline-flex items-center gap-2

                                                        rounded-full

                                                        border border-slate-200

                                                        bg-slate-50

                                                        px-4 py-2

                                                        text-xs font-semibold

                                                        uppercase tracking-wide

                                                        text-slate-700
                                                    "
                                                >

                                                    <ShieldCheck size={14} />

                                                    {inv.createdByRole}

                                                </div>

                                            </div>

                                            {/* DELETE */}

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
                                                        flex h-11 w-11
                                                        items-center justify-center

                                                        rounded-2xl

                                                        border border-red-100

                                                        bg-red-50

                                                        text-red-600

                                                        transition

                                                        hover:bg-red-100
                                                    "
                                                >

                                                    <Trash2 size={16} />

                                                </button>

                                            )}

                                        </div>

                                        {/* =====================================================
                                           NOTE
                                           ===================================================== */}

                                        {inv.note && (

                                            <div
                                                className="
                                                    rounded-xl

                                                    border border-slate-200

                                                    bg-slate-50/70

                                                    p-5
                                                "
                                            >

                                                <p
                                                    className="
                                                        text-sm leading-7

                                                        text-slate-700
                                                    "
                                                >

                                                    {inv.note}

                                                </p>

                                            </div>

                                        )}

                                        {/* =====================================================
                                           IMAGES
                                           ===================================================== */}

                                        {inv.images?.length > 0 && (

                                            <div
                                                className="
                                                    grid grid-cols-2 gap-4

                                                    md:grid-cols-4
                                                "
                                            >

                                                {inv.images.map((img: any) => (

                                                    <div
                                                        key={img.id}

                                                        className="
                                                            overflow-hidden

                                                            rounded-2xl

                                                            border border-slate-200

                                                            bg-slate-100

                                                            aspect-square
                                                        "
                                                    >

                                                        <img
                                                            src={img.imageUrl}

                                                            className="
                                                                h-full w-full

                                                                object-cover

                                                                transition duration-300

                                                                hover:scale-105
                                                            "
                                                        />

                                                    </div>

                                                ))}

                                            </div>

                                        )}

                                    </div>

                                </div>

                            );
                        })}

                    </div>

                </div>

            </div>

            {/* =====================================================
               VIEW MODAL
               ===================================================== */}

            {selectedInvestigation && (

                <InvestigationViewModal
                    investigation={selectedInvestigation}

                    onClose={() =>
                        setSelectedInvestigation(null)
                    }
                />

            )}

            {/* =====================================================
               DELETE CONFIRM
               ===================================================== */}

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