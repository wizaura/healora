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
import Link from "next/link";

type TabType =
  | "symptoms"
  | "causes"
  | "risk-factors"
  | "languages";

const currencies = ["INR", "USD", "AED", "EUR", "GBP", "CAD"];

const symbols: any = {
  INR: "₹",
  USD: "$",
  AED: "AED",
  EUR: "€",
  GBP: "£",
  CAD: "C$",
};

export default function AdminSettings() {
  const [slotFees, setSlotFees] = useState<any>({
    INR: 0, USD: 0, AED: 0, EUR: 0, GBP: 0, CAD: 0
  });

  const [prescriptionFees, setPrescriptionFees] = useState<any>({
    INR: 0, USD: 0, AED: 0, EUR: 0, GBP: 0, CAD: 0
  });

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] =
    useState<TabType>("symptoms");

  // --------------------------------
  // Fetch Fees
  // --------------------------------
  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true);
      try {
        const res = await api.get("/admin/settings/fees");

        setSlotFees(res.data.slotFee);
        setPrescriptionFees(res.data.prescriptionFee);

      } catch {
        toast.error("Failed to load settings");
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  // --------------------------------
  // Save Slot Fees
  // --------------------------------
  const saveSlotFees = async () => {
    setSaving(true);
    try {
      await api.put("/admin/settings/slot-fee", slotFees);
      toast.success("Slot fees updated successfully");
    } catch {
      toast.error("Failed to update slot fees");
    } finally {
      setSaving(false);
    }
  };

  // --------------------------------
  // Save Prescription Fees
  // --------------------------------
  const savePrescriptionFees = async () => {
    setSaving(true);
    try {
      await api.put("/admin/settings/prescription-fee", prescriptionFees);
      toast.success("Prescription fees updated successfully");
    } catch {
      toast.error("Failed to update prescription fees");
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

      <Link
        href={"/admin/settings/faqs"}
        className="px-4 py-2 bg-navy rounded-md text-white w-fit"
      >
        FAQ Settings
      </Link>

      {/* BOOKING SETTINGS */}
      <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h2 className="text-lg font-medium text-navy mb-6">
          Booking & Prescription Fees (Multi Currency)
        </h2>

        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="space-y-6">

            {/* TABLE HEADER */}
            <div className="grid grid-cols-3 gap-4 font-medium text-navy border-b pb-2">
              <div>Currency</div>
              <div>Slot Fee</div>
              <div>Prescription Fee</div>
            </div>

            {/* TABLE ROWS */}
            {currencies.map((currency) => (
              <div
                key={currency}
                className="grid grid-cols-3 gap-4 items-center"
              >
                <div className="text-navy">
                  {currency} ({symbols[currency]})
                </div>

                {/* Slot Fee */}
                <input
                  type="number"
                  value={slotFees[currency]}
                  onChange={(e) =>
                    setSlotFees({
                      ...slotFees,
                      [currency]: Number(e.target.value),
                    })
                  }
                  className="rounded-xl border border-gray-200 px-4 py-2"
                />

                {/* Prescription Fee */}
                <input
                  type="number"
                  value={prescriptionFees[currency]}
                  onChange={(e) =>
                    setPrescriptionFees({
                      ...prescriptionFees,
                      [currency]: Number(e.target.value),
                    })
                  }
                  className="rounded-xl border border-gray-200 px-4 py-2"
                />
              </div>
            ))}

            {/* SAVE BUTTONS */}
            <div className="flex gap-4 pt-4">
              <button
                onClick={saveSlotFees}
                disabled={saving}
                className="px-4 py-2 bg-wellness-accent text-white rounded-xl"
              >
                Save Slot Fees
              </button>

              <button
                onClick={savePrescriptionFees}
                disabled={saving}
                className="px-4 py-2 bg-navy text-white rounded-xl"
              >
                Save Prescription Fees
              </button>
            </div>

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

      {/* GREETING BANNER */}
      <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-8">

        <div>
          <h2 className="text-lg font-medium text-navy">
            Greeting Banner
          </h2>
          <p className="text-sm text-navy/50">
            Display a greeting image on the homepage for specific dates
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-medium text-navy/80">
            Existing Greeting
          </h3>
          <GreetingBannerList />
        </div>

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