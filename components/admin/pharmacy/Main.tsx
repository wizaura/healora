"use client";

import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import api from "@/lib/api";
import toast from "react-hot-toast";
import PharmacyModal from "./PharmacyModal";

export default function AdminPharmacy() {
  const [selected, setSelected] = useState<any>(null);
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("");

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
    if (!p.totalAmount) return "Pending Invoice";
    if (p.paymentStatus === "PENDING") return "Awaiting Payment";
    if (p.paymentStatus === "PAID") return "Completed";
    return "Pending";
  };

  const getStatusColor = (status: string) => {
    if (status === "Completed") return "bg-green-100 text-green-700";
    if (status === "Awaiting Payment") return "bg-yellow-100 text-yellow-700";
    return "bg-gray-100 text-gray-700";
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-semibold">Pharmacy Management</h1>
          <p className="text-sm text-gray-500">
            Manage prescriptions, billing & delivery
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search user..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-200 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-teal-100"
        />

        {/* DATE FILTER */}
        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="border border-gray-200 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-teal-100"
        />

        {/* CLEAR */}
        {(search || dateFilter) && (
          <button
            onClick={() => {
              setSearch("");
              setDateFilter("");
            }}
            className="px-4 py-2 text-sm bg-gray-100 rounded-xl"
          >
            Clear
          </button>
        )}

      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        {isLoading && (
          <div className="p-6 text-sm text-gray-500">Loading...</div>
        )}

        {data
          ?.filter((p: any) => {
            const user = p.appointment.user;
            const date = new Date(p.appointment.slot.startTimeUTC);

            // 🔍 SEARCH FILTER
            const matchesSearch =
              user.name?.toLowerCase().includes(search.toLowerCase()) ||
              user.email?.toLowerCase().includes(search.toLowerCase());

            // 📅 DATE FILTER
            const matchesDate = dateFilter
              ? date.toISOString().slice(0, 10) === dateFilter
              : true;

            return matchesSearch && matchesDate;
          })
          .map((p: any) => {
            const user = p.appointment.user;
            const date = new Date(p.appointment.slot.startTimeUTC);
            const status = getStatus(p);

            return (
              <div
                key={p.id}
                className="p-5 flex justify-between items-center border-b border-gray-300 hover:bg-gray-50 transition"
              >
                {/* LEFT USER */}
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-semibold text-lg">
                    {user.name?.charAt(0)}
                  </div>

                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                    <p className="text-xs text-gray-400">
                      {date.toLocaleDateString()} • {p.deliveryMode}
                    </p>
                  </div>
                </div>

                {/* RIGHT INFO */}
                <div className="flex items-center gap-8">

                  {/* PRICE */}
                  <div className="text-right">
                    <p className="text-lg font-semibold">
                      {p.currency || "INR"} {p.totalAmount || "--"}
                    </p>

                    <span
                      className={`text-xs px-3 py-1 rounded-full ${getStatusColor(
                        status
                      )}`}
                    >
                      {status}
                    </span>
                  </div>

                  {/* ACTION */}
                  <div>
                    {!p.totalAmount ? (
                      <button
                        onClick={() => setSelected(p)}
                        className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm"
                      >
                        Create Invoice
                      </button>
                    ) : (
                      <button
                        onClick={() => setSelected(p)}
                        className="bg-gray-800 hover:bg-black text-white px-4 py-2 rounded-lg text-sm"
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

      {/* MODAL */}
      {selected && (
        <PharmacyModal
          data={selected}
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