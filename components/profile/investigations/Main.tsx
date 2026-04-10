"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import AddInvestigationModal from "./AddInvestigationModal";
import ConfirmModal from "@/components/common/ConfirmModal";
import { Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";
import InvestigationViewModal from "./InvestigationViewModal";

export default function InvestigationsSection({ isDoctor, patientId }: any) {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState<string | null>(null);
  const [selectedInvestigation, setSelectedInvestigation] = useState<any>(null);

  const { data, refetch } = useQuery({
    queryKey: ["investigations", patientId],
    queryFn: async () => {
      const url = isDoctor
        ? `/consultations/investigations/patient/${patientId}`
        : `/consultations/investigations/me`;

      const res = await api.get(url);
      return res.data;
    },
  });

  /* ---------------- DELETE FLOW ---------------- */

  const openDeleteConfirm = (id: string) => {
    setSelectedDeleteId(id);
    setConfirmOpen(true);
  };

  const handleDelete = async () => {
    if (!selectedDeleteId) return;

    try {
      setDeletingId(selectedDeleteId);

      await api.delete(
        `/consultations/investigations/${selectedDeleteId}`
      );

      toast.success("Deleted");
      refetch();
    } catch {
      toast.error("Failed to delete");
    } finally {
      setDeletingId(null);
      setConfirmOpen(false);
      setSelectedDeleteId(null);
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-6 space-y-4">

        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">
            Investigations / Medical Records
          </h2>

          {!isDoctor && (
            <AddInvestigationModal onSaved={refetch} />
          )}
        </div>

        {data?.length === 0 ? (
          <p className="text-sm text-gray-400">
            No investigations uploaded
          </p>
        ) : (
          data?.map((inv: any) => {
            const canDelete =
              (!isDoctor && inv.createdByRole === "PATIENT") ||
              (isDoctor && inv.createdByRole === "DOCTOR");

            return (
              <div
                key={inv.id}
                onClick={() => setSelectedInvestigation(inv)}
                className="border hover:shadow-md cursor-pointer border-gray-100 rounded-lg p-4 space-y-3"
              >
                {/* Header */}
                <div className="flex justify-between items-center text-xs text-gray-400">
                  <span>
                    {new Date(inv.createdAt).toLocaleString()}
                  </span>

                  <div className="flex items-center gap-3">
                    <span className="font-medium">
                      {inv.createdByRole}
                    </span>

                    {canDelete && (
                      <button
                        onClick={() => openDeleteConfirm(inv.id)}
                        disabled={deletingId === inv.id}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                </div>

                {/* Note */}
                {inv.note && (
                  <p className="text-sm text-gray-700">
                    {inv.note}
                  </p>
                )}

                {/* Images */}
                {inv.images?.length > 0 && (
                  <div className="flex gap-3 flex-wrap">
                    {inv.images.map((img: any) => (
                      <img
                        key={img.id}
                        src={img.imageUrl}
                        className="w-24 h-24 object-cover rounded-lg border"
                      />
                    ))}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {selectedInvestigation && (
        <InvestigationViewModal
          investigation={selectedInvestigation}
          onClose={() => setSelectedInvestigation(null)}
        />
      )}

      {/* ✅ Confirm Modal */}
      <ConfirmModal
        open={confirmOpen}
        title="Delete Investigation"
        message="This action cannot be undone. Are you sure you want to delete this investigation?"
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
        loading={!!deletingId}
        onCancel={() => {
          setConfirmOpen(false);
          setSelectedDeleteId(null);
        }}
        onConfirm={handleDelete}
      />
    </div>
  );
}