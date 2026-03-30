"use client";

import { useState } from "react";
import api from "@/lib/api";
import toast from "react-hot-toast";
import DoctorViewModal from "./DoctorViewModal";
import ConfirmModal from "@/components/common/ConfirmModal";

export default function DoctorsTable({
    doctors,
    specialities,
    languages,
    search,
    setSearch,
    setSpecialityId,
    setLanguageId,
    setApproval,
    setSort,
    onEdit,
    refetch
}: any) {

    const [viewDoctor, setViewDoctor] = useState<any>(null);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [actionDoctor, setActionDoctor] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const openDisable = (doc: any) => {
        setActionDoctor(doc);
        setConfirmOpen(true);
    };

    const handleConfirm = async () => {
        if (!actionDoctor) return;

        setLoading(true);
        try {
            await api.patch(`/doctor/${actionDoctor.id}/approval`, {
                isApproved: false,
            });

            toast.success("Doctor disabled");
            refetch();
        } catch {
            toast.error("Failed to disable doctor");
        }

        setLoading(false);
        setConfirmOpen(false);
        setActionDoctor(null);
    };

    const activeDoctors = doctors.filter(
        (d: any) => d?.doctor?.isApproved === true
    );

    return (
        <>
            <DoctorViewModal
                open={!!viewDoctor}
                doctor={viewDoctor}
                onClose={() => setViewDoctor(null)}
            />

            <ConfirmModal
                open={confirmOpen}
                title="Disable doctor?"
                message={`Are you sure you want to disable ${actionDoctor?.name}?`}
                confirmText="Disable"
                cancelText="Cancel"
                loading={loading}
                onConfirm={handleConfirm}
                onCancel={() => setConfirmOpen(false)}
            />

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">

                {/* FILTER BAR */}
                <div className="p-5 border-b border-gray-200 flex flex-wrap gap-3">

                    <input
                        type="text"
                        placeholder="Search doctor..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-60"
                    />

                    <select
                        onChange={(e) => setSpecialityId(e.target.value)}
                        className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
                    >
                        <option value="">All Specialities</option>
                        {specialities?.map((s: any) => (
                            <option key={s.id} value={s.id}>
                                {s.name}
                            </option>
                        ))}
                    </select>

                    <select
                        onChange={(e) => setLanguageId(e.target.value)}
                        className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
                    >
                        <option value="">All Languages</option>
                        {languages?.map((l: any) => (
                            <option key={l.id} value={l.id}>
                                {l.name}
                            </option>
                        ))}
                    </select>

                    <select
                        onChange={(e) => setApproval(e.target.value)}
                        className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
                    >
                        <option value="">All Status</option>
                        <option value="approved">Approved</option>
                        <option value="pending">Pending</option>
                    </select>

                    <select
                        onChange={(e) => setSort(e.target.value)}
                        className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
                    >
                        <option value="new">Newest</option>
                        <option value="old">Oldest</option>
                        <option value="experience">Experience</option>
                        <option value="fee">Fee</option>
                    </select>

                </div>

                {/* TABLE */}
                <table className="w-full text-sm">

                    <thead className="bg-slate-50">
                        <tr>
                            <th className="px-5 py-3 text-left">Doctor</th>
                            <th className="px-5 py-3 text-left">Speciality</th>
                            <th className="px-5 py-3 text-left">Experience</th>
                            <th className="px-5 py-3 text-left">Fee</th>
                            <th className="px-5 py-3 text-left">Status</th>
                            <th className="px-5 py-3 text-right">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {activeDoctors.map((doc: any) => (
                            <tr
                                key={doc.id}
                                className="border-t border-gray-200 hover:bg-slate-50"
                            >
                                <td className="px-5 py-4">
                                    <div className="font-medium">{doc.name}</div>
                                    <div className="text-xs text-gray-500">
                                        {doc.email}
                                    </div>
                                </td>

                                <td className="px-5 py-4">
                                    {doc.doctor.specialities
                                        .map((s: any) => s.speciality.name)
                                        .join(", ")}
                                </td>

                                <td className="px-5 py-4">
                                    {doc.doctor.experience} yrs
                                </td>

                                <td className="px-5 py-4">
                                    ₹{doc.doctor.consultationFeeINR}
                                </td>

                                <td className="px-5 py-4">
                                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">
                                        Approved
                                    </span>

                                    {doc.doctor.profileUpdates.length > 0 && (
                                        <div className="mt-2">
                                            <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs">
                                                Update Pending
                                            </span>
                                        </div>
                                    )}
                                </td>

                                <td className="px-5 py-4 text-right">
                                    <div className="flex justify-end gap-4">
                                        <button
                                            onClick={() => setViewDoctor(doc)}
                                            className="text-indigo-600 text-xs hover:underline"
                                        >
                                            View
                                        </button>

                                        <button
                                            onClick={() => onEdit(doc)}
                                            className="text-blue-600 text-xs hover:underline"
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={() => openDisable(doc)}
                                            className="text-red-600 text-xs hover:underline"
                                        >
                                            Disable
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        </>
    );
}