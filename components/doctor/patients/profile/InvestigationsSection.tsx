"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import InvestigationViewModal from "./InvestigationViewModal";
import ConfirmModal from "@/components/common/ConfirmModal";
import { Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";

export default function InvestigationsSection({ patientId }: any) {
  const [selectedInvestigation, setSelectedInvestigation] = useState<any>(null);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const { data, refetch } = useQuery({
    queryKey: ["investigations", patientId],
    queryFn: async () => {
      const res = await api.get(
        `/consultations/investigations/patient/${patientId}`
      );
      return res.data;
    },
    enabled: !!patientId,
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

      toast.success("Deleted successfully");
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
    <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-6 space-y-4">

      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">
          Investigations / Medical Records
        </h2>
      </div>

      {data?.length === 0 ? (
        <p className="text-sm text-gray-400">
          No investigations found
        </p>
      ) : (
        data?.map((inv: any) => {
          const canDelete = inv.createdByRole === "DOCTOR";

          return (
            <div
              key={inv.id}
              onClick={() => setSelectedInvestigation(inv)}
              className="border border-gray-100 rounded-lg p-4 space-y-3 cursor-pointer hover:shadow-md transition"
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
                      onClick={(e) => {
                        e.stopPropagation(); // prevent modal open
                        openDeleteConfirm(inv.id);
                      }}
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
                <p className="text-sm text-gray-700 line-clamp-2">
                  {inv.note}
                </p>
              )}

              {/* Images */}
              {inv.images?.length > 0 && (
                <div className="flex gap-2">
                  {inv.images.slice(0, 3).map((img: any) => (
                    <img
                      key={img.id}
                      src={img.imageUrl}
                      className="w-16 h-16 object-cover rounded-md border border-gray-200"
                    />
                  ))}

                  {inv.images.length > 3 && (
                    <div className="w-16 h-16 flex items-center justify-center bg-gray-100 rounded-md text-xs">
                      +{inv.images.length - 3}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })
      )}

      {/* View Modal */}
      {selectedInvestigation && (
        <InvestigationViewModal
          investigation={selectedInvestigation}
          onClose={() => setSelectedInvestigation(null)}
        />
      )}

      {/* ✅ Confirm Delete Modal */}
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