"use client";

import api from "@/lib/api";

import {
    Trash2,
    X,
} from "lucide-react";

import {
    Availability,
    Slot,
} from "./ExistingAvailability";

import {
    useEffect,
    useMemo,
    useState,
} from "react";

import ConfirmModal from "@/components/common/ConfirmModal";
import { getApiError } from "@/lib/util";
import toast from "react-hot-toast";

type Props = {
    day: Availability;
    onClose: () => void;
    refresh: () => void;
};

export default function AvailabilityModal({
    day,
    onClose,
    refresh,
}: Props) {

    const [slots,
        setSlots] =
        useState(day.slots);

    const [loading,
        setLoading] =
        useState(false);

    const [confirmOpen,
        setConfirmOpen] =
        useState(false);

    const [confirmAction,
        setConfirmAction] =
        useState<() => void>(() => { });

    const [confirmMessage,
        setConfirmMessage] =
        useState("");

    /* =========================================================
       SORTED SLOTS
       ========================================================= */

    const sortedSlots =
        useMemo(() => {

            return [...slots].sort(
                (a, b) =>
                    new Date(
                        a.startTimeUTC
                    ).getTime() -
                    new Date(
                        b.startTimeUTC
                    ).getTime()
            );

        }, [slots]);

    /* =========================================================
       COUNTS
       ========================================================= */

    const total =
        sortedSlots.length;

    const active =
        sortedSlots.filter(
            (s) =>
                s.status ===
                "AVAILABLE"
        ).length;

    const booked =
        sortedSlots.filter(
            (s) =>
                s.status ===
                "BOOKED"
        ).length;

    const pending =
        sortedSlots.filter(
            (s) =>
                s.status ===
                "PENDING_PAYMENT"
        ).length;

    /* =========================================================
       REFRESH LOCAL DATA
       ========================================================= */

    useEffect(() => {
        setSlots(day.slots);
    }, [day]);

    /* =========================================================
       SLOT TOGGLE
       ========================================================= */

    const handleToggle = (
        slot: Slot
    ) => {

        if (
            slot.status === "BOOKED" ||
            slot.status === "PENDING_PAYMENT"
        ) return;

        const newStatus =
            slot.status === "AVAILABLE"
                ? "INACTIVE"
                : "AVAILABLE";

        setConfirmMessage(
            `Are you sure you want to mark this slot as ${newStatus}?`
        );

        setConfirmAction(() => async () => {

            try {

                setLoading(true);

                await api.patch(
                    `/availability/slot/${slot.id}`,
                    {
                        status:
                            newStatus,
                    }
                );

                /* REFRESH */

                await refresh();

                setSlots(prev =>
                    prev.map((s) =>
                        s.id === slot.id
                            ? {
                                ...s,
                                status:
                                    newStatus,
                            }
                            : s
                    )
                );

            } catch (err) {

                toast.error(getApiError(err));

            } finally {

                setLoading(false);

                setConfirmOpen(false);
            }
        });

        setConfirmOpen(true);
    };

    /* =========================================================
       DELETE DAY
       ========================================================= */

    const handleDelete = () => {

        setConfirmMessage(
            "This will remove all slots for this day. Continue?"
        );

        setConfirmAction(() => async () => {

            try {

                setLoading(true);

                await api.delete(
                    `/availability/block/${day.id}`
                );

                onClose();

                refresh();

            } catch (err) {

                console.error(err);

            } finally {

                setLoading(false);

                setConfirmOpen(false);
            }
        });

        setConfirmOpen(true);
    };

    return (

        <>
            <div
                className="
                    fixed inset-0 z-50

                    flex items-center justify-center

                    bg-black/40

                    backdrop-blur-sm
                "
            >

                <div
                    className="
                        flex max-h-[90vh]
                        w-full max-w-4xl
                        flex-col

                        rounded-2xl

                        bg-white

                        shadow-2xl
                    "
                >

                    {/* =====================================================
                       HEADER
                       ===================================================== */}

                    <div
                        className="
                            rounded-t-2xl

                            border-b border-gray-200

                            bg-[#F4FBF9]

                            p-5
                        "
                    >

                        <div className="flex items-start justify-between">

                            <div>

                                <h3
                                    className="
                                        text-xl font-semibold

                                        text-[#0B2E28]
                                    "
                                >

                                    {new Date(
                                        day.date
                                    ).toLocaleDateString(
                                        undefined,
                                        {
                                            weekday:
                                                "long",

                                            day:
                                                "numeric",

                                            month:
                                                "long",

                                            year:
                                                "numeric",
                                        }
                                    )}

                                </h3>

                                <div
                                    className="
                                        mt-3 flex flex-wrap gap-5

                                        text-sm
                                    "
                                >

                                    <span>
                                        Total:
                                        {" "}
                                        {total}
                                    </span>

                                    <span className="text-[#1F9E8E]">
                                        Active:
                                        {" "}
                                        {active}
                                    </span>

                                    <span className="text-yellow-600">
                                        Booked:
                                        {" "}
                                        {booked}
                                    </span>

                                    <span className="text-orange-600">
                                        Reserved:
                                        {" "}
                                        {pending}
                                    </span>

                                </div>

                            </div>

                            <div className="flex items-center gap-3">

                                <button
                                    onClick={
                                        handleDelete
                                    }

                                    className="
                                        flex items-center gap-2

                                        rounded-lg border

                                        px-3 py-2

                                        text-red-500

                                        transition

                                        hover:bg-red-50
                                    "
                                >

                                    <Trash2 size={18} />

                                    Delete

                                </button>

                                <button
                                    onClick={onClose}

                                    className="
                                        rounded-lg p-2

                                        transition

                                        hover:bg-red-50
                                        hover:text-red-500
                                    "
                                >

                                    <X size={20} />

                                </button>

                            </div>

                        </div>

                    </div>

                    {/* =====================================================
                       SLOTS
                       ===================================================== */}

                    <div
                        className="
                            grid flex-1

                            grid-cols-2
                            gap-4

                            overflow-y-auto

                            p-6

                            md:grid-cols-4
                        "
                    >

                        {sortedSlots.map(
                            (slot) => {

                                const isAvailable =
                                    slot.status ===
                                    "AVAILABLE";

                                const isBooked =
                                    slot.status ===
                                    "BOOKED";

                                const isPending =
                                    slot.status ===
                                    "PENDING_PAYMENT";

                                return (

                                    <div
                                        key={slot.id}

                                        className={`
                                            flex flex-col items-center

                                            rounded-2xl border

                                            p-4

                                            transition

                                            ${isBooked

                                                ? `
                                                    border-yellow-200
                                                    bg-yellow-50
                                                `

                                                : isPending

                                                    ? `
                                                        border-orange-200
                                                        bg-orange-50
                                                    `

                                                    : isAvailable

                                                        ? `
                                                            border-green-200
                                                            bg-green-50
                                                        `

                                                        : `
                                                            border-red-200
                                                            bg-red-50
                                                        `
                                            }
                                        `}
                                    >

                                        <p
                                            className="
                                                text-center

                                                text-sm font-semibold

                                                text-[#0B2E28]
                                            "
                                        >

                                            {formatTime(
                                                slot.startTimeUTC
                                            )}

                                            {" "}–{" "}

                                            {formatTime(
                                                slot.endTimeUTC
                                            )}

                                        </p>

                                        <span
                                            className={`
                                                mt-3

                                                inline-flex items-center

                                                rounded-full

                                                px-3 py-1

                                                text-xs font-semibold

                                                ${slot.category === "FIRST_TIME"

                                                    ? `
                                                        bg-blue-100
                                                        text-blue-700
                                                    `

                                                    : `
                                                        bg-emerald-100
                                                        text-emerald-700
                                                    `
                                                }
                                            `}
                                        >

                                            {slot.category ===
                                                "FIRST_TIME"

                                                ? "First Time"

                                                : "Follow Up"}

                                        </span>

                                        <button
                                            disabled={
                                                isBooked ||
                                                isPending
                                            }

                                            onClick={() =>
                                                handleToggle(
                                                    slot
                                                )
                                            }

                                            className="
                                                mt-4

                                                rounded-full

                                                bg-[#38D6C4]

                                                px-4 py-1.5

                                                text-xs font-medium

                                                text-white

                                                transition

                                                hover:opacity-90

                                                disabled:cursor-not-allowed
                                                disabled:bg-gray-300
                                            "
                                        >

                                            {isBooked

                                                ? "Booked"

                                                : isPending

                                                    ? "Reserved"

                                                    : isAvailable

                                                        ? "Deactivate"

                                                        : "Activate"}

                                        </button>

                                    </div>
                                );
                            }
                        )}

                    </div>

                    {/* =====================================================
                       FOOTER
                       ===================================================== */}

                    <div
                        className="
                            rounded-b-2xl

                            border-t border-gray-200

                            bg-[#F4FBF9]

                            p-4
                        "
                    />

                </div>

            </div>

            {/* =====================================================
               CONFIRM MODAL
               ===================================================== */}

            <ConfirmModal
                open={confirmOpen}
                message={confirmMessage}
                loading={loading}
                onConfirm={confirmAction}
                onCancel={() =>
                    setConfirmOpen(false)
                }
            />
        </>
    );
}

/* =============================================================
   HELPERS
   ============================================================= */

const formatTime = (
    utc: string
) => {

    return new Date(
        utc
    ).toLocaleTimeString(
        [],
        {
            hour: "2-digit",
            minute: "2-digit",
        }
    );
};