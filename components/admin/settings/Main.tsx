"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "@/lib/api";

import SymptomsPage from "./symptoms/Main";
import CausesPage from "./causes/Main";
import RiskFactorsPage from "./risk-factors/Main";
import LanguagesPage from "./languages/Main";

type TabType =
    | "symptoms"
    | "causes"
    | "risk-factors"
    | "languages";

export default function AdminSettings() {
    const [slotFee, setSlotFee] = useState<number>(0);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [activeTab, setActiveTab] =
        useState<TabType>("symptoms");

    // --------------------------------
    // Fetch Slot Fee
    // --------------------------------
    useEffect(() => {
        const fetchSettings = async () => {
            setLoading(true);
            try {
                const res = await api.get("/settings/slot-fee");
                setSlotFee(res.data.slotFee ?? 0);
            } catch {
                toast.error("Failed to load settings");
            } finally {
                setLoading(false);
            }
        };

        fetchSettings();
    }, []);

    // --------------------------------
    // Save Slot Fee
    // --------------------------------
    const saveSlotFee = async () => {
        if (slotFee < 0) {
            toast.error("Slot fee cannot be negative");
            return;
        }

        setSaving(true);
        try {
            await api.put("/settings/slot-fee", { slotFee });
            toast.success("Slot fee updated successfully");
        } catch {
            toast.error("Failed to update slot fee");
        } finally {
            setSaving(false);
        }
    };

    const tabs: TabType[] = [
        "symptoms",
        "causes",
        "risk-factors",
        "languages",
    ];

    const renderTabContent = () => {
        switch (activeTab) {
            case "symptoms":
                return <SymptomsPage />;
            case "causes":
                return <CausesPage />;
            case "risk-factors":
                return <RiskFactorsPage />;
            case "languages":
                return <LanguagesPage />;
            default:
                return null;
        }
    };

    return (
        <div className="p-6 max-w-6xl mx-auto space-y-10 pt-20">
            {/* HEADER */}
            <div>
                <h1 className="text-2xl font-semibold text-navy">
                    Settings
                </h1>
                <p className="text-sm text-navy/60 mt-1">
                    Manage platform-wide configurations for Healora
                </p>
            </div>

            {/* BOOKING SETTINGS */}
            <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h2 className="text-lg font-medium text-navy mb-4">
                    Booking Settings
                </h2>

                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <div className="flex gap-4 items-end">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-navy mb-1">
                                Slot Booking Fee (₹)
                            </label>
                            <input
                                type="number"
                                value={slotFee}
                                onChange={(e) =>
                                    setSlotFee(Number(e.target.value))
                                }
                                className="w-full rounded-xl border border-gray-200 px-4 py-2 focus:ring-2 focus:ring-wellness-accent/30"
                            />
                        </div>

                        <button
                            onClick={saveSlotFee}
                            disabled={saving}
                            className="py-2 px-6 rounded-xl bg-wellness-accent text-white font-medium"
                        >
                            {saving ? "Saving..." : "Save"}
                        </button>
                    </div>
                )}
            </section>

            {/* CONTENT LIBRARY */}
            <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-6">
                <div>
                    <h2 className="text-lg font-medium text-navy">
                        Medical Content Library
                    </h2>
                    <p className="text-sm text-navy/50">
                        Manage reusable medical data
                    </p>
                </div>

                {/* TABS */}
                <div className="flex gap-6 border-b pb-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`text-sm font-medium capitalize transition ${activeTab === tab
                                    ? "text-wellness-accent border-b-2 border-wellness-accent"
                                    : "text-navy/60 hover:text-navy"
                                }`}
                        >
                            {tab.replace("-", " ")}
                        </button>
                    ))}
                </div>

                {/* DYNAMIC TAB CONTENT */}
                <div>{renderTabContent()}</div>
            </section>
        </div>
    );
}