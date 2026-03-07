"use client";

import { useState } from "react";
import DoctorsTable from "./DoctorTable";
import PendingUpdatesTable from "./PendingUpdatesTable";
import Link from "next/link";

export default function DoctorsPage() {
    const [tab, setTab] = useState<"doctors" | "pending">("doctors");

    return (
        <div className="p-8 pt-24">

            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-semibold text-slate-900">
                    Doctor Management
                </h1>
                <p className="text-sm text-slate-500">
                    Manage doctors and profile update approvals
                </p>
            </div>

            {/* Tabs + Add Button */}
            <div className="mb-6 flex items-center justify-between">

                {/* Tabs */}
                <div className="flex gap-3">

                    <button
                        onClick={() => setTab("doctors")}
                        className={`px-4 py-2 rounded-lg text-sm font-medium ${tab === "doctors"
                                ? "bg-teal-600 text-white"
                                : "bg-slate-100 text-slate-700"
                            }`}
                    >
                        Doctors
                    </button>

                    <button
                        onClick={() => setTab("pending")}
                        className={`px-4 py-2 rounded-lg text-sm font-medium ${tab === "pending"
                                ? "bg-teal-600 text-white"
                                : "bg-slate-100 text-slate-700"
                            }`}
                    >
                        Pending Profile Updates
                    </button>

                </div>

                {/* Add Doctor Button */}
                <Link
                    href="/admin/doctors/add"
                    className="px-4 py-2 rounded-lg bg-teal-600 text-white text-sm font-medium hover:bg-teal-700 transition"
                >
                    + Add Doctor
                </Link>

            </div>

            {/* Content */}
            {tab === "doctors" && <DoctorsTable />}
            {tab === "pending" && <PendingUpdatesTable />}

        </div>
    );
}