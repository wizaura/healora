"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import DoctorsTable from "./DoctorTable";
import DisabledDoctorsTable from "./DisabledDoctors";
import PendingUpdatesTable from "./PendingUpdatesTable";
import DoctorForm from "./DoctorForm";
import { DoctorService } from "@/services/doctor.service";

export default function DoctorsPage() {

    const [tab, setTab] = useState<"doctors" | "disabled" | "pending">("doctors");
    const [formDoctor, setFormDoctor] = useState<any>(null);

    /* ---------------- FILTERS ---------------- */
    const [search, setSearch] = useState("");
    const [specialityId, setSpecialityId] = useState("");
    const [languageId, setLanguageId] = useState("");
    const [approval, setApproval] = useState("");
    const [sort, setSort] = useState("new");

    const { data: doctors = [], refetch } = useQuery({

        queryKey: [
            "doctors",
            search,
            specialityId,
            languageId,
            approval,
            sort,
        ],

        queryFn: async () => {

            const doctors =
                await DoctorService.getDoctors({

                    search,
                    specialityId,
                    languageId,
                    approval,
                    sort,
                });

            return [...doctors].sort((a, b) => {

                const aHasPending =
                    (a.doctor?.profileUpdates?.length || 0) > 0;

                const bHasPending =
                    (b.doctor?.profileUpdates?.length || 0) > 0;

                if (
                    aHasPending &&
                    !bHasPending
                ) {

                    return -1;
                }

                if (
                    !aHasPending &&
                    bHasPending
                ) {

                    return 1;
                }

                return 0;
            });
        },
    });

    const { data: specialities = [] } = useQuery({
        queryKey: ["specialities"],

        queryFn: () =>
            DoctorService.getSpecialities(),
    });

    const { data: languages = [] } = useQuery({
        queryKey: ["languages"],

        queryFn: () =>
            DoctorService.getLanguages(),
    });

    const closeForm = () => {
        setFormDoctor(null);
        refetch();
    };

    return (
        <div className="">

            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-semibold text-slate-900">
                    Doctor Management
                </h1>
                <p className="text-sm text-slate-500">
                    Manage doctors, approvals, and profile updates
                </p>
            </div>

            {/* Tabs */}
            <div className="mb-6 flex items-center justify-between">
                <div className="flex gap-3">
                    {["doctors", "pending", "disabled"].map((t) => (
                        <button
                            key={t}
                            onClick={() => {
                                setTab(t as any);
                                setFormDoctor(null);
                            }}
                            className={`px-4 py-2 rounded-lg text-sm font-medium ${tab === t
                                ? "bg-teal-600 text-white"
                                : "bg-slate-100 text-slate-700"
                                }`}
                        >
                            {t === "doctors" && "Active Doctors"}
                            {t === "disabled" && "Disabled Doctors"}
                            {t === "pending" && "Pending Updates"}
                        </button>
                    ))}
                </div>

                {tab === "doctors" && (
                    <button
                        onClick={() => setFormDoctor({})}
                        className="px-4 py-2 rounded-lg bg-teal-600 text-white text-sm font-medium"
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
                    specialities={specialities}
                    languages={languages}
                    search={search}
                    setSearch={setSearch}
                    setSpecialityId={setSpecialityId}
                    setLanguageId={setLanguageId}
                    setApproval={setApproval}
                    setSort={setSort}
                    onEdit={(doc: any) => {

                        setFormDoctor(doc);

                        window.scrollTo({
                            top: 0,
                            behavior: "smooth",
                        });
                    }}
                    refetch={refetch}
                />
            )}

            {tab === "disabled" && (
                <DisabledDoctorsTable doctors={doctors} refetch={refetch} />
            )}

            {tab === "pending" && <PendingUpdatesTable />}
        </div>
    );
}