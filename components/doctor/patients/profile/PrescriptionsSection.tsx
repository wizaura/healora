"use client";

import api from "@/lib/api";
import toast from "react-hot-toast";
import { Trash2 } from "lucide-react";
import AddPrescriptionModal from "./AddPrescriptionModal";
import { useQuery } from "@tanstack/react-query";

export default function PrescriptionsSection({
  prescriptions,
  appointmentId,
  user,
  refetch,
}: any) {
  // Fetch appointment to get deliveryMode
  const { data: appointment } = useQuery({
    queryKey: ["appointment", appointmentId],
    queryFn: async () => {
      const res = await api.get(`/appointments/${appointmentId}`);
      return res.data;
    },
    enabled: !!appointmentId,
  });

  const deletePrescription = async (id: string) => {
    if (!confirm("Delete prescription?")) return;

    await api.delete(`/consultations/prescriptions/${id}`);
    toast.success("Prescription deleted");
    refetch();
  };

  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">
          Prescriptions
        </h2>

        <AddPrescriptionModal
          appointmentId={appointmentId}
          user={user}
          deliveryMode={appointment?.deliveryMode}
          onSaved={refetch}
        />
      </div>

      {prescriptions?.length === 0 ? (
        <p className="text-sm text-gray-400">
          No prescriptions created
        </p>
      ) : (
        prescriptions.map((p: any) => (
          <div
            key={p.id}
            className="border border-gray-100 rounded-lg p-4 space-y-2"
          >
            <div className="text-xs text-gray-400 flex justify-between">
              <span>
                {new Date(p.createdAt).toLocaleString()}
              </span>

              <button
                onClick={() => deletePrescription(p.id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 size={16} />
              </button>
            </div>

            {/* Manual Medicines */}
            <ul className="list-decimal pl-5 space-y-1 text-sm">
              {p.medicines?.map((m: any, i: number) => (
                <li key={i} className="text-gray-700">
                  {m.text}
                </li>
              ))}
            </ul>

            {/* Medikits */}
            {p.medikits?.length > 0 && (
              <div className="mt-2">
                {p.medikits.map((kit: any) => (
                  <div key={kit.id} className="text-sm">
                    <p className="font-medium">
                      Medikit: {kit.title}
                    </p>
                    <ul className="list-disc ml-5 text-gray-600">
                      {kit.medicines.map((m: string, i: number) => (
                        <li key={i}>{m}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {/* Instructions */}
            {p.instructions && (
              <p className="text-sm text-gray-600">
                <b>Instructions:</b> {p.instructions}
              </p>
            )}

            <div className="text-xs text-gray-500">
              Status: {p.status}
            </div>
          </div>
        ))
      )}
    </div>
  );
}