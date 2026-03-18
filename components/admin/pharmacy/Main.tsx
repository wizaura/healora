"use client";

import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import api from "@/lib/api";
import toast from "react-hot-toast";
import PharmacyModal from "./PharmacyModal";

export default function AdminPharmacy() {
  const [selected, setSelected] = useState<any>(null);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["pharmacy"],
    queryFn: async () => {
      const res = await api.get("/pharmacy");
      return res.data;
    },
  });

  const priceMutation = useMutation({
    mutationFn: async ({ id, payload }: any) => {
      await api.patch(`/pharmacy/${id}/invoice`, payload);
    },
    onSuccess: () => {
      toast.success("Invoice sent to user");
      refetch();
      setSelected(null);
    },
  });

  const getStatus = (p: any) => {
    if (!p.totalAmount) return "Pending Pricing";
    if (p.paymentStatus === "PENDING") return "Awaiting Payment";
    if (p.paymentStatus === "PAID") return "Completed";
  };

  return (
    <div className="pt-28 px-6 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-semibold">Pharmacy</h1>
        <p className="text-sm text-gray-500">
          Manage prescriptions, billing & delivery
        </p>
      </div>

      <div className="bg-white rounded-2xl border divide-y">
        {isLoading && (
          <div className="p-6 text-sm text-gray-500">Loading...</div>
        )}

        {data?.map((p: any) => {
          const user = p.appointment.user;
          const date = new Date(p.appointment.slot.startTimeUTC);

          return (
            <div
              key={p.id}
              className="p-5 flex justify-between items-center hover:bg-gray-50"
            >
              {/* LEFT */}
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-semibold">
                  {user.name?.charAt(0)}
                </div>

                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>

              {/* RIGHT */}
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="text-sm text-gray-600">
                    {date.toLocaleDateString()} • {p.deliveryMode}
                  </p>

                  <p className="text-sm font-medium">
                    ₹{p.totalAmount || "--"}
                  </p>

                  <span className="text-xs px-3 py-1 rounded-full bg-gray-100">
                    {getStatus(p)}
                  </span>
                </div>

                {/* ACTIONS */}
                <div className="flex gap-2">
                  {/* VIEW PRESCRIPTION */}
                  <button
                    onClick={() => setSelected({ ...p, mode: "view" })}
                    className="text-sm px-3 py-1 border rounded-lg hover:bg-gray-100"
                  >
                    View
                  </button>

                  {/* CREATE / VIEW INVOICE */}
                  {!p.totalAmount ? (
                    <button
                      onClick={() => setSelected({ ...p, mode: "create" })}
                      className="text-sm px-3 py-1 bg-teal-600 text-white rounded-lg"
                    >
                      Create Invoice
                    </button>
                  ) : (
                    <button
                      onClick={() => setSelected({ ...p, mode: "invoice" })}
                      className="text-sm px-3 py-1 bg-gray-800 text-white rounded-lg"
                    >
                      View Invoice
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {selected && (
        <PharmacyModal
          data={selected}
          mode={selected.mode}
          onClose={() => setSelected(null)}
          onSubmit={(payload: any) =>
            priceMutation.mutate({
              id: selected.id,
              payload,
            })
          }
        />
      )}
    </div>
  );
}