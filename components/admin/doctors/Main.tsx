"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

import DoctorsTable from "./DoctorTable";
import DisabledDoctorsTable from "./DisabledDoctors";
import PendingUpdatesTable from "./PendingUpdatesTable";
import DoctorForm from "./DoctorForm";

export default function DoctorsPage() {

    const [tab, setTab] = useState<"doctors" | "disabled" | "pending">("doctors");
    const [formDoctor, setFormDoctor] = useState<any>(null);

    const { data: doctors = [], refetch } = useQuery({
        queryKey: ["doctors"],
        queryFn: async () => {
            const res = await api.get("/admin/doctors");
            return res.data;
        },
    });

    const closeForm = () => {
        setFormDoctor(null);
        refetch();
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
                            setFormDoctor(null);
                        }}
                        className={`px-4 py-2 rounded-lg text-sm font-medium ${
                            tab === "doctors"
                                ? "bg-teal-600 text-white"
                                : "bg-slate-100 text-slate-700"
                        }`}
                    >
                        Active Doctors
                    </button>

                    <button
                        onClick={() => {
                            setTab("disabled");
                            setFormDoctor(null);
                        }}
                        className={`px-4 py-2 rounded-lg text-sm font-medium ${
                            tab === "disabled"
                                ? "bg-teal-600 text-white"
                                : "bg-slate-100 text-slate-700"
                        }`}
                    >
                        Disabled Doctors
                    </button>

                    <button
                        onClick={() => {
                            setTab("pending");
                            setFormDoctor(null);
                        }}
                        className={`px-4 py-2 rounded-lg text-sm font-medium ${
                            tab === "pending"
                                ? "bg-teal-600 text-white"
                                : "bg-slate-100 text-slate-700"
                        }`}
                    >
                        Pending Updates
                    </button>

                </div>

                {tab === "doctors" && (
                    <button
                        onClick={() => setFormDoctor({})}
                        className="px-4 py-2 rounded-lg bg-teal-600 text-white text-sm font-medium hover:bg-teal-700"
                    >
                        + Add Doctor
                    </button>
                )}

            </div>

            {/* Form */}
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
                    doctors={doctors}
                    onEdit={(doc: any) => setFormDoctor(doc)}
                    refetch={refetch}
                />
            )}

            {tab === "disabled" && (
                <DisabledDoctorsTable
                    doctors={doctors}
                    refetch={refetch}
                />
            )}

            {tab === "pending" && <PendingUpdatesTable />}

        </div>
    );
}