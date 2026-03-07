"use client";

import { useState } from "react";
import DoctorsTable from "./DoctorTable";
import PendingUpdatesTable from "./PendingUpdatesTable";
import DoctorForm from "./DoctorForm";

export default function DoctorsPage() {

    const [tab, setTab] = useState<"doctors" | "pending">("doctors");

    const [formDoctor, setFormDoctor] = useState<any>(null);
    const [refresh, setRefresh] = useState(0);

    const closeForm = () => {
        setFormDoctor(null);
        setRefresh((r) => r + 1);
    };

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

            {/* Tabs */}
            <div className="mb-6 flex items-center justify-between">

                <div className="flex gap-3">

                    <button
                        onClick={() => {
                            setTab("doctors");
                            closeForm();
                        }}
                        className={`cursor-pointer px-4 py-2 rounded-lg text-sm font-medium ${tab === "doctors"
                                ? "bg-teal-600 text-white"
                                : "bg-slate-100 text-slate-700"
                            }`}
                    >
                        Doctors
                    </button>

                    <button
                        onClick={() => {
                            setTab("pending");
                            closeForm();
                        }}
                        className={`cursor-pointer px-4 py-2 rounded-lg text-sm font-medium ${tab === "pending"
                                ? "bg-teal-600 text-white"
                                : "bg-slate-100 text-slate-700"
                            }`}
                    >
                        Pending Profile Updates
                    </button>

                </div>

                {tab === "doctors" && (
                    <button
                        onClick={() =>
                            setFormDoctor({}) // empty = add mode
                        }
                        className="cursor-pointer px-4 py-2 rounded-lg bg-teal-600 text-white text-sm font-medium hover:bg-teal-700"
                    >
                        + Add Doctor
                    </button>
                )}

            </div>

            {/* Single Form (Add + Edit) */}
            {formDoctor !== null && (
                <DoctorForm
                    doctor={formDoctor?.id ? formDoctor : undefined}
                    onSuccess={closeForm}
                    onClose={() => setFormDoctor(null)}
                />
            )}

            {/* Tables */}
            {tab === "doctors" && (
                <DoctorsTable
                    key={refresh}
                    onEdit={(doc: any) => setFormDoctor(doc)}
                />
            )}

            {tab === "pending" && <PendingUpdatesTable />}

        </div>
    );
}