"use client";

import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api";
import toast from "react-hot-toast";
import DoctorForm from "./DoctorForm";
import DoctorViewModal from "./DoctorViewModal";

type Doctor = {
    id: string;
    name: string;
    email: string;
    isActive: boolean;
    doctor: {
        id: string;
        isApproved: boolean;
        experience: number;
        qualification: string;
        consultationFee: number;
        bio?: string;
        speciality?: {
            name: string;
        };
        subSpecialities?: {
            subSpeciality: {
                id: string;
                name: string;
            };
        }[];
    } | null;
};

export default function DoctorsTable({onEdit}: any) {
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [loading, setLoading] = useState(true);

    const [viewDoctor, setViewDoctor] = useState<Doctor | null>(null);

    const fetchDoctors = async () => {
        const res = await api.get("/admin/doctors");
        setDoctors(res.data);
        setLoading(false);
    };

    useEffect(() => {
        fetchDoctors();
    }, []);

    /* ---------------- APPROVE / DISABLE ---------------- */

    const approveMutation = useMutation({
        mutationFn: ({
            id,
            isApproved,
        }: {
            id: string;
            isApproved: boolean;
        }) =>
            api.patch(`/doctor/${id}/approval`, {
                isApproved,
            }),

        onSuccess: (_, variables) => {
            toast.success(
                variables.isApproved
                    ? "Doctor approved"
                    : "Doctor disabled"
            );
            fetchDoctors();
        },

        onError: () => {
            toast.error("Failed to update approval status");
        },
    });

    if (loading) return <div>Loading doctors...</div>;

    return (
        <>

            {/* VIEW MODAL */}
            <DoctorViewModal
                open={!!viewDoctor}
                doctor={viewDoctor}
                onClose={() => setViewDoctor(null)}
            />

            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                <table className="w-full text-sm">

                    <thead className="bg-slate-50">
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
                                className="border-t border-gray-200 hover:bg-slate-50"
                            >
                                {/* Doctor */}
                                <td className="px-5 py-4 font-medium">
                                    {doc.name}
                                </td>

                                {/* Email */}
                                <td className="px-5 py-4 text-slate-600">
                                    {doc.email}
                                </td>

                                {/* Active Status */}
                                <td className="px-5 py-4">
                                    <span
                                        className={`rounded-full px-3 py-1 text-xs ${
                                            doc.isActive
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
                                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">
                                            Approved
                                        </span>
                                    ) : (
                                        <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs">
                                            Pending
                                        </span>
                                    )}
                                </td>

                                {/* Actions */}
                                <td className="px-5 py-4 text-right">
                                    <div className="flex justify-end gap-4">

                                        {/* View */}
                                        <button
                                            onClick={() => setViewDoctor(doc)}
                                            className="cursor-pointer text-xs font-medium text-indigo-600 hover:underline"
                                        >
                                            View
                                        </button>

                                        {/* Edit */}
                                        <button
                                            onClick={() => onEdit(doc)}
                                            className="cursor-pointer text-xs font-medium text-blue-600 hover:underline"
                                        >
                                            Edit
                                        </button>

                                        {/* Approve / Disable */}
                                        {doc?.doctor?.isApproved ? (
                                            <button
                                                onClick={() =>
                                                    approveMutation.mutate({
                                                        id: doc.id,
                                                        isApproved: false,
                                                    })
                                                }
                                                className="cursor-pointer text-xs font-medium text-red-600 hover:underline"
                                            >
                                                Disable
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() =>
                                                    approveMutation.mutate({
                                                        id: doc.id,
                                                        isApproved: true,
                                                    })
                                                }
                                                className="cursor-pointer text-xs font-medium text-teal-600 hover:underline"
                                            >
                                                Approve
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
                                    className="text-center py-10 text-slate-500"
                                >
                                    No doctors found
                                </td>
                            </tr>
                        )}
                    </tbody>

                </table>
            </div>
        </>
    );
}