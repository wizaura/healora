"use client";

import api from "@/lib/api";
import { Trash2, X } from "lucide-react";
import { Availability, Slot } from "./ExistingAvailability";
import { useState } from "react";
import ConfirmModal from "@/components/common/ConfirmModal";

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
    const [slots, setSlots] = useState(day.slots);
    const [loading, setLoading] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [confirmAction, setConfirmAction] = useState<() => void>(() => { });
    const [confirmMessage, setConfirmMessage] = useState("");

    const total = slots.length;
    const active = slots.filter(s => s.status === "AVAILABLE").length;
    const booked = slots.filter(s => s.status === "BOOKED").length;

    /* ---------- SLOT TOGGLE ---------- */

    const handleToggle = (slot: Slot) => {
        if (slot.status === "BOOKED") return;

        const newStatus =
            slot.status === "AVAILABLE" ? "INACTIVE" : "AVAILABLE";

        setConfirmMessage(
            `Are you sure you want to mark this slot as ${newStatus}?`
        );

        setConfirmAction(() => async () => {
            try {
                setLoading(true);

                const res = await api.patch(
                    `/availability/slot/${slot.id}`,
                    { status: newStatus }
                );

                setSlots(prev =>
                    prev.map(s =>
                        s.id === slot.id
                            ? { ...s, status: newStatus }
                            : s
                    )
                );

                console.log(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
                setConfirmOpen(false);
            }
        });

        setConfirmOpen(true);
    };

    /* ---------- DELETE DAY ---------- */

    const handleDelete = () => {
        setConfirmMessage(
            "This will remove all slots for this day. Continue?"
        );

        setConfirmAction(() => async () => {
            try {
                setLoading(true);
                const res = await api.delete(
                    `/availability/block/${day.id}`
                );

                console.log(res.data);

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
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                <div className="w-full max-w-3xl bg-white rounded-xl shadow-xl flex flex-col max-h-[90vh]">

                    {/* HEADER */}
                    <div className="p-4 border-b border-gray-300 rounded-tl-xl rounded-tr-xl bg-[#F4FBF9]">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-xl font-semibold text-[#0B2E28]">
                                    {new Date(day.date).toLocaleDateString(undefined, {
                                        weekday: "long",
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric",
                                    })}
                                </h3>

                                <div className="flex gap-6 mt-2 text-sm">
                                    <span>Total: {total}</span>
                                    <span className="text-[#1F9E8E]">
                                        Active: {active}
                                    </span>
                                    <span className="text-yellow-600">
                                        Booked: {booked}
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center my-auto gap-4">
                                <button
                                    onClick={handleDelete}
                                    className="flex items-center gap-2 border px-2 py-1 rounded-md cursor-pointer text-red-500 hover:text-red-700"
                                >
                                    <Trash2 size={20} />
                                    Delete
                                </button>
                                <button
                                    onClick={onClose}
                                    className="cursor-pointer text-black hover:text-red-500"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* SCROLLABLE */}
                    <div className="flex-1 overflow-y-auto p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                        {slots.map((slot) => {
                            const isAvailable =
                                slot.status === "AVAILABLE";
                            const isBooked =
                                slot.status === "BOOKED";

                            return (
                                <div
                                    key={slot.id}
                                    className={`rounded-xl border p-3 flex flex-col items-center transition ${isBooked
                                        ? "bg-yellow-50 border-yellow-200"
                                        : isAvailable
                                            ? "bg-green-50 border-green-200"
                                            : "bg-red-50 border-red-200"
                                        }`}
                                >
                                    <p className="text-sm font-medium text-[#0B2E28]">
                                        {formatTime(slot.startTimeUTC)} –{" "}
                                        {formatTime(slot.endTimeUTC)}
                                    </p>

                                    <button
                                        disabled={isBooked}
                                        onClick={() =>
                                            handleToggle(slot)
                                        }
                                        className="mt-3 px-3 py-1 text-xs rounded-full bg-[#38D6C4] text-white hover:opacity-90 transition disabled:bg-gray-300"
                                    >
                                        {isBooked
                                            ? "Booked"
                                            : isAvailable
                                                ? "Deactivate"
                                                : "Activate"}
                                    </button>
                                </div>
                            );
                        })}
                    </div>

                    {/* FOOTER */}
                    <div className="p-4 border-t border-gray-300 rounded-br-xl rounded-bl-xl bg-[#F4FBF9] flex justify-end">
                    </div>
                </div>
            </div>

            {/* CONFIRM MODAL */}
            <ConfirmModal
                open={confirmOpen}
                message={confirmMessage}
                loading={loading}
                onConfirm={confirmAction}
                onCancel={() => setConfirmOpen(false)}
            />
        </>
    );
}

/* ---------- HELPERS ---------- */

const formatTime = (utc: string) =>
    new Date(utc).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });
