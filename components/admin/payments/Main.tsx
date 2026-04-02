"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export default function AdminAnalytics() {

    const [range, setRange] = useState<"daily" | "weekly" | "monthly">("daily");
    const [doctorId, setDoctorId] = useState("");

    /* ---------------- GET DOCTORS ---------------- */
    const { data: doctors = [] } = useQuery({
        queryKey: ["doctor-list"],
        queryFn: async () => {
            const res = await api.get("/admin/doctors");
            return res.data;
        }
    });

    console.log(doctors,'sd')

    /* ---------------- GET ANALYTICS ---------------- */
    const { data, isLoading } = useQuery({
        queryKey: ["admin-analytics", range, doctorId],
        queryFn: async () => {
            const res = await api.get(`/admin/payments/analytics`, {
                params: { range, doctorId }
            });
            return res.data;
        }
    });

    if (isLoading) {
        return <div className="pt-32 text-center">Loading analytics...</div>;
    }

    return (
        <div className="max-w-7xl mx-auto space-y-6">

            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                <div>
                    <h1 className="text-3xl font-semibold text-slate-900">
                        Revenue Analytics
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Monitor platform revenue and doctor performance
                    </p>
                </div>

                {/* FILTERS */}
                <div className="flex gap-3 items-center">

                    {/* RANGE FILTER */}
                    <div className="flex gap-2 bg-slate-100 p-1 rounded-xl">
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

                    {/* DOCTOR FILTER */}
                    <select
                        value={doctorId}
                        onChange={(e) => setDoctorId(e.target.value)}
                        className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
                    >
                        <option value="">All Doctors</option>
                        {doctors.map((d: any) => (
                            <option key={d.id} value={d?.doctor?.id}>
                                {d.name}
                            </option>
                        ))}
                    </select>

                </div>

            </div>

            {/* TOP CARDS */}
            <div className="grid sm:grid-cols-2 md:grid-cols-5 gap-6">

                <Card title="Total Revenue" value={`₹${data.totalRevenue}`} highlight />

                <Card title="Slot Revenue" value={`₹${data.breakdown.slotRevenue}`} />

                <Card title="Consultation Revenue" value={`₹${data.breakdown.consultationRevenue}`} />

                <Card title="Prescription Revenue" value={`₹${data.breakdown.prescriptionRevenue}`} />

                <Card title="Pharmacy Revenue" value={`₹${data.breakdown.pharmacyRevenue}`} />

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
                    <h2 className="text-lg font-semibold">
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

                                <p className="font-medium">
                                    {doc.name}
                                </p>

                                <p className="font-semibold text-teal-600">
                                    ₹{doc.totalRevenue}
                                </p>

                            </div>

                            {/* BREAKDOWN */}
                            <div className="grid grid-cols-4 gap-4 text-sm text-gray-600">

                                <Stat label="Slot" value={doc.slotRevenue} />
                                <Stat label="Consultation" value={doc.consultationRevenue} />
                                <Stat label="Prescription" value={doc.prescriptionRevenue} />
                                <Stat label="Pharmacy" value={doc.pharmacyRevenue} />

                            </div>

                            {/* FOOTER */}
                            <div className="mt-3 text-xs text-gray-500">
                                {doc.transactions} transactions
                            </div>

                        </div>

                    ))}

                </div>

            </div>

            {/* TRANSACTIONS TABLE */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">

                <h2 className="text-lg font-semibold mb-4">
                    Transactions
                </h2>

                <table className="w-full text-sm">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="px-4 py-3 text-left">Date</th>
                            <th className="px-4 py-3 text-left">Doctor</th>
                            <th className="px-4 py-3 text-left">Type</th>
                            <th className="px-4 py-3 text-left">Amount</th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.transactions.map((t: any) => (
                            <tr key={t.id} className="border-t border-gray-200">
                                <td className="px-4 py-3">
                                    {new Date(t.date).toLocaleDateString()}
                                </td>
                                <td className="px-4 py-3">{t.doctorName}</td>
                                <td className="px-4 py-3">{t.type}</td>
                                <td className="px-4 py-3 font-medium">
                                    ₹{t.amount}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

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