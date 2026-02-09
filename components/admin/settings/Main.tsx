"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "@/lib/api";

export default function AdminSettings() {
    const [slotFee, setSlotFee] = useState<number>(0);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);

    // Fetch settings
    useEffect(() => {
        const fetchSettings = async () => {
            setLoading(true);
            try {
                const res = await api.get("/settings/slot-fee");
                setSlotFee(res.data.slotFee ?? 0);
            } catch (err) {
                toast.error("Failed to load settings");
            } finally {
                setLoading(false);
            }
        };

        fetchSettings();
    }, []);

    const saveSlotFee = async () => {
        if (slotFee < 0) {
            toast.error("Slot fee cannot be negative");
            return;
        }

        setSaving(true);
        try {
            await api.put("/settings/slot-fee", { slotFee });
            toast.success("Slot fee updated successfully");
        } catch (err) {
            toast.error("Failed to update slot fee");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="p-6 max-w-5xl mx-auto space-y-8 pt-20">
            {/* Page Header */}
            <div>
                <h1 className="text-2xl font-semibold text-navy">
                    Settings
                </h1>
                <p className="text-sm text-navy/60 mt-1">
                    Manage platform-wide configurations for Healora
                </p>
            </div>

            {/* Booking Settings */}
            <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h2 className="text-lg font-medium text-navy mb-1">
                    Booking Settings
                </h2>
                <p className="text-sm text-navy/50 mb-6">
                    Control how appointments are booked on the platform
                </p>

                {loading ? (
                    <div className="text-sm text-navy/50">Loading…</div>
                ) : (
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:gap-6">
                        {/* Input section */}
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-navy mb-1">
                                Slot Booking Fee (₹)
                            </label>

                            <input
                                type="number"
                                value={slotFee}
                                onChange={(e) => setSlotFee(Number(e.target.value))}
                                className="
        w-full rounded-xl border border-gray-200 px-4 py-2
        focus:outline-none focus:ring-2 focus:ring-teal-500
      "
                                min={0}
                            />

                            <span className="text-xs text-navy/50 mt-2">
                                This amount is charged upfront to confirm a booking.
                                Consultation fee is charged separately by the doctor.
                            </span>
                        </div>

                        {/* Save button */}
                        <button
                            onClick={saveSlotFee}
                            disabled={saving}
                            className="
        h-10 px-6 rounded-xl bg-teal-600 text-white font-medium
        hover:bg-teal-700 transition disabled:opacity-50
    "
                        >
                            {saving ? "Saving..." : "Save"}
                        </button>
                    </div>

                )}
            </section>

            {/* Placeholder: Payment Settings */}
            <section className="bg-white rounded-2xl border border-gray-100 p-6 opacity-60">
                <h2 className="text-lg font-medium text-navy mb-1">
                    Payment Settings
                </h2>
                <p className="text-sm text-navy/50">
                    Coming soon - platform fees, taxes, and payment rules
                </p>
            </section>

            {/* Placeholder: General Settings */}
            <section className="bg-white rounded-2xl border border-gray-100 p-6 opacity-60">
                <h2 className="text-lg font-medium text-navy mb-1">
                    General Settings
                </h2>
                <p className="text-sm text-navy/50">
                    Support email, timezone, notifications, and more
                </p>
            </section>
        </div>
    );
}
