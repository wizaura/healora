"use client";

import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api";
import Link from "next/link";
import { Plus, User } from "lucide-react";
import toast from "react-hot-toast";
import DoctorViewModal from "./DoctorViewModal";

type Doctor = {
    id: string;
    name: string;
    email: string;
    isActive: boolean;
    doctor: DoctorProfile | null;
};

type DoctorProfile = {
    id: string;
    isApproved: boolean;
    isActive: boolean;
    experience: number;
    qualification: string;
    slotFee: number;

    speciality: {
        name: string;
    };

    subSpecialities?: {
        subSpeciality: {
            id: string;
            name: string;
        };
    }[];
};


export default function DoctorsList() {
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [loading, setLoading] = useState(true);
    const [viewDoctor, setViewDoctor] = useState<Doctor | null>(null);

    /* ---------------- FETCH ---------------- */

    const fetchDoctors = async () => {
        const res = await api.get("/admin/doctors");
        setDoctors(res.data);
        setLoading(false);
        console.log(res, 'doc')
    };

    useEffect(() => {
        fetchDoctors();
    }, []);

    /* ---------------- APPROVE / REJECT ---------------- */

    const approveMutation = useMutation({
        mutationFn: ({
            id,
            isApproved,
        }: {
            id: string;
            isApproved: boolean;
        }) =>
            api.patch(`/doctor/${id}/approve`, {
                isApproved,
            }),

        onSuccess: (_, variables) => {
            toast.success(
                variables.isApproved
                    ? "Doctor approved"
                    : "Doctor rejected"
            );
            fetchDoctors();
        },

        onError: () => {
            toast.error("Failed to update approval status");
        },
    });

    if (loading) {
        return (
            <div className="p-8 pt-24 text-slate-500">
                Loading doctors…
            </div>
        );
    }

    return (
        <div className="p-8 pt-24">
            {/* Header */}
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-slate-900">
                        Doctors
                    </h1>
                    <p className="mt-1 text-sm text-slate-500">
                        Manage registered doctors and approvals
                    </p>
                </div>

                <Link
                    href="/admin/doctors/add"
                    className="
                        inline-flex items-center gap-2 rounded-xl
                        bg-teal-600 px-4 py-2
                        text-sm font-semibold text-white
                        transition hover:bg-teal-700 hover:shadow-md
                        active:scale-[0.98]
                    "
                >
                    <Plus size={16} />
                    Add Doctor
                </Link>
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <table className="w-full text-sm">
                    <thead className="bg-slate-50 text-slate-600">
                        <tr>
                            <th className="px-5 py-3 text-left">Doctor</th>
                            <th className="px-5 py-3 text-left">Email</th>
                            <th className="px-5 py-3 text-left">Status</th>
                            <th className="px-5 py-3 text-left">Approval</th>
                            <th className="px-5 py-3 text-right">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {doctors.map((doc) => (
                            <tr
                                key={doc.id}
                                className="border-t hover:bg-slate-50 transition"
                            >
                                {/* Doctor */}
                                <td className="px-5 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                                            <User size={16} />
                                        </div>
                                        <span className="font-medium text-slate-900">
                                            {doc.name}
                                        </span>
                                    </div>
                                </td>

                                {/* Email */}
                                <td className="px-5 py-4 text-slate-600">
                                    {doc.email}
                                </td>

                                {/* Active Status */}
                                <td className="px-5 py-4">
                                    <span
                                        className={`rounded-full px-3 py-1 text-xs font-medium
                                            ${doc.isActive
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-700"
                                            }`}
                                    >
                                        {doc.isActive ? "Active" : "Inactive"}
                                    </span>
                                </td>

                                {/* Approval Status */}
                                <td className="px-5 py-4">
                                    {doc?.doctor?.isApproved ? (
                                        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                                            Approved
                                        </span>
                                    ) : (
                                        <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700">
                                            Pending
                                        </span>
                                    )}
                                </td>

                                {/* Actions */}
                                <td className="px-5 py-4 text-right">
                                    <div className="inline-flex gap-3">
                                        <button
                                            onClick={() => setViewDoctor(doc)}
                                            className="text-xs font-medium text-indigo-600 hover:underline"
                                        >
                                            View
                                        </button>

                                        {!doc?.doctor?.isApproved && (
                                            <button
                                                onClick={() =>
                                                    approveMutation.mutate({
                                                        id: doc.id,
                                                        isApproved: true,
                                                    })
                                                }
                                                className="text-xs font-medium text-teal-600 hover:underline"
                                            >
                                                Approve
                                            </button>
                                        )}

                                        {doc?.doctor?.isApproved && (
                                            <button
                                                onClick={() =>
                                                    approveMutation.mutate({
                                                        id: doc.id,
                                                        isApproved: false,
                                                    })
                                                }
                                                className="text-xs font-medium text-red-600 hover:underline"
                                            >
                                                Reject
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}

                        {doctors.length === 0 && (
                            <tr>
                                <td
                                    colSpan={5}
                                    className="px-5 py-10 text-center text-slate-500"
                                >
                                    No doctors found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <DoctorViewModal
                open={!!viewDoctor}
                doctor={viewDoctor}
                onClose={() => setViewDoctor(null)}
            />
        </div>
    );
}
