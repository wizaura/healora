"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "@/lib/api";

import SymptomsPage from "./symptoms/Main";
import CausesPage from "./causes/Main";
import RiskFactorsPage from "./risk-factors/Main";
import LanguagesPage from "./languages/Main";
import GreetingBannerSettings from "./greetings/Main";
import GreetingBannerList from "./greetings/List";

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
                {/* TABS */}
                <div className="flex flex-wrap gap-2 p-1 bg-slate-100 rounded-xl w-fit">

                    {tabs.map((tab) => {

                        const isActive = activeTab === tab;

                        return (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`
                    px-4 py-2
                    rounded-lg
                    text-sm
                    font-medium
                    capitalize
                    transition-all
                    duration-200
                    ${isActive
                                        ? "bg-white text-slate-900 shadow-sm"
                                        : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
                                    }
                `}
                            >
                                {tab.replace("-", " ")}
                            </button>
                        );

                    })}

                </div>


                {/* TAB CONTENT */}
                <div className="pt-6">
                    {renderTabContent()}
                </div>
            </section>

            <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-8">

                {/* HEADER */}

                <div>
                    <h2 className="text-lg font-medium text-navy">
                        Greeting Banner
                    </h2>
                    <p className="text-sm text-navy/50">
                        Display a greeting image on the homepage for specific dates
                    </p>
                </div>


                {/* LIST */}

                <div className="space-y-4">

                    <h3 className="text-sm font-medium text-navy/80">
                        Existing Greeting
                    </h3>

                    <GreetingBannerList />

                </div>


                {/* FORM */}

                <div className="border-t border-gray-100 pt-6">

                    <h3 className="text-sm font-medium text-navy/80 mb-4">
                        Add / Update Greeting
                    </h3>

                    <GreetingBannerSettings />

                </div>

            </section>
        </div>
    );
}