"use client";

import { useState } from "react";
import api from "@/lib/api";
import toast from "react-hot-toast";
import ConfirmModal from "@/components/common/ConfirmModal";

export default function DisabledDoctorsTable({ doctors, refetch }: any) {

    const [search, setSearch] = useState("");
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [actionData, setActionData] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const openConfirm = (type: string, doc: any) => {
        setActionData({ type, doc });
        setConfirmOpen(true);
    };

    const handleConfirm = async () => {
        if (!actionData) return;

        setLoading(true);

        try {

            if (actionData.type === "restore") {
                await api.patch(`/doctor/${actionData.doc.id}/approval`, {
                    isApproved: true,
                });
                toast.success("Doctor restored");
            }

            if (actionData.type === "delete") {
                await api.delete(`/doctor/${actionData.doc.id}/delete`);
                toast.success("Doctor deleted permanently");
            }

            refetch();

        } catch {
            toast.error("Action failed");
        }

        setLoading(false);
        setConfirmOpen(false);
        setActionData(null);
    };

    const disabledDoctors = doctors
        .filter((d: any) => !d?.doctor?.isApproved)
        .filter(
            (doc: any) =>
                doc.name.toLowerCase().includes(search.toLowerCase()) ||
                doc.email.toLowerCase().includes(search.toLowerCase())
        );

    return (
        <>
            <ConfirmModal
                open={confirmOpen}
                title="Confirm action"
                message={`Are you sure you want to ${actionData?.type} ${actionData?.doc?.name}?`}
                confirmText="Yes, continue"
                cancelText="Cancel"
                loading={loading}
                onConfirm={handleConfirm}
                onCancel={() => setConfirmOpen(false)}
            />

            <div className="bg-white border border-gray-200 rounded-xl shadow-sm">

                <div className="p-5 border-b border-gray-200">
                    <input
                        type="text"
                        placeholder="Search doctor..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-full md:w-72"
                    />
                </div>

                <table className="w-full text-sm">

                    <thead className="bg-slate-50">
                        <tr>
                            <th className="px-5 py-3 text-left">Doctor</th>
                            <th className="px-5 py-3 text-left">Email</th>
                            <th className="px-5 py-3 text-left">Status</th>
                            <th className="px-5 py-3 text-right">Actions</th>
                        </tr>
                    </thead>

                    <tbody>

                        {disabledDoctors.map((doc: any) => (

                            <tr key={doc.id} className="border-t border-gray-200 hover:bg-slate-50">

                                <td className="px-5 py-4 font-medium">{doc.name}</td>

                                <td className="px-5 py-4 text-slate-600">
                                    {doc.email}
                                </td>

                                <td className="px-5 py-4">
                                    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs">
                                        Disabled
                                    </span>
                                </td>

                                <td className="px-5 py-4 text-right">

                                    <div className="flex justify-end gap-4">

                                        <button
                                            onClick={() => openConfirm("restore", doc)}
                                            className="text-teal-600 text-xs hover:underline"
                                        >
                                            Restore
                                        </button>

                                        <button
                                            onClick={() => openConfirm("delete", doc)}
                                            className="text-red-600 text-xs hover:underline"
                                        >
                                            Delete
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