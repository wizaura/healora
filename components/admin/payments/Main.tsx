"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export default function AdminAnalytics() {

    const [range, setRange] = useState<"daily" | "weekly" | "monthly">("daily");

    const { data, isLoading } = useQuery({
        queryKey: ["admin-analytics", range],
        queryFn: async () => {
            const res = await api.get(`/admin/payments/analytics?range=${range}`);
            return res.data;
        }
    });

    if (isLoading) {
        return <div className="pt-32 text-center">Loading analytics...</div>;
    }

    return (
        <div className="pt-28 px-6 max-w-7xl mx-auto space-y-10">

            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                <div>
                    <h1 className="text-3xl font-semibold text-navy">
                        Revenue Analytics
                    </h1>
                    <p className="text-sm text-navy/60 mt-1">
                        Monitor platform revenue and doctor performance
                    </p>
                </div>

                {/* FILTER */}
                <div className="flex gap-2 bg-slate-100 p-1 rounded-xl w-fit">
                    {["daily", "weekly", "monthly"].map((r) => (
                        <button
                            key={r}
                            onClick={() => setRange(r as any)}
                            className={`
                                px-4 py-2 text-sm rounded-lg capitalize
                                ${range === r
                                    ? "bg-white shadow text-slate-900"
                                    : "text-slate-600 hover:bg-white/60"
                                }
                            `}
                        >
                            {r}
                        </button>
                    ))}
                </div>

            </div>

            {/* TOP CARDS */}
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">

                <Card title="Total Revenue" value={`₹${data.totalRevenue}`} highlight />

                <Card title="Slot Revenue" value={`₹${data.breakdown.slotRevenue}`} />

                <Card title="Consultation Revenue" value={`₹${data.breakdown.consultationRevenue}`} />

                <Card title="Prescription Revenue" value={`₹${data.breakdown.prescriptionRevenue}`} />

            </div>

            {/* TRANSACTION INFO */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex justify-between items-center">
                <div>
                    <p className="text-sm text-gray-500">Total Transactions</p>
                    <p className="text-xl font-semibold">
                        {data.counts.totalTransactions}
                    </p>
                </div>

                <div className="text-sm text-gray-500">
                    Showing {range} data
                </div>
            </div>

            {/* DOCTOR PERFORMANCE */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">

                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-semibold text-navy">
                        Doctor Performance
                    </h2>
                </div>

                <div className="space-y-4">

                    {data.doctorStats.map((doc: any) => (

                        <div
                            key={doc.doctorId}
                            className="p-4 rounded-xl border border-gray-200 bg-slate-50 hover:bg-white transition"
                        >

                            <div className="flex justify-between items-center mb-2">

                                <p className="font-medium text-navy">
                                    {doc.name}
                                </p>

                                <p className="font-semibold text-teal-600">
                                    ₹{doc.totalRevenue}
                                </p>

                            </div>

                            {/* BREAKDOWN */}
                            <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">

                                <Stat label="Slot" value={doc.slotRevenue} />
                                <Stat label="Consultation" value={doc.consultationRevenue} />
                                <Stat label="Prescription" value={doc.prescriptionRevenue} />

                            </div>

                            {/* FOOTER */}
                            <div className="mt-3 text-xs text-gray-500">
                                {doc.transactions} transactions
                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </div>
    );
}

/* ---------------- CARD ---------------- */

function Card({ title, value, highlight }: any) {
    return (
        <div
            className={`
                rounded-2xl p-5 border border-gray-200 shadow-sm
                ${highlight ? "bg-teal-600 text-white" : "bg-white"}
            `}
        >
            <p className={`text-sm ${highlight ? "text-white/80" : "text-gray-500"}`}>
                {title}
            </p>

            <p className="text-2xl font-semibold mt-1">
                {value}
            </p>
        </div>
    );
}

/* ---------------- STAT ---------------- */

function Stat({ label, value }: any) {
    return (
        <div>
            <p className="text-xs text-gray-400">{label}</p>
            <p className="font-medium">₹{value}</p>
        </div>
    );
}