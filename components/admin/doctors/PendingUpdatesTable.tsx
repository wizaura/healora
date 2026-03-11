"use client";

import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api";
import toast from "react-hot-toast";
import PendingUpdateModal from "./PendingUpdateModal";
import ConfirmModal from "@/components/common/ConfirmModal";

type PendingUpdate = {
    id: string;
    experience: number;
    qualification: string;
    consultationFee: number;
    bio?: string;

    doctor: {
        user: {
            id: string;
            name: string;
            email: string;
        };
    };
};

export default function PendingUpdatesTable() {

    const [updates, setUpdates] = useState<PendingUpdate[]>([]);
    const [loading, setLoading] = useState(true);

    const [reviewOpen, setReviewOpen] = useState(false);
    const [reviewData, setReviewData] = useState<any>(null);

    const [confirmOpen, setConfirmOpen] = useState(false);
    const [confirmData, setConfirmData] = useState<any>(null);

    const fetchUpdates = async () => {
        const res = await api.get("/admin/doctors/pending");
        setUpdates(res.data);
        setLoading(false);
    };

    useEffect(() => {
        fetchUpdates();
    }, []);

    const openReview = async (id: string) => {
        const res = await api.get(`/admin/doctors/pending/${id}`);
        setReviewData(res.data);
        setReviewOpen(true);
    };

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
                    ? "Profile update approved"
                    : "Profile update rejected"
            );

            fetchUpdates();
            setConfirmOpen(false);
            setReviewOpen(false);
        },

        onError: () => {
            toast.error("Failed to update profile");
            setConfirmOpen(false);
        }
    });

    const openConfirm = (userId: string, isApproved: boolean) => {
        setConfirmData({ userId, isApproved });
        setConfirmOpen(true);
    };

    const confirmAction = () => {
        if (!confirmData) return;

        approveMutation.mutate({
            id: confirmData.userId,
            isApproved: confirmData.isApproved,
        });
    };

    if (loading) {
        return <div className="text-slate-500">Loading updates...</div>;
    }

    return (
        <>
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                <table className="w-full text-sm">

                    <thead className="bg-slate-50">
                        <tr>
                            <th className="px-5 py-3 text-left">Doctor</th>
                            <th className="px-5 py-3 text-left">Email</th>
                            <th className="px-5 py-3 text-left">Experience</th>
                            <th className="px-5 py-3 text-left">Fee</th>
                            <th className="px-5 py-3 text-right">Actions</th>
                        </tr>
                    </thead>

                    <tbody>

                        {updates.map((update) => (

                            <tr key={update.id} className="border-t border-gray-200 hover:bg-slate-50">

                                <td className="px-5 py-4">
                                    {update.doctor.user.name}
                                </td>

                                <td className="px-5 py-4 text-slate-600">
                                    {update.doctor.user.email}
                                </td>

                                <td className="px-5 py-4">
                                    {update.experience} years
                                </td>

                                <td className="px-5 py-4">
                                    ₹{update.consultationFee}
                                </td>

                                <td className="px-5 py-4 text-right">
                                    <div className="flex justify-end gap-3">

                                        <button
                                            onClick={() => openReview(update.id)}
                                            className="text-xs text-blue-600 hover:underline"
                                        >
                                            Review
                                        </button>

                                        <button
                                            onClick={() =>
                                                openConfirm(update.doctor.user.id, true)
                                            }
                                            className="text-xs text-green-600 hover:underline"
                                        >
                                            Approve
                                        </button>

                                        <button
                                            onClick={() =>
                                                openConfirm(update.doctor.user.id, false)
                                            }
                                            className="text-xs text-red-600 hover:underline"
                                        >
                                            Reject
                                        </button>

                                    </div>
                                </td>

                            </tr>

                        ))}

                        {updates.length === 0 && (
                            <tr>
                                <td colSpan={5} className="text-center py-10 text-slate-500">
                                    No pending profile updates
                                </td>
                            </tr>
                        )}

                    </tbody>

                </table>
            </div>

            <PendingUpdateModal
                open={reviewOpen}
                onClose={() => setReviewOpen(false)}
                data={reviewData}
            />

            <ConfirmModal
                open={confirmOpen}
                title={
                    confirmData?.isApproved
                        ? "Approve profile update?"
                        : "Reject profile update?"
                }
                message={
                    confirmData?.isApproved
                        ? "This will apply the new profile changes."
                        : "The requested profile changes will be rejected."
                }
                confirmText={confirmData?.isApproved ? "Approve" : "Reject"}
                loading={approveMutation.isPending}
                onConfirm={confirmAction}
                onCancel={() => setConfirmOpen(false)}
            />
        </>
    );
}